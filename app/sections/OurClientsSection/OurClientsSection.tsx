import React from "react";
import { GeorgiaHeading, MobileHeading } from "@/components/ui/typography";

const clientLogos = [
  {
    src: "/img/clip-path-group-3.png",
    alt: "Clip path group",
    className: "w-[303px] h-auto",
  },
  {
    src: "/img/group.png",
    alt: "Group",
    className: "w-[259px] h-auto",
  },
  {
    src: "/img/hp_logo.png",
    alt: "Vector",
    className: "w-[288px] h-auto",
  },
  {
    src: "/img/clip-path-group-4.png",
    alt: "Clip path group",
    className: "w-[232px] h-auto",
  },
  {
    src: "/img/group-1.png",
    alt: "Group",
    className: "w-[321px] h-auto",
  },
  {
    src: "/img/wrangler_logo.png",
    alt: "Clip path group",
    className: "w-[196px] h-auto",
  },
  {
    src: "/img/dell_logo.svg",
    alt: "Clip path group",
    className: "w-[75px] h-auto",
  },
  {
    src: "/img/clip-path-group.png",
    alt: "Clip path group",
    className: "w-[94px] h-auto",
  },
  {
    src: "/img/clip-path-group-1.png",
    alt: "Clip path group",
    className: "w-[144px] h-auto",
  },
  {
    src: "/img/clip-path-group-2.png",
    alt: "Clip path group",
    className: "w-[235px] h-auto",
  },
  {
    src: "/img/vector-2.svg",
    alt: "Vector",
    className: "w-[83px] h-auto",
  },
  {
    src: "/img/group-2.png",
    alt: "Group",
    className: "w-[164px] h-auto",
  },
];

const mobileClientLogos = [
  {
    src: "/img/mobile_comp_logos/Rectanglege_health_care.png",
    alt: "GE Healthcare",
    className: "w-[99px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/pepsico.png",
    alt: "PepsiCo",
    className: "w-[85px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/hp.png",
    alt: "HP",
    className: "w-[94px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/gsk.png",
    alt: "GSK",
    className: "w-[75px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/sn.png",
    alt: "SN",
    className: "w-[105px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/wrangler.png",
    alt: "Wrangler",
    className: "w-[64px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/dell.png",
    alt: "Dell",
    className: "w-[25px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/sun.png",
    alt: "Sun",
    className: "w-[30px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/levis.png",
    alt: "Levis",
    className: "w-[47px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/titan.png",
    alt: "Titan",
    className: "w-[76px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/lee.png",
    alt: "Lee",
    className: "w-[27px] h-auto",
  },
  {
    src: "/img/mobile_comp_logos/myntra.png",
    alt: "Myntra",
    className: "w-[53px] h-auto",
  },
];

export const OurClientsSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1280px] mx-auto md:py-auto">
      {/* Mobile Heading */}
      <div className="block lg:hidden mb-8 sm:mb-12">
        <MobileHeading>Our clients</MobileHeading>
      </div>

      {/* Desktop Heading */}
      <div className="hidden lg:block">
        <div className="mb-8 font-italic text-[#1c1c1c] text-6xl leading-[59.4px] font-[Georgia-Italic]">
          Our clients
        </div>
      </div>

      {/* Desktop Client Logos - Hidden on mobile, visible on md and up */}
      <div className="hidden md:block space-y-8 mb-8 ml-[-80px]">
        {/* 1st row: First 3 logos */}
        <div className="grid grid-cols-3 gap-8 items-center justify-items-center">
          {clientLogos.slice(0, 3).map((logo, index) => (
            <img
              key={`client-logo-row1-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>

        {/* 2nd row: Next 4 logos */}
        <div className="grid grid-cols-4 gap-8 items-center justify-items-center">
          {clientLogos.slice(3, 7).map((logo, index) => (
            <img
              key={`client-logo-row2-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>

        {/* 3rd row: Remaining 5 logos */}
        <div className="grid grid-cols-5 gap-8 items-center justify-items-center">
          {clientLogos.slice(7, 12).map((logo, index) => (
            <img
              key={`client-logo-row3-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>
      </div>

      {/* Mobile Client Logos - Visible on mobile, hidden on md and up */}
      <div className="md:hidden space-y-6 mb-8">
        {/* 1st row: First 3 logos */}
        <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
          {mobileClientLogos.slice(0, 3).map((logo, index) => (
            <img
              key={`mobile-client-logo-row1-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>

        {/* 2nd row: Next 4 logos */}
        <div className="grid grid-cols-4 gap-4 items-center justify-items-center">
          {mobileClientLogos.slice(3, 7).map((logo, index) => (
            <img
              key={`mobile-client-logo-row2-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>

        {/* 3rd row: Remaining 5 logos */}
        <div className="grid grid-cols-5 gap-4 items-center justify-items-center">
          {mobileClientLogos.slice(7, 12).map((logo, index) => (
            <img
              key={`mobile-client-logo-row3-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
