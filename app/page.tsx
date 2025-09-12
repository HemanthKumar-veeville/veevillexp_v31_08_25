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

    let startY = 0;
    let startTime = 0;
    let lastY = 0;
    let velocity = 0;
    let lastTime = 0;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;
    const velocityThreshold = 0.5;
    let isScrolling = false;
    let isPointerDown = false;

    const handleScrollStart = (y: number) => {
      if (isScrollLocked) return;
      startY = y;
      lastY = y;
      startTime = performance.now();
      lastTime = startTime;
      velocity = 0;
      isScrolling = false;
    };

    const handleScrollMove = (y: number) => {
      if (isScrollLocked) return;

      const currentTime = performance.now();
      const deltaY = y - lastY;
      const deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        velocity = deltaY / deltaTime;
      }

      lastY = y;
      lastTime = currentTime;

      if (Math.abs(y - startY) > 10) {
        isScrolling = true;
      }
    };

    const handleScrollEnd = (y: number) => {
      if (isScrollLocked || !isScrolling) return;

      const deltaY = y - startY;
      const scrollTime = performance.now() - startTime;
      const scrollVelocity = Math.abs(velocity);

      if (
        (Math.abs(deltaY) > minSwipeDistance && scrollTime < maxSwipeTime) ||
        scrollVelocity > velocityThreshold
      ) {
        const direction = deltaY > 0 ? -1 : 1;
        const targetSection = currentSection + direction;

        if (targetSection >= 0 && targetSection < sections.length) {
          setIsScrollLocked(true);
          smoothScroll(targetSection);
          setTimeout(() => setIsScrollLocked(false), 800);
        }
      }

      isScrolling = false;
      isPointerDown = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      handleScrollStart(e.touches[0].clientY);
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleScrollMove(e.touches[0].clientY);
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      handleScrollEnd(e.changedTouches[0].clientY);
      e.preventDefault();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      isPointerDown = true;
      handleScrollStart(e.clientY);
      e.preventDefault();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || !isPointerDown) return;
      handleScrollMove(e.clientY);
      e.preventDefault();
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      handleScrollEnd(e.clientY);
      e.preventDefault();
    };

    const handlePointerCancel = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      isPointerDown = false;
      isScrolling = false;
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

    // Touch events
    containerRef.current.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    containerRef.current.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    containerRef.current.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });

    // Pointer events
    containerRef.current.addEventListener("pointerdown", handlePointerDown, {
      passive: false,
    });
    containerRef.current.addEventListener("pointermove", handlePointerMove, {
      passive: false,
    });
    containerRef.current.addEventListener("pointerup", handlePointerUp, {
      passive: false,
    });
    containerRef.current.addEventListener(
      "pointercancel",
      handlePointerCancel,
      {
        passive: false,
      }
    );

    // Wheel event
    containerRef.current.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (containerRef.current) {
        // Remove touch events
        containerRef.current.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
        containerRef.current.removeEventListener("touchend", handleTouchEnd);

        // Remove pointer events
        containerRef.current.removeEventListener(
          "pointerdown",
          handlePointerDown
        );
        containerRef.current.removeEventListener(
          "pointermove",
          handlePointerMove
        );
        containerRef.current.removeEventListener("pointerup", handlePointerUp);
        containerRef.current.removeEventListener(
          "pointercancel",
          handlePointerCancel
        );

        // Remove wheel event
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
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory touch-pan-y"
      style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
    >
      {/* Scroll Instructions Overlay - Hidden on mobile */}
      {showInstructions && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg z-50 text-sm hidden lg:block">
          <div className="flex items-center space-x-4">
            <span>Use ↑↓ arrows or scroll to navigate</span>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-white hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
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
    </div>
  );
}
