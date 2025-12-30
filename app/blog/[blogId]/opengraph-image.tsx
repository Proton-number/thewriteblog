import { ImageResponse } from "next/og";
import sanityClient from "@/Client";

export const runtime = "edge";
export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ blogId: string }>;
};

export default async function Image({ params }: Props) {
  const { blogId } = await params;
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title
  }`;
  let post;
  try {
    post = await sanityClient.fetch(query, { slug: blogId });
  } catch (error) {
    console.error("Error fetching post for OG image:", error);
  }
  const title = post?.title || "Blog Post";

  return new ImageResponse(
    <div
      style={{
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "60px",
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            lineHeight: 1.2,
            margin: 0,
            // textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
