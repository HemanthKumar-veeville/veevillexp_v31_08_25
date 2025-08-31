import React from "react";
import { Heading1, BodyHelvetica } from "@/components/ui/typography";

export const HighFiveSection = (): React.JSX.Element => {
  return (
    <section className="w-full py-20 max-w-[1280px] mx-auto">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-16">
          <Heading1 className="text-left">The high-five methodology</Heading1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <BodyHelvetica>
              <p className="leading-[27.5px] mb-4">
                When you consciously unwrap
                <br />
                the wrapper of play,
                <br />
                the underpinnings of the framework
                <br />
                become clear as day.
              </p>

              <p className="leading-[27.3px]">
                You can enter Kolb&apos;s learning cycle,
                <br />
                where you choose,
                <br />
                play as a &quot;state of flow&quot;
                <br />
                is hardly breaking news.
                <br />
                Glutamate and GABA might spark &amp; shape your brain.
                <br />
                When learning becomes fun, you will not feel the strain.
              </p>
            </BodyHelvetica>

            <BodyHelvetica className="leading-[27.3px]">
              Curious to know what this means? Don&#39;t google.
              <br />
              Talk to us. We never rhyme without reason!
            </BodyHelvetica>
          </div>

          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <img
              className="w-[349px] h-[315px] object-contain"
              alt="Group"
              src="/img/group-1000001879.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
