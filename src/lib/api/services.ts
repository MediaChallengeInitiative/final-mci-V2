// app/lib/api/services.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface Service {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string | null;
  category_id: number;
  published_at: string | null;
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

export interface ServiceFilters {
  page?: number;
  per_page?: number;
  search?: string;
  category?: number;
  published?: boolean;
}

export interface PublicService {
  id: number;
  title: string;
  description: string;
  slug: string;
  image_url: string | null;
  category: string;
  published_at: string;
}

// API Functions
export async function getServices(filters: ServiceFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 10).toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.category && { category: filters.category.toString() }),
    ...(filters.published && { published: "true" })
  });

  const response = await axios.get<PaginatedResponse<Service>>(
    `${API_URL}/services?${params}`
  );
  return response.data;
}

export async function getService(id: number) {
  const response = await axios.get<{ data: Service }>(
    `${API_URL}/services/${id}`
  );
  return response.data.data;
}

export async function getServiceBySlug(slug: string) {
  const response = await axios.get<{ data: Service }>(
    `${API_URL}/services/slug/${slug}`
  );
  return response.data.data;
}

export async function getCategories() {
  const response = await axios.get<{ data: Category[] }>(
    `${API_URL}/services/categories`
  );
  return response.data.data;
}

export async function getLatestServices(
  params: { limit?: number; category?: number } = {}
) {
  const queryParams = new URLSearchParams({
    ...(params.limit && { limit: params.limit.toString() }),
    ...(params.category && { category: params.category.toString() })
  });

  const response = await axios.get<{ data: PublicService[] }>(
    `${API_URL}/services/latest?${queryParams}`
  );
  return response.data.data;
}

export async function getServicesByCategory(
  categoryId: number,
  limit?: number
) {
  const params = new URLSearchParams(limit ? { limit: limit.toString() } : {});

  const response = await axios.get<{ data: PublicService[] }>(
    `${API_URL}/services/category/${categoryId}?${params}`
  );
  return response.data.data;
}

export function getImageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/services/${id}/download-image`;
}

// Helper function to download image
export async function downloadServiceImage(id: number, filename?: string) {
  const response = await axios.get(getImageDownloadUrl(id), {
    responseType: "blob"
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename || `service-${id}-image`);
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
