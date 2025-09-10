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
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

export default function Veevillexp(): React.ReactNode {
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
    const actualDuration = isMobile ? 450 : duration; // Faster on mobile for responsiveness

    const start = element.scrollTop;
    const distance = target - start;
    const startTime = performance.now();

    // Enhanced mobile easing with momentum
    const easeOutExpo = (t: number) => {
      return isMobile
        ? t === 1
          ? 1
          : 1 - Math.pow(2, -10 * t) // Exponential ease out for mobile
        : t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t; // Original desktop easing
    };

    let lastTimestamp = startTime;
    let lastScrollTop = start;
    let velocity = 0;

    const animation = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const deltaTime = currentTime - lastTimestamp;
      const progress = Math.min(timeElapsed / actualDuration, 1);
      const easeProgress = easeOutExpo(progress);

      const newScrollTop = start + distance * easeProgress;

      // Calculate and apply velocity for momentum
      if (deltaTime > 0) {
        velocity = (newScrollTop - lastScrollTop) / deltaTime;
        lastScrollTop = newScrollTop;
        lastTimestamp = currentTime;
      }

      element.scrollTop = newScrollTop;

      if (timeElapsed < actualDuration) {
        requestAnimationFrame(animation);
      } else if (isMobile && Math.abs(velocity) > 0.1) {
        // Apply momentum deceleration
        const deceleration = 0.95;
        velocity *= deceleration;
        element.scrollTop += velocity;
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    const container = document.querySelector(".snap-y");
    if (!container) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          smoothScroll(container, container.scrollTop + window.innerHeight);
          break;
        case "ArrowUp":
          event.preventDefault();
          smoothScroll(container, container.scrollTop - window.innerHeight);
          break;
        case "Home":
          event.preventDefault();
          smoothScroll(container, 0);
          break;
        case "End":
          event.preventDefault();
          smoothScroll(container, container.scrollHeight);
          break;
      }
    };

    let touchStartY = 0;
    let touchEndY = 0;
    let lastScrollTime = 0;

    let touchStartTime = 0;
    let lastTouchY = 0;
    let touchVelocity = 0;

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent;
      touchStartY = touchEvent.touches[0].clientY;
      lastTouchY = touchStartY;
      touchStartTime = performance.now();
      touchVelocity = 0;
    };

    const handleTouchMove = (e: Event) => {
      const touchEvent = e as TouchEvent;
      const currentY = touchEvent.touches[0].clientY;
      const deltaY = currentY - lastTouchY;
      const deltaTime = performance.now() - touchStartTime;

      // Calculate velocity (pixels per millisecond)
      if (deltaTime > 0) {
        touchVelocity = deltaY / deltaTime;
      }

      touchEndY = currentY;
      lastTouchY = currentY;
    };

    const handleTouchEnd = () => {
      const now = performance.now();
      const timeDiff = now - lastScrollTime;
      const swipeDuration = now - touchStartTime;

      // Prevent rapid consecutive scrolls but allow quick flicks
      if (timeDiff < 300 && Math.abs(touchVelocity) < 0.5) return;

      const touchDiff = touchStartY - touchEndY;
      const threshold = swipeDuration < 300 ? 30 : 50; // Lower threshold for quick swipes

      if (Math.abs(touchDiff) > threshold || Math.abs(touchVelocity) > 0.5) {
        const direction = touchDiff > 0 ? 1 : -1;
        const velocityFactor = Math.min(
          Math.abs(touchVelocity * 1000),
          window.innerHeight / 2
        );
        const baseScroll = container.scrollTop + direction * window.innerHeight;
        const momentumScroll = baseScroll + direction * velocityFactor;

        // Use velocity to determine scroll duration
        const scrollDuration = Math.max(
          450,
          800 - Math.abs(touchVelocity * 500)
        );

        smoothScroll(container, momentumScroll, scrollDuration);
        lastScrollTime = now;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
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

      <ScrollIndicator sections={sections} />

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
