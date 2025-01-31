// app/lib/api/evolutions.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface Evolution {
  id: number;
  year: number;
  short_description: string;
  image: string | null;
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

export interface EvolutionDetail extends Evolution {
  timeline_data: any;
  decade_events: Evolution[];
  years_since: number;
  next_evolution: Evolution | null;
  previous_evolution: Evolution | null;
}

export interface TimelineEvent {
  id: number;
  year: number;
  short_description: string;
  image_url: string | null;
  decade: number;
  years_since: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface DecadeData {
  events: TimelineEvent[];
  count: number;
}

export interface TimelineData {
  [decade: string]: DecadeData;
}

export interface Decade {
  value: number;
  label: string;
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

export interface EvolutionFilters {
  page?: number;
  per_page?: number;
  search?: string;
  decade?: number;
  year?: number;
  comparison?: "before" | "after" | "exact";
}

// API Functions
export async function getEvolutions(filters: EvolutionFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 15).toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.decade && { decade: filters.decade.toString() }),
    ...(filters.year && {
      year: filters.year.toString(),
      ...(filters.comparison && { comparison: filters.comparison })
    })
  });

  const response = await axios.get<PaginatedResponse<Evolution>>(
    `${API_URL}/evolutions?${params}`
  );
  return response.data;
}

export async function getEvolutionDetail(id: number) {
  const response = await axios.get<{ data: EvolutionDetail }>(
    `${API_URL}/evolutions/${id}`
  );
  return response.data.data;
}

export async function getDecades() {
  const response = await axios.get<{ data: Decade[] }>(
    `${API_URL}/evolutions/decades`
  );
  return response.data.data;
}

export async function getTimeline(decade?: number) {
  const params = new URLSearchParams(
    decade ? { decade: decade.toString() } : {}
  );

  const response = await axios.get<{ data: TimelineData }>(
    `${API_URL}/evolutions/timeline?${params}`
  );
  return response.data.data;
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/evolutions/${id}/download-image`;
}

// Helper function to download image
export async function downloadEvolutionImage(id: number, year: number) {
  const response = await axios.get(getImageDownloadUrl(id), {
    responseType: "blob"
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `evolution-${year}.${getFileExtension(response.headers["content-type"])}`
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
