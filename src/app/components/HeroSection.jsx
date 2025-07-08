"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      color: [
        "rgba(168, 85, 247, 0.4)", // purple
        "rgba(59, 130, 246, 0.4)", // blue
        "rgba(45, 212, 191, 0.4)", // teal
      ][Math.floor(Math.random() * 3)],
    }));

    setParticles(newParticles);
  }, []);

  const lines = [
    { text: "Your ideas,", highlight: false },
    { text: "our code", highlight: true },
    { text: "built to scale.", highlight: false },
  ];

  return (
    <div className="relative pt-32 flex flex-col justify-center px-8 md:px-20 overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-200 via-blue-500 to-teal-400 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              filter: "blur(1px)",
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: ["-20px", "20px", "-20px"],
              y: ["-20px", "20px", "-20px"],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              x: {
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: particle.duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: {
                duration: particle.duration * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              delay: particle.delay,
            }}
          />
        ))}

        <div className="absolute inset-0 backdrop-blur-[80px]" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="space-y-1 md:space-y-2 mb-8 relative">
          {/* Text mask effect */}
          <motion.div
            className="absolute inset-0  rounded-xl"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {lines.map((line, index) => (
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.3 + 0.2,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className={`text-4xl text-center md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight ${
                line.highlight ? "text-cyan-600  " : "text"
              }`}
              style={{
                position: "relative",
                zIndex: 2,
              }}
            >
              {line.text}
            </motion.h2>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-lg md:text-xl text-center text-gray-400  max-w-2xl mb-8"
        >
          We transform your vision into exceptional digital experiences with
          cutting-edge technology and thoughtful design.
        </motion.p>
      </div>
    </div>
  );
}
