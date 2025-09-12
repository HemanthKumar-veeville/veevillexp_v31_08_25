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
    duration: number = 800
  ) => {
    const start = element.scrollTop;
    const windowHeight = window.innerHeight;
    const maxScroll = element.scrollHeight - windowHeight;

    // Get current section based on scroll position
    const currentSection = Math.round(start / windowHeight);

    // Calculate target section based on scroll position
    const targetSection = Math.round(target / windowHeight);

    // Only allow scrolling to adjacent sections
    if (Math.abs(targetSection - currentSection) > 1) {
      const direction = targetSection > currentSection ? 1 : -1;
      target = (currentSection + direction) * windowHeight;
    }

    // Constrain target within bounds
    const constrainedTarget = Math.max(0, Math.min(target, maxScroll));

    // If we're already at the target section or at bounds, don't scroll
    if (
      start === constrainedTarget ||
      constrainedTarget < 0 ||
      constrainedTarget > maxScroll
    ) {
      return;
    }

    const distance = constrainedTarget - start;
    const startTime = performance.now();

    // Desktop easing function (cubic)
    const easeOutCubic = (t: number) => {
      const p = 1 - t;
      return 1 - p * p * p;
    };

    let isAnimating = true;

    const animation = (currentTime: number) => {
      if (!isAnimating) return;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeOutCubic(progress);

      const newScrollTop = start + distance * easeProgress;
      const finalScrollTop = Math.max(
        0,
        Math.min(newScrollTop, element.scrollHeight - windowHeight)
      );

      element.scrollTop = finalScrollTop;

      // Snap to target when very close
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
    let touchStartX = 0;
    let touchStartTime = 0;
    let lastDirection = 0;
    let isSwiping = false;
    const minSwipeDistance = 60; // Increased threshold for more intentional swipes
    const maxSwipeTime = 400; // Increased time window for more natural swipes
    const directionLockThreshold = 10; // Threshold to determine vertical vs horizontal swipe

    const handleTouchStart = (e: Event) => {
      if (isScrollLocked) {
        e.preventDefault();
        return;
      }
      const touchEvent = e as TouchEvent;
      touchStartY = touchEvent.touches[0].clientY;
      touchStartX = touchEvent.touches[0].clientX;
      touchStartTime = performance.now();
      lastDirection = 0;
      isSwiping = false;
    };

    const handleTouchMove = (e: Event) => {
      if (isScrollLocked) {
        e.preventDefault();
        return;
      }

      const touchEvent = e as TouchEvent;
      const currentY = touchEvent.touches[0].clientY;
      const currentX = touchEvent.touches[0].clientX;
      const deltaY = currentY - touchStartY;
      const deltaX = currentX - touchStartX;
      const swipeTime = performance.now() - touchStartTime;

      // Determine if the swipe is more horizontal than vertical
      if (
        !isSwiping &&
        Math.abs(deltaX) > Math.abs(deltaY) &&
        Math.abs(deltaX) > directionLockThreshold
      ) {
        return; // Let horizontal scrolls pass through
      }

      // Lock into vertical scrolling
      if (!isSwiping && Math.abs(deltaY) > directionLockThreshold) {
        isSwiping = true;
      }

      if (isSwiping) {
        e.preventDefault();

        // Determine scroll direction
        const currentDirection = Math.sign(deltaY);

        // If direction changed during swipe, ignore this movement
        if (lastDirection !== 0 && currentDirection !== lastDirection) {
          return;
        }

        lastDirection = currentDirection;

        // Calculate swipe intensity based on distance and time
        const swipeIntensity = Math.abs(deltaY) / swipeTime;

        // Only trigger scroll if swipe is decisive and within time window
        if (Math.abs(deltaY) >= minSwipeDistance && swipeTime <= maxSwipeTime) {
          setIsScrollLocked(true);
          const direction = deltaY > 0 ? -1 : 1;

          if (container) {
            // Calculate target based on current scroll position
            const currentScroll = container.scrollTop;
            const targetScroll = currentScroll + window.innerHeight * direction;

            smoothScroll(container, targetScroll);
          }

          // Release scroll lock after animation completes
          setTimeout(() => setIsScrollLocked(false), 1000);
        }
      }
    };

    const handleTouchEnd = () => {
      lastDirection = 0;
      isSwiping = false;
    };

    // Handle mouse wheel scrolling
    const handleWheel = (e: Event) => {
      e.preventDefault();

      if (isScrollLocked) return;

      const wheelEvent = e as WheelEvent;
      const isTouchPad = Math.abs(wheelEvent.deltaY) < 50;

      const direction = Math.sign(wheelEvent.deltaY);
      if (direction !== 0) {
        setIsScrollLocked(true);

        // Calculate target based on current scroll position
        const currentScroll = container.scrollTop;
        const targetScroll = currentScroll + window.innerHeight * direction;

        smoothScroll(
          container,
          targetScroll,
          isTouchPad ? 800 : 600 // Slower for touchpad, faster for mouse wheel
        );

        setTimeout(() => setIsScrollLocked(false), isTouchPad ? 1000 : 800);
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
