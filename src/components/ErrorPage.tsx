"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertOctagon, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  message: string;
  title?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  message,
  title = "Oops! Something went wrong"
}) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-red-50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center"
            >
              <AlertOctagon className="w-8 h-8 text-red-500" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
              <p className="text-gray-600">{message}</p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={handleRefresh}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg
                         bg-red-600 text-white font-medium hover:bg-red-700
                         transform hover:-translate-y-0.5 transition-all duration-150"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg
                         bg-gray-100 text-gray-700 font-medium hover:bg-gray-200
                         transform hover:-translate-y-0.5 transition-all duration-150"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="px-6 py-4 bg-gray-50 text-center"
          >
            <p className="text-sm text-gray-500">
              If the problem persists, please contact support
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
