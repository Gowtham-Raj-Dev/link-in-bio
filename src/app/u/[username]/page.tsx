import { PublicProfileClient } from "./client-page";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  
  return <PublicProfileClient username={username} />;
}
