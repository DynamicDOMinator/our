"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cursor from "mouse-follower";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";
import LazyVideo from "../components/LazyVideo";
import { useAssetCache } from "../hooks/useAssetCache";

// Add a style tag to hide video controls
const hideVideoControlsStyle = `
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
  
  video.no-controls::-webkit-media-controls {
    display: none !important;
  }
  
  video {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
  }
`;

export default function FifthSection() {
  const router = useRouter();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [cursor, setCursor] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);
  const { preloadPageAssets } = useAssetCache();

  // Team videos array
  const teamVideos = [
    { id: "CyberXbytes", src: "/team3.webm", title: "CyberXbytes", description: "CTF platform " },
    { id: "Yoodydiet", src: "/team2.webm", title: "Yoodydiet", description: "Health & Care" },
    { id: "Design", src: "/team1.mp4", title: "Design", description: "Desinging & Branding" },
    { id: "NOCTURA", src: "/team4.webm", title: "NOCTURA", description: "SOFTWEAR AGANCY" },
    { id: "Electroniqo", src: "/team5.webm",  title: "Electroniqo", description: "E-commerce & Branding" }
  ];

  // Add refs for all videos
  const addToVideoRefs = (el) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  // Setup scroll-based animation for border radius
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"], // Animation completes by the time section is centered in viewport
  });

  // Transform scroll progress to border radius value
  // Reach full border radius when scrolled halfway through the section
  // For desktop: 0px to 170px
  // For mobile: 0px to 80px
  const desktopBorderRadius = useTransform(scrollYProgress, [0, 0.2], [0, 170]);
  const mobileBorderRadius = useTransform(scrollYProgress, [0, 0.2], [0, 80]);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Function to preload videos
  const preloadVideo = (src) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;
      video.controls = false;
      video.className = "no-controls";
      video.src = src;

      video.onloadeddata = () => {
        resolve(src);
      };

      video.onerror = () => {
        reject(`Failed to preload ${src}`);
      };

      // Start loading
      video.load();
    });
  };

  // Separate useEffect to handle video setup after DOM is fully loaded
  useEffect(() => {
    // Wait for DOM to be fully loaded
    const setupVideos = async () => {
      if (typeof window !== "undefined") {
        // Preload all video sources using the new caching system
        try {
          const projectsAssets = {
            videos: [
              { src: "/about-v.mp4" },
              ...teamVideos.map(video => ({ src: video.src }))
            ],
            images: [],
            critical: []
          };
          
          // Use the new caching system for preloading
          await preloadPageAssets(projectsAssets);
          console.log('Projects page videos preloaded via cache system');
        } catch (error) {
          console.error("Error preloading videos:", error);
        }

        // Find all video elements and ensure they have proper attributes
        const allVideos = document.querySelectorAll("video");
        allVideos.forEach((video) => {
          // Force video to be visible and play properly on mobile without controls
          video.setAttribute("playsinline", "");
          video.setAttribute("webkit-playsinline", "");
          video.setAttribute("x-webkit-airplay", "allow");
          video.removeAttribute("controls"); // Explicitly remove controls
          video.controls = false; // Set controls property to false
          video.muted = true; // Explicitly set muted property

          // Force load the video
          video.load();

          // Disable autoplay on desktop and ensure videos are initially paused
          if (!isMobile) {
            // On desktop, ensure videos are initially paused
            video.autoplay = false;
            video.pause();
            video.currentTime = 0;
          } else {
            // On mobile, pause all videos initially
            video.pause();
          }
        });
      }
    };

    // Run setup after a short delay to ensure DOM is ready
    const timer = setTimeout(setupVideos, 500);

    return () => clearTimeout(timer);
  }, [isMobile]); // Re-run when mobile status changes

  // Add style tag to hide video controls
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Create style element
      const styleEl = document.createElement("style");
      styleEl.id = "hide-video-controls-style";
      styleEl.textContent = hideVideoControlsStyle;
      document.head.appendChild(styleEl);

      // Clean up function
      return () => {
        const existingStyle = document.getElementById(
          "hide-video-controls-style"
        );
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, []);

  // Add scroll observer for videos
  useEffect(() => {
    if (typeof window !== "undefined" && isMobile) {
      // Create intersection observer for videos
      const options = {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.7, // 70% of the element must be visible
      };

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          const videoElement = entry.target;
          const videoIndex = videoRefs.current.indexOf(videoElement);

          if (entry.isIntersecting) {
            // Video is in view
            setActiveVideoIndex(videoIndex);

            // Pause all other videos
            videoRefs.current.forEach((video, idx) => {
              if (idx !== videoIndex) {
                video.pause();
                video.currentTime = 0;
              }
            });

            // Play this video
            if (videoElement.paused) {
              videoElement
                .play()
                .catch((err) => console.log("Error playing video:", err));
            }
          } else if (activeVideoIndex === videoIndex) {
            // This video is no longer in view
            videoElement.pause();
            videoElement.currentTime = 0;
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, options);

      // Observe all video elements
      videoRefs.current.forEach((video) => {
        observer.observe(video);
      });

      return () => {
        // Clean up observer
        videoRefs.current.forEach((video) => {
          observer.unobserve(video);
        });
      };
    }
  }, [isMobile, activeVideoIndex]);

  useEffect(() => {
    // Register GSAP with Cursor
    Cursor.registerGSAP(gsap);

    let cursorInstance = null;

    // Initialize cursor only on desktop
    if (typeof window !== "undefined" && window.innerWidth > 1024) {
      // Check if cursor already exists in the document
      const existingCursor = document.querySelector(".mf-cursor");

      if (!existingCursor) {
        cursorInstance = new Cursor({
          container: document.body,
          speed: 0.5,
          ease: "expo.out",
          visibleTimeout: 300,
          mediaBlend: false,
        });

        setCursor(cursorInstance);
      }
    }

    return () => {
      // Clean up cursor on component unmount only if we created it
      if (cursorInstance) {
        cursorInstance.destroy();
      }
    };
  }, []);

  // Ensure the featured video plays automatically
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true; // Ensure muted to allow autoplay
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Featured video autoplay failed, error
          // Try again after a short delay
          setTimeout(() => {
            videoRef.current
              .play()
              .catch((e) => {/* Second attempt failed */});
          }, 1000);
        });
      }
    }
  }, []);

  // Navigate to project page on video click
  const handleVideoClick = (e, projectId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (projectId) {
      router.push(`/projects/${projectId}`);
    }
  };

  // Handle featured video click (main video)
  const handleFeaturedVideoClick = (e) => {
    // Prevent default behavior which might open video in fullscreen on mobile
    e.preventDefault();
    e.stopPropagation();

    if (videoRef.current) {
      if (videoRef.current.paused) {
        // Store the play promise to handle it properly
        const playPromise = videoRef.current.play();

        // Handle the promise to avoid "play() request was interrupted" error
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Video play error:", error);
            // Try again with muted
            videoRef.current.muted = true;
            videoRef.current
              .play()
              .catch((e) => console.log("Second attempt failed:", e));
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Handle touch events specifically for mobile
  const handleVideoTouch = (e, videoElement) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();

      // Ensure video is visible and playing
      if (videoElement) {
        videoElement.style.opacity = "1";
        videoElement.muted = true;

        // Pause all other videos first
        const allVideos = document.querySelectorAll("video");
        allVideos.forEach((video) => {
          if (video !== videoElement) {
            video.pause();
            // Reset video to beginning
            video.currentTime = 0;
          }
        });

        // Play this video
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Touch play error:", error);
          });
        }
      }
    }
  };

  const handleVideoHover = (videoElement) => {
    if (videoElement && !isMobile) {
      // Only apply hover effect on desktop, not on mobile
      videoElement.currentTime = 0; // Reset video to beginning
      // Store the play promise to handle it properly
      const playPromise = videoElement.play();

      // Handle the promise to avoid "play() request was interrupted" error
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented or interrupted
          // Try again with user interaction flag
          videoElement.muted = true; // Ensure muted to allow autoplay
          videoElement
            .play()
            .catch((e) => {/* Second attempt failed */});
        });
      }
    }
  };

  const handleVideoLeave = (videoElement) => {
    if (videoElement && !isMobile) {
      // Only apply leave effect on desktop, not on mobile
      // Only pause if the video is actually playing
      if (!videoElement.paused) {
        videoElement.pause();

        // Smoothly reset video to beginning using GSAP
        const currentTime = videoElement.currentTime;
        gsap.to(videoElement, {
          duration: 0.5, // Increased duration for slower reset
          onUpdate: function () {
            const progress = this.progress();
            videoElement.currentTime = currentTime * (1 - progress);
          },
          ease: "power1.inOut", // More gradual easing function
        });
      }
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      id="fifth-section"
      className="lg:mt-30 pt-10 md:pb-38 pb-20 lg:pl-38 pl-10 "
      style={{
        borderTopLeftRadius: isMobile
          ? mobileBorderRadius
          : desktopBorderRadius,
        borderTopRightRadius: isMobile
          ? mobileBorderRadius
          : desktopBorderRadius,
      }}
    >
      <div className="pt-20  max-w-[1500px] mx-auto ">
        <motion.h5
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className="text-black italic md:text-9xl text-5xl "
        >
          What We


        </motion.h5>
        <div className="flex items-center max-w-[1500px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-full pr-2 mt-2 md:w-[185px] md:h-[125px] w-[100px] h-[70px] lg:mt-12"
          >
            <video
              ref={(el) => {
                videoRef.current = el;
                addToVideoRefs(el);
              }}
              src="/about-v.mp4"
              loop
              autoPlay
              muted
              playsInline
              preload="auto"
              onClick={(e) => handleFeaturedVideoClick(e)}
              onTouchStart={(e) => handleVideoTouch(e, e.target)}
              className="w-full h-full rounded-full cursor-pointer object-cover"
              data-cursor="text"
              data-cursor-text="Explore"
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              controls={false}
              style={{ backgroundColor: "#000" }} // Add background color as fallback
              onLoadedData={(e) => {
                e.target
                  .play()
                  .catch((err) => console.log("Video play error:", err));
              }}
            ></video>
          </motion.div>

          <motion.h5
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="text-black md:text-9xl text-5xl"
          >
          Have Built
          </motion.h5>
        </div>
      </div>

      <div className="pt-20 max-w-[1500px] mx-auto pr-10 lg:pr-0">
        <div className="flex lg:flex-row flex-col justify-center items-center lg:justify-start   gap-20">
          <div className="flex flex-col gap-24">
            {teamVideos.slice(0, 3).map((video, index) => (
              <motion.div
                key={`left-${index}`}
                className="relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2 * index,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <video
                  ref={addToVideoRefs}
                  className="w-[400px]  h-[535px] rounded-[45px] object-cover cursor-pointer"
                  src={video.src}
                  data-cursor="-text"
                  data-cursor-text="Explore"
                  onMouseEnter={(e) => handleVideoHover(e.target)}
                  onMouseLeave={(e) => handleVideoLeave(e.target)}
                  onClick={(e) => handleVideoClick(e, video.id)}
                  onTouchStart={(e) => handleVideoTouch(e, e.target)}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                  controls={false}
                  style={{ backgroundColor: "#000" }} // Add background color as fallback
                ></video>
                <p className="text-black text-xl pt-5">
                  <span className="font-semibold">{video.title}</span> – {video.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col">
            {teamVideos.slice(3, 5).map((video, index) => (
              <motion.div
                key={`right-${index}`}
                className={index === 0 ? "lg:pt-[280px]" : "lg:pt-[120px] pt-[90px]"}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: index === 0 ? 1.2 : 0.8,
                  delay: 0.3 + 0.2 * index,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <video
                  ref={addToVideoRefs}
                  className="w-[400px] h-[535px] rounded-[45px] object-cover cursor-pointer"
                  src={video.src}
                  data-cursor="-text"
                  data-cursor-text="Explore"
                  onMouseEnter={(e) => handleVideoHover(e.target)}
                  onMouseLeave={(e) => handleVideoLeave(e.target)}
                  onClick={(e) => handleVideoClick(e, video.id)}
                  onTouchStart={(e) => handleVideoTouch(e, e.target)}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                  controls={false}
                  style={{ backgroundColor: "#000" }} // Add background color as fallback
                ></video>
                <p className="text-black text-xl pt-5">
                  <span className="font-semibold">{video.title}</span> – {video.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}