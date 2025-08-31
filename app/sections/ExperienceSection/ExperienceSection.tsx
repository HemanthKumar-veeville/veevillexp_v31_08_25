import React from "react";

export const ExperienceSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[1280px] mx-auto">
      <div className="w-full">
        <h2 className="w-full mb-8 font-normal text-[#1c1c1c] text-6xl leading-[59.4px] font-georgia">
          What shifts
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-[15px]">
          <div className="font-light text-black text-[25px] leading-normal font-sofia">
            You already have the tools. We help you sharpen them and make the
            process fun and enjoyable. Reframe complex challenges with
            simplicity and humour, build without instructions and listen without
            bias. Go back more aware, present and curious.
          </div>

          <div className="font-light text-black text-[25px] leading-normal font-sofia">
            Solve business problems faster, strengthen trust, enhance creative
            confidence and storytelling, make better decisions under
            ambiguity... and there could be more!
            <br />
            Think like a 5 year-old. Lead like a grown up!
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex justify-start">
            <img
              className="w-[400px] h-[486px] object-contain"
              alt="Brochure inside"
              src="/img/brochure-inside-layout-half-us-letter.png"
            />
          </div>

          <div className="flex justify-end">
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
