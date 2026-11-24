"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, MapPin, ShieldCheck } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { BrandIcon } from "@/components/brand/brand-icon";
import { getTheme, PROFILE_FONTS_URL, SHAPE_RADIUS } from "@/lib/themes";
import { SOCIAL_PLATFORMS } from "@/lib/constants";
import { withProtocol } from "@/lib/utils";
import { getFirebaseDb } from "@/lib/firebase";
import { doc, setDoc, increment } from "firebase/firestore";
import { BackgroundEffects } from "./background-effects";
import type { AppData, SocialPlatform } from "@/lib/types";

interface ProfileViewProps {
  data: AppData;
  /** Disable interactions/animation for previews. */
  preview?: boolean;
  /** ID of the scroll container to use as root for IntersectionObserver. Defaults to null (window). */
  scrollRootId?: string;
}

function embedFor(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes("spotify.com")) {
      return `https://open.spotify.com/embed${u.pathname}`;
    }
  } catch {
    // not a URL
  }
  return null;
}

/** Renders the public-facing bio page. Shared by /u/[username] and previews. */
export function ProfileView({ data, preview = false }: ProfileViewProps) {
  const theme = getTheme(data.themeId);
  const { profile, links, socials, settings } = data;
  const target = settings.openLinksInNewTab ? "_blank" : undefined;

  const activeSocials = SOCIAL_PLATFORMS.filter(
    (s) => socials[s.key as SocialPlatform]
  );

  // A custom photo or colour replaces the theme background. The cover banner
  // would clash with a photo, so those pages fall back to the centred layout.
  let bgValue = profile.customBg || theme.background;
  if (bgValue.includes("url(") && bgValue.includes(" center/cover no-repeat fixed")) {
    bgValue = bgValue.replace(" center/cover no-repeat fixed", "");
  }
  const hasCustomBg = Boolean(profile.customBg);
  const isImageOrGradient = bgValue.includes("url(") || bgValue.includes("gradient(");
  const layout = theme.layout === "cover" && hasCustomBg ? "center" : theme.layout;

  const textColor = profile.customColor || theme.text;
  const mutedColor = profile.customColor ? textColor : theme.muted;
  const bodyFont = profile.fontFamily ? `'${profile.fontFamily}', ${theme.font}` : theme.font;
  const headingFont = profile.fontFamily ? bodyFont : theme.headingFont || theme.font;
  const radius = SHAPE_RADIUS[theme.shape];
  const blur = theme.glass ? "blur(14px)" : undefined;

  const Wrapper = preview ? "div" : motion.div;
  const itemProps = (i: number) =>
    preview
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.08 + i * 0.05, duration: 0.4 },
        };

  const handleLinkClick = (id: string) => {
    if (preview || !profile.username) return;
    try {
      const db = getFirebaseDb();
      if (db) {
        const viewsRef = doc(db, "analytics", profile.username);
        setDoc(
          viewsRef,
          { clicks: increment(1), linkClicks: { [id]: increment(1) } },
          { merge: true }
        ).catch(console.error);
      }
    } catch {
      // ignore
    }
  };

  const initials = (profile.displayName || profile.username || "U")
    .split(/\s+/)
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarSize = layout === "cover" ? "h-24 w-24" : "h-[88px] w-[88px]";
  const avatar = profile.avatar ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={profile.avatar}
      alt={profile.displayName || "Profile photo"}
      className={`${avatarSize} shrink-0 rounded-full object-cover`}
      style={{ boxShadow: theme.avatarRing }}
    />
  ) : (
    <div
      className={`${avatarSize} flex shrink-0 items-center justify-center rounded-full text-2xl font-bold`}
      style={{
        boxShadow: theme.avatarRing,
        background: theme.iconBg === "transparent" ? theme.buttonBg : theme.iconBg,
        color: theme.accent === textColor ? textColor : theme.accent,
        fontFamily: headingFont,
      }}
    >
      {initials}
    </div>
  );

  const header = (
    <div className="flex flex-col items-center text-center">
      {layout === "cover" ? <div className="-mt-12">{avatar}</div> : avatar}

      <h1
        className="mt-4 text-[26px] font-bold leading-tight tracking-tight"
        style={{ fontFamily: headingFont }}
      >
        {profile.displayName || "Your Name"}
      </h1>
      {profile.username && (
        <p className="mt-0.5 text-sm font-medium" style={{ color: mutedColor }}>
          @{profile.username}
        </p>
      )}
      {profile.bio && (
        <p className="mt-3 max-w-[22rem] whitespace-pre-line text-[14.5px] leading-relaxed opacity-90">
          {profile.bio}
        </p>
      )}
      {(profile.location || profile.website) && (
        <div
          className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-medium"
          style={{ color: mutedColor }}
        >
          {profile.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          )}
          {profile.website && (
            <a
              href={withProtocol(profile.website)}
              target={target}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-2 hover:underline"
            >
              <Globe className="h-3.5 w-3.5" />
              {profile.website.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          )}
        </div>
      )}

      {settings.showSocialIcons && activeSocials.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          {activeSocials.map((s) => (
            <a
              key={s.key}
              href={withProtocol(socials[s.key as SocialPlatform]!)}
              target={target}
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(s.key)}
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: theme.buttonBg,
                color: theme.buttonText,
                border: theme.buttonBorder,
                backdropFilter: blur,
                WebkitBackdropFilter: blur,
              }}
            >
              <BrandIcon name={s.key} className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const linkList = (
    <div className="mt-7 flex flex-col gap-3">
      {links.length === 0 && (
        <p
          className="py-6 text-center text-sm"
          style={{ color: mutedColor, border: theme.buttonBorder, borderRadius: radius }}
        >
          No links yet. Add some from your dashboard.
        </p>
      )}
      {links.map((link, i) => {
        if (link.type === "header") {
          return (
            <Wrapper key={link.id} {...itemProps(i)} className="flex items-center gap-3 pb-1 pt-4">
              <span className="h-px flex-1 opacity-30" style={{ background: textColor }} />
              <h2
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: mutedColor }}
              >
                {link.title}
              </h2>
              <span className="h-px flex-1 opacity-30" style={{ background: textColor }} />
            </Wrapper>
          );
        }

        const animClass =
          link.animation && link.animation !== "none" ? `anim-${link.animation}` : "";
        const embedUrl = embedFor(link.url);

        if (embedUrl) {
          return (
            <Wrapper key={link.id} {...itemProps(i)}>
              <div
                className={`overflow-hidden ${animClass}`}
                style={{
                  borderRadius: theme.shape === "pill" ? "20px" : radius,
                  border: theme.buttonBorder,
                  background: theme.buttonBg,
                  boxShadow: theme.buttonShadow,
                }}
              >
                <iframe
                  src={embedUrl}
                  title={link.title || "Embedded media"}
                  className="h-[180px] w-full"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </Wrapper>
          );
        }

        return (
          <Wrapper key={link.id} {...itemProps(i)}>
            <a
              href={withProtocol(link.url)}
              target={target}
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(link.id)}
              className={`profile-link group relative flex min-h-[60px] w-full items-center gap-3 py-2 pl-2 pr-4 ${animClass}`}
              style={{
                background: theme.buttonBg,
                color: theme.buttonText,
                border: theme.buttonBorder,
                borderRadius: radius,
                boxShadow: theme.buttonShadow,
                backdropFilter: blur,
                WebkitBackdropFilter: blur,
              }}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center"
                style={{
                  background: theme.iconBg,
                  borderRadius: theme.shape === "pill" ? "9999px" : theme.shape === "rounded" ? "12px" : "4px",
                }}
              >
                <Icon name={link.icon} className="h-5 w-5" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col text-left">
                <span className="truncate text-[15px] font-semibold leading-snug">
                  {link.title}
                </span>
                {link.url && (
                  <span className="truncate text-[11.5px] leading-snug opacity-60">
                    {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </span>
                )}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 opacity-50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          </Wrapper>
        );
      })}
    </div>
  );

  const footer = (
    <div className="mt-10 flex flex-col items-center gap-3 text-center">
      {settings.showPrivacyBadge && (
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium"
          style={{ background: theme.buttonBg, color: mutedColor, border: theme.buttonBorder }}
        >
          <ShieldCheck className="h-3 w-3" />
          Privacy-first page
        </span>
      )}
      <Link
        href="/"
        target={target}
        className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-opacity hover:opacity-100"
        style={{ opacity: 0.75 }}
      >
        Made with LinkinBio
      </Link>
    </div>
  );

  const bgStyle: React.CSSProperties = {
    ...(isImageOrGradient ? { backgroundImage: bgValue } : { backgroundColor: bgValue }),
    backgroundPosition: profile.bgPosition || "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  // The live page pins the background to the screen (a fixed layer, which
  // also works on iOS); the editor preview keeps it inside the phone frame.
  const layerPos = preview ? "absolute" : "fixed";

  return (
    <div
      className="relative isolate flex min-h-full w-full flex-col items-center"
      style={{ color: textColor, fontFamily: bodyFont }}
    >
      <link rel="stylesheet" href={PROFILE_FONTS_URL} />

      <div className={`${layerPos} inset-0 -z-10`} style={bgStyle} />
      {!hasCustomBg && theme.pattern && (
        <div
          className={`${layerPos} inset-0 -z-10`}
          style={{ backgroundImage: theme.pattern, backgroundSize: "18px 18px" }}
        />
      )}
      {(profile.bgOpacity || profile.bgBlur) && hasCustomBg ? (
        <div
          className={`${layerPos} inset-0 -z-10`}
          style={{
            backgroundColor: profile.bgOpacity ? `rgba(0,0,0,${profile.bgOpacity / 100})` : "transparent",
            backdropFilter: profile.bgBlur ? `blur(${profile.bgBlur}px)` : undefined,
            WebkitBackdropFilter: profile.bgBlur ? `blur(${profile.bgBlur}px)` : undefined,
          }}
        />
      ) : null}
      <div className={`${layerPos} inset-0 -z-10`}>
        <BackgroundEffects themeId={data.themeId} style={profile.backgroundStyle} />
      </div>

      {layout === "cover" && (
        <div className="relative h-36 w-full shrink-0 overflow-hidden" style={{ background: theme.cover }}>
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
        </div>
      )}

      <div
        className={
          layout === "card"
            ? "relative w-full max-w-[460px] px-4 pb-10 pt-8"
            : layout === "cover"
              ? "relative w-full max-w-[460px] px-5 pb-10"
              : "relative w-full max-w-[460px] px-5 pb-10 pt-12"
        }
      >
        {layout === "card" ? (
          <div
            className="px-5 pb-6 pt-8 sm:px-7"
            style={{
              background: theme.card,
              border: theme.cardBorder,
              borderRadius: "28px",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              boxShadow: "0 30px 60px -30px rgba(0,0,0,0.5)",
            }}
          >
            {header}
            {linkList}
            {footer}
          </div>
        ) : (
          <>
            {header}
            {linkList}
            {footer}
          </>
        )}
      </div>
    </div>
  );
}
