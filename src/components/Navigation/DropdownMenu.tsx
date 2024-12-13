"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SubMenuItem } from "@/interface/nav";

interface DropdownMenuProps {
  items: SubMenuItem[];
  isOpen: boolean;
  onClose?: () => void; // Added for keyboard accessibility
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  isOpen,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const lastItemRef = useRef<HTMLAnchorElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose?.();
          break;
        case "Tab":
          if (!e.shiftKey && document.activeElement === lastItemRef.current) {
            e.preventDefault();
            firstItemRef.current?.focus();
          } else if (
            e.shiftKey &&
            document.activeElement === firstItemRef.current
          ) {
            e.preventDefault();
            lastItemRef.current?.focus();
          }
          break;
      }
    },
    [isOpen, onClose]
  );

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      // Focus first item when menu opens
      firstItemRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 bg-gray-900 
                     shadow-xl rounded-xl py-0 min-w-[280px] backdrop-blur-lg 
                     border border-gray-900 dark:border-gray-900 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="grid gap-1 px-2">
            {items.map((item, index) => (
              <Link
                key={item.path}
                href={item.path}
                ref={
                  index === 0
                    ? firstItemRef
                    : index === items.length - 1
                      ? lastItemRef
                      : null
                }
                className="flex flex-col px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-sky-500
                         dark:hover:bg-gray-700/50 transition-colors duration-200 outline-none
                         focus-visible:ring-2 focus-visible:ring-sky-500"
                role="menuitem"
                onClick={onClose}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClose?.();
                  }
                }}
              >
                <span className="text-orange-500 hover:text-sky-500 dark:text-white text-sm font-medium">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-orange-400 dark:text-orange-300 text-xs mt-1">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// "use client";
// import React from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { SubMenuItem } from "@/interface/nav";

// interface DropdownMenuProps {
//   items: SubMenuItem[];
//   isOpen: boolean;
// }

// export const DropdownMenu: React.FC<DropdownMenuProps> = ({
//   items,
//   isOpen
// }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: 10, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 10, scale: 0.95 }}
//           transition={{ duration: 0.2, ease: "easeOut" }}
//           className="absolute top-full left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800
//                      shadow-xl rounded-xl py-0 min-w-[280px] backdrop-blur-lg
//                      border border-gray-200 dark:border-gray-700"
//         >
//           <div className="grid gap-1 px-2">
//             {items.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className="flex flex-col px-4 py-3 rounded-lg hover:bg-gray-50  hover:text-sky-500
//                          dark:hover:bg-gray-700/50 transition-colors duration-200"
//               >
//                 <span className="text-gray-900 hover:text-sky-500 dark:text-white text-sm font-medium">
//                   {item.title}
//                 </span>
//                 {item.description && (
//                   <span className="text-gray-500 dark:text-gray-400 text-xs mt-1">
//                     {item.description}
//                   </span>
//                 )}
//               </Link>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
