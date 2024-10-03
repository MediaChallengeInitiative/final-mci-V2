import { client } from "@/lib/sanity";

export async function getAllPartners() {
  const query = `*[_type == 'partner'] | order(releaseDate desc){
        "partnerName": partnerName,
        "currentSlug": slug.current,
        "image" : image.asset->url,
        "partnerSince": partnerSince,
        "country": country,
        "sectors": sectors,
        "recognition": recognition,
          }`;
  const data = await client.fetch(query);
  return data;
}
