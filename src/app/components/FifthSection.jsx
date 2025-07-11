"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Cursor from "mouse-follower";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";

export default function FifthSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [cursor, setCursor] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Setup scroll-based animation for border radius
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"] // Animation completes by the time section is centered in viewport
  });
  
  // Transform scroll progress to border radius value
  // Reach full border radius when scrolled halfway through the section
  // For desktop: 0px to 170px
  // For mobile: 0px to 80px
  const desktopBorderRadius = useTransform(scrollYProgress, [0, 0.2], [0, 170]);
  const mobileBorderRadius = useTransform(scrollYProgress, [0, 0.2], [0, 80]);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  useEffect(() => {
    // Register GSAP with Cursor
    Cursor.registerGSAP(gsap);
    
    let cursorInstance = null;
    
    // Initialize cursor only on desktop
    if (typeof window !== 'undefined' && window.innerWidth > 1024) {
      // Check if cursor already exists in the document
      const existingCursor = document.querySelector('.mf-cursor');
      
      if (!existingCursor) {
        cursorInstance = new Cursor({
          container: document.body,
          speed: 0.5,
          ease: "expo.out",
          visibleTimeout: 300,
          mediaBlend: false,
        });
        
        setCursor(cursorInstance);
      }
    }
    
    return () => {
      // Clean up cursor on component unmount only if we created it
      if (cursorInstance) {
        cursorInstance.destroy();
      }
    };
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // Store the play promise to handle it properly
        const playPromise = videoRef.current.play();
        
        // Handle the promise to avoid "play() request was interrupted" error
        if (playPromise !== undefined) {
          playPromise.catch(error => {
         
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  };
  
  const handleVideoHover = (videoElement) => {
    if (videoElement) {
      // Force play regardless of current state
      // Store the play promise to handle it properly
      const playPromise = videoElement.play();
      
      // Handle the promise to avoid "play() request was interrupted" error
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented or interrupted
          console.log('Video play error:', error);
          // Try again with user interaction flag
          videoElement.muted = true; // Ensure muted to allow autoplay
          videoElement.play().catch(e => console.log('Second attempt failed:', e));
        });
      }
    }
  };
  
  const handleVideoLeave = (videoElement) => {
    if (videoElement) {
      // Only pause if the video is actually playing
      if (!videoElement.paused) {
        videoElement.pause();
        
        // Smoothly reset video to beginning using GSAP
        const currentTime = videoElement.currentTime;
        gsap.to(videoElement, {
          duration: 0.5, // Increased duration for slower reset
          onUpdate: function() {
            const progress = this.progress();
            videoElement.currentTime = currentTime * (1 - progress);
          },
          ease: "power1.inOut" // More gradual easing function
        });
      }
    }
  };

  return (
    
    <motion.div 
      ref={sectionRef} 
      className="mt-10 py-10 lg:pl-38 px-10 bg-black " 
      style={{ 
        borderTopLeftRadius: isMobile ? mobileBorderRadius : desktopBorderRadius, 
        borderTopRightRadius: isMobile ? mobileBorderRadius : desktopBorderRadius 
      }}
    >
      <div className="pt-20 max-w-[1500px] mx-auto ">
        <motion.h5
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className="text-white md:text-9xl text-4xl "
        >
          Featured
        </motion.h5>
        <div className="flex items-center max-w-[1500px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-full pr-2 mt-2 md:w-[185px] md:h-[125px] w-[100] h-[70] lg:mt-12"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onClick={handleVideoClick}
              className="w-full h-full rounded-full cursor-pointer object-cover"
              src="/our-1.mp4"
              data-cursor="text"
              data-cursor-text="Explore"
              onMouseEnter={(e) => handleVideoHover(e.target)}
              onMouseLeave={(e) => handleVideoLeave(e.target)}
            ></video>
          </motion.div>

          <motion.h5
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="text-white md:text-9xl text-4xl"
          >
            projects
          </motion.h5>
        </div>
      </div>



<div className="pt-20 max-w-[1500px] mx-auto">

<div className="flex lg:flex-row flex-col justify-center items-center lg:justify-start   gap-20">

    <div className="flex flex-col gap-24">
        {[0, 1, 2].map((index) => (
            <motion.div 
                key={`left-${index}`}
                className="relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 1.2, 
                    delay: 0.2 * index,
                    ease: [0.25, 0.1, 0.25, 1.0] 
                }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <video 
                  className="w-[400px]  h-[535px] rounded-[45px] object-cover cursor-pointer" 
                  src="/cover.mp4"
                  data-cursor="-text"
                  data-cursor-text="Explore"
                  onMouseEnter={(e) => handleVideoHover(e.target)}
                  onMouseLeave={(e) => handleVideoLeave(e.target)}
                ></video>
                <p className="text-white text-xl pt-5"> 
                    <span className="font-semibold">Punto Pago</span> – The First Super-App <br /> in Latin America
                </p>
            </motion.div>
        ))}
    </div>
   
    <div className="flex flex-col">
        <motion.div 
            className="lg:pt-[280px] "
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration:1.2, 
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1.0] 
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <video 
              className="w-[400px] h-[535px] rounded-[45px] object-cover cursor-pointer" 
              src="/cover-1.mp4"
              data-cursor="-text"
              data-cursor-text="Explore"
              onMouseEnter={(e) => handleVideoHover(e.target)}
              onMouseLeave={(e) => handleVideoLeave(e.target)}
            ></video>
            <p className="text-white text-xl pt-5"> 
                <span className="font-semibold">Kelvin Zero –</span> The First Super-App <br /> passwordless authentication
            </p>
        </motion.div>

        {[1, 2].map((index) => (
            <motion.div 
                key={`right-${index}`}
                className="lg:pt-[120px] pt-[90px]"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + (0.2 * index),
                    ease: [0.25, 0.1, 0.25, 1.0] 
                }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <video 
                  className="w-[400px] h-[535px] rounded-[45px] object-cover cursor-pointer" 
                  src="/cover-1.mp4"
                  data-cursor="-text"
                  data-cursor-text="Explore"
                  onMouseEnter={(e) => handleVideoHover(e.target)}
                  onMouseLeave={(e) => handleVideoLeave(e.target)}
                ></video>
                <p className="text-white text-xl pt-5"> 
                    <span className="font-semibold">Kelvin Zero –</span> The First Super-App <br /> passwordless authentication
                </p>
            </motion.div>
        ))}
    </div>
</div>







</div>







    </motion.div>      
   
  
  );
}
