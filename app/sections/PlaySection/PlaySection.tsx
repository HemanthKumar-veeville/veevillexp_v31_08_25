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

export const PlaySection = (): React.JSX.Element => {
  return (
    <>
      {/* Mobile Layout (visible only on mobile and tablet up to md) */}
      <div className="block lg:hidden relative h-[100vh]">
        {/* Main Heading and Description - Mobile with absolute positioning */}
        <div className="absolute flex flex-col items-start w-full z-10 top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8">
          {/* Main Heading - Mobile with tablet typography */}
          <div className="mb-6 sm:mb-8">
            <UpdatedHeadingTablet>
              Where grown-ups
              <br />
              remember how to play
            </UpdatedHeadingTablet>
          </div>

          {/* Body Text - Mobile with tablet typography */}
          <div className="mb-8 sm:mb-10">
            <UpdatedDescriptionTablet className="space-y-3 w-[90%] sm:w-[80%] md:w-[70%]">
              <p className="mb-0">
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
              <p>
                Through play, touch, experimentation, surprise and laughter, we
                will help you to question without fear, unwind your biases, view
                your challenges with fresh eyes and attack them with fresh
                energy.
              </p>
            </UpdatedDescriptionTablet>
          </div>
        </div>
        {/* Image positioned to overlap with last portion of text */}
        <div className="absolute right-2 bottom-2">
          <img
            className="w-auto h-[55vh] sm:h-[60vh] md:h-[65vh] object-contain"
            alt="Group"
            src="/img/group-1000001849.png"
          />
        </div>
      </div>

      {/* Desktop Layout (visible only on lg and up) */}
      <div className="hidden  lg:w-full lg:px-14 max-w-[1280px] mx-auto lg:py-[90px] lg:py-auto lg:flex lg:flex-col lg:items-start lg:justify-center">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <UpdatedHeading
                style={{ lineHeight: "normal" }}
                className="leading-tight w-[45rem]"
              >
                Where grown-ups remember how to play
              </UpdatedHeading>

              <UpdatedDescription className="w-[38rem]">
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

            <div className="flex justify-center lg:justify-end">
              <img
                className="w-full max-w-[398px] h-auto  object-contain"
                alt="Group"
                src="/img/group-1000001849.png"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
