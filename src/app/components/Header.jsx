"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";

import Cursor from "mouse-follower";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    // Initialize mouse-follower cursor
    Cursor.registerGSAP(gsap);

    const timeout = setTimeout(() => {
      const cursor = new Cursor({
        container: document.body,
        speed: 0.5,
        ease: "expo.out",
        visibleTimeout: 300,
        hideNativeCursor: true,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative">
      {isMenuOpen && (
        <div className="min-h-screen  md:fixed md:block hidden opacity-40 z-[55] w-full bg-black"></div>
      )}

      <div className="flex fixed w-full items-center justify-between pt-10 md:px-16 px-8 font-medium text-lg z-50">
        <div className=" ">
          <Image src={"/Techshun.png"} height={40} width={140} alt="Techshun" />
        </div>

        <div className="flex items-center gap-[40px]">
          <div>
            <ul className="lg:flex text-xl font-[400] items-center gap-5 hidden ">
              <li
                className={`transition-all duration-500 cursor-pointer ${
                  animationStage >= 1
                    ? "opacity-0 transform translate-x-20 scale-0"
                    : "opacity-100 transform translate-x-0 scale-100"
                }`}
                data-cursor-text="About"
                data-cursor-stick="#about-item"
                id="about-item"
              >
                about
              </li>
              <li
                className={`transition-all duration-500 delay-200 cursor-pointer ${
                  animationStage >= 1
                    ? "opacity-0 transform translate-x-20 scale-0"
                    : "opacity-100 transform translate-x-0 scale-100"
                }`}
                data-cursor-text="Services"
                data-cursor-stick="#services-item"
                id="services-item"
              >
                services
              </li>
              <li
                className={`transition-all duration-500 delay-400 cursor-pointer ${
                  animationStage >= 1
                    ? "opacity-0 transform translate-x-20 scale-0"
                    : "opacity-100 transform translate-x-0 scale-100"
                }`}
                data-cursor-text="Studies"
                data-cursor-stick="#cases-item"
                id="cases-item"
              >
                cases
              </li>
              <li
                className={`transition-all duration-500 delay-600 cursor-pointer ${
                  animationStage >= 1
                    ? "opacity-0 transform translate-x-20 scale-0"
                    : "opacity-100 transform translate-x-0 scale-100"
                }`}
                data-cursor-text="Careers"
                data-cursor-stick="#careers-item"
                id="careers-item"
              >
                careers
              </li>
            </ul>
          </div>

          <div
            className={`lg:flex hidden items-center text-xl font-[400]  gap-5 transition-all duration-500 delay-800 cursor-pointer ${
              animationStage >= 1
                ? "opacity-0 transform translate-x-20 scale-0"
                : "opacity-100 transform translate-x-0 scale-100"
            }`}
            data-cursor-stick="#get-in-touch"
            id="get-in-touch"
            data-cursor-text="Contact"
          >
            get in touch
            <FaArrowRight className="bg-black text-white w-[30px] p-1.5 h-[30px] rounded-full" />
          </div>
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
              className={`h-[4px] w-full bg-black hover:bg-white mt-0.5 rounded-full transition-all duration-300 ${
                isMenuOpen ? "transform rotate-45 translate-y-[4px]" : ""
              }`}
            ></div>
            {/* Second line of the hamburger/X icon */}
            <div
              className={`h-[4px] w-full bg-black rounded-full mt-1 transition-all duration-300 ${
                isMenuOpen ? "transform -rotate-45 -translate-y-[4px]" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Hamburger menu button for larger screens - only visible when scrolled or menu is open */}
      {(isScrolled || isMenuOpen) && (
        <div
          data-cursor-stick="#hamburger-lg"
          id="hamburger-lg"
          className="fixed top-10 right-5 z-[70] hidden lg:block"
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
                className={`h-[4px] w-full bg-black hover:bg-white mt-0.5 rounded-full transition-all duration-300 ${
                  isMenuOpen ? "transform rotate-45 translate-y-[4px]" : ""
                }`}
              ></div>
              {/* Second line of the hamburger/X icon */}
              <div
                className={`h-[4px] w-full bg-black rounded-full mt-1 transition-all duration-300 ${
                  isMenuOpen ? "transform -rotate-45 -translate-y-[4px]" : ""
                }`}
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
              <li
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                data-cursor-stick="#what-we-do"
                id="what-we-do"
                data-cursor-text="What We Do"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  What we do
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  What we do
                </span>
              </li>
              <li
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                data-cursor-stick="#projects"
                id="projects"
                data-cursor-text="Projects"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Projects
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Projects
                </span>
              </li>
              <li
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                data-cursor-stick="#company"
                id="company"
                data-cursor-text="Company"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Company
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Company
                </span>
              </li>
              <li
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                data-cursor-stick="#tutorials"
                id="tutorials"
                data-cursor-text="Tutorials"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Tutorials
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Tutorials
                </span>
              </li>
              <li
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                data-cursor-stick="#contacts"
                id="contacts"
                data-cursor-text="Contact Us"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Contacts
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Contacts
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400">Social media</h3>

            <ul className="pt-7 text-xl flex flex-col gap-3">
              <li
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                data-cursor-stick="#facebook-item"
                id="facebook-item"
                data-cursor-text="Facebook"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Facebook
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Facebook
                </span>
              </li>
              <li
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                data-cursor-stick="#instagram-item"
                id="instagram-item"
                data-cursor-text="Instagram"
              >
                <span className="block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-700 ease-in-out">
                  Instagram
                </span>
                <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-y-0 transition-all duration-700 ease-in-out transform translate-y-full">
                  Instagram
                </span>
              </li>
              <li
                className="relative overflow-hidden group cursor-pointer transition-transform duration-700 hover:scale-105"
                data-cursor-stick="#twitter-item"
                id="twitter-item"
                data-cursor-text="Twitter"
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
                data-cursor-stick="#linkedin-item"
                id="linkedin-item"
                data-cursor-text="LinkedIn"
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
