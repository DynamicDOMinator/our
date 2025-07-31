'use client';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCache } from '../contexts/CacheContext';
import Image from 'next/image';
import LazyVideo from './LazyVideo';

export default function LazyImage({
  src,
  videoSrc,
  webmSrc,
  alt,
  width,
  height,
  className,
  priority = false,
  isGif = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { preloadImage, isImageCached } = useCache();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1, // Start loading when 10% of the image is in view
  });

  // Preload image when it comes into view or is priority
  useEffect(() => {
    if (src && (priority || inView) && !isImageCached(src)) {
      preloadImage(src).catch(error => {
        console.warn('Failed to preload image:', src, error);
      });
    }
  }, [src, priority, inView, preloadImage, isImageCached]);

  // For videos (MP4 files), use LazyVideo component
  if (isGif) {
    // Check if we should attempt to use video version
    const useVideoVersion = videoSrc || webmSrc;
    
    // If video sources are specified, try to use LazyVideo
    if (useVideoVersion) {
      return (
        <div ref={ref} className={`image-container ${className || ''}`}>
          {inView && (
            <LazyVideo
              src={videoSrc}
              webmSrc={webmSrc}
              onError={() => setHasError(true)}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className={className}
              width={width}
              height={height}
              priority={priority}
              {...props}
            />
          )}
        </div>
      );
    }
  }

  // Regular image handling
  return (
    <div ref={ref} className={`image-container ${className || ''}`}>
      {inView && (
        <Image
          src={src}
          alt={alt || 'Image'}
          width={width}
          height={height}
          className={className}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />
      )}
    </div>
  );
}