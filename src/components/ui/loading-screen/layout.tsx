// components/ui/loading-screen/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./index";

interface LoadingLayoutProps {
  children: React.ReactNode;
  minimumLoadingTime?: number; // Minimum time to show loading screen
}

export const LoadingLayout: React.FC<LoadingLayoutProps> = ({
  children,
  minimumLoadingTime = 2000 // 2 seconds minimum loading time
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minimumLoadingTime);

    return () => clearTimeout(timer);
  }, [minimumLoadingTime]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <div style={{ opacity: isLoading ? 0 : 1 }}>{children}</div>
    </>
  );
};
