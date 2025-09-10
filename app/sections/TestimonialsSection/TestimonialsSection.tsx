import React from "react";
import Marquee from "react-fast-marquee";
import {
  ContactInfo,
  UpdatedHeading,
  UpdatedDescription,
  UpdatedHeadingTablet,
  UpdatedDescriptionTablet,
} from "@/components/ui/typography";
import { useSectionAnimation } from "@/lib/useSectionAnimation";

export const TestimonialsSection = (): React.JSX.Element => {
  const { sectionRef, getAnimationClasses, getAnimationDelay, getTitleAnimationClasses, getTitleAnimationDelay } = useSectionAnimation();
  
  // All logos for marquee - duplicated for seamless loop
  const allLogos = [
    {
      src: "/img/group-5.png",
      alt: "Company logo 1",
      className: "w-[120px] sm:w-[154px] h-auto",
    },
    {
      src: "/img/group-6.png",
      alt: "Company logo 2",
      className: "w-[70px] sm:w-[85px] h-auto",
    },
    {
      src: "/img/group-4.png",
      alt: "Company logo 3",
      className: "w-[140px] sm:w-[177px] h-auto",
    },
    {
      src: "/img/vector-17.svg",
      alt: "Vector logo",
      className: "w-[60px] sm:w-[75px] h-auto",
    },
    {
      src: "/img/group-3.png",
      alt: "Group logo",
      className: "w-[80px] sm:w-24 h-auto",
    },
  ];

  // Duplicate logos for seamless marquee effect
  const duplicatedLogos = [...allLogos, ...allLogos, ...allLogos];

  return (
    <>
      {/* Mobile Layout (visible only on mobile and tablet up to lg) */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-start justify-start h-[100dvh] min-h-[100dvh] overflow-hidden">
        {/* 40% - Heading and Description Section */}
        <div className="w-full h-[40dvh] flex flex-col justify-center space-y-4 sm:space-y-6">
          <div className="text-left">
            <UpdatedHeadingTablet className="mb-4 sm:mb-6">
              Ready to rediscover wonder?
            </UpdatedHeadingTablet>

            <UpdatedDescriptionTablet className="leading-relaxed mb-4 sm:mb-6">
              Let&apos;s explore how your team can achieve extraordinary results
              through extraordinary experiences
            </UpdatedDescriptionTablet>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative w-[20px] h-[16px] sm:w-[26px] sm:h-[21px]">
                <img
                  className="absolute w-[20px] h-2 sm:w-[26px] sm:h-3 top-0 left-0"
                  alt="Vector"
                  src="/img/vector-13.svg"
                />
                <img
                  className="absolute w-5 h-[16px] sm:w-6 sm:h-[21px] top-0 left-px"
                  alt="Vector"
                  src="/img/vector-14.svg"
                />
                <img
                  className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 top-[8px] sm:top-[11px] left-[2px] sm:left-[3px]"
                  alt="Vector"
                  src="/img/vector-15.svg"
                />
                <img
                  className="absolute w-2 h-[8px] sm:w-2.5 sm:h-[11px] top-2 sm:top-2.5 left-3 sm:left-4"
                  alt="Vector"
                  src="/img/vector-16.svg"
                />
              </div>
              <ContactInfo className="text-sm sm:text-base md:text-lg">
                experiences@veeville.com
              </ContactInfo>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <img
                className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]"
                alt="Website icon"
                src="/img/group-1000001863.png"
              />
              <ContactInfo className="text-sm sm:text-base md:text-lg">
                veevillexp.com
              </ContactInfo>
            </div>
          </div>
        </div>

        {/* 20% - Dual Marquee Logos Section */}
        <div className="w-full h-[20dvh] flex flex-col justify-center space-y-2 sm:space-y-4">
          {/* First Row: Logos moving left to right */}
          <div className="h-[45%] flex items-center">
            <Marquee
              direction="left"
              speed={30}
              pauseOnHover={true}
              gradient={false}
              className="h-full marquee-container"
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`left-${index}`}
                  className="flex items-center justify-center mx-4 sm:mx-6"
                >
                  <img
                    className={`${logo.className} max-h-[50px] sm:max-h-[60px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300`}
                    alt={logo.alt}
                    src={logo.src}
                  />
                </div>
              ))}
            </Marquee>
          </div>

          {/* Second Row: Logos moving right to left */}
          <div className="h-[45%] flex items-center">
            <Marquee
              direction="right"
              speed={35}
              pauseOnHover={true}
              gradient={false}
              className="h-full marquee-container"
            >
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`right-${index}`}
                  className="flex items-center justify-center mx-4 sm:mx-6"
                >
                  <img
                    className={`${logo.className} max-h-[50px] sm:max-h-[60px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300`}
                    alt={logo.alt}
                    src={logo.src}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* 40% - Image Section (positioned at bottom edge) */}
        <div className="w-full h-fit flex items-end justify-center relative">
          <img
            className="w-auto h-[40dvh] max-w-[110%] object-contain"
            alt="Testimonials"
            src="/img/group-1000001887.png"
          />
        </div>
      </div>

      {/* Desktop Layout (visible only on lg and up) - Completely unchanged */}
      <section ref={sectionRef} className="hidden lg:flex w-full relative pt-16 px-10 lg:px-14 max-w-[1280px] mx-auto overflow-hidden py-auto flex-col items-start justify-start">
        <div className="">
          <div 
            className={`text-left mb-2 ${getTitleAnimationClasses()}`}
            style={getTitleAnimationDelay()}
          >
            <UpdatedHeading className="mb-8">
              Ready to rediscover wonder?
            </UpdatedHeading>

            <UpdatedDescription className="leading-relaxed">
              Let&apos;s explore how your team can achieve extraordinary results
              through extraordinary experiences
            </UpdatedDescription>
          </div>
          <div 
            className={`flex flex-col items-start gap-1 mb-2 ${getAnimationClasses(0)}`}
            style={getAnimationDelay(0)}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-[26px] h-[21px]">
                <img
                  className="absolute w-[26px] h-3 top-0 left-0"
                  alt="Vector"
                  src="/img/vector-13.svg"
                />
                <img
                  className="absolute w-6 h-[21px] top-0 left-px"
                  alt="Vector"
                  src="/img/vector-14.svg"
                />
                <img
                  className="absolute w-2.5 h-2.5 top-[11px] left-[3px]"
                  alt="Vector"
                  src="/img/vector-15.svg"
                />
                <img
                  className="absolute w-2.5 h-[11px] top-2.5 left-4"
                  alt="Vector"
                  src="/img/vector-16.svg"
                />
              </div>
              <ContactInfo className="text-lg">
                experiences@veeville.com
              </ContactInfo>
            </div>

            <div className="flex items-center gap-3">
              <img
                className="w-[25px] h-[25px]"
                alt="Website icon"
                src="/img/group-1000001863.png"
              />
              <ContactInfo className="text-lg">veevillexp.com</ContactInfo>
            </div>
          </div>
          {/* Desktop Layout - All logos in single row */}
          <div 
            className={`flex flex-row flex-wrap gap-16 mb-8 justify-start items-center ${getAnimationClasses(1)}`}
            style={getAnimationDelay(1)}
          >
            {allLogos.map((logo, index) => (
              <img
                key={`company-logo-desktop-${index}`}
                className={logo.className}
                alt={logo.alt}
                src={logo.src}
              />
            ))}
          </div>

          <div 
            className={`w-full max-w-[80rem] h-auto absolute bottom-[-4.5rem] left-1/2 -translate-x-1/2 ${getAnimationClasses(2)}`}
            style={getAnimationDelay(2)}
          >
            <img
              className="w-full h-auto"
              alt="Testimonials"
              src="/img/group-1000001887.png"
            />
          </div>
        </div>
      </section>
    </>
  );
};
