import React from "react";
import { getAllArticles, getTotalArticles } from "@/utils/get-all-articles";
import ArticlesPage from "@/components/articles/ArticlesPage";

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
  const per_page = 6;

  try {
    const [initialArticles, totalArticles] = await Promise.all([
      getAllArticles((page - 1) * per_page, per_page),
      getTotalArticles(),
    ]);

    return (
      <ArticlesPage
        initialArticles={initialArticles}
        totalArticles={totalArticles}
        page={page}
        per_page={per_page}
      />
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return <div>Failed to load articles. Please try again later.</div>;
  }
}
