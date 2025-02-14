// lib/api/history.ts

import axios from "axios";
import {
  History,
  TimelineEntry,
  HistoryDetail,
  Statistics,
  HistoriesResponse,
  TimelineResponse,
  SingleHistoryResponse,
  HistoryDetailResponse,
  StatisticsResponse
} from "@/types/history";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface HistoryFilters {
  page?: number;
  per_page?: number;
  search?: string;
}

export async function getHistoryEntries(filters: HistoryFilters = {}) {
  const params = new URLSearchParams({
    page: (filters.page || 1).toString(),
    per_page: (filters.per_page || 10).toString(),
    ...(filters.search && { search: filters.search })
  });

  const response = await axios.get<HistoriesResponse>(
    `${API_URL}/histories?${params}`
  );
  return response.data;
}

export async function getHistoryTimeline() {
  const response = await axios.get<TimelineResponse>(
    `${API_URL}/histories/timeline`
  );
  return response.data;
}

export async function getHistoryEntry(id: number) {
  const response = await axios.get<SingleHistoryResponse>(
    `${API_URL}/histories/${id}`
  );
  return response.data;
}

export async function getHistoryEntryBySlug(slug: string) {
  const response = await axios.get<HistoryDetailResponse>(
    `${API_URL}/histories/slug/${slug}`
  );
  return response.data;
}

export async function getHistoryStatistics() {
  const response = await axios.get<StatisticsResponse>(
    `${API_URL}/histories/statistics`
  );
  return response.data;
}

export function getImageUrl(path: string | null) {
  if (!path) return null;
  return `${API_URL}/storage/${path}`;
}

export function getImageDownloadUrl(id: number) {
  return `${API_URL}/histories/${id}/download-image`;
}

export async function downloadHistoryImage(id: number, title: string) {
  try {
    const response = await axios.get(getImageDownloadUrl(id), {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Get file extension from content-type
    const contentType = response.headers["content-type"];
    const extension = getFileExtension(contentType);

    link.setAttribute("download", `${title}.${extension}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
}

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

export function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Error Handling
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
