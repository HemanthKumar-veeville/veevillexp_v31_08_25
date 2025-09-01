import React from "react";
import { FooterText } from "@/components/ui/typography";

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-10 lg:px-14 py-2 sm:py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-0 min-h-[43px]">
      <FooterText className="text-center sm:text-left text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">
        {/* Mobile layout - stacked vertically */}
        <div className="flex flex-col sm:hidden gap-1">
          <span className="tracking-[-0.08px]">
            Contact Information: experiences/veeville
          </span>
          <a
            href="mailto:getpersonal@veeville.com"
            rel="noopener noreferrer"
            target="_blank"
            className="tracking-[-0.08px] underline break-all hover:text-[#2d2d2d] transition-colors"
          >
            getpersonal@veeville.com
          </a>
          <a
            href="http://veevillexp.com"
            rel="noopener noreferrer"
            target="_blank"
            className="tracking-[-0.08px] underline break-all hover:text-[#2d2d2d] transition-colors"
          >
            veevillexp.com
          </a>
        </div>

        {/* Desktop layout - single line with pipe separators */}
        <div className="hidden sm:block">
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
        </div>
      </FooterText>

      <img
        className="w-[40px] sm:w-[50px] md:w-[58px] lg:w-[66px] h-auto object-contain flex-shrink-0"
        alt="Group"
        src="/img/group-1000001822.png"
      />
    </footer>
  );
};
