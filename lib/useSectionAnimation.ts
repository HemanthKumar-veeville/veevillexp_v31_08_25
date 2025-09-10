import { useState, useRef, useEffect } from "react";

export const useSectionAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section is entering view - start animations
            setIsVisible(true);
          } else {
            // Section is leaving view - reset animations instantly
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation classes for sequential animation
  const getAnimationClasses = (index: number) => {
    if (!isVisible) {
      // Complete blank state - no transition
      return "opacity-0 translate-y-[-60px] scale-90";
    }
    // Ultra-slow, ultra-smooth animation when visible
    return "transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 translate-y-0 scale-100";
  };

  const getAnimationDelay = (index: number) => {
    if (!isVisible) {
      // No delay when resetting
      return {
        transitionDelay: "0ms",
      };
    }
    // Much longer staggered delay for ultra-smooth sequential effect
    return {
      transitionDelay: `${index * 600}ms`,
    };
  };

  // Title animation classes
  const getTitleAnimationClasses = () => {
    if (!isVisible) {
      return "opacity-0 translate-y-[-30px]";
    }
    return "transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 translate-y-0";
  };

  const getTitleAnimationDelay = () => {
    if (!isVisible) {
      return { transitionDelay: "0ms" };
    }
    return { transitionDelay: "200ms" };
  };

  return {
    isVisible,
    sectionRef,
    getAnimationClasses,
    getAnimationDelay,
    getTitleAnimationClasses,
    getTitleAnimationDelay,
  };
};
