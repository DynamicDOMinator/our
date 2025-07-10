"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ThirdSection() {
  const sectionRef = useRef(null);
  const typingLinesRef = useRef([]);
  
  useEffect(() => {
    // Reset refs array
    typingLinesRef.current = [];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When section is visible, animate the typing lines
            gsap.to(".typing-line", {
              width: "100%",
              opacity: 1,
              duration: 2,
              ease: "power2.out",
              stagger: 1, // 1 second delay between each line
            });
            
            // Disconnect observer after animation is triggered
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );
    
    // Observe the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
  
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

          .typing-line {
            overflow: hidden;
            width: 0;
            opacity: 0;
            text-align: center;
            white-space: nowrap;
            display: inline-block;
            max-width: 100%;
            margin: 0 auto;
          }
        `}</style>
<div className="text-center md:pt-14 md:pb-5 pb-7 md:text-xl text-lg font-semibold  ">
  WHAT WE DO?
</div>
        <div className="animate-marquee md:pb-2 md:pt-7">
          <span className="lg:text-8xl text-xl md:text-5xl">
            INNOVATION / UI/UX DESIGN / WEB DEVELOPMENT / MOBILE APPS / DIGITAL STRATEGY / CUSTOM SOFTWARE / BRAND IDENTITY / E-COMMERCE SOLUTIONS / CLOUD INTEGRATION / SAAS PLATFORMS /
          </span>
          <span className="lg:text-8xl text-xl md:text-5xl">
            INNOVATION / UI/UX DESIGN / WEB DEVELOPMENT / MOBILE APPS / DIGITAL STRATEGY / CUSTOM SOFTWARE / BRAND IDENTITY / E-COMMERCE SOLUTIONS / CLOUD INTEGRATION / SAAS PLATFORMS /
          </span>
        </div>
      </div>

      {/* === Line-by-line Typing Animation === */}
      <div className="md:py-10 pt-6 px-4 text-center max-w-7xl mx-auto ">
        <div className="lg:text-4xl  md:text-3xl text-xs font-[400] flex flex-col items-center justify-center  w-full">
          <div className="w-full ">
            <div className="typing-line line-1 py-2">
              We empower brands by transforming ideas into digital experiences.
            </div>
          </div>
          <div className="w-full">
            <p className="typing-line line-2 py-2">
              Specializing in custom web and mobile app development.
            </p>
          </div>
          <div className="w-full">
            <p className="typing-line line-3 py-2">
              Our team delivers intuitive and high-performance applications.
            </p>
          </div>
          <div className="w-full">
            <p className="typing-line line-4 py-2">
              We create tools that reflect your brand and drive growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
