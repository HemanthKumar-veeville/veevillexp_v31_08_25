"use client";
import React, { useState, useEffect } from "react";
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

  const smoothScroll = (
    element: Element,
    target: number,
    duration: number = 600 // Reduced default duration
  ) => {
    const start = element.scrollTop;
    const windowHeight = window.innerHeight;
    const maxScroll = element.scrollHeight - windowHeight;
    const constrainedTarget = Math.max(0, Math.min(target, maxScroll));

    // Early exit if already at target
    if (start === constrainedTarget) return;

    const distance = constrainedTarget - start;
    const startTime = performance.now();

    // Optimized easing function for mobile
    const ease = (t: number) => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    let lastTimestamp = startTime;
    let lastPosition = start;

    const animation = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = ease(progress);

      // Calculate new position
      const newPosition = start + distance * easeProgress;

      // Apply position
      element.scrollTop = newPosition;

      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        // Ensure we land exactly on target
        element.scrollTop = constrainedTarget;
      }
    };

    requestAnimationFrame(animation);
  };

  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const container = document.querySelector(".snap-y");
    if (!container) return;

    // Function to get current section index based on scroll position
    const getCurrentSection = () => {
      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      return Math.round(scrollTop / windowHeight);
    };

    // Function to update current section index
    const updateCurrentSection = () => {
      setCurrentSectionIndex(getCurrentSection());
    };

    // Add scroll event listener to update current section
    container.addEventListener("scroll", updateCurrentSection);

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
          const targetIndex = currentSectionIndex + direction;

          // Check section boundaries
          if (targetIndex >= 0 && targetIndex < sections.length) {
            setIsScrollLocked(true);
            smoothScroll(container, targetIndex * window.innerHeight);
            setTimeout(() => setIsScrollLocked(false), 1000);
          }
          break;
        case "Home":
        case "End":
          event.preventDefault();
          setIsScrollLocked(true);
          smoothScroll(
            container,
            event.key === "Home" ? 0 : container.scrollHeight
          );
          setTimeout(() => setIsScrollLocked(false), 1000);
          break;
      }
    };

    let touchStartY = 0;
    let touchStartTime = 0;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let lastTouchTime = 0;

    // Adjusted thresholds for better control
    const SWIPE_THRESHOLD = 75; // Increased from 50
    const SWIPE_TIME_LIMIT = 200; // Reduced from 300
    const TOUCH_COOLDOWN = 800; // Minimum time between touch events

    const clearScrollLock = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrollLocked(false);
        isScrolling = false;
      }, 800); // Increased for better control
    };

    const handleTouchStart = (e: Event) => {
      if (isScrollLocked) return;

      const touch = (e as TouchEvent).touches[0];
      touchStartY = touch.clientY;
      touchStartTime = performance.now();
    };

    const handleTouchMove = (e: Event) => {
      if (isScrollLocked || isScrolling) {
        e.preventDefault();
        return;
      }

      const now = performance.now();
      if (now - lastTouchTime < TOUCH_COOLDOWN) {
        e.preventDefault();
        return;
      }

      const touch = (e as TouchEvent).touches[0];
      const deltaY = touchStartY - touch.clientY;
      const swipeTime = now - touchStartTime;

      // Process swipe only if it meets our criteria
      if (
        Math.abs(deltaY) >= SWIPE_THRESHOLD &&
        swipeTime <= SWIPE_TIME_LIMIT
      ) {
        e.preventDefault();
        const direction = deltaY > 0 ? 1 : -1;
        const targetIndex = currentSectionIndex + direction;

        // Check section boundaries
        if (targetIndex >= 0 && targetIndex < sections.length) {
          isScrolling = true;
          setIsScrollLocked(true);
          lastTouchTime = now;

          smoothScroll(container, targetIndex * window.innerHeight);
          clearScrollLock();
        }
      }
    };

    const handleTouchEnd = () => {
      // Reset touch tracking
      touchStartY = 0;
      touchStartTime = 0;
    };

    // Optimized wheel handler with debounce
    let wheelTimeout: NodeJS.Timeout;
    let lastWheelTime = 0;
    const WHEEL_DELAY = 100; // Minimum time between wheel events

    const handleWheel = (e: Event) => {
      e.preventDefault();
      if (isScrollLocked || isScrolling) return;

      const now = performance.now();
      if (now - lastWheelTime < WHEEL_DELAY) return;
      lastWheelTime = now;

      const wheelEvent = e as WheelEvent;
      const direction = Math.sign(wheelEvent.deltaY);

      if (direction !== 0) {
        const targetIndex = currentSectionIndex + direction;

        // Check section boundaries
        if (targetIndex >= 0 && targetIndex < sections.length) {
          isScrolling = true;
          setIsScrollLocked(true);

          smoothScroll(container, targetIndex * window.innerHeight, 500);
          clearScrollLock();
        }
      }
    };

    // Prevent default scroll behavior
    const preventDefaultScroll = (e: Event) => {
      if (isScrollLocked || isScrolling) {
        e.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    // Prevent momentum scrolling
    container.addEventListener("scroll", preventDefaultScroll, {
      passive: false,
    });

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", preventDefaultScroll);
      container.removeEventListener("scroll", updateCurrentSection);
    };
  }, []);

  // Hide instructions after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowInstructions(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
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
      <section className="h-screen snap-start bg-white">
        <HeroSection />
      </section>

      {/* Play Section */}
      <section className="h-screen snap-start bg-white">
        <PlaySection />
      </section>

      {/* Methodology Section */}
      <section className="h-screen snap-start bg-white">
        <MethodologySection />
      </section>

      {/* Introduction Section */}
      <section className="h-screen snap-start bg-white">
        <IntroductionSection />
      </section>

      {/* What Shifts */}
      <section className="h-screen snap-start bg-white flex flex-col justify-center items-center">
        <WhatShifts />
      </section>

      {/* High Five Section */}
      <section className="h-screen snap-start bg-white flex flex-col justify-center items-center">
        <HighFiveSection />
      </section>

      {/* Our Clients Section */}
      <section className="h-screen snap-start bg-white flex flex-col justify-center items-center">
        <OurClientsSection />
      </section>

      {/* Clients Section */}
      <section className="h-screen snap-start bg-white flex flex-col justify-center items-center">
        <ClientsSection />
      </section>

      {/* Testimonials Section */}
      <section className="h-screen snap-start bg-white flex flex-col justify-center items-center">
        <TestimonialsSection />
      </section>

      {/* Contact Form & Footer Section - Combined */}
      <section className="h-screen snap-start bg-white flex flex-col justify-center items-center">
        <ContactFormSection />
      </section>
    </div>
  );
}
