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
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const { markLoadingComplete } = useLoading();
  const pathname = usePathname();
  
  // Check if current page is Arabic landing page
  const isArabicLandingPage = pathname === '/prosental-ar';

  useEffect(() => {
    // Always show loading screen on every page load/reload
    // This ensures minimum 3 seconds loading time every time
    setHasVisited(false);
    setIsLoading(true);
  }, []);

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