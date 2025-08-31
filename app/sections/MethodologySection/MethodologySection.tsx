import React from "react";

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
    <section className="w-full relative max-w-[1280px] mx-auto">
      <div className="w-full mx-auto relative">
        {/* Title */}
        <h2 className="absolute top-0 left-0 right-[16.66%] font-['Georgia:Regular',_sans-serif] font-normal text-[#1c1c1c] text-[60px] tracking-[0] leading-[normal] mb-[124px]">
          The premise of play
        </h2>

        {/* Methodology Items */}
        <div className="relative w-full h-[800px]">
          {/* Item 1 - Zero Slide-decks */}
          <div className="absolute inset-[19.2%_69%_66.21%_0.26%]">
            <div className="font-['Georgia:Regular',_sans-serif] font-normal text-[#2d2d2d] text-[95px] tracking-[-3.8px] leading-none mb-8">
              01
            </div>
            <div className="font-['Georgia:Regular',_sans-serif] font-normal text-[#2d2d2d] text-[43px] tracking-[-1.72px] leading-none mb-[79px]">
              Zero Slide-decks
            </div>
            <div className="font-['Helvetica_Neue:Light',_sans-serif] font-light text-[#888888] text-[25px] leading-[normal] max-w-[255px]">
              Seriously, haven't you seen them all already?
              <br />
              <br />
              We believe in experiences that stick, not slides that slip away.
            </div>
          </div>

          {/* Item 2 - Zero Jargon */}
          <div className="absolute inset-[19.2%_34.1%_66.21%_35.16%]">
            <div className="font-['Georgia:Regular',_sans-serif] font-normal text-[#2d2d2d] text-[95px] tracking-[-3.8px] leading-none mb-8">
              02
            </div>
            <div className="font-['Georgia:Regular',_sans-serif] font-normal text-[#2d2d2d] text-[43px] tracking-[-1.72px] leading-none mb-[79px]">
              Zero Jargon
            </div>
            <div className="font-['Helvetica_Neue:Light',_sans-serif] font-light text-[#888888] text-[25px] leading-[normal] max-w-[236px]">
              "We must synergize holistic paradigms to leverage scalable
              ecosystems."
              <br />
              <br />
              Yeah. That made no sense to us either.
            </div>
          </div>

          {/* Item 3 - 100% Surprises */}
          <div className="absolute inset-[19.2%_1.86%_66.21%_67.4%]">
            <div className="font-['Georgia:Regular',_sans-serif] font-normal text-[#2d2d2d] text-[95px] tracking-[-3.8px] leading-none mb-8">
              03
            </div>
            <div className="font-['Georgia:Regular',_sans-serif] font-normal text-[#2d2d2d] text-[43px] tracking-[-1.72px] leading-none mb-[79px]">
              100% Surprises
            </div>
            <div className="font-['Helvetica_Neue:Light',_sans-serif] font-light text-[#888888] text-[25px] leading-[normal] max-w-[236px]">
              When did you last leave a workshop talking about it for weeks? We
              design moments that delight and memories that matter.
            </div>
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
