import React from "react";
import {
  BrandLabel,
  UpdatedHeading,
  UpdatedDescription,
} from "@/components/ui/typography";

export const WhatShifts = (): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-screen-xl mx-auto px-[52px] py-[90px] ">
      <div className="flex flex-col justify-between">
        <UpdatedHeading className="mb-4">What shifts</UpdatedHeading>

        <UpdatedDescription className="w-[524px]">
          You already have the tools. We help you sharpen them and make the
          process fun and enjoyable. Reframe complex challenges with simplicity
          and humour, build without instructions and listen without bias. Go
          back more aware, present and curious.
          <br />
          <br />
          Solve business problems faster, strengthen trust, enhance creative
          confidence and storytelling, make better decisions under ambiguity...
          and there could be more!
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
  );
};
