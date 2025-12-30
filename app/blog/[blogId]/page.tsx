import sanityClient from "@/Client";
import type { Post } from "@/types/type";
import Blog from "./Blog";
import { Metadata } from "next";

type Props = {
  params: Promise<{ blogId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId } = await params;

  const query = `*[_type == "post" && slug.current == $slug][0] {
    title, 
    description
  }`;

  try {
    const post = await sanityClient.fetch(query, { slug: blogId });
    return {
      title: post?.title || "Blog Post",
      description: post?.description || "Read our latest blog post",
      openGraph: {
        title: post?.title || "Year Review",
        description: post?.description || "A year in review",
      },
    };
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Read our latest blog post",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params; // Await params

  const query = `*[_type == "post" && slug.current == $slug][0] {
    title, 
    description,  
    slug, 
    projectUrl,
    mainImage {
      asset -> {
        _id, 
        url
      }, 
      alt
    }, 
    body,
    author -> {
      _id, 
      name
    },
    publishedAt
  }`;

  let singlePost: Post | null = null;

  try {
    singlePost = await sanityClient.fetch(query, { slug: blogId });
    console.log("Fetched post:", singlePost); // Debug log
    console.log("BlogId:", blogId); // Debug log
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!singlePost) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Post not found
      </div>
    );
  }

  return <Blog singlePost={singlePost} />;
}
