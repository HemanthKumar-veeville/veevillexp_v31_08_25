import React from "react";
import { FooterText } from "@/components/ui/typography";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full max-w-[1280px] mx-auto py-2 sm:py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-0 min-h-[43px]">
      {/* Desktop Footer Text */}
      <div className="block">
        <FooterText className="text-center sm:text-left text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">
          <span className="tracking-[-0.08px]">
            Contact Information: experiences/veeville |{" "}
          </span>
          <a
            href="mailto:experiences@veeville.com"
            rel="noopener noreferrer"
            target="_blank"
            className="tracking-[-0.08px] underline break-all sm:break-words md:break-normal hover:text-[#2d2d2d] transition-colors"
          >
            experiences@veeville.com
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

      <div className="flex items-center gap-2">
        <span
          onClick={() =>
            window.open("https://www.instagram.com/veevillexp/", "_blank")
          }
        >
          <FaInstagram className="text-[#465666] font-bold" />
        </span>
        <span
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/experiences-by-veeville/about/?viewAsMember=true",
              "_blank"
            )
          }
        >
          <FaLinkedinIn className="text-[#465666] font-bold" />
        </span>
      </div>
    </footer>
  );
};
