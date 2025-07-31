"use client";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CacheContext = createContext();

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};

export const CacheProvider = ({ children }) => {
  const [videoCache, setVideoCache] = useState(new Map());
  const [imageCache, setImageCache] = useState(new Map());
  const [pageCache, setPageCache] = useState(new Map());
  const [preloadedVideos, setPreloadedVideos] = useState(new Set());
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Initialize cache from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedVideoCache = localStorage.getItem('video-cache-urls');
        const savedImageCache = localStorage.getItem('image-cache-urls');
        const savedPageCache = localStorage.getItem('page-cache-data');
        
        if (savedVideoCache) {
          setPreloadedVideos(new Set(JSON.parse(savedVideoCache)));
        }
        if (savedImageCache) {
          setPreloadedImages(new Set(JSON.parse(savedImageCache)));
        }
        if (savedPageCache) {
          setPageCache(new Map(JSON.parse(savedPageCache)));
        }
      } catch (error) {
        console.warn('Error loading cache from localStorage:', error);
      }
    }
  }, []);

  // Save cache to localStorage
  const saveCacheToStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('video-cache-urls', JSON.stringify([...preloadedVideos]));
        localStorage.setItem('image-cache-urls', JSON.stringify([...preloadedImages]));
        localStorage.setItem('page-cache-data', JSON.stringify([...pageCache]));
      } catch (error) {
        console.warn('Error saving cache to localStorage:', error);
      }
    }
  }, [preloadedVideos, preloadedImages, pageCache]);

  // Preload video with caching
  const preloadVideo = useCallback(async (src, webmSrc = null) => {
    if (!src || preloadedVideos.has(src)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      
      const handleLoad = () => {
        setVideoCache(prev => new Map(prev.set(src, video)));
        setPreloadedVideos(prev => new Set(prev.add(src)));
        if (webmSrc) {
          setPreloadedVideos(prev => new Set(prev.add(webmSrc)));
        }
        resolve(video);
      };

      const handleError = (error) => {
        console.warn(`Failed to preload video: ${src}`, error);
        reject(error);
      };

      video.addEventListener('loadeddata', handleLoad);
      video.addEventListener('error', handleError);

      // Try WebM first if available, fallback to MP4
      if (webmSrc) {
        video.src = webmSrc;
        video.addEventListener('error', () => {
          video.src = src; // Fallback to MP4
        }, { once: true });
      } else {
        video.src = src;
      }
    });
  }, [preloadedVideos]);

  // Preload image with caching
  const preloadImage = useCallback(async (src) => {
    if (!src || preloadedImages.has(src)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      const handleLoad = () => {
        setImageCache(prev => new Map(prev.set(src, img)));
        setPreloadedImages(prev => new Set(prev.add(src)));
        resolve(img);
      };

      const handleError = (error) => {
        console.warn(`Failed to preload image: ${src}`, error);
        reject(error);
      };

      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
      img.src = src;
    });
  }, [preloadedImages]);

  // Batch preload multiple videos
  const batchPreloadVideos = useCallback(async (videoSources) => {
    const promises = videoSources.map(({ src, webmSrc }) => 
      preloadVideo(src, webmSrc).catch(error => {
        console.warn(`Failed to preload video: ${src}`, error);
        return null;
      })
    );
    
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some videos failed to preload:', error);
    }
  }, [preloadVideo]);

  // Batch preload multiple images
  const batchPreloadImages = useCallback(async (imageSources) => {
    const promises = imageSources.map(src => 
      preloadImage(src).catch(error => {
        console.warn(`Failed to preload image: ${src}`, error);
        return null;
      })
    );
    
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [preloadImage]);

  // Cache page data
  const cachePageData = useCallback((pageKey, data) => {
    setPageCache(prev => new Map(prev.set(pageKey, {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + (1000 * 60 * 30) // 30 minutes
    })));
  }, []);

  // Get cached page data
  const getCachedPageData = useCallback((pageKey) => {
    const cached = pageCache.get(pageKey);
    if (!cached) return null;
    
    // Check if cache is expired
    if (Date.now() > cached.expiresAt) {
      setPageCache(prev => {
        const newCache = new Map(prev);
        newCache.delete(pageKey);
        return newCache;
      });
      return null;
    }
    
    return cached.data;
  }, [pageCache]);

  // Check if video is cached
  const isVideoCached = useCallback((src) => {
    return preloadedVideos.has(src);
  }, [preloadedVideos]);

  // Check if image is cached
  const isImageCached = useCallback((src) => {
    return preloadedImages.has(src);
  }, [preloadedImages]);

  // Get cached video element
  const getCachedVideo = useCallback((src) => {
    return videoCache.get(src);
  }, [videoCache]);

  // Get cached image element
  const getCachedImage = useCallback((src) => {
    return imageCache.get(src);
  }, [imageCache]);

  // Clear expired cache
  const clearExpiredCache = useCallback(() => {
    const now = Date.now();
    setPageCache(prev => {
      const newCache = new Map();
      for (const [key, value] of prev) {
        if (now < value.expiresAt) {
          newCache.set(key, value);
        }
      }
      return newCache;
    });
  }, []);

  // Save cache periodically
  useEffect(() => {
    const interval = setInterval(() => {
      saveCacheToStorage();
      clearExpiredCache();
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, [saveCacheToStorage, clearExpiredCache]);

  // Save cache on unmount
  useEffect(() => {
    return () => {
      saveCacheToStorage();
    };
  }, [saveCacheToStorage]);

  const value = {
    // Video caching
    preloadVideo,
    batchPreloadVideos,
    isVideoCached,
    getCachedVideo,
    
    // Image caching
    preloadImage,
    batchPreloadImages,
    isImageCached,
    getCachedImage,
    
    // Page data caching
    cachePageData,
    getCachedPageData,
    
    // Cache management
    clearExpiredCache,
    
    // Cache stats
    cacheStats: {
      videosCount: preloadedVideos.size,
      imagesCount: preloadedImages.size,
      pagesCount: pageCache.size
    }
  };

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  );
};