'use client';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Cursor from 'mouse-follower';
import gsap from 'gsap';
import 'mouse-follower/dist/mouse-follower.min.css';

export default function BlogHero() {
  useEffect(() => {
    // Initialize mouse-follower cursor only on non-mobile devices
    Cursor.registerGSAP(gsap);

    let cursor = null;

    const initializeCursor = () => {
      try {
        // Check if device is not mobile or tablet
        if (window.innerWidth > 1024) {
          // Only initialize if not already initialized
          if (!cursor) {
            cursor = new Cursor({
              container: document.body,
              speed: 0.5,
              ease: 'expo.out',
              visibleTimeout: 300,
              hideNativeCursor: true,
            });
          }
        } else {
          // Destroy cursor if it exists and we're on mobile/tablet
          if (cursor) {
            cursor.destroy();
            cursor = null;
            // Restore native cursor
            document.body.style.cursor = 'auto';
          }
        }
      } catch (error) {
        console.error('Error initializing cursor:', error);
        // Ensure native cursor is visible if there's an error
        document.body.style.cursor = 'auto';
      }
    };

    // Initialize after a short delay
    const timeout = setTimeout(initializeCursor, 300);

    // Re-initialize on resize (handles orientation changes)
    window.addEventListener('resize', initializeCursor);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', initializeCursor);
      // Clean up cursor if it exists
      if (cursor) {
        cursor.destroy();
        cursor = null;
      }
    };
  }, []);

  return (
    <div className="py-20 md:py-40 px-4 md:px-8 lg:px-16 relative">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 1.0,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="text-4xl md:text-6xl lg:text-9xl italic pt-5 md:pt-10 tracking-tight leading-tight"
        style={{
          fontWeight: 300,
        }}
      >
        Our Latest <br /> Insights 📝
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 1.3,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="text-lg md:text-xl lg:text-2xl max-w-3xl mt-8 md:mt-12"
      >
        Explore our thoughts on design, development, and digital transformation. 
        Stay updated with the latest trends and insights from our team of experts.
      </motion.p>
    </div>
  );
}