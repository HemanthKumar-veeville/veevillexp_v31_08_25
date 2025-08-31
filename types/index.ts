// Shared types for Veevillexp components

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

export interface TestimonialCardProps {
  quote: string;
  author: string;
  company: string;
  className?: string;
}

export interface AudienceCardProps {
  title: string;
  className?: string;
}

export interface FormFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  className?: string;
}
