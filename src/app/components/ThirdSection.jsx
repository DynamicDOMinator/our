export default function ThirdSection() {
  return (
    <div>
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
            animation: marquee 20s linear infinite;
          }

          @keyframes typing {
            from { width: 0; opacity: 0; }
            to { width: 100%; opacity: 1; }
          }

          .typing-line {
            overflow: hidden;
            width: 0;
            opacity: 0;
            text-align: center;
            animation: typing 2s ease-out forwards;
            white-space: nowrap;
            display: inline-block;
            max-width: 100%;
            margin: 0 auto;
          }

          .line-1 { animation-delay: 0.5s; }
          .line-2 { animation-delay: 2s; }
          .line-3 { animation-delay: 3.5s; }
          .line-4 { animation-delay: 5s; }

        `}</style>

        <div className="animate-marquee pb-2 pt-5">
          <span className="lg:text-7xl text-2xl md:text-5xl">
            INNOVATION / UI/UX DESIGN / WEB DEVELOPMENT / MOBILE APPS / DIGITAL STRATEGY / CUSTOM SOFTWARE / BRAND IDENTITY / E-COMMERCE SOLUTIONS / CLOUD INTEGRATION / SAAS PLATFORMS /
          </span>
          <span className="lg:text-7xl text-2xl md:text-5xl">
            INNOVATION / UI/UX DESIGN / WEB DEVELOPMENT / MOBILE APPS / DIGITAL STRATEGY / CUSTOM SOFTWARE / BRAND IDENTITY / E-COMMERCE SOLUTIONS / CLOUD INTEGRATION / SAAS PLATFORMS /
          </span>
        </div>
      </div>

      {/* === Line-by-line Typing Animation === */}
      <div className="py-10 px-4 text-center max-w-7xl mx-auto ">
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
