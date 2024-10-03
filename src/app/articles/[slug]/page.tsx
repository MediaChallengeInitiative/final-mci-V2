import React from "react";
import Image from "next/image";
import { ArticleData } from "@/interface/interface";
import { getSingleArticle } from "@/utils/get-single-article";
import { urlFor } from "@/lib/sanity";

// const CustomSerializer = ({ blocks }: { blocks: any[] }) => {
//   return (
//     <>
//       {blocks.map((block, index) => {
//         return (
//           <p
//             key={index}
//             className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300"
//           >
//             {block.children.map((child: any, idx: number) => {
//               if (typeof child.text === "string" && /".*?"/.test(child.text)) {
//                 const parts = child.text
//                   .split(/(".*?")/)
//                   .map((part: any, i: number) => {
//                     if (/".*?"/.test(part)) {
//                       return (
//                         <blockquote
//                           key={i}
//                           className="text-2md lg:text-lg text-left lg:text-justify italic py-3 text-sky-700"
//                         >
//                           {part}
//                         </blockquote>
//                       );
//                     }
//                     return part;
//                   });
//                 return <React.Fragment key={idx}>{parts}</React.Fragment>;
//               }
//               return child.text;
//             })}
//           </p>
//         );
//       })}
//     </>
//   );
// };

const CustomSerializer = ({ blocks }: { blocks: any[] }) => {
  return (
    <>
      {blocks.map((block, index) => (
        <p
          key={index}
          className="text-2md py-2 lg:text-lg lg:text-justify text-gray-300"
        >
          {block.children.map((child: any, idx: number) => {
            if (typeof child.text === "string" && /".*?"/.test(child.text)) {
              const parts = child.text
                .split(/(".*?")/)
                .reduce((acc: any, part: string, i: number) => {
                  if (/".*?"/.test(part)) {
                    acc.push(
                      <span key={i} className="italic text-sky-500">
                        {part}
                      </span>
                    );
                  } else if (part.trim() === "said Abaas.") {
                    acc[acc.length - 1] = (
                      <span key={i - 1} className="italic text-white">
                        {acc[acc.length - 1]} said Abaas.
                      </span>
                    );
                  } else {
                    acc.push(part);
                  }
                  return acc;
                }, []);
              return <React.Fragment key={idx}>{parts}</React.Fragment>;
            }
            return child.text;
          })}
        </p>
      ))}
    </>
  );
};

export default async function Page({ params }: { params: { slug: string } }) {
  const articleData: ArticleData = await getSingleArticle(params.slug);
//   console.log(articleData);
  return (
    <>
      <div className="px-4 py-6 sm:py-12 lg:py-16">
        <div className="space-y-2 md:space-y-5 pt-12 lg:pt-24 lg:w-[80%] w-[100%] mx-auto pb-4">
          <h1 className="text-white leading-snug font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-xl md:leading-[3.5rem] sm:pb-6 pt-3">
            {articleData.title}
          </h1>
          <figure>
            <Image
              alt="Cover image"
              className="aspect-video overflow-hidden rounded-lg object-cover lg:h-auto h-96"
              height={340}
              src={urlFor(articleData?.mainImage).url()}
              width={1250}
            />
            <figcaption>
              <div className="flex lg:flex-row flex-col items-center text-left justify-between space-x-2">
                <div className="space-y-1 inline-flex items-center justify-between">
                  <p className="text-md text-gray-200 dark:text-gray-100">
                    Posted on :
                  </p>
                  <i className="text-md ml-2 text-sky-500 dark:text-sky-500">
                    {new Date(articleData.publishedAt).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </i>
                </div>
                <div className="space-y-1 inline-flex items-center justify-between">
                  <p className="text-md text-gray-200 dark:text-gray-100">
                    Published by :
                  </p>
                  <i className="text-md ml-2 text-sky-500 dark:text-sky-500">
                    {/* {articleData.author.} */}
                    {articleData.author?.name}
                  </i>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
        <article className="prose prose-gray mx-auto max-w-6xl dark:prose-invert lg:prose-lg text-white">
          <CustomSerializer blocks={articleData.description} />
        </article>
      </div>
    </>
  );
}
