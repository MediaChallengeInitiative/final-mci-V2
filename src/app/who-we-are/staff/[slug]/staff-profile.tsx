// staff-profile.tsx - Client Component
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { StaffData } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";
import { BriefcaseBusiness, BookOpen, Palette } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import Image from "next/image";

// Define theme interface
interface Theme {
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondary: string;
}

// Define ColorSwitcher props interface
interface ColorSwitcherProps {
  currentTheme: Theme;
  setCurrentTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isColorMenuOpen: boolean;
  setIsColorMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define StaffProfile props interface
interface StaffProfileProps {
  staff: StaffData;
}

const themes: Theme[] = [
  {
    name: "light",
    bg: "bg-white",
    text: "text-gray-900",
    accent: "from-gray-200 to-gray-100",
    secondary: "text-gray-600"
  }
  // ... rest of the themes array remains the same
];

const ColorSwitcher: React.FC<ColorSwitcherProps> = ({
  setCurrentTheme,
  isColorMenuOpen,
  setIsColorMenuOpen
}) => (
  <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
    <button
      onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 mb-2"
    >
      <Palette className="w-6 h-6 text-white" />
    </button>

    {isColorMenuOpen && (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-xl"
      >
        <div className="grid grid-cols-2 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setCurrentTheme(theme)}
              className={`w-8 h-8 rounded-lg ${theme.bg} hover:scale-110 transition-transform duration-200 shadow-lg`}
              title={theme.name}
            />
          ))}
        </div>
      </motion.div>
    )}
  </div>
);

const StaffProfile: React.FC<StaffProfileProps> = ({ staff }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState<boolean>(true);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${currentTheme.bg}`}
    >
      <ColorSwitcher
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        isColorMenuOpen={isColorMenuOpen}
        setIsColorMenuOpen={setIsColorMenuOpen}
      />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sticky top-8 relative group"
            >
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${currentTheme.accent} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  width={300}
                  height={300}
                  src={urlFor(staff.image).url()}
                  alt={staff.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <h1
                  className={`text-3xl md:text-5xl font-bold tracking-tight uppercase ${currentTheme.text}`}
                >
                  <TypewriterText
                    text={staff.name}
                    className={currentTheme.text}
                  />
                </h1>

                <div className="group inline-block">
                  <div className="flex items-center space-x-3">
                    <BriefcaseBusiness
                      className={`text-2xl ${currentTheme.text} md:text-3xl font-bold tracking-wide`}
                    />
                    <h2
                      className={`text-2xl ${currentTheme.text} md:text-3xl font-bold tracking-wide uppercase`}
                    >
                      Current Role
                    </h2>
                  </div>
                  <div
                    className={`prose prose-lg max-w-none ${currentTheme.text}`}
                  >
                    <p
                      className={`text-xl md:text-3xl ${currentTheme.secondary} tracking-wide`}
                    >
                      <span className="font-light px-2 sm:px-10">
                        {staff.title}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen
                    className={`text-2xl ${currentTheme.text} md:text-3xl font-bold tracking-wide`}
                  />
                  <h2
                    className={`text-2xl ${currentTheme.text} md:text-3xl font-bold tracking-wide uppercase`}
                  >
                    Biography
                  </h2>
                </div>

                <div
                  className={`prose prose-lg max-w-none ${currentTheme.text}`}
                >
                  {staff.bio?.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                      className={`text-lg md:text-xl leading-relaxed tracking-wide ${currentTheme.secondary} mb-6`}
                      style={{ wordSpacing: "0.1em" }}
                    >
                      {paragraph.children[0].text}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
