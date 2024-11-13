import { ThematicData } from "@/interface/interface";
import { client } from "@/lib/sanity";

export async function getAllThematicAreas() {
  const query = `
      *[_type == "thematicAreas"] | order(_createdAt asc) {
        "name": name,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "link": link,
      }
    `;
  const data = await client.fetch<ThematicData[]>(query);
  return data;
}
