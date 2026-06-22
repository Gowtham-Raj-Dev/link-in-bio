import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/constants";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
