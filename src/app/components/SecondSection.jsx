"use client";
import { useRef } from "react";

export default function SecondSection() {
    const videoRef = useRef(null);
    
    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };
    
    return (
        <div id="second-section" className="py-10">
            <video 
                ref={videoRef}
                className="w-full cursor-pointer" 
                src="/short.mp4" 
                autoPlay 
                loop 
                muted
                playsInline
                onClick={handleVideoClick}
            ></video>
        </div>
    )
}