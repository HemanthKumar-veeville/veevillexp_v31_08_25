import React from "react";
import {
  Heading2,
  BodyMedium,
  BrandBold,
  QuoteText,
} from "@/components/ui/typography";

export const PlaySection = (): React.JSX.Element => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1280px] mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <Heading2
              style={{ lineHeight: "normal" }}
              className="line-height-normal leading-normal w-[45rem]"
            >
              Where grown-ups remember how to play
            </Heading2>

            <QuoteText>
              <span>At </span>
              <BrandBold>Experiences by Veeville</BrandBold>
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
            </QuoteText>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              className="w-full max-w-[418px] h-auto object-contain"
              alt="Group"
              src="/img/group-1000001849.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
