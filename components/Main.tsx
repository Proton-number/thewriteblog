"use client";

import { appStore } from "@/store/sanityStore";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Main() {
  const { posts, fetchPosts } = appStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        await fetchPosts();
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [fetchPosts]);

  // Group posts by year
  const postsByYear = useMemo(() => {
    // If there are no posts, just return an empty object {}
    if (!posts) return {};

    // Take all the posts and group them by year
    return posts.reduce((acc, post) => {
      // Figure out what year this post belongs to
      // If the post has a publishedAt date, get the year from it (like "2024" or "2025")
      // If it doesn't have a date, just call it "No date"
      const year = post.publishedAt
        ? String(new Date(post.publishedAt).getFullYear())
        : "No date";

      // If we haven't seen this year before, create a new empty array for it
      // Like creating a new bucket for "2025" posts
      if (!acc[year]) {
        acc[year] = [];
      }

      // Throw this post into the bucket for its year
      acc[year].push(post);

      // Return the accumulator so we can keep adding more posts to it
      return acc;
    }, {} as Record<string | number, typeof posts>);
  }, [posts]);

  return (
    <main className="mt-6">
      <div className="max-w-2xl mt-8">
        <header className="space-y-3">
          <h1 className="font-semibold text-4xl leading-tight">
            Frontend developer.
          </h1>
          <p>
            I like building web applications and learning new technologies. When
            I'm not coding, you'll find me watching Barcelona or the latest
            anime.
          </p>
        </header>

        <section className="mt-8" aria-labelledby="blog-heading">
          <h2 id="blog-heading" className="font-semibold text-4xl">
            Blog
          </h2>

          {isLoading ? (
            <div role="status" aria-label="Loading blog posts">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="pb-4">
                  <Skeleton className="h-6 w-full mt-6 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(postsByYear)
                .sort((a, b) => Number(b[0]) - Number(a[0])) // Sort year descending
                .map(([year, yearPosts]) => (
                  <div key={year}>
                    <h3 className="text-2xl font-semibold text-gray-500 mt-8 mb-4">
                      {year}
                    </h3>
                    <ul className="list-none">
                      {yearPosts.map((post) => (
                        <li key={post.slug.current}>
                          <article className="mt-6 border-b pb-4">
                            <Link
                              href={`/blog/${post.slug.current}`}
                              className="group block"
                              aria-label={`Read article: ${post.title}`}
                            >
                              <motion.div
                                whileHover={{ x: 10 }}
                                className="cursor-pointer flex justify-between items-center gap-4"
                              >
                                <div className="flex-1">
                                  <h4 className="text-md font-bold group-hover:underline">
                                    {post.title || "No title available"}
                                  </h4>
                                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {post.description ||
                                      "No description available"}
                                  </p>
                                </div>
                                <time
                                  dateTime={post.publishedAt}
                                  className="text-sm whitespace-nowrap"
                                >
                                  {post.publishedAt
                                    ? format(
                                        new Date(post.publishedAt),
                                        "MMM dd, yyyy"
                                      )
                                    : "No date"}
                                </time>
                              </motion.div>
                            </Link>
                          </article>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
