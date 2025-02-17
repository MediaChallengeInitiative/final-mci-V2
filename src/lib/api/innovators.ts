// lib/api/innovators.ts
import axios from "axios";
import {
  BaseInnovator,
  Innovator,
  InnovatorsResponse,
  SingleInnovatorResponse,
  PaginationMeta
} from "@/types/innovator";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Central error handling function
function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      throw new ApiError(
        error.response.status,
        error.response.data.message || "An error occurred",
        error.response.data.errors
      );
    } else if (error.request) {
      throw new ApiError(0, "No response received from server", {});
    }
  }
  throw new ApiError(
    0,
    error instanceof Error ? error.message : "An unexpected error occurred",
    {}
  );
}

interface GetInnovatorsParams {
  page?: number;
  per_page?: number;
  search?: string;
}

/**
 * Get a paginated list of innovators with optional filters
 */
export async function getInnovators({
  page = 1,
  per_page = 10,
  search
}: GetInnovatorsParams = {}): Promise<InnovatorsResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: per_page.toString(),
      ...(search && { search })
    });

    const response = await axios.get<InnovatorsResponse>(
      `${API_URL}/innovators?${params}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Get featured innovators
 */
export async function getFeaturedInnovators(
  limit = 3
): Promise<BaseInnovator[]> {
  try {
    const params = new URLSearchParams({ limit: limit.toString() });
    const response = await axios.get<{ data: BaseInnovator[] }>(
      `${API_URL}/innovators/featured?${params}`
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Get a specific innovator by ID
 */
export async function getInnovator(id: number): Promise<Innovator> {
  try {
    const response = await axios.get<SingleInnovatorResponse>(
      `${API_URL}/innovators/${id}`
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Get an innovator by slug
 */
export async function getInnovatorBySlug(slug: string): Promise<Innovator> {
  try {
    const response = await axios.get<SingleInnovatorResponse>(
      `${API_URL}/innovators/slug/${slug}`
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Utility function to get storage URL for images
 */
export function getStorageUrl(path: string | null): string {
  if (!path) return "/images/placeholder.jpg";

  // Remove /api from the URL if it exists and ensure no double slashes
  const baseUrl = (API_URL || "").replace(/\/api\/?$/, "").replace(/\/$/, "");
  return `${baseUrl}/storage/${path}`;
}

/**
 * Get download URL for innovator logo
 */
export function getLogoDownloadUrl(id: number): string {
  return `${API_URL}/innovators/${id}/download-logo`;
}

/**
 * Get download URL for innovator image
 */
export function getImageDownloadUrl(id: number): string {
  return `${API_URL}/innovators/${id}/download-image`;
}

/**
 * Download a file (logo or image)
 */
export async function downloadFile(
  url: string,
  filename: string
): Promise<void> {
  try {
    const response = await axios.get(url, {
      responseType: "blob"
    });

    // Create blob URL and trigger download
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    handleApiError(error);
  }
}

// Add response interceptor for consistent error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

// Export all functions as a default object
export default {
  getInnovators,
  getFeaturedInnovators,
  getInnovator,
  getInnovatorBySlug,
  getStorageUrl,
  getLogoDownloadUrl,
  getImageDownloadUrl,
  downloadFile
};
