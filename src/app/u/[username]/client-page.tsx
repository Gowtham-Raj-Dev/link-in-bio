"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, UserX } from "lucide-react";
import { ProfileView } from "@/components/profile/profile-view";
import { Button } from "@/components/ui/button";
import { loadPublicProfile } from "@/lib/storage";
import { DEMO_DATA, DEMO_USERNAME } from "@/lib/demo";
import { getTheme } from "@/lib/themes";
import type { AppData } from "@/lib/types";

export function PublicProfileClient({ username }: { username: string }) {
  const [state, setState] = useState<"loading" | "found" | "missing">("loading");
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    const decoded = decodeURIComponent(username).toLowerCase();
    const found = loadPublicProfile(decoded);
    if (found) {
      setData(found);
      setState("found");
    } else if (decoded === DEMO_USERNAME) {
      setData(DEMO_DATA);
      setState("found");
    } else {
      setState("missing");
    }
  }, [username]);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (state === "missing" || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <UserX className="h-7 w-7 text-muted-foreground" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight">Profile not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We couldn&apos;t find <span className="font-medium">@{username}</span>{" "}
          on this device. Profiles are stored locally in each browser during the
          MVP, so they only appear where they were created.
        </p>
        <Link href="/" className="mt-6">
          <Button>Create your own page</Button>
        </Link>
      </div>
    );
  }

  const theme = getTheme(data.themeId);

  return (
    <div 
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden sm:p-12"
      style={{ background: theme.background }}
    >
      <div className="pointer-events-none hidden sm:absolute sm:inset-0 sm:block sm:bg-black/5 sm:backdrop-blur-3xl" />
      
      <div 
        className="relative z-10 flex w-full flex-1 flex-col sm:max-h-[850px] sm:max-w-[400px] sm:flex-none sm:overflow-y-auto sm:rounded-[3rem] sm:border-[8px] sm:border-zinc-900 sm:shadow-2xl sm:ring-1 sm:ring-black/10 no-scrollbar bg-background"
        style={{ background: theme.background }}
      >
        <ProfileView data={data} />
      </div>
    </div>
  );
}
