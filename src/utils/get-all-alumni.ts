import { client } from "@/lib/sanity";

export async function getAlumniData() {
  const query = `*[_type == 'alumniProfile'] | order(name asc){
        "name": name,
        "bio": bio,
        "currentSlug": slug.current,
        "image" : image.asset->url,
          }`;
  const data = await client.fetch(query);
  return data;
}
