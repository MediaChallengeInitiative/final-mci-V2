import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Retrieve environment variables from .env.local
const version = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// console.log(version, projectId, dataset);

export const client = createClient({
    apiVersion: version,
    dataset: dataset,
    projectId: projectId,
    useCdn: false,
    token: token,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
