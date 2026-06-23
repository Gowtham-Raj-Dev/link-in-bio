"use client";

import { useCallback, useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useAuth } from "@/lib/auth-context";
import { getFirebaseDb } from "@/lib/firebase";
import { emptyData, getOrCreateData, saveData as saveLocalData } from "@/lib/storage";
import type { AppData } from "@/lib/types";

export function useAppData() {
  const { user, configured } = useAuth();
  const [data, setData] = useState<AppData | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      setData(null);
      setReady(true);
      return;
    }

    const db = getFirebaseDb();
    if (!db || !configured) {
      // Fallback to local storage
      const loaded = getOrCreateData(
        user.uid,
        user.displayName ?? "",
        user.photoURL ?? ""
      );
      setData(loaded);
      setReady(true);
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const fetchedData = snap.data() as Partial<AppData>;
          // Merge with defaults for forward-compatibility
          const base = emptyData();
          setData({
            ...base,
            ...fetchedData,
            profile: { ...base.profile, ...fetchedData.profile },
            settings: { ...base.settings, ...fetchedData.settings },
            links: fetchedData.links ?? base.links,
            socials: fetchedData.socials ?? base.socials,
          });
        } else {
          // Create initial data
          const initial = emptyData(user.displayName ?? "", user.photoURL ?? "");
          setDoc(docRef, initial).catch(console.error);
          setData(initial);
        }
        setReady(true);
      },
      (err) => {
        console.error("Firestore sync error:", err);
        // Fallback on error
        setReady(true);
      }
    );

    return () => unsubscribe();
  }, [user, configured]);

  const update = useCallback(
    (updater: (prev: AppData) => AppData) => {
      if (!user || !data) return;
      const next = updater(data);
      
      // Optimistic update locally
      setData(next);
      
      const db = getFirebaseDb();
      if (db && configured) {
        setDoc(doc(db, "users", user.uid), next).catch(console.error);
      } else {
        saveLocalData(user.uid, next);
      }
    },
    [user, data, configured]
  );

  return { data, ready, update };
}
