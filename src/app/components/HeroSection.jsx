"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLoading } from "../contexts/LoadingContext";

export default function HeroSection() {
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const { isLoadingComplete } = useLoading();

  const lines = [
    { text: "Your ideas our code", highlight: false },
    { text: " built to scale", highlight: true },
  ];

  useEffect(() => {
    // Only initialize videos after loading is complete
    if (!isLoadingComplete) return;

    // Enhanced video initialization to prevent lazy loading
    const initVideo = (videoElement, videoName) => {
      if (!videoElement) return;

      // Force immediate loading of video
      videoElement.load();
      videoElement.preload = "auto";

      // Disable any browser lazy loading behavior
      if ("loading" in videoElement) {
        videoElement.loading = "eager";
      }

      // Set up event listeners with priority on immediate playback
      const handleCanPlay = () => {
        videoElement.play().catch((error) => {
          // If autoplay fails, try again with user interaction simulation
          videoElement.muted = true; // Ensure muted to allow autoplay
          videoElement
            .play()
            .catch((e) => {
              /* ${videoName} second attempt failed */
            });
        });
      };

      // Listen for the loadedmetadata event which fires earlier than canplaythrough
      videoElement.addEventListener("loadedmetadata", handleCanPlay);
      videoElement.addEventListener("canplaythrough", handleCanPlay);

      // Try to play immediately as well
      videoElement.play().catch(() => {
        // Silent catch - we'll try again on events
      });

      return () => {
        videoElement.removeEventListener("loadedmetadata", handleCanPlay);
        videoElement.removeEventListener("canplaythrough", handleCanPlay);
      };
    };

    // Initialize both videos
    const cleanupMobile = initVideo(mobileVideoRef.current, "Mobile");
    const cleanupDesktop = initVideo(desktopVideoRef.current, "Desktop");

    // Cleanup
    return () => {
      if (cleanupMobile) cleanupMobile();
      if (cleanupDesktop) cleanupDesktop();
    };
  }, [isLoadingComplete]);

  return (
    <div
      id="hero-section"
      className="relative pt-30  lg:min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden"

    >
      {/* Main content */}
      <div className="relative z-10">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto lg:grid-rows-2 gap-4 max-w-[1500px] mr-auto">
          {/* First div - spans all 4 columns */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.0,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="tracking-tight 2xl:text-[128px] md:text-7xl text-3xl leading-tight"
              style={{
                position: "relative",
                zIndex: 2,
                fontWeight: 300,
              }}
            >
              Your ideas our code
            </motion.h2>
          </div>

          {/* Second div - spans 2 columns in row 2 */}
          <div className="col-span-1 2xl:text-[128px] md:text-7xl text-3xl  md:col-span-2 lg:col-span-2 lg:row-start-2 flex flex-row items-center gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 1.3,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="tracking-tight leading-tight"
              style={{
                position: "relative",
                zIndex: 2,
                fontWeight: 300,
              }}
            >
              built to scale
            </motion.h2>

            {/* Video for mobile and tablet - inline with text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="block lg:hidden ml-2"
            >
              <video
                ref={mobileVideoRef}
                loop
                muted
                playsInline
                preload="auto"
                loading="eager"
                className="h-[70px] w-[100px] md:h-[100px] md:w-[150px] rounded-full object-cover"
              >
                <source
                  src="/header.mp4"
                  type="video/mp4"
                  fetchPriority="high"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>

          {/* Third div - spans 2 columns and 2 rows */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className=" md:text-xl text-left text-gray-400 max-w-2xl"
            >
              We transform your vision into exceptional digital experiences with
              cutting-edge technology and thoughtful design. Our team of experts
              delivers innovative solutions tailored to your unique business
              needs.
            </motion.p>
          </div>

          {/* Fourth div - spans 2 columns and 3 rows, contains image - only visible on desktop */}
          <div className="hidden lg:block col-span-2 lg:col-span-2 lg:row-span-3 place-content-center lg:col-start-3 lg:row-start-2 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <video
                ref={desktopVideoRef}
                loop
                muted
                playsInline
                preload="auto"
                loading="eager"
                className="min-w-1 h-[200px] w-full lg:w-auto rounded-full object-cover"
              >
                <source
                  src="/header.mp4"
                  type="video/mp4"
                  fetchPriority="high"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
