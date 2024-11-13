// app/blog/page.tsx
import React from "react";
import { Blog } from "@/interface/interface";
import { getAllBlogs, getTotalBlogs } from "@/utils/get-all-blogs";
import Breadcrumb from "@/components/breadcrumb";
import BlogClientPage from "@/components/BlogClientPage";

export default async function BlogPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = 6; // Two rows of three blogs each

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const initialBlogs: Blog[] = await getAllBlogs(start, end);
  const totalBlogs: number = await getTotalBlogs();

  return (
    <section className="bg-white w-full py-12 md:py-24 lg:py-16 lg:mt-0 mt-2">
      <Breadcrumb title="Blog" />
      <BlogClientPage
        initialBlogs={initialBlogs}
        totalBlogs={totalBlogs}
        per_page={per_page}
      />
    </section>
  );
}
