// app/lib/api/team-categories.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio?: string;
  photo_url: string | null;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    [key: string]: string | undefined;
  };
}

interface TeamCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  teams_count?: number;
}

interface TeamCategoryDetail extends TeamCategory {
  teams: TeamMember[];
}

interface OrganizationStructure {
  id: number;
  name: string;
  slug: string;
  teams: Array<{
    id: number;
    name: string;
    position: string;
    photo_url: string | null;
  }>;
}

interface FeaturedTeams {
  id: number;
  name: string;
  slug: string;
  teams: TeamMember[];
}

export async function getTeamCategories(): Promise<{ data: TeamCategory[] }> {
  const response = await axios.get(`${API_URL}/team-categories`);
  return response.data;
}

export async function getTeamCategory(
  slug: string
): Promise<{ data: TeamCategoryDetail }> {
  const response = await axios.get(`${API_URL}/team-categories/${slug}`);
  return response.data;
}

export async function getOrganizationStructure(): Promise<{
  data: OrganizationStructure[];
}> {
  const response = await axios.get(`${API_URL}/team-categories/structure`);
  return response.data;
}

export async function getFeaturedTeams(): Promise<{ data: FeaturedTeams[] }> {
  const response = await axios.get(`${API_URL}/team-categories/featured`);
  return response.data;
}
