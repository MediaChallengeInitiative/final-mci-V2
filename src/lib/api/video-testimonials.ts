// app/lib/api/video-testimonials.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface VideoTestimonial {
  id: number;
  name: string;
  slug: string;
  year: number;
  youtube_id: string;
  embed_url: string;
  thumbnail_url: string;
  created_at: string;
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

export async function getVideoTestimonials(
  page = 1,
  year?: number,
  search?: string
): Promise<PaginatedResponse<VideoTestimonial>> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(year && { year: year.toString() }),
    ...(search && { search })
  });

  const response = await axios.get(`${API_URL}/video-testimonials?${params}`);
  return response.data;
}

export async function getVideoTestimonial(
  slug: string
): Promise<{ data: VideoTestimonial }> {
  const response = await axios.get(`${API_URL}/video-testimonials/${slug}`);
  return response.data;
}

export async function getYears(): Promise<{ data: number[] }> {
  const response = await axios.get(`${API_URL}/video-testimonials/years`);
  return response.data;
}

export async function getFeatured(): Promise<{ data: VideoTestimonial[] }> {
  const response = await axios.get(`${API_URL}/video-testimonials/featured`);
  return response.data;
}

export async function getRelated(
  slug: string
): Promise<{ data: VideoTestimonial[] }> {
  const response = await axios.get(
    `${API_URL}/video-testimonials/${slug}/related`
  );
  return response.data;
}
