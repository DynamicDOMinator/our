"use client";

export default function MarqueeSection() {
  return (
    <>
      <div className="overflow-hidden py-20">
        <div className="animate-marquee flex items-center gap-10 text-nowrap">
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[400px] rounded-full object-cover h-[150px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[400px] rounded-full object-cover h-[150px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[400px] rounded-full object-cover h-[150px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[400px] rounded-full object-cover h-[150px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[400px] rounded-full object-cover h-[150px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[400px] rounded-full object-cover h-[150px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </>
  );
}