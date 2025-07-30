"use client";
import { useRef, useEffect } from "react";


export default function SecondSection() {
    const videoRef = useRef(null);
    
    useEffect(() => {
        const videoElement = videoRef.current;
        const sectionElement = document.getElementById('second-section');
        
        if (videoElement && sectionElement) {
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
            
            // Intersection Observer for mobile compatibility
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && videoElement.paused) {
                            attemptAutoplay();
                        }
                    });
                },
                {
                    threshold: 0.1, // Trigger when 10% of the video is visible
                    rootMargin: '0px 0px -50px 0px' // Start playing slightly before fully visible
                }
            );
            
            observer.observe(sectionElement);
            
            // Try immediately on load
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
                observer.disconnect();
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