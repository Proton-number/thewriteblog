import { create } from "zustand";
import sanityClient from "../Client";
import type { Post } from "@/types/type";

interface SanityStore {
  error: null | string;
  posts: Array<Post> | null;
  fetchPosts: () => Promise<void>;
}

export const appStore = create<SanityStore>((set) => {
  const IMAGE_FRAGMENT = `
    asset->{
      _id, 
      url
    }, 
    alt
  `;

  // Error handler
  const handleError = (
    error: Error | unknown,
    errorMessage: string,
    resetState: Partial<SanityStore>
  ) => {
    console.error(`Error: ${errorMessage}:`, error);
    set({ error: errorMessage, ...resetState });
  };

  return {
    error: null,
    posts: null,
    singlePosts: null,
    fetchPosts: async () => {
      const query = `*[_type == "post"] | order(_createdAt desc) {
        title, 
        slug, 
        description,
        publishedAt,
        projectUrl,
      
        mainImage{${IMAGE_FRAGMENT}}, 
        body,
      }`;

      try {
        const response = await sanityClient.fetch<Array<Post>>(query);
        set({ posts: response, error: null });
      } catch (error) {
        handleError(error, "Failed to fetch projects", { posts: null });
      }
    },
  };
});
