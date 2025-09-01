import React from "react";
import { ClientsSection } from "./sections/ClientsSection/ClientsSection";
import { ContactFormSection } from "./sections/ContactFormSection/ContactFormSection";
import { ExperienceSection } from "./sections/ExperienceSection/ExperienceSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { HighFiveSection } from "./sections/HighFiveSection/HighFiveSection";
import { IntroductionSection } from "./sections/IntroductionSection/IntroductionSection";
import { MethodologySection } from "./sections/MethodologySection/MethodologySection";
import { OurClientsSection } from "./sections/OurClientsSection/OurClientsSection";
import { PlaySection } from "./sections/PlaySection/PlaySection";
import { TestimonialsSection } from "./sections/TestimonialsSection/TestimonialsSection";

export default function Veevillexp(): React.ReactNode {
  return (
    <div
      className="bg-white flex flex-col w-full min-h-screen mx-auto"
      data-model-id="1010:4098"
    >
      <div className="bg-white w-full  flex flex-col gap-y-16">
        <HeroSection />
        <PlaySection />
        <MethodologySection />
        <IntroductionSection />

        <div className="hidden md:flex md:flex-col md:gap-y-16">
          <ExperienceSection />

          <HighFiveSection />
        </div>

        <OurClientsSection />

        <ClientsSection />

        <TestimonialsSection />

        <ContactFormSection />
      </div>

      <FooterSection />
    </div>
  );
}
