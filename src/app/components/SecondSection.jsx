"use client";
import { useRef, useEffect } from "react";

export default function SecondSection() {
    const videoRef = useRef(null);
    
    useEffect(() => {
        // Force autoplay when component mounts
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }, []);
    

    
    return (
        <div id="second-section" className="py-10">
            <video 
                ref={videoRef}
                className="w-full" 
                src="/short.mp4" 
                autoplay 
                loop 
                muted
                playsInline
                
            ></video>
        </div>
    )
}