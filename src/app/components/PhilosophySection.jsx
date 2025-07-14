'use client';
import { useRef, useEffect } from 'react';
import LazyVideo from './LazyVideo';

export default function Philosophy() {
  const videoRef = useRef(null);
  
  useEffect(() => {
    // More robust video initialization and autoplay
    const videoElement = videoRef.current;
    if (videoElement) {
      // Make sure video is properly loaded
      videoElement.load();
      
      // Set up event listeners
      const handleCanPlay = () => {
        // Try to play when it's ready
        videoElement.play().catch(error => {
          // If autoplay fails, try again with user interaction simulation
          videoElement.muted = true; // Ensure muted to allow autoplay
          videoElement.play().catch(e => {/* Second attempt failed */});
        });
      };
      
      videoElement.addEventListener('canplaythrough', handleCanPlay);
      
      // Try to play immediately as well
      videoElement.play().catch(() => {
        // Silent catch - we'll try again on canplaythrough
      });
      
      // Cleanup
      return () => {
        videoElement.removeEventListener('canplaythrough', handleCanPlay);
      };
    }
  }, []);

  return (
    <div className="bg-black">
      <div className="bg-white lg:rounded-t-[170px] rounded-t-[100]">
        <h4 className="lg:text-9xl text-4xl md:text-8xl md:pt-38 pt-20 lg:pl-30 pl-10">
          Our <br />
          philosophy
        </h4>
      </div>
      <div className="flex lg:flex-row flex-col items-center pt-20 bg-white">
        <div className="lg:w-1/2 relative">
          <LazyVideo ref={videoRef} className="object-cover w-full lg:p-20" autoPlay loop muted playsInline src="/ta2.mp4" />
        </div>
        <div className="lg:w-1/2 pb-10 lg:pb-0">
          <p className="lg:text-2xl text-xl lg:pr-40 px-10 lg:px-0">
            In our team, developers work alongside designers, strategists and
            analysts. Cuberto doesn't do cookie-cutter solutions and we build
            products exactly as they were during the design phase, no short cuts
            or simplifications. 
          </p>
          <p className="lg:text-2xl text-xl pt-7 lg:pr-40 px-10 lg:px-0">
             We're driven by user‑centered design that drives
            productivity and increases revenue. Our expertise and ingenuity are
            remarkable, yet we always strive to outdo and outperform our
            previous achievements.
          </p>
        </div>
      </div>
    </div>
  );
}
