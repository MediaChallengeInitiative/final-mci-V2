// lib/api/platforms.ts
import axios from "axios";
import {
  Platform,
  PlatformsResponse,
  SinglePlatformResponse,
  PlatformLogo
} from "@/types/platform";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPlatforms(
  search?: string
): Promise<PlatformsResponse> {
  const params = new URLSearchParams(search ? { search } : {});
  const response = await axios.get(`${API_URL}/platforms?${params}`);
  return response.data;
}

export async function getPlatform(
  slug: string
): Promise<SinglePlatformResponse> {
  const response = await axios.get(
    `${API_URL}/platforms/${encodeURIComponent(slug)}`
  );
  return response.data;
}

export async function getRecentPlatforms(
  excludeSlug?: string
): Promise<PlatformsResponse> {
  const params = new URLSearchParams(
    excludeSlug ? { exclude: excludeSlug } : {}
  );
  const response = await axios.get(`${API_URL}/platforms/recent?${params}`);
  return response.data;
}

export async function getPlatformCategories() {
  const response = await axios.get(`${API_URL}/platforms/categories`);
  return response.data;
}

export async function getPlatformLogos(): Promise<{ data: PlatformLogo[] }> {
  const response = await axios.get(`${API_URL}/platforms/logos`);
  return response.data;
}
