import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Calendar } from "lucide-react";
import { getInnovatorBySlug, getStorageUrl } from "@/lib/api/innovators";
import { notFound } from "next/navigation";

// Define the PageProps interface directly
interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function InnovatorPage({ params }: PageProps) {
  try {
    const innovator = await getInnovatorBySlug(params.slug);
    const createdDate = new Date(innovator.created_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Enhanced Hero Section */}
        <div className="relative h-[50vh] lg:h-[70vh] 2xl:h-[80vh]">
          {innovator.image && (
            <Image
              src={getStorageUrl(innovator.image)}
              alt={innovator.name}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          {/* Enhanced Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
              <div className="max-w-5xl">
                {/* Back button with enhanced hover effect */}
                <Link
                  href="/innovators"
                  className="group inline-flex items-center text-white/90 hover:text-white mb-8 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="text-lg">Back to Innovators</span>
                </Link>

                {/* Enhanced Title and Logo Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                  {innovator.logo && (
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-xl p-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                      <div className="relative w-full h-full">
                        <Image
                          src={getStorageUrl(innovator.logo)}
                          alt={`${innovator.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white tracking-tight">
                    {innovator.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Meta information */}
            <div className="flex flex-wrap gap-6 text-base text-gray-600 mb-12">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span>Added on {createdDate}</span>
              </div>
              {innovator.website_link && (
                <a
                  href={innovator.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-sky-50 text-sky-600 px-4 py-2 rounded-full hover:bg-sky-100 transition-colors duration-300"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  <span>Visit Website</span>
                </a>
              )}
            </div>

            {/* Enhanced Description */}
            <div className="prose prose-lg lg:prose-xl max-w-none">
              <p className="text-2xl lg:text-3xl font-light text-gray-600 leading-relaxed">
                {innovator.short_description}
              </p>
            </div>

            {/* Enhanced Added by section */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-base text-gray-600 flex items-center">
                <span className="font-medium text-gray-900">Added by</span>
                <span className="ml-2">{innovator.creator.name}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("[Innovator Page Error]:", error);
    notFound();
  }
}
