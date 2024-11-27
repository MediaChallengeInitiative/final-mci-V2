import React, { memo } from "react";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { Theme } from "@/interface/interface";

interface ColorSwitcherProps {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  themes: Theme[];
}

export const ColorSwitcher = memo(function ColorSwitcher({
  currentTheme,
  setCurrentTheme,
  isOpen,
  setIsOpen,
  themes
}: ColorSwitcherProps) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg"
      >
        <Palette className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-2 p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-xl"
        >
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => setCurrentTheme(theme)}
                className={`w-8 h-8 rounded-lg bg-gradient-to-r ${theme.cardBg} hover:scale-110 transition-transform duration-200 shadow-lg`}
                title={theme.name}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
});
