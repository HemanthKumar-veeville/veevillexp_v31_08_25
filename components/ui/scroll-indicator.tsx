import React, { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  sections: string[];
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  sections,
}) => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".snap-y");
      if (!container) return;

      const scrollTop = container.scrollTop;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.round(scrollTop / windowHeight);

      setCurrentSection(
        Math.max(0, Math.min(sectionIndex, sections.length - 1))
      );
    };

    const container = document.querySelector(".snap-y");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [sections.length]);

  const scrollToSection = (index: number) => {
    const container = document.querySelector(".snap-y");
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col space-y-2">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSection
                ? "bg-blue-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            title={section}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>
    </div>
  );
};
