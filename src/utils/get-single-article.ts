import { ArticleData } from "@/interface/interface";
import { client } from "@/lib/sanity";

export async function getSingleArticle(slug: string) {
  const query = `*[_type == 'article' && slug.current == '${slug}'] | order(releaseDate desc){
    "name": name,
    "title": title,
    "currentSlug": slug.current,
    "author": author->{name},
    "mainImage": mainImage,
    "publishedAt": publishedAt,
    "description": description,
      }[0]`;

  const clientConfig = {
    useCdn: false,
    api: { cache: "no-store" }
  };

  const configuredClient = client.withConfig(clientConfig);

  const data = await configuredClient.fetch(`${query}`);
  return data;
}

