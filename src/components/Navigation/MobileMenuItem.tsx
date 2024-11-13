"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { NavItem } from "@/interface/nav";

interface MobileMenuItemProps {
  item: NavItem;
  isOpen: boolean;
  toggleSubmenu: () => void;
}

export const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  item,
  isOpen,
  toggleSubmenu
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="relative"
    >
      <div
        className="flex items-center justify-between py-4 px-4 cursor-pointer
                   hover:bg-sky-400/20 rounded-xl transition-all duration-300"
        onClick={toggleSubmenu}
      >
        <div>
          <span className="text-white text-lg font-medium">{item.title}</span>
          {item.description && (
            <span className="block text-sky-200 text-sm mt-1">
              {item.description}
            </span>
          )}
        </div>
        {item.subMenu && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "anticipate" }}
          >
            <HiChevronDown className="text-white text-2xl" />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isOpen && item.subMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pl-4"
          >
            {item.subMenu.map((subItem) => (
              <Link
                key={subItem.path}
                href={subItem.path}
                className="block py-3 px-6 text-white/90 hover:text-white text-base
                         hover:bg-sky-400/20 rounded-xl transition-all duration-200 my-1"
              >
                <span className="block">{subItem.title}</span>
                {subItem.description && (
                  <span className="block text-sky-200 text-sm mt-1">
                    {subItem.description}
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
