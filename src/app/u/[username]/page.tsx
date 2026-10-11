import type { Metadata } from "next";
import { PublicProfileClient } from "./client-page";
import { DEMO_USERNAME } from "@/lib/demo";

// Dummy generateStaticParams to satisfy Next.js static export requirements
// Note: This returns an empty array because usernames are dynamically generated.
// If hosted on a static server (like GitHub Pages), direct visits to /u/[username]
// may return a 404. For full dynamic support, consider deploying to Vercel or Firebase App Hosting.
export const dynamicParams = false;

// Profiles are user-generated and rendered client-side from Firestore, so the
// server HTML is an empty shell. Keep them out of the index (and the sitemap);
// robots.txt deliberately does not block /u/ so crawlers can see this tag.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

// The home page's "View Demo" button links to the sample profile, so it is pre-rendered too —
// otherwise that link is served by the 404 fallback and reports as a broken link.
export async function generateStaticParams() {
  return [{ username: "demo" }, { username: DEMO_USERNAME }];
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  return <PublicProfileClient username={username} />;
}
