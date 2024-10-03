import { Testimonials } from "@/interface/interface";
import { client } from "@/lib/sanity";

export async function getTestimonials() {
  const query = `
      *[_type == "testimonials"] | order(_createdAt asc) {
        "name": name,
        "currentSlug": slug.current,
        "image": image.asset->url,
        "testimonial": testimonial,
        "title_position": title_position,
        "publishedAt": publishedAt,
      }
    `;
  const data = await client.fetch<Testimonials[]>(query);
  return data;
}