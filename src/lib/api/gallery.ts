// app/lib/api/gallery.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface GalleryImage {
  id: number;
  title: string;
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

export interface PublicGalleryImage {
  id: number;
  title: string;
  image_url: string | null;
  thumbnail_url: string | null;
  category: string;
  publish_date: string;
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

export interface GalleryFilters {
  page?: number;
  per_page?: number;
  search?: string;
  category?: number;
  published?: boolean;
}

// API Functions
export async function getGalleryImages(filters: GalleryFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 12).toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.category && { category: filters.category.toString() }),
    ...(filters.published && { published: "true" })
  });

  const response = await axios.get<PaginatedResponse<GalleryImage>>(
    `${API_URL}/gallery?${params}`
  );
  return response.data;
}

export async function getGalleryImage(id: number) {
  const response = await axios.get<{ data: GalleryImage }>(
    `${API_URL}/gallery/${id}`
  );
  return response.data.data;
}

export async function getCategories() {
  const response = await axios.get<{ data: Category[] }>(
    `${API_URL}/gallery/categories`
  );
  return response.data.data;
}

export async function getLatestImages(
  params: { limit?: number; category?: number } = {}
) {
  const queryParams = new URLSearchParams({
    ...(params.limit && { limit: params.limit.toString() }),
    ...(params.category && { category: params.category.toString() })
  });

  const response = await axios.get<{ data: PublicGalleryImage[] }>(
    `${API_URL}/gallery/latest?${queryParams}`
  );
  return response.data.data;
}

export async function getImagesByCategory(categoryId: number, limit?: number) {
  const params = new URLSearchParams(limit ? { limit: limit.toString() } : {});

  const response = await axios.get<{ data: PublicGalleryImage[] }>(
    `${API_URL}/gallery/category/${categoryId}?${params}`
  );
  return response.data.data;
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
}

export function getDownloadUrl(id: number) {
  return `${API_URL}/gallery/${id}/download`;
}

// Helper function to download image
export async function downloadGalleryImage(id: number, title: string) {
  const response = await axios.get(getDownloadUrl(id), {
    responseType: "blob"
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${title}.${getFileExtension(response.headers["content-type"])}`
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

// Helper function to get file extension from MIME type
function getFileExtension(mimeType: string | undefined) {
  if (!mimeType) return "jpg";
  const lookup: { [key: string]: string } = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp"
  };
  return lookup[mimeType] || "jpg";
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
