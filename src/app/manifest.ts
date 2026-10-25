import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { BRAND } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} by CodeLove`,
    short_name: BRAND.name,
    description: BRAND.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#6366f1",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
