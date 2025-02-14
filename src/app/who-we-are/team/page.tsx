import React from "react";
import { getTeamMembers } from "@/lib/api/team";
import TeamPage from "@/components/team/TeamPage";
import { TeamResponse } from "@/lib/api/team";

export const runtime = "edge";
export const preferredRegion = "auto";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const search = searchParams["search"]?.toString();

  try {
    const response: TeamResponse = await getTeamMembers(search);
    console.log("Team Response:", response); // For debugging

    // Ensure we're passing arrays for each category
    const board = Array.isArray(response.data.board) ? response.data.board : [];
    const founder = Array.isArray(response.data.founder)
      ? response.data.founder
      : [];
    const staff = Array.isArray(response.data.staff) ? response.data.staff : [];

    return (
      <TeamPage
        initialTeam={{
          board,
          founder,
          staff
        }}
      />
    );
  } catch (error) {
    console.error("Error fetching team members:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4">
          <div className="mb-6">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Failed to load team members
          </h2>
          <p className="text-gray-600 mb-6">
            We're unable to load the team data at the moment. Please try again
            later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }
}
