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

export const IntroductionSection = (): React.JSX.Element => {
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
    <>
      {/* Mobile Layout (visible only on mobile and tablet up to lg) */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-start justify-center h-[100vh] min-h-[100vh] space-y-8 sm:space-y-10 md:space-y-12">
        {/* Main Heading - Mobile with tablet typography */}
        <div className="text-left w-[300px] sm:w-[400px] md:w-[500px]">
          <UpdatedHeadingTablet>
            Crafted for the minds that matter
          </UpdatedHeadingTablet>
        </div>

        {/* Body Text - Mobile with tablet typography */}
        <div className="text-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
          <UpdatedDescriptionTablet className="space-y-3">
            <p className="mb-0">
              We've got different tools in our box for all levels of the
              organization. Play should be for everyone.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              Impactful implementations across companies of all sizes and
              industry verticals
            </p>
          </UpdatedDescriptionTablet>
        </div>

        {/* Categories - Mobile */}
        <div className="flex flex-col gap-3 items-start justify-center">
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

        {/* Image - Mobile */}
        <div className="flex justify-center items-center">
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
              style={{ lineHeight: "normal" }}
              className="leading-tight mb-8"
            >
              Crafted for the minds that matter
            </UpdatedHeading>

            <div className="space-y-4">
              <UpdatedDescription className="">
                We've got different tools in our box for all levels of the
                organization. Play should be for everyone.
              </UpdatedDescription>

              <div className="flex gap-64 ">
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

              <UpdatedDescription>
                Impactful implementations across companies of all sizes and
                industry verticals
              </UpdatedDescription>
            </div>
          </div>

          <div className="flex-shrink-0 flex justify-end items-end">
            <img
              className="w-full max-w-[762px] h-auto object-contain"
              alt="Layer"
              src="/img/layer-1.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};
