import { ArrowUpRight } from "lucide-react";
import { BrandIcon } from "@/components/brand/brand-icon";
import { getTheme } from "@/lib/themes";
import type { SocialPlatform } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface MiniProfileData {
  name: string;
  handle: string;
  bio: string;
  initials: string;
  /** CSS background for the avatar circle. */
  avatar: string;
  socials: SocialPlatform[];
  links: string[];
}

/** Sample pages used across the marketing site. One per audience. */
export const SAMPLE_PROFILES = {
  business: {
    name: "Meera's Bake House",
    handle: "@meerabakes",
    bio: "Home bakery · Fresh cakes made to order",
    initials: "MB",
    avatar: "linear-gradient(135deg, #fb923c, #db2777)",
    socials: ["instagram", "whatsapp", "facebook"],
    links: [
      "🛒 Order on WhatsApp",
      "📖 Menu & price list",
      "📍 Find us on Google Maps",
      "⭐ Customer reviews",
    ],
  },
  developer: {
    name: "Arjun Dev",
    handle: "@arjunbuilds",
    bio: "Full-stack developer · Open to work",
    initials: "AD",
    avatar: "linear-gradient(135deg, #22d3ee, #6366f1)",
    socials: ["github", "linkedin", "x"],
    links: ["💻 My projects", "📄 Download résumé", "▶️ Coding tutorials", "✉️ Hire me"],
  },
  creator: {
    name: "Zara Khan",
    handle: "@zaratravels",
    bio: "Travel creator · New vlog every Friday",
    initials: "ZK",
    avatar: "linear-gradient(135deg, #e879f9, #7c3aed)",
    socials: ["instagram", "youtube", "telegram"],
    links: ["🎬 Watch the latest vlog", "🎒 My travel gear", "🤝 Brand collabs", "📬 Newsletter"],
  },
} satisfies Record<string, MiniProfileData>;

interface MiniProfileProps {
  profile: MiniProfileData;
  themeId: string;
  /** Read by screen readers in place of the mockup's inner text. */
  label: string;
  /** Tighter layout for small thumbnails. */
  compact?: boolean;
  /** Draw the phone bezel around the page (default true). */
  frame?: boolean;
  className?: string;
}

/** Static mockup of a bio page, drawn with a real theme's layout, colours,
 *  button shape and font. Give it a width and height through `className`. */
export function MiniProfile({
  profile,
  themeId,
  label,
  compact = false,
  frame = true,
  className,
}: MiniProfileProps) {
  const theme = getTheme(themeId);
  const radius = theme.shape === "pill" ? "9999px" : theme.shape === "rounded" ? (compact ? "8px" : "12px") : "3px";
  const shadow = theme.buttonShadow?.includes("4px 4px 0")
    ? `${compact ? 2 : 3}px ${compact ? 2 : 3}px 0 #111111`
    : theme.buttonShadow;
  const blur = theme.glass ? "blur(8px)" : undefined;
  const isCover = theme.layout === "cover";
  const isCard = theme.layout === "card";

  const content = (
    <>
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full font-bold text-white",
          compact ? "h-11 w-11 text-xs" : "h-16 w-16 text-lg",
          isCover && (compact ? "-mt-6" : "-mt-9")
        )}
        style={{ background: profile.avatar, boxShadow: theme.avatarRing }}
      >
        {profile.initials}
      </span>
      <span
        className={cn("mt-2.5 font-bold leading-tight", compact ? "text-xs" : "text-[15px]")}
        style={{ fontFamily: theme.headingFont || theme.font }}
      >
        {profile.name}
      </span>
      <span className={compact ? "text-[9px]" : "mt-0.5 text-[11px]"} style={{ color: theme.muted }}>
        {profile.handle}
      </span>
      {!compact && <span className="mt-2 text-[11px] leading-snug opacity-85">{profile.bio}</span>}
      <span className={cn("flex gap-1.5", compact ? "mt-2" : "mt-3")}>
        {profile.socials.map((social) => (
          <span
            key={social}
            className={cn("flex items-center justify-center rounded-full", compact ? "h-5 w-5" : "h-7 w-7")}
            style={{ background: theme.buttonBg, color: theme.buttonText, border: theme.buttonBorder }}
          >
            <BrandIcon name={social} className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />
          </span>
        ))}
      </span>
      <span className={cn("flex w-full flex-col", compact ? "mt-3 gap-1.5" : "mt-4 gap-2")}>
        {profile.links.map((link) => (
          <span
            key={link}
            className={cn(
              "flex items-center gap-1 truncate text-left font-semibold",
              compact ? "px-2 py-1.5 text-[9px]" : "px-3 py-2.5 text-[11px]"
            )}
            style={{
              background: theme.buttonBg,
              color: theme.buttonText,
              border: theme.buttonBorder.replace("2px", compact ? "1.5px" : "2px"),
              borderRadius: radius,
              boxShadow: shadow,
              backdropFilter: blur,
            }}
          >
            <span className="min-w-0 flex-1 truncate">{link}</span>
            <ArrowUpRight className={cn("shrink-0 opacity-50", compact ? "h-2.5 w-2.5" : "h-3 w-3")} />
          </span>
        ))}
      </span>
    </>
  );

  const page = (
    <div
      className={cn(
        "relative flex h-full flex-col items-center overflow-hidden text-center",
        frame ? "rounded-[1.8rem]" : "rounded-none",
        isCover ? "pb-5" : compact ? "px-3 pb-4 pt-8" : "px-4 pb-5 pt-10"
      )}
      style={{ background: theme.background, color: theme.text, fontFamily: theme.font }}
    >
      {theme.pattern && (
        <span
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: theme.pattern, backgroundSize: compact ? "10px 10px" : "14px 14px" }}
        />
      )}
      {frame && <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />}

      {isCover && (
        <span
          className={cn("relative block w-full shrink-0", compact ? "h-16" : "h-24")}
          style={{ background: theme.cover }}
        />
      )}

      {isCard ? (
        <span
          className={cn("relative flex w-full flex-col items-center", compact ? "px-2 pb-3 pt-3" : "px-3 pb-4 pt-5")}
          style={{
            background: theme.card,
            border: theme.cardBorder,
            borderRadius: compact ? "14px" : "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          {content}
        </span>
      ) : (
        <span className={cn("relative flex w-full flex-col items-center", isCover && (compact ? "px-3" : "px-4"))}>
          {content}
        </span>
      )}
    </div>
  );

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        frame && "rounded-[2.25rem] border-[6px] border-zinc-900 bg-zinc-900 shadow-2xl shadow-black/40 ring-1 ring-white/10",
        className
      )}
    >
      {page}
    </div>
  );
}
