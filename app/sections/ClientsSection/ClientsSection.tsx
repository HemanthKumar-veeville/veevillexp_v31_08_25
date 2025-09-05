import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import {
  Heading1,
  QuoteText,
  AuthorName,
  CompanyInfo,
  UpdatedHeading,
  UpdatedDescription,
  UpdatedHeadingMobile,
  UpdatedHeadingTablet,
} from "@/components/ui/typography";

const testimonialsData = [
  {
    quote:
      "The program focused on the business as a whole and not just leaders as individuals. It encouraged problem-solving, task breakdown, and responsibility sharing in a way that was practical, relatable, and enjoyable. It was a lot of fun and I'll remember this wherever I go!",
    title: "VP and Head",
    subtitle: "Global IT Services- India Centre",
    company: "at a 30 Bn dollar MNC",
    companyNote:
      "(which could claim an instantaneous ROI on the intervention!)",
  },
  {
    quote:
      "No Classroom training. No models. No theory. No jargon. The people bonded, did interesting and new things together. They have taken learnings that are immediately applicable to their work. All our objectives from this intervention were met. Actually, they were exceeded beyond expectation.",
    title: "HR Business Partner",
    subtitle: "",
    company: "at an 85 year old global organization",
    companyNote: "(which has seen it all over many, many years)",
  },
];

export const ClientsSection = (): React.JSX.Element => {
  const [showSlideBadge, setShowSlideBadge] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {/* Mobile/Tablet Section - Completely Separate */}
      <section
        ref={sectionRef}
        className="w-full px-4 sm:px-6 relative max-w-[1280px] mx-auto py-4 sm:py-6 flex flex-col items-start justify-center lg:hidden"
      >
        <div className="w-full mx-auto relative">
          {/* Title - Mobile/Tablet */}
          <div className="mb-6 sm:mb-8">
            <UpdatedHeadingTablet className="text-left">
              Testimonials
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
            aria-label="Testimonials carousel"
            onTouchStart={handleUserInteraction}
            onMouseDown={handleUserInteraction}
            onKeyDown={handleUserInteraction}
          >
            <div className="embla__container flex">
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_90%] min-w-0 pl-4 w-[65dvw] sm:w-[70dvw] md:w-[80dvw]"
                >
                  <div className="relative flex flex-col items-start justify-center gap-4 sm:gap-6 bg-white rounded-lg p-4 shadow-sm h-[40dvh] sm:h-[35dvh] md:h-[30dvh] border border-gray-200">
                    {/* Quote Text */}
                    <div className="text-left flex-1 overflow-y-auto">
                      <UpdatedDescription className="text-sm sm:text-base">
                        {testimonial.quote}
                      </UpdatedDescription>
                    </div>

                    {/* Author Info */}
                    <div className="space-y-2 text-left">
                      <AuthorName className="text-sm sm:text-base">
                        {testimonial.title}
                        {testimonial.subtitle && (
                          <>
                            <br />
                            {testimonial.subtitle}
                          </>
                        )}
                      </AuthorName>

                      <CompanyInfo className="text-xs sm:text-sm">
                        {testimonial.company}
                        <br />
                        {testimonial.companyNote}
                      </CompanyInfo>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image in second half vertically */}
          <div className="mt-8 flex justify-center">
            <img
              className="w-auto h-[30dvh] sm:h-[35dvh] md:h-[40dvh]  object-contain"
              alt="Group"
              src="/img/group-1000001858.png"
            />
          </div>
        </div>
      </section>

      {/* Desktop Section - Completely Separate and Untouched */}
      <section className="hidden lg:w-full lg:px-14 lg:relative lg:max-w-[1280px] lg:mx-auto lg:py-auto lg:flex lg:flex-col lg:items-start lg:justify-center">
        <div className="max-w-[1344px] mx-auto">
          {/* Desktop Heading */}
          <div className="block">
            <UpdatedHeading className="mb-8">Testimonials</UpdatedHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-12">
              {testimonialsData.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-none shadow-none bg-transparent"
                >
                  <CardContent className="p-0 space-y-6">
                    {/* Desktop Quote Text */}
                    <div className="block">
                      <UpdatedDescription>
                        {testimonial.quote}
                      </UpdatedDescription>
                    </div>

                    <div className="space-y-2">
                      {/* Desktop Author Info */}
                      <div className="block">
                        <AuthorName>
                          {testimonial.title}
                          {testimonial.subtitle && (
                            <>
                              <br />
                              {testimonial.subtitle}
                            </>
                          )}
                        </AuthorName>
                      </div>

                      {/* Desktop Company Info */}
                      <div className="block">
                        <CompanyInfo>
                          {testimonial.company}
                          <br />
                          {testimonial.companyNote}
                        </CompanyInfo>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex-shrink-0 flex items-end h-full">
              <img
                className="w-full h-auto max-w-[40rem] min-w-[39rem] object-contain md:mb-[-80px] lg:mb-[-100px]"
                alt="Group"
                src="/img/group-1000001858.png"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
