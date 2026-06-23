import { PublicProfileClient } from "./client-page";

export function generateStaticParams() {
  return [{ username: "demo" }];
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  return <PublicProfileClient username={username} />;
}
