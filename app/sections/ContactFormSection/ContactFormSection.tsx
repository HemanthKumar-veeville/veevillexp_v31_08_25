"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  UpdatedHeading,
  UpdatedHeadingTablet,
  FooterText,
} from "@/components/ui/typography";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useSectionAnimation } from "@/lib/useSectionAnimation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  teamSize: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  organization?: string;
  teamSize?: string;
  message?: string;
}

const Footer: React.FC = () => {
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
          disabled={true}
        >
          <FaInstagram className="text-[#465666] w-5 h-5 sm:w-5 sm:h-5" />
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
          <FaLinkedinIn className="text-[#465666] w-5 h-5 sm:w-5 sm:h-5" />
        </button>
      </div>
    </footer>
  );
};

export const ContactFormSection: React.FC = () => {
  const {
    sectionRef,
    getAnimationClasses,
    getAnimationDelay,
    getTitleAnimationClasses,
    getTitleAnimationDelay,
  } = useSectionAnimation();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    teamSize: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid = () =>
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    emailRegex.test(formData.email) &&
    formData.organization.trim() !== "" &&
    formData.teamSize.trim() !== "" &&
    formData.message.trim() !== "";

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    console.log(`Validating ${name} with value:`, value);
    if (!value.trim()) {
      console.log(`${name} is empty or whitespace`);
      return "This field is required";
    }
    switch (name) {
      case "email":
        if (!emailRegex.test(value)) {
          console.log(`${name} failed email regex test`);
          return "Please enter a valid email address";
        }
        break;
      case "firstName":
      case "lastName":
        if (value.trim().length < 2) {
          console.log(`${name} is too short`);
          return "Must be at least 2 characters";
        }
        break;
      case "message":
        if (value.trim().length < 10) {
          console.log(`${name} is too short`);
          return "Message must be at least 10 characters";
        }
        break;
    }
    console.log(`${name} passed validation`);
    return undefined;
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate the field immediately and update errors
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleInputBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) newErrors[fieldName] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(
        Object.keys(formData).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      );
      return;
    }

    // Clear all errors if validation passes
    setErrors({});
    setTouched({});

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Submission failed");
      }

      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        teamSize: "",
        message: "",
      });
      setTouched({});
      setErrors({});
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: any) {
      console.error("Form submission error:", error);
      setSubmitError(
        error?.message ||
          "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessages = () => {
    console.log("Current errors:", errors);
    console.log("Touched fields:", touched);
    console.log("Form data:", formData);
    const hasAnyError = Object.keys(errors).some(
      (key) => errors[key as keyof FormData] && touched[key as keyof FormData]
    );
    console.log("Has any error:", hasAnyError);
    return hasAnyError
      ? ["Please fill out all required fields correctly before submitting."]
      : [];
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center items-center"
    >
      {/* Mobile / Tablet */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-start justify-between min-h-screen">
        <div className="w-full flex-1 flex flex-col space-y-6 sm:space-y-8 md:space-y-10 py-8">
          <div
            className={`w-full ${getTitleAnimationClasses()}`}
            style={getTitleAnimationDelay()}
          >
            <UpdatedHeadingTablet>Get in Touch</UpdatedHeadingTablet>
          </div>

          {submitSuccess && (
            <div className="w-full p-4 sm:p-6 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-center font-medium text-sm sm:text-base">
                Thank you! Your message has been sent successfully. We'll get
                back to you soon.
              </p>
            </div>
          )}

          {submitError && (
            <div className="w-full p-4 sm:p-6 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center font-medium text-sm sm:text-base">
                {submitError}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`w-full space-y-6 sm:space-y-8 ${getAnimationClasses(
              0
            )}`}
            style={getAnimationDelay(0)}
          >
            <div className="space-y-6 sm:space-y-8">
              {/* Grid for first two fields */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[14px] sm:text-[16px] md:text-[18px] font-medium mb-2">
                    First Name *
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    onBlur={() => handleInputBlur("firstName")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 text-sm font-sofia"
                    placeholder="First name"
                  />
                </div>

                <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[14px] sm:text-[16px] md:text-[18px] font-medium mb-2">
                    Last Name *
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    onBlur={() => handleInputBlur("lastName")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 text-sm font-sofia"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Full width fields */}
              <div className="space-y-4 sm:space-y-6">
                <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[14px] sm:text-[16px] md:text-[18px] font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleInputBlur("email")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 text-sm font-sofia"
                    placeholder="Email address"
                  />
                </div>

                <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[14px] sm:text-[16px] md:text-[18px] font-medium mb-2">
                    Organization *
                  </label>
                  <Input
                    value={formData.organization}
                    onChange={(e) =>
                      handleInputChange("organization", e.target.value)
                    }
                    onBlur={() => handleInputBlur("organization")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 text-sm font-sofia"
                    placeholder="Organization"
                  />
                </div>
                <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[14px] sm:text-[16px] md:text-[18px] font-medium mb-2">
                    Approximate Team Size *
                  </label>
                  <Input
                    value={formData.teamSize}
                    onChange={(e) =>
                      handleInputChange("teamSize", e.target.value)
                    }
                    onBlur={() => handleInputBlur("teamSize")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 text-sm font-sofia"
                    placeholder="e.g., 10-50 employees"
                  />
                </div>

                <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[14px] sm:text-[16px] md:text-[18px] font-medium mb-2">
                    What challenge or opportunity brings you here? *
                  </label>
                  <Input
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    onBlur={() => handleInputBlur("message")}
                    placeholder="Tell us about your challenge or opportunity..."
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 text-sm font-sofia"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-start">
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`bg-[#1c1c1c] text-white rounded-lg px-6 py-3 font-helvetica font-semibold text-[14px] sm:text-[16px] hover:bg-[#2d2d2d] transition-all duration-200 h-auto ${
                    !isFormValid() || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>

              {getErrorMessages().length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <ul className="list-disc list-inside space-y-1">
                    {getErrorMessages().map((error, index) => (
                      <li
                        key={index}
                        className="text-red-700 text-xs font-sofia"
                      >
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>

        <div
          className={`w-full py-4 ${getAnimationClasses(1)}`}
          style={getAnimationDelay(1)}
        >
          <Footer />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden w-full h-[100dvh] min-h-[100dvh] lg:flex lg:flex-col lg:items-start lg:justify-between">
        <div className="w-full max-w-[1280px] mx-auto lg:py-16 lg:px-[52px] flex-1 overflow-y-auto">
          <div className="w-full">
            <div
              className={`mb-8 sm:mb-12 ${getTitleAnimationClasses()}`}
              style={getTitleAnimationDelay()}
            >
              <UpdatedHeading>Get in Touch</UpdatedHeading>
            </div>

            {submitSuccess && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-center font-medium">
                  Thank you! Your message has been sent successfully. We'll get
                  back to you soon.
                </p>
              </div>
            )}

            {submitError && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-center font-medium">
                  {submitError}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 ${getAnimationClasses(
                0
              )}`}
              style={getAnimationDelay(0)}
            >
              <div className="space-y-6">
                <div className="min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                    First Name *
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    onBlur={() => handleInputBlur("firstName")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-3 text-base font-sofia"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleInputBlur("email")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-3 text-base font-sofia"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                    Last Name *
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    onBlur={() => handleInputBlur("lastName")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-3 text-base font-sofia"
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                    Organization *
                  </label>
                  <Input
                    value={formData.organization}
                    onChange={(e) =>
                      handleInputChange("organization", e.target.value)
                    }
                    onBlur={() => handleInputBlur("organization")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-3 text-base font-sofia"
                    placeholder="Enter your organization"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                    Approximate Team Size *
                  </label>
                  <Input
                    value={formData.teamSize}
                    onChange={(e) =>
                      handleInputChange("teamSize", e.target.value)
                    }
                    onBlur={() => handleInputBlur("teamSize")}
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-3 text-base font-sofia"
                    placeholder="e.g., 10-50 employees"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="min-h-[80px] flex flex-col">
                  <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                    What challenge or opportunity brings you here? *
                  </label>
                  <Input
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    onBlur={() => handleInputBlur("message")}
                    placeholder="Tell us about your challenge or opportunity..."
                    className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-3 text-base font-sofia resize-none h-[38px] overflow-y-hidden"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-start items-center gap-4">
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className={`bg-[#1c1c1c] text-white rounded-lg px-8 py-4 font-helvetica font-semibold text-[20px] hover:bg-[#2d2d2d] transition-all duration-200 h-auto ${
                    !isFormValid() || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {getErrorMessages().length > 0 && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      {getErrorMessages().map((error, index) => (
                        <li
                          key={index}
                          className="text-red-700 text-sm font-sofia"
                        >
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div
          className={`w-full max-w-[1280px] mx-auto ${getAnimationClasses(1)}`}
          style={getAnimationDelay(1)}
        >
          <Footer />
        </div>
      </div>
    </section>
  );
};
