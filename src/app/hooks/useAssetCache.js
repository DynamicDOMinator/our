'use client';
import { useState, useEffect, useCallback } from 'react';
import { useCache } from '../contexts/CacheContext';
import { getCacheInfo, preloadCriticalResources } from '../utils/serviceWorker';

export const useAssetCache = () => {
  const {
    preloadVideo,
    preloadImage,
    batchPreloadVideos,
    batchPreloadImages,
    isVideoCached,
    isImageCached,
    cacheStats
  } = useCache();
  
  const [serviceWorkerCacheInfo, setServiceWorkerCacheInfo] = useState(null);
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState({ current: 0, total: 0 });

  // Get comprehensive cache information
  const getCacheStatus = useCallback(async () => {
    try {
      const swCacheInfo = await getCacheInfo();
      setServiceWorkerCacheInfo(swCacheInfo);
      
      return {
        contextCache: cacheStats,
        serviceWorkerCache: swCacheInfo,
        totalCachedAssets: cacheStats.videosCount + cacheStats.imagesCount + (swCacheInfo.totalCachedItems || 0)
      };
    } catch (error) {
      console.warn('Failed to get cache status:', error);
      return {
        contextCache: cacheStats,
        serviceWorkerCache: null,
        totalCachedAssets: cacheStats.videosCount + cacheStats.imagesCount
      };
    }
  }, [cacheStats]);

  // Preload assets for a specific page
  const preloadPageAssets = useCallback(async (pageAssets) => {
    if (isPreloading) return;
    
    setIsPreloading(true);
    const { videos = [], images = [], critical = [] } = pageAssets;
    const totalAssets = videos.length + images.length + critical.length;
    let currentAsset = 0;
    
    setPreloadProgress({ current: 0, total: totalAssets });
    
    try {
      // Preload critical resources via service worker
      if (critical.length > 0) {
        await preloadCriticalResources(critical);
        currentAsset += critical.length;
        setPreloadProgress({ current: currentAsset, total: totalAssets });
      }
      
      // Preload videos
      if (videos.length > 0) {
        const videoPromises = videos.map(async (video) => {
          try {
            await preloadVideo(video.src, video.webmSrc);
            currentAsset++;
            setPreloadProgress({ current: currentAsset, total: totalAssets });
          } catch (error) {
            console.warn(`Failed to preload video: ${video.src}`, error);
            currentAsset++;
            setPreloadProgress({ current: currentAsset, total: totalAssets });
          }
        });
        
        await Promise.allSettled(videoPromises);
      }
      
      // Preload images
      if (images.length > 0) {
        const imagePromises = images.map(async (imageSrc) => {
          try {
            await preloadImage(imageSrc);
            currentAsset++;
            setPreloadProgress({ current: currentAsset, total: totalAssets });
          } catch (error) {
            console.warn(`Failed to preload image: ${imageSrc}`, error);
            currentAsset++;
            setPreloadProgress({ current: currentAsset, total: totalAssets });
          }
        });
        
        await Promise.allSettled(imagePromises);
      }
      
      console.log(`Preloaded ${currentAsset}/${totalAssets} assets`);
    } catch (error) {
      console.error('Error during asset preloading:', error);
    } finally {
      setIsPreloading(false);
      setPreloadProgress({ current: 0, total: 0 });
    }
  }, [isPreloading, preloadVideo, preloadImage]);

  // Check if specific assets are cached
  const checkAssetCache = useCallback((assets) => {
    const { videos = [], images = [] } = assets;
    
    const videosCacheStatus = videos.map(video => ({
      src: video.src || video,
      cached: isVideoCached(video.src || video)
    }));
    
    const imagesCacheStatus = images.map(image => ({
      src: image,
      cached: isImageCached(image)
    }));
    
    const totalAssets = videosCacheStatus.length + imagesCacheStatus.length;
    const cachedAssets = videosCacheStatus.filter(v => v.cached).length + 
                        imagesCacheStatus.filter(i => i.cached).length;
    
    return {
      videos: videosCacheStatus,
      images: imagesCacheStatus,
      totalAssets,
      cachedAssets,
      cachePercentage: totalAssets > 0 ? Math.round((cachedAssets / totalAssets) * 100) : 0
    };
  }, [isVideoCached, isImageCached]);

  // Preload assets for common pages
  const preloadCommonAssets = useCallback(async () => {
    const commonAssets = {
      videos: [
        { src: '/header.mp4' },
        { src: '/about-v.mp4' },
        { src: '/short.mp4' }
      ],
      images: [
        '/Techshun.png',
        '/fav.png',
        '/team.jpg'
      ],
      critical: [
        '/',
        '/about',
        '/projects'
      ]
    };
    
    await preloadPageAssets(commonAssets);
  }, [preloadPageAssets]);

  // Auto-refresh cache info periodically
  useEffect(() => {
    getCacheStatus();
    
    const interval = setInterval(() => {
      getCacheStatus();
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [getCacheStatus]);

  return {
    // Cache status
    cacheStats,
    serviceWorkerCacheInfo,
    getCacheStatus,
    
    // Asset checking
    isVideoCached,
    isImageCached,
    checkAssetCache,
    
    // Preloading
    preloadVideo,
    preloadImage,
    batchPreloadVideos,
    batchPreloadImages,
    preloadPageAssets,
    preloadCommonAssets,
    
    // Preloading status
    isPreloading,
    preloadProgress,
    
    // Utility functions
    preloadCriticalResources
  };
};

export default useAssetCache;