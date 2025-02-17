// components/pages/next-gen/sections/ContactSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export const ContactSection: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Program
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Take the first step towards your journalism career
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white text-sm">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-sky-500 text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-sky-500 text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm">Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-sky-500 text-white h-32"
                  placeholder="Tell us about yourself"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-sky-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-sky-600 transition-colors duration-300"
              >
                <Send className="w-5 h-5" />
                Submit Application
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
