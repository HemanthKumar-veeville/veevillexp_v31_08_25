import React from "react";
import { Heading1, BodyLight, BrandLabel } from "@/components/ui/typography";

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
    <section className="w-full max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-16">
        <div className="flex-1">
          <Heading1 className="mb-8">
            Crafted for the minds that matter
          </Heading1>

          <div className="space-y-8">
            <BodyLight className="max-w-4xl">
              We've got different tools in our box for all levels of the
              organization. Play should be for everyone.
            </BodyLight>

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

            <BodyLight>
              Demonstrated success for companies of all sizes across industry
              verticals.
            </BodyLight>
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
