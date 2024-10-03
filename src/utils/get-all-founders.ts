import { client } from "@/lib/sanity";

export async function getAllFounders() {
  const query = `*[_type == 'founder'] | order(name asc){
        "name": name,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "title": title,
          }`;
  const data = await client.fetch(query);
  return data;
}
