"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { RiMenu4Fill } from "react-icons/ri";
import { HiChevronDown } from "react-icons/hi";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube
} from "react-icons/fa6";
import { DropdownMenu } from "./DropdownMenu";
import { MobileMenuItem } from "./MobileMenuItem";
import { navItems } from "../../../data/navigation-data";

const socialLinks = [
  { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" }
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenItems, setMobileOpenItems] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenItems([]);
  }, [pathname]);

  const handleDropdown = useCallback((path: string | null) => {
    setOpenDropdown(path);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 -mt-3 left-0 right-0 z-50 transition-all duration-500
                   ${
                     isScrolled
                       ? "bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-sky-500/10"
                       : "bg-gray-900"
                   }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left */}
            <div className="flex-shrink-0 -mt-2">
              <Link href="/" className="relative flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="w-40 h-12 relative"
                >
                  <Image
                    src="/assets/images/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </div>

            {/* Navigation Links - Center */}
            <div className="hidden sm:flex flex-1 -mt-3 justify-center items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative px-3"
                  onMouseEnter={() => handleDropdown(item.path)}
                  onMouseLeave={() => handleDropdown(null)}
                >
                  <Link
                    href={item.path}
                    className={`group flex items-center text-[15px] font-medium px-4 pt-1 
                              rounded-lg transition-all duration-300 ease-in-out
                              ${
                                pathname === item.path
                                  ? "text-white hover:text-sky-400"
                                  : "text-[#f6931d] hover:text-sky-400"
                              }`}
                  >
                    <span className="relative">
                      {item.title}
                      <motion.span
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                    </span>
                    {item.subMenu && (
                      <HiChevronDown
                        className="w-4 h-4 ml-1"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                  {item.subMenu && (
                    <DropdownMenu
                      items={item.subMenu}
                      isOpen={openDropdown === item.path}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Right Section: Social Icons + Donate Button */}
            <div className="hidden sm:flex -mt-3 items-center space-x-6">
              {/* Social Icons */}
              <div className="flex items-center space-x-4 mr-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:text-sky-400 transition-colors duration-300 ${
                        isScrolled ? "text-[#f6931d]" : "text-[#f6931d]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>

              {/* Desktop Donate Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`block mt-3 px-6 py-2.5 rounded-xl font-medium text-sm
                         text-[#f6931d] 
                         bg-transparent border border-[#f6931d] shadow-lg shadow-sky-500/25 
                         hover:shadow-orange-500/25 transition-all duration-300
                         `}
              >
                Donate Now
              </motion.button>
            </div>

            {/* Mobile Right Section */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Donate Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium
                         bg-gradient-to-r from-sky-500 to-orange-500 
                         text-white transition-all duration-300`}
              >
                Donate
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(true)}
                className={`p-2 rounded-lg transition-all duration-300 
                         ${isScrolled ? "bg-white/10" : "bg-gray-800"}`}
                aria-label="Open menu"
              >
                <RiMenu4Fill className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-orange-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden bg-gray-900/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm 
                     bg-gradient-to-br from-slate-900 to-sky-900"
            >
              <div className="flex items-center justify-end p-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-white hover:bg-sky-500/20 
                           transition-all duration-300"
                >
                  <RxCross2 className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => (
                  <MobileMenuItem
                    key={item.path}
                    item={item}
                    isOpen={mobileOpenItems.includes(item.path)}
                    toggleSubmenu={() => {
                      setMobileOpenItems((prev) =>
                        prev.includes(item.path)
                          ? prev.filter((p) => p !== item.path)
                          : [...prev, item.path]
                      );
                    }}
                  />
                ))}
              </div>

              {/* Mobile Social Links */}
              <div
                className="grid grid-cols-4 gap-4 p-6 border-t border-sky-500/30 
                           bg-sky-700/30 dark:bg-gray-800/30"
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 rounded-lg 
                               bg-sky-500/20 text-white hover:bg-sky-500/30 
                               transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
              {/* Donate Button  */}
              <div className="px-6 pb-6 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl font-medium text-white
                           bg-gradient-to-r from-sky-500 to-orange-500 
                           shadow-lg shadow-sky-500/25 hover:shadow-orange-500/25 
                           transition-all duration-300"
                >
                  Donate Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
