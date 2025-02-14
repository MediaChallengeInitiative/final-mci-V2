"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserCircle2, Mail, Linkedin, Twitter } from "lucide-react";
import { TeamMember } from "@/lib/api/team";
import { Theme } from "@/interface/interface";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  theme: Theme;
}

const TeamMemberCard = React.memo(
  ({ member, theme, index }: TeamMemberCardProps) => {
    return (
      <Link
        href={`/who-we-are/team/${member.slug}`}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2 border-4 border-sky-500/20 hover:border-sky-500"
      >
        {/* Card Header with Photo */}
        <div className="relative">
          {/* Category Badge */}
          {member.category && member.position && (
            <div className="absolute top-4 left-4 z-20">
              {(() => {
                const position = member.position.toLowerCase();
                const category = member.category;

                // Type guard to ensure category is not null
                if (!category?.name) {
                  return null;
                }

                // Check for CEO/ChEO variations
                const isCEOPosition =
                  position.match(
                    /\b(ch?\.?\s*e\.?\s*o|ch(ief)?\.?\s*e(xecutive)?\.?\s*o(fficer)?)\b/i
                  ) ||
                  position.includes("chief executive") ||
                  position.includes("executive officer");

                // Check for Staff positions (expanded list)
                const isStaffPosition = position.match(
                  /\b(developer|officer|lead|strategist|coordinator|manager|assistant|specialist|analyst|administrator|advisor|consultant|associate|intern|trainee|supervisor|technician|engineer|writer|editor|researcher|accountant|clerk|executive|secretary|producer|designer|planner|facilitator)\b/i
                );

                // Check for Board positions
                const isBoardPosition = position.match(
                  /\b(board|chairman|chairperson|treasurer|secretary)\b/i
                );

                // Check if it's a Founder position
                const isFounderPosition = category.name
                  .toLowerCase()
                  .includes("founder");

                // Get the appropriate badge style
                const getBadgeStyle = (): string => {
                  if (isCEOPosition) {
                    return "bg-red-500 text-white";
                  } else if (isFounderPosition) {
                    return "bg-sky-500 text-white";
                  } else {
                    return "bg-orange-500 text-white"; // Common style for all other positions
                  }
                };

                // Get the appropriate category display
                const getCategoryDisplay = (): string => {
                  if (isCEOPosition) {
                    return category.name;
                  } else if (isFounderPosition && !isCEOPosition) {
                    return `Co-${category.name}`; // Only add Co- prefix for non-CEO Founders
                  } else {
                    return category.name; // All other positions display without prefix
                  }
                };

                return (
                  <span
                    className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium shadow-lg backdrop-blur-sm ${getBadgeStyle()}`}
                  >
                    {getCategoryDisplay()}
                  </span>
                );
              })()}
            </div>
          )}
          {/* Category Badge
          {member.category && (
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium bg-sky-500 text-white shadow-lg backdrop-blur-sm">
                {member.category.name}
              </span>
            </div>
          )} */}

          {/* Member Photo */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-sky-50 to-sky-100">
            {member.photo_url ? (
              <Image
                src={member.photo_url}
                alt={member.name}
                fill
                style={{ objectPosition: "50% 20%" }}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={index < 4}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UserCircle2 className="w-1/3 h-1/3 text-sky-300" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Quick Action Buttons */}
          <div className="absolute bottom-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-sky-50 transition-colors duration-300">
              <Mail className="w-4 h-4 text-sky-500" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-sky-50 transition-colors duration-300">
              <Linkedin className="w-4 h-4 text-sky-500" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg hover:bg-sky-50 transition-colors duration-300">
              <Twitter className="w-4 h-4 text-sky-500" />
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex-1 p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-500 transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-sky-500">
              {member.position}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {member.bio}
          </p>

          {/* View Profile Link */}
          <Link
            href={`/team/${member.slug}`}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors duration-300 group/link mt-2"
          >
            <span>View Full Profile</span>
            <svg
              className="w-4 h-4 transform transition-transform duration-300 group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Card Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Joined {new Date(member.created_at).getFullYear()}</span>
            <span className="inline-flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>Active Member</span>
            </span>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-4 border-sky-500/0 group-hover:border-sky-500/20 rounded-2xl transition-colors duration-500" />
      </Link>
    );
  }
);

TeamMemberCard.displayName = "TeamMemberCard";

export default TeamMemberCard;
