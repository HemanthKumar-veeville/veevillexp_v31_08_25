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

export default function Veevillexp() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
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
    if (isScrollLocked) return; // Prevent multiple scroll animations
    setIsScrollLocked(true);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const actualDuration = isMobile ? 600 : duration; // Increased mobile duration for smoother scroll

    const start = element.scrollTop;
    const windowHeight = window.innerHeight;

    // Ensure we only move one section at a time
    const currentSection = Math.floor(start / windowHeight);
    const targetSection = Math.floor(target / windowHeight);
    const direction = targetSection > currentSection ? 1 : -1;

    // Only allow moving to adjacent section
    const nextSection = currentSection + direction;
    const constrainedTarget = nextSection * windowHeight;

    const distance = constrainedTarget - start;
    const startTime = performance.now();

    // Enhanced easing function for smoother movement
    const easeOutCubic = (t: number) => {
      const t1 = t - 1;
      return t1 * t1 * t1 + 1;
    };

    let lastTimestamp = startTime;
    let lastPosition = start;

    const animation = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / actualDuration, 1);
      const easeProgress = easeOutCubic(progress);

      const newScrollTop = start + distance * easeProgress;

      // Prevent overshooting
      if (
        (direction > 0 && newScrollTop > constrainedTarget) ||
        (direction < 0 && newScrollTop < constrainedTarget)
      ) {
        element.scrollTop = constrainedTarget;
        setIsScrollLocked(false);
        return;
      }

      element.scrollTop = newScrollTop;
      lastPosition = newScrollTop;

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        // Ensure we end exactly on a section boundary
        element.scrollTop = constrainedTarget;
        setIsScrollLocked(false);
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

    const touchRef = React.useRef({
      startY: 0,
      startTime: 0,
      lastScrollTime: 0,
      lastDirection: 0,
      consecutiveScrolls: 0,
    });

    const scrollCooldown = 1000; // Increased cooldown between scroll actions

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent;
      touchRef.current = {
        ...touchRef.current,
        startY: touchEvent.touches[0].clientY,
        startTime: performance.now(),
        consecutiveScrolls: 0,
      };
    };

    const handleTouchMove = (e: Event) => {
      if (isScrollLocked) {
        e.preventDefault();
        return;
      }

      const now = performance.now();
      const timeSinceStart = now - touchRef.current.startTime;

      // Prevent scroll if too soon after last scroll
      if (now - touchRef.current.lastScrollTime < scrollCooldown) {
        e.preventDefault();
        return;
      }

      const touchEvent = e as TouchEvent;
      const currentY = touchEvent.touches[0].clientY;
      const deltaY = currentY - touchRef.current.startY;
      const velocity = Math.abs(deltaY) / timeSinceStart;

      // Determine scroll direction
      const direction = deltaY > 0 ? -1 : 1;

      // Only scroll if movement is significant and not too fast
      if (Math.abs(deltaY) > 50 && velocity < 2.5) {
        // Check if trying to scroll in opposite direction too quickly
        if (
          direction !== touchRef.current.lastDirection &&
          now - touchRef.current.lastScrollTime < scrollCooldown * 1.5
        ) {
          e.preventDefault();
          return;
        }

        // Prevent rapid consecutive scrolls in same direction
        if (direction === touchRef.current.lastDirection) {
          touchRef.current.consecutiveScrolls++;
          if (touchRef.current.consecutiveScrolls > 2) {
            e.preventDefault();
            return;
          }
        }

        touchRef.current = {
          ...touchRef.current,
          lastScrollTime: now,
          lastDirection: direction,
        };

        if (container) {
          smoothScroll(
            container,
            container.scrollTop + window.innerHeight * direction
          );
        }

        e.preventDefault();
        touchRef.current.startY = currentY; // Reset touch start for next movement
      }
    };

    const handleTouchEnd = () => {
      const now = performance.now();
      const timeSinceStart = now - touchRef.current.startTime;

      // If the touch ended very quickly, it might be a flick/swipe
      // In this case, we want to ensure the scroll completes properly
      if (timeSinceStart < 300) {
        setTimeout(() => {
          setIsScrollLocked(false);
        }, 500);
      } else {
        setIsScrollLocked(false);
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    // Cleanup event listeners
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
