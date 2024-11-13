"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaChevronDown
} from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

interface DropdownItem {
  text: string;
  href: string;
}

interface NavItemProps {
  text: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

const SocialIcon: React.FC<{
  href: string;
  Icon: React.ElementType;
  text: string;
}> = ({ href, Icon, text }) => (
  <li className="iso-pro relative cursor-pointer group">
    <span className="absolute opacity-0 group-hover:opacity-20 w-8 h-8 rounded-full transition-all duration-300"></span>
    <span className="absolute opacity-0 group-hover:opacity-40 w-8 h-8 rounded-full transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></span>
    <span className="absolute opacity-0 group-hover:opacity-60 w-8 h-8 rounded-full transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"></span>
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      <Icon className="svg w-8 h-8 p-1.5 rounded-full text-white fill-current transition-all duration-300 shadow-inner shadow-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
    <div className="text opacity-0 absolute z-50 rounded px-2 py-1 transition-all duration-300 text-white bg-white/30 shadow-md shadow-gray-400/20 group-hover:opacity-100 group-hover:translate-x-3 group-hover:-translate-y-0.5 group-hover:skew-x-[-5deg]">
      {text}
    </div>
  </li>
);

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdowns(new Set());
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prevOpen) => {
      const newOpen = new Set(prevOpen);
      if (newOpen.has(index)) {
        newOpen.delete(index);
      } else {
        newOpen.add(index);
      }
      return newOpen;
    });
  };

  const NavItem: React.FC<
    NavItemProps & { index: number; isMobile?: boolean }
  > = ({ text, href, dropdownItems, index, isMobile = false }) => (
    <div className={`relative -mt-5 ${isMobile ? "w-full" : "group"}`}>
      <div className="flex items-center justify-between">
        <Link
          href={href}
          className={`flex items-center px-3 py-2 text-md md:text-base font-medium text-white hover:text-gray-300 transition-colors duration-200 ${
            isMobile ? "text-xl" : ""
          }`}
          onClick={() => isMobile && !dropdownItems && toggleMobileMenu()}
        >
          {text}
        </Link>
        {dropdownItems && (
          <button
            className="flex items-center px-3 py-3 mt-5 text-white  focus:outline-none"
            onClick={() => isMobile && toggleDropdown(index)}
          >
            <FaChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                openDropdowns.has(index) ? "transform rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
      {dropdownItems && (
        <div
          className={`
          ${
            isMobile
              ? `mt-2 space-y-2 ${
                  openDropdowns.has(index) ? "block" : "hidden"
                }`
              : "absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white bg-opacity-60 border-b-2 border-stone-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
          }
        `}
        >
          {dropdownItems.map((item, dropdownIndex) => (
            <Link
              key={dropdownIndex}
              href={item.href}
              className={`flex items-center px-4 pb-2 text-sm ${
                isMobile
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-sky-500 bg-opacity-60 border-b-2 border-gray-400"
              } transition-colors duration-200`}
              onClick={() => isMobile && toggleMobileMenu()}
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const navItems: NavItemProps[] = [
    { text: "Home", href: "/" },
    {
      text: "Who We Are",
      href: "/who-we-are",
      dropdownItems: [
        { text: "Our Staff", href: "/who-we-are/staff?page=1&per_page=8" },
        { text: "Our Board", href: "/who-we-are/board" },
        { text: "Our History", href: "/who-we-are/our-history" },
        { text: "Our Values", href: "#" },
        { text: "Our Partners", href: "/who-we-are/our-partners" }
      ]
    },
    {
      text: "Programs",
      href: "/programs",
      dropdownItems: [
        {
          text: "Next Generation of Journalists",
          href: "/programs/next-generation-of-journalists"
        },
        {
          text: "Media Innovations for Media Viability",
          href: "/programs/media-innovations-for-media-viability"
        },
        {
          text: "Content Catalyst Program",
          href: "https://catalyst.mciug.org/"
        },
        {
          text: "Media, News, Information & Digital Literacy",
          href: "https://mil4kids.org/"
        }
      ]
    },
    {
      text: "Platforms",
      href: "/platforms",
      dropdownItems: [
        { text: "MCI Radio", href: "https://mciradio.live/" },
        { text: "MCI Academy", href: "https://academy.mciug.org/" },
        { text: "MCI Media Hub", href: "https://mcimediahubug.com/" },
        { text: "Solutions Now Africa", href: "https://solutionsnow.africa/" }
      ]
    },
    { text: "Articles", href: "/articles" },
    { text: "Blogs", href: "/blogs" }
    // { text: "Services", href: "/services" }
  ];

  const socialIcons = [
    {
      href: "https://twitter.com/IMChallengeug",
      Icon: FaXTwitter,
      text: "Twitter"
    },
    {
      href: "https://www.facebook.com/Mediachallengeinitiative/",
      Icon: FaFacebook,
      text: "Facebook"
    },
    {
      href: "https://www.instagram.com/mediachallengeug",
      Icon: FaInstagram,
      text: "Instagram"
    },
    {
      href: "https://ug.linkedin.com/in/mpindi-abaas-b385a121",
      Icon: FaLinkedin,
      text: "LinkedIn"
    },
    {
      href: "https://youtube.com/@mediachallengeinitiative",
      Icon: CiYoutube,
      text: "YouTube"
    }
  ];

  return (
    <header
      className={`${
        isSticky ? "fixed top-0 bg-black shadow-lg" : "absolute bg-black"
      } w-full z-50 transition-all duration-300`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 -mt-5">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={80}
                height={80}
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item, index) => (
              <NavItem key={index} {...item} index={index} />
            ))}
          </nav>

          {/* Social Icons - Desktop */}
          <div className="hidden -mt-5 md:flex items-center">
            <ul className="flex space-x-4">
              {socialIcons.map((icon, index) => (
                <SocialIcon key={index} {...icon} />
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          <nav className="flex-grow overflow-y-auto">
            <div className="px-4 py-2 space-y-4">
              {navItems.map((item, index) => (
                <NavItem key={index} {...item} index={index} isMobile={true} />
              ))}
            </div>
          </nav>
          <footer className="h-[100px] p-4 border-t border-gray-400">
            <ul className="flex justify-center space-x-6">
              {socialIcons.map((icon, index) => (
                <SocialIcon key={index} {...icon} />
              ))}
            </ul>
          </footer>
        </div>
      </div>
    </header>
  );
};

export default Header;
