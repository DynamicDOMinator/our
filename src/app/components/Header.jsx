"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Cursor from "mouse-follower";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInFifthSection, setIsInFifthSection] = useState(false);
  const [isInBlogHero, setIsInBlogHero] = useState(false);
  const [isInForthSection, setIsInForthSection] = useState(false);
  const [isInLastSection, setIsInLastSection] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newIsScrolled = scrollY > 50;
      setIsScrolled(newIsScrolled);

      if (newIsScrolled) {
        // Set animation stage based on scroll distance
        if (scrollY > 300) {
          setAnimationStage(2); // All elements hidden
        } else if (scrollY > 100) {
          setAnimationStage(1); // Starting to hide
        }
      } else {
        setAnimationStage(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Use Intersection Observer to detect when specific sections are in viewport
  useEffect(() => {
    const fifthSection = document.getElementById("fifth-section");
    const blogHero = document.querySelector(".blogs-hero-section");
    const forthSection = document.querySelector(".section-1, .section-2, .section-3, .section-4"); // ForthSection components
    const lastSection = document.querySelector(".bg-zinc-950.h-screen"); // LastSection
    const footer = document.querySelector(".bg-black.pt-10"); // Footer

    if (!fifthSection && !blogHero && !forthSection && !lastSection && !footer) {
      // If the sections don't exist yet, try again after a short delay
      const checkTimer = setTimeout(() => {
        const retrySection = document.getElementById("fifth-section");
        const retryBlogHero = document.querySelector(".blogs-hero-section");
        const retryForthSection = document.querySelector(".section-1, .section-2, .section-3, .section-4");
        const retryLastSection = document.querySelector(".bg-zinc-950.h-screen");
        const retryFooter = document.querySelector(".bg-black.pt-10");
        
        if (retrySection) {
          setupObserver(retrySection, setIsInFifthSection);
        }
        
        if (retryBlogHero) {
          setupObserver(retryBlogHero, setIsInBlogHero);
        }

        if (retryForthSection) {
          setupObserver(retryForthSection, setIsInForthSection);
        }

        if (retryLastSection) {
          setupObserver(retryLastSection, setIsInLastSection);
        }

        if (retryFooter) {
          setupObserver(retryFooter, setIsInFooter);
        }
      }, 1000);
      return () => clearTimeout(checkTimer);
    }

    function setupObserver(element, setterFunction) {
      if (!element) return () => {};
      
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setterFunction(entry.isIntersecting);
          console.log("Section intersection:", entry.isIntersecting);
        },
        { threshold: 0.1 } // Trigger when at least 10% of the element is visible
      );

      observer.observe(element);

      return () => {
        if (element) observer.unobserve(element);
      };
    }

    // Setup observers for all sections
    const cleanup1 = fifthSection ? setupObserver(fifthSection, setIsInFifthSection) : () => {};
    const cleanup2 = blogHero ? setupObserver(blogHero, setIsInBlogHero) : () => {};
    const cleanup3 = forthSection ? setupObserver(forthSection, setIsInForthSection) : () => {};
    const cleanup4 = lastSection ? setupObserver(lastSection, setIsInLastSection) : () => {};
    const cleanup5 = footer ? setupObserver(footer, setIsInFooter) : () => {};
    
    return () => {
      cleanup1();
      cleanup2();
      cleanup3();
      cleanup4();
      cleanup5();
    };
  }, []);

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
      } catch (error) {
        console.error("Error initializing cursor:", error);
        // Ensure native cursor is visible if there's an error
        document.body.style.cursor = "auto";
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
    <div className="relative">
      {isMenuOpen && (
        <div className="min-h-screen  md:fixed md:block hidden opacity-40 z-[55] w-full bg-black"></div>
      )}

      <div className="flex fixed lg:top-9 w-full items-center justify-between pt-10 md:px-16 px-8 font-medium text-lg z-50">
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? "opacity-0 transform -translate-y-10"
              : "opacity-100 transform-none"
          }`}
        >
          <Link href={"/"}>
            <Image
              src={"/Techshun.png"}
              height={40}
              width={140}
              priority
              alt="Techshun"
            />
          </Link>
        </div>

        <div className="flex items-center gap-[40px]">
          <div>
            <ul className="lg:flex text-xl font-[400] items-center gap-5 hidden ">
              <Link href={"/about"}>
                <li
                  className={`transition-all duration-500 cursor-pointer ${
                    animationStage >= 1
                      ? "opacity-0 transform translate-x-20 scale-0"
                      : "opacity-100 transform translate-x-0 scale-100"
                  } ${
                    isInBlogHero ? "text-white" : ""
                  }`}
                  data-cursor-text="About"
                  data-cursor-stick="#about-item"
                  id="about-item"
                >
                  about
                </li>
              </Link>

              <Link href={"/projects"}>
                <li
                  className={`transition-all duration-500 delay-400 cursor-pointer ${
                    animationStage >= 1
                      ? "opacity-0 transform translate-x-20 scale-0"
                      : "opacity-100 transform translate-x-0 scale-100"
                  } ${
                    isInBlogHero ? "text-white" : ""
                  }`}
                  data-cursor-text="projects"
                  data-cursor-stick="#cases-item"
                  id="cases-item"
                >
                  projects
                </li>
              </Link>
              <Link href={"/blogs"}>
                <li
                  className={`transition-all duration-500 delay-600 cursor-pointer ${
                    animationStage >= 1
                      ? "opacity-0 transform translate-x-20 scale-0"
                      : "opacity-100 transform translate-x-0 scale-100"
                  } ${
                    isInBlogHero ? "text-white" : ""
                  }`}
                  data-cursor-text="blogs"
                  data-cursor-stick="#blogs-item"
                  id="blogs-item"
                >
                  blogs
                </li>
              </Link>
            </ul>
          </div>
          <Link href={"/contacts"}>
            <div
              className={`lg:flex hidden items-center text-xl font-[400]  gap-5 transition-all duration-500 delay-800 cursor-pointer ${
                animationStage >= 1
                  ? "opacity-0 transform translate-x-20 scale-0"
                  : "opacity-100 transform translate-x-0 scale-100"
              } ${
                isInBlogHero ? "text-white" : ""
              }`}
              data-cursor-stick="#get-in-touch"
              id="get-in-touch"
              data-cursor-text="Contact"
            >
              get in touch
              <FaArrowRight className="bg-black text-white w-[30px] p-1.5 h-[30px] rounded-full" />
            </div>
          </Link>
        </div>
      </div>

      {/* Hamburger menu button - always visible on mobile and when scrolled or menu is open on larger screens */}
      <div
        data-cursor-stick="#hamburger"
        id="hamburger"
        className="fixed top-8 right-5 z-[70] lg:hidden"
      >
        <div
          className={`rounded-full p-3 py-3 ${
            isMenuOpen ? "bg-white" : " "
          } group transition-all duration-700 delay-100 cursor-pointer opacity-100 scale-100`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-cursor-text="Menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5">
            {/* First line of the hamburger/X icon */}
            <div
              className={`h-[4px] w-full mt-0.5 rounded-full transition-all duration-300 ${
                isMenuOpen ? "transform rotate-45 translate-y-[4px]" : ""
              }`}
              style={{
                backgroundColor: isMenuOpen
                  ? "black"
                  : isInFifthSection
                  ? "white"
                  : "black",
              }}
            ></div>
            {/* Second line of the hamburger/X icon */}
            <div
              className={`h-[4px] w-full rounded-full mt-1 transition-all duration-300 ${
                isMenuOpen ? "transform -rotate-45 -translate-y-[4px]" : ""
              }`}
              style={{
                backgroundColor: isMenuOpen
                  ? "black"
                  : isInFifthSection
                  ? "white"
                  : "black",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hamburger menu button for larger screens - only visible when scrolled or menu is open */}
      {(isScrolled || isMenuOpen) && (
        <div
          data-cursor-stick="#hamburger-lg"
          id="hamburger-lg"
          className="fixed top-17  right-5 z-[70] hidden lg:block"
        >
          <div
            className={`rounded-full p-3 py-3 ${
              isMenuOpen ? "bg-white" : " "
            } group transition-all duration-700 delay-100 cursor-pointer ${
              animationStage >= 2 || isMenuOpen
                ? " shadow-2xl opacity-100 scale-100"
                : " shadow-white/50 opacity-0 scale-0"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-cursor-text="Menu"
          >
            <div
              className={`flex flex-col items-center justify-center w-5 h-5 transition-all duration-500 ${
                animationStage >= 2 || isMenuOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
            >
              {/* First line of the hamburger/X icon */}
              <div
                className={`h-[4px] w-full mt-0.5 rounded-full transition-all duration-300 ${
                  isMenuOpen ? "transform rotate-45 translate-y-[4px]" : ""
                }`}
                style={{
                  backgroundColor: isMenuOpen
                    ? "black"
                    : isInFifthSection || isInBlogHero || isInForthSection || isInLastSection || isInFooter
                    ? "white"
                    : "black",
                }}
              ></div>
              {/* Second line of the hamburger/X icon */}
              <div
                className={`h-[4px] w-full rounded-full mt-1 transition-all duration-300 ${
                  isMenuOpen ? "transform -rotate-45 -translate-y-[4px]" : ""
                }`}
                style={{
                  backgroundColor: isMenuOpen
                    ? "black"
                    : isInFifthSection || isInBlogHero || isInForthSection || isInLastSection || isInFooter
                    ? "white"
                    : "black",
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* menu items  */}
      <div
        className={`fixed z-[60] right-0 md:w-1/2 w-full min-h-screen overflow-hidden bg-white transition-transform duration-1000 ease-in-out ${
          isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <div className="flex flex-row-reverse items-start px-10 lg:px-0 justify-between  gap-10 lg:w-[70%] lg:pl-20 lg:pt-48 pt-36">
          <div>
            <h3 className="text-gray-400">Menu</h3>

            <ul className="pt-7 2xl:text-[40px] text-2xl">
              <Link href={"/projects"}>
              <li
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                id="projects"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Projects
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Projects
                </span>
              </li>
              </Link>
              <Link href={"/about"}>
                <li
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                  id="company"
                >
                  <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                    Company
                  </span>
                  <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                    Company
                  </span>
                </li>
              </Link>
              <Link href={"/blogs"}>
                <li
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                  id="blogs"
                >
                  <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                    Blogs
                  </span>
                  <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                    Blogs
                  </span>
                </li>
              </Link>
              <Link href={"/contacts"}>
                <li
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                  id="contacts"
                >
                  <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                    Contacts
                  </span>
                  <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                    Contacts
                  </span>
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400">Social media</h3>

            <ul className="pt-7 text-xl flex flex-col gap-3">
              <a href="https://www.facebook.com/prosentalagency/" target="_blank" rel="noopener noreferrer">
                <li
                  className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                  id="facebook-item"
                >
                  <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                    Facebook
                  </span>
                  <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                    Facebook
                  </span>
                </li>
              </a>
              <a href="https://www.instagram.com/prosental_agency/" target="_blank" rel="noopener noreferrer">
                <li
                  className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                  id="instagram-item"
                >
                  <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                    Instagram
                  </span>
                  <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                    Instagram
                  </span>
                </li>
              </a>
              <li
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                id="twitter-item"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Twitter
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Twitter
                </span>
              </li>
              <li
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                id="linkedin-item"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Linkedin
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Linkedin
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
