import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ArticleData } from "@/interface/interface";
import { urlFor } from "@/lib/sanity";
import Breadcrumb from "@/components/breadcrumb";
import { getAllArticles, getTotalArticles } from "@/utils/get-all-articles";

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";

  const per_page = searchParams["per_page"] ?? "8";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const articles: ArticleData[] = await getAllArticles(start, end);

  // console.log(articles);

  const total: number = await getTotalArticles();

  return (
    <section className="w-full py-12 md:py-24 lg:py-28 lg:mt-0 mt-2">
      <Breadcrumb title={"Articles"} />
      <div className="container grid gap-12 px-4 md:px-6">
        <div className="grid gap-6 items-stretch lg:grid-cols-3 lg:gap-8 mb-10">
          {articles.map((data, i: number) => (
            <Link
              href={`/articles/${data.slug}`}
              className="flex flex-col h-full p-0 group bg-transparent border-4 border-sky-500 rounded-2xl border-opacity-90 shadow shadow-slate-950/5 overflow-hidden"
            >
              {/* Image */}
              {/* <Image
                width={300}
                height={300}
                src={`${urlFor(data.mainImage).url()}`}
                alt="Article Image"
                className="w-full h-[400px] object-cover group-hover:scale-105 duration-300"
              /> */}

              {data.mainImage && (
                <Image
                  width={300}
                  height={300}
                  src={`${urlFor(data.mainImage).url()}`}
                  alt="Article Image"
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
                        href={`articles/${data.slug}`}
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
                    href={`/articles/${data.slug}`}
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
    </section>
  );
}

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
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
//     <>
//       <div className="bg-gray-800 min-h-screen">
//         <Breadcrumb title={"Articles"} />
//         <div className="max-w-screen-xl mx-auto px-4 pt-16 pb-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {articles.map((item: any, i: number) => (
//               <div key={i} className="w-full">
//                 <Link
//                   href={`/articles/${item.slug}`}
//                   className="h-72 md:h-96 block group relative mx-2 overflow-hidden shadow-lg"
//                 >
//                   {item.mainImage && (
//                     <Image
//                       src={`${urlFor(item.mainImage).url()}`}
//                       alt={item.title}
//                       layout="fill"
//                       objectFit="cover"
//                       className="absolute z-0 object-cover w-full h-72 md:h-96 transform group-hover:scale-150 transition duration-300"
//                     />
//                   )}
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 group-hover:opacity-90 transition duration-300"></div>
//                   <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-1/2 transition duration-300 group-hover:translate-y-0 delay-100">
//                     <h2 className="font-bold text-white leading-tight transition duration-300 text-xl pb-6 group-hover:underline">
//                       {item.title}
//                     </h2>
//                     {item.description.map((block: any, i: number) => (
//                       <p
//                         key={i}
//                         className="text-white pb-4 opacity-0 line-clamp-2 transition duration-300 group-hover:opacity-100"
//                       >
//                         {block.children.map((child: any, j: number) => (
//                           <span key={j}>{child.text}</span>
//                         ))}
//                       </p>
//                     ))}
//                     <button className="bg-black text-white text-sm px-3 py-1 font-semibold opacity-0 transition duration-300 group-hover:opacity-100 border-2 border-white focus:border-black focus:bg-gray-300 w-fit">
//                       Read More
//                     </button>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
