import React from "react";
import { client } from "@/lib/sanity";
import Link from "next/link";

async function getBlogs() {
  const query = `
    *[_type == "blog"] | order(_createdAt asc) {
      "title": title,
      "currentSlug": slug.current,
      "author": author->{name},
      "mainImage": mainImage,
      "publishedAt": publishedAt,
      "description": description,
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Blog() {

  return (
    <>
      <section className="w-full bg-[#f6931d] py-6 md:py-12 lg:pt-10 lg:pb-4">
        <div className="container grid gap-12 px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl">
              <div className="flex items-center h-full justify-center">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight leading-relaxed text-white md:text-4xl">
                    Featured Articles & Blog Insights
                  </h3>
                  <p className="line-clamp-3 text-lg font-light text-gray-100 pt-6">
                    Discover how our work is making a difference through
                    in-depth articles and insightful blog posts.
                  </p>
                </div>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl">
              <img
                alt="Recent blog post"
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                height="200"
                src="/assets/images/blog/bog-3.jpeg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 md:p-6">
                <div className="flex h-full flex-col justify-end">
                  <div className="space-y-2">
                    <h3 className="text-md font-bold tracking-tight text-gray-50 md:text-lg">
                      In the Spotlight: Featured Articles Making Headlines
                    </h3>
                    <Link
                      href="/articles"
                      className="block text-black hover:text-white bg-white hover:bg-[#f6931d] focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg font-medium rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    >
                      SEE ALL ARTICLES
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img
                alt="Recent blog post"
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                height="200"
                src="/assets/images/blog/blog-1.jpg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width="300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent p-4 md:p-6">
                <div className="flex h-full flex-col justify-end">
                  <div className="space-y-2">
                    <h3 className="text-md font-bold tracking-tight text-gray-50 md:text-lg">
                      Unveiling the Future: Insights and Innovations from our
                      Blogs.
                    </h3>
                    <Link
                      href="/blogs"
                      className="block text-black hover:text-white bg-white hover:bg-[#f6931d] rounded-xl focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    >
                      SEE ALL BLOGS
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// "use client"
// import React from 'react';
// import { client } from '@/lib/sanity';
// import { PostData } from '@/lib/interface';
// import SwiperComponent from './SwiperComponent';

// async function getBlogs() {
//   const query = `
//     *[_type == "blog"] | order(_createdAt asc) {
//       "title": title,
//       "currentSlug": slug.current,
//       "author": author->{name},
//       "mainImage": mainImage,
//       "publishedAt": publishedAt,
//       "description": description,
//     }
//   `;
//   const data = await client.fetch(query);
//   return data;
// }

// export default function Blog() {
//   const [data, setData] = React.useState<PostData[]>([]);

//   React.useEffect(() => {
//     async function fetchData() {
//       const blogsData: PostData[] = await getBlogs();
//       setData(blogsData);
//     }
//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="package_style__two lg:pt-30 pt-24 pb-24 lg:pb-30 z-1 relative">
//         <div className="max-w-[1570px] mx-auto px-3">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl pb-6">
//               Recent Blog
//             </h1>
//           </div>
//           <SwiperComponent data={data} />
//           <div className="common-pagination pack-two-pagi" />
//         </div>
//       </div>
//     </>
//   );
// }
