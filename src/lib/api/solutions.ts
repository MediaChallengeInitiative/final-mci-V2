// app/lib/api/solutions.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Challenge {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  youtube_url: string | null;
  video_embed_url: string | null;
}

interface Solution {
  id: number;
  name: string;
  slug: string;
  description: string;
  assumption: string | null;
  cover_image_url: string | null;
  solution_image_url: string | null;
  video_url: string | null;
  video_embed_url: string | null;
  metadata: any;
  challenges_count: number;
  created_at: string;
}

interface SolutionDetail extends Omit<Solution, "challenges_count"> {
  challenges: Challenge[];
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export async function getSolutions(
  page = 1,
  search?: string
): Promise<PaginatedResponse<Solution>> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(search && { search })
  });

  const response = await axios.get(`${API_URL}/solutions?${params}`);
  return response.data;
}

export async function getSolution(
  slug: string
): Promise<{ data: SolutionDetail }> {
  const response = await axios.get(`${API_URL}/solutions/${slug}`);
  return response.data;
}

export async function getFeaturedSolutions(): Promise<{ data: Solution[] }> {
  const response = await axios.get(`${API_URL}/solutions/featured`);
  return response.data;
}

export async function getRelatedSolutions(
  slug: string
): Promise<{ data: Solution[] }> {
  const response = await axios.get(`${API_URL}/solutions/${slug}/related`);
  return response.data;
}
