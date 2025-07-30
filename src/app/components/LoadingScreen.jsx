"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const circleRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const progressBar = progressRef.current;
    const circle = circleRef.current;
    const startTime = Date.now();
    const minLoadTime = 3000; // 3 seconds minimum
    let isPageLoaded = false;
    let canComplete = false;
    let circleAnimation;

    // Set initial states
    gsap.set(container, { opacity: 1 });
    gsap.set(text.children, { 
      y: 200, 
      opacity: 0,
      scale: 0.3,
      rotation: gsap.utils.random(-180, 180),
      transformOrigin: "50% 50%",
      filter: "blur(20px)"
    });
    gsap.set(progressBar, { scaleX: 0 });
    gsap.set(circle, { 
      x: 0, 
      y: -300, // Start from top
      scale: 1,
      opacity: 1
    });

    // Create timeline
    const tl = gsap.timeline();

    // Creative text animation with morphing and glitch effects
    tl.to(text.children, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      filter: "blur(0px)",
      duration: 1.5,
      stagger: {
        amount: 0.8,
        from: "random"
      },
      ease: "elastic.out(1, 0.8)",
    })
    // Glitch effect
    .to(text.children, {
      x: gsap.utils.random(-10, 10),
      duration: 0.1,
      stagger: 0.02,
      repeat: 3,
      yoyo: true,
      ease: "power2.inOut"
    }, "-=0.5")
    // Wave animation
    .to(text.children, {
      y: -30,
      duration: 0.6,
      stagger: 0.08,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
    }, "-=0.3")
    // Breathing effect
    .to(text.children, {
      scale: 1.05,
      duration: 2,
      stagger: 0.1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    }, "-=0.5");

    // Create bouncing circle animation
    const createCircleBounce = () => {
      const bounceTimeline = gsap.timeline({ repeat: -1 });
      
      // Get responsive bounds based on viewport
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxX = Math.min(vw * 0.4, 400); // 40% of viewport width, max 400px
      const maxY = Math.min(vh * 0.3, 250); // 30% of viewport height, max 250px
      
      // First fall down with bounce
      bounceTimeline.to(circle, {
        y: maxY * 0.8,
        duration: 0.8,
        ease: "bounce.out",
        rotation: "+=180",
      })
      // Then bounce around the entire screen responsively
      .to(circle, {
        x: gsap.utils.random(-maxX, maxX),
        y: gsap.utils.random(-maxY * 0.8, maxY),
        duration: 0.6,
        ease: "power2.inOut",
        rotation: "+=360",
      })
      .to(circle, {
        x: gsap.utils.random(-maxX, maxX),
        y: gsap.utils.random(-maxY * 0.8, maxY),
        duration: 0.5,
        ease: "power2.inOut",
        rotation: "+=270",
      })
      .to(circle, {
        x: gsap.utils.random(-maxX, maxX),
        y: gsap.utils.random(-maxY * 0.8, maxY),
        duration: 0.7,
        ease: "power2.inOut",
        rotation: "+=180",
      })
      .to(circle, {
        x: gsap.utils.random(-maxX, maxX),
        y: gsap.utils.random(-maxY * 0.8, maxY),
        duration: 0.4,
        ease: "power2.inOut",
        rotation: "+=360",
      })
      .to(circle, {
        x: gsap.utils.random(-maxX, maxX),
        y: gsap.utils.random(-maxY * 0.8, maxY),
        duration: 0.6,
        ease: "power2.inOut",
        rotation: "+=270",
      });
      
      return bounceTimeline;
    };

    // Start circle bouncing after a short delay
    gsap.delayedCall(0.5, () => {
      circleAnimation = createCircleBounce();
    });

    // Progress bar will be controlled by the progress state, not GSAP timeline

    // Check if page is loaded
    const checkPageLoaded = () => {
      if (document.readyState === 'complete') {
        isPageLoaded = true;
        checkCompletion();
      }
    };

    // Check if we can complete loading
    const checkCompletion = () => {
      const elapsedTime = Date.now() - startTime;
      const minTimeReached = elapsedTime >= minLoadTime;
      
      // Only complete if minimum time has passed AND page is loaded
      if (minTimeReached && isPageLoaded && !canComplete) {
        canComplete = true;
        console.log('Loading complete: min time reached and page loaded');
        
        // Stop circle bouncing and position it next to text
        if (circleAnimation) {
          circleAnimation.kill();
        }
        
        // Calculate responsive position next to the letter 'L' (last letter of PROSENTAL)
        const textRect = text.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const textWidth = textRect.width;
        const finalX = (textWidth / 2) + 20; // Position 20px after the text end
        const finalY = -10; // Slightly above baseline
        
        // Creative circle finale with morphing effect
        gsap.to(circle, {
          x: finalX,
          y: finalY,
          scale: 0.8,
          rotation: 720, // Double spin
          duration: 1.5,
          ease: "elastic.out(1, 0.6)",
        });
        
        // Exit animation with creative effects
        gsap.delayedCall(1.2, () => {
          // Text explosion effect
          gsap.to(text.children, {
            y: gsap.utils.random(-200, -400),
            x: gsap.utils.random(-100, 100),
            opacity: 0,
            scale: gsap.utils.random(0.2, 2),
            rotation: gsap.utils.random(-360, 360),
            filter: "blur(10px)",
            duration: 1.2,
            stagger: {
              amount: 0.3,
              from: "random"
            },
            ease: "power3.in",
          });
          
          // Circle particle explosion
          gsap.to(circle, {
            scale: 3,
            opacity: 0,
            rotation: "+=720",
            filter: "blur(20px)",
            duration: 1,
            ease: "power2.out",
          });
          
          // Container fade with zoom effect
          gsap.to(container, {
            opacity: 0,
            scale: 1.1,
            filter: "blur(5px)",
            duration: 0.8,
            delay: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete();
            }
          });
        });
      }
    };

    // Listen for page load events
    if (document.readyState === 'complete') {
      isPageLoaded = true;
    } else {
      window.addEventListener('load', checkPageLoaded);
      document.addEventListener('readystatechange', checkPageLoaded);
    }

    // Simulate loading progress with realistic timing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const elapsedTime = Date.now() - startTime;
        const minTimeReached = elapsedTime >= minLoadTime;
        
        // Progress based on time and page load status
        let targetProgress = Math.min((elapsedTime / minLoadTime) * 95, 95);
        if (isPageLoaded && minTimeReached) {
          targetProgress = 100;
        } else if (isPageLoaded) {
          targetProgress = Math.min(targetProgress + 5, 98);
        }
        
        const newProgress = Math.min(prev + Math.random() * 5, targetProgress);
        
        // Only allow completion if both conditions are met
        if (newProgress >= 100 && minTimeReached && isPageLoaded && !canComplete) {
          clearInterval(progressInterval);
          setTimeout(() => checkCompletion(), 100); // Small delay to ensure smooth transition
          return 100;
        }
        
        return newProgress;
      });
    }, 80);

    // Minimum time checker
    const minTimeTimeout = setTimeout(() => {
      checkCompletion();
    }, minLoadTime);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minTimeTimeout);
      window.removeEventListener('load', checkPageLoaded);
      document.removeEventListener('readystatechange', checkPageLoaded);
      tl.kill();
      if (circleAnimation) {
        circleAnimation.kill();
      }
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-bounce delay-1000"></div>
      </div>

      {/* Main text */}
      <div 
        ref={textRef}
        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 perspective-1000 whitespace-nowrap"
        style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.02em' }}
      >
        {'PROSENTAL'.split('').map((letter, index) => (
          <span 
            key={index}
            className="inline-block transform-gpu"
            style={{ 
              textShadow: '0 0 20px rgba(255,255,255,0.5)',
              background: 'linear-gradient(45deg, #fff, #e0e0e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Bouncing white circle */}
      <div 
        ref={circleRef}
        className="absolute w-8 h-8 rounded-full transform-gpu"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff, #f0f0f0)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255, 255, 255, 0.9)'
        }}
      ></div>



      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-white/40 rounded-full animate-ping delay-500"></div>
      <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-10 right-10 w-2 h-2 bg-white/30 rounded-full animate-ping delay-1500"></div>
    </div>
  );
};

export default LoadingScreen;