// src/components/loading/LoadingProvider.tsx
"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingContext } from "./LoadingContext";
import { MediaLoadingSpinner } from "./MediaLoadingSpinner";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string | undefined>();

  const setLoading = (loading: boolean, text?: string) => {
    setIsLoading(loading);
    setLoadingText(text);
  };

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      <AnimatePresence mode="sync">
        {isLoading && <MediaLoadingSpinner customText={loadingText} />}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  );
}
export { LoadingContext };

