import React from "react";
import {
  Heading2,
  BodyMedium,
  BrandBold,
  QuoteText,
  UpdatedHeading,
  UpdatedDescription,
} from "@/components/ui/typography";

export const PlaySection = (): React.JSX.Element => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1280px] mx-auto  md:py-[90px] md:py-auto md:flex md:flex-col md:items-start md:justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout (default) */}
        <div className="block h-[30rem] lg:hidden">
          <div className="relative w-full">
            {/* Main Heading - Mobile with line break */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-['Georgia',_serif] text-[22px] sm:text-[24px] md:text-[28px] leading-[normal] text-[#1c1c1c] font-normal max-w-[84%]">
                Where grown-ups
                <br />
                remember how to play
              </h2>
            </div>

            {/* Body Text - Mobile with limited width */}
            <div className="mb-8 sm:mb-10 relative">
              <div className="font-['Sofia_Pro',_sans-serif] text-[12px] sm:text-[14px] md:text-[16px] leading-[normal] text-[#1c1c1c] space-y-3 max-w-[60%]">
                <p className="mb-0">
                  <span className="font-['Helvetica',_sans-serif]">At </span>
                  <span className="font-['Helvetica',_sans-serif] font-bold italic">
                    Experiences by Veeville
                  </span>
                  <span className="font-['Helvetica',_sans-serif]">
                    , we craft experiential learning programs for leaders and
                    teams to solve real business problems.
                  </span>
                </p>
                <p className="mb-0">&nbsp;</p>
                <p className="font-['Helvetica',_sans-serif]">
                  Through play, touch, experimentation, surprise and laughter,
                  we will help you to question without fear, unwind your biases,
                  view your challenges with fresh eyes and attack them with
                  fresh energy.
                </p>
              </div>

              {/* Image positioned to overlap with last portion of text */}
              <div className="absolute right-0 top-[85%] w-[65%]">
                <img
                  className="w-[224px] h-auto object-contain"
                  alt="Group"
                  src="/img/group-1000001849.png"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center">
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
                , we craft experiential learning programs for leaders and teams
                to solve real business problems.
                <br />
                <br />
                Through play, touch, experimentation, surprise and laughter, we
                will help you to question without fear, unwind your biases, view
                your challenges with fresh eyes and attack them with fresh
                energy.
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
    </section>
  );
};
