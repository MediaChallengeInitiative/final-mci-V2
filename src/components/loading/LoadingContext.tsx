// src/components/loading/LoadingContext.tsx
"use client";

import React, { createContext, useContext } from "react";

interface LoadingContextType {
  setLoading: (loading: boolean, text?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingContext, useLoading };