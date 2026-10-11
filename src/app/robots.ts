import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /u/ and /login stay crawlable on purpose: they carry a noindex tag,
        // which crawlers can only see if they are allowed to fetch the page.
        disallow: ["/dashboard/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
