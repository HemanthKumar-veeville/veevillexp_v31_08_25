import { BrandLabel } from "@/components/ui/typography";
import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full px-4 sm:px-6 md:px-10 lg:px-14 md:py-[70px] py-[30px] max-w-[1280px] mx-auto">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="flex flex-col items-center space-y-8 h-[30rem]">
          <div className="flex flex-col items-start">
            {/* Exp By Logo */}
            <img
              className="w-[327px] h-auto object-contain"
              alt="Exp By Logo"
              src="/img/mobile_comp_logos/exp_by_logo.png"
            />
            {/* Veeville Logo */}
            <img
              className="w-[121px] h-auto object-contain"
              alt="Veeville Logo"
              src="/img/mobile_comp_logos/veeville_logo.png"
            />
          </div>
          {/* Hero Mobile Image */}
          <img
            className="w-[250px] max-w-sm h-auto object-contain absolute top-24 right-0"
            alt="Hero Mobile"
            src="/img/mobile_comp_logos/hero_mobile.png"
          />

          {/* Hero Quote Image */}
          <img
            className="w-[203px] h-auto object-contain absolute top-[30rem] left-8"
            alt="Hero Quote"
            src="/img/mobile_comp_logos/pablo_quote.png"
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-8">
        <div className="flex flex-col items-start justify-between gap-y-10">
          <img
            className="w-[672px] h-[190px] mb-8"
            alt="Group"
            src="/img/group-1000001868.png"
          />
          <div>
            <BrandLabel className="w-[360px]">
              it took me four years to paint like raphael,
              <br /> but a lifetime to
              <br /> paint like a child.
            </BrandLabel>
            <br />
            <BrandLabel className="w-[360px] text-right">
              -PABLO PICASSO
            </BrandLabel>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <img
            className="max-w-[40vw] w-auto h-[95dvh] object-contain absolute top-0 right-0"
            alt="Group"
            src="/img/group-1000001860.png"
          />
        </div>
      </div>
    </section>
  );
};
