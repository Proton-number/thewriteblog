import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2025-12-26", // Specify the API version
  useCdn: true, // Set to `true` to use the CDN
});

export default sanityClient;
