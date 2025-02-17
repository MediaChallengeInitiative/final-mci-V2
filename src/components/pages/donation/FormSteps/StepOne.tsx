// components/pages/donation/FormSteps/StepOne.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { StepOneProps } from "../types";

const StepOne: React.FC<StepOneProps> = ({
  donationType,
  setDonationType,
  amount,
  setAmount,
  customAmount,
  setCustomAmount
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="space-y-6 sm:space-y-8"
  >
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-white">
        Select Donation Type
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {["once", "monthly", "annual"].map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDonationType(type)}
            className={`px-4 py-3 rounded-xl capitalize transition-all text-sm sm:text-base
              ${
                donationType === type
                  ? "bg-sky-500 text-white"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
          >
            {type}
          </motion.button>
        ))}
      </div>
    </div>

    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-white">
        Select Amount
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {["50", "100", "200", "500", "1000", "custom"].map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setAmount(value);
              if (value !== "custom") setCustomAmount("");
            }}
            className={`px-4 py-3 rounded-xl transition-all text-sm sm:text-base
              ${
                amount === value
                  ? "bg-sky-500 text-white"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
          >
            {value === "custom" ? "Custom" : `$${value}`}
          </motion.button>
        ))}
      </div>

      {amount === "custom" && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="pt-2"
        >
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white text-sm sm:text-base"
          />
        </motion.div>
      )}
    </div>
  </motion.div>
);

export default StepOne;
