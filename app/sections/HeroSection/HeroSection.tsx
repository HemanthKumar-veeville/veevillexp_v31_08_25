import { BrandLabel } from "@/components/ui/typography";
import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full px-4 sm:px-6 md:px-10 lg:px-14 md:pt-[90px] pt-[30px] max-w-[1280px] mx-auto md:py-auto md:flex md:flex-col md:items-start md:justify-center">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8 min-h-[25rem] sm:min-h-[28rem] md:min-h-[30rem] px-4">
          <div className="absolute flex flex-col items-start w-full max-w-sm sm:max-w-md md:max-w-lg z-10  top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8">
            {/* Exp By Logo */}
            <img
              className="w-[60dvw] sm:w-[70dvw] h-auto object-contain"
              alt="Exp By Logo"
              src="/img/mobile_comp_logos/exp_by_logo.png"
            />
            {/* Veeville Logo */}
            <img
              className="w-[30dvw] sm:w-[35dvw] h-auto object-contain mt-2"
              alt="Veeville Logo"
              src="/img/mobile_comp_logos/veeville_logo.png"
            />
          </div>

          {/* Hero Mobile Image */}
          <img
            className="h-[60dvh] w-auto object-contain absolute bottom-0 right-0"
            alt="Hero Mobile"
            src="/img/group-1000001860.png"
          />

          {/* Hero Quote Image */}
          <img
            className="w-[50dvw] h-auto object-contain absolute top-36 sm:top-56 md:top-60 left-4 sm:left-6 md:left-8"
            alt="Hero Quote"
            src="/img/mobile_comp_logos/pablo_quote.png"
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col items-start justify-start gap-y-32">
          {/* Logo Images */}
          <div className="flex flex-col items-start space-y-4">
            {/* Exp By Logo */}
            <img
              className="w-[684px] h-auto object-contain"
              alt="Exp By Logo"
              src="/images/experiences-logo.svg"
            />
            {/* Veeville Logo */}
            <img
              className="w-[255px] h-auto object-contain"
              alt="Veeville Logo"
              src="/images/veeville-text.svg"
            />
          </div>

          {/* Pablo Quote */}
          <div>
            <BrandLabel className="w-[360px]">
              it took me four years to <br />
              paint like raphael,
              <br /> but a lifetime to
              <br /> paint like a child.
            </BrandLabel>
            <br />
            <br />
            <BrandLabel className="w-[360px] text-right ml-[8rem]">
              -PABLO PICASSO
            </BrandLabel>
          </div>
        </div>

        {/* Right Side - Full Hero Image */}
        <div className="flex flex-col items-center justify-center mt-[-4rem] mr-[-4rem]">
          <img
            className="w-full h-auto max-h-[95dvh] object-contain"
            alt="Hero Image"
            src="/img/group-1000001860.png"
          />
        </div>
      </div>
    </section>
  );
};
