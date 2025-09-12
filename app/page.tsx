"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { ClientsSection } from "./sections/ClientsSection/ClientsSection";
import { ContactFormSection } from "./sections/ContactFormSection/ContactFormSection";
import { ExperienceSection } from "./sections/ExperienceSection/ExperienceSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { HighFiveSection } from "./sections/HighFiveSection/HighFiveSection";
import { IntroductionSection } from "./sections/IntroductionSection/IntroductionSection";
import { MethodologySection } from "./sections/MethodologySection/MethodologySection";
import { OurClientsSection } from "./sections/OurClientsSection/OurClientsSection";
import { PlaySection } from "./sections/PlaySection/PlaySection";
import { TestimonialsSection } from "./sections/TestimonialsSection/TestimonialsSection";
import { WhatShifts } from "./sections/WhatShifts/WhatShifts";

export default function Veevillexp() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: containerRef });
  const sections = [
    "Hero",
    "Play",
    "Methodology",
    "Introduction",
    "What Shifts",
    "High Five",
    "Our Clients",
    "Clients",
    "Testimonials",
    "Contact & Footer",
  ];

  const smoothScroll = (targetSection: number) => {
    if (
      targetSection >= 0 &&
      targetSection < sections.length &&
      containerRef.current
    ) {
      const container = containerRef.current as HTMLElement;
      const targetScroll = targetSection * window.innerHeight;

      container.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });

      setCurrentSection(targetSection);
    }
  };

  const [isScrollLocked, setIsScrollLocked] = useState(false);

  // Spring animation for smooth scrolling
  const springConfig = {
    stiffness: 100,
    damping: 30,
    mass: 1,
  };

  const smoothY = useSpring(scrollY, springConfig);

  // Update current section based on scroll position
  useMotionValueEvent(smoothY, "change", (latest: number) => {
    const newSection = Math.round(latest / window.innerHeight);
    if (
      newSection !== currentSection &&
      newSection >= 0 &&
      newSection < sections.length
    ) {
      setCurrentSection(newSection);
    }
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isScrollLocked) {
        event.preventDefault();
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          const direction = event.key === "ArrowDown" ? 1 : -1;
          setIsScrollLocked(true);
          smoothScroll(currentSection + direction);
          setTimeout(() => setIsScrollLocked(false), 800);
          break;
        case "Home":
        case "End":
          event.preventDefault();
          setIsScrollLocked(true);
          smoothScroll(event.key === "Home" ? 0 : sections.length - 1);
          setTimeout(() => setIsScrollLocked(false), 800);
          break;
      }
    };

    let touchStartY = 0;
    let touchStartTime = 0;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    const handleTouchStart = (e: TouchEvent) => {
      if (isScrollLocked) return;
      touchStartY = e.touches[0].clientY;
      touchStartTime = performance.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollLocked) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;
      const swipeTime = performance.now() - touchStartTime;

      if (Math.abs(deltaY) > minSwipeDistance && swipeTime < maxSwipeTime) {
        const direction = deltaY > 0 ? -1 : 1;
        const targetSection = currentSection + direction;

        if (targetSection >= 0 && targetSection < sections.length) {
          setIsScrollLocked(true);
          smoothScroll(targetSection);
          setTimeout(() => setIsScrollLocked(false), 800);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrollLocked) return;

      const direction = Math.sign(e.deltaY);
      const targetSection = currentSection + direction;

      if (targetSection >= 0 && targetSection < sections.length) {
        setIsScrollLocked(true);
        smoothScroll(targetSection);
        setTimeout(() => setIsScrollLocked(false), 800);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    containerRef.current.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    containerRef.current.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
    containerRef.current.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        containerRef.current.removeEventListener("touchend", handleTouchEnd);
        containerRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentSection, isScrollLocked]);

  // Hide instructions after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Scroll Instructions Overlay - Hidden on mobile */}
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg z-50 text-sm hidden lg:block"
        >
          <div className="flex items-center space-x-4">
            <span>Use ↑↓ arrows or scroll to navigate</span>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-white hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.section
        className="h-screen snap-start bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
      </motion.section>

      {/* Play Section */}
      <motion.section
        className="h-screen snap-start bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PlaySection />
      </motion.section>

      {/* Methodology Section */}
      <motion.section
        className="h-screen snap-start bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MethodologySection />
      </motion.section>

      {/* Introduction Section */}
      <motion.section
        className="h-screen snap-start bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <IntroductionSection />
      </motion.section>

      {/* What Shifts */}
      <motion.section
        className="h-screen snap-start bg-white flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WhatShifts />
      </motion.section>

      {/* High Five Section */}
      <motion.section
        className="h-screen snap-start bg-white flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HighFiveSection />
      </motion.section>

      {/* Our Clients Section */}
      <motion.section
        className="h-screen snap-start bg-white flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <OurClientsSection />
      </motion.section>

      {/* Clients Section */}
      <motion.section
        className="h-screen snap-start bg-white flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ClientsSection />
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="h-screen snap-start bg-white flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TestimonialsSection />
      </motion.section>

      {/* Contact Form & Footer Section - Combined */}
      <motion.section
        className="h-screen snap-start bg-white flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContactFormSection />
      </motion.section>
    </motion.div>
  );
}
