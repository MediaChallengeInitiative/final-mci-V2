// app/lib/api/platforms.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Platform {
  id: number;
  name: string;
  link: string;
  description: string;
  logo_url: string | null;
  created_at: string;
}

interface PlatformLogo {
  id: number;
  name: string;
  link: string;
  logo_url: string;
}

export async function getPlatforms(
  search?: string
): Promise<{ data: Platform[] }> {
  const params = new URLSearchParams(search ? { search } : {});
  const response = await axios.get(`${API_URL}/platforms?${params}`);
  return response.data;
}

export async function getPlatform(name: string): Promise<{ data: Platform }> {
  const response = await axios.get(
    `${API_URL}/platforms/${encodeURIComponent(name)}`
  );
  return response.data;
}

export async function getRecentPlatforms(): Promise<{ data: Platform[] }> {
  const response = await axios.get(`${API_URL}/platforms/recent`);
  return response.data;
}

export async function getPlatformLogos(): Promise<{ data: PlatformLogo[] }> {
  const response = await axios.get(`${API_URL}/platforms/logos`);
  return response.data;
}
