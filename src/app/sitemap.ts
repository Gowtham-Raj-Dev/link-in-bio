import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { BLOG_POSTS } from "@/lib/blog";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/seo";

// Only indexable pages belong here: no dashboard, login or user profiles.
// Blog posts and keyword pages come from their lists, so new ones are added
// automatically.
//
// lastModified is a real date per page, not the build time: Google stops
// trusting lastmod when every URL claims to change on every deploy.
// Bump SITE_UPDATED when the home or keyword pages change meaningfully.
const SITE_UPDATED = "2026-11-24";
const LEGAL_UPDATED = "2026-10-01";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, lastModified: string, priority: number) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
  });

  const newestPost = BLOG_POSTS.map((p) => p.date).sort().at(-1) ?? SITE_UPDATED;

  return [
    entry("", SITE_UPDATED, 1.0),
    ...LANDING_PAGES.map((page) => entry(`/${page.slug}`, SITE_UPDATED, 0.9)),
    entry("/blog", newestPost, 0.8),
    ...BLOG_POSTS.map((post) => entry(`/blog/${post.slug}`, post.date, 0.7)),
    entry("/about", SITE_UPDATED, 0.5),
    entry("/contact", LEGAL_UPDATED, 0.4),
    entry("/privacy", LEGAL_UPDATED, 0.3),
    entry("/terms", LEGAL_UPDATED, 0.3),
  ];
}
