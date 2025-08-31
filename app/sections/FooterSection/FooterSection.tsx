import React from "react";
import { FooterText } from "@/components/ui/typography";

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full px-14 py-8 flex justify-between items-center max-h-[43px]">
      <FooterText>
        <span className="tracking-[-0.08px]">
          Contact Information: experiences/veeville |{" "}
        </span>
        <a
          href="mailto:getpersonal@veeville.com"
          rel="noopener noreferrer"
          target="_blank"
          className="tracking-[-0.08px] underline"
        >
          getpersonal@veeville.com
        </a>
        <span className="tracking-[-0.08px]"> | </span>
        <a
          href="http://veevillexp.com"
          rel="noopener noreferrer"
          target="_blank"
          className="tracking-[-0.08px] underline"
        >
          veevillexp.com
        </a>
      </FooterText>

      <img
        className="w-[66px] h-auto object-contain"
        alt="Group"
        src="/img/group-1000001822.png"
      />
    </footer>
  );
};
