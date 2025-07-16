"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Cursor from "mouse-follower";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";
import { MdAttachFile } from "react-icons/md";

export default function Contacts() {
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
          document.body.style.cursor = "auto";
        }
      }
    };

    // Initialize after a short delay
    const timeout = setTimeout(initializeCursor, 300);

    // Re-initialize on resize (handles orientation changes)
    window.addEventListener("resize", initializeCursor);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", initializeCursor);
      // Clean up cursor if it exists
      if (cursor) {
        cursor.destroy();
        cursor = null;
      }
    };
  }, []);

  return (
    <div className="py-20 md:py-40 px-4 md:px-8 lg:px-16 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 1.0,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="text-4xl md:text-6xl lg:text-9xl pt-5 md:pt-10 tracking-tight leading-tight"
        style={{
          fontWeight: 300,
        }}
      >
        Hey! Tell us all <br /> the things 👋
      </motion.h1>

      <p className="pt-10 md:pt-20 text-xl md:text-2xl lg:text-3xl">
        I'm interested in...
      </p>
      <div className="pt-5 md:pt-10">
        <ul className="flex flex-wrap gap-3 md:gap-6 lg:gap-10 max-w-[900px]">
          <li
            className="text-sm md:text-xl lg:text-3xl p-3 md:p-4 lg:p-6 rounded-full border-2 relative cursor-pointer transition-all duration-500 group overflow-hidden hover:bg-black hover:text-white"
            data-cursor-stick="#contact-1"
            id="contact-1"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-[-155%] relative z-10">
              Site from scratch
            </span>
            <span className="inline-block absolute top-full left-4 w-full transition-transform duration-500 text-white group-hover:translate-y-[-160%] z-10">
              Site from scratch
            </span>
            <span className="absolute bottom-0 left-4 right-0 h-0 rounded-full bg-black transition-all duration-500 group-hover:h-full z-[1]"></span>
          </li>
          <li
            className="text-sm md:text-xl lg:text-3xl p-3 md:p-4 lg:p-6 rounded-full border-2 relative cursor-pointer transition-all duration-500 group overflow-hidden hover:bg-black hover:text-white"
            data-cursor-stick="#contact-2"
            id="contact-2"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-[-170%] relative z-10">
              UI/UX Design
            </span>
            <span className="inline-block absolute top-full left-4 w-full transition-transform duration-500 text-white group-hover:translate-y-[-160%] z-10">
              UI/UX Design
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-0 rounded-full bg-black transition-all duration-500 group-hover:h-full z-[1]"></span>
          </li>
          <li
            className="text-sm md:text-xl lg:text-3xl p-3 md:p-4 lg:p-6 rounded-full border-2 relative cursor-pointer transition-all duration-500 group overflow-hidden hover:bg-black hover:text-white"
            data-cursor-stick="#contact-3"
            id="contact-3"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-[-170%] relative z-10">
              Product design
            </span>
            <span className="inline-block absolute top-full left-4 w-full transition-transform duration-500 text-white group-hover:translate-y-[-160%] z-10">
              Product design
            </span>
            <span className="absolute bottom-0 left-4 right-0 h-0 rounded-full bg-black transition-all duration-500 group-hover:h-full z-[1]"></span>
          </li>
          <li
            className="text-sm md:text-xl lg:text-3xl p-3 md:p-4 lg:p-6 rounded-full border-2 relative cursor-pointer transition-all duration-500 group overflow-hidden hover:bg-black hover:text-white"
            data-cursor-stick="#contact-4"
            id="contact-4"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-[-170%] relative z-10">
              Webflow site
            </span>
            <span className="inline-block absolute top-full left-4 w-full transition-transform duration-500 text-white group-hover:translate-y-[-160%] z-10">
              Webflow site
            </span>
            <span className="absolute bottom-0 left-4 right-0 h-0 rounded-full bg-black transition-all duration-500 group-hover:h-full z-[1]"></span>
          </li>
          <li
            className="text-sm md:text-xl lg:text-3xl p-3 md:p-4 lg:p-6 rounded-full border-2 relative cursor-pointer transition-all duration-500 group overflow-hidden hover:bg-black hover:text-white"
            data-cursor-stick="#contact-5"
            id="contact-5"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-[-170%] relative z-10">
              Branding
            </span>
            <span className="inline-block absolute top-full left-4 w-full transition-transform duration-500 text-white group-hover:translate-y-[-160%] z-10">
              Branding
            </span>
            <span className="absolute bottom-0 left-4 right-0 h-0 rounded-full bg-black transition-all duration-500 group-hover:h-full z-[1]"></span>
          </li>
          <li
            className="text-sm md:text-xl lg:text-3xl p-3 md:p-4 lg:p-6 rounded-full border-2 relative cursor-pointer transition-all duration-500 group overflow-hidden hover:bg-black hover:text-white"
            data-cursor-stick="#contact-6"
            id="contact-6"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-[-170%] relative z-10">
              Mobile development
            </span>
            <span className="inline-block absolute top-full left-4 w-full transition-transform duration-500 text-white group-hover:translate-y-[-160%] z-10">
              Mobile development
            </span>
            <span className="absolute bottom-0 left-4 right-0 h-0 rounded-full bg-black transition-all duration-500 group-hover:h-full z-[1]"></span>
          </li>
        </ul>
      </div>

      <div className="pt-10 md:pt-20">
        <form className="flex flex-col gap-10 md:gap-20">
          <input
            className="border-b-2 border-gray-300 focus:border-black pb-2 md:pb-3 focus:outline-none w-full md:w-[80vw] lg:w-[60vw] text-lg md:text-2xl lg:text-4xl placeholder:text-lg md:placeholder:text-2xl lg:placeholder:text-4xl transition-colors duration-300 ease-in-out"
            type="text"
            placeholder="Your name"
          />
          <input
            className="border-b-2 border-gray-300 focus:border-black pb-2 md:pb-3 focus:outline-none w-full md:w-[80vw] lg:w-[60vw] text-lg md:text-2xl lg:text-4xl placeholder:text-lg md:placeholder:text-2xl lg:placeholder:text-4xl transition-colors duration-300 ease-in-out"
            type="email"
            placeholder="Email"
          />

          <input
            className="border-b-2 border-gray-300 focus:border-black pb-2 md:pb-3 focus:outline-none w-full md:w-[80vw] lg:w-[60vw] text-lg md:text-2xl lg:text-4xl placeholder:text-lg md:placeholder:text-2xl lg:placeholder:text-4xl transition-colors duration-300 ease-in-out"
            type="text"
            placeholder="Tell us about your project"
          />

          <div className="relative pt-10">
            <input
              type="file"
              id="file-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 md:gap-3 text-lg md:text-2xl lg:text-4xl cursor-pointer pb-2 md:pb-3 transition-colors duration-300 ease-in-out w-fit"
            >
              <MdAttachFile className="text-lg md:text-2xl lg:text-3xl" />
              <span className=" border-b-2 pb-2 border-gray-300 ">
                Add attachment
              </span>
            </label>
          </div>
          <button
            className="mr-auto text-lg md:text-2xl lg:text-4xl p-6 md:p-12 lg:p-24 border-2 rounded-full relative cursor-pointer transition-all duration-500 group overflow-hidden hover:bg-black hover:text-white"
            data-cursor-stick="#send-button"
            id="send-button"
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-y-[-360%] relative z-10">
              Send Request
            </span>
            <span className="inline-block absolute top-full left-0 w-full transition-transform duration-500 text-white group-hover:translate-y-[-360%] z-10">
              Send Request
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-0 rounded-full bg-black transition-all duration-500 group-hover:h-full z-[1]"></span>
          </button>
        </form>
      </div>
    </div>
  );
}
