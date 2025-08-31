import React from "react";

export const IntroductionSection = (): JSX.Element => {
  const categories = [
    {
      label: "Leadership",
      icon: "/img/vector-40.svg",
    },
    {
      label: "Management",
      icon: "/img/vector-40.svg",
    },
    {
      label: "Teams",
      icon: "/img/vector-40.svg",
    },
  ];

  return (
    <section className="w-full max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-16">
        <div className="flex-1">
          <h2 className="font-georgia font-normal text-[#1c1c1c] text-6xl tracking-[0] leading-[59.4px] mb-8">
            Crafted for the minds that matter
          </h2>

          <div className="space-y-8">
            <p className="font-helvetica-light font-light text-black text-3xl tracking-[0] leading-[normal] max-w-4xl">
              We've got different tools in our box for all levels of the
              organization. Play should be for everyone.
            </p>

            <div className="flex gap-64 ">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <img
                    className="w-[19px] h-[21px]"
                    alt="Vector"
                    src={category.icon}
                  />
                  <span className="font-casual-human-bold font-bold text-[#2d2d2d] text-[34px] tracking-[0] leading-[normal] whitespace-nowrap">
                    {category.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-helvetica-light font-light text-black text-3xl tracking-[0] leading-[normal]">
              Demonstrated success for companies of all sizes across industry
              verticals.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 flex justify-end items-end">
          <img
            className="w-full max-w-[762px] h-auto object-contain"
            alt="Layer"
            src="/img/layer-1.png"
          />
        </div>
      </div>
    </section>
  );
};
