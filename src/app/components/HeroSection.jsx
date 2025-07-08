"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const lines = [
    { text: "Your ideas our code", highlight: false },
    { text: " built to scale", highlight: true },
  ];

  return (
    <div className="relative pt-28 min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
      {/* Main content */}
      <div className="relative z-10">
        {/* Grid layout */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {/* First div - spans all 4 columns */}
          <div className="col-span-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="tracking-tight leading-tight"
              style={{
                position: "relative",
                zIndex: 2,
                fontWeight: 300,
                fontSize: 128,
              }}
            >
              Your ideas our code
            </motion.h2>
          </div>

          {/* Second div - spans 2 columns in row 2 */}
          <div className="col-span-2 row-start-2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="tracking-tight leading-tight"
              style={{
                position: "relative",
                zIndex: 2,
                fontWeight: 300,
                fontSize: 128,
              }}
            >
              built to scale
            </motion.h2>
          </div>

          {/* Third div - spans 2 columns and 2 rows */}
          <div className="col-span-2 row-span-2 col-start-1 row-start-3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg md:text-xl text-left text-gray-400 max-w-2xl"
            >
              We transform your vision into exceptional digital experiences with
              cutting-edge technology and thoughtful design. Our team of experts
              delivers innovative solutions tailored to your unique business
              needs.
            </motion.p>
          </div>

          {/* Fourth div - spans 2 columns and 3 rows, contains image */}
          <div className="col-span-2 row-span-3 col-start-3 row-start-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <video
                src="/header.mp4"
                autoPlay
                loop
                muted
                className="min-w-1 h-[200px] rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
