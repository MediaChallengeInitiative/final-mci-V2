// app/press/articles/page.tsx
import React from "react";
import { getArticles } from "@/lib/api/articles";
import ArticlesPage from "@/components/articles/ArticlesPage";
import { ArticlesResponse } from "@/types/article";

export const runtime = "edge";
export const preferredRegion = "auto";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams["page"] ?? "1");
  const category = searchParams["category"]?.toString();
  const search = searchParams["search"]?.toString();

  try {
    const response: ArticlesResponse = await getArticles(
      page,
      category,
      search
    );

    return (
      <ArticlesPage initialArticles={response.data} meta={response.meta} />
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Failed to load articles</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
}
