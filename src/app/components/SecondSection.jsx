"use client";
import { useRef, useEffect } from "react";


export default function SecondSection() {
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