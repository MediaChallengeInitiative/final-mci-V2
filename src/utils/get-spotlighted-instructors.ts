import { client } from "@/lib/sanity";

export async function getSpotLightedInstructors() {
  const query = `*[ _type == 'instructors' ] | order(_createdAt desc) [0...4] {
    "name": name,
    "title": title,
    "currentSlug":slug.current,
    "image" : image.asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}