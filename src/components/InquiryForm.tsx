"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MessageSquare,
  Loader2,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true
});

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  subject: "",
  message: ""
};

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Reset success message after 5 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (success) {
      timeoutId = setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 5000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [success]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "first_name":
      case "last_name":
        return value.trim() === "" ? "This field is required" : "";
      case "email":
        return value.trim() === ""
          ? "Email is required"
          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? "Invalid email address"
          : "";
      case "message":
        return value.trim() === ""
          ? "Message is required"
          : value.length < 10
          ? "Message must be at least 10 characters"
          : "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "subject") {
        // Subject is optional
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) {
          errors[key] = error;
        }
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const submitInquiry = async (data: FormData) => {
    try {
      // First get CSRF cookie if using Laravel Sanctum
      await axios.get(`${API_URL}/sanctum/csrf-cookie`);

      const response = await api.post("/inquiries", data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        throw new Error(errorMessages.join("\n"));
      }
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while submitting your inquiry"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitInquiry(formData);
      setSuccess(true);
      setFormData(initialFormState);
      setTouched({});
      setFormErrors({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 text-green-600 border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Your message has been sent successfully! We'll get back to you soon.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your first name"
            required
            disabled={isLoading}
            className={
              formErrors.first_name && touched.first_name
                ? "border-red-500"
                : ""
            }
          />
          {formErrors.first_name && touched.first_name && (
            <p className="text-sm text-red-500">{formErrors.first_name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your last name"
            required
            disabled={isLoading}
            className={
              formErrors.last_name && touched.last_name ? "border-red-500" : ""
            }
          />
          {formErrors.last_name && touched.last_name && (
            <p className="text-sm text-red-500">{formErrors.last_name}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email address"
          required
          disabled={isLoading}
          className={formErrors.email && touched.email ? "border-red-500" : ""}
        />
        {formErrors.email && touched.email && (
          <p className="text-sm text-red-500">{formErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject (Optional)</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter message subject"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your message"
          required
          className={`min-h-32 ${
            formErrors.message && touched.message ? "border-red-500" : ""
          }`}
          disabled={isLoading}
        />
        {formErrors.message && touched.message && (
          <p className="text-sm text-red-500">{formErrors.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
