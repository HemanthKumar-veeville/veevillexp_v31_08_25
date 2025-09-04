import React from "react";
import {
  GeorgiaHeading,
  MobileHeading,
  UpdatedHeading,
  UpdatedHeadingTablet,
} from "@/components/ui/typography";

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

const tabletClientLogos = [
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

// Mobile Layout Component
const MobileLayout: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 sm:hidden mx-auto flex flex-col justify-center items-start">
      {/* Mobile Heading */}
      <div className="mb-8 sm:mb-12">
        <UpdatedHeadingTablet>Our clients</UpdatedHeadingTablet>
      </div>

      {/* Mobile Client Logos */}
      <div className="space-y-6 mb-8">
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
      <div className="space-y-6 mb-8">
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

// Tablet Layout Component
const TabletLayout: React.FC = () => {
  return (
    <section className="hidden sm:flex w-full py-16 px-4 lg:hidden mx-auto flex-col justify-center items-start">
      {/* Tablet Heading */}
      <div className="mb-8 sm:mb-12">
        <UpdatedHeadingTablet>Our clients</UpdatedHeadingTablet>
      </div>

      {/* Mobile Client Logos */}
      <div className="space-y-12 mb-8">
        {/* 1st row: First 3 logos */}
        <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
          {tabletClientLogos.slice(0, 2).map((logo, index) => (
            <img
              key={`mobile-client-logo-row1-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>

        {/* 2nd row: Next 4 logos */}
        <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
          {tabletClientLogos.slice(2, 4).map((logo, index) => (
            <img
              key={`mobile-client-logo-row2-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>

        {/* 3rd row: Remaining 5 logos */}
        <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
          {tabletClientLogos.slice(4, 6).map((logo, index) => (
            <img
              key={`mobile-client-logo-row3-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
          {tabletClientLogos.slice(6, 9).map((logo, index) => (
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

// Desktop Layout Component
const DesktopLayout: React.FC = () => {
  return (
    <section className="lg:w-full lg:py-16 lg:px-14 lg:max-w-[1280px] lg:mx-auto hidden lg:py-auto lg:flex lg:flex-col lg:items-start lg:justify-center">
      {/* Desktop Heading */}
      <div className="mb-8">
        <UpdatedHeading>Our clients</UpdatedHeading>
      </div>

      {/* Desktop Client Logos */}
      <div className="space-y-8 mb-8 ml-[-80px]">
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
    </section>
  );
};

// Main Component
export const OurClientsSection: React.FC = () => {
  return (
    <>
      <MobileLayout />
      <TabletLayout />
      <DesktopLayout />
    </>
  );
};
