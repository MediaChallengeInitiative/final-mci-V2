import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Innovator Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The innovator you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/innovators"
            className="inline-flex items-center text-sky-500 hover:text-sky-600 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Innovators
          </Link>
        </div>
      </div>
    </div>
  );
}
