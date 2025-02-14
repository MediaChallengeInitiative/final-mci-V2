"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Mail,
  Linkedin,
  Twitter,
  UserCircle2
} from "lucide-react";
import { TeamMember } from "@/lib/api/team";

interface TeamMemberProfileProps {
  member: TeamMember;
}

const TeamMemberProfile = ({ member }: TeamMemberProfileProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Back Button */}
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/who-we-are/team"
            className="group inline-flex items-center px-4 py-2 rounded-xl
        bg-gray-900 border-2 border-gray-900 
        hover:bg-gray-800 hover:border-gray-800
        active:bg-gray-950 active:scale-95
        transition-all duration-200 ease-in-out
        shadow-md hover:shadow-lg"
          >
            <ChevronLeft
              className="w-5 h-5 mr-2 text-white 
        transform group-hover:-translate-x-1 
        transition-transform duration-200"
            />
            <span className="text-sm font-semibold text-white">
              Back to Team
            </span>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image/Banner */}
          <div className="h-48 bg-gradient-to-r from-sky-500 to-sky-600" />

          {/* Profile Content */}
          <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
            {/* Profile Image Container */}
            <div className="relative -mt-24 mb-6">
              <div
                className="relative mx-auto rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white transition-all duration-300
              w-48 h-48 
              sm:w-56 sm:h-56 
              md:w-full md:h-[400px] 
              lg:w-full lg:h-[500px] 
              xl:w-full xl:h-[600px] 
              2xl:w-full 2xl:h-[700px]"
              >
                {!imageError && member.photo_url ? (
                  <Image
                    src={member.photo_url}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 12rem,
               (max-width: 768px) 14rem,
               (max-width: 1024px) 100vw,
               (max-width: 1280px) 100vw,
               (max-width: 1536px) 100vw,
               100vw"
                    priority
                    style={{ objectPosition: "50% 20%" }}
                    className="object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <UserCircle2 className="w-1/3 h-1/3 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Member Info */}
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h1>
                <p className="text-xl text-sky-600 mb-6">{member.position}</p>

                {member.category &&
                  (() => {
                    const position = member.position?.toLowerCase() || "";

                    // Check for CEO/ChEO variations
                    const isCEOPosition =
                      position.match(
                        /\b(ch?\.?\s*e\.?\s*o|ch(ief)?\.?\s*e(xecutive)?\.?\s*o(fficer)?)\b/i
                      ) ||
                      position.includes("chief executive") ||
                      position.includes("executive officer");

                    // Check for Staff positions
                    const isStaffPosition = position.match(
                      /\b(developer|officer|lead|strategist)\b/i
                    );

                    // Check for Board positions
                    const isBoardPosition = position.match(
                      /\b(board|director|chairman|chairperson|treasurer|secretary)\b/i
                    );

                    // Determine the appropriate category display
                    let categoryDisplay;
                    if (isCEOPosition) {
                      categoryDisplay = member.category.name;
                    } else if (isStaffPosition) {
                      categoryDisplay = `Staff ${member.category.name}`;
                    } else if (isBoardPosition) {
                      categoryDisplay = `Board ${member.category.name}`;
                    } else {
                      categoryDisplay = `Co-${member.category.name}`;
                    }

                    return (
                      <div className="mb-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            isCEOPosition
                              ? "bg-sky-100 text-sky-800"
                              : isStaffPosition
                              ? "bg-emerald-100 text-emerald-800"
                              : isBoardPosition
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {categoryDisplay}
                        </span>
                      </div>
                    );
                  })()}

                {/* Social Links */}
                <div className="flex space-x-4 mb-8">
                  <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
                    <Linkedin className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
                    <Twitter className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Bio */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamMemberProfile;
