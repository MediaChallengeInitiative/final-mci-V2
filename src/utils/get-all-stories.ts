import { Story } from "@/interface/interface";
import { client } from "@/lib/sanity";

export const fetchStoryById = async (id: string): Promise<Story> => {
  const story = await client.fetch(`*[_id == $id][0]`, { id });
  return story;
};
