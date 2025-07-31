"use client";
import { useState, useEffect } from "react";
import Link from "next/link";


export default function LastSection() {

  const [isHovering, setIsHovering] = useState(false);



  return (
    <div className="bg-zinc-950 h-screen flex flex-col text-center gap-10 items-center justify-center relative">
      {/* Background that appears when hovering over the button */}
      <div
        className={`absolute inset-0 bg-[url('/noisy.gif')] bg-repeat transition-opacity duration-500 pointer-events-none z-[1] ${
          isHovering ? "opacity-5" : "opacity-0"
        }`}
      ></div>

      <h6 className="md:text-9xl text-4xl text-white relative z-10">
        Have
        <br />
        an idea?
      </h6>
      <Link href="/contacts">
        <div>
          <button
            className="relative border-2 border-white px-12 py-7 rounded-full md:text-9xl text-4xl cursor-pointer text-white transition-all duration-300 group overflow-hidden z-10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* الطبقة الأساسية للنص */}
            <span className="inline-block transition-transform duration-500 md:group-hover:translate-y-[-100%] relative z-10">
              TELL US
            </span>

            {/* الطبقة الثانية للنص */}
            <span className="inline-block absolute top-full left-0 w-full transition-transform duration-500 text-black md:group-hover:translate-y-[-120%] z-10">
              TELL US
            </span>

            {/* الخلفية البيضاء المتحركة */}
            <span className="absolute bottom-0 left-0 right-0 h-0 rounded-full bg-white transition-all duration-500 md:group-hover:h-full z-[1]"></span>
          </button>
        </div>
      </Link>



<div>
  <a href="mailto:info@Prosental.com">
    <div 
      className="relative border-2 border-white px-6 py-1 rounded-full text-xl cursor-pointer overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Primary text layer */}
      <span className="inline-block transition-transform duration-500 text-white md:group-hover:translate-y-[-100%] relative z-10">
        info@Prosental.com
      </span>

      {/* Secondary text layer */}
      <span className="inline-block absolute top-full left-0 w-full transition-transform duration-500 text-black md:group-hover:translate-y-[-120%] z-10">
        info@Prosental.com
      </span>

      {/* White background animation */}
      <span className="absolute bottom-0 left-0 right-0 h-0 rounded-full bg-white transition-all duration-500 md:group-hover:h-full z-[1]"></span>
    </div>
  </a>
</div>


    </div>
  );
}
