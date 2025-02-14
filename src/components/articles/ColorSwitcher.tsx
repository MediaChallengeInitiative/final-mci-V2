"use client";
import React from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { ColorSwitcherProps } from "@/interface/interface";
import { themes } from "@/config/themes";

const ColorSwitcher = React.memo<ColorSwitcherProps>(
  ({ setCurrentTheme, isColorMenuOpen, setIsColorMenuOpen }) => {
    return (
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 mb-2 shadow-lg"
        >
          <Palette className="w-6 h-6 text-gray-400" />
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
                  className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${theme.cardBg} hover:scale-110 transition-transform duration-200 shadow-lg`}
                  title={theme.name}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

ColorSwitcher.displayName = "ColorSwitcher";

export default ColorSwitcher;
