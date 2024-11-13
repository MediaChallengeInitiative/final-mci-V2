import { client } from "@/lib/sanity";

export async function getAllStaff(start: number, end: number) {
  const query = `*[_type == 'staff'] | order(name asc)[${start}...${end}]{
        "name": name,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "title": title,
          }`;
  const data = await client.fetch(query);
  return data;
}

// export async function getTotalStaff() {
//   const query = `count(*[_type == 'staff'])`;
//   const totalStaff = await client.fetch(query);
//   return totalStaff;
// }

export const getTotalStaff = async () => {
  const query = `count(*[_type == 'staff'])`;
  return client.fetch(query);
};