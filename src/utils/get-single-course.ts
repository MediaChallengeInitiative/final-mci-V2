import { client } from "@/lib/sanity";

export async function getSingleCourse(slug: string) {
  const query = `*[ _type == 'courses' && slug.current == '${slug}'] | order(releaseDate desc){
    "title": title,
    "currentSlug":slug.current,
    "image" : image.asset->url,
    "description": description
  }[0]`;
  const data = await client.fetch(query);
  return data;
}
