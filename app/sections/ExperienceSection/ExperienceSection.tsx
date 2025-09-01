import React from "react";
import { BrandLabel, Heading1, QuoteText } from "@/components/ui/typography";

export const ExperienceSection = (): React.JSX.Element => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1280px] mx-auto">
      <div className="w-full">
        <Heading1 className="w-full mb-8">What shifts</Heading1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-[15px]">
          <QuoteText>
            You already have the tools. We help you sharpen them and make the
            process fun and enjoyable. Reframe complex challenges with
            simplicity and humour, build without instructions and listen without
            bias. Go back more aware, present and curious.
          </QuoteText>

          <QuoteText>
            Solve business problems faster, strengthen trust, enhance creative
            confidence and storytelling, make better decisions under
            ambiguity... and there could be more!
            <br />
            Think like a 5 year-old. Lead like a grown up!
          </QuoteText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-start">
            <img
              className="w-[400px] h-[486px] object-contain"
              alt="Brochure inside"
              src="/img/brochure-inside-layout-half-us-letter.png"
            />
          </div>

          <div className="flex flex-col justify-center items-end">
            <BrandLabel className="w-[500px]">
              GIVE ME SIX HOURS To CHOP A TREE AND I WILL SPEND THE FIRST FOUR
              HOURS SHARPENING THE AXE
            </BrandLabel>
            <br />
            <BrandLabel>-ABRAHAM LINCOLN</BrandLabel>
          </div>
        </div>
      </div>
    </section>
  );
};
