"use client";
import { useEffect } from 'react';

export default function MarqueeSection() {
  useEffect(() => {
    // Function to ensure videos autoplay on mobile
    const setupVideos = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        // Force video to be visible and play properly on mobile without controls
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('x-webkit-airplay', 'allow');
        video.removeAttribute('controls');
        video.controls = false;
        video.muted = true;
        
        // Force load the video
        video.load();
        
        // Try to play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // If autoplay fails, try again with user interaction simulation
            console.log('Video autoplay failed:', error);
            video.muted = true; // Ensure muted to allow autoplay
            video.play().catch(e => console.log('Second attempt failed:', e));
          });
        }
      });
    };
    
    // Run setup after a short delay to ensure DOM is ready
    const timer = setTimeout(setupVideos, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <div className="overflow-hidden py-20">
        <div className="animate-marquee flex items-center gap-10 text-nowrap">
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[100px] rounded-full object-cover h-[100px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onClick={(e) => e.preventDefault()}
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[100px] rounded-full object-cover h-[100px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onClick={(e) => e.preventDefault()}
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[100px] rounded-full object-cover h-[100px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onClick={(e) => e.preventDefault()}
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[100px] rounded-full object-cover h-[100px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onClick={(e) => e.preventDefault()}
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[100px] rounded-full object-cover h-[100px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onClick={(e) => e.preventDefault()}
          />
          <p className="text-6xl">One Goal — Real Results</p>
          <video
            className="w-[100px] rounded-full object-cover h-[100px]"
            src="about-v.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onClick={(e) => e.preventDefault()}
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
        
        /* Hide video controls on all devices */
        video::-webkit-media-controls,
        video::-webkit-media-controls-enclosure,
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-overlay-play-button,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-timeline,
        video::-webkit-media-controls-current-time-display,
        video::-webkit-media-controls-time-remaining-display,
        video::-webkit-media-controls-time-control,
        video::-webkit-media-controls-mute-button,
        video::-webkit-media-controls-toggle-closed-captions-button,
        video::-webkit-media-controls-volume-slider,
        video::-webkit-media-controls-fullscreen-button {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
    </>
  );
}