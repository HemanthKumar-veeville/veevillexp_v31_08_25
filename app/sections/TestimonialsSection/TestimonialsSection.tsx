import React from "react";
import {
  GeorgiaHeading,
  HelveticaRegular,
  ContactInfo,
} from "@/components/ui/typography";

export const TestimonialsSection = (): React.JSX.Element => {
  const companyLogos = [
    {
      src: "/img/group-5.png",
      alt: "Company logo 1",
      className: "w-[154px] h-[57px]",
    },
    {
      src: "/img/group-6.png",
      alt: "Company logo 2",
      className: "w-[85px] h-[76px]",
    },
    {
      src: "/img/group-4.png",
      alt: "Company logo 3",
      className: "w-[177px] h-[69px]",
    },
  ];

  const additionalLogos = [
    {
      src: "/img/vector-17.svg",
      alt: "Vector logo 1",
      className: "w-[75px] h-[77px]",
    },
    {
      src: "/img/group-3.png",
      alt: "Group logo 1",
      className: "w-24 h-[93px]",
    },
  ];

  return (
    <section className="w-full relative pt-16 max-w-[1280px] mx-auto">
      <div className="">
        <div className="text-left mb-8">
          <GeorgiaHeading className="mb-4">
            Ready to rediscover wonder?
          </GeorgiaHeading>

          <HelveticaRegular>
            Let&apos;s explore how your team can achieve extraordinary results
            through extraordinary experiences
          </HelveticaRegular>
        </div>

        <div className="flex flex-col items-start gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="relative w-[26px] h-[21px]">
              <img
                className="absolute w-[26px] h-3.5 top-0 left-0"
                alt="Vector"
                src="/img/vector-13.svg"
              />
              <img
                className="absolute w-6 h-[21px] top-0 left-px"
                alt="Vector"
                src="/img/vector-14.svg"
              />
              <img
                className="absolute w-2.5 h-2.5 top-[11px] left-[3px]"
                alt="Vector"
                src="/img/vector-15.svg"
              />
              <img
                className="absolute w-2.5 h-[11px] top-2.5 left-4"
                alt="Vector"
                src="/img/vector-16.svg"
              />
            </div>
            <ContactInfo>experiences@veeville.com</ContactInfo>
          </div>

          <div className="flex items-center gap-3">
            <img
              className="w-[25px] h-[25px]"
              alt="Website icon"
              src="/img/group-1000001863.png"
            />
            <ContactInfo>veevillexp.com</ContactInfo>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-16 mb-8 justify-start items-center">
          {companyLogos.map((logo, index) => (
            <img
              key={`company-logo-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
          <div className="relative w-[75px] h-[94px]">
            <img
              className="absolute w-[75px] h-[77px] top-0 left-0"
              alt="Vector"
              src="/img/vector-17.svg"
            />
            <img
              className="absolute w-[73px] h-[9px] top-[79px] left-px"
              alt="Vector"
              src="/img/vector-18.svg"
            />
            <img
              className="absolute w-[33px] h-[5px] top-[90px] left-[22px]"
              alt="Vector"
              src="/img/vector-19.svg"
            />
          </div>

          <div className="relative w-[111px] h-[91px]">
            <img
              className="absolute w-[111px] h-3.5 top-[70px] left-0"
              alt="Vector"
              src="/img/vector-20.svg"
            />
            <img
              className="absolute w-[82px] h-[3px] top-[88px] left-3.5"
              alt="Vector"
              src="/img/vector-21.svg"
            />
            <div className="absolute w-[82px] h-[68px] -top-px left-3.5">
              <img
                className="absolute w-6 h-[54px] top-0 left-[51px]"
                alt="Vector"
                src="/img/vector-22.svg"
              />
              <img
                className="absolute w-6 h-[54px] top-[13px] left-[55px]"
                alt="Vector"
                src="/img/vector-23.svg"
              />
              <img
                className="absolute w-[47px] h-[54px] top-3 left-1"
                alt="Vector"
                src="/img/vector-24.svg"
              />
              <img
                className="absolute w-[47px] h-[54px] top-[3px] left-1"
                alt="Vector"
                src="/img/vector-25.svg"
              />
              <img
                className="absolute w-6 h-[54px] top-0 left-[59px]"
                alt="Vector"
                src="/img/vector-26.svg"
              />
              <img
                className="absolute w-[47px] h-[54px] top-3.5 left-0"
                alt="Vector"
                src="/img/vector-27.svg"
              />
            </div>
          </div>

          <img className="w-24 h-[93px]" alt="Group" src="/img/group-3.png" />

          <div className="relative">
            <div className="relative w-[50px] h-[77px] bg-[url(/img/vector-33.svg)] bg-[100%_100%]">
              <img
                className="absolute w-[9px] h-2.5 top-[55px] left-[21px]"
                alt="Vector"
                src="/img/vector-34.svg"
              />
              <img
                className="absolute w-2.5 h-[9px] top-[42px] left-5"
                alt="Vector"
                src="/img/vector-35.svg"
              />
              <img
                className="absolute w-[9px] h-[9px] top-3.5 left-5"
                alt="Vector"
                src="/img/vector-36.svg"
              />
              <img
                className="absolute w-2.5 h-3 top-[26px] left-5"
                alt="Vector"
                src="/img/vector-37.svg"
              />
            </div>

            <div className="absolute w-12 h-2 top-[79px] left-1">
              <img
                className="absolute w-2.5 h-2 top-0 left-0"
                alt="Vector"
                src="/img/vector-28.svg"
              />
              <img
                className="absolute w-2 h-2 top-0 left-2.5"
                alt="Vector"
                src="/img/vector-29.svg"
              />
              <img
                className="absolute w-2.5 h-2 top-0 left-[19px]"
                alt="Vector"
                src="/img/vector-30.svg"
              />
              <img
                className="absolute w-[9px] h-2 top-0 left-[30px]"
                alt="Vector"
                src="/img/vector-31.svg"
              />
              <img
                className="absolute w-[9px] h-2 top-0 left-10"
                alt="Vector"
                src="/img/vector-32.svg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            className="w-full max-w-[1280px] h-auto mb-[-82px]"
            alt="Testimonials showcase"
            src="/img/group-1000001887.png"
          />
        </div>
      </div>
    </section>
  );
};
