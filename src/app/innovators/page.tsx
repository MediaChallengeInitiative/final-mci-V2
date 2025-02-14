import React from "react";
import { getInnovators } from "@/lib/api/innovators";
import InnovatorsPage from "@/components/innovators/InnovatorsPage";
import { InnovatorsResponse } from "@/types/innovator";
import { Metadata } from "next";

// Runtime configuration
export const runtime = "edge";
export const preferredRegion = "auto";
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

// Metadata for SEO
export const metadata: Metadata = {
  title: "Innovators | Media Challenge Initiative",
  description: "Discover innovative organizations and initiatives in media",
  openGraph: {
    title: "Innovators | Media Challenge Initiative",
    description: "Discover innovative organizations and initiatives in media",
    type: "website",
    images: [
      {
        url: "/images/og-innovators.jpg",
        width: 1200,
        height: 630,
        alt: "MCI Innovators"
      }
    ]
  }
};

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  // Extract and validate search parameters
  const page = Math.max(1, Number(searchParams["page"]) || 1);
  const search =
    typeof searchParams["search"] === "string"
      ? searchParams["search"]
      : undefined;
  const perPage = Math.min(
    50,
    Math.max(1, Number(searchParams["per_page"]) || 6)
  );
  const view = searchParams["view"] === "table" ? "table" : "grid";

  try {
    // Fetch innovators data
    const response: InnovatorsResponse = await getInnovators({
      page,
      search,
      per_page: perPage
    });

    // Return the client component with initial data
    return (
      <InnovatorsPage initialInnovators={response.data} meta={response.meta} />
    );
  } catch (error) {
    // Log error for server-side debugging
    console.error("[Innovators Page Error]:", error);

    // Return error UI
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Unable to Load Innovators
            </h2>
            <p className="text-gray-600 mb-8">
              We encountered an error while loading the innovators. Please try
              again later or contact support if the problem persists.
            </p>
            <div className="space-y-4">
              <a
                href="/"
                className="inline-block bg-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors"
              >
                Return Home
              </a>
              <button
                onClick={() => window.location.reload()}
                className="block w-full text-sky-500 hover:text-sky-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
