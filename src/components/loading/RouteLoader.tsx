"use client";

import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface RouteLoaderProps {
  text?: string;
}

const RouteLoader: React.FC<RouteLoaderProps> = ({ text }) => (
  <div className="min-h-screen">
    <LoadingSpinner
      fullScreen
      overlay
      customText={text || "Loading content..."}
    />
  </div>
);

export default RouteLoader;