// app/lib/api/challenges.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Challenge {
  id: number;
  title: string;
  description: string;
  excerpt: string;
  youtube_url: string | null;
  video_embed_url: string | null;
  image_path: string | null;
  image_url: string | null;
  solution: {
    id: number;
    name: string;
    slug: string;
  };
  created_at: string;
}

interface Solution {
  id: number;
  name: string;
  slug: string;
  challenges_count: number;
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

export async function getChallenges(
  page = 1,
  solution?: string,
  search?: string
): Promise<PaginatedResponse<Challenge>> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(solution && { solution }),
    ...(search && { search })
  });

  const response = await axios.get(`${API_URL}/challenges?${params}`);
  return response.data;
}

export async function getChallenge(id: number): Promise<{ data: Challenge }> {
  const response = await axios.get(`${API_URL}/challenges/${id}`);
  return response.data;
}

export async function getSolutions(): Promise<{ data: Solution[] }> {
  const response = await axios.get(`${API_URL}/challenges/solutions`);
  return response.data;
}

export async function getRelatedChallenges(
  id: number
): Promise<{ data: Challenge[] }> {
  const response = await axios.get(`${API_URL}/challenges/${id}/related`);
  return response.data;
}
