// app/lib/api/team.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TeamMember {
  id: number;
  name: string;
  slug: string;
  position: string;
  bio: string | null;
  photo_url: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    [key: string]: string | undefined;
  } | null;
  is_featured: boolean;
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

interface CategoryTeams {
  category: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  };
  teams: TeamMember[];
}

export async function getTeamMembers(
  page = 1,
  category?: string,
  search?: string
): Promise<PaginatedResponse<TeamMember>> {
  const params = new URLSearchParams({
    page: page.toString(),
    ...(category && { category }),
    ...(search && { search })
  });

  const response = await axios.get(`${API_URL}/team?${params}`);
  return response.data;
}

export async function getTeamMember(
  slug: string
): Promise<{ data: TeamMember }> {
  const response = await axios.get(`${API_URL}/team/${slug}`);
  return response.data;
}

export async function getFeaturedTeamMembers(): Promise<{
  data: TeamMember[];
}> {
  const response = await axios.get(`${API_URL}/team/featured`);
  return response.data;
}

export async function getTeamMembersByCategory(
  categorySlug: string
): Promise<{ data: CategoryTeams }> {
  const response = await axios.get(`${API_URL}/team/category/${categorySlug}`);
  return response.data;
}
