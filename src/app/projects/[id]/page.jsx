"use client";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Cursor from "mouse-follower";
import gsap from "gsap";
import "mouse-follower/dist/mouse-follower.min.css";
import { getProjectById } from "../../data/projects";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id;
  const projectData = getProjectById(projectId);
  const router = useRouter();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [cursor, setCursor] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);
  const [isHovering, setIsHovering] = useState(false);

  // Handle case when project is not found
  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-xl mb-8">
            The project you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/projects")}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Initialize cursor
  useEffect(() => {
    Cursor.registerGSAP(gsap);
    let cursorInstance = null;

    if (typeof window !== "undefined" && window.innerWidth > 1024) {
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
      if (cursorInstance) {
        cursorInstance.destroy();
      }
    };
  }, []);

  // Ensure video autoplay after component mount
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      // Ensure video plays automatically
      const playVideo = () => {
        video.play().catch((err) => {
          console.log("Video autoplay failed:", err);
        });
      };

      // Try to play immediately
      playVideo();

      // Also try when video is loaded
      video.addEventListener("loadeddata", playVideo);
      video.addEventListener("canplay", playVideo);

      return () => {
        video.removeEventListener("loadeddata", playVideo);
        video.removeEventListener("canplay", playVideo);
      };
    }
  }, [projectData]);

  // Handle video interactions
  const handleVideoHover = (videoElement) => {
    if (!isMobile && videoElement) {
      videoElement.play().catch((err) => console.log("Video play error:", err));
    }
  };

  const handleVideoLeave = (videoElement) => {
    if (!isMobile && videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="lg:pt-52 pt-40 lg:px-20 px-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className="lg:text-7xl md:text-5xl text-3xl text-center italic font-semibold"
        >
          <span className="inline-block transition-transform duration-500 hover:translate-y-[-10px]">
            {projectData.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 1.6,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className="text-2xl pt-10 text-center italic"
        >
          {projectData.subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.0,
          delay: 2.0,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        className="relative w-full lg:h-[700px] h-[350px] lg:pt-40 mt-20 lg:px-20 px-10"
      >
        <video
          ref={videoRef}
          src={projectData.mainVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onMouseEnter={(e) => handleVideoHover(e.target)}
          onMouseLeave={(e) => handleVideoLeave(e.target)}
          className="w-full h-full object-cover rounded-2xl cursor-pointer"
          data-cursor="text"
          data-cursor-text="Play"
          controlsList="nodownload nofullscreen noremoteplaybook"
          disablePictureInPicture
          controls={false}
          style={{ backgroundColor: "#000" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex lg:flex-row flex-col items-center px-10 lg:px-0 lg:items-start max-w-[1000px] gap-10 mx-auto text-2xl mt-20"
      >
        <div className="min-w-[200px]">
          <p>{projectData.challenge.title}</p>
        </div>
        <div className="">
          {projectData.challenge.content.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "pt-10" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      <div className="lg:px-20 px-10 pt-20">
        {projectData.images.slice(0, 3).map((imageSrc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1 + index * 0.1,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            viewport={{ once: true, amount: 0.3 }}
            className={index > 0 ? "pt-10" : ""}
          >
            <Image
              className="w-full object-cover rounded-2xl cursor-pointer"
              src={imageSrc}
              alt={`${projectData.title}-${index + 1}`}
              width={1000}
              height={1000}
              data-cursor="text"
              data-cursor-text="View"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.0,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="pt-40 max-w-[900px] mx-auto font-semibold"
      >
        <h2 className="lg:text-7xl md:text-5xl text-3xl  mx-5 lg:mx-0  border-b-2 border-black pb-10">
          {projectData.sections[0]?.title
            .split(" ")
            .map((word, index, array) => {
              const isLastWord = index === array.length - 1;
              const shouldBreak = index === Math.floor(array.length / 2);
              return (
                <span key={index}>
                  <span className="inline-block transition-transform duration-500 hover:translate-y-[-10px]">
                    {word}
                  </span>
                  {shouldBreak && <br />}
                  {!isLastWord && !shouldBreak && " "}
                </span>
              );
            })}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col lg:flex-row px-10 lg:px-0 items-start max-w-[1000px] gap-10 mx-auto text-2xl mt-20"
      >
        <div className="min-w-[200px]">
          <p>{projectData.sections[0]?.subtitle}</p>
        </div>
        <div className="">
          <p>{projectData.sections[0]?.content}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        viewport={{ once: true, amount: 0.3 }}
        className="lg:px-20 px-10 pt-10"
      >
        <Image
          className="w-full object-cover pt-10 rounded-2xl cursor-pointer"
          src={projectData.images[3] || projectData.images[0]}
          alt={`${projectData.title}-detail`}
          width={1000}
          height={1000}
          data-cursor="text"
          data-cursor-text="View"
        />
      </motion.div>
      <div className="">
        <div className="flex flex-col items-center px-5 md:px-0   lg:flex-row gap-10 max-w-[1000px] mx-auto pb-30 ">
          <div className="flex flex-col gap-10 mt-20 ">
            {projectData.gallery.slice(0, 3).map((item, index) => (
              <motion.div
                key={`left-${index}`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className={`md:w-[450px] rounded-4xl h-[750px] relative ${item.bgColor} p-10`}
              >
                <Image
                  className="w-full h-full rounded-3xl pt-10 cursor-pointer"
                  src={item.image}
                  alt={`${projectData.title}-gallery-${index + 1}`}
                  width={1000}
                  height={1000}
                  data-cursor="text"
                  data-cursor-text="View"
                />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-10 lg:mt-20 lg:pt-50">
            {projectData.gallery.slice(3, 6).map((item, index) => (
              <motion.div
                key={`right-${index}`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className={`md:w-[450px] rounded-4xl h-[750px] relative ${item.bgColor} p-10`}
              >
                <Image
                  className="w-full h-full rounded-3xl pt-10 cursor-pointer"
                  src={item.image}
                  alt={`${projectData.title}-gallery-${index + 4}`}
                  width={1000}
                  height={1000}
                  data-cursor="text"
                  data-cursor-text="View"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
