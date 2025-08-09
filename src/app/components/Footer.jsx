"use client";
import { GoArrowUpRight } from "react-icons/go";
import { useEffect } from "react";
import Cursor from "mouse-follower";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";

export default function Footer() {
  useEffect(() => {
    // Initialize mouse-follower cursor only on non-mobile devices
    Cursor.registerGSAP(gsap);
    
    let cursor = null;
    
    const initializeCursor = () => {
      // Check if device is not mobile or tablet
      if (window.innerWidth > 1024) {
        // Only initialize if not already initialized
        if (!cursor) {
          cursor = new Cursor({
            container: document.body,
            speed: 0.5,
            ease: "expo.out",
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
    <div className="bg-black pt-10">
      <div className="overflow-hidden w-full">
        {" "}
        {/* Added overflow-hidden and w-full to container */}
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 50s linear infinite;
            width: max-content; /* Ensures the content takes its natural width */
          }
          
          /* Pause marquee on hover */
          .follow-us-marquee:hover .animate-marquee {
            animation-play-state: paused;
          }
          
          /* Instagram links animation */
          @keyframes instagram-marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          
          .instagram-links .animate-marquee {
            animation: instagram-marquee 15s linear infinite;
            display: flex;
            flex-wrap: nowrap;
            width: max-content;
          }
          
          /* Slow down Instagram marquee on hover */
          .instagram-links:hover .animate-marquee {
            animation-duration: 30s;
          }
          
          /* Social media hover animation */
          .social-hover-container {
            position: relative;
            overflow: hidden;
          }
          
          .social-reveal-top {
            position: absolute;
            top: 0;
            left: 0;
            height: 50%;
            width: 100%;
            background-color: black;
            transform-origin: bottom;
            transition: transform 0.5s ease;
          }
          
          .social-reveal-bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 50%;
            width: 100%;
            background-color: black;
            transform-origin: top;
            transition: transform 0.5s ease;
          }
          
          .group:hover .social-reveal-top {
            transform: translateY(-100%); /* Move upward */
          }
          
          .group:hover .social-reveal-bottom {
            transform: translateY(100%); /* Move downward */
          }
          
          /* Specific colors for different social media platforms */
          .instagram-hover-container .social-text {
            color: white;
          }
          
          .facebook-hover-container .social-text {
            color: white;
          }
          
          .twitter-hover-container .social-text {
            color: white;
          }
          
          .linkedin-hover-container .social-text {
            color: white;
          }
          
          /* Make social media text disappear on hover */
          .social-text {
            transition: opacity 0.3s ease; /* Add transition for smooth effect */
          }
          
          .group:hover .social-text {
            opacity: 0; /* Make text completely invisible on hover */
          }
          
          /* Social media marquee animations */
          @keyframes facebook-marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          
          .facebook-links .animate-marquee {
            animation: facebook-marquee 15s linear infinite;
            display: flex;
            flex-wrap: nowrap;
            width: max-content;
          }
          
          @keyframes twitter-marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          
          .twitter-links .animate-marquee {
            animation: twitter-marquee 15s linear infinite;
            display: flex;
            flex-wrap: nowrap;
            width: max-content;
          }
          
          @keyframes linkedin-marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          
          .linkedin-links .animate-marquee {
            animation: linkedin-marquee 15s linear infinite;
            display: flex;
            flex-wrap: nowrap;
            width: max-content;
          }
          
          /* Slow down social media marquees on hover */
          .facebook-links:hover .animate-marquee {
            animation-duration: 30s;
          }
          
          .twitter-links:hover .animate-marquee {
            animation-duration: 30s;
          }
          
          .linkedin-links:hover .animate-marquee {
            animation-duration: 30s;
          }
          
          /* Add hover effect for the Follow Us marquee */
          .follow-us-marquee {
            transition: transform 0.3s ease, color 0.3s ease;
          }
          
          .follow-us-marquee span:hover {
            color: #ff3366; /* Change color on hover */
            transform: scale(1.05); /* Slightly increase size on hover */
            display: inline-block;
          }
          
          /* Remove margin-bottom that was pushing content down */
          .group:hover {
            /* No additional margin needed since animation is in the same place */
          }

          .marquee-container {
            overflow: hidden;
            width: 100%;
            position: relative;
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
        <div className="marquee-container follow-us-marquee">
          {" "}
          {/* Added container with overflow hidden and follow-us-marquee class */}
          <p className="lg:text-9xl md:text-7xl text-3xl animate-marquee text-nowrap text-white">
            <span 
              className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105" 
              data-cursor-text="Follow Us" 
           
              id="follow-us-1"
            >
              Follow Us
            </span>
            <span 
              className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105"
              data-cursor-text="Follow Us" 
          
              id="follow-us-2"
            >
              Follow Us
            </span>
            <span 
              className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105"
              data-cursor-text="Follow Us" 
         
              id="follow-us-3"
            >
              Follow Us
            </span>
            {/* Duplicate content for continuous scrolling */}

            <span 
              className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105"
              data-cursor-text="Follow Us" 
        
              id="follow-us-4"
            >
              Follow Us
            </span>
            <span 
              className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105"
              data-cursor-text="Follow Us" 
           
              id="follow-us-5"
            >
              Follow Us
            </span>
            <span 
              className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105"
              data-cursor-text="Follow Us" 
     
              id="follow-us-6"
            >
              Follow Us
            </span>
          </p>
        </div>
      </div>

      <div className="">
        <h6 className="text-white md:text-2xl text-lg pt-30 md:px-20 pl-7 ">
          Social Media and contacts
        </h6>

        <div className="relative">
          {/* We've moved the marquee animation to be in the same position as the Instagram text */}

          <div className="absolute top-[79px] right-0 w-full mt-10 border-t-[1px] border-white/50 group cursor-pointer transition-all duration-500 instagram-hover-container social-hover-container lg:block hidden">
            {/* Instagram header - always visible and positioned above the marquee */}
            <div className="text-white md:text-4xl text-2xl py-10 absolute w-full left-0 top-0 z-20 social-text">
              <div className="md:px-20 px-7 flex items-center justify-between">
                <a href="https://www.instagram.com/prosental_agency/" target="_blank" rel="noopener noreferrer" data-cursor-text="Instagram" data-cursor-stick="#instagram-text" id="instagram-text">Instagram</a>
                <GoArrowUpRight />
              </div>
            </div>

            {/* Marquee animation that appears on hover - positioned behind the Instagram text */}
            <div className="marquee-container instagram-links px-20 text-white md:text-4xl text-2xl py-10 bg-gradient-to-r from-[#405DE6] via-[#C13584] to-[#F56040] absolute w-full left-0 top-0 h-full z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center overflow-hidden">
              <div className="animate-marquee flex items-center gap-5">
                {/* Instagram links - first set */}
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>

                {/* Instagram links - duplicated for continuous scrolling */}
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.instagram.com/prosental_agency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>
            </div>

            {/* Add the reveal animation elements */}
            <div className="social-reveal-top"></div>
            <div className="social-reveal-bottom"></div>
          </div>

          {/* Facebook Section */}
          <div className="absolute top-[40px] right-0 w-full mt-10 border-t-[1px] border-white/50 group cursor-pointer transition-all duration-500 facebook-hover-container social-hover-container lg:block hidden">
            {/* Facebook header - always visible and positioned above the marquee */}
            <div className="text-white md:text-4xl text-2xl pt-10 absolute w-full left-0 top-0 z-20 social-text">
              <div className="md:px-20 px-7 flex items-center justify-between">
                <a href="https://www.facebook.com/prosentalagency/" target="_blank" rel="noopener noreferrer" data-cursor-text="Facebook" data-cursor-stick="#facebook-text" id="facebook-text">Facebook</a>
                <GoArrowUpRight />
              </div>
            </div>

            {/* Marquee animation that appears on hover - positioned behind the Facebook text */}
            <div className="marquee-container  facebook-links px-20 text-black lg:text-4xl text-2xl py-10 bg-[#1877F2] absolute w-full left-0 top-0 h-full z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center overflow-hidden">
              <div className="animate-marquee flex items-center gap-5">
                {/* Facebook links - first set */}
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.facebook.com/prosentalagency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.facebook.com/prosentalagency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.facebook.com/prosentalagency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.facebook.com/prosentalagency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.facebook.com/prosentalagency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.facebook.com/prosentalagency/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>

                {/* Facebook links - duplicated for continuous scrolling */}
                <div onClick={() => window.open('https://www.facebook.com/prosentalagency/', '_blank')} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">

                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={() => window.open('https://www.facebook.com/prosentalagency/', '_blank')} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">

                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={() => window.open('https://www.facebook.com/prosentalagency/', '_blank')} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">

                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={() => window.open('https://www.facebook.com/prosentalagency/', '_blank')} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">

                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={() => window.open('https://www.facebook.com/prosentalagency/', '_blank')} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">

                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div onClick={() => window.open('https://www.facebook.com/prosentalagency/', '_blank')} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">

                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>
            </div>

            {/* Add the reveal animation elements */}
            <div className="social-reveal-top"></div>
            <div className="social-reveal-bottom"></div>
          </div>

          {/* Twitter/X Section */}
          <div className="absolute top-[0px] right-0 w-full mt-10 border-t-[1px] border-white/50 group cursor-pointer transition-all duration-500 twitter-hover-container social-hover-container lg:block hidden">
            {/* Twitter/X header - always visible and positioned above the marquee */}
            <div className="text-white lg:text-4xl text-2xl pt-10 absolute w-full left-0 top-0 z-20 social-text">
              <div className="md:px-20 px-7 flex items-center justify-between">
                <a href="https://x.com/prosental_" target="_blank" rel="noopener noreferrer" data-cursor-text="X (Twitter)" data-cursor-stick="#twitter-text" id="twitter-text">X (Twitter)</a>
                <GoArrowUpRight />
              </div>
            </div>

            {/* Marquee animation that appears on hover - positioned behind the Twitter text */}
            <div className="marquee-container twitter-links px-20 text-black md:text-4xl text-2xl py-10 bg-black absolute w-full left-0 top-0 h-full z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center overflow-hidden">
              <div className="animate-marquee flex items-center gap-5">
                {/* Twitter/X links - first set */}
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>

                {/* Twitter/X links - duplicated for continuous scrolling */}
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://x.com/prosental_', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">X (Twitter)</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
              </div>
            </div>

            {/* Add the reveal animation elements */}
            <div className="social-reveal-top"></div>
            <div className="social-reveal-bottom"></div>
          </div>

          {/* LinkedIn Section */}
          <div className="absolute top-[-40px] right-0 w-full mt-10 border-t-[1px] border-white/50 group cursor-pointer transition-all duration-500 linkedin-hover-container social-hover-container lg:block hidden">
            {/* LinkedIn header - always visible and positioned above the marquee */}
            <div className="text-white lg:text-4xl text-2xl pt-10 absolute w-full left-0 top-0 z-20 social-text">
              <div className="md:px-20 px-7 flex items-center justify-between">
                <a href="https://www.linkedin.com/company/prosental/" target="_blank" rel="noopener noreferrer" data-cursor-text="LinkedIn" data-cursor-stick="#linkedin-text" id="linkedin-text">LinkedIn</a>
                <GoArrowUpRight />
              </div>
            </div>

            {/* Marquee animation that appears on hover - positioned behind the LinkedIn text */}
            <div className="marquee-container linkedin-links px-20 text-white md:text-4xl text-2xl py-10 bg-[#0077B5] absolute w-full left-0 top-0 h-full z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center overflow-hidden">
              <div className="animate-marquee flex items-center gap-5">
                {/* LinkedIn links - first set */}
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>

                {/* LinkedIn links - duplicated for continuous scrolling */}
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
                <div onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.linkedin.com/company/prosental/', '_blank');
                }} className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p className="text-white">LinkedIn</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45 text-white" />
                </div>
              </div>
            </div>

            {/* Add the reveal animation elements */}
            <div className="social-reveal-top"></div>
            <div className="social-reveal-bottom"></div>
          </div>
        </div>
        
        {/* Mobile Social Media Section - only visible on mobile and tablet */}
        <div className="lg:hidden block w-full mt-5 ">
          <div className="flex flex-col gap-6 py-10 px-7">
            
            
            {/* Mobile Instagram Link */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://www.instagram.com/prosental_agency/', '_blank');
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-white/10 p-4 rounded-lg transition-all duration-300"
            >
              <p className="text-white text-xl">Instagram</p>
              <GoArrowUpRight className="text-white text-xl" />
            </div>
            
            {/* Mobile Facebook Link */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://www.facebook.com/prosentalagency/', '_blank');
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-white/10 p-4 rounded-lg transition-all duration-300"
            >
              <p className="text-white text-xl">Facebook</p>
              <GoArrowUpRight className="text-white text-xl" />
            </div>
            
            {/* Mobile X (Twitter) Link */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://x.com/prosental_', '_blank');
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-white/10 p-4 rounded-lg transition-all duration-300"
            >
              <p className="text-white text-xl">X (Twitter)</p>
              <GoArrowUpRight className="text-white text-xl" />
            </div>
            
            {/* Mobile LinkedIn Link */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://www.linkedin.com/company/prosental/', '_blank');
              }}
              className="flex items-center justify-between cursor-pointer hover:bg-white/10 p-4 rounded-lg transition-all duration-300"
            >
              <p className="text-white text-xl">LinkedIn</p>
              <GoArrowUpRight className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
