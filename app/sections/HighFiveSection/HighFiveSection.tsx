import React from "react";

export const HighFiveSection = (): JSX.Element => {
  return (
    <section className="w-full py-20 max-w-[1280px] mx-auto">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-16">
          <h2 className="text-6xl font-normal text-[#1c1c1c] text-left leading-[59.4px] font-georgia">
            The high-five methodology
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="font-normal text-black text-[25px] leading-[25px] font-helvetica">
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
            </div>

            <div className="font-normal text-black text-[25px] leading-[27.3px] font-helvetica">
              Curious to know what this means? Don&#39;t google.
              <br />
              Talk to us. We never rhyme without reason!
            </div>
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
