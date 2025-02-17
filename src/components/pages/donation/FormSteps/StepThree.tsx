// components/pages/donation/FormSteps/StepThree.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { StepThreeProps } from "../types";

const StepThree: React.FC<StepThreeProps> = ({
  donationType,
  amount,
  customAmount
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="space-y-8"
  >
    <div className="bg-white/5 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-white">Donation Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sky-200">
          <span>Amount:</span>
          <span className="font-semibold text-white">
            ${amount === "custom" ? customAmount : amount}
          </span>
        </div>
        <div className="flex justify-between text-sky-200">
          <span>Type:</span>
          <span className="font-semibold text-white capitalize">
            {donationType}
          </span>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">Payment Details</h3>
      <div className="space-y-4">
        <div className="relative">
          <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-sky-300" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
            placeholder="Card number"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            className="px-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
            placeholder="MM/YY"
          />
          <input
            type="text"
            className="px-4 py-3 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-white"
            placeholder="CVC"
          />
        </div>
      </div>
    </div>

    <button className="w-full py-4 bg-sky-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-sky-500/25 transition-all">
      Complete Donation
    </button>
  </motion.div>
);

export default StepThree;
