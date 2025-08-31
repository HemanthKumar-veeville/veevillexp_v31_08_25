import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heading1,
  QuoteText,
  AuthorName,
  CompanyInfo,
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
    title: "HR head",
    subtitle: "",
    company: "at an 85 year old global organization",
    companyNote: "(which has seen it all over many, many years)",
  },
];

export const ClientsSection = (): React.JSX.Element => {
  return (
    <section className="w-full relative py-16 max-w-[1280px] mx-auto">
      <div className="max-w-[1344px] mx-auto">
        <Heading1 className="mb-16">Testimonials</Heading1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-12">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="border-none shadow-none bg-transparent"
              >
                <CardContent className="p-0 space-y-6">
                  <QuoteText>{testimonial.quote}</QuoteText>

                  <div className="space-y-2">
                    <AuthorName>
                      {testimonial.title}
                      {testimonial.subtitle && (
                        <>
                          <br />
                          {testimonial.subtitle}
                        </>
                      )}
                    </AuthorName>

                    <CompanyInfo>
                      {testimonial.company}
                      <br />
                      {testimonial.companyNote}
                    </CompanyInfo>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex-shrink-0 flex items-end h-full">
            <img
              className="w-full h-auto max-w-[724px] object-contain"
              alt="Group"
              src="/img/group-1000001858.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
