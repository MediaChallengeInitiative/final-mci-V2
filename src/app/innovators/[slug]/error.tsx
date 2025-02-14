"use client";

import Link from "next/link";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Something Went Wrong
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {error.message ||
              "An unexpected error occurred. Please try again later."}
          </p>
          <div className="space-y-6">
            <button
              onClick={reset}
              className="w-full sm:w-auto inline-block bg-sky-500 text-white px-8 py-4 rounded-xl font-medium hover:bg-sky-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              Try Again
            </button>
            <Link
              href="/innovators"
              className="block text-sky-500 hover:text-sky-600 transition-colors duration-300"
            >
              Back to Innovators
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
