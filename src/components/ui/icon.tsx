"use client";

import { icons, type LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: string;
}

/** Render a Lucide icon by its string name. Falls back to a link glyph. */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? icons.Link2;
  return <LucideIcon {...props} />;
}
