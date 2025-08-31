import React from "react";
import { GeorgiaHeading } from "@/components/ui/typography";

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

export const OurClientsSection: React.FC = () => {
  return (
    <section className="w-full py-16 max-w-[1280px] mx-auto">
      <GeorgiaHeading className="w-[894px] mb-16">Our clients</GeorgiaHeading>

      {/* Client Logos - 3 rows with specific distribution */}
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
