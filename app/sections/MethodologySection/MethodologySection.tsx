import React from "react";
import {
  Heading1,
  LargeNumber,
  Heading3,
  MethodologyDescription,
} from "@/components/ui/typography";

const methodologyData = [
  {
    number: "01",
    title: "Zero Slide-decks",
    description:
      "Seriously, haven't you seen them all already?\n\nWe believe in experiences that stick, not slides that slip away.",
    image: "/img/group-1000001873.png",
    imageAlt: "Group",
  },
  {
    number: "02",
    title: "Zero Jargon",
    description:
      '"We must synergize holistic paradigms to leverage scalable ecosystems."\n\nYeah. That made no sense to us either.',
    image: "/img/group-1000001874.png",
    imageAlt: "Group",
  },
  {
    number: "03",
    title: "100% Surprises",
    description:
      "When did you last leave a workshop talking about it for weeks? We design moments that delight and memories that matter.",
    image: "/img/group-1000001875.png",
    imageAlt: "Group",
  },
];

export const MethodologySection = (): React.JSX.Element => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 relative max-w-[1280px] mx-auto">
      <div className="w-full mx-auto relative">
        {/* Title */}
        <Heading1 className="absolute top-0 left-0 right-[16.66%]">
          The premise of play
        </Heading1>

        {/* Methodology Items */}
        <div className="relative w-full h-[800px]">
          {/* Item 1 - Zero Slide-decks */}
          <div className="absolute inset-[19.2%_69%_66.21%_0.26%]">
            <LargeNumber className="mb-2">01</LargeNumber>
            <Heading3 className="mb-8">Zero Slide-decks</Heading3>
            <MethodologyDescription className="max-w-[255px]">
              Seriously, haven't you seen them all already?
              <br />
              <br />
              We believe in experiences that stick, not slides that slip away.
            </MethodologyDescription>
          </div>

          {/* Item 2 - Zero Jargon */}
          <div className="absolute inset-[19.2%_34.1%_66.21%_35.16%]">
            <LargeNumber className="mb-2">02</LargeNumber>
            <Heading3 className="mb-8">Zero Jargon</Heading3>
            <MethodologyDescription className="max-w-[236px]">
              "We must synergize holistic paradigms to leverage scalable
              ecosystems."
              <br />
              <br />
              Yeah. That made no sense to us either.
            </MethodologyDescription>
          </div>

          {/* Item 3 - 100% Surprises */}
          <div className="absolute inset-[19.2%_1.86%_66.21%_67.4%]">
            <LargeNumber className="mb-2">03</LargeNumber>
            <Heading3 className="mb-8">100% Surprises</Heading3>
            <MethodologyDescription className="max-w-[236px]">
              When did you last leave a workshop talking about it for weeks? We
              design moments that delight and memories that matter.
            </MethodologyDescription>
          </div>

          {/* Images */}
          <div className="absolute inset-[69.11%_67.36%_3.09%_16.38%]">
            <img
              className="block max-w-none w-full h-full object-contain"
              alt="Methodology illustration 1"
              src="/img/group-1000001873.png"
            />
          </div>
          <div className="absolute inset-[67.58%_30.71%_3.72%_50.16%]">
            <img
              className="block max-w-none w-full h-full object-contain"
              alt="Methodology illustration 2"
              src="/img/group-1000001874.png"
            />
          </div>
          <div className="absolute bottom-0 left-[83.94%] right-0 top-[68.34%]">
            <img
              className="block max-w-none w-full h-full object-contain"
              alt="Methodology illustration 3"
              src="/img/group-1000001875.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
