/**
 * Local-storage data layer (MVP).
 *
 * All profile content lives in the browser only. This module is the single
 * gateway to that storage so a future database swap touches one file. Each
 * user's data is namespaced by their Firebase uid. A small username -> uid
 * registry lets the public /u/[username] route resolve a profile.
 */

import { DEFAULT_THEME_ID } from "./themes";
import type { AppData, ProfileData } from "./types";

const DATA_PREFIX = "linkinbio:data:";
const REGISTRY_KEY = "linkinbio:usernames";
export const STORAGE_EVENT = "linkinbio:storage-changed";

function isBrowser() {
  return typeof window !== "undefined";
}

function emitChange() {
  if (isBrowser()) {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
  }
}

export function emptyData(displayName = "", avatar = ""): AppData {
  return {
    profile: {
      avatar,
      displayName,
      username: "",
      bio: "",
      location: "",
      website: "",
    },
    links: [],
    socials: {},
    themeId: DEFAULT_THEME_ID,
    settings: {
      showPrivacyBadge: true,
      showSocialIcons: true,
      openLinksInNewTab: true,
    },
    updatedAt: new Date().toISOString(),
  };
}

export function loadData(uid: string): AppData | null {
  if (!isBrowser() || !uid) return null;
  try {
    const raw = window.localStorage.getItem(DATA_PREFIX + uid);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AppData>;
    // Merge with defaults so older payloads stay forward-compatible.
    const base = emptyData();
    return {
      ...base,
      ...parsed,
      profile: { ...base.profile, ...parsed.profile },
      settings: { ...base.settings, ...parsed.settings },
      links: parsed.links ?? base.links,
      socials: parsed.socials ?? base.socials,
    };
  } catch {
    return null;
  }
}

export function saveData(uid: string, data: AppData): AppData {
  if (!isBrowser() || !uid) return data;
  const next: AppData = { ...data, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(DATA_PREFIX + uid, JSON.stringify(next));
  syncUsername(uid, next.profile.username);
  emitChange();
  return next;
}

/** Get existing data or seed a fresh record for a new user. */
export function getOrCreateData(
  uid: string,
  fallbackName = "",
  fallbackAvatar = ""
): AppData {
  const existing = loadData(uid);
  if (existing) return existing;
  const seeded = emptyData(fallbackName, fallbackAvatar);
  saveData(uid, seeded);
  return seeded;
}

/* ----------------------------- username registry ----------------------------- */

type Registry = Record<string, string>; // username -> uid

function readRegistry(): Registry {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(window.localStorage.getItem(REGISTRY_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeRegistry(registry: Registry) {
  if (!isBrowser()) return;
  window.localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
}

function syncUsername(uid: string, username: string) {
  const registry = readRegistry();
  // Drop any previous usernames pointing at this uid.
  for (const key of Object.keys(registry)) {
    if (registry[key] === uid) delete registry[key];
  }
  if (username) registry[username.toLowerCase()] = uid;
  writeRegistry(registry);
}

/** True when the username is free (or already owned by this uid). */
export function isUsernameAvailable(username: string, uid: string): boolean {
  const registry = readRegistry();
  const owner = registry[username.toLowerCase()];
  return !owner || owner === uid;
}

/** Resolve public profile data for a username, or null if not found. */
export function loadPublicProfile(username: string): AppData | null {
  const registry = readRegistry();
  const uid = registry[username.toLowerCase()];
  if (!uid) return null;
  return loadData(uid);
}

/* ------------------------------ profile helpers ------------------------------ */

export function profileCompletion(data: AppData): number {
  const p: ProfileData = data.profile;
  const checks = [
    Boolean(p.avatar),
    Boolean(p.displayName),
    Boolean(p.username),
    Boolean(p.bio),
    Boolean(p.location || p.website),
    data.links.length > 0,
    Object.values(data.socials).some(Boolean),
    Boolean(data.themeId),
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

export function exportData(uid: string): string {
  return JSON.stringify(loadData(uid) ?? emptyData(), null, 2);
}

export function clearData(uid: string) {
  if (!isBrowser() || !uid) return;
  const data = loadData(uid);
  if (data?.profile.username) {
    const registry = readRegistry();
    delete registry[data.profile.username.toLowerCase()];
    writeRegistry(registry);
  }
  window.localStorage.removeItem(DATA_PREFIX + uid);
  emitChange();
}
