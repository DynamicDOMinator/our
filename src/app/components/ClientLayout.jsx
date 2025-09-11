"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import PageTransition from "./PageTransition";
import ConditionalLastSection from "./ConditionalLastSection";
import LoadingScreen from "./LoadingScreen";
import { LoadingProvider, useLoading } from "../contexts/LoadingContext";

const ClientLayoutContent = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false); // Start with loading off by default
  const [hasVisited, setHasVisited] = useState(true); // Assume visited by default
  const { markLoadingComplete } = useLoading();
  const pathname = usePathname();
  
  // Check if current page is Arabic landing page
  const isArabicLandingPage = pathname === '/prosental-ar';

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;
    
    // Only show loading screen on home page
    const isHomePage = pathname === '/';
    
    if (isHomePage) {
      try {
        // Check localStorage for previous visits
        const hasVisitedBefore = localStorage.getItem('hasVisitedHome') === 'true';
        
        if (!hasVisitedBefore) {
          // First visit to home page - show loading animation
          setIsLoading(true);
          setHasVisited(false);
          // Set localStorage flag to prevent future loading animations
          localStorage.setItem('hasVisitedHome', 'true');
        } else {
          // Skip loading animation if user has visited before
          setIsLoading(false);
          setHasVisited(true);
          markLoadingComplete();
        }
      } catch (error) {
        // Handle localStorage errors (e.g., in private browsing)
        console.error('Error accessing localStorage:', error);
        setIsLoading(false);
        setHasVisited(true);
        markLoadingComplete();
      }
    } else {
      // For all other pages, skip loading screen
      setIsLoading(false);
      setHasVisited(true);
      markLoadingComplete();
    }
  }, [pathname, markLoadingComplete]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    markLoadingComplete();
  };

  return (
    <>
      {isLoading && !hasVisited && !isArabicLandingPage && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      <SmoothScroll>
        <PageTransition>
          {!isArabicLandingPage && <Header />}
          {children}
          {!isArabicLandingPage && <Footer />}
          {!isArabicLandingPage && <ConditionalLastSection />}
        </PageTransition>
      </SmoothScroll>
    </>
  );
};

const ClientLayout = ({ children }) => {
  return (
    <LoadingProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </LoadingProvider>
  );
};

export default ClientLayout;