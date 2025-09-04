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
      {/* Mobile Layout (visible only on mobile and tablet up to lg) */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col justify-center gap-4 sm:gap-6 md:gap-8 h-[100dvh] max-h-[100dvh] py-4 sm:py-6 md:py-8">
        {/* Main Heading - Mobile with tablet typography - Aligned to start */}
        <div className="flex justify-start">
          <div className="text-left w-full">
            <UpdatedHeadingTablet>
              Where grown-ups <br className="sm:hidden md:hidden" />
              remember how to play
            </UpdatedHeadingTablet>
          </div>
        </div>

        {/* Image - Mobile - Aligned to center */}
        <img
          className="w-full h-auto max-h-[45dvh] sm:max-h-[45dvh] md:max-h-[50dvh] object-contain"
          alt="Group"
          src="/img/group-1000001849.png"
        />

        {/* Body Text - Mobile with tablet typography - Aligned to end */}
        <div className="flex justify-end">
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
