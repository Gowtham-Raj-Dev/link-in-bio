"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { BrandIcon } from "@/components/brand/brand-icon";
import { getTheme } from "@/lib/themes";
import { SOCIAL_PLATFORMS } from "@/lib/constants";
import { withProtocol } from "@/lib/utils";
import type { AppData, SocialPlatform } from "@/lib/types";

interface ProfileViewProps {
  data: AppData;
  /** Disable interactions/animation for previews. */
  preview?: boolean;
}

/** Renders the public-facing bio page. Shared by /u/[username] and previews. */
export function ProfileView({ data, preview = false }: ProfileViewProps) {
  const theme = getTheme(data.themeId);
  const { profile, links, socials, settings } = data;
  const target = settings.openLinksInNewTab ? "_blank" : undefined;

  const activeSocials = SOCIAL_PLATFORMS.filter(
    (s) => socials[s.key as SocialPlatform]
  );

  const Wrapper = preview ? "div" : motion.div;
  const itemProps = (i: number) =>
    preview
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 + i * 0.07, duration: 0.45 },
        };

  return (
    <div
      className="flex min-h-full w-full flex-col items-center px-5 py-12"
      style={{ background: theme.background, color: theme.text }}
    >
      <div className="w-full max-w-md">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          {profile.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar}
              alt={profile.displayName || "Avatar"}
              className="h-24 w-24 rounded-full object-cover shadow-xl"
              style={{ border: `2px solid ${theme.muted}` }}
            />
          ) : (
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold shadow-xl"
              style={{
                background: theme.buttonBg,
                border: theme.buttonBorder,
              }}
            >
              {(profile.displayName || "U").charAt(0).toUpperCase()}
            </div>
          )}

          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            {profile.displayName || "Your Name"}
          </h1>
          {profile.username && (
            <p className="text-sm" style={{ color: theme.muted }}>
              @{profile.username}
            </p>
          )}
          {profile.bio && (
            <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-90">
              {profile.bio}
            </p>
          )}
          {(profile.location || profile.website) && (
            <div
              className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs"
              style={{ color: theme.muted }}
            >
              {profile.location && <span>📍 {profile.location}</span>}
              {profile.website && (
                <a
                  href={withProtocol(profile.website)}
                  target={target}
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  🔗 {profile.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Social icons */}
        {settings.showSocialIcons && activeSocials.length > 0 && (
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {activeSocials.map((s) => (
              <a
                key={s.key}
                href={withProtocol(socials[s.key as SocialPlatform]!)}
                target={target}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{
                  background: theme.buttonBg,
                  border: theme.buttonBorder,
                  backdropFilter: theme.glass ? "blur(8px)" : undefined,
                }}
              >
                <BrandIcon name={s.key} className="h-5 w-5" />
              </a>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-7 space-y-3.5">
          {links.length === 0 && (
            <p
              className="rounded-xl py-6 text-center text-sm"
              style={{ color: theme.muted, border: theme.buttonBorder }}
            >
              No links yet. Add some from your dashboard.
            </p>
          )}
          {links.map((link, i) => (
            <Wrapper key={link.id} {...itemProps(i)}>
              <a
                href={withProtocol(link.url)}
                target={target}
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.99]"
                style={{
                  background: theme.buttonBg,
                  color: theme.buttonText,
                  border: theme.buttonBorder,
                  backdropFilter: theme.glass ? "blur(8px)" : undefined,
                }}
              >
                <Icon name={link.icon} className="h-5 w-5 shrink-0 opacity-90" />
                <span className="flex-1 text-center">{link.title}</span>
                <span className="h-5 w-5 shrink-0" />
              </a>
            </Wrapper>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          {settings.showPrivacyBadge && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px]"
              style={{ background: theme.buttonBg, color: theme.muted }}
            >
              <ShieldCheck className="h-3 w-3" />
              Data stored locally · Privacy first
            </span>
          )}
          <Link
            href="/"
            target={target}
            className="text-xs font-medium opacity-70 transition-opacity hover:opacity-100"
          >
            ⚡ Made with LinkinBio
          </Link>
        </div>
      </div>
    </div>
  );
}
