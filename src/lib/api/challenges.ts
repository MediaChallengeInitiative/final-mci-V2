// src/lib/api/challenges.ts
import axios from "axios";
import type {
  Challenge,
  ChallengeSolution,
  ChallengeParams,
  ApiResponse,
  PaginatedResponse
} from "@/types/challenge";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Get paginated list of challenges with optional filtering
 */
export async function getChallenges(
  params: ChallengeParams = {}
): Promise<PaginatedResponse<Challenge[]>> {
  const { page = 1, per_page = 12, solution, search } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    ...(solution && { solution }),
    ...(search && { search })
  });

  const response = await axios.get<PaginatedResponse<Challenge[]>>(
    `${API_URL}/challenges?${searchParams}`
  );
  return response.data;
}

/**
 * Get a specific challenge by ID
 */
export async function getChallenge(
  id: number
): Promise<ApiResponse<Challenge>> {
  const response = await axios.get<ApiResponse<Challenge>>(
    `${API_URL}/challenges/${id}`
  );
  return response.data;
}

/**
 * Get solutions with their challenge counts
 */
export async function getChallengeSolutions(): Promise<
  ApiResponse<ChallengeSolution[]>
> {
  const response = await axios.get<ApiResponse<ChallengeSolution[]>>(
    `${API_URL}/challenges/solutions`
  );
  return response.data;
}

/**
 * Get related challenges from the same solution
 */
export async function getRelatedChallenges(
  id: number
): Promise<ApiResponse<Challenge[]>> {
  const response = await axios.get<ApiResponse<Challenge[]>>(
    `${API_URL}/challenges/${id}/related`
  );
  return response.data;
}
