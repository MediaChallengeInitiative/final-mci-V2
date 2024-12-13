import { client } from "@/lib/sanity";

export async function getAllArticles(start: number, end: number) {
  const query = `*[_type == 'article'] | order(name asc)[${start}...${end}]{
        "title": title,
        "slug": slug.current,
        "mainImage": mainImage,
        "priority": priority,
        "author": author->{name},
        "description": description,
       "publishedAt": publishedAt,
        link,
          }`;
  const data = await client.fetch(query);
  return data;
}

export const getTotalArticles = async () => {
  const query = `count(*[_type == 'article'])`;
  return client.fetch(query);
};
