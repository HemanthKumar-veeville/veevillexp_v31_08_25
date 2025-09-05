import React from "react";
import { cn } from "@/lib/utils";

// Base typography component with all variants
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

// Heading variants
export const Heading1: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h1",
}) => (
  <Component
    className={cn(
      "font-georgia font-normal text-6xl tracking-[0] leading-[59.4px] text-[#1c1c1c]",
      className
    )}
  >
    {children}
  </Component>
);

export const Heading2: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h2",
  style,
}) => (
  <Component
    className={cn(
      "font-georgia font-normal text-4xl lg:text-6xl tracking-[0] leading-normal text-[#1c1c1c]",
      className
    )}
    style={style}
  >
    {children}
  </Component>
);

export const Heading3: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h3",
}) => (
  <Component
    className={cn(
      "font-georgia font-normal text-[43px] tracking-[-1.72px] leading-none text-[#2d2d2d]",
      className
    )}
  >
    {children}
  </Component>
);

// Large number variant (for methodology numbers)
export const LargeNumber: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-georgia font-normal text-[95px] tracking-[-3.8px] leading-none text-[#2d2d2d]",
      className
    )}
  >
    {children}
  </Component>
);

// Body text variants
export const BodyLarge: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
}) => (
  <Component
    className={cn(
      "font-helvetica font-normal text-[25px] tracking-[0] leading-normal text-[#1c1c1c]",
      className
    )}
  >
    {children}
  </Component>
);

export const BodyMedium: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
}) => (
  <Component
    className={cn(
      "font-helvetica font-normal text-xl lg:text-[25px] tracking-[0] leading-normal text-[#1c1c1c]",
      className
    )}
  >
    {children}
  </Component>
);

export const BodyLight: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
}) => (
  <Component
    className={cn(
      "font-helvetica font-light text-3xl tracking-[0] leading-[normal] text-black",
      className
    )}
  >
    {children}
  </Component>
);

export const BodySofia: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
}) => (
  <Component
    className={cn(
      "font-helvetica font-light text-[25px] leading-normal text-black",
      className
    )}
  >
    {children}
  </Component>
);

export const BodyHelvetica: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
}) => (
  <Component
    className={cn(
      "font-helvetica font-normal text-[25px] leading-[25px] text-black",
      className
    )}
  >
    {children}
  </Component>
);

// Methodology description variant
export const MethodologyDescription: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
}) => (
  <Component
    className={cn(
      "font-helvetica-light font-light text-[25px] leading-[normal] text-[#888888]",
      className
    )}
  >
    {children}
  </Component>
);

// Brand typography variants
export const BrandLabel: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "span",
}) => (
  <Component
    className={cn(
      "font-casual-human font-bold text-[34px] tracking-[0] leading-[normal] text-[#2d2d2d]",
      className
    )}
  >
    {children}
  </Component>
);

export const BrandBold: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "span",
}) => (
  <Component className={cn("font-helvetica-bold font-bold", className)}>
    {children}
  </Component>
);

// Quote and testimonial variants
export const QuoteText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "blockquote",
}) => (
  <Component
    className={cn(
      "font-helvetica font-normal text-[25px] tracking-[0] leading-[normal] text-black",
      className
    )}
  >
    {children}
  </Component>
);

export const AuthorName: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-casual-human font-bold text-black text-xl tracking-[0] leading-5",
      className
    )}
  >
    {children}
  </Component>
);

export const CompanyInfo: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-casual-human font-bold text-black text-[17px] leading-[17px]",
      className
    )}
  >
    {children}
  </Component>
);

// Contact and form variants
export const ContactInfo: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "span",
}) => (
  <Component
    className={cn(
      "font-sofia-light font-light text-black text-2xl tracking-[0] leading-[normal]",
      className
    )}
  >
    {children}
  </Component>
);

export const FormLabel: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "label",
}) => (
  <Component
    className={cn(
      "font-helvetica-light font-light text-white text-xl tracking-[0] leading-5",
      className
    )}
  >
    {children}
  </Component>
);

export const FormButton: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "span",
}) => (
  <Component className={cn("font-helvetica-bold font-bold text-xl", className)}>
    {children}
  </Component>
);

// Footer variant
export const FooterText: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-helvetica-regular font-normal text-[#465666] text-base tracking-[-0.48px] leading-[17.6px]",
      className
    )}
  >
    {children}
  </Component>
);

// Legacy variants for exact matching
export const GeorgiaHeading: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h2",
}) => (
  <Component
    className={cn(
      "font-georgia font-normal text-[#1c1c1c] text-6xl tracking-[0] leading-[59.4px]",
      className
    )}
  >
    {children}
  </Component>
);

export const HelveticaRegular: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
}) => (
  <Component
    className={cn(
      "font-helvetica-regular font-normal text-black text-[25px] tracking-[0] leading-[normal]",
      className
    )}
  >
    {children}
  </Component>
);

// Updated typography variants for WhatShifts section
export const UpdatedHeading: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-italic text-[#1c1c1c] text-6xl leading-[59.4px] font-[Georgia-Italic]",
      className
    )}
  >
    {children}
  </Component>
);

export const UpdatedDescription: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    style={{ lineHeight: "normal" }}
    className={cn(
      "text-black text-justify font-helvetica text-[20px] font-light not-italic leading-normal",
      className
    )}
  >
    {children}
  </Component>
);

// Mobile and tablet responsive variants
export const BrandBoldMobile: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "span",
}) => (
  <Component
    className={cn(
      "font-helvetica-bold font-bold italic text-sm sm:text-base md:text-lg",
      className
    )}
  >
    {children}
  </Component>
);

export const BrandBoldTablet: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "span",
}) => (
  <Component
    className={cn(
      "font-helvetica-bold font-bold italic text-base sm:text-lg md:text-xl",
      className
    )}
  >
    {children}
  </Component>
);

export const UpdatedHeadingMobile: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-italic text-[#1c1c1c] text-2xl sm:text-3xl md:text-4xl leading-tight font-[Georgia-Italic]",
      className
    )}
  >
    {children}
  </Component>
);

export const UpdatedHeadingTablet: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-italic text-[#1c1c1c] text-3xl sm:text-4xl md:text-5xl leading-tight font-[Georgia-Italic]",
      className
    )}
  >
    {children}
  </Component>
);

export const UpdatedDescriptionMobile: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    style={{ lineHeight: "normal" }}
    className={cn(
      "text-black text-justify font-helvetica text-sm sm:text-base md:text-lg font-light not-italic leading-normal",
      className
    )}
  >
    {children}
  </Component>
);

export const UpdatedDescriptionTablet: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    style={{ lineHeight: "normal" }}
    className={cn(
      "text-black text-left font-helvetica text-base sm:text-lg md:text-xl font-light not-italic leading-normal",
      className
    )}
  >
    {children}
  </Component>
);

export const UpdatedMethodologyDescription: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    style={{ lineHeight: "normal" }}
    className={cn(
      "text-[#606060] font-helvetica text-[20px] not-italic font-light leading-normal",
      className
    )}
  >
    {children}
  </Component>
);

// Mobile typography variants for Methodology section
export const MobileHeading: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-italic text-[#1c1c1c] text-2xl sm:text-3xl md:text-4xl leading-tight font-[Georgia-Italic]",
      className
    )}
  >
    {children}
  </Component>
);

export const MobileDescription: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    style={{ lineHeight: "normal" }}
    className={cn(
      "text-black text-left font-helvetica text-sm sm:text-base md:text-lg font-light not-italic leading-normal",
      className
    )}
  >
    {children}
  </Component>
);

export const MobileCategoryLabel: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    className={cn(
      "font-casual-human font-bold text-[#2d2d2d] text-sm sm:text-base md:text-lg tracking-[0] leading-normal",
      className
    )}
  >
    {children}
  </Component>
);

export const MobileMethodologyDescription: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "div",
}) => (
  <Component
    style={{ lineHeight: "normal" }}
    className={cn(
      "text-[#606060] font-helvetica text-sm sm:text-base md:text-lg not-italic font-light leading-normal",
      className
    )}
  >
    {children}
  </Component>
);

export const MobileMethodologyTitle: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h3",
}) => (
  <Component
    className={cn(
      "font-georgia font-normal text-[#2d2d2d] text-lg sm:text-xl md:text-2xl tracking-[-0.5px] leading-tight",
      className
    )}
  >
    {children}
  </Component>
);

// Export all variants for easy importing
export const Typography = {
  Heading1,
  Heading2,
  Heading3,
  LargeNumber,
  BodyLarge,
  BodyMedium,
  BodyLight,
  BodySofia,
  BodyHelvetica,
  MethodologyDescription,
  BrandLabel,
  BrandBold,
  BrandBoldMobile,
  BrandBoldTablet,
  QuoteText,
  AuthorName,
  CompanyInfo,
  ContactInfo,
  FormLabel,
  FormButton,
  FooterText,
  GeorgiaHeading,
  HelveticaRegular,
  UpdatedHeading,
  UpdatedHeadingMobile,
  UpdatedHeadingTablet,
  UpdatedDescription,
  UpdatedDescriptionMobile,
  UpdatedDescriptionTablet,
  UpdatedMethodologyDescription,
  MobileHeading,
  MobileDescription,
  MobileCategoryLabel,
  MobileMethodologyDescription,
  MobileMethodologyTitle,
};
