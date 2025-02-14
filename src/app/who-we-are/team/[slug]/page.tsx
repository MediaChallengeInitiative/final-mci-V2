// app/team/[slug]/page.tsx
import React from "react";
import { getTeamMember } from "@/lib/api/team";
import { notFound } from "next/navigation";
import TeamMemberProfile from "@/components/team/TeamMemberProfile";

export const runtime = "edge";
export const preferredRegion = "auto";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  try {
    const response = await getTeamMember(params.slug);

    if (!response.data) {
      return notFound();
    }

    return <TeamMemberProfile member={response.data} />;
  } catch (error) {
    console.error("Error fetching team member:", error);
    return notFound();
  }
}
