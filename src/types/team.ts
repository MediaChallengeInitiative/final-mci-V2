export interface BaseTeamMember {
  id: number;
  name: string;
  position: string;
  slug: string;
  bio: string;
  photo_url: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  social_links?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  created_at: string;
  updated_at: string;
}

export interface TeamMember extends BaseTeamMember {
  created_by?: {
    id: number;
    name: string;
  };
  updated_by?: {
    id: number;
    name: string;
  };
}

export interface TeamCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  teams_count?: number;
}

export interface TeamCategoryDetail extends TeamCategory {
  teams: TeamMember[];
}

export interface OrganizationStructure {
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

export interface TeamResponse {
  data: TeamMember[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface SingleTeamResponse {
  data: TeamMember;
}

export interface TeamCategoriesResponse {
  data: TeamCategory[];
}
