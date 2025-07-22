"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function ThirdSection() {
  const sectionRef = useRef(null);
  
  return (
    <div id="third-section" ref={sectionRef}>
      {/* === Marquee Section === */}
      <div className="relative overflow-hidden whitespace-nowrap">
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 50s linear infinite;
          }
        `}</style>
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
  viewport={{ once: true, amount: 0.3 }}
  className="text-center md:pt-14 md:pb-5 pb-7 md:text-xl text-lg" 
  style={{ fontWeight: 300 }}
>
  WHAT WE DO?
</motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="animate-marquee md:pb-2 md:pt-7"
        >
          <span className="lg:text-8xl text-xl md:text-5xl">
            INNOVATION / UI/UX DESIGN / WEB DEVELOPMENT / MOBILE APPS / DIGITAL STRATEGY / CUSTOM SOFTWARE / BRAND IDENTITY / E-COMMERCE SOLUTIONS / CLOUD INTEGRATION / SAAS PLATFORMS /
          </span>
          <span className="lg:text-8xl text-xl md:text-5xl">
            INNOVATION / UI/UX DESIGN / WEB DEVELOPMENT / MOBILE APPS / DIGITAL STRATEGY / CUSTOM SOFTWARE / BRAND IDENTITY / E-COMMERCE SOLUTIONS / CLOUD INTEGRATION / SAAS PLATFORMS /
          </span>
        </motion.div>
      </div>

      {/* === Line-by-line Fade-in Animation === */}
      <div className="md:py-10 pt-6 px-4 text-center max-w-7xl mx-auto">
        <div className="lg:text-4xl md:text-3xl text-xs flex flex-col items-center justify-center w-full" style={{ fontWeight: 300 }}>
          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
              viewport={{ once: true, amount: 0.3 }}
              className="py-2 tracking-tight leading-tight"
            >
              We empower brands by transforming ideas into digital experiences.
            </motion.div>
          </div>
          <div className="w-full">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }}
              viewport={{ once: true, amount: 0.3 }}
              className="py-2 tracking-tight leading-tight"
            >
              Specializing in custom web and mobile app development.
            </motion.p>
          </div>
          <div className="w-full">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
              viewport={{ once: true, amount: 0.3 }}
              className="py-2 tracking-tight leading-tight"
            >
              Our team delivers intuitive and high-performance applications.
            </motion.p>
          </div>
          <div className="w-full">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              viewport={{ once: true, amount: 0.3 }}
              className="py-2 tracking-tight leading-tight"
            >
              We create tools that reflect your brand and drive growth.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
