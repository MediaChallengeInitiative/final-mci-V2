// components/pages/donation/ProgressSteps.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ProgressStepsProps } from "../types";

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => (
  <div className="flex justify-between mb-8 sm:mb-12 relative px-2 sm:px-4">
    {[1, 2, 3].map((step) => (
      <div key={step} className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={false}
          animate={{
            scale: currentStep >= step ? 1.1 : 1,
            backgroundColor:
              currentStep >= step
                ? "rgb(14, 165, 233)"
                : "rgba(255, 255, 255, 0.1)"
          }}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
              ${currentStep >= step ? "bg-sky-500" : "bg-white/10"}`}
        >
          {currentStep > step ? (
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <span className="text-sm sm:text-base text-white">{step}</span>
          )}
        </motion.div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm text-sky-200 whitespace-nowrap">
          {step === 1
            ? "Choose Amount"
            : step === 2
            ? "Your Details"
            : "Payment"}
        </div>
      </div>
    ))}
    <div className="absolute top-4 sm:top-5 left-0 w-full h-0.5 bg-white/10 -z-10">
      <motion.div
        className="h-full bg-sky-500"
        initial={{ width: "0%" }}
        animate={{ width: `${(currentStep - 1) * 50}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </div>
);

export default ProgressSteps;
