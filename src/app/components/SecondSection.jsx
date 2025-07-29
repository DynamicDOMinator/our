"use client";
import { useRef, useEffect } from "react";


export default function SecondSection() {
    const videoRef = useRef(null);
    
    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const playVideo = async () => {
                try {
                    videoElement.muted = true;
                    await videoElement.play();
                } catch (error) {
                    console.log('Autoplay failed, will try on user interaction');
                }
            };
            
            // Multiple attempts to ensure autoplay
            const attemptAutoplay = () => {
                playVideo();
                
                // Try again after a short delay
                setTimeout(() => {
                    if (videoElement.paused) {
                        playVideo();
                    }
                }, 100);
            };
            
            // Try immediately
            attemptAutoplay();
            
            // Try when video metadata is loaded
            videoElement.addEventListener('loadedmetadata', attemptAutoplay, { once: true });
            
            // Try when video data is loaded
            videoElement.addEventListener('loadeddata', attemptAutoplay, { once: true });
            
            // Try when video can start playing
            videoElement.addEventListener('canplay', attemptAutoplay, { once: true });
            
            // Fallback: play on any user interaction
            const handleUserInteraction = () => {
                if (videoElement.paused) {
                    playVideo();
                }
            };
            
            document.addEventListener('click', handleUserInteraction, { once: true });
            document.addEventListener('touchstart', handleUserInteraction, { once: true });
            
            return () => {
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
            };
        }
     }, []);
    

    
    return (
        <div id="second-section" className="py-10">
            <video 
                ref={videoRef}
                className="w-full" 
                autoPlay 
                loop 
                muted
                playsInline
                preload="auto"
            >
                <source src="/short.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}