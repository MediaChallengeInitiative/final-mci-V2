"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";

// Types
export interface InquiryFormData {
  first_name: string;
  last_name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// API Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true
});

/**
 * Extracts error message from API error response
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const apiError = error.response.data as ApiError;

    // Check for validation errors
    if (apiError.errors) {
      return Object.values(apiError.errors).flat().join("\n");
    }

    // Check for error message
    if (apiError.message) {
      return apiError.message;
    }
  }

  // Default error message
  return "An error occurred while submitting your inquiry";
}

/**
 * Submit a new inquiry
 */
export async function submitInquiry(
  formData: InquiryFormData
): Promise<InquiryResponse> {
  try {
    // First get CSRF cookie if using Laravel Sanctum
    await axios.get(`${API_URL}/sanctum/csrf-cookie`);

    // Submit the inquiry
    const response = await api.post<InquiryResponse>("/inquiries", formData);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

/**
 * Custom hook for handling inquiry form submission state
 */
export function useInquirySubmission() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (
    formData: InquiryFormData
  ): Promise<InquiryResponse> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await submitInquiry(formData);
      setSuccess(true);
      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : getErrorMessage(error);
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    submit,
    isLoading,
    error,
    success,
    resetState
  } as const;
}

// Add response interceptor to handle common API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration or authentication errors
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
      window.location.href = "/login";
    }

    // Handle CSRF token mismatch
    if (error.response?.status === 419) {
      // Refresh CSRF token and retry the request
      return axios
        .get(`${API_URL}/sanctum/csrf-cookie`)
        .then(() => api.request(error.config));
    }

    return Promise.reject(error);
  }
);
