// components/pages/donation/DonationPage.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Dynamic imports for components
const HeroSection = dynamic(() => import("./HeroSection"), {
  loading: () => <LoadingSpinner />
});

const DonationForm = dynamic(() => import("./DonationForm"), {
  loading: () => <LoadingSpinner />
});

const LoadingSpinner = () => (
  <div className="w-full h-[200px] flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
  </div>
);

const DonationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute -top-48 -left-48 w-96 h-96"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Background circle elements */}
      </motion.div>

      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <DonationForm />
      </Suspense>
    </div>
  );
};

export default DonationPage;
