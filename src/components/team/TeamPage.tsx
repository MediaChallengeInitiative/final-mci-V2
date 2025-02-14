"use client";

import React, { useState, useCallback, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Theme } from "@/interface/interface";
import { themes } from "@/config/themes";
import { TeamMember } from "@/lib/api/team";
import Breadcrumb from "@/components/breadcrumb";
import TeamMemberCard from "./TeamMemberCard";
import LoadMoreButton from "./LoadMoreButton";
import ColorSwitcher from "../articles/ColorSwitcher";

interface TeamPageProps {
  initialTeam: {
    board: TeamMember[];
    founder: TeamMember[];
    staff: TeamMember[];
  };
}

// Position priority mapping function
const getPositionPriority = (position: string): number => {
  const pos = position?.toLowerCase() || "";

  // CEO/ChEO variations
  if (
    pos.match(
      /\b(ch?\.?\s*e\.?\s*o|ch(ief)?\.?\s*e(xecutive)?\.?\s*o(fficer)?)\b/i
    ) ||
    pos.includes("chief executive") ||
    pos.includes("executive officer")
  ) {
    return 1;
  }

  // General Manager variations
  if (
    pos.match(/\b(general\s*manager|gen(\.|eral)?\s*mgr|gm)\b/i) ||
    pos.includes("general manager")
  ) {
    return 2;
  }

  // Director Research, Learning and Development variations
  if (
    pos.match(
      /\b(director.*research|research.*director|director.*learning.*development)\b/i
    ) ||
    pos.includes("director research") ||
    pos.includes("learning and development")
  ) {
    return 3;
  }

  // Director of Production variations
  if (
    pos.match(/\b(director.*production|production.*director)\b/i) ||
    pos.includes("director of production")
  ) {
    return 4;
  }

  // Staff positions priority
  const staffPriorities: { [key: string]: number } = {
    "multimedia web developer": 5,
    "development lead": 6,
    "resource mobilization strategist": 7,
    "senior communications officer": 8,
    "communications officer": 9
  };

  for (const [key, priority] of Object.entries(staffPriorities)) {
    if (pos.includes(key)) return priority;
  }

  // All other positions
  return 10;
};

export const TeamPage = ({ initialTeam }: TeamPageProps) => {
  const [mounted, setMounted] = useState(false);
  const [visibleCounts, setVisibleCounts] = useState({
    founder: 4,
    board: 4,
    staff: 4
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [, startTransition] = useTransition();

  // Sort function for team members
  const sortTeamMembers = useCallback((members: TeamMember[]): TeamMember[] => {
    return [...members].sort((a, b) => {
      const priorityA = getPositionPriority(a.position || "");
      const priorityB = getPositionPriority(b.position || "");

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If priorities are equal, sort by name
      return a.name.localeCompare(b.name);
    });
  }, []);

  // Sort and prepare team data
  const safeTeam = {
    board: sortTeamMembers(
      Array.isArray(initialTeam?.board) ? initialTeam.board : []
    ),
    founder: sortTeamMembers(
      Array.isArray(initialTeam?.founder) ? initialTeam.founder : []
    ),
    staff: sortTeamMembers(
      Array.isArray(initialTeam?.staff) ? initialTeam.staff : []
    )
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = useCallback((theme: Theme) => {
    startTransition(() => {
      setCurrentTheme(theme);
    });
  }, []);

  const loadMore = useCallback(
    (category: "board" | "founder" | "staff") => {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCounts((prev) => ({
          ...prev,
          [category]: Math.min(prev[category] + 4, safeTeam[category].length)
        }));
        setIsLoading(false);
      }, 800);
    },
    [safeTeam]
  );

  const getVisibleMembers = useCallback(
    (category: "board" | "founder" | "staff") => {
      return safeTeam[category].slice(0, visibleCounts[category]);
    },
    [safeTeam, visibleCounts]
  );

  const hasMore = useCallback(
    (category: "board" | "founder" | "staff") => {
      return visibleCounts[category] < safeTeam[category].length;
    },
    [visibleCounts, safeTeam]
  );

  const getRemainingCount = useCallback(
    (category: "board" | "founder" | "staff") => {
      return safeTeam[category].length - visibleCounts[category];
    },
    [safeTeam, visibleCounts]
  );

  const renderTeamSection = useCallback(
    (category: "board" | "founder" | "staff", title: string) => {
      const members = getVisibleMembers(category);
      if (!members.length) return null;

      return (
        <div className="space-y-12">
          <div className="text-center">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold ${currentTheme.text} mb-4`}
            >
              {title}
            </h2>
            <div
              className={`h-1 w-32 mx-auto bg-gradient-to-r from-sky-400 to-sky-600 rounded-full`}
            />
          </div>
          <motion.div
            className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4"
            layout
          >
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                layout
              >
                <TeamMemberCard
                  member={member}
                  theme={currentTheme}
                  index={i}
                />
              </motion.div>
            ))}
          </motion.div>
          {hasMore(category) && (
            <LoadMoreButton
              loading={isLoading}
              onLoadMore={() => loadMore(category)}
              hasMore={true}
              theme={currentTheme}
              remainingCount={getRemainingCount(category)}
            />
          )}
        </div>
      );
    },
    [
      currentTheme,
      getVisibleMembers,
      hasMore,
      getRemainingCount,
      isLoading,
      loadMore
    ]
  );

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
    >
      <ColorSwitcher
        currentTheme={currentTheme}
        setCurrentTheme={handleThemeChange}
        isColorMenuOpen={isColorMenuOpen}
        setIsColorMenuOpen={setIsColorMenuOpen}
      />
      <div className="pt-10 md:pt-12 lg:pt-16">
        <Breadcrumb
          title="Our Team"
          subtitle="Meet the people behind our success"
          currentTheme={currentTheme}
        />
      </div>
      <div className="w-[95%] md:w-[90%] max-w-[1920px] mx-auto py-12 md:py-16 lg:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`theme-${currentTheme.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-24 md:space-y-32 lg:space-y-40"
          >
            {renderTeamSection("founder", "Our Founders")}
            {renderTeamSection("board", "Our Board")}
            {renderTeamSection("staff", "Our Staff")}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeamPage;

// "use client";

// import React, { useState, useCallback, useTransition, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Theme } from "@/interface/interface";
// import { themes } from "@/config/themes";
// import { TeamMember } from "@/lib/api/team";
// import Breadcrumb from "@/components/breadcrumb";
// import TeamMemberCard from "./TeamMemberCard";
// import LoadMoreButton from "./LoadMoreButton";
// import ColorSwitcher from "../articles/ColorSwitcher";

// interface TeamPageProps {
//   initialTeam: {
//     board: TeamMember[];
//     founder: TeamMember[];
//     staff: TeamMember[];
//   };
// }

// export const TeamPage = ({ initialTeam }: TeamPageProps) => {
//   const [mounted, setMounted] = useState(false);
//   const [visibleCounts, setVisibleCounts] = useState({
//     founder: 4,
//     board: 4,
//     staff: 4
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentTheme, setCurrentTheme] = useState(themes[0]);
//   const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
//   const [, startTransition] = useTransition();

//   // Custom order for staff positions
//   const staffOrder = [
//     "Multimedia Web Developer",
//     "Development Lead",
//     "Resource mobilization strategist and project officer",
//     "Senior Communications Officer",
//     "Communications Officer"
//   ];

//   // Function to get position priority
//   const getStaffPriority = (position: string) => {
//     // Check for developer position using case-insensitive check
//     if (position.toLowerCase().includes("developer")) {
//       const developerIndex = staffOrder.findIndex((p) =>
//         p.toLowerCase().includes("developer")
//       );
//       return developerIndex !== -1 ? developerIndex : staffOrder.length;
//     }

//     const index = staffOrder.findIndex((p) => position.includes(p));
//     return index !== -1 ? index : staffOrder.length;
//   };

//   // Sort staff members according to custom order
//   const sortedStaff = [
//     ...(Array.isArray(initialTeam?.staff) ? initialTeam.staff : [])
//   ].sort((a, b) => {
//     const priorityA = getStaffPriority(a.position);
//     const priorityB = getStaffPriority(b.position);

//     if (priorityA !== priorityB) {
//       return priorityA - priorityB;
//     }
//     // If priorities are equal, maintain original order or sort by name
//     return a.name.localeCompare(b.name);
//   });

//   // Ensure initialTeam arrays exist and have slice method
//   const safeTeam = {
//     board: Array.isArray(initialTeam?.board) ? initialTeam.board : [],
//     founder: Array.isArray(initialTeam?.founder) ? initialTeam.founder : [],
//     staff: sortedStaff
//   };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleThemeChange = useCallback((theme: Theme) => {
//     startTransition(() => {
//       setCurrentTheme(theme);
//     });
//   }, []);

//   const loadMore = useCallback(
//     (category: "board" | "founder" | "staff") => {
//       setIsLoading(true);
//       setTimeout(() => {
//         setVisibleCounts((prev) => ({
//           ...prev,
//           [category]: Math.min(prev[category] + 4, safeTeam[category].length)
//         }));
//         setIsLoading(false);
//       }, 800);
//     },
//     [safeTeam]
//   );

//   const getVisibleMembers = useCallback(
//     (category: "board" | "founder" | "staff") => {
//       return safeTeam[category].slice(0, visibleCounts[category]);
//     },
//     [safeTeam, visibleCounts]
//   );

//   const hasMore = useCallback(
//     (category: "board" | "founder" | "staff") => {
//       return visibleCounts[category] < safeTeam[category].length;
//     },
//     [visibleCounts, safeTeam]
//   );

//   const getRemainingCount = useCallback(
//     (category: "board" | "founder" | "staff") => {
//       return safeTeam[category].length - visibleCounts[category];
//     },
//     [safeTeam, visibleCounts]
//   );

//   const renderTeamSection = useCallback(
//     (category: "board" | "founder" | "staff", title: string) => {
//       const members = getVisibleMembers(category);
//       if (!members.length) return null;

//       return (
//         <div className="space-y-12">
//           <div className="text-center">
//             <h2
//               className={`text-3xl md:text-4xl lg:text-5xl font-bold ${currentTheme.text} mb-4`}
//             >
//               {title}
//             </h2>
//             <div
//               className={`h-1 w-32 mx-auto bg-gradient-to-r from-sky-400 to-sky-600 rounded-full`}
//             />
//           </div>
//           <motion.div
//             className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4"
//             layout
//           >
//             {members.map((member, i) => (
//               <motion.div
//                 key={member.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: i * 0.1 }}
//                 layout
//               >
//                 <TeamMemberCard
//                   member={member}
//                   theme={currentTheme}
//                   index={i}
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//           {hasMore(category) && (
//             <LoadMoreButton
//               loading={isLoading}
//               onLoadMore={() => loadMore(category)}
//               hasMore={true}
//               theme={currentTheme}
//               remainingCount={getRemainingCount(category)}
//             />
//           )}
//         </div>
//       );
//     },
//     [
//       currentTheme,
//       getVisibleMembers,
//       hasMore,
//       getRemainingCount,
//       isLoading,
//       loadMore
//     ]
//   );

//   if (!mounted) return null;

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
//     >
//       <ColorSwitcher
//         currentTheme={currentTheme}
//         setCurrentTheme={handleThemeChange}
//         isColorMenuOpen={isColorMenuOpen}
//         setIsColorMenuOpen={setIsColorMenuOpen}
//       />
//       <div className="pt-10 md:pt-12 lg:pt-16">
//         <Breadcrumb
//           title="Our Team"
//           subtitle="Meet the people behind our success"
//           currentTheme={currentTheme}
//         />
//       </div>
//       <div className="w-[95%] md:w-[90%] max-w-[1920px] mx-auto py-12 md:py-16 lg:py-20">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={`theme-${currentTheme.name}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="space-y-24 md:space-y-32 lg:space-y-40"
//           >
//             {renderTeamSection("founder", "Our Founders")}
//             {renderTeamSection("board", "Our Board")}
//             {renderTeamSection("staff", "Our Staff")}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default TeamPage;
