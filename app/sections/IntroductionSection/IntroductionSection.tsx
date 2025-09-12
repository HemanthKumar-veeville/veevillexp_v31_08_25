import React from "react";
import {
  Heading1,
  BodyLight,
  BrandLabel,
  MethodologyDescription,
  UpdatedHeading,
  UpdatedDescription,
  UpdatedHeadingTablet,
  UpdatedDescriptionTablet,
} from "@/components/ui/typography";
import { useSectionAnimation } from "@/lib/useSectionAnimation";

export const IntroductionSection = (): React.JSX.Element => {
  const {
    sectionRef,
    getAnimationClasses,
    getAnimationDelay,
    getTitleAnimationClasses,
    getTitleAnimationDelay,
  } = useSectionAnimation();
  const categories = [
    {
      label: "Leadership",
      icon: "/img/vector-40.svg",
    },
    {
      label: "Management",
      icon: "/img/vector-40.svg",
    },
    {
      label: "Teams",
      icon: "/img/vector-40.svg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center items-center"
    >
      {/* Mobile Layout (visible only on mobile and tablet up to lg) */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-start justify-center h-[100dvh] min-h-[100dvh] space-y-8 sm:space-y-10 md:space-y-12">
        {/* Main Heading - Mobile with tablet typography */}
        <div
          className={`text-left w-[300px] sm:w-[400px] md:w-[500px] ${getTitleAnimationClasses()}`}
          style={getTitleAnimationDelay()}
        >
          <UpdatedHeadingTablet>
            Crafted for the minds that matter
          </UpdatedHeadingTablet>
        </div>

        {/* Body Text - Mobile with tablet typography */}
        <div
          className={`text-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] ${getAnimationClasses(
            0
          )}`}
          style={getAnimationDelay(0)}
        >
          <UpdatedDescriptionTablet className="space-y-3">
            <p className="mb-0">
              We've got different tools in our box for all levels of the
              organization. Play should be for everyone.
            </p>
            <p className="mb-0">&nbsp;</p>
          </UpdatedDescriptionTablet>
        </div>

        {/* Categories - Mobile */}
        <div
          className={`flex flex-col gap-3 items-start justify-center ${getAnimationClasses(
            1
          )}`}
          style={getAnimationDelay(1)}
        >
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-center gap-2">
              <img
                className="w-[19px] h-[21px]"
                alt="Vector"
                src={category.icon}
              />
              <BrandLabel className="whitespace-nowrap">
                {category.label}
              </BrandLabel>
            </div>
          ))}
        </div>

        {/* Body Text - Mobile with tablet typography */}
        <div
          className={`text-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] ${getAnimationClasses(
            0
          )}`}
          style={getAnimationDelay(2)}
        >
          <UpdatedDescriptionTablet className="space-y-3">
            <p>
              Impactful implementations across companies of all sizes and
              industry verticals
            </p>
          </UpdatedDescriptionTablet>
        </div>

        {/* Image - Mobile */}
        <div
          className={`flex justify-center items-center ${getAnimationClasses(
            2
          )}`}
          style={getAnimationDelay(3)}
        >
          <img
            className="w-auto max-w-[90%] sm:max-w-[80%] md:max-w-[70%] h-auto object-contain"
            alt="Layer"
            src="/img/layer-1.png"
          />
        </div>
      </div>

      {/* Desktop Layout (visible only on lg and up) */}
      <div className="hidden lg:flex w-full max-w-[1280px] mx-auto lg:py-[90px] lg:flex-col lg:items-start lg:justify-center">
        <div className="grid grid-cols-1 lg:px-[52px]">
          <div className="flex-1">
            <UpdatedHeading
              className={`leading-tight mb-8 ${getTitleAnimationClasses()}`}
              style={{ lineHeight: "normal", ...getTitleAnimationDelay() }}
            >
              Crafted for the minds that matter
            </UpdatedHeading>

            <div className="space-y-8">
              <div
                className={`${getAnimationClasses(0)}`}
                style={getAnimationDelay(0)}
              >
                <UpdatedDescription>
                  We've got different tools in our box for all levels of the
                  organization. Play should be for everyone.
                </UpdatedDescription>
              </div>

              <div
                className={`flex gap-64 ${getAnimationClasses(1)}`}
                style={getAnimationDelay(1)}
              >
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <img
                      className="w-[19px] h-[21px]"
                      alt="Vector"
                      src={category.icon}
                    />
                    <BrandLabel className="whitespace-nowrap">
                      {category.label}
                    </BrandLabel>
                  </div>
                ))}
              </div>

              <div
                className={`${getAnimationClasses(2)}`}
                style={getAnimationDelay(2)}
              >
                <UpdatedDescription>
                  Impactful implementations across companies of all sizes and
                  industry verticals
                </UpdatedDescription>
              </div>
            </div>
          </div>

          <div
            className={`flex-shrink-0 flex justify-end items-end ${getAnimationClasses(
              3
            )}`}
            style={getAnimationDelay(3)}
          >
            <img
              className="w-auto max-w-[762px] h-[45dvh] object-contain"
              alt="Layer"
              src="/img/layer-1.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
