import axios from "axios";

// Types
export interface BaseTeamMember {
  id: number;
  name: string;
  position: string;
  slug: string;
  bio: string;
  photo_url: string;
}

export interface TeamMember extends BaseTeamMember {
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_by: {
      id: number;
      name: string;
    } | null;
    updated_by: {
      id: number;
      name: string;
    } | null;
    created_at: string;
    updated_at: string;
  } | null;
  created_by: {
    id: number;
    name: string;
  } | null;
  updated_by: {
    id: number;
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface TeamResponse {
  data: {
    board: TeamMember[];
    founder: TeamMember[];
    staff: TeamMember[];
  };
}

export interface SingleTeamMemberResponse {
  data: TeamMember;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTeamMembers(search?: string): Promise<TeamResponse> {
  const params = new URLSearchParams({
    ...(search && { search })
  });

  const response = await axios.get(
    `${API_URL}/team${search ? `?${params}` : ""}`
  );
  return response.data;
}

export async function getTeamMember(
  slug: string
): Promise<SingleTeamMemberResponse> {
  const response = await axios.get(`${API_URL}/team/${slug}`);
  return response.data;
}

export async function getFeaturedTeamMembers(): Promise<TeamResponse> {
  const response = await axios.get(`${API_URL}/team/featured`);
  return response.data;
}
