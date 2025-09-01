import React from "react";
import { Heading1, QuoteText } from "@/components/ui/typography";

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div className="flex justify-start">
            <img
              className="w-[400px] h-[486px] object-contain"
              alt="Brochure inside"
              src="/img/brochure-inside-layout-half-us-letter.png"
            />
          </div>

          <div className="flex justify-center">
            <img
              className="w-[545px] h-[350px] object-contain"
              alt="Image"
              src="/img/image-24.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
