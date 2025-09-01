"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FormLabel,
  FormButton,
  MobileCategoryLabel,
  MobileDescription,
} from "@/components/ui/typography";

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

  return (
    <section className="w-screen bg-[#2d2d2d] px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-12 md:py-16">
      {submitSuccess && (
        <div className="mb-8 p-4 bg-green-600/20 border border-green-500/50 rounded-lg">
          <p className="text-green-400 text-center">
            Thank you! Your message has been sent successfully. We'll get back
            to you soon.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 max-w-full lg:max-w-[calc(100%-350px)]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-2">
            {/* Mobile Label */}
            <div className="block lg:hidden">
              <MobileCategoryLabel as={Label} className="text-white">
                First Name *
              </MobileCategoryLabel>
            </div>
            {/* Desktop Label */}
            <div className="hidden lg:block">
              <FormLabel as={Label} className="text-sm sm:text-base md:text-xl">
                First Name *
              </FormLabel>
            </div>
            <Input
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              onBlur={() => handleInputBlur("firstName")}
              className={`bg-transparent border-0 border-b-2 rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base transition-colors ${
                errors.firstName && touched.firstName
                  ? "border-red-400 focus:border-red-400"
                  : "border-white focus:border-white"
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && touched.firstName && (
              <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            {/* Mobile Label */}
            <div className="block lg:hidden">
              <MobileCategoryLabel as={Label} className="text-white">
                Last Name *
              </MobileCategoryLabel>
            </div>
            {/* Desktop Label */}
            <div className="hidden lg:block">
              <FormLabel as={Label} className="text-sm sm:text-base md:text-xl">
                Last Name *
              </FormLabel>
            </div>
            <Input
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              onBlur={() => handleInputBlur("lastName")}
              className={`bg-transparent border-0 border-b-2 rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base transition-colors ${
                errors.lastName && touched.lastName
                  ? "border-red-400 focus:border-red-400"
                  : "border-white focus:border-white"
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && touched.lastName && (
              <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-2">
            {/* Mobile Label */}
            <div className="block lg:hidden">
              <MobileCategoryLabel as={Label} className="text-white">
                Email *
              </MobileCategoryLabel>
            </div>
            {/* Desktop Label */}
            <div className="hidden lg:block">
              <FormLabel as={Label} className="text-sm sm:text-base md:text-xl">
                Email *
              </FormLabel>
            </div>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => handleInputBlur("email")}
              className={`bg-transparent border-0 border-b-2 rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base transition-colors ${
                errors.email && touched.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-white focus:border-white"
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && touched.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            {/* Mobile Label */}
            <div className="block lg:hidden">
              <MobileCategoryLabel as={Label} className="text-white">
                Organization *
              </MobileCategoryLabel>
            </div>
            {/* Desktop Label */}
            <div className="hidden lg:block">
              <FormLabel as={Label} className="text-sm sm:text-base md:text-xl">
                Organization *
              </FormLabel>
            </div>
            <Input
              value={formData.organization}
              onChange={(e) =>
                handleInputChange("organization", e.target.value)
              }
              onBlur={() => handleInputBlur("organization")}
              className={`bg-transparent border-0 border-b-2 rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base transition-colors ${
                errors.organization && touched.organization
                  ? "border-red-400 focus:border-red-400"
                  : "border-white focus:border-white"
              }`}
              placeholder="Enter your organization"
            />
            {errors.organization && touched.organization && (
              <p className="text-red-400 text-xs mt-1">{errors.organization}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {/* Mobile Label */}
          <div className="block lg:hidden">
            <MobileCategoryLabel as={Label} className="text-white">
              Approximate Team Size *
            </MobileCategoryLabel>
          </div>
          {/* Desktop Label */}
          <div className="hidden lg:block">
            <FormLabel
              as={Label}
              className="leading-5 text-sm sm:text-base md:text-xl"
            >
              Approximate Team Size *
            </FormLabel>
          </div>
          <Input
            value={formData.teamSize}
            onChange={(e) => handleInputChange("teamSize", e.target.value)}
            onBlur={() => handleInputBlur("teamSize")}
            className={`bg-transparent border-0 border-b-2 rounded-none px-0 pb-2 text-white placeholder:text-white/70 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base transition-colors ${
              errors.teamSize && touched.teamSize
                ? "border-red-400 focus:border-red-400"
                : "border-white focus:border-white"
            }`}
            placeholder="e.g., 10-50 employees"
          />
          {errors.teamSize && touched.teamSize && (
            <p className="text-red-400 text-xs mt-1">{errors.teamSize}</p>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Mobile Label */}
          <div className="block lg:hidden">
            <MobileCategoryLabel as={Label} className="text-white">
              What challenge or opportunity brings you here? *
            </MobileCategoryLabel>
          </div>
          {/* Desktop Label */}
          <div className="hidden lg:block">
            <FormLabel
              as={Label}
              className="leading-[11px] text-sm sm:text-base md:text-xl"
            >
              What challenge or opportunity brings you here? *
            </FormLabel>
          </div>
          <Textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            onBlur={() => handleInputBlur("message")}
            placeholder="Write your message..."
            className={`bg-transparent border-0 border-b-2 rounded-none px-0 pb-2 text-white placeholder:text-white/70 placeholder:[font-family:'Helvetica-Light',Helvetica] placeholder:font-light placeholder:text-base sm:placeholder:text-lg resize-none min-h-[60px] focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base transition-colors ${
              errors.message && touched.message
                ? "border-red-400 focus:border-red-400"
                : "border-white focus:border-white"
            }`}
          />
          {errors.message && touched.message && (
            <p className="text-red-400 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        <div className="flex justify-start pt-4 sm:pt-6 md:pt-8">
          <Button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-[140px] sm:w-auto sm:min-w-[194px] h-10 sm:h-11 rounded-[28px] text-[#2d2d2d] transition-all ${
              isFormValid() && !isSubmitting
                ? "bg-[#fdfdfe] hover:bg-white/90"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#2d2d2d] border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <>
                {/* Mobile Button Text */}
                <div className="block lg:hidden">
                  <MobileCategoryLabel className="text-[#2d2d2d]">
                    Send Message
                  </MobileCategoryLabel>
                </div>
                {/* Desktop Button Text */}
                <div className="hidden lg:block">
                  <FormButton className="text-sm sm:text-base md:text-xl">
                    Send Message
                  </FormButton>
                </div>
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};
