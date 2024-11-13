import { client } from "@/lib/sanity";

export async function getSingleStaff(slug: string) {
  const query = `*[_type == 'staff' && slug.current == '${slug}'] | order(releaseDate desc){
    "name": name,
    "title": title,
    "currentSlug": slug.current,
    "image" : image.asset->url,
    "bio": bio,
      }[0]`;

  const clientConfig = {
    useCdn: false,
    api: { cache: "no-store" },
  };

  const configuredClient = client.withConfig(clientConfig);

  const data = await configuredClient.fetch(`${query}`);
  return data;
}
