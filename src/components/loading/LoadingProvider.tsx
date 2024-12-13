"use client";

import React, { createContext, useContext, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingContextType {
  setLoading: (loading: boolean, text?: string) => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string | undefined>();

  const setLoading = (loading: boolean, text?: string) => {
    setIsLoading(loading);
    setLoadingText(text);
  };

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {isLoading && (
        <LoadingSpinner fullScreen overlay customText={loadingText} />
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
