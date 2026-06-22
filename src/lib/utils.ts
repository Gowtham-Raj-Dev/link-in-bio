import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely, de-duplicating conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Normalise a string into a URL-friendly username slug. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}

/** Ensure a URL has a protocol so anchor tags resolve correctly. */
export function withProtocol(url: string) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (/^(mailto:|tel:)/i.test(url)) return url;
  return `https://${url}`;
}

/** Small id generator that does not depend on crypto being available. */
export function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Human readable "x time ago" from an ISO date string. */
export function timeAgo(iso?: string) {
  if (!iso) return "Never";
  const date = new Date(iso);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];
  let value = seconds;
  let unit = "second";
  for (const [size, name] of units) {
    if (value < size) {
      unit = name;
      break;
    }
    value = Math.floor(value / size);
    unit = name;
  }
  if (unit === "second" && value < 30) return "Just now";
  return `${value} ${unit}${value === 1 ? "" : "s"} ago`;
}
