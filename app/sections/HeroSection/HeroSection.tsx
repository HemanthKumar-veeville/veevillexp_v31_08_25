import React from "react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full py-[70px] max-w-[1280px] mx-auto">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-start justify-between">
          <img
            className="w-[672px] h-[190px] mb-8"
            alt="Group"
            src="/img/group-1000001868.png"
          />
          <img
            className="w-[504px] h-[306px] object-contain mb-8"
            alt="Image"
            src="/img/image-19.png"
          />
        </div>
        <div className="flex flex-col items-end">
          <img
            className="w-[403px] h-[682px]"
            alt="Group"
            src="/img/group-1000001860.png"
          />
        </div>
      </div>
    </section>
  );
};
