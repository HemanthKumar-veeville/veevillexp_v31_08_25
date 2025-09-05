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
    <footer className="w-full max-w-[1280px] mx-auto px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8">
      {/* Footer Text */}
      <div className="w-full sm:w-auto">
        <FooterText className="text-center sm:text-left text-[11px] xs:text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">
          <span className="tracking-[-0.08px] whitespace-nowrap">
            Contact Information: experiences/veeville |{" "}
          </span>
          <a
            href="mailto:experiences@veeville.com"
            rel="noopener noreferrer"
            target="_blank"
            className="tracking-[-0.08px] underline inline-block hover:text-[#2d2d2d] transition-colors duration-200 break-all xs:break-normal"
          >
            experiences@veeville.com
          </a>
          <span className="tracking-[-0.08px]"> | </span>
          <a
            href="http://veevillexp.com"
            rel="noopener noreferrer"
            target="_blank"
            className="tracking-[-0.08px] underline inline-block hover:text-[#2d2d2d] transition-colors duration-200 break-all xs:break-normal"
          >
            veevillexp.com
          </a>
        </FooterText>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4 sm:gap-3">
        <button
          onClick={() =>
            window.open("https://www.instagram.com/veevillexp/", "_blank")
          }
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Visit our Instagram"
        >
          <FaInstagram className="text-[#465666] w-5 h-5 sm:w-4 sm:h-4" />
        </button>
        <button
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/experiences-by-veeville/about/?viewAsMember=true",
              "_blank"
            )
          }
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Visit our LinkedIn"
        >
          <FaLinkedinIn className="text-[#465666] w-5 h-5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </footer>
  );
};
