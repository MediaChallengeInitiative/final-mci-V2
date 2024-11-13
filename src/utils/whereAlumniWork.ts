import { client } from "@/lib/sanity";

export async function getAllAlumniWorkLogos() {
  const query = `*[_type == 'whereAlumniWorkLogos'] | order(name asc){
        "employerName": employerName,
        "currentSlug": slug.current,
        "image" : image.asset->url,
          }`;
  const data = await client.fetch(query);
  return data;
}
