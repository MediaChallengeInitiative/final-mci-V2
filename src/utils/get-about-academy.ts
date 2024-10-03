import { AboutUs } from "@/interface/interface";
import { client } from "@/lib/sanity";

export async function getAboutAcademy() {
  const query = `*[ _type == 'about' ] | order(_createdAt desc) {
    "title": title,
    "shortDescription": shortDescription,
    "description": description
  }`;
  const data = await client.fetch<AboutUs[]>(query);

  return data;
}
