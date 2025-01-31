// app/lib/api/programs.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
export interface Program {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  featured_image_path: string | null;
  is_active: boolean;
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

export interface ProgramDetail extends Program {
  is_ongoing: boolean;
  duration: number;
}

export interface UpcomingProgram {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  featured_image_url: string | null;
  duration: number;
  days_until_start: number;
}

export interface OngoingProgram {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  featured_image_url: string | null;
  duration: number;
  days_until_end: number;
}

export interface ProgramStatistics {
  total: number;
  active: number;
  upcoming: number;
  ongoing: number;
  completed: number;
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

export interface ProgramFilters {
  page?: number;
  per_page?: number;
  search?: string;
  active?: boolean;
  status?: "upcoming" | "ongoing" | "completed";
  recent?: boolean;
}

// API Functions
export async function getPrograms(filters: ProgramFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 15).toString(),
    ...(filters.search && { search: filters.search }),
    ...(filters.active && { active: "true" }),
    ...(filters.status && { status: filters.status }),
    ...(filters.recent && { recent: "true" })
  });

  const response = await axios.get<PaginatedResponse<Program>>(
    `${API_URL}/programs?${params}`
  );
  return response.data;
}

export async function getProgram(id: number) {
  const response = await axios.get<{ data: ProgramDetail }>(
    `${API_URL}/programs/${id}`
  );
  return response.data.data;
}

export async function getProgramStatistics() {
  const response = await axios.get<{ data: ProgramStatistics }>(
    `${API_URL}/programs/statistics`
  );
  return response.data.data;
}

export async function getUpcomingPrograms(limit: number = 5) {
  const response = await axios.get<{ data: UpcomingProgram[] }>(
    `${API_URL}/programs/upcoming?limit=${limit}`
  );
  return response.data.data;
}

export async function getOngoingPrograms(limit: number = 5) {
  const response = await axios.get<{ data: OngoingProgram[] }>(
    `${API_URL}/programs/ongoing?limit=${limit}`
  );
  return response.data.data;
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/programs/${id}/download-image`;
}

// Helper function to download image
export async function downloadProgramImage(id: number, programName: string) {
  const response = await axios.get(getImageDownloadUrl(id), {
    responseType: "blob"
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${programName}.${getFileExtension(response.headers["content-type"])}`
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
