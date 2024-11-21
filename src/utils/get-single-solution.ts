import { SolutionInterface } from "@/interface/interface";
import { client } from "@/lib/sanity";

export async function getSingleSolution(
  slug: string
): Promise<SolutionInterface | null> {
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
    comingSoon,
    bgColorFrom,
    bgColorTo
  }`;

  const clientConfig = {
    useCdn: false, // Always fetch fresh data
    api: { cache: "no-store" } // Disable caching
  };

  const configuredClient = client.withConfig(clientConfig);

  const data = await configuredClient.fetch<SolutionInterface | null>(query, {
    slug
  });
  return data;
}
