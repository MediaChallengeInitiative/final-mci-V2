// app/lib/api/company-values.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface CompanyValue {
  id: number;
  name: string;
  description: string;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  creator: {
    id: number;
    name: string;
  } | null;
  updater: {
    id: number;
    name: string;
  } | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface CompanyValueFilters {
  page?: number;
  search?: string;
  active?: boolean;
  recent?: boolean;
}

// API Functions
export async function getCompanyValues(filters: CompanyValueFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.active && { active: "true" }),
    ...(filters.recent && { recent: "true" })
  });

  const response = await axios.get<PaginatedResponse<CompanyValue>>(
    `${API_URL}/values?${params}`
  );
  return response.data;
}

export async function getCompanyValue(id: number) {
  const response = await axios.get<{ data: CompanyValue }>(
    `${API_URL}/values/${id}`
  );
  return response.data.data;
}

export async function exportCompanyValues() {
  const response = await axios.get<{ data: CompanyValue[] }>(
    `${API_URL}/values/export`
  );
  return response.data.data;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/values/${id}/download-image`;
}

// Helper function to download image
export async function downloadCompanyValueImage(id: number, filename?: string) {
  const response = await axios.get(getImageDownloadUrl(id), {
    responseType: "blob"
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename || `company-value-${id}-image`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

// Example usage for error handling
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Axios error interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new ApiError(
        error.response.status,
        error.response.data.message || "An error occurred",
        error.response.data.errors
      );
    }
    throw error;
  }
);
