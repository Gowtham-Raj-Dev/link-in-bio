"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { PublicProfileClient } from "./u/[username]/client-page";

export default function NotFound() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/u/")) {
      const u = path.split("/u/")[1]?.split("/")[0];
      if (u) {
        setUsername(u);
      }
    }
  }, []);

  if (username) {
    return <PublicProfileClient username={username} />;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="aurora-bg" />
      <div className="relative">
        <Logo href="/" />
        <h1 className="mt-8 text-7xl font-bold tracking-tight brand-text">404</h1>
        <p className="mt-4 text-lg font-semibold">This page took a wrong turn</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The link you followed may be broken, or the page may have moved.
        </p>
        <Link href="/" className="mt-8 inline-block">
          <Button size="lg">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
