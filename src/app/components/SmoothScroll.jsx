'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { setLenisInstance } from '../utils/scrollUtils';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 0.6, // Control the duration of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
      smooth: true,
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });
    
    // Register the Lenis instance with our utility functions
    setLenisInstance(lenisRef.current);

    const animate = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return children;
}