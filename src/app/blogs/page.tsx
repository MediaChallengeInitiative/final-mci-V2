import React from "react";
import { getAllBlogs, getTotalBlogs } from "@/utils/get-all-blogs";
import BlogsPage from "@/components/blogs/BlogsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Blogs",
  description: "Explore our collection of blogs and stories"
};

type SearchParams = { [key: string]: string | string[] | undefined };

interface PageProps {
  params?: Record<string, string>; // Adjusted to allow params for dynamic routes
  searchParams: SearchParams;
}

export const runtime = "edge";
export const preferredRegion = "auto";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = 6;

  const [initialBlogs, totalBlogs] = await Promise.all([
    getAllBlogs((page - 1) * per_page, page * per_page),
    getTotalBlogs()
  ]);

  return (
    <BlogsPage
      initialBlogs={initialBlogs}
      totalBlogs={totalBlogs}
      page={page}
      per_page={per_page}
    />
  );
}
