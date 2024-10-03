import { client } from "@/lib/sanity";

export async function getSingleInstructorProfile(slug: string) {
  const query = `*[_type == 'instructors' && slug.current == '${slug}'] | order(releaseDate desc){
        "name": name,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "bio": bio,
          }[0]`;
  const data = await client.fetch(query);
  return data;
}
