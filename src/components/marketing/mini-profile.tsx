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
  className?: string;
}

/** Static phone mockup of a bio page, drawn with a real theme's colours.
 *  Give it a width and height through `className`. */
export function MiniProfile({
  profile,
  themeId,
  label,
  compact = false,
  className,
}: MiniProfileProps) {
  const theme = getTheme(themeId);

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "rounded-[2.25rem] border-[6px] border-zinc-900 bg-zinc-900 shadow-2xl shadow-black/40 ring-1 ring-white/10",
        className
      )}
    >
      <div
        className={cn(
          "relative flex h-full flex-col items-center overflow-hidden rounded-[1.8rem] px-4 pb-5 text-center",
          compact ? "pt-8" : "pt-10"
        )}
        style={{ background: theme.background, color: theme.text }}
      >
        <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full font-bold text-white shadow-lg ring-2 ring-white/30",
            compact ? "h-11 w-11 text-xs" : "h-16 w-16 text-lg"
          )}
          style={{ background: profile.avatar }}
        >
          {profile.initials}
        </span>
        <span
          className={cn(
            "mt-3 font-semibold leading-tight",
            compact ? "text-xs" : "text-[15px]"
          )}
        >
          {profile.name}
        </span>
        <span
          className={compact ? "text-[9px]" : "mt-0.5 text-[11px]"}
          style={{ color: theme.muted }}
        >
          {profile.handle}
        </span>
        {!compact && (
          <span className="mt-2 text-[11px] leading-snug opacity-85">
            {profile.bio}
          </span>
        )}
        <span className={cn("flex gap-1.5", compact ? "mt-2" : "mt-3")}>
          {profile.socials.map((social) => (
            <span
              key={social}
              className={cn(
                "flex items-center justify-center rounded-full",
                compact ? "h-5 w-5" : "h-7 w-7"
              )}
              style={{ background: theme.buttonBg, border: theme.buttonBorder }}
            >
              <BrandIcon
                name={social}
                className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"}
              />
            </span>
          ))}
        </span>
        <span
          className={cn("flex w-full flex-col", compact ? "mt-3 gap-1.5" : "mt-4 gap-2")}
        >
          {profile.links.map((link) => (
            <span
              key={link}
              className={cn(
                "truncate rounded-xl font-medium",
                compact ? "px-2 py-1.5 text-[9px]" : "px-3 py-2.5 text-[11px]"
              )}
              style={{
                background: theme.buttonBg,
                color: theme.buttonText,
                border: theme.buttonBorder,
              }}
            >
              {link}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
