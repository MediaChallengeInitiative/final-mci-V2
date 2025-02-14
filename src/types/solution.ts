// types/solution.ts

// Basic user info returned in creator/updater fields
export interface User {
  id: number;
  name: string;
}

// Challenge associated with a solution
export interface Challenge {
  id: number;
  title: string;
  description: string;
  youtube_url: string | null;
  image: string | null;
  image_url: string | null;
  created_at: string | null;
}

// Base solution without challenges
export interface BaseSolution {
  id: number;
  title: string;
  slug: string;
  leading_assumption: string | null;
  solution: string | null;
  cover_image: string | null;
  icon: string | null;
  cover_image_url: string | null;
  icon_url: string | null;
  bg_color_from: string;
  bg_color_to: string;
  icon_name: string;
  icon_size: number;
  has_media: boolean;
  creator: User | null;
  updater: User | null;
  created_at: string;
  updated_at: string;
  challenge?: Challenge;
}

// Full solution type (same as BaseSolution in this case)
export type Solution = BaseSolution;

// API Response Types
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T;
  meta: PaginationMeta;
}

// Specific Response Types
export type SolutionsResponse = PaginatedResponse<Solution[]>;
export type SingleSolutionResponse = ApiResponse<Solution>;

// Request Parameter Types
export interface GetSolutionsParams {
  page?: number;
  per_page?: number;
  search?: string;
  with_media?: boolean;
}

// Utility function types can be added if needed
export type GetSolutions = (
  params?: GetSolutionsParams
) => Promise<SolutionsResponse>;

export type GetSolutionBySlug = (
  slug: string
) => Promise<SingleSolutionResponse>;
