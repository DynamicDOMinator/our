"use client";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const cursorScale = useRef(1);
  const animationFrameId = useRef(null);

  useEffect(() => {
    // Update mouse position on mouse move
    const updateMousePosition = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // Handle hover state
    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if the element or its parent is interactive
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.style.cursor === "pointer" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer" ||
        target.classList.contains("cursor-pointer") ||
        (target.className &&
          typeof target.className === "string" &&
          target.className.includes("cursor-pointer"));

      if (isInteractive) {
        setIsHovering(true);
        // Add a small delay to make the effect more noticeable
        if (cursorRef.current) {
          cursorRef.current.style.transition =
            "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }
      }
    };

    const handleMouseOut = (e) => {
      const relatedTarget = e.relatedTarget;
      // Check if the related target is interactive
      const isRelatedInteractive =
        relatedTarget &&
        (relatedTarget.tagName === "A" ||
          relatedTarget.tagName === "BUTTON" ||
          relatedTarget.style.cursor === "pointer" ||
          relatedTarget.closest("a") ||
          relatedTarget.closest("button") ||
          window.getComputedStyle(relatedTarget).cursor === "pointer" ||
          relatedTarget.classList.contains("cursor-pointer") ||
          (relatedTarget.className &&
            typeof relatedTarget.className === "string" &&
            relatedTarget.className.includes("cursor-pointer")));

      // Only set to false if we're not entering another interactive element
      if (!isRelatedInteractive) {
        setIsHovering(false);
        // Reset transition to default
        if (cursorRef.current) {
          cursorRef.current.style.transition = "";
        }
      }
    };

    // Animation function for smooth cursor movement
    const animateCursor = () => {
      const speed = 0.2; // Adjust speed factor (0.1 to 0.9)

      // Calculate the distance between current cursor position and mouse position
      const dx = mousePosition.current.x - cursorPosition.current.x;
      const dy = mousePosition.current.y - cursorPosition.current.y;

      // Update cursor position with easing
      cursorPosition.current.x += dx * speed;
      cursorPosition.current.y += dy * speed;

      // Calculate target scale based on hover state
      const targetScale = isHovering ? 2.0 : 1;

      // Smoothly interpolate scale
      cursorScale.current += (targetScale - cursorScale.current) * 0.25;

      // Apply the position and scale to the cursor element
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${
          cursorPosition.current.x - 8
        }px, ${cursorPosition.current.y - 8}px) scale(${cursorScale.current})`;
      }

      // Continue animation
      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    // Add event listeners
    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);

    // Initialize cursor position and start animation
    cursorPosition.current = {
      x: mousePosition.current.x,
      y: mousePosition.current.y,
    };
    animationFrameId.current = requestAnimationFrame(animateCursor);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? "hover" : ""}`}
      style={{
        transform: "translate(0px, 0px)", // Initial position, will be updated by JS
      }}
    />
  );
}
