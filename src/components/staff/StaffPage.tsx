"use client";

import React, { useState, useCallback, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "@/components/breadcrumb";
import { ModernPagination } from "@/components/ui/modern-pagination";
import StaffCard from "./StaffCard";
import { StaffPageProps, Theme } from "@/interface/interface";
import { themes } from "@/config/themes";
import ColorSwitcher from "./ColorSwitcher";

const StaffPage: React.FC<StaffPageProps> = ({
  staff,
  page,
  totalPages,
  per_page
}) => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(true);
  const [, startTransition] = useTransition();

  const handleThemeChange = useCallback((theme: Theme) => {
    startTransition(() => {
      setCurrentTheme(theme);
    });
  }, []);

  const memoizedStaffCards = useMemo(
    () =>
      staff.map((s, i) => (
        <StaffCard key={i} staff={s} theme={currentTheme} index={i} />
      )),
    [staff, currentTheme]
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
    >
      {/* Color switcher component */}
      <ColorSwitcher
        currentTheme={currentTheme}
        setCurrentTheme={handleThemeChange}
        isColorMenuOpen={isColorMenuOpen}
        setIsColorMenuOpen={setIsColorMenuOpen}
      />

      <section className="w-full py-8 md:py-12 lg:py-16">
        {/* Breadcrumb for navigation */}
        <Breadcrumb
          title="Our Staff"
          subtitle="Meet our amazing team of professionals"
          currentTheme={currentTheme}
        />

        {/* Staff grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container grid gap-12 px-4 md:px-6"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-max">
              {memoizedStaffCards}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination component */}
        <ModernPagination
          currentPage={Number(page)}
          totalPages={totalPages}
          perPage={Number(per_page)}
          baseUrl="/who-we-are/staff"
          className="mt-8"
          currentTheme={currentTheme}
        />
      </section>
    </div>
  );
};

export default React.memo(StaffPage);

// "use client";

// import React, { useState, useCallback, useTransition, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Breadcrumb from "@/components/breadcrumb";
// import { ModernPagination } from "@/components/ui/modern-pagination";
// import StaffCard from "./StaffCard";
// import { StaffPageProps } from "@/interface/interface";
// import { themes } from "@/config/themes";
// import ColorSwitcher from "./ColorSwitcher";

// const StaffPage: React.FC<StaffPageProps> = ({
//   staff,
//   page,
//   totalPages,
//   per_page
// }) => {
//   const [currentTheme, setCurrentTheme] = useState(themes[0]);
//   const [isColorMenuOpen, setIsColorMenuOpen] = useState(true);
//   const [isPending, startTransition] = useTransition();

//   const handleThemeChange = useCallback((theme: any) => {
//     startTransition(() => {
//       setCurrentTheme(theme);
//     });
//   }, []);

//   const memoizedStaffCards = useMemo(
//     () =>
//       staff.map((s, i) => (
//         <StaffCard key={i} staff={s} theme={currentTheme} index={i} />
//       )),
//     [staff, currentTheme]
//   );

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
//     >
//       {/* Color switcher component */}
//       <ColorSwitcher
//         currentTheme={currentTheme}
//         setCurrentTheme={handleThemeChange}
//         isColorMenuOpen={isColorMenuOpen}
//         setIsColorMenuOpen={setIsColorMenuOpen}
//       />

//       <section className="w-full py-8 md:py-12 lg:py-16">
//         {/* Breadcrumb for navigation */}
//         <Breadcrumb
//           title="Our Staff"
//           subtitle="Meet our amazing team of professionals"
//           currentTheme={currentTheme}
//         />

//         {/* Staff grid */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentTheme.name}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="container grid gap-12 px-4 md:px-6"
//           >
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-max">
//               {memoizedStaffCards}
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* Pagination component */}
//         <ModernPagination
//           currentPage={Number(page)}
//           totalPages={totalPages}
//           perPage={Number(per_page)}
//           baseUrl="/who-we-are/staff"
//           className="mt-8"
//           currentTheme={currentTheme}
//         />
//       </section>
//     </div>
//   );
// };

// export default React.memo(StaffPage);
