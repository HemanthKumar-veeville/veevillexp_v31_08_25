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

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {/* Mobile Section - Completely Separate */}
      <section className="w-full px-4 sm:px-6 relative max-w-[1280px] mx-auto py-4 sm:py-6 flex flex-col items-start justify-center lg:hidden">
        <div className="w-full mx-auto relative">
          {/* Title - Mobile */}
          <div className="mb-6 sm:mb-8">
            <UpdatedHeadingTablet className="text-left">
              The premise of play
            </UpdatedHeadingTablet>
          </div>

          {/* Embla Carousel Container */}
          <div
            className="embla overflow-hidden focus:outline-none"
            ref={emblaRef}
            tabIndex={0}
            role="region"
            aria-label="Methodology carousel"
          >
            <div className="embla__container flex">
              {methodologyData.map((item, index) => (
                <div
                  key={index}
                  className="embla__slide flex-[0_0_90%] min-w-0 pl-4 w-[65dvw] sm:w-[70dvw] md:w-[80dvw]"
                >
                  <div className="relative flex flex-col items-start justify-center gap-2 sm:gap-4 md:gap-6 bg-white rounded-lg p-4 shadow-sm h-[65dvh] sm:h-[70dvh] md:h-[75dvh]  border border-gray-200">
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
                      <MobileMethodologyDescription className="max-w-[280px] sm:max-w-[320px] md:max-w-[380px]">
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
                      </MobileMethodologyDescription>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Section - Completely Separate and Untouched */}
      <section className="hidden lg:w-full lg:px-14 lg:relative lg:max-w-[1280px] lg:mx-auto lg:pt-[90px] lg:py-auto lg:flex lg:flex-col lg:items-start lg:justify-center">
        <div className="w-full mx-auto relative">
          {/* Title */}
          <UpdatedHeading className="mb-[-64px]">
            The premise of play
          </UpdatedHeading>

          {/* Methodology Items */}
          <div className="relative w-full h-[700px]">
            {/* Item 1 - Zero Slide-decks */}
            <div className="absolute inset-[12%_69%_66.21%_0.26%]">
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
            <div className="absolute inset-[12%_34.1%_66.21%_35.16%]">
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
            <div className="absolute inset-[12%_1.86%_66.21%_67.4%]">
              <LargeNumber className="mb-2">03</LargeNumber>
              <Heading3 className="mb-8">100% surprises</Heading3>
              <UpdatedMethodologyDescription className="max-w-[236px]">
                When did you last leave a workshop talking about it for weeks?
                We design moments that delight and memories that matter.
              </UpdatedMethodologyDescription>
            </div>

            {/* Images */}
            {/* Image for Item 1 - Zero Slide-decks */}
            <div className="absolute left-[8rem] bottom-[6rem] w-[250px] h-[237px]">
              <img
                className="block w-full h-full object-contain"
                alt="Methodology illustration 1"
                src="/img/group-1000001873.png"
              />
            </div>
            {/* Image for Item 2 - Zero Jargon */}
            <div className="absolute left-[32rem] bottom-[6rem] w-[253px] h-[213px]">
              <img
                className="block w-full h-full object-contain"
                alt="Methodology illustration 2"
                src="/img/group-1000001874.png"
              />
            </div>
            {/* Image for Item 3 - 100% Surprises */}
            <div className="absolute left-[58rem] bottom-[6rem] w-[247px] h-[273px]">
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
