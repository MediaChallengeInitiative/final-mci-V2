// import React from "react";
// import { ArticleData } from "@/interface/interface";
// import { getAllArticles, getTotalArticles } from "@/utils/get-all-articles";
// import Breadcrumb from "@/components/breadcrumb";
// import ArticlesClientPage from "@/components/ArticlesClientPage";

// export default async function ArticlesPage({
//   searchParams
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const page = Number(searchParams["page"] ?? "1");
//   const per_page = 6; // Two rows of three blogs each

//   const start = (page - 1) * per_page;
//   const end = start + per_page;

//   const initialArticles: ArticleData[] = await getAllArticles(start, end);
//   const totalArticles: number = await getTotalArticles();

//   return (
//     <section className="bg-white w-full py-12 md:py-24 lg:py-16 lg:mt-0 mt-2">
//       {/* <Breadcrumb title="Articles" /> */}
//       <ArticlesClientPage
//         initialArticles={initialArticles}
//         totalArticles={totalArticles}
//         per_page={per_page}
//       />
//     </section>
//   );
// }

import React from "react";
import { ArticleData } from "@/interface/interface";
import { getAllArticles, getTotalArticles } from "@/utils/get-all-articles";
import ArticlesPage from "@/components/articles/ArticlesPage";

export const runtime = "edge";
export const preferredRegion = "auto";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function ArticlesPageWrapper({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams["page"] ?? "1");
  const per_page = 6;

  const [initialArticles, totalArticles] = await Promise.all([
    getAllArticles((page - 1) * per_page, page * per_page),
    getTotalArticles()
  ]);

  return (
    <ArticlesPage
      initialArticles={initialArticles}
      totalArticles={totalArticles}
      page={page}
      per_page={per_page}
    />
  );
}

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { HiOutlineExternalLink } from "react-icons/hi";
// import { ArticleData } from "@/interface/interface";
// import { urlFor } from "@/lib/sanity";
// import Breadcrumb from "@/components/breadcrumb";
// import { getAllArticles, getTotalArticles } from "@/utils/get-all-articles";

// const ArticleCard = ({ article }: { article: ArticleData }) => {
//   const date = new Date(article.publishedAt);
//   const day = date.getDate();
//   const month = date.toLocaleString("default", { month: "short" });

//   return (
//     <div className="bg-white border border-stone-400 hover:border-transparent border-opacity-40 rounded-xl hover:bg-[#0097d1] p-6 group relative overflow-hidden transition-colors duration-300">
//       <div className="text-4xl font-bold mb-2 text-[#2B2B2B] group-hover:text-white transition-colors duration-300">
//         {day}
//       </div>
//       <div className="text-[#0097d1] text-xl group-hover:text-white mb-4 transition-colors duration-300">
//         {month}
//       </div>
//       <h3 className="text-xl line-clamp-2 font-semibold mb-2 text-[#2B2B2B] group-hover:text-white transition-colors duration-300">
//         {article.title}
//       </h3>
//       <div className="relative h-60 w-full overflow-hidden">
//         <Image
//           src={urlFor(article.mainImage).url()}
//           alt={article.title}
//           layout="fill"
//           objectFit="cover"
//           className="transition-transform duration-300 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//           <Link href={`/articles/${article.slug}`} passHref>
//             <button className="bg-white text-[#0097d1] px-4 py-2 rounded-full hover:bg-[#0097d1] hover:text-white transition-colors duration-300">
//               Read More
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default async function Page({
//   searchParams
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const page = Number(searchParams["page"] ?? "1");
//   const per_page = Number(searchParams["per_page"] ?? "8");

//   const start = (page - 1) * per_page;
//   const end = start + per_page;

//   const articles: ArticleData[] = await getAllArticles(start, end);
//   const total: number = await getTotalArticles();

//   const totalPages = Math.ceil(total / per_page);

//   return (
//     <section className="bg-white w-full py-12 md:py-24 lg:py-16 lg:mt-0 mt-2">
//       <Breadcrumb title="Articles" />

//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {articles.map((article) => (
//             <ArticleCard key={article._id} article={article} />
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <div className="mt-12 flex justify-center">
//             <nav className="inline-flex">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (pageNum) => (
//                   <Link
//                     key={pageNum}
//                     href={{ query: { ...searchParams, page: pageNum } }}
//                     className={`px-4 py-2 border ${
//                       pageNum === page
//                         ? "bg-[#0097d1] text-white"
//                         : "bg-white text-[#2B2B2B] hover:bg-[#0097d1] hover:text-white"
//                     } transition-colors duration-300`}
//                   >
//                     {pageNum}
//                   </Link>
//                 )
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { HiOutlineExternalLink } from "react-icons/hi";
// import { ArticleData } from "@/interface/interface";
// import { urlFor } from "@/lib/sanity";
// import Breadcrumb from "@/components/breadcrumb";
// import { getAllArticles, getTotalArticles } from "@/utils/get-all-articles";

// export default async function Page({
//   searchParams
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   const page = searchParams["page"] ?? "1";

//   const per_page = searchParams["per_page"] ?? "8";

//   // mocked, skipped and limited in the real app
//   const start = (Number(page) - 1) * Number(per_page);
//   const end = start + Number(per_page);

//   const articles: ArticleData[] = await getAllArticles(start, end);

//   // console.log(articles);

//   const total: number = await getTotalArticles();

//   return (
//     <section className="w-full py-12 md:py-24 lg:py-28 lg:mt-0 mt-2">
//       <Breadcrumb title={"Articles"} />

//       <div className="container grid gap-12 px-4 md:px-6">
//         <div className="grid gap-6 items-stretch lg:grid-cols-3 lg:gap-8 mb-10">
//           {articles.map((data, i: number) => (
//             <Link
//               href={`/articles/${data.slug}`}
//               className="flex flex-col h-full p-0 group bg-transparent border-4 border-sky-500 rounded-2xl border-opacity-90 shadow shadow-slate-950/5 overflow-hidden"
//             >
//               {data.mainImage && (
//                 <Image
//                   width={300}
//                   height={300}
//                   src={`${urlFor(data.mainImage).url()}`}
//                   alt="Article Image"
//                   className="w-full h-[400px] object-cover group-hover:scale-105 duration-300"
//                 />
//               )}

//               {/* Card Content */}
//               <div className="flex-1 flex flex-col px-6 py-3 bg-sky-500">
//                 {/* Card body */}
//                 <div className="flex-1">
//                   {/* Header */}
//                   <header className="mb-1">
//                     <h2 className="text-xl font-extrabold leading-snug">
//                       <Link
//                         className="text-white focus-visible:outline-none hover:text-gray-200"
//                         href={`articles/${data.slug}`}
//                       >
//                         {data.title}
//                       </Link>
//                     </h2>
//                   </header>
//                 </div>
//                 {/* Card footer */}
//                 <div className="flex justify-end space-x-2">
//                   <Link
//                     id="blog-link"
//                     href={`/articles/${data.slug}`}
//                     className="inline-flex w-full border-2 rounded-2xl border-white hover:border-2 justify-center items-center whitespace-nowrap bg-transparent px-3 py-2 text-sm font-medium text-white hover:bg-sky-500 hover:border-gray-200 hover:text-black"
//                     target="_blank"
//                   >
//                     Read more
//                     <HiOutlineExternalLink className="px-2 text-xl w-8 h-8" />
//                   </Link>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
