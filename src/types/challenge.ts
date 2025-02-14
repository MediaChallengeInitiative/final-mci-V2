// src/types/challenge.ts

// Solution type used in challenges
export interface ChallengeSolution {
  id: number;
  name: string;
  slug: string;
  challenges_count?: number;
}

// Base challenge interface
export interface Challenge {
  id: number;
  title: string;
  description: string;
  solution_id: number;
  youtube_url: string | null;
  image: string | null;
  image_url: string | null;
  video_embed_url: string | null;
  excerpt: string;
  created_at: string;
  solution?: ChallengeSolution;
}

// Pagination metadata
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Generic pagination parameters
export interface PaginationParams {
  page?: number;
  per_page?: number;
}

// Challenge-specific request parameters
export interface ChallengeParams extends PaginationParams {
  solution?: string;
  search?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: PaginationMeta;
}
