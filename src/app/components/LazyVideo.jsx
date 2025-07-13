'use client';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function LazyVideo({
  src,
  webmSrc,
  poster,
  fallbackSrc, // Add fallbackSrc prop for GIF fallback
  className,
  width,
  height,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  priority = false,
  onPlay,
  onPause,
  onClick,
  onError, // Add onError callback
  ...props
}) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1, // Start loading when 10% of the video is in view
  });

  // Handle video loading
  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;
    
    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleError = (error) => {
      console.error('Video loading error:', error);
      setHasError(true);
      if (onError) onError(error);
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, []);

  // Handle video playback based on visibility
  useEffect(() => {
    if (!videoRef.current || !isLoaded) return;

    const videoElement = videoRef.current;

    if (inView && autoPlay) {
      // Try to play when in view
      videoElement.play().catch(error => {
        console.log("Video autoplay failed:", error);
        // If autoplay fails, try again with user interaction simulation
        videoElement.muted = true; // Ensure muted to allow autoplay
        videoElement.play().catch(e => console.log("Second attempt failed:", e));
      });
    } else if (!inView && videoElement.played.length > 0) {
      // Pause when out of view and has played before
      videoElement.pause();
      if (!loop) {
        videoElement.currentTime = 0;
      }
    }
  }, [inView, isLoaded, autoPlay, loop]);

  // Determine which source to use (WebM or MP4)
  const getVideoSources = () => {
    return (
      <>
        {webmSrc && (
          <source src={webmSrc} type="video/webm" />
        )}
        {src && (
          <source src={src} type="video/mp4" />
        )}
      </>
    );
  };

  return (
    <div ref={ref} className={`video-container ${className || ''}`}>
      {hasError ? (
        fallbackSrc ? (
          // Display fallback image/gif if available
          <img 
            src={fallbackSrc}
            alt="Video fallback"
            className={className}
            width={width}
            height={height}
            {...props}
          />
        ) : (
          <div className="video-error">
            <p>Video could not be loaded</p>
          </div>
        )
      ) : (
        <video
          ref={videoRef}
          className={className}
          width={width}
          height={height}
          autoPlay={false} // We control this via useEffect
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          preload={priority ? "auto" : "none"}
          poster={poster || fallbackSrc} // Use fallbackSrc as poster if no poster provided
          onClick={onClick}
          onPlay={onPlay}
          onPause={onPause}
          {...props}
        >
          {getVideoSources()}
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}