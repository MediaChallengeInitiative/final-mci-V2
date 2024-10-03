import { client } from "@/lib/sanity";

export async function getAllBoardMembers() {
  const query = `*[_type == 'board'] | order(name asc){
        "name": name,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "title": title,
          }`;
  const data = await client.fetch(query);
  return data;
}
