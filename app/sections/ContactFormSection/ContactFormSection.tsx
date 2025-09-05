"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  UpdatedHeading,
  UpdatedHeadingTablet,
} from "@/components/ui/typography";
import { FooterSection } from "../FooterSection/FooterSection";

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

export const ContactFormSection: React.FC = () => {
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
    if (!value.trim()) return "This field is required";
    switch (name) {
      case "email":
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        break;
      case "firstName":
      case "lastName":
        if (value.trim().length < 2) return "Must be at least 2 characters";
        break;
      case "message":
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        break;
    }
    return undefined;
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleInputBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // POSTS to /api/contact -> Next.js route -> Apps Script -> Google Sheet + Email
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
    const hasAnyError = Object.keys(errors).some(
      (key) => errors[key as keyof FormData] && touched[key as keyof FormData]
    );
    return hasAnyError
      ? ["Please fill out all required fields correctly before submitting."]
      : [];
  };

  return (
    <>
      {/* Mobile / Tablet */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-start justify-start h-[100dvh] min-h-[100dvh] space-y-6 sm:space-y-8 md:space-y-10 overflow-y-auto">
        <div className="w-full pt-8 sm:pt-12 md:pt-16">
          <UpdatedHeadingTablet>Get in Touch</UpdatedHeadingTablet>
        </div>

        {submitSuccess && (
          <div className="w-full p-4 sm:p-6 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-center font-medium text-sm sm:text-base">
              Thank you! Your message has been sent successfully. We'll get back
              to you soon.
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
          className="w-full space-y-6 sm:space-y-8 flex-1 pb-8"
        >
          <div className="space-y-6 sm:space-y-8">
            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                First Name *
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                onBlur={() => handleInputBlur("firstName")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia"
                placeholder="Enter your first name"
              />
            </div>

            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                Last Name *
              </label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                onBlur={() => handleInputBlur("lastName")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia"
                placeholder="Enter your last name"
              />
            </div>

            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleInputBlur("email")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia"
                placeholder="Enter your email address"
              />
            </div>

            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                Organization *
              </label>
              <Input
                value={formData.organization}
                onChange={(e) =>
                  handleInputChange("organization", e.target.value)
                }
                onBlur={() => handleInputBlur("organization")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia"
                placeholder="Enter your organization"
              />
            </div>

            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                Approximate Team Size *
              </label>
              <Input
                value={formData.teamSize}
                onChange={(e) => handleInputChange("teamSize", e.target.value)}
                onBlur={() => handleInputBlur("teamSize")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia"
                placeholder="e.g., 10-50 employees"
              />
            </div>

            <div className="min-h-[90px] sm:min-h-[100px] flex flex-col">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                What challenge or opportunity brings you here? *
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                onBlur={() => handleInputBlur("message")}
                placeholder="Tell us about your challenge or opportunity..."
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia resize-none min-h-[60px] sm:min-h-[80px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex justify-start">
              <Button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`bg-[#1c1c1c] text-white rounded-lg px-6 sm:px-8 py-3 sm:py-4 font-helvetica font-semibold text-[16px] sm:text-[18px] md:text-[20px] hover:bg-[#2d2d2d] transition-all duration-200 h-auto ${
                  !isFormValid() || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>

            {getErrorMessages().length > 0 && (
              <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                <ul className="list-disc list-inside space-y-1">
                  {getErrorMessages().map((error, index) => (
                    <li
                      key={index}
                      className="text-red-700 text-xs sm:text-sm font-sofia"
                    >
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>

        <div className="w-full">
          <FooterSection />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden w-full lg:py-16 lg:px-[52px] lg:max-w-[1280px] lg:mx-auto lg:flex lg:flex-col lg:items-start lg:justify-start lg:gap-16">
        <div className="w-full">
          <div className="mb-8 sm:mb-12">
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
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
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

            <div className="md:col-span-2 space-y-6">
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

              <div className="min-h-[100px] flex flex-col">
                <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                  What challenge or opportunity brings you here? *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  onBlur={() => handleInputBlur("message")}
                  placeholder="Tell us about your challenge or opportunity..."
                  className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 rounded-none px-0 py-3 text-base font-sofia resize-none min-h-[80px]"
                />
              </div>

              <div className="flex justify-start items-center gap-4">
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
            </div>
          </form>
        </div>
        <FooterSection />
      </div>
    </>
  );
};
