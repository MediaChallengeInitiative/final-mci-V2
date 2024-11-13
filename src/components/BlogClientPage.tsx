// app/blog/BlogClientPage.tsx
'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";
import { getAllBlogs } from "@/utils/get-all-blogs";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const date = new Date(blog.publishedAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  return (
    <div className="bg-white border-0 lg:border lg:border-stone-400 hover:border-transparent border-opacity-40 rounded-none lg:rounded-xl hover:bg-[#0097d1] p-6 group relative overflow-hidden transition-colors duration-300">
      <div className="text-4xl font-bold mb-2 text-[#2B2B2B] group-hover:text-white transition-colors duration-300">
        {day}
      </div>
      <div className="text-[#0097d1] text-xl group-hover:text-white mb-4 transition-colors duration-300">
        {month}
      </div>
      <h3 className="text-xl line-clamp-2 font-semibold mb-2 text-[#2B2B2B] group-hover:text-white transition-colors duration-300">
        {blog.title}
      </h3>
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={urlFor(blog.mainImage).url()}
          alt={blog.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={blog.link} passHref>
            <button className="bg-white text-[#0097d1] px-4 py-2 rounded-full hover:bg-[#0097d1] hover:text-white transition-colors duration-300">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function BlogClientPage({
  initialBlogs,
  totalBlogs,
  per_page
}: {
  initialBlogs: Blog[];
  totalBlogs: number;
  per_page: number;
}) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [page, setPage] = useState(2); // Start from page 2 as we already have the first page
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const start = (page - 1) * per_page;
    const end = start + per_page;
    const newBlogs = await getAllBlogs(start, end);
    setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  return (
    <div className="w-full lg:container flex flex-col mx-auto px-0 lg:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 lg:gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {blogs.length < totalBlogs && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-[#0097d1] text-white rounded-full hover:bg-[#007bb3] transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}