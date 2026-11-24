"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, UserX } from "lucide-react";
import { ProfileView } from "@/components/profile/profile-view";
import { Button } from "@/components/ui/button";
import { getFirebaseDb } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, setDoc, increment } from "firebase/firestore";
import { loadPublicProfile } from "@/lib/storage";
import { DEMO_DATA, DEMO_USERNAME } from "@/lib/demo";
import type { AppData } from "@/lib/types";

export function PublicProfileClient({ username }: { username: string }) {
  const [state, setState] = useState<"loading" | "found" | "missing">("loading");
  const [data, setData] = useState<AppData | null>(null);
  const viewCounted = useRef(false);

  const decoded = decodeURIComponent(username).toLowerCase();

  useEffect(() => {
    if (decoded === DEMO_USERNAME) {
      setData(DEMO_DATA);
      setState("found");
      return;
    }

    // Show the last copy this browser saw straight away, then refresh it.
    const cacheKey = `linkinbio:public:${decoded}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setData(JSON.parse(cached) as AppData);
        setState("found");
      }
    } catch {
      // ignore a broken cache entry
    }

    async function fetchProfile() {
      try {
        const db = getFirebaseDb();
        if (db) {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("profile.username", "==", decoded));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const fresh = querySnapshot.docs[0].data() as AppData;
            setData(fresh);
            setState("found");
            try {
              localStorage.setItem(cacheKey, JSON.stringify(fresh));
            } catch {
              // storage full or blocked
            }
            return;
          }
          localStorage.removeItem(cacheKey);
        }
      } catch (err) {
        console.error("Failed to load from Firestore", err);
        // Offline or blocked: keep the cached copy if there is one.
        if (localStorage.getItem(cacheKey)) return;
      }

      // Fallback to local storage (for users created locally before Firebase)
      const found = loadPublicProfile(decoded);
      if (found) {
        setData(found);
        setState("found");
      } else {
        setState("missing");
      }
    }

    fetchProfile();
  }, [username]);

  useEffect(() => {
    if (state === "found" && data) {
      document.title = data.settings.seoTitle || `${data.profile.displayName} (@${data.profile.username}) | LinkinBio`;
      
      const desc = data.settings.seoDescription || data.profile.bio || "Check out my links and social media.";
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', desc);

      // Increment profile views, once per visit (the cached copy and the
      // fresh copy both arrive here).
      if (viewCounted.current) return;
      viewCounted.current = true;
      try {
        const db = getFirebaseDb();
        if (db && data.profile.username && decoded !== DEMO_USERNAME) {
          const viewsRef = doc(db, "analytics", data.profile.username);
          setDoc(viewsRef, { views: increment(1) }, { merge: true }).catch(console.error);
        }
      } catch (e) {
        console.error("Failed to increment views", e);
      }
    }
  }, [state, data, decoded]);

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
          We couldn&apos;t find <span className="font-medium">@{username}</span>.
          They might have changed their username or deleted their account.
        </p>
        <Link href="/" className="mt-6">
          <Button>Create your own page</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ProfileView data={data} />
    </div>
  );
}
