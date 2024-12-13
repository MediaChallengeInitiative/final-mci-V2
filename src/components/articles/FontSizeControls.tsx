"use client";

import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Theme } from "@/interface/interface";

export interface FontSizeControlsProps {
  onIncrease: () => void;
  onDecrease: () => void;
  currentTheme: Theme;
}

export const FontSizeControls = memo(function FontSizeControls({
  onIncrease,
  onDecrease,
  currentTheme
}: FontSizeControlsProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure that font size controls are only used on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render nothing on the server-side or during SSR to prevent hydration issues
  if (!isClient) {
    return <div className="fixed bottom-6 right-6 w-24 h-12" />;
  }

  return (
    <div className="fixed bottom-6 right-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-sm rounded-full p-2 space-x-2 shadow-xl z-50 flex"
      >
        <button
          onClick={onIncrease}
          className={`p-2 hover:bg-white/10 rounded-full transition-colors duration-200 ${currentTheme.text}`}
          aria-label="Increase font size"
        >
          <span className="sr-only">Increase font size</span>
          <span className="inline-block min-w-[1.5rem] text-center">A+</span>
        </button>
        <button
          onClick={onDecrease}
          className={`p-2 hover:bg-white/10 rounded-full transition-colors duration-200 ${currentTheme.text}`}
          aria-label="Decrease font size"
        >
          <span className="sr-only">Decrease font size</span>
          <span className="inline-block min-w-[1.5rem] text-center">A-</span>
        </button>
      </motion.div>
    </div>
  );
});

FontSizeControls.displayName = "FontSizeControls";

// "use client";

// import React, { memo, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Theme } from "@/interface/interface";

// interface FontSizeControlsProps {
//   onIncrease: () => void;
//   onDecrease: () => void;
//   currentTheme: Theme;
// }

// export const FontSizeControls = memo(function FontSizeControls({
//   onIncrease,
//   onDecrease,
//   currentTheme
// }: FontSizeControlsProps) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     // Return null or a placeholder to prevent hydration mismatch
//     return null;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-sm rounded-full p-2 space-x-2 shadow-xl z-50"
//     >
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onIncrease}
//         className={`p-2 hover:bg-white/10 rounded-full transition-colors duration-200 ${currentTheme.text}`}
//         aria-label="Increase font size"
//       >
//         <span className="sr-only">Increase font size</span>
//         <span aria-hidden="true">A+</span>
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onDecrease}
//         className={`p-2 hover:bg-white/10 rounded-full transition-colors duration-200 ${currentTheme.text}`}
//         aria-label="Decrease font size"
//       >
//         <span className="sr-only">Decrease font size</span>
//         <span aria-hidden="true">A-</span>
//       </motion.button>
//     </motion.div>
//   );
// });

// FontSizeControls.displayName = "FontSizeControls";
