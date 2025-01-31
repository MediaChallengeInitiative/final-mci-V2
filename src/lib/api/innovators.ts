// app/lib/api/innovators.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface Innovator {
  id: number;
  name: string;
  short_description: string;
  website_link: string | null;
  logo: string | null;
  image: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
  creator?: {
    id: number;
    name: string;
  };
  updater?: {
    id: number;
    name: string;
  };
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

export interface InnovatorFilters {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface FeaturedInnovator {
  id: number;
  name: string;
  short_description: string;
  website_link: string | null;
  logo_url: string | null;
  image_url: string | null;
  slug: string;
}

// API Functions
export async function getInnovators(filters: InnovatorFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 10).toString(),
    ...(filters.search && { search: filters.search })
  });

  const response = await axios.get<PaginatedResponse<Innovator>>(
    `${API_URL}/innovators?${params}`
  );
  return response.data;
}

export async function getInnovator(id: number) {
  const response = await axios.get<{ data: Innovator }>(
    `${API_URL}/innovators/${id}`
  );
  return response.data.data;
}

export async function getInnovatorBySlug(slug: string) {
  const response = await axios.get<{ data: Innovator }>(
    `${API_URL}/innovators/slug/${slug}`
  );
  return response.data.data;
}

export async function getFeaturedInnovators(limit: number = 3) {
  const response = await axios.get<{ data: FeaturedInnovator[] }>(
    `${API_URL}/innovators/featured?limit=${limit}`
  );
  return response.data.data;
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
}

export function getLogoDownloadUrl(id: number) {
  return `${API_URL}/innovators/${id}/download-logo`;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/innovators/${id}/download-image`;
}

// Helper function to download files
export async function downloadInnovatorFile(url: string, filename: string) {
  const response = await axios.get(url, {
    responseType: "blob"
  });

  const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}

// Error handling
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
