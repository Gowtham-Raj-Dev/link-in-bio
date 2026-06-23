"use client";

import { icons, type LucideProps } from "lucide-react";
import { BrandIcon } from "@/components/brand/brand-icon";
import type { SocialPlatform } from "@/lib/types";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

const BRAND_MAP: Record<string, SocialPlatform> = {
  Youtube: "youtube",
  Instagram: "instagram",
  Facebook: "facebook",
  Twitter: "x",
  Linkedin: "linkedin",
  Github: "github",
  TikTok: "tiktok",
  Threads: "threads",
};

/** Render a Lucide icon or Brand icon by its string name. Falls back to a link glyph. */
export function Icon({ name, ...props }: IconProps) {
  if (BRAND_MAP[name]) {
    return <BrandIcon name={BRAND_MAP[name]} className={props.className} />;
  }

  const LucideIcon = icons[name as keyof typeof icons] ?? icons.Link2;
  return <LucideIcon {...props} />;
}
