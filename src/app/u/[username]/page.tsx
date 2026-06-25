import { PublicProfileClient } from "./client-page";

// Dummy generateStaticParams to satisfy Next.js static export requirements
// Note: This returns an empty array because usernames are dynamically generated.
// If hosted on a static server (like GitHub Pages), direct visits to /u/[username]
// may return a 404. For full dynamic support, consider deploying to Vercel or Firebase App Hosting.
export function generateStaticParams() {
  return [];
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  return <PublicProfileClient username={username} />;
}
