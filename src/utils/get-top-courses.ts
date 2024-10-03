import { client } from "@/lib/sanity";

export async function getTopCourses() {
  const query = `
      *[ _type == 'courses' ] | order(_createdAt desc) [0...4] {
        "title": title,
        "currentSlug":slug.current,
        "image" : image.asset->url,
        "shortDescription": shortDescription
      }
    `;
  const data = await client.fetch(query);
  return data;
}
