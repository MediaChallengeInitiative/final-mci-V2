// app/lib/api/solution.ts

import axios from "axios";
import {
  Solution,
  SolutionsResponse,
  SingleSolutionResponse,
  GetSolutionsParams,
  GetSolutionBySlug,
  GetSolutions
} from "@/types/solution";

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
        error.response.data.errors || {}
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

/**
 * Get a paginated list of solutions with optional filters
 */
export const getSolutions: GetSolutions = async ({
  page = 1,
  per_page = 12,
  search,
  with_media = false
} = {}) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: per_page.toString(),
      with_media: with_media.toString(),
      ...(search && { search })
    });

    const response = await axios.get<SolutionsResponse>(
      `${API_URL}/solutions?${params}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get a solution by slug
 */
export const getSolutionBySlug: GetSolutionBySlug = async (slug: string) => {
  try {
    const response = await axios.get<SingleSolutionResponse>(
      `${API_URL}/solutions/${slug}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

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
 * Get download URL for solution icon
 */
export function getIconDownloadUrl(id: number): string {
  return `${API_URL}/solutions/${id}/download-icon`;
}

/**
 * Get download URL for solution cover image
 */
export function getCoverImageDownloadUrl(id: number): string {
  return `${API_URL}/solutions/${id}/download-cover-image`;
}

/**
 * Download a file (icon or cover image)
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

// Export all functions as a default object
export default {
  getSolutions,
  getSolutionBySlug,
  getStorageUrl,
  getIconDownloadUrl,
  getCoverImageDownloadUrl,
  downloadFile
};
