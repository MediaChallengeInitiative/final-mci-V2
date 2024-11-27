import { client } from "@/lib/sanity";

export async function getAllStaff(start: number, end: number) {
  const query = `*[_type == 'staff'] | order(name asc)[${start}...${end}]{
        "name": name,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "title": title,
          }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } }); // Revalidate every minute
  return data;
}

export const getTotalStaff = async () => {
  const query = `count(*[_type == 'staff'])`;
  return client.fetch(query, {}, { next: { revalidate: 60 } }); // Revalidate every minute
};
