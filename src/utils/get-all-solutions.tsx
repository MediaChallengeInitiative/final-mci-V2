import { Solution } from "@/interface/interface";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

export async function getAllSolutions(
  start: number,
  end: number
): Promise<Solution[]> {
  const query = `*[_type == 'solution'] | order(name asc)[${start}...${end}]{
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
    order,
    comingSoon
  }`;

  const data = await client.fetch<Solution[]>(query);
  return data;
}

export const getTotalSolutions = async (): Promise<number> => {
  const query = `count(*[_type == 'solution'])`;
  return client.fetch<number>(query);
};
