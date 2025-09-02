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
    <footer className="w-full bg-[#2d2d2d] py-16">
      <div className="max-w-6xl px-[52px]">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="font-light text-white text-xl leading-5">
                First Name *
              </label>
              <div className="border-b border-white">
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  onBlur={() => handleInputBlur("firstName")}
                  className="bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0"
                  placeholder=""
                />
              </div>
              {errors.firstName && touched.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-light text-white text-xl leading-5">
                Email *
              </label>
              <div className="border-b border-white">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => handleInputBlur("email")}
                  className="bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0"
                  placeholder=""
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="font-light text-white text-xl leading-5">
                Last Name *
              </label>
              <div className="border-b border-white">
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  onBlur={() => handleInputBlur("lastName")}
                  className="bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0"
                  placeholder=""
                />
              </div>
              {errors.lastName && touched.lastName && (
                <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-light text-white text-xl leading-5">
                Organization *
              </label>
              <div className="border-b border-white">
                <Input
                  value={formData.organization}
                  onChange={(e) =>
                    handleInputChange("organization", e.target.value)
                  }
                  onBlur={() => handleInputBlur("organization")}
                  className="bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0"
                  placeholder=""
                />
              </div>
              {errors.organization && touched.organization && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.organization}
                </p>
              )}
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2">
              <label className="font-light text-white text-xl leading-5">
                Approximate Team Size *
              </label>
              <div className="border-b border-white">
                <Input
                  value={formData.teamSize}
                  onChange={(e) =>
                    handleInputChange("teamSize", e.target.value)
                  }
                  onBlur={() => handleInputBlur("teamSize")}
                  className="bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0"
                  placeholder=""
                />
              </div>
              {errors.teamSize && touched.teamSize && (
                <p className="text-red-400 text-xs mt-1">{errors.teamSize}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="font-light text-white text-xl leading-[11px]">
                What challenge or opportunity brings you here? *
              </label>
              <div className="border-b border-white">
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  onBlur={() => handleInputBlur("message")}
                  placeholder="Write your message.."
                  className="bg-transparent border-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 resize-none min-h-[60px]"
                />
              </div>
              {errors.message && touched.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`bg-[#fdfdfe] text-[#2d2d2d] rounded-[28px] px-8 py-3 font-bold text-xl hover:bg-white/90 h-auto transition-all ${
                !isFormValid() || isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#2d2d2d] border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>
        </form>
      </div>
    </footer>
  );
};
