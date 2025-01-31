// app/lib/api/slides.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface Slide {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  category_id: number;
  publish_date: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
  };
  creator?: {
    id: number;
    name: string;
  };
  updater?: {
    id: number;
    name: string;
  };
}

export interface Category {
  id: number;
  name: string;
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

export interface SlideFilters {
  page?: number;
  per_page?: number;
  search?: string;
  category?: number;
  published?: boolean;
}

export interface PublicSlide {
  id: number;
  title: string;
  image_url: string | null;
  category: string;
  publish_date: string;
}

// API Functions
export async function getSlides(filters: SlideFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 10).toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.category && { category: filters.category.toString() }),
    ...(filters.published && { published: "true" })
  });

  const response = await axios.get<PaginatedResponse<Slide>>(
    `${API_URL}/slides?${params}`
  );
  return response.data;
}

export async function getSlide(id: number) {
  const response = await axios.get<{ data: Slide }>(`${API_URL}/slides/${id}`);
  return response.data.data;
}

export async function getCategories() {
  const response = await axios.get<{ data: Category[] }>(
    `${API_URL}/slides/categories`
  );
  return response.data.data;
}

export async function getLatestSlides(limit: number = 5) {
  const response = await axios.get<{ data: PublicSlide[] }>(
    `${API_URL}/slides/latest?limit=${limit}`
  );
  return response.data.data;
}

export function getImageUrl(path: string) {
  return `${API_URL}/storage/${path}`;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/slides/${id}/download-image`;
}

// Helper function to download image
export async function downloadSlideImage(id: number, filename?: string) {
  const response = await axios.get(getImageDownloadUrl(id), {
    responseType: "blob"
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename || `slide-${id}-image`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
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
