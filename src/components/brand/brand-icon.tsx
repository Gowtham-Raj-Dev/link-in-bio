import type { SocialPlatform } from "@/lib/types";

/** Single-color brand glyphs (currentColor). Lucide removed social logos,
 *  so we ship our own simple, recognizable marks. */
const PATHS: Record<SocialPlatform, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 0 0 2 8.2 31 31 0 0 0 1.7 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.6 7.9.6 7.9.6s6 0 7.9-.6a3 3 0 0 0 2.1-2.1c.3-1.9.3-3.8.3-3.8s0-1.9-.3-3.8Z" />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14 9V7.2c0-.9.3-1.4 1.4-1.4H17V2.3C16.4 2.2 15.3 2 14.1 2 11.5 2 10 3.5 10 6.3V9H7v3.8h3V22h4v-9.2h2.9l.5-3.8H14Z" />
  ),
  linkedin: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
    </>
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.2-.300-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
  ),
  threads: (
    <path d="M16.5 11.6c-.1 0-.2-.1-.3-.1-.2-3-1.8-4.7-4.6-4.7-1.7 0-3.1.7-3.9 2l1.5 1c.6-.9 1.5-1.1 2.4-1.1 1.5 0 2.5.9 2.7 2.4-.6-.2-1.3-.3-2-.3-2.3 0-3.9 1.3-3.8 3.2.1 1.6 1.5 2.8 3.3 2.8 1.4 0 2.5-.5 3.2-1.6.4-.6.6-1.4.7-2.2.7.4 1.1 1 1.3 1.8.3 1.2-.5 3.4-3.6 3.4-2.6 0-4.6-1.9-4.6-5.5S8 6.5 11.6 6.5c2.6 0 4.3 1.2 5 3.4l1.7-.5c-.9-2.9-3.3-4.6-6.7-4.6C7.3 4.8 4.3 7.7 4.3 12s3 7.2 7.3 7.2c3.9 0 5.6-2.6 5.4-4.8-.1-1.3-.9-2.4-2.5-2.9Z" stroke="none" fill="currentColor" />
  ),
  tiktok: (
    <path d="M16 3c.3 1.9 1.4 3.4 3.3 3.7v2.7c-1.2 0-2.3-.4-3.3-1v5.9c0 3-2.1 5.2-5 5.2a4.9 4.9 0 0 1-5-5c0-2.9 2.3-5 5.3-4.9v2.8c-.3-.1-.6-.1-.9-.1-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3c1.3 0 2.4-1 2.4-2.3V3H16Z" stroke="none" fill="currentColor" />
  ),
  x: (
    <path d="M4 3h3.7l4 5.6L16.5 3H20l-6.2 7.6L20.5 21h-3.7l-4.4-6.1L7 21H3.5l6.6-8L4 3Z" stroke="none" fill="currentColor" />
  ),
};

export function BrandIcon({
  name,
  className,
}: {
  name: SocialPlatform;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
