import { Impact } from "@/interface/interface";
import { client } from "@/lib/sanity";

const fetchImpactBySolutionId = async (
  solutionId: string
): Promise<Impact[]> => {
  const impacts = await client.fetch(
    `*[_type == "impact" && solution._ref == $solutionId]`,
    { solutionId }
  );
  return impacts;
};
