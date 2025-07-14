"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LazyImage from "./LazyImage";

export default function FourthSection() {
  // Create separate opacity states for each section
  const [sectionOpacities, setSectionOpacities] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  // Add direct DOM manipulation for testing
  useEffect(() => {
    const handleScroll = () => {
      // Create a new opacity state object
      const newOpacities = { ...sectionOpacities };

      // Check each section individually
      for (let i = 1; i <= sections.length; i++) {
        // Skip the last section (section 5) - it won't have the black overlay
        if (i === 5) {
          newOpacities[i] = 0;
          continue;
        }
        
        const stickyElement = document.querySelector(`.section-${i}`);

        if (stickyElement) {
          const rect = stickyElement.getBoundingClientRect();
          const isSticky = rect.top <= 0;

          if (isSticky) {
            // Get the section's position in the document
            const sectionTop = stickyElement.offsetTop;

            // Calculate how far we've scrolled past this specific section
            const scrolledPastSection = window.scrollY - sectionTop;

            // Calculate progress (0 to 1) based on how far we've scrolled in this section
            const scrollProgress = Math.min(
              Math.max(scrolledPastSection / 200, 0),
              1
            );

            // Set opacity for this specific section (max 0.4)
            newOpacities[i] = scrollProgress * 0.4;
          } else {
            // If not sticky, opacity is 0
            newOpacities[i] = 0;
          }
        }
      }

      // Update all section opacities at once
      setSectionOpacities(newOpacities);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Define section data
  const sections = [
    {
      id: 1,
      title: "Custom Software Development",
      description:
        "We build tailored software solutions that perfectly align with your unique business requirements. Our development team transforms your ideas into powerful, scalable applications using the latest technologies and industry best practices to drive innovation and efficiency.",
      leftItems: [
        "Enterprise Applications",
        "SaaS Solutions",
        "Process Automation",
        "Integration Services",
      ],
      rightItems: ["Agile Development", "DevOps Practices", "Quality Assurance", "Continuous Delivery"],
      image: "/Film_branding-1.gif",
    },
    {
      id: 2,
      title: "Web & Mobile Development",
      description:
        "We create responsive web applications and mobile solutions that deliver exceptional user experiences across all devices. Our development approach ensures your digital products are fast, secure, and scalable while maintaining intuitive interfaces that engage your users.",
      leftItems: [
        "Progressive Web Apps",
        "Responsive Websites",
        "E-commerce Solutions",
        "Content Management",
      ],
      rightItems: ["iOS Development", "Android Development", "Cross-platform Apps", "Mobile UI/UX"],
      image: "/Film_digital-1.gif",
    },
    {
      id: 3,
      title: "Full-Stack Development",
      description:
        "Our full-stack development services cover both front-end and back-end technologies to deliver complete, end-to-end solutions. We combine attractive interfaces with robust server-side logic to create seamless applications that meet all your business requirements.",
      leftItems: [
        "Front-end Development",
        "Back-end Systems",
        "Database Design",
        "API Development",
      ],
      rightItems: ["JavaScript Frameworks", "Cloud Integration", "Microservices", "Serverless Architecture"],
      image: "/Film_branding-1.gif",
    },
    {
      id: 4,
      title: "DevOps & Cloud Engineering",
      description:
        "We implement DevOps practices and cloud solutions that streamline your development pipeline and infrastructure management. Our approach ensures faster deployment cycles, improved collaboration, and scalable infrastructure that grows with your business needs.",
      leftItems: [
        "CI/CD Implementation",
        "Infrastructure as Code",
        "Container Orchestration",
        "Cloud Migration",
      ],
      rightItems: ["AWS/Azure/GCP Solutions", "Kubernetes Management", "Docker Containerization", "Monitoring & Logging"],
      image: "/Film_digital-1.gif",
    },
    {
      id: 5,
      title: "Software Maintenance & Support",
      description:
        "We provide comprehensive maintenance and support services to ensure your software remains secure, efficient, and up-to-date. Our dedicated team handles everything from bug fixes and performance optimization to feature enhancements and technology upgrades.",
      leftItems: [
        "Bug Fixing",
        "Performance Tuning",
        "Security Updates",
        "Feature Enhancements",
      ],
      rightItems: ["24/7 Technical Support", "Code Refactoring", "Legacy System Modernization", "Documentation"],
      image: "/Film_branding-1.gif",
    },
  ];

  // No need for individual scroll effects as we're using a single overlay

  return (
    <div className="pt-5 md:pt-10 relative max-w-[2500px] mx-auto">
      {sections.map((section) => (
        <div
          key={section.id}
          className={`flex flex-col md:flex-row items-start sticky section-${section.id} px-4 sm:px-8 md:px-12 lg:px-16 z-${
            10 - section.id
          } top-0 bg-white gap-6 md:gap-12 lg:gap-28 py-8 md:py-12 lg:py-16 border-t-2 border-gray-300 relative overflow-hidden`}
        >
          {/* Individual overlay for each section (except the last one) */}
          {section.id !== 5 && (
            <div
              className="absolute left-0 right-0 top-0 bottom-0 z-[999] bg-black transition-opacity duration-300 w-full h-full"
              style={{
                pointerEvents: "none", // Ensure it doesn't block interactions
                opacity: sectionOpacities[section.id], // Individual opacity from state
              }}
            ></div>
          )}

          <div className="w-full md:basis-1/2 mb-6 md:mb-0">
            <h4 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">{section.title}</h4>

            <p className="text-base md:text-lg lg:text-xl pt-6 md:pt-10 lg:pt-16">{section.description}</p>
            
            {/* Image appears here on mobile, between text and list items */}
            <div className="block md:hidden w-full my-6">
              <LazyImage
                src={section.image}
                videoSrc={section.image.replace('.gif', '.mp4')}
                width={500}
                height={500}
                alt={section.title}
                className="w-full"
                priority={false}
                isGif={section.image.endsWith('.gif')}
              />
            </div>

            <div className="flex  items-start sm:items-center justify-start gap-8 sm:gap-16 md:gap-24 lg:gap-40 pt-6 md:pt-7 lg:pt-16">
              <div>
                <ul className="space-y-2">
                  {section.leftItems.map((item, index) => (
                    <li key={index} className="text-sm md:text-base">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  {section.rightItems.map((item, index) => (
                    <li key={index} className="text-sm md:text-base">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Image appears here on desktop */}
          <div className="hidden md:block md:basis-1/2">
            <LazyImage
              src={section.image}
              videoSrc={section.image.replace('.gif', '.mp4')}
              width={500}
              height={500}
              alt={section.title}
              className="w-full h-full"
              priority={false}
              isGif={section.image.endsWith('.gif')}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
