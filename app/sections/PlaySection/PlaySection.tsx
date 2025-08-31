import React from "react";

export const PlaySection = (): JSX.Element => {
  return (
    <section className="w-full py-16 px-4 max-w-[1280px] mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <h2 className="font-georgia font-normal text-[#1c1c1c] text-4xl lg:text-6xl tracking-[0] leading-normal">
              Where grown-ups remember how to play
            </h2>

            <div className="font-helvetica font-normal text-[#1c1c1c] text-xl lg:text-[25px] tracking-[0] leading-normal">
              <span className="font-helvetica font-normal text-[#1c1c1c] text-xl lg:text-[25px] tracking-[0]">
                At{" "}
              </span>
              <span className="font-helvetica-bold font-bold">
                Experiences by Veeville
              </span>
              <span className="font-helvetica font-normal text-[#1c1c1c] text-xl lg:text-[25px] tracking-[0]">
                , we craft experiential learning programs for leaders and teams
                to solve real business problems.
                <br />
                <br />
                Through play, touch, experimentation, surprise and laughter, we
                will help you to question without fear, unwind your biases, view
                your challenges with fresh eyes and attack them with fresh
                energy.
              </span>
            </div>
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
