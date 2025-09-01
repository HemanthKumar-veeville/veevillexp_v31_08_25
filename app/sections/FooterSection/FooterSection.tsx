import React from "react";
import { FooterText, MobileDescription } from "@/components/ui/typography";

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-2 sm:py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-0 min-h-[43px]">
      {/* Mobile Footer Text */}
      <div className="block sm:hidden">
        <div className="flex flex-col gap-1">
          <MobileDescription className="text-center text-[#465666]">
            Contact Information: experiences/veeville
          </MobileDescription>
          <a
            href="mailto:getpersonal@veeville.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-center underline break-all hover:text-[#2d2d2d] transition-colors"
          >
            <MobileDescription className="text-[#465666]">
              getpersonal@veeville.com
            </MobileDescription>
          </a>
          <a
            href="http://veevillexp.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-center underline break-all hover:text-[#2d2d2d] transition-colors"
          >
            <MobileDescription className="text-[#465666]">
              veevillexp.com
            </MobileDescription>
          </a>
        </div>
      </div>

      {/* Desktop Footer Text */}
      <div className="hidden sm:block">
        <FooterText className="text-center sm:text-left text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">
          <span className="tracking-[-0.08px]">
            Contact Information: experiences/veeville |{" "}
          </span>
          <a
            href="mailto:getpersonal@veeville.com"
            rel="noopener noreferrer"
            target="_blank"
            className="tracking-[-0.08px] underline break-all sm:break-words md:break-normal hover:text-[#2d2d2d] transition-colors"
          >
            getpersonal@veeville.com
          </a>
          <span className="tracking-[-0.08px]"> | </span>
          <a
            href="http://veevillexp.com"
            rel="noopener noreferrer"
            target="_blank"
            className="tracking-[-0.08px] underline break-all sm:break-words md:break-normal hover:text-[#2d2d2d] transition-colors"
          >
            veevillexp.com
          </a>
        </FooterText>
      </div>

      <img
        className="w-[40px] sm:w-[50px] md:w-[58px] lg:w-[66px] h-auto object-contain flex-shrink-0"
        alt="Group"
        src="/img/group-1000001822.png"
      />
    </footer>
  );
};
