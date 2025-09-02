import React from "react";
import {
  Heading1,
  BodyLight,
  BrandLabel,
  MethodologyDescription,
  MobileHeading,
  MobileDescription,
  MobileCategoryLabel,
  MobileBrandLabel,
  UpdatedHeading,
  UpdatedDescription,
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
    <section className="w-full max-w-[1280px] mx-auto ">
      {/* Mobile Layout (default) */}
      <div className="block lg:hidden">
        <div className="space-y-6 sm:space-y-8">
          {/* Main Heading - Mobile */}
          <div className="mb-6 sm:mb-8">
            <MobileHeading>Crafted for the minds that matter</MobileHeading>
          </div>

          {/* Description - Mobile */}
          <div className="mb-6 sm:mb-8">
            <MobileDescription>
              We've got different tools in our box for all levels of the
              organization. Play should be for everyone.
            </MobileDescription>
          </div>

          {/* Categories - Mobile Horizontal Layout */}
          <div className="flex justify-start gap-12 items-center mb-6 sm:mb-8">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center gap-1 sm:gap-3">
                <img
                  className="w-[16px] h-[18px] sm:w-[19px] sm:h-[21px] md:w-[22px] md:h-[24px]"
                  alt="Vector"
                  src={category.icon}
                />
                <MobileBrandLabel className="whitespace-nowrap">
                  {category.label}
                </MobileBrandLabel>
              </div>
            ))}
          </div>

          {/* Final Description - Mobile */}
          <div className="mb-8 sm:mb-10">
            <MobileDescription>
              Demonstrated success for companies of all sizes across industry
              verticals.
            </MobileDescription>
          </div>

          {/* Image - Mobile Centered */}
          <div className="flex justify-center">
            <img
              className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-auto object-contain"
              alt="Layer"
              src="/img/layer-1.png"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout - Preserved */}
      <div className="hidden lg:grid lg:grid-cols-1 md:px-[52px] md:py-[90px]">
        <div className="flex-1">
          <UpdatedHeading className="mb-8">
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
              Demonstrated success for companies of all sizes across industry
              verticals.
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
    </section>
  );
};
