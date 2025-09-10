import React, { useState, useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  LargeNumber,
  Heading3,
  MobileMethodologyDescription,
  MobileMethodologyTitle,
  UpdatedHeading,
  UpdatedMethodologyDescription,
  UpdatedHeadingMobile,
  UpdatedHeadingTablet,
  UpdatedDescriptionTablet,
} from "@/components/ui/typography";

const methodologyData = [
  {
    number: "01",
    title: "Zero Slide-decks",
    description:
      "Seriously, haven't you seen them all already?\n\nWe believe in experiences that stick, not slides that slip away.",
    image: "/img/group-1000001873.png",
    imageAlt: "Group",
  },
  {
    number: "02",
    title: "Zero Jargon",
    description:
      '"We must synergize holistic paradigms to leverage scalable ecosystems."\n\nYeah. That made no sense to us either.',
    image: "/img/group-1000001874.png",
    imageAlt: "Group",
  },
  {
    number: "03",
    title: "100% Surprises",
    description:
      "When did you last leave a workshop talking about it for weeks? We design moments that delight and memories that matter.",
    image: "/img/group-1000001875.png",
    imageAlt: "Group",
  },
];

export const MethodologySection = (): React.JSX.Element => {
  const [showSlideBadge, setShowSlideBadge] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const desktopSectionRef = useRef<HTMLElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
    inViewThreshold: 0.7,
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  // Handle user interaction to hide badge
  const handleUserInteraction = React.useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowSlideBadge(false);
    }
  }, [hasInteracted]);

  // Intersection Observer to show badge when component comes into view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasInteracted) {
            setShowSlideBadge(true);
            // Auto-hide after 3 seconds if no interaction
            setTimeout(() => {
              if (!hasInteracted) {
                setShowSlideBadge(false);
              }
            }, 3000);
          }
        });
      },
      {
        threshold: 0.3,
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
  }, [hasInteracted]);

  // Intersection Observer for desktop section animations
  React.useEffect(() => {
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

    if (desktopSectionRef.current) {
      observer.observe(desktopSectionRef.current);
    }

    return () => {
      if (desktopSectionRef.current) {
        observer.unobserve(desktopSectionRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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

  return (
    <>
      {/* Mobile Section - Completely Separate */}
      <section
        ref={sectionRef}
        className="w-full px-4 sm:px-6 relative max-w-[1280px] mx-auto py-4 sm:py-6 flex flex-col items-start justify-center lg:hidden"
      >
        <div className="w-full mx-auto relative">
          {/* Title - Mobile */}
          <div className="mb-6 sm:mb-8">
            <UpdatedHeadingTablet className="text-left">
              The premise of play
            </UpdatedHeadingTablet>
          </div>

          {/* Slide Me Badge */}
          {showSlideBadge && (
            <div className="absolute top-20 right-4 z-50 animate-bounce">
              <div className="bg-[#1c1c1c] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-helvetica font-medium border border-[#e5e5e5]">
                <svg
                  className="w-4 h-4 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                Slide Me
                <svg
                  className="w-4 h-4 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Embla Carousel Container */}
          <div
            className="embla overflow-hidden focus:outline-none"
            ref={emblaRef}
            tabIndex={0}
            role="region"
            aria-label="Methodology carousel"
            onTouchStart={handleUserInteraction}
            onMouseDown={handleUserInteraction}
            onKeyDown={handleUserInteraction}
          >
            <div className="embla__container flex">
              {methodologyData.map((item, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_90%] min-w-0 pl-4 w-[65dvw] sm:w-[70dvw] md:w-[80dvw]"
                >
                  <div className="relative flex flex-col items-start justify-center gap-2 sm:gap-4 md:gap-6 bg-white rounded-lg p-4 shadow-sm h-[64dvh] sm:h-[70dvh] md:h-[75dvh]  border border-gray-200">
                    <LargeNumber>{item.number}</LargeNumber>

                    <MobileMethodologyTitle className="text-left">
                      {item.title}
                    </MobileMethodologyTitle>

                    <img
                      className="w-auto h-[50%] object-contain"
                      alt={item.imageAlt}
                      src={item.image}
                    />

                    <div className="text-left mb-4">
                      <UpdatedDescriptionTablet className="max-w-[280px] sm:max-w-[320px] md:max-w-[380px]">
                        {item.description
                          .split("\n\n")
                          .map((paragraph, pIndex) => (
                            <React.Fragment key={pIndex}>
                              {paragraph}
                              {pIndex <
                                item.description.split("\n\n").length - 1 && (
                                <>
                                  <br />
                                  <br />
                                </>
                              )}
                            </React.Fragment>
                          ))}
                      </UpdatedDescriptionTablet>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Section - Completely Separate and Untouched */}
      <section 
        ref={desktopSectionRef}
        className="hidden lg:w-full lg:px-14 lg:relative lg:max-w-[1280px] lg:mx-auto lg:pt-[90px] lg:py-auto lg:flex lg:flex-col lg:items-start lg:justify-center"
      >
        <div className="w-full mx-auto relative">
          {/* Title */}
          <UpdatedHeading 
            className={`mb-[-64px] transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-[-30px]"
            }`}
            style={isVisible ? { transitionDelay: "200ms" } : { transitionDelay: "0ms" }}
          >
            The premise of play
          </UpdatedHeading>

          {/* Methodology Items */}
          <div className="relative w-full h-[700px]">
            {/* Item 1 - Zero Slide-decks */}
            <div 
              className={`absolute inset-[12%_69%_66.21%_0.26%] ${getAnimationClasses(0)}`}
              style={getAnimationDelay(0)}
            >
              <LargeNumber className="mb-2">01</LargeNumber>
              <Heading3 className="mb-8">Zero slide-decks</Heading3>
              <UpdatedMethodologyDescription className="max-w-[255px]">
                Seriously, haven't you seen them all already?
                <br />
                <br />
                We believe in experiences that stick, not slides that <br />
                slip away.
              </UpdatedMethodologyDescription>
            </div>

            {/* Item 2 - Zero Jargon */}
            <div 
              className={`absolute inset-[12%_34.1%_66.21%_35.16%] ${getAnimationClasses(1)}`}
              style={getAnimationDelay(1)}
            >
              <LargeNumber className="mb-2">02</LargeNumber>
              <Heading3 className="mb-8">Zero jargon</Heading3>
              <UpdatedMethodologyDescription className="max-w-[236px]">
                "We must synergize holistic paradigms to leverage scalable
                ecosystems."
                <br />
                <br />
                Yeah. That made no sense to us either.
              </UpdatedMethodologyDescription>
            </div>

            {/* Item 3 - 100% Surprises */}
            <div 
              className={`absolute inset-[12%_1.86%_66.21%_67.4%] ${getAnimationClasses(2)}`}
              style={getAnimationDelay(2)}
            >
              <LargeNumber className="mb-2">03</LargeNumber>
              <Heading3 className="mb-8">100% surprises</Heading3>
              <UpdatedMethodologyDescription className="max-w-[236px]">
                When did you last leave a workshop talking about it for weeks?
                We design moments that delight and memories that matter.
              </UpdatedMethodologyDescription>
            </div>

            {/* Images */}
            {/* Image for Item 1 - Zero Slide-decks */}
            <div 
              className={`absolute left-[8rem] bottom-[6rem] w-[250px] h-[237px] ${getAnimationClasses(0)}`}
              style={getAnimationDelay(0)}
            >
              <img
                className="block w-full h-full object-contain"
                alt="Methodology illustration 1"
                src="/img/group-1000001873.png"
              />
            </div>
            {/* Image for Item 2 - Zero Jargon */}
            <div 
              className={`absolute left-[32rem] bottom-[6rem] w-[253px] h-[213px] ${getAnimationClasses(1)}`}
              style={getAnimationDelay(1)}
            >
              <img
                className="block w-full h-full object-contain"
                alt="Methodology illustration 2"
                src="/img/group-1000001874.png"
              />
            </div>
            {/* Image for Item 3 - 100% Surprises */}
            <div 
              className={`absolute left-[58rem] bottom-[6rem] w-[247px] h-[273px] ${getAnimationClasses(2)}`}
              style={getAnimationDelay(2)}
            >
              <img
                className="block w-full h-full object-contain mt-[32px]"
                alt="Methodology illustration 3"
                src="/img/group-1000001875.png"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
