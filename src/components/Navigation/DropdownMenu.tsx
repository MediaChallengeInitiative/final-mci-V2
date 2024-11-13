"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SubMenuItem } from "@/interface/nav";

interface DropdownMenuProps {
  items: SubMenuItem[];
  isOpen: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  isOpen
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 
                     shadow-xl rounded-xl py-0 min-w-[280px] backdrop-blur-lg 
                     border border-gray-200 dark:border-gray-700"
        >
          <div className="grid gap-1 px-2">
            {items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex flex-col px-4 py-3 rounded-lg hover:bg-gray-50  hover:text-sky-500
                         dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <span className="text-gray-900 hover:text-sky-500 dark:text-white text-sm font-medium">
                  {item.title}
                </span>
                {item.description && (
                  <span className="text-gray-500 dark:text-gray-400 text-xs mt-1">
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
