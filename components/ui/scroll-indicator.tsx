import React, { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  sections: string[];
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  sections,
}) => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".snap-y");
      if (!container) return;

      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.round(scrollTop / windowHeight);

      setCurrentSection(
        Math.max(0, Math.min(sectionIndex, sections.length - 1))
      );
    };

    const container = document.querySelector(".snap-y");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [sections.length]);

  const smoothScroll = (
    element: Element,
    target: number,
    duration: number = 800
  ) => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const actualDuration = isMobile ? 450 : duration;

    const start = element.scrollTop;
    const distance = target - start;
    const startTime = performance.now();

    // Enhanced easing function for mobile
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

  const scrollToSection = (index: number) => {
    const container = document.querySelector(".snap-y");
    if (container) {
      smoothScroll(container, index * window.innerHeight);
    }
  };

  return null;
};
