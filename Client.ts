import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "dtbj3t1s",
  dataset: "production",
  apiVersion: "2025-12-26", // Specify the API version
  useCdn: true, // Set to `true` to use the CDN
});

export default sanityClient;
