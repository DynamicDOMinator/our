'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true); // Show content by default
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip animation on initial load of home page
    if (isInitialLoad.current && pathname === '/') {
      isInitialLoad.current = false;
      return;
    }
    
    // Mark that we've had our first navigation
    isInitialLoad.current = false;
    
    // Start transition when pathname changes
    setIsTransitioning(true);
    setShowContent(false);
    
    // End transition after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setShowContent(true);
    }, 800); // Animation duration

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Only show content after transition completes */}
      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 200ms ease-in-out' }}>
        {children}
      </div>
      
      {/* Page Transition Overlay */}
      {isTransitioning && (
        <div className="page-transition-overlay">
          {/* Black background with 20% opacity */}
          <div className="page-transition-bg" />
          
          {/* White overlay animating from bottom to top */}
          <div className="page-transition-white" />
        </div>
      )}
      
      <style jsx global>{`
        .page-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          pointer-events: none;
        }
        
        .page-transition-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: black;
          opacity: 0.2;
        }
        
        .page-transition-white {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          transform: translateY(100%);
          animation: slideUp 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0%);
          }
        }
      `}</style>
    </>
  );
}