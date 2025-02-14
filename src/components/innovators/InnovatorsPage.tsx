// app/innovators/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { getInnovators } from "@/lib/api/innovators";
import { BaseInnovator, PaginationMeta } from "@/types/innovator";
import { InnovatorsHeroSection } from "./HeroSection";
import { Input } from "@/components/ui/input";
import GridView from "./GridView";
import TableView from "./TableView";

interface InnovatorsPageProps {
  initialInnovators: BaseInnovator[];
  meta: PaginationMeta;
}

export default function InnovatorsPage({
  initialInnovators,
  meta
}: InnovatorsPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // State
  const [innovators, setInnovators] = useState(initialInnovators);
  const [pagination, setPagination] = useState({
    currentPage: meta.current_page,
    lastPage: meta.last_page,
    total: meta.total
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [view, setView] = useState<"grid" | "table">((searchParams.get("view") as "grid" | "table") || "grid");

  // Fetch innovators with search and pagination
  const fetchInnovators = async (page = 1, search = "") => {
    try {
      setIsLoading(true);
      const response = await getInnovators({
        page,
        search,
        per_page: 12 // Increased from 6 to 12 for better grid layout
      });

      setInnovators(response.data);
      setPagination({
        currentPage: response.meta.current_page,
        lastPage: response.meta.last_page,
        total: response.meta.total
      });

      // Update URL
      const params = new URLSearchParams(searchParams);
      if (page !== 1) params.set("page", page.toString());
      if (search) params.set("search", search);
      params.set("view", view);
      const newUrl = params.toString() ? `?${params.toString()}` : "";
      router.push(newUrl, { scroll: false });
    } catch (err) {
      setError("Failed to fetch innovators");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchInnovators(1, searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // View change handler
  const handleViewChange = (newView: "grid" | "table") => {
    setView(newView);
    const params = new URLSearchParams(searchParams);
    params.set("view", newView);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => fetchInnovators(1, searchTerm)}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <InnovatorsHeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and View Toggle */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search innovators..."
                className="pl-10 w-full h-12 text-base border-gray-200 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleViewChange("grid")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  view === "grid"
                    ? "bg-sky-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => handleViewChange("table")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  view === "table"
                    ? "bg-sky-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-gray-600">
          {pagination.total > 0 ? (
            <p>
              Showing {innovators.length} of {pagination.total} innovators
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          ) : (
            <p>No innovators found{searchTerm && ` matching "${searchTerm}"`}</p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {view === "grid" ? (
            <GridView innovators={innovators} isLoading={isLoading} />
          ) : (
            <TableView innovators={innovators} isLoading={isLoading} />
          )}
        </div>

        {/* Pagination */}
        {pagination.lastPage > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(pagination.lastPage)].map((_, index) => (
              <button
                key={index}
                onClick={() => fetchInnovators(index + 1, searchTerm)}
                className={`w-10 h-10 rounded-xl transition-all duration-300 ${
                  pagination.currentPage === index + 1
                    ? "bg-sky-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}