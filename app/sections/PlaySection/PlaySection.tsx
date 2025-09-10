import React from "react";
import {
  Heading2,
  BodyMedium,
  BrandBold,
  QuoteText,
  UpdatedHeading,
  UpdatedDescription,
  UpdatedHeadingTablet,
  UpdatedDescriptionTablet,
} from "@/components/ui/typography";
import { useSectionAnimation } from "@/lib/useSectionAnimation";

export const PlaySection = (): React.JSX.Element => {
  const { sectionRef, getAnimationClasses, getAnimationDelay, getTitleAnimationClasses, getTitleAnimationDelay } = useSectionAnimation();

  return (
    <section ref={sectionRef}>
      {/* Mobile Layout (visible only on mobile and tablet up to lg) */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col justify-center gap-4 sm:gap-6 md:gap-8 h-[100dvh] max-h-[100dvh] py-4 sm:py-6 md:py-8">
        {/* Main Heading - Mobile with tablet typography - Aligned to start */}
        <div 
          className={`flex justify-start ${getTitleAnimationClasses()}`}
          style={getTitleAnimationDelay()}
        >
          <div className="text-left w-full">
            <UpdatedHeadingTablet>
              Where grown-ups <br className="sm:hidden md:hidden" />
              remember how to play
            </UpdatedHeadingTablet>
          </div>
        </div>

        {/* Image - Mobile - Aligned to center */}
        <img
          className={`w-full h-auto max-h-[45dvh] sm:max-h-[45dvh] md:max-h-[50dvh] object-contain ${getAnimationClasses(0)}`}
          style={getAnimationDelay(0)}
          alt="Group"
          src="/img/group-1000001849.png"
        />

        {/* Body Text - Mobile with tablet typography - Aligned to end */}
        <div 
          className={`flex justify-end ${getAnimationClasses(1)}`}
          style={getAnimationDelay(1)}
        >
          <div className="text-right max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
            <UpdatedDescriptionTablet className="space-y-2 text-ellipsis overflow-hidden text-left">
              <p className="mb-0 line-clamp-3">
                <span>At </span>
                <BrandBold>Experiences by </BrandBold>
                <span className="text-[#1c1c1c] font-bold italic text-2xl font-[Georgia-Italic]">
                  Veeville
                </span>
                <span>
                  , we craft experiential learning programs for leaders and
                  teams to solve real business problems.
                </span>
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="line-clamp-4">
                Through play, touch, experimentation, surprise and laughter, we
                will help you to question without fear, unwind your biases, view
                your challenges with fresh eyes and attack them with fresh
                energy.
              </p>
            </UpdatedDescriptionTablet>
          </div>
        </div>
      </div>

      {/* Desktop Layout (visible only on lg and up) */}
      <div className="hidden  lg:w-full lg:px-14 max-w-[1280px] mx-auto lg:py-[90px] lg:py-auto lg:flex lg:flex-col lg:items-start lg:justify-center">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <UpdatedHeading
                className={`leading-tight w-[45rem] ${getTitleAnimationClasses()}`}
                style={{ lineHeight: "normal", ...getTitleAnimationDelay() }}
              >
                Where grown-ups remember how to play
              </UpdatedHeading>

              <div 
                className={`w-[38rem] ${getAnimationClasses(0)}`}
                style={getAnimationDelay(0)}
              >
                <UpdatedDescription>
                  <span>At </span>
                  <BrandBold>Experiences by </BrandBold>
                  <span className="text-[#1c1c1c] font-bold italic text-2xl font-[Georgia-Italic]">
                    Veeville
                  </span>
                  <span>
                    , we craft experiential learning programs for leaders and
                    teams to solve real business problems.
                    <br />
                    <br />
                    Through play, touch, experimentation, surprise and laughter,
                    we will help you to question without fear, unwind your biases,
                    view your challenges with fresh eyes and attack them with
                    fresh energy.
                  </span>
                </UpdatedDescription>
              </div>
            </div>

            <div 
              className={`flex justify-center lg:justify-end ${getAnimationClasses(1)}`}
              style={getAnimationDelay(1)}
            >
              <img
                className="w-full max-w-[398px] h-auto  object-contain"
                alt="Group"
                src="/img/group-1000001849.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
