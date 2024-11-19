import { Solution } from "@/interface/interface";
import { client } from "@/lib/sanity";

export async function getSingleSolution(
  slug: string
): Promise<Solution | null> {
  const query = `*[_type == 'solution' && slug.current == $slug] | order(order asc)[0] {
    _id,
    _type,
    title,
    slug,
    leadingAssumption,
    challengeStatement,
    solution,
    description,
    callToAction,
    icon,
    coverImage,
    order,
    comingSoon
  }`;

  const clientConfig = {
    useCdn: false, // Always fetch fresh data
    api: { cache: "no-store" } // Disable caching
  };

  const configuredClient = client.withConfig(clientConfig);

  const data = await configuredClient.fetch<Solution | null>(query, { slug });
  return data;
}
