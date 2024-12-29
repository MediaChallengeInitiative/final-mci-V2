"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Calendar, Users, CheckCircle } from "lucide-react";
import Image from "next/image";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal Component
export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header Image */}
            <div className="relative h-48">
              <Image
                src="/assets/images/fellowship/fellowship-hero.jpg"
                alt="Media Challenge Fellowship"
                layout="fill"
                objectFit="cover"
                className="brightness-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Media Challenge Fellowship 2025
                  </h2>
                  <p className="text-white/90">Applications Now Open</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl text-black font-semibold mb-4">
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Intensive multimedia training",
                      "One-on-one mentorship",
                      "Industry networking",
                      "Career development"
                    ].map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start text-black/20 font-thin"
                      >
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl text-black font-semibold mb-4">
                    Program Details
                  </h3>
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-orange-500 mr-2" />
                      <span>Deadline: January 20th, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-orange-500 mr-2" />
                      <span>25 Fellows will be selected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <a
                  href="/fellowship/application"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <p className="mt-4 text-sm text-gray-500">
                  For journalism and media students only
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
