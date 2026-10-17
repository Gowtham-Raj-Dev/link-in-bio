import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

// Only indexable pages belong here: no dashboard, login or user profiles.
// Blog posts come from BLOG_POSTS, so new posts are listed automatically.
const STATIC_ROUTES = ["", "/blog", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Stamped when the sitemap is generated at build time, so every deploy
  // reports fresh content without a hand-edited date.
  const lastModified = new Date();

  const paths = [
    ...STATIC_ROUTES,
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));
}
