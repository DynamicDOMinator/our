'use client';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';


const LazyVideo = forwardRef(function LazyVideo({
  src,
  webmSrc,
  poster,
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
  onError,
  ...props
}, forwardedRef) {
  const videoRef = useRef(null);
  const actualVideoRef = forwardedRef || videoRef;
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1, // Start loading when 10% of the video is in view
  });

  // Handle video loading with caching
  useEffect(() => {
    if (!actualVideoRef.current || !src) return;

    const videoElement = actualVideoRef.current;
    
    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleError = (error) => {
      console.error('Video loading error:', error);
      setHasError(true);
      if (onError) onError(error);
    };

    // Load video when priority or in view
    if (priority || inView) {
      // Simple video loading without cache
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'auto';
      tempVideo.muted = true;
      tempVideo.src = src;
      tempVideo.onloadeddata = () => {
        setIsLoaded(true);
      };
      tempVideo.onerror = handleError;
      tempVideo.load();
    }

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, [src, webmSrc, priority, inView, onError, actualVideoRef]);

  // Handle video playback based on visibility
  useEffect(() => {
    if (!actualVideoRef.current || !isLoaded) return;

    const videoElement = actualVideoRef.current;

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
  }, [inView, isLoaded, autoPlay, loop, actualVideoRef]);

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
          <div className="video-error">
            <p>Video could not be loaded</p>
          </div>
        ) : (
          <video
            ref={actualVideoRef}
            className={className}
            width={width}
            height={height}
            autoPlay={false} // We control this via useEffect
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            controls={controls}
            preload={priority ? "auto" : "none"}
            poster={poster}
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
});

export default LazyVideo;