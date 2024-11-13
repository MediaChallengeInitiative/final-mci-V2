import { Blog } from "@/interface/interface";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

export async function getAllBlogs(start: number, end: number) {
  const query = `*[_type == 'post'] | order(name asc)[${start}...${end}]{
        title,
        "currentSlug": slug.current,
        mainImage,
        priority,
        publishedAt,
        link,
          }`;
  const data = await client.fetch(query);
  return data;
}

export const getTotalBlogs = async () => {
  const query = `count(*[_type == 'post'])`;
  return client.fetch(query);
};

// let lastId: string | null = "";

// export async function fetchNextPage(): Promise<Blog[]> {
//   if (lastId === null) {
//     return [];
//   }

//   const query = groq`*[_type == "post" && _id > $lastId] | order(_id) [0...12] {
//     _id,
//     "title": title,
//     "currentSlug": slug.current,
//     "mainImage" : image.asset->url,
//     "priority": priority,
//     "publishedAt": publishedAt,
//     "link": link,
//   }`;

//   const response = await fetch(query); // Remove lastId from options
//   const data = (await response.json()) as { result: Blog[] }; // Type casting

//   const { result }: { result: Blog[] } = data;

//   if (result.length > 0) {
//     lastId = result[result.length - 1]._id;
//   } else {
//     lastId = null; // Reached the end
//   }

//   return result;
// }
