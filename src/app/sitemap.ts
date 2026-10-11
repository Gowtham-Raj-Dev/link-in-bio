import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_UPDATED, SITE_URL } from "@/lib/seo";

// Only indexable pages belong here: no dashboard, login or user profiles.
const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = BLOG_POSTS.map((post) => post.date).sort().at(-1);

  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(
      route.path === "/blog" && newestPost ? newestPost : SITE_UPDATED
    ),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
