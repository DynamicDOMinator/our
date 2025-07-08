"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newIsScrolled = scrollY > 50;
      setIsScrolled(newIsScrolled);

      if (newIsScrolled) {
        // Progressive animation based on scroll distance
        if (scrollY > 100) setAnimationStage(1);
        if (scrollY > 150) setAnimationStage(2);
        if (scrollY > 200) setAnimationStage(3);
        if (scrollY > 250) setAnimationStage(4);
        if (scrollY > 300) setAnimationStage(5);
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

  return (
    <div>
      <div className="flex fixed w-full items-center justify-between pt-10 px-16 font-medium text-lg z-50">
        <div className=" ">
          <Image src={"/Techshun.png"} height={40} width={140} alt="Techshun" />
        </div>  

        <div className="flex items-center gap-[40px]">
          <div>
            <ul className="flex text-xl font-[400] items-center gap-5">
              <li
                className={`transition-all duration-500 cursor-pointer ${
                  animationStage >= 1
                    ? "opacity-0 transform translate-x-20 scale-0"
                    : "opacity-100 transform translate-x-0 scale-100"
                }`}
              >
                about
              </li>
              <li
                className={`transition-all duration-500 delay-200 cursor-pointer ${
                  animationStage >= 2
                    ? "opacity-0 transform translate-x-20 scale-0"
                    : "opacity-100 transform translate-x-0 scale-100"
                }`}
              >
                services
              </li>
              <li
                className={`transition-all duration-500 delay-400 cursor-pointer ${
                  animationStage >= 3
                    ? "opacity-0 transform translate-x-20 scale-0"
                    : "opacity-100 transform translate-x-0 scale-100"
                }`}
              >
                cases
              </li>
              <li
                className={`transition-all duration-500 delay-600 cursor-pointer ${
                  animationStage >= 4
                    ? "opacity-0 transform translate-x-20 scale-0"
                    : "opacity-100 transform translate-x-0 scale-100"
                }`}
              >
                careers
              </li>
            </ul>
          </div>

          <div
            className={`flex items-center text-xl font-[400]  gap-5 transition-all duration-500 delay-800 cursor-pointer ${
              animationStage >= 5
                ? "opacity-0 transform translate-x-20 scale-0"
                : "opacity-100 transform translate-x-0 scale-100"
            }`}
          >
            get in touch
            <FaArrowRight className="bg-black text-white w-[30px] p-1.5 h-[30px] rounded-full" />
          </div>
        </div>
      </div>

      {isScrolled && (
        <div className="fixed top-10 right-10 z-50">
          <div
            className={`p-3 rounded-full shadow-2xl hover:bg-black group transition-all duration-700 delay-100 cursor-pointer ${
              animationStage >= 5
                ? "border-4 border-black/40 shadow-2xl opacity-100 scale-100"
                : "border-4 border-black/20 shadow-white/50 opacity-0 scale-0"
            }`}
            onClick={() => console.log("Menu clicked")}
          >
            <div
              className={`flex flex-col justify-between h-5 w-7 transition-all duration-500 ${
                animationStage >= 5
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0"
              }`}
            >
              <div className="h-[3px] w-full bg-black rounded-full "></div>
              <div className="h-[3px] w-full bg-black rounded-full "></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
