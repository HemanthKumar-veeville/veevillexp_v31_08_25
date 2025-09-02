import React from "react";
import {
  Heading1,
  LargeNumber,
  Heading3,
  MethodologyDescription,
  MobileHeading,
  MobileDescription,
  MobileCategoryLabel,
  MobileMethodologyDescription,
  MobileMethodologyTitle,
  UpdatedHeading,
  UpdatedMethodologyDescription,
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
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 relative max-w-[1280px] mx-auto  md:pt-[90px] md:py-auto md:flex md:flex-col md:items-start md:justify-center">
      <div className="w-full mx-auto relative">
        {/* Mobile Layout (default) */}
        <div className="block lg:hidden">
          <div className="relative w-full min-h-[600px] sm:min-h-[700px]">
            {/* Title - Mobile */}
            <div className="mb-6 sm:mb-8">
              <MobileHeading className="max-w-[72%]">
                The premise of play
              </MobileHeading>
            </div>

            {/* Methodology Items - Mobile Stacked Layout */}
            <div className="space-y-8 sm:space-y-10">
              {/* Item 1 - Zero Slide-decks */}
              <div className="relative">
                <h3 className="mb-4">
                  <MobileMethodologyTitle>
                    Zero Slide-decks
                  </MobileMethodologyTitle>
                </h3>
                <div className="mb-4">
                  <img
                    className="w-full max-w-[200px] h-auto object-contain"
                    alt="Zero Slide-decks illustration"
                    src="/img/group-1000001873.png"
                  />
                </div>
                <div className="space-y-2">
                  <MobileMethodologyDescription>
                    Seriously, haven't you seen them all already?
                  </MobileMethodologyDescription>
                  <MobileMethodologyDescription>
                    We believe in experiences that stick, not slides that slip
                    away.
                  </MobileMethodologyDescription>
                </div>
              </div>

              {/* Item 2 - Zero Jargon */}
              <div className="relative">
                <h3 className="mb-4">
                  <MobileMethodologyTitle>Zero Jargon</MobileMethodologyTitle>
                </h3>
                <div className="mb-4">
                  <img
                    className="w-full max-w-[200px] h-auto object-contain"
                    alt="Zero Jargon illustration"
                    src="/img/group-1000001874.png"
                  />
                </div>
                <div className="space-y-2">
                  <MobileMethodologyDescription>
                    "We must synergize holistic paradigms to leverage scalable
                    ecosystems."
                  </MobileMethodologyDescription>
                  <MobileMethodologyDescription>
                    Yeah. That made no sense to us either.
                  </MobileMethodologyDescription>
                </div>
              </div>

              {/* Item 3 - 100% Surprises */}
              <div className="relative">
                <h3 className="mb-4">
                  <MobileMethodologyTitle>
                    100% Surprises
                  </MobileMethodologyTitle>
                </h3>
                <div className="mb-4">
                  <img
                    className="w-full max-w-[200px] h-auto object-contain"
                    alt="100% Surprises illustration"
                    src="/img/group-1000001875.png"
                  />
                </div>
                <div className="space-y-2">
                  <MobileMethodologyDescription>
                    When did you last leave a workshop talking about it for
                    weeks? We design moments that delight and memories that
                    matter.
                  </MobileMethodologyDescription>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Preserved */}
        <div className="hidden lg:block">
          {/* Title */}
          <UpdatedHeading className="mb-[-64px]">
            The premise of play
          </UpdatedHeading>

          {/* Methodology Items */}
          <div className="relative w-full h-[700px]">
            {/* Item 1 - Zero Slide-decks */}
            <div className="absolute inset-[12%_69%_66.21%_0.26%]">
              <LargeNumber className="mb-2">01</LargeNumber>
              <Heading3 className="mb-8">Zero slide-decks</Heading3>
              <UpdatedMethodologyDescription className="max-w-[255px]">
                Seriously, haven't you seen them all already?
                <br />
                <br />
                We believe in experiences that stick, not slides that <br />
                slip away.
              </UpdatedMethodologyDescription>
            </div>

            {/* Item 2 - Zero Jargon */}
            <div className="absolute inset-[12%_34.1%_66.21%_35.16%]">
              <LargeNumber className="mb-2">02</LargeNumber>
              <Heading3 className="mb-8">Zero jargon</Heading3>
              <UpdatedMethodologyDescription className="max-w-[236px]">
                "We must synergize holistic paradigms to leverage scalable
                ecosystems."
                <br />
                <br />
                Yeah. That made no sense to us either.
              </UpdatedMethodologyDescription>
            </div>

            {/* Item 3 - 100% Surprises */}
            <div className="absolute inset-[12%_1.86%_66.21%_67.4%]">
              <LargeNumber className="mb-2">03</LargeNumber>
              <Heading3 className="mb-8">100% surprises</Heading3>
              <UpdatedMethodologyDescription className="max-w-[236px]">
                When did you last leave a workshop talking about it for weeks?
                We design moments that delight and memories that matter.
              </UpdatedMethodologyDescription>
            </div>

            {/* Images */}
            {/* Image for Item 1 - Zero Slide-decks */}
            <div className="absolute left-[8rem] bottom-[6rem] w-[250px] h-[237px]">
              <img
                className="block w-full h-full object-contain"
                alt="Methodology illustration 1"
                src="/img/group-1000001873.png"
              />
            </div>
            {/* Image for Item 2 - Zero Jargon */}
            <div className="absolute left-[32rem] bottom-[6rem] w-[253px] h-[213px]">
              <img
                className="block w-full h-full object-contain"
                alt="Methodology illustration 2"
                src="/img/group-1000001874.png"
              />
            </div>
            {/* Image for Item 3 - 100% Surprises */}
            <div className="absolute left-[58rem] bottom-[6rem] w-[247px] h-[273px]">
              <img
                className="block w-full h-full object-contain mt-[32px]"
                alt="Methodology illustration 3"
                src="/img/group-1000001875.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
