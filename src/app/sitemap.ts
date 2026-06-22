import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { BRAND } from "@/lib/constants";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
    "/blog",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
