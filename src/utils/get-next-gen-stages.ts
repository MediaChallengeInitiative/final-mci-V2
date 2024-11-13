import { NextGenCycle } from "@/interface/interface";
import { client } from "@/lib/sanity";


export async function getNextGenStages() {
  const query = `
      *[_type == "nextGenCycle"] | order(_createdAt asc) {
        "stage": stage,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "description": description,
      }
    `;
  const data = await client.fetch<NextGenCycle[]>(query);
  return data;
}