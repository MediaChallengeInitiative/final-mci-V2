import { client } from "@/lib/sanity";

export async function getInstructors() {
  const query = `*[_type == 'instructors'] | order(releaseDate desc){
        "name": name,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "bio": bio,
          }`;
  const data = await client.fetch(query);
  return data;
}
