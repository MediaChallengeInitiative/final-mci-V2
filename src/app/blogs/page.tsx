import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { getAllBlogs, getTotalBlogs } from "@/utils/get-all-blogs";
import { Blog } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";

  const per_page = searchParams["per_page"] ?? "10";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const blogs: Blog[] = await getAllBlogs(start, end);

  // console.log(blogs);

  const total: number = await getTotalBlogs();

  const firstBlog = blogs.find((blog) => blog.priority === "firstBlog");
  const secondBlog = blogs.find((blog) => blog.priority === "secondBlog");
  const thirdBlog = blogs.find((blog) => blog.priority === "thirdBlog");

  // console.log(firstBlog);
  // console.log(secondBlog);
  // console.log(thirdBlog);

  return (
    <section className="w-full py-12 md:py-24 lg:py-28 lg:mt-0 mt-2">
      <div className="container grid gap-12 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {firstBlog && (
            <div className="group relative overflow-hidden rounded-xl lg:h-auto h-80">
              <img
                alt={firstBlog.title}
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                height="400"
                src={urlFor(firstBlog.mainImage).url()}
                style={{
                  aspectRatio: "800/400",
                  objectFit: "cover"
                }}
                width="800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-6 md:p-8 lg:p-10">
                <div className="flex h-full flex-col justify-end">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-gray-900 px-3 py-1 text-sm text-gray-50">
                      Featured
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-50 md:text-3xl lg:text-4xl">
                      {firstBlog.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      {/* <div>{firstBlog.author}</div> */}
                      <div>
                        {new Date(firstBlog.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="grid gap-6">
              {secondBlog && (
                <div className="group relative overflow-hidden rounded-xl">
                  <img
                    alt={secondBlog.title}
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                    height="200"
                    src={urlFor(secondBlog.mainImage).url()}
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover"
                    }}
                    width="300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 md:p-6">
                    <div className="flex h-full flex-col justify-end">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold tracking-tight text-gray-50 md:text-xl">
                          {secondBlog.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {thirdBlog && (
                <div className="group relative overflow-hidden rounded-xl">
                  <img
                    alt={thirdBlog.title}
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                    height="200"
                    src={urlFor(thirdBlog.mainImage).url()}
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover"
                    }}
                    width="300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 md:p-6">
                    <div className="flex h-full flex-col justify-end">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold tracking-tight text-gray-50 md:text-xl">
                          {thirdBlog.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-6 items-stretch lg:grid-cols-3 lg:gap-8 mb-10">
          {blogs
            .filter((data) => data.priority === "normalBlog")
            .slice(0, 6)
            .map((data, i: number) => (
              <Link
                target="_blank"
                href={`${data.link}`}
                className="flex flex-col h-full p-0 group bg-transparent border-4 border-sky-500 rounded-2xl border-opacity-90 shadow shadow-slate-950/5 overflow-hidden"
              >
                {/* Image */}
                {/* <Image
                width={300}
                height={300}
                src={`${urlFor(data.mainImage).url()}`}
                alt="Elevate Prize"
                className="w-full h-[400px] object-cover group-hover:scale-105 duration-300"
              /> */}

                {data.mainImage && (
                  <Image
                    width={300}
                    height={300}
                    src={`${urlFor(data.mainImage).url()}`}
                    alt="Elevate Prize"
                    className="w-full h-[400px] object-cover group-hover:scale-105 duration-300"
                  />
                )}

                {/* Card Content */}
                <div className="flex-1 flex flex-col px-6 py-3 bg-sky-500">
                  {/* Card body */}
                  <div className="flex-1">
                    {/* Header */}
                    <header className="mb-1">
                      <h2 className="text-xl font-extrabold leading-snug">
                        <Link
                          className="text-white focus-visible:outline-none hover:text-gray-200"
                          href="/blog/media-challenge-initiative-ceo-mpindi-abaas-wins-elevate-prize-advocates-for-elevating-changemakers"
                        >
                          {data.title}
                        </Link>
                      </h2>
                    </header>
                    {/* Content */}
                    {/* <div className="text-sm text-slate-600 mb-8">
                    <p>
                      Boost efficiency, accomplish more. Learn proven
                      strategies.
                    </p>
                  </div> */}
                  </div>
                  {/* Card footer */}
                  <div className="flex justify-end space-x-2">
                    <Link
                      id="blog-link"
                      href={`${data.link}`}
                      className="inline-flex w-full border-2 rounded-2xl border-white hover:border-2 justify-center items-center whitespace-nowrap bg-transparent px-3 py-2 text-sm font-medium text-white hover:bg-sky-500 hover:border-gray-200 hover:text-black"
                      target="_blank"
                    >
                      Read more
                      <HiOutlineExternalLink className="px-2 text-xl w-8 h-8" />
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className="flex justify-center my-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem className="text-gray-300">
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="text-gray-300">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="text-gray-300">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="text-gray-300">
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
