"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FormLabel,
  FormButton,
  UpdatedHeading,
  UpdatedDescription,
  UpdatedHeadingTablet,
  UpdatedDescriptionTablet,
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

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      emailRegex.test(formData.email) &&
      formData.organization.trim() !== "" &&
      formData.teamSize.trim() !== "" &&
      formData.message.trim() !== ""
    );
  };

  // Validate individual field
  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    if (!value.trim()) {
      return "This field is required";
    }

    switch (name) {
      case "email":
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        break;
      case "firstName":
      case "lastName":
        if (value.trim().length < 2) {
          return "Must be at least 2 characters";
        }
        break;
      case "message":
        if (value.trim().length < 10) {
          return "Message must be at least 10 characters";
        }
        break;
    }
    return undefined;
  };

  // Handle input change
  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle input blur (for validation)
  const handleInputBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
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

    try {
      // Simulate API call - replace with actual submission logic when ready
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Form submission successful - reset everything
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

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      // Optional: show an error toast/message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get all error messages to display above submit button
  const getErrorMessages = () => {
    // Show a single, common error message if there are any errors on touched fields
    const hasAnyError = Object.keys(errors).some(
      (key) => errors[key as keyof FormData] && touched[key as keyof FormData]
    );
    return hasAnyError
      ? ["Please fill out all required fields correctly before submitting."]
      : [];
  };

  return (
    <>
      {/* Mobile Layout (visible only on mobile and tablet up to lg) */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-start justify-start h-[100vh] min-h-[100vh] space-y-6 sm:space-y-8 md:space-y-10 overflow-y-auto">
        {/* Section Heading */}
        <div className="w-full pt-8 sm:pt-12 md:pt-16">
          <UpdatedHeadingTablet>Get in Touch</UpdatedHeadingTablet>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="w-full p-4 sm:p-6 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-center font-medium text-sm sm:text-base">
              Thank you! Your message has been sent successfully. We'll get back
              to you soon.
            </p>
          </div>
        )}

        {/* Contact Form - Mobile */}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-6 sm:space-y-8 flex-1 pb-8"
        >
          {/* Form Fields */}
          <div className="space-y-6 sm:space-y-8">
            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col justify-start">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                First Name *
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                onBlur={() => handleInputBlur("firstName")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia transition-colors"
                placeholder="Enter your first name"
              />
            </div>

            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col justify-start">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                Last Name *
              </label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                onBlur={() => handleInputBlur("lastName")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia transition-colors"
                placeholder="Enter your last name"
              />
            </div>

            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col justify-start">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleInputBlur("email")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col justify-start">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                Organization *
              </label>
              <Input
                value={formData.organization}
                onChange={(e) =>
                  handleInputChange("organization", e.target.value)
                }
                onBlur={() => handleInputBlur("organization")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia transition-colors"
                placeholder="Enter your organization"
              />
            </div>

            <div className="min-h-[70px] sm:min-h-[80px] flex flex-col justify-start">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                Approximate Team Size *
              </label>
              <Input
                value={formData.teamSize}
                onChange={(e) => handleInputChange("teamSize", e.target.value)}
                onBlur={() => handleInputBlur("teamSize")}
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia transition-colors"
                placeholder="e.g., 10-50 employees"
              />
            </div>

            <div className="min-h-[90px] sm:min-h-[100px] flex flex-col justify-start">
              <label className="font-helvetica text-[#1c1c1c] text-[16px] sm:text-[18px] md:text-[20px] font-medium mb-2 sm:mb-3">
                What challenge or opportunity brings you here? *
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                onBlur={() => handleInputBlur("message")}
                placeholder="Tell us about your challenge or opportunity..."
                className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-2 sm:py-3 text-sm sm:text-base font-sofia resize-none min-h-[60px] sm:min-h-[80px] transition-colors"
              />
            </div>
          </div>

          {/* Submit Button and Error Messages */}
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

        {/* Footer for Mobile */}
        <div className="w-full">
          <FooterSection />
        </div>
      </div>

      {/* Desktop Layout (visible only on lg and up) */}
      <div className="hidden w-full lg:py-16 lg:px-[52px] lg:max-w-[1280px] lg:mx-auto lg:py-auto lg:flex lg:flex-col lg:items-start lg:justify-start lg:h-full lg:gap-16">
        <div className="w-full">
          {/* Section Heading */}
          <div className="mb-8 sm:mb-12">
            <UpdatedHeading>Get in Touch</UpdatedHeading>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-center font-medium">
                Thank you! Your message has been sent successfully. We'll get
                back to you soon.
              </p>
            </div>
          )}

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Left Column */}
            <div className="space-y-6">
              <div className="min-h-[80px] flex flex-col justify-start">
                <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                  First Name *
                </label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  onBlur={() => handleInputBlur("firstName")}
                  className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-3 text-base font-sofia transition-colors"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="min-h-[80px] flex flex-col justify-start">
                <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => handleInputBlur("email")}
                  className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-3 text-base font-sofia transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="min-h-[80px] flex flex-col justify-start">
                <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                  Last Name *
                </label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  onBlur={() => handleInputBlur("lastName")}
                  className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-3 text-base font-sofia transition-colors"
                  placeholder="Enter your last name"
                />
              </div>

              <div className="min-h-[80px] flex flex-col justify-start">
                <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                  Organization *
                </label>
                <Input
                  value={formData.organization}
                  onChange={(e) =>
                    handleInputChange("organization", e.target.value)
                  }
                  onBlur={() => handleInputBlur("organization")}
                  className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-3 text-base font-sofia transition-colors"
                  placeholder="Enter your organization"
                />
              </div>
            </div>

            {/* Full Width Fields */}
            <div className="md:col-span-2 space-y-6">
              <div className="min-h-[80px] flex flex-col justify-start">
                <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                  Approximate Team Size *
                </label>
                <Input
                  value={formData.teamSize}
                  onChange={(e) =>
                    handleInputChange("teamSize", e.target.value)
                  }
                  onBlur={() => handleInputBlur("teamSize")}
                  className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-3 text-base font-sofia transition-colors"
                  placeholder="e.g., 10-50 employees"
                />
              </div>

              <div className="min-h-[100px] flex flex-col justify-start">
                <label className="font-helvetica text-[#1c1c1c] text-[20px] font-medium mb-3">
                  What challenge or opportunity brings you here? *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  onBlur={() => handleInputBlur("message")}
                  placeholder="Tell us about your challenge or opportunity..."
                  className="bg-transparent border-0 border-b-2 border-[#e5e5e5] text-[#1c1c1c] placeholder:text-[#2d2d2d]/60 focus:border-b-[#1c1c1c] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-3 text-base font-sofia resize-none min-h-[80px] transition-colors"
                />
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="">
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
                </div>
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
