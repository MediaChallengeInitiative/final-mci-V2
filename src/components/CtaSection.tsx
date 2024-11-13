// components/CtaSection.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Target, CheckCircle2 } from "lucide-react";
import { CtaSectionProps } from "@/interface/innovation";
import { SignUpModal } from "./SignUpModal";

export const CtaSection: React.FC<CtaSectionProps> = ({
  onSuccess,
  onError
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  const handleSuccess = () => {
    setSubmitted(true);
    onSuccess?.();
  };

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] animate-[pulse_4s_ease-in-out_infinite]" />
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.6 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-sky-500/20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-white backdrop-blur-sm">
                <Target className="w-4 h-4 mr-2" />
                Join the Innovation Movement
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Transform Your Ideas?
              </h2>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of innovators who are already creating the future
                with our platform. Start your journey today and be part of
                something extraordinary.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors inline-flex lg:w-[40%] mx-auto items-center justify-center group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SignUpModal isOpen={isModalOpen} onClose={handleModalClose} />

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Application submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
