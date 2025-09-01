import React from "react";
import {
  GeorgiaHeading,
  HelveticaRegular,
  ContactInfo,
  MobileHeading,
  MobileDescription,
  MobileCategoryLabel,
} from "@/components/ui/typography";

export const TestimonialsSection = (): React.JSX.Element => {
  const companyLogos = [
    {
      src: "/img/group-5.png",
      alt: "Company logo 1",
      className: "w-[120px] sm:w-[140px] md:w-[154px] h-auto",
    },
    {
      src: "/img/group-6.png",
      alt: "Company logo 2",
      className: "w-[70px] sm:w-[80px] md:w-[85px] h-auto",
    },
    {
      src: "/img/group-4.png",
      alt: "Company logo 3",
      className: "w-[140px] sm:w-[160px] md:w-[177px] h-auto",
    },
  ];

  const additionalLogos = [
    {
      src: "/img/vector-17.svg",
      alt: "Vector logo 1",
      className: "w-[60px] sm:w-[70px] md:w-[75px] h-auto",
    },
    {
      src: "/img/group-3.png",
      alt: "Group logo 1",
      className: "w-20 sm:w-22 md:w-24 h-auto",
    },
  ];

  return (
    <section className="w-full relative pt-8 sm:pt-12 md:pt-16 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1280px] mx-auto">
      <div className="">
        <div className="text-left mb-6 sm:mb-8">
          {/* Mobile Heading */}
          <div className="block lg:hidden mb-4 sm:mb-6">
            <MobileHeading className="mb-3 sm:mb-4">
              Ready to rediscover wonder?
            </MobileHeading>
          </div>

          {/* Desktop Heading */}
          <div className="hidden lg:block">
            <GeorgiaHeading className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-normal">
              Ready to rediscover wonder?
            </GeorgiaHeading>
          </div>

          {/* Mobile Description */}
          <div className="block lg:hidden mb-4 sm:mb-6">
            <MobileDescription className="leading-relaxed">
              Let&apos;s explore how your team can achieve extraordinary results
              through extraordinary experiences
            </MobileDescription>
          </div>

          {/* Desktop Description */}
          <div className="hidden lg:block">
            <HelveticaRegular className="text-lg sm:text-xl md:text-2xl lg:text-[25px] leading-relaxed">
              Let&apos;s explore how your team can achieve extraordinary results
              through extraordinary experiences
            </HelveticaRegular>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-[22px] sm:w-[24px] md:w-[26px] h-[18px] sm:h-[20px] md:h-[21px]">
              <img
                className="absolute w-[22px] sm:w-[24px] md:w-[26px] h-3 sm:h-3.5 top-0 left-0"
                alt="Vector"
                src="/img/vector-13.svg"
              />
              <img
                className="absolute w-5 sm:w-5.5 md:w-6 h-[18px] sm:h-[20px] md:h-[21px] top-0 left-px"
                alt="Vector"
                src="/img/vector-14.svg"
              />
              <img
                className="absolute w-2 sm:w-2.5 h-2 sm:h-2.5 top-[9px] sm:top-[10px] md:top-[11px] left-[2px] sm:left-[3px]"
                alt="Vector"
                src="/img/vector-15.svg"
              />
              <img
                className="absolute w-2 sm:w-2.5 h-[9px] sm:h-[10px] md:h-[11px] top-2 sm:top-2.5 left-3 sm:left-3.5 md:left-4"
                alt="Vector"
                src="/img/vector-16.svg"
              />
            </div>
            {/* Mobile Contact Info */}
            <div className="block lg:hidden">
              <MobileDescription>experiences@veeville.com</MobileDescription>
            </div>
            {/* Desktop Contact Info */}
            <div className="hidden lg:block">
              <ContactInfo className="text-sm sm:text-base md:text-lg">
                experiences@veeville.com
              </ContactInfo>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <img
              className="w-[20px] sm:w-[22px] md:w-[25px] h-[20px] sm:h-[22px] md:h-[25px]"
              alt="Website icon"
              src="/img/group-1000001863.png"
            />
            {/* Mobile Contact Info */}
            <div className="block lg:hidden">
              <MobileDescription>veevillexp.com</MobileDescription>
            </div>
            {/* Desktop Contact Info */}
            <div className="hidden lg:block">
              <ContactInfo className="text-sm sm:text-base md:text-lg">
                veevillexp.com
              </ContactInfo>
            </div>
          </div>
        </div>

        {/* Mobile Layout - First 3 logos in first row, rest in second row */}
        <div className="block sm:hidden mb-6">
          {/* First row - First 3 company logos */}
          <div className="flex flex-row gap-6 mb-6 justify-start items-center">
            {companyLogos.map((logo, index) => (
              <img
                key={`company-logo-mobile-${index}`}
                className={logo.className}
                alt={logo.alt}
                src={logo.src}
              />
            ))}
          </div>

          {/* Second row - Remaining logos */}
          <div className="flex flex-row flex-wrap gap-6 justify-start items-center">
            <div className="relative w-[60px] h-[75px]">
              <img
                className="absolute w-[60px] h-[62px] top-0 left-0"
                alt="Vector"
                src="/img/vector-17.svg"
              />
              <img
                className="absolute w-[58px] h-[7px] top-[63px] left-px"
                alt="Vector"
                src="/img/vector-18.svg"
              />
              <img
                className="absolute w-[26px] h-[4px] top-[72px] left-[18px]"
                alt="Vector"
                src="/img/vector-19.svg"
              />
            </div>

            <div className="relative w-[90px] h-[74px]">
              <img
                className="absolute w-[90px] h-3 top-[57px] left-0"
                alt="Vector"
                src="/img/vector-20.svg"
              />
              <img
                className="absolute w-[66px] h-[2px] top-[72px] left-3"
                alt="Vector"
                src="/img/vector-21.svg"
              />
              <div className="absolute w-[66px] h-[55px] -top-px left-3">
                <img
                  className="absolute w-5 h-[44px] top-0 left-[41px]"
                  alt="Vector"
                  src="/img/vector-22.svg"
                />
                <img
                  className="absolute w-5 h-[44px] top-[10px] left-[44px]"
                  alt="Vector"
                  src="/img/vector-23.svg"
                />
                <img
                  className="absolute w-[38px] h-[44px] top-2 left-1"
                  alt="Vector"
                  src="/img/vector-24.svg"
                />
                <img
                  className="absolute w-[38px] h-[44px] top-[2px] left-1"
                  alt="Vector"
                  src="/img/vector-25.svg"
                />
                <img
                  className="absolute w-5 h-[44px] top-0 left-[47px]"
                  alt="Vector"
                  src="/img/vector-26.svg"
                />
                <img
                  className="absolute w-[38px] h-[44px] top-3 left-0"
                  alt="Vector"
                  src="/img/vector-27.svg"
                />
              </div>
            </div>

            <img className="w-20 h-[76px]" alt="Group" src="/img/group-3.png" />

            <div className="relative">
              <div className="relative w-[40px] h-[62px] bg-[url(/img/vector-33.svg)] bg-[100%_100%]">
                <img
                  className="absolute w-[7px] h-2 top-[44px] left-[17px]"
                  alt="Vector"
                  src="/img/vector-34.svg"
                />
                <img
                  className="absolute w-2 h-[7px] top-[34px] left-4"
                  alt="Vector"
                  src="/img/vector-35.svg"
                />
                <img
                  className="absolute w-[7px] h-[7px] top-3 left-4"
                  alt="Vector"
                  src="/img/vector-36.svg"
                />
                <img
                  className="absolute w-2 h-2.5 top-[21px] left-4"
                  alt="Vector"
                  src="/img/vector-37.svg"
                />
              </div>

              <div className="absolute w-10 h-2 top-[63px] left-1">
                <img
                  className="absolute w-2 h-2 top-0 left-0"
                  alt="Vector"
                  src="/img/vector-28.svg"
                />
                <img
                  className="absolute w-1.5 h-2 top-0 left-2"
                  alt="Vector"
                  src="/img/vector-29.svg"
                />
                <img
                  className="absolute w-2 h-2 top-0 left-[15px]"
                  alt="Vector"
                  src="/img/vector-30.svg"
                />
                <img
                  className="absolute w-[7px] h-2 top-0 left-[24px]"
                  alt="Vector"
                  src="/img/vector-31.svg"
                />
                <img
                  className="absolute w-[7px] h-2 top-0 left-8"
                  alt="Vector"
                  src="/img/vector-32.svg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - All logos in single row */}
        <div className="hidden sm:flex flex-row flex-wrap gap-8 md:gap-12 lg:gap-16 mb-6 sm:mb-8 justify-start items-center">
          {companyLogos.map((logo, index) => (
            <img
              key={`company-logo-desktop-${index}`}
              className={logo.className}
              alt={logo.alt}
              src={logo.src}
            />
          ))}
          <div className="relative w-[70px] md:w-[75px] h-[85px] md:h-[94px]">
            <img
              className="absolute w-[70px] md:w-[75px] h-[70px] md:h-[77px] top-0 left-0"
              alt="Vector"
              src="/img/vector-17.svg"
            />
            <img
              className="absolute w-[68px] md:w-[73px] h-[8px] md:h-[9px] top-[72px] md:top-[79px] left-px"
              alt="Vector"
              src="/img/vector-18.svg"
            />
            <img
              className="absolute w-[30px] md:w-[33px] h-[4.5px] md:h-[5px] top-[82px] md:top-[90px] left-[20px] md:left-[22px]"
              alt="Vector"
              src="/img/vector-19.svg"
            />
          </div>

          <div className="relative w-[100px] md:w-[111px] h-[82px] md:h-[91px]">
            <img
              className="absolute w-[100px] md:w-[111px] h-3.5 top-[64px] md:top-[70px] left-0"
              alt="Vector"
              src="/img/vector-20.svg"
            />
            <img
              className="absolute w-[74px] md:w-[82px] h-[2.5px] md:h-[3px] top-[80px] md:top-[88px] left-3.5"
              alt="Vector"
              src="/img/vector-21.svg"
            />
            <div className="absolute w-[74px] md:w-[82px] h-[62px] md:h-[68px] -top-px left-3.5">
              <img
                className="absolute w-5.5 md:w-6 h-[49px] md:h-[54px] top-0 left-[46px] md:left-[51px]"
                alt="Vector"
                src="/img/vector-22.svg"
              />
              <img
                className="absolute w-5.5 md:w-6 h-[49px] md:h-[54px] top-[12px] md:top-[13px] left-[49px] md:left-[55px]"
                alt="Vector"
                src="/img/vector-23.svg"
              />
              <img
                className="absolute w-[42px] md:w-[47px] h-[49px] md:h-[54px] top-2.5 md:top-3 left-1"
                alt="Vector"
                src="/img/vector-24.svg"
              />
              <img
                className="absolute w-[42px] md:w-[47px] h-[49px] md:h-[54px] top-[3px] left-1"
                alt="Vector"
                src="/img/vector-25.svg"
              />
              <img
                className="absolute w-5.5 md:w-6 h-[49px] md:h-[54px] top-0 left-[52px] md:left-[59px]"
                alt="Vector"
                src="/img/vector-26.svg"
              />
              <img
                className="absolute w-[42px] md:w-[47px] h-[49px] md:h-[54px] top-3.5 left-0"
                alt="Vector"
                src="/img/vector-27.svg"
              />
            </div>
          </div>

          <img
            className="w-22 md:w-24 h-[84px] md:h-[93px]"
            alt="Group"
            src="/img/group-3.png"
          />

          <div className="relative">
            <div className="relative w-[45px] md:w-[50px] h-[70px] md:h-[77px] bg-[url(/img/vector-33.svg)] bg-[100%_100%]">
              <img
                className="absolute w-[8px] md:w-[9px] h-2.5 top-[50px] md:top-[55px] left-[19px] md:left-[21px]"
                alt="Vector"
                src="/img/vector-34.svg"
              />
              <img
                className="absolute w-2.5 h-[8px] md:h-[9px] top-[38px] md:top-[42px] left-4.5 md:left-5"
                alt="Vector"
                src="/img/vector-35.svg"
              />
              <img
                className="absolute w-[8px] md:w-[9px] h-[8px] md:h-[9px] top-3.5 left-4.5 md:left-5"
                alt="Vector"
                src="/img/vector-36.svg"
              />
              <img
                className="absolute w-2.5 h-3 top-[24px] md:top-[26px] left-4.5 md:left-5"
                alt="Vector"
                src="/img/vector-37.svg"
              />
            </div>

            <div className="absolute w-11 md:w-12 h-2 top-[71px] md:top-[79px] left-1">
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
                className="absolute w-2.5 h-2 top-0 left-[17px] md:left-[19px]"
                alt="Vector"
                src="/img/vector-30.svg"
              />
              <img
                className="absolute w-[8px] md:w-[9px] h-2 top-0 left-[27px] md:left-[30px]"
                alt="Vector"
                src="/img/vector-31.svg"
              />
              <img
                className="absolute w-[8px] md:w-[9px] h-2 top-0 left-9 md:left-10"
                alt="Vector"
                src="/img/vector-32.svg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            className="w-full max-w-[1280px] h-auto mb-[-85px] sm:mb-[-95px] md:mb-[-110px] lg:mb-[-140px]"
            alt="Testimonials showcase"
            src="/img/group-1000001887.png"
          />
        </div>
      </div>
    </section>
  );
};
