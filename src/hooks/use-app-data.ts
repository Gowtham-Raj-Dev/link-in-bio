"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getOrCreateData,
  saveData,
  STORAGE_EVENT,
} from "@/lib/storage";
import type { AppData } from "@/lib/types";

/**
 * Loads the signed-in user's data from local storage and keeps it in sync
 * across tabs and components. Returns the data plus an `update` helper that
 * persists immediately.
 */
export function useAppData() {
  const { user } = useAuth();
  const [data, setData] = useState<AppData | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    if (!user) {
      setData(null);
      setReady(true);
      return;
    }
    const loaded = getOrCreateData(
      user.uid,
      user.displayName ?? "",
      user.photoURL ?? ""
    );
    setData(loaded);
    setReady(true);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onChange = () => refresh();
    window.addEventListener(STORAGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(STORAGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  const update = useCallback(
    (updater: (prev: AppData) => AppData) => {
      if (!user || !data) return;
      const next = updater(data);
      setData(saveData(user.uid, next));
    },
    [user, data]
  );

  return { data, ready, update };
}
