"use client";
import React, { useState, useEffect } from "react";
import { ClientsSection } from "./sections/ClientsSection/ClientsSection";
import { ContactFormSection } from "./sections/ContactFormSection/ContactFormSection";
import { ExperienceSection } from "./sections/ExperienceSection/ExperienceSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
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
    duration: number = 800
  ) => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const actualDuration = isMobile ? 450 : duration;

    const start = element.scrollTop;
    const windowHeight = window.innerHeight;
    const maxScroll = element.scrollHeight - windowHeight;

    // Get current section and ensure we only move one section at a time
    const currentSection = Math.round(start / windowHeight);

    // Calculate the next section based on direction
    const direction = target > start ? 1 : -1;
    const nextSection = Math.max(
      0,
      Math.min(currentSection + direction, sections.length - 1)
    );
    const constrainedTarget = Math.min(nextSection * windowHeight, maxScroll);

    // If we're already at the target section or trying to scroll beyond bounds, don't scroll
    if (
      currentSection === nextSection ||
      (direction < 0 && currentSection === 0) ||
      (direction > 0 && currentSection === sections.length - 1)
    ) {
      return;
    }

    const distance = constrainedTarget - start;
    const startTime = performance.now();

    // Enhanced easing function for smoother movement
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let isAnimating = true;
    let lastScrollTop = start;
    let lastTime = startTime;

    const animation = (currentTime: number) => {
      if (!isAnimating) return;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / actualDuration, 1);
      const easeProgress = easeOutCubic(progress);

      const newScrollTop = start + distance * easeProgress;

      // Prevent overshooting
      const finalScrollTop = Math.max(
        0,
        Math.min(newScrollTop, element.scrollHeight - windowHeight)
      );
      element.scrollTop = finalScrollTop;

      // If we're very close to the target, snap to it
      if (Math.abs(finalScrollTop - constrainedTarget) < 1) {
        element.scrollTop = constrainedTarget;
        isAnimating = false;
        return;
      }

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        isAnimating = false;
      }
    };

    requestAnimationFrame(animation);
  };

  const [isScrollLocked, setIsScrollLocked] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".snap-y");
    if (!container) return;

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
          smoothScroll(
            container,
            container.scrollTop + window.innerHeight * direction
          );
          setTimeout(() => setIsScrollLocked(false), 1000);
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
    let lastDirection = 0;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    const handleTouchStart = (e: Event) => {
      if (isScrollLocked) {
        e.preventDefault();
        return;
      }
      const touchEvent = e as TouchEvent;
      touchStartY = touchEvent.touches[0].clientY;
      touchStartTime = performance.now();
      lastDirection = 0;
    };

    const handleTouchMove = (e: Event) => {
      if (isScrollLocked) {
        e.preventDefault();
        return;
      }

      const touchEvent = e as TouchEvent;
      const currentY = touchEvent.touches[0].clientY;
      const deltaY = currentY - touchStartY;
      const swipeTime = performance.now() - touchStartTime;

      // Determine scroll direction
      const currentDirection = Math.sign(deltaY);

      // If direction changed during swipe, prevent scroll
      if (lastDirection !== 0 && currentDirection !== lastDirection) {
        e.preventDefault();
        return;
      }

      lastDirection = currentDirection;

      // Only allow scroll if swipe is decisive and quick
      if (Math.abs(deltaY) >= minSwipeDistance && swipeTime <= maxSwipeTime) {
        e.preventDefault();
        setIsScrollLocked(true);
        const direction = deltaY > 0 ? -1 : 1;

        if (container) {
          smoothScroll(
            container,
            container.scrollTop + window.innerHeight * direction
          );
        }

        // Release scroll lock after animation
        setTimeout(() => setIsScrollLocked(false), 1000);
      }
    };

    const handleTouchEnd = () => {
      lastDirection = 0;
    };

    // Handle mouse wheel scrolling
    const handleWheel = (e: Event) => {
      e.preventDefault();

      if (isScrollLocked) return;

      const wheelEvent = e as WheelEvent;
      // Only care about the direction, not the intensity
      const direction = Math.sign(wheelEvent.deltaY);

      if (direction !== 0) {
        setIsScrollLocked(true);
        // Simply pass the current scroll position plus/minus one viewport height
        // smoothScroll will handle constraining to adjacent section
        smoothScroll(
          container,
          container.scrollTop + window.innerHeight * direction
        );
        setTimeout(() => setIsScrollLocked(false), 800); // Slightly reduced for better responsiveness
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

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
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
