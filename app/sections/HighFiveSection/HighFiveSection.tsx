import React from "react";
import {
  UpdatedHeading,
  UpdatedDescription,
  UpdatedHeadingTablet,
  UpdatedDescriptionTablet,
} from "@/components/ui/typography";
import { useSectionAnimation } from "@/lib/useSectionAnimation";

export const HighFiveSection = (): React.JSX.Element => {
  const {
    sectionRef,
    getAnimationClasses,
    getAnimationDelay,
    getTitleAnimationClasses,
    getTitleAnimationDelay,
  } = useSectionAnimation();

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center items-center"
    >
      {/* Mobile Layout (visible only on mobile and tablet up to lg) */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-start justify-center h-[100dvh] overflow-y-auto space-y-4 sm:space-y-6 md:space-y-8 py-6 sm:py-8 md:py-10">
        {/* Main Heading - Mobile with tablet typography */}
        <div
          className={`text-left w-[300px] sm:w-[400px] md:w-full ${getTitleAnimationClasses()}`}
          style={getTitleAnimationDelay()}
        >
          <UpdatedHeadingTablet>The high-five methodology</UpdatedHeadingTablet>
        </div>

        {/* Body Text - Mobile with tablet typography */}
        <div
          className={`text-left max-w-[90%] sm:max-w-[80%] md:max-w-[70%] ${getAnimationClasses(
            0
          )}`}
          style={getAnimationDelay(0)}
        >
          <UpdatedDescriptionTablet className="space-y-3">
            <p className="mb-0">
              When you consciously unwrap
              <br />
              the wrapper of play,
              <br />
              the underpinnings of the framework
              <br />
              become clear as day.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              You can enter Kolb&apos;s learning cycle,
              <br />
              where you choose,
              <br />
              play as a &quot;state of flow&quot;
              <br />
              is hardly breaking news.
              <br />
              Glutamate and GABA might spark &amp; shape your brain.
              <br />
              When learning becomes fun, <br />
              you will not feel the strain.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              Curious to know what this means? <br />
              Don&#39;t google. Talk to us. <br />
              We never rhyme without reason!
            </p>
          </UpdatedDescriptionTablet>
        </div>

        {/* Image - Mobile */}
        <img
          className={`w-auto max-w-[90%] h-[30dvh] sm:h-[35dvh] md:h-[40dvh] object-contain ${getAnimationClasses(
            1
          )}`}
          style={getAnimationDelay(1)}
          alt="Group"
          src="/img/group-1000001879.png"
        />
      </div>

      {/* Desktop Layout (visible only on lg and up) */}
      <div className="hidden lg:flex lg:flex-col lg:items-start lg:justify-center w-full py-auto px-[52px] max-w-[1280px] mx-auto">
        <div className="max-w-7xl">
          <UpdatedHeading
            className={`mb-8 ${getTitleAnimationClasses()}`}
            style={getTitleAnimationDelay()}
          >
            The high-five methodology
          </UpdatedHeading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div
                className={`w-[524px] ${getAnimationClasses(0)}`}
                style={getAnimationDelay(0)}
              >
                <UpdatedDescription>
                  <p className="leading-[27.5px] mb-4">
                    When you consciously unwrap
                    <br />
                    the wrapper of play,
                    <br />
                    the underpinnings of the framework
                    <br />
                    become clear as day.
                  </p>
                  <p className="leading-[27.3px]">
                    You can enter Kolb&apos;s learning cycle,
                    <br />
                    where you choose,
                    <br />
                    play as a &quot;state of flow&quot;
                    <br />
                    is hardly breaking news.
                    <br />
                    Glutamate and GABA might spark &amp; shape your brain.
                    <br />
                    When learning becomes fun, you will not feel the strain.
                  </p>
                </UpdatedDescription>
              </div>
              <div
                className={`w-[524px] ${getAnimationClasses(1)}`}
                style={getAnimationDelay(1)}
              >
                <UpdatedDescription>
                  <span className="leading-[27.3px]">
                    Curious to know what this means? Don&#39;t google.
                    <br />
                    Talk to us. We never rhyme without reason!
                  </span>
                </UpdatedDescription>
              </div>
            </div>

            <div
              className={`lg:col-span-1 flex justify-center lg:justify-end ${getAnimationClasses(
                2
              )}`}
              style={getAnimationDelay(2)}
            >
              <img
                className="w-[349px] h-[315px] object-contain"
                alt="Group"
                src="/img/group-1000001879.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
