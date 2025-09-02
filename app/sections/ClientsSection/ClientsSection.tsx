import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heading1,
  QuoteText,
  AuthorName,
  CompanyInfo,
  MobileHeading,
  MobileDescription,
  MobileCategoryLabel,
  MobileBrandLabel,
  UpdatedHeading,
  UpdatedDescription,
} from "@/components/ui/typography";

const testimonialsData = [
  {
    quote:
      "The program focused on the business as a whole and not just leaders as individuals. It encouraged problem-solving, task breakdown, and responsibility sharing in a way that was practical, relatable, and enjoyable. It was a lot of fun and I'll remember this wherever I go!",
    title: "VP and Head",
    subtitle: "Global IT Services- India Centre",
    company: "at a 30 Bn dollar MNC",
    companyNote:
      "(which could claim an instantaneous ROI on the intervention!)",
  },
  {
    quote:
      "No Classroom training. No models. No theory. No jargon. The people bonded, did interesting and new things together. They have taken learnings that are immediately applicable to their work. All our objectives from this intervention were met. Actually, they were exceeded beyond expectation.",
    title: "HR Buisness Partner",
    subtitle: "",
    company: "at an 85 year old global organization",
    companyNote: "(which has seen it all over many, many years)",
  },
];

export const ClientsSection = (): React.JSX.Element => {
  return (
    <section className="w-full relative py-16 px-4 sm:px-6 md:px-[52px] md:py-auto max-w-[1280px] mx-auto md:py-auto md:flex md:flex-col md:items-start md:justify-center ">
      <div className="max-w-[1344px] mx-auto">
        {/* Mobile Heading */}
        <div className="block lg:hidden mb-8 sm:mb-12">
          <MobileHeading>Testimonials</MobileHeading>
        </div>

        {/* Desktop Heading */}
        <div className="hidden lg:block">
          <UpdatedHeading className="mb-8">Testimonials</UpdatedHeading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-12">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="border-none shadow-none bg-transparent"
              >
                <CardContent className="p-0 space-y-6">
                  {/* Mobile Quote Text */}
                  <div className="block lg:hidden">
                    <UpdatedDescription className="leading-relaxed">
                      {testimonial.quote}
                    </UpdatedDescription>
                  </div>

                  {/* Desktop Quote Text */}
                  <div className="hidden lg:block">
                    <UpdatedDescription>{testimonial.quote}</UpdatedDescription>
                  </div>

                  <div className="space-y-2">
                    {/* Mobile Author Info */}
                    <div className="block lg:hidden">
                      <MobileBrandLabel className="font-bold">
                        {testimonial.title}
                        {testimonial.subtitle && <>, {testimonial.subtitle}</>}
                      </MobileBrandLabel>
                    </div>

                    {/* Desktop Author Info */}
                    <div className="hidden lg:block">
                      <AuthorName>
                        {testimonial.title}
                        {testimonial.subtitle && (
                          <>
                            <br />
                            {testimonial.subtitle}
                          </>
                        )}
                      </AuthorName>
                    </div>

                    {/* Mobile Company Info */}
                    <div className="block lg:hidden">
                      <MobileDescription>
                        {testimonial.company}
                        <br />
                        {testimonial.companyNote}
                      </MobileDescription>
                    </div>

                    {/* Desktop Company Info */}
                    <div className="hidden lg:block">
                      <CompanyInfo>
                        {testimonial.company}
                        <br />
                        {testimonial.companyNote}
                      </CompanyInfo>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex-shrink-0 flex items-end h-full">
            <img
              className="w-full h-auto max-w-[40rem] min-w-[39rem] object-contain md:mb-[-80px] lg:mb-[-100px]"
              alt="Group"
              src="/img/group-1000001858.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
