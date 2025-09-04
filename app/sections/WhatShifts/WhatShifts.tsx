import React from "react";
import {
  BrandLabel,
  UpdatedHeading,
  UpdatedDescription,
  UpdatedHeadingTablet,
  UpdatedDescriptionTablet,
} from "@/components/ui/typography";

export const WhatShifts = (): React.JSX.Element => {
  return (
    <>
      {/* Mobile Layout (visible only on mobile and tablet up to lg) */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-start justify-center h-[100vh] overflow-y-auto space-y-4 sm:space-y-6 md:space-y-8 py-6 sm:py-8 md:py-10">
        {/* Main Heading - Mobile with tablet typography */}
        <div className="text-left w-[300px] sm:w-[400px] md:w-full">
          <UpdatedHeadingTablet>
            The change becomes visible
          </UpdatedHeadingTablet>
        </div>

        {/* Body Text - Mobile with tablet typography */}
        <div className="text-left max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
          <UpdatedDescriptionTablet className="space-y-3">
            <p className="mb-0">
              Our interventions will teach you to re-frame complex challenges.
              listen without bias, strengthen the trust in the team, enhance
              creative confidence and make better decisions in ambiguity
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              You will find ways to build effective solutions from within. You
              will go back more aware, present and curious.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>Think like a 5 year-old. Lead like a grown up!</p>
          </UpdatedDescriptionTablet>
        </div>

        {/* Quote Section - Mobile */}
        <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] flex flex-col justify-center">
          <BrandLabel className="text-sm sm:text-base">
            GIVE ME SIX HOURS To CHOP A TREE AND I WILL SPEND THE FIRST FOUR
            HOURS SHARPENING THE AXE
          </BrandLabel>
          <br />
          <BrandLabel className="text-right text-sm sm:text-base">
            -ABRAHAM LINCOLN
          </BrandLabel>
        </div>

        {/* Image - Mobile */}
        <img
          className="w-auto max-w-[90%] h-[30vh] sm:h-[35vh] md:h-[40vh] object-contain"
          alt="Brochure inside"
          src="/img/brochure-inside-layout-half-us-letter.png"
        />
      </div>

      {/* Desktop Layout (visible only on lg and up) */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-screen-xl mx-auto px-[52px] py-[90px]">
        <div className="flex flex-col justify-start w-[47rem]">
          <UpdatedHeading className="mb-8">
            The change becomes visible
          </UpdatedHeading>

          <UpdatedDescription className="w-[524px]">
            Our interventions will teach you to re-frame complex challenges.
            listen without bias, strengthen the trust in the team, enhance
            creative confidence and make better decisions in ambiguity
            <br />
            <br />
            You will find ways to build effective solutions from within. You
            will go back more aware, present and curious.
            <br />
            Think like a 5 year-old. Lead like a grown up!
          </UpdatedDescription>

          <div className="w-[520px] flex flex-col justify-center mt-8">
            <BrandLabel>
              GIVE ME SIX HOURS To CHOP A TREE AND I WILL SPEND THE FIRST FOUR
              HOURS SHARPENING THE AXE
            </BrandLabel>
            <br />
            <BrandLabel className="text-right">-ABRAHAM LINCOLN</BrandLabel>
          </div>
        </div>

        <div className="flex justify-end">
          <img
            className="w-full max-w-md"
            alt="Brochure inside"
            src="/img/brochure-inside-layout-half-us-letter.png"
          />
        </div>
      </div>
    </>
  );
};
