import { client } from "@/lib/sanity";

export async function getCourses() {
  const query = `*[ _type == 'courses' ] | order(_createdAt desc) {
    "title": title,
    "currentSlug":slug.current,
    "image" : image.asset->url,
    "description": description
  }`;
  const data = await client.fetch(query);
  return data;
}