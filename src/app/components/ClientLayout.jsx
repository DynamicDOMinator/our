"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import PageTransition from "./PageTransition";
import ConditionalLastSection from "./ConditionalLastSection";
import LoadingScreen from "./LoadingScreen";
import { LoadingProvider, useLoading } from "../contexts/LoadingContext";
import { CacheProvider, useCache } from "../contexts/CacheContext";
import { registerServiceWorker, getServiceWorkerStatus } from "../utils/serviceWorker";

const ClientLayoutContent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const { markLoadingComplete } = useLoading();
  const { batchPreloadVideos, batchPreloadImages, cacheStats } = useCache();

  useEffect(() => {
    // Always show loading screen on every page load/reload
    // This ensures minimum 3 seconds loading time every time
    setHasVisited(false);
    setIsLoading(true);
    
    // Preload critical assets during loading
    const preloadCriticalAssets = async () => {
      try {
        // Define critical videos to preload
        const criticalVideos = [
          { src: '/header.mp4', webmSrc: null },
          { src: '/about-v.mp4', webmSrc: null },
          { src: '/short.mp4', webmSrc: null },
          { src: '/our-1.mp4', webmSrc: null },
          { src: '/mini1.mp4', webmSrc: null },
          { src: '/mini2.mp4', webmSrc: null },
          { src: '/mini3.mp4', webmSrc: null },
          { src: '/mini4.mp4', webmSrc: null },
        ];
        
        // Define critical images to preload
        const criticalImages = [
          '/Techshun.png',
          '/fav.png',
          '/team.jpg',
          '/team1.jpg',
          '/team2.jpg',
          '/team4.jpg',
          '/noisy.gif'
        ];
        
        // Start preloading in parallel
        await Promise.allSettled([
          batchPreloadVideos(criticalVideos),
          batchPreloadImages(criticalImages)
        ]);
        
        console.log('Critical assets preloaded:', cacheStats);
      } catch (error) {
        console.warn('Error preloading critical assets:', error);
      }
    };
    
    preloadCriticalAssets();
    
    // Register service worker for advanced caching
    const initServiceWorker = async () => {
      try {
        const registration = await registerServiceWorker();
        if (registration) {
          console.log('Service Worker registered for caching');
          const status = await getServiceWorkerStatus();
          console.log('Service Worker status:', status);
        }
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    };
    
    initServiceWorker();
  }, [batchPreloadVideos, batchPreloadImages, cacheStats]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    markLoadingComplete();
  };

  return (
    <>
      {isLoading && !hasVisited && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      <SmoothScroll>
        <PageTransition>
          <Header />
          {children}
          <Footer />
          <ConditionalLastSection />
        </PageTransition>
      </SmoothScroll>
    </>
  );
};

const ClientLayout = ({ children }) => {
  return (
    <CacheProvider>
      <LoadingProvider>
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </LoadingProvider>
    </CacheProvider>
  );
};

export default ClientLayout;