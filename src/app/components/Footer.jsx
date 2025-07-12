import { GoArrowUpRight } from "react-icons/go";

export default function Footer() {
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
          
          /* Slow down social media marquees on hover */
          .facebook-links:hover .animate-marquee {
            animation-duration: 30s;
          }
          
          .twitter-links:hover .animate-marquee {
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
          <p className="text-9xl animate-marquee text-nowrap text-white">
            <span className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105">
              Follow Us
            </span>
            <span className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105">
              Follow Us
            </span>
            <span className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105">
              Follow Us
            </span>
            {/* Duplicate content for continuous scrolling */}

            <span className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105">
              Follow Us
            </span>
            <span className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105">
              Follow Us
            </span>
            <span className="pr-10 inline-block transition-all duration-300 hover:text-[#ff3366] hover:scale-105">
              Follow Us
            </span>
          </p>
        </div>
      </div>

      <div className="">
        <h6 className="text-white text-2xl pt-20 px-20 ">
          Social Media and contacts
        </h6>

        <div className="relative">
          {/* We've moved the marquee animation to be in the same position as the Instagram text */}

          <div className="absolute top-0 right-0 w-full my-10 border-t-[1px] border-white/50 group cursor-pointer transition-all duration-500 instagram-hover-container social-hover-container">
            {/* Instagram header - always visible and positioned above the marquee */}
            <div className="text-white text-4xl py-10 absolute w-full left-0 top-0 z-20 social-text">
              <div className="px-20 flex items-center justify-between">
                <p>Instagram</p>
                <GoArrowUpRight />
              </div>
            </div>

            {/* Marquee animation that appears on hover - positioned behind the Instagram text */}
            <div className="marquee-container instagram-links px-20 text-black text-4xl py-10 bg-white absolute w-full left-0 top-0 h-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center overflow-hidden">
              <div className="animate-marquee flex items-center gap-5">
                {/* Instagram links - first set */}
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>

                {/* Instagram links - duplicated for continuous scrolling */}
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Instagram</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
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
          <div className="absolute top-[0px] right-0 w-full my-10 border-t-[1px] border-white/50 group cursor-pointer transition-all duration-500 facebook-hover-container social-hover-container">
            {/* Facebook header - always visible and positioned above the marquee */}
            <div className="text-white text-4xl py-10 absolute w-full left-0 top-0 z-20 social-text">
              <div className="px-20 flex items-center justify-between">
                <p>Facebook</p>
                <GoArrowUpRight />
              </div>
            </div>

            {/* Marquee animation that appears on hover - positioned behind the Facebook text */}
            <div className="marquee-container facebook-links px-20 text-black text-4xl py-10 bg-[#1877F2] absolute w-full left-0 top-0 h-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center overflow-hidden">
              <div className="animate-marquee flex items-center gap-5">
                {/* Facebook links - first set */}
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>

                {/* Facebook links - duplicated for continuous scrolling */}
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Facebook</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
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
          <div className="absolute top-[0px] right-0 w-full my-10 border-t-[1px] border-white/50 group cursor-pointer transition-all duration-500 twitter-hover-container social-hover-container">
            {/* Twitter header - always visible and positioned above the marquee */}
            <div className="text-white text-4xl py-10 absolute w-full left-0 top-0 z-20 social-text">
              <div className="px-20 flex items-center justify-between">
                <p>Twitter / X</p>
                <GoArrowUpRight />
              </div>
            </div>

            {/* Marquee animation that appears on hover - positioned behind the Twitter text */}
            <div className="marquee-container twitter-links px-20 text-white text-4xl py-10 bg-black absolute w-full left-0 top-0 h-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center overflow-hidden">
              <div className="animate-marquee flex items-center gap-5">
                {/* Twitter links - first set */}
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>

                {/* Twitter links - duplicated for continuous scrolling */}
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
                <div className="flex items-center gap-3 mx-5 hover:scale-110 transition-transform duration-300">
                  <p>Twitter / X</p>
                  <GoArrowUpRight className="transform transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>
            </div>

            {/* Add the reveal animation elements */}
            <div className="social-reveal-top"></div>
            <div className="social-reveal-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
