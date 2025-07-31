'use client';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LazyVideo from './LazyVideo';
import { useAssetCache } from '../hooks/useAssetCache';

export default function Philosophy() {
  const videoRef = useRef(null);
  const { preloadPageAssets } = useAssetCache();
  
  // Create refs for the header and text paragraphs
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });
  
  const [firstParagraphRef, firstParagraphInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  const [secondParagraphRef, secondParagraphInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  useEffect(() => {
    // Preload philosophy section video assets using caching system
    const preloadPhilosophyAssets = async () => {
      try {
        const philosophyAssets = {
          videos: [{ src: "/ta2.mp4" }],
          images: [],
          critical: []
        };
        await preloadPageAssets(philosophyAssets);
        console.log('PhilosophySection videos preloaded via cache system');
      } catch (error) {
        console.error('Error preloading philosophy assets:', error);
      }
    };

    preloadPhilosophyAssets();

    // More robust video initialization and autoplay
    const videoElement = videoRef.current;
    if (videoElement) {
      // Make sure video is properly loaded
      videoElement.load();
      
      // Set up event listeners
      const handleCanPlay = () => {
        // Try to play when it's ready
        videoElement.play().catch(error => {
          // If autoplay fails, try again with user interaction simulation
          videoElement.muted = true; // Ensure muted to allow autoplay
          videoElement.play().catch(e => {/* Second attempt failed */});
        });
      };
      
      videoElement.addEventListener('canplaythrough', handleCanPlay);
      
      // Try to play immediately as well
      videoElement.play().catch(() => {
        // Silent catch - we'll try again on canplaythrough
      });
      
      // Cleanup
      return () => {
        videoElement.removeEventListener('canplaythrough', handleCanPlay);
      };
    }
  }, []);

  // Function to split text into words for animation
  const splitText = (text, isHeader = false) => {
    return text.split(' ').map((word, index) => (
      <motion.span 
        key={index} 
        className="inline-block mr-[0.25em]"
        initial={{ 
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", 
          transform: "translateY(25px)"
        }}
        animate={{ 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
          transform: "translateY(0px)",
          transition: {
            duration: isHeader ? 0.7 : 0.9, // Slower for paragraphs
            delay: isHeader ? index * 0.15 : 0.3 + (index * 0.08), // Wave effect with longer delays
            ease: [0.1, 0.6, 0.2, 1] // More pronounced wave-like easing
          }
        }}
      >
        {word}
      </motion.span>
    ));
  };

  // Function for paragraph text with wave animation
  const splitParagraphText = (text) => {
    return text.split(' ').map((word, index) => {
      // Calculate a sine-wave based delay for a true wave effect
      const wavePosition = Math.sin(index * 0.3) * 0.2;
      const baseDelay = 0.5; // Start after header animation
      const waveDelay = baseDelay + (index * 0.06) + wavePosition;
      
      return (
        <motion.span 
          key={index} 
          className="inline-block mr-[0.25em]"
          initial={{ 
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", 
            transform: "translateY(20px)"
          }}
          animate={{ 
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
            transform: "translateY(0px)",
            transition: {
              duration: 0.8, // Slower, smoother animation
              delay: waveDelay, // Wave-like delay pattern
              ease: [0.1, 0.6, 0.2, 1] // Smooth easing
            }
          }}
        >
          {word}
        </motion.span>
      );
    });
  };

  return (
    <div className="bg-black">
      <div className="bg-white lg:rounded-t-[170px] rounded-t-[100]">
        <h4 
          ref={headerRef}
          className="lg:text-9xl text-4xl md:text-8xl md:pt-38 pt-20 lg:pl-30 pl-10"
        >
          {headerInView ? (
            <>
              {splitText("Our", true)}
              <br />
              {splitText("philosophy", true)}
            </>
          ) : (
            <>
              Our <br />
              philosophy
            </>
          )}
        </h4>
      </div>
      <div className="flex lg:flex-row flex-col items-center pt-10 bg-white">
        <div className="lg:w-1/2 relative">
          <LazyVideo ref={videoRef} className="object-cover w-full lg:p-10" autoPlay loop muted playsInline src="/ta2.mp4" />
        </div>
        <div className="lg:w-1/2 pb-10 lg:pb-0">
          <motion.p 
            ref={firstParagraphRef}
            className="lg:text-2xl text-xl lg:pr-40 px-10 lg:px-0"
          >
            {firstParagraphInView ? splitParagraphText(
              "In our team, developers work alongside designers, strategists and analysts. Cuberto doesn't do cookie-cutter solutions and we build products exactly as they were during the design phase, no short cuts or simplifications."
            ) : (
              "In our team, developers work alongside designers, strategists and analysts. Cuberto doesn't do cookie-cutter solutions and we build products exactly as they were during the design phase, no short cuts or simplifications."
            )}
          </motion.p>
          <motion.p 
            ref={secondParagraphRef}
            className="lg:text-2xl text-xl pt-7 lg:pr-40 px-10 lg:px-0"
          >
            {secondParagraphInView ? splitParagraphText(
              "We're driven by user‑centered design that drives productivity and increases revenue. Our expertise and ingenuity are remarkable, yet we always strive to outdo and outperform our previous achievements."
            ) : (
              "We're driven by user‑centered design that drives productivity and increases revenue. Our expertise and ingenuity are remarkable, yet we always strive to outdo and outperform our previous achievements."
            )}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
