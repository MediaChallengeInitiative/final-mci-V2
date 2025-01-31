// app/lib/api/history.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface HistoryEntry {
  id: number;
  title: string;
  description: string;
  slug: string;
  image: string | null;
  order: number;
  created_at: string;
  updated_at: string;
  creator?: {
    id: number;
    name: string;
  };
}

export interface TimelineEntry {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  order: number;
  slug: string;
}

export interface HistoryDetail {
  current: HistoryEntry;
  previous: HistoryEntry | null;
  next: HistoryEntry | null;
}

export interface Statistics {
  total_entries: number;
  with_images: number;
  latest_addition: string | null;
  last_update: string | null;
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

export interface HistoryFilters {
  page?: number;
  per_page?: number;
  search?: string;
}

// API Functions
export async function getHistoryEntries(filters: HistoryFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 10).toString(),
    ...(filters.search && { search: filters.search })
  });

  const response = await axios.get<PaginatedResponse<HistoryEntry>>(
    `${API_URL}/history?${params}`
  );
  return response.data;
}

export async function getHistoryTimeline() {
  const response = await axios.get<{ data: TimelineEntry[] }>(
    `${API_URL}/history/timeline`
  );
  return response.data.data;
}

export async function getHistoryEntry(id: number) {
  const response = await axios.get<{ data: HistoryEntry }>(
    `${API_URL}/history/${id}`
  );
  return response.data.data;
}

export async function getHistoryEntryBySlug(slug: string) {
  const response = await axios.get<{ data: HistoryDetail }>(
    `${API_URL}/history/slug/${slug}`
  );
  return response.data.data;
}

export async function getHistoryStatistics() {
  const response = await axios.get<{ data: Statistics }>(
    `${API_URL}/history/statistics`
  );
  return response.data.data;
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/history/${id}/download-image`;
}

// Helper function to download image
export async function downloadHistoryImage(id: number, title: string) {
  const response = await axios.get(getImageDownloadUrl(id), {
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

// Helper function to format date
export function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
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
