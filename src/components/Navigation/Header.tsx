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

// Add social media links to the existing navigation data
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
                       ? "bg-white text-gray-900 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
                       : "bg-gray-900 text-white"
                   }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
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
            <div className="hidden lg:flex flex-1 justify-center items-center space-x-1">
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
                                  ? "text-sky-400 bg-sky-900/20"
                                  : "hover:text-sky-400 hover:bg-gray-800/50"
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

            {/* Social Icons - Right */}
            <div className="hidden lg:flex items-center space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-sky-400 transition-colors duration-all ${
                      isScrolled
                        ? "bg-white text-gray-900 dark:bg-gray-900/90"
                        : "bg-gray-900 text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg
                       transition-all duration-300 ${
                         isScrolled
                           ? "bg-white text-gray-900 dark:bg-gray-900/90"
                           : "bg-gray-900 text-white"
                       }`}
              aria-label="Open menu"
            >
              <RiMenu4Fill className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
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
                       bg-gradient-to-br from-sky-600 to-sky-700 dark:from-gray-800 dark:to-gray-900"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { RxCross2 } from "react-icons/rx";
// import { RiMenu4Fill } from "react-icons/ri";
// import { HiChevronDown } from "react-icons/hi";
// import { FaXTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
// import { IconType } from "react-icons";

// // Type definitions
// interface SubMenuItem {
//   title: string;
//   path: string;
//   description?: string;
// }

// interface NavItem {
//   title: string;
//   path: string;
//   subMenu?: SubMenuItem[];
// }

// interface DropdownMenuProps {
//   items: SubMenuItem[];
//   isOpen: boolean;
// }

// interface MobileMenuItemProps {
//   item: NavItem;
//   isOpen: boolean;
//   toggleSubmenu: () => void;
// }

// // Sample Navigation Data
// const navItems: NavItem[] = [
//   { title: "Home", path: "/" },
//   { title: "About", path: "/about" },
//   { title: "Services", path: "/services" },
//   { title: "Portfolio", path: "/portfolio" },
//   { title: "Contact", path: "/contact" },
// ];

// const socialLinks = [
//   { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
//   { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
//   { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
//   { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
// ];

// const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, isOpen }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 10 }}
//           transition={{ duration: 0.2 }}
//           className="absolute left-0 mt-2 w-64 rounded-xl bg-white dark:bg-gray-800
//                      shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//         >
//           <div className="p-2 space-y-1">
//             {items.map((item) => (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 className="group flex items-start gap-2 rounded-lg p-3 text-sm
//                           hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
//               >
//                 <div>
//                   <p className="font-medium text-gray-900 dark:text-white mb-1">
//                     {item.title}
//                   </p>
//                   {item.description && (
//                     <p className="text-gray-500 dark:text-gray-400 text-xs">
//                       {item.description}
//                     </p>
//                   )}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
//   item,
//   isOpen,
//   toggleSubmenu,
// }) => {
//   return (
//     <div className="px-4">
//       <div
//         className="flex items-center justify-between py-3 cursor-pointer"
//         onClick={toggleSubmenu}
//       >
//         <Link
//           href={item.path}
//           className="text-base font-medium text-white hover:text-sky-100
//                      transition-colors duration-200"
//         >
//           {item.title}
//         </Link>
//         {item.subMenu && (
//           <motion.div
//             animate={{ rotate: isOpen ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <HiChevronDown className="w-5 h-5 text-white" />
//           </motion.div>
//         )}
//       </div>
//       <AnimatePresence>
//         {isOpen && item.subMenu && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="ml-4 space-y-2 overflow-hidden"
//           >
//             {item.subMenu.map((subItem) => (
//               <Link
//                 key={subItem.path}
//                 href={subItem.path}
//                 className="block py-2 text-sm text-sky-100 hover:text-white
//                           transition-colors duration-200"
//               >
//                 {subItem.title}
//               </Link>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [mobileOpenItems, setMobileOpenItems] = useState<string[]>([]);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMenuOpen(false);
//     setOpenDropdown(null);
//     setMobileOpenItems([]);
//   }, [pathname]);

//   const handleDropdown = useCallback((path: string | null) => {
//     setOpenDropdown(path);
//   }, []);

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
//                    ${
//                      isScrolled
//                        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
//                        : "bg-gray-900"
//                    }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo - Left */}
//             <div className="flex-shrink-0">
//               <Link href="/" className="relative flex items-center">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ duration: 0.2 }}
//                   className="w-40 h-12 relative"
//                 >
//                   <Image
//                     src="/assets/images/logo.png"
//                     alt="Logo"
//                     fill
//                     className="object-contain"
//                     priority
//                   />
//                 </motion.div>
//               </Link>
//             </div>

//             {/* Navigation Links - Center */}
//             <div className="hidden lg:flex flex-1 justify-center items-center space-x-1">
//               {navItems.map((item) => (
//                 <div
//                   key={item.path}
//                   className="relative px-3"
//                   onMouseEnter={() => handleDropdown(item.path)}
//                   onMouseLeave={() => handleDropdown(null)}
//                 >
//                   <Link
//                     href={item.path}
//                     className={`group flex items-center text-[15px] font-medium px-4 py-2.5
//                               rounded-lg transition-all duration-300 ease-in-out
//                               ${
//                                 pathname === item.path
//                                   ? "text-sky-400 bg-sky-900/20"
//                                   : "text-gray-300 hover:text-sky-400 hover:bg-gray-800/50"
//                               }`}
//                   >
//                     <span className="relative">
//                       {item.title}
//                       <motion.span
//                         className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-full transition-all duration-300"
//                         whileHover={{ width: "100%" }}
//                       />
//                     </span>
//                     {item.subMenu && (
//                       <HiChevronDown className="w-4 h-4 ml-1" aria-hidden="true" />
//                     )}
//                   </Link>
//                   {item.subMenu && (
//                     <DropdownMenu
//                       items={item.subMenu}
//                       isOpen={openDropdown === item.path}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Social Icons - Right */}
//             <div className="hidden lg:flex items-center space-x-6">
//               {socialLinks.map((social) => {
//                 const Icon = social.icon;
//                 return (
//                   <motion.a
//                     key={social.label}
//                     whileHover={{ scale: 1.1, y: -2 }}
//                     whileTap={{ scale: 0.9 }}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-400 hover:text-sky-400 transition-colors duration-300"
//                   >
//                     <Icon className="w-5 h-5" />
//                   </motion.a>
//                 );
//               })}
//             </div>

//             {/* Mobile Menu Button */}
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setIsMenuOpen(true)}
//               className="lg:hidden p-2 rounded-lg text-white hover:bg-gray-800
//                        transition-all duration-300"
//               aria-label="Open menu"
//             >
//               <RiMenu4Fill className="w-6 h-6" />
//             </motion.button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             className="fixed inset-0 z-50 lg:hidden bg-gray-900/30 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="absolute right-0 top-0 bottom-0 w-full max-w-sm
//                        bg-gradient-to-br from-gray-900 to-gray-800"
//             >
//               <div className="flex items-center justify-end p-4">
//                 <motion.button
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsMenuOpen(false)}
//                   className="p-2 rounded-lg text-white hover:bg-gray-700/50
//                            transition-all duration-300"
//                 >
//                   <RxCross2 className="w-6 h-6" />
//                 </motion.button>
//               </div>

//               <div className="flex-1 overflow-y-auto py-4">
//                 {navItems.map((item) => (
//                   <MobileMenuItem
//                     key={item.path}
//                     item={item}
//                     isOpen={mobileOpenItems.includes(item.path)}
//                     toggleSubmenu={() => {
//                       setMobileOpenItems((prev) =>
//                         prev.includes(item.path)
//                           ? prev.filter((p) => p !== item.path)
//                           : [...prev, item.path]
//                       );
//                     }}
//                   />
//                 ))}
//               </div>

//               {/* Mobile Social Links */}
//               <div className="grid grid-cols-4 gap-4 p-6 border-t border-gray-700
//                            bg-gray-800/30">
//                 {socialLinks.map((social) => {
//                   const Icon = social.icon;
//                   return (
//                     <motion.a
//                       key={social.label}
//                       whileHover={{ scale: 1.1, y: -2 }}
//                       whileTap={{ scale: 0.9 }}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center justify-center p-3 rounded-lg
//                                bg-gray-700/50 text-white hover:bg-gray-600/50
//                                transition-all duration-300"
//                     >
//                       <Icon className="w-5 h-5" />
//                     </motion.a>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Header;
