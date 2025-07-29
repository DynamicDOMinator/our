"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";

export default function FourthSection() {
  // Constants for configuration
  const OPACITY_MAX = 0.4;                    // Maximum opacity for the overlay
  const SCROLL_THRESHOLD_DESKTOP = 200;       // Pixels to scroll on desktop before full opacity
  const SCROLL_THRESHOLD_MOBILE_FACTOR = 0.1; // Percentage of section height on mobile
  const THROTTLE_MS = 16;                     // ~60fps for smooth animations
  const MOBILE_BREAKPOINT = 768;              // Breakpoint for mobile devices
  // Create separate opacity states for each section
  const [sectionOpacities, setSectionOpacities] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });
  
  // Throttle function to limit how often the scroll handler fires
  const throttle = useCallback((func, limit) => {
    let inThrottle;
    let lastFunc;
    let lastRan;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        lastRan = Date.now();
        setTimeout(() => inThrottle = false, limit);
      } else {
        // Clear previous scheduled execution
        clearTimeout(lastFunc);
        // Schedule a new execution after the throttle period
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }, []);
  
  // Custom hook for smooth scrolling
  const useScrollSmoothing = () => {
    const isScrolling = useRef(false);
    const scrollTimeout = useRef(null);
    
    const handleScrollStart = useCallback(() => {
      isScrolling.current = true;
    }, []);
    
    const handleScrollEnd = useCallback(() => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        
        // Find the nearest section to snap to
        const sections = document.querySelectorAll('[data-section-id]');
        let closestSection = null;
        let minDistance = Infinity;
        
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        });
        
        // Only snap if we're close enough to a section boundary
        if (closestSection && minDistance < 100) {
          closestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150); // Wait a bit to ensure scrolling has actually stopped
    }, []);
    
    return { handleScrollStart, handleScrollEnd, isScrolling };
  };
  
  // Initialize scroll smoothing
  const { handleScrollStart, handleScrollEnd, isScrolling } = useScrollSmoothing();

  // Define section data with useMemo to prevent unnecessary re-renders
  const sectionsData = useMemo(() => [
    {
      id: 1,
      title: "Custom Software Development",
      description:
        "We build tailored software solutions that perfectly align with your unique business requirements. Our development team transforms your ideas into powerful, scalable applications using the latest technologies and industry best practices to drive innovation and efficiency.",
      leftItems: [
        "Enterprise Applications",
        "SaaS Solutions",
        "Process Automation",
        "Integration Services",
      ],
      rightItems: ["Agile Development", "DevOps Practices", "Quality Assurance", "Continuous Delivery"],
      image: "/mini1.mp4",
    },
    {
      id: 2,
      title: "Web & Mobile Development",
      description:
        "We create responsive web applications and mobile solutions that deliver exceptional user experiences across all devices. Our development approach ensures your digital products are fast, secure, and scalable while maintaining intuitive interfaces that engage your users.",
      leftItems: [
        "Progressive Web Apps",
        "Responsive Websites",
        "E-commerce Solutions",
        "Content Management",
      ],
      rightItems: ["iOS Development", "Android Development", "Cross-platform Apps", "Mobile UI/UX"],
      image: "/mini2.mp4",
    },
    {
      id: 3,
      title: "Full-Stack Development",
      description:
        "Our full-stack development services cover both front-end and back-end technologies to deliver complete, end-to-end solutions. We combine attractive interfaces with robust server-side logic to create seamless applications that meet all your business requirements.",
      leftItems: [
        "Front-end Development",
        "Back-end Systems",
        "Database Design",
        "API Development",
      ],
      rightItems: ["JavaScript Frameworks", "Cloud Integration", "Microservices", "Serverless Architecture"],
      image: "/mini3.mp4",
    },
   
    {
      id: 4,
      title: "Software Maintenance & Support",
      description:
        "We provide comprehensive maintenance and support services to ensure your software remains secure, efficient, and up-to-date. Our dedicated team handles everything from bug fixes and performance optimization to feature enhancements and technology upgrades.",
      leftItems: [
        "Bug Fixing",
        "Performance Tuning",
        "Security Updates",
        "Feature Enhancements",
      ],
      rightItems: ["24/7 Technical Support", "Code Refactoring", "Legacy System Modernization", "Documentation"],
      image: "/mini4.mp4",
    },
  ], []);

  // Store sections in a ref to avoid dependency issues
  const sectionsRef = useRef(sectionsData);
  
  // Update ref when sectionsData changes
  useEffect(() => {
    sectionsRef.current = sectionsData;
  }, [sectionsData]);

  // Force video autoplay
  useEffect(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    });
  }, []);
  
  // Add scroll event handling
  useEffect(() => {
    const handleScroll = () => {
      // Create a new opacity state object
      const newOpacities = { ...sectionOpacities };

      // Check each section individually using their actual IDs
      sectionsRef.current.forEach((section) => {
        const i = section.id;
        // Skip the last section (section 4) - it won't have the black overlay
        if (i === 4) {
          newOpacities[i] = 0;
          return;
        }
        
        const stickyElement = document.querySelector(`.section-${i}`);

        if (stickyElement) {
          const rect = stickyElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const isSticky = rect.top <= 0;
          
          // Calculate how much of the section is visible in the viewport
          const visiblePercentage = Math.min(
            Math.max(0, (viewportHeight - Math.max(0, rect.top)) / rect.height),
            1
          );

          if (isSticky) {
            // Get the section's position in the document
            const sectionTop = stickyElement.offsetTop;

            // Calculate how far we've scrolled past this specific section
            const scrolledPastSection = window.scrollY - sectionTop;
            
            // Get section height for responsive calculation
            const sectionHeight = stickyElement.offsetHeight;
            
            // Use a smaller threshold on mobile devices
            const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
            const scrollThreshold = isMobile 
              ? sectionHeight * SCROLL_THRESHOLD_MOBILE_FACTOR 
              : SCROLL_THRESHOLD_DESKTOP;
            
            // Calculate progress (0 to 1) based on how far we've scrolled in this section
            // Use a more gradual progression on mobile
            const scrollProgress = Math.min(
              Math.max(scrolledPastSection / scrollThreshold, 0),
              1
            );

            // Set opacity for this specific section with a smoother transition
            newOpacities[i] = scrollProgress * OPACITY_MAX;
          } else {
            // If not sticky, opacity is based on visibility percentage
            // This creates a smoother transition as sections come into view
            newOpacities[i] = Math.max(0, visiblePercentage * 0.1);
          }
        }
      });

      // Update all section opacities at once
      setSectionOpacities(newOpacities);
    };

    // Initial check
    handleScroll();
    
    // Use throttled scroll handler to improve performance, especially on mobile
    const throttledScrollHandler = throttle(handleScroll, THROTTLE_MS);

    // Combine scroll handlers
    const scrollHandler = (e) => {
      handleScrollStart();
      throttledScrollHandler(e);
      handleScrollEnd();
    };

    // Use passive event listener for better performance on mobile
    window.addEventListener("scroll", scrollHandler, { passive: true });
    
    // Handle resize events to recalculate dimensions when orientation changes
    window.addEventListener("resize", throttledScrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", throttledScrollHandler);
    };
  }, [throttle]);

  // No need for individual scroll effects as we're using a single overlay

  return (
    <div className="pt-5 md:pt-10 relative max-w-[2500px] mx-auto" style={{ scrollSnapType: 'y proximity' }}>
      {sectionsData.map((section) => (
        <div
          key={section.id}
          className={`flex flex-col md:flex-row items-start sticky section-${section.id} px-4 sm:px-8 md:px-12 lg:px-16 z-${
            10 - section.id
          } top-0 bg-white gap-6  md:gap-12 h-screen lg:gap-28 py-8 md:py-12 lg:py-16  border-t-2 border-gray-300 relative overflow-hidden`}
          style={{ 
           
            scrollMarginTop: '0px',
            scrollSnapAlign: 'start'
          }}
          data-section-id={section.id}
        >
          {/* Individual overlay for each section (except the last one) */}
          {section.id !== 4 && (
            <div
              className="absolute left-0 right-0 top-0 bottom-0 z-[999] bg-black transition-opacity duration-300 w-full h-full"
              style={{
                pointerEvents: "none", // Ensure it doesn't block interactions
                opacity: sectionOpacities[section.id], // Individual opacity from state
              }}
            ></div>
          )}

          <div className="w-full md:basis-1/2 mb-6 md:mb-0">
            <h4 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">{section.title}</h4>

            <p className="text-base md:text-lg lg:text-xl pt-6 md:pt-10 lg:pt-16">{section.description}</p>
            
            {/* Image appears here on mobile, between text and list items */}
            <div className="block md:hidden w-full ">
              <video
                src={section.image}
                width={500}
                height={500}
                className="w-full"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                onLoadedData={(e) => {
                  e.target.muted = true;
                  e.target.play().catch(err => console.log('Autoplay failed:', err));
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex  items-start sm:items-center justify-start gap-8 sm:gap-16 md:gap-24 lg:gap-40 pt-6 md:pt-7 lg:pt-16">
              <div>
                <ul className="">
                  {section.leftItems.map((item, index) => (
                    <li key={index} className="text-sm md:text-base">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="">
                  {section.rightItems.map((item, index) => (
                    <li key={index} className="text-sm md:text-base">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Image appears here on desktop */}
          <div className="hidden md:block md:basis-1/2">
            <video
              src={section.image}
              width={500}
              height={500}
              className="w-full h-full"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              onLoadedData={(e) => {
                e.target.muted = true;
                e.target.play().catch(err => console.log('Autoplay failed:', err));
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ))}
    </div>
  );
}
