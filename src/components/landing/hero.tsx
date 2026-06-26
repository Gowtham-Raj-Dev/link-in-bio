"use client";


import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BrandIcon } from "@/components/brand/brand-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { useAuth } from "@/lib/auth-context";
import { BRAND } from "@/lib/constants";
import type { SocialPlatform } from "@/lib/types";

/** Profile cards fanned out beneath the headline, like a deck of creator pages. */
const CARDS: {
  name: string;
  handle: string;
  initials: string;
  role: string;
  followers: string;
  img: string;
  gradient: string;
  ring: string;
  socials: SocialPlatform[];
  links: string[];
}[] = [
    {
      name: "Maya Lin",
      handle: "@mayamakes",
      initials: "ML",
      role: "Illustrator",
      followers: "48.2k",
      img: "https://i.pravatar.cc/200?img=47",
      gradient: "linear-gradient(165deg, #1e1b4b 0%, #4338ca 100%)",
      ring: "#818cf8",
      socials: ["instagram", "x"],
      links: ["🎨 Shop prints", "✏️ Free brushes"],
    },
    {
      name: "Jay Cole",
      handle: "@jaycreates",
      initials: "JC",
      role: "Filmmaker",
      followers: "126k",
      img: "https://i.pravatar.cc/200?img=12",
      gradient: "linear-gradient(165deg, #0f172a 0%, #0e7490 100%)",
      ring: "#22d3ee",
      socials: ["youtube", "github"],
      links: ["🎬 Latest video", "🎞️ My gear"],
    },
    {
      name: "Aria Rivera",
      handle: "@ariacreates",
      initials: "AR",
      role: "Creator",
      followers: "312k",
      img: "https://i.pravatar.cc/200?img=5",
      gradient: "linear-gradient(165deg, #312e81 0%, #be185d 100%)",
      ring: "#f472b6",
      socials: ["instagram", "youtube", "x"],
      links: ["🛍️ Shop presets", "📬 Newsletter", "🎙️ Podcast"],
    },
    {
      name: "Leo Park",
      handle: "@leobuilds",
      initials: "LP",
      role: "Developer",
      followers: "73.5k",
      img: "https://i.pravatar.cc/200?img=33",
      gradient: "linear-gradient(165deg, #134e4a 0%, #15803d 100%)",
      ring: "#34d399",
      socials: ["github", "linkedin"],
      links: ["💻 My projects", "📚 Free course"],
    },
    {
      name: "Noor Sayed",
      handle: "@noor.design",
      initials: "NS",
      role: "Designer",
      followers: "91k",
      img: "https://i.pravatar.cc/200?img=9",
      gradient: "linear-gradient(165deg, #3b0764 0%, #7e22ce 100%)",
      ring: "#c084fc",
      socials: ["linkedin", "instagram"],
      links: ["🎨 Portfolio", "🧩 UI kit"],
    },
  ];

export function Hero() {
  const { user } = useAuth();
  const activeIndex = 2;

  return (
    <section className="relative isolate overflow-hidden bg-background">
      <Container className="relative flex min-h-[92vh] flex-col items-center pt-10 text-center sm:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-foreground/80"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          {BRAND.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-8 max-w-4xl text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl pb-2"
        >
          Turn one link into your{" "}
          <span className="brand-shine-text">
            complete online presence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-7 max-w-xl text-lg text-muted-foreground sm:text-xl"
        >
          Create a beautiful bio page for Instagram, YouTube, TikTok, LinkedIn,
          and more. Share everything from one smart link.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-row items-center justify-center gap-2 sm:gap-3"
        >
          {user ? (
            <Link href="/dashboard">
              <Button className="h-10 rounded-full px-5 text-sm sm:h-12 sm:px-8 sm:text-base">
                Go to Dashboard
                <ArrowRight className="ml-1 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/login?tab=signup">
              <Button className="h-10 rounded-full px-5 text-sm sm:h-12 sm:px-8 sm:text-base">
                Start Free
                <ArrowRight className="ml-1 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          )}
          <Link href="/u/ariacreates">
            <Button
              variant="outline"
              className="h-10 rounded-full border-border bg-transparent px-5 text-sm text-foreground hover:bg-muted sm:h-12 sm:px-8 sm:text-base"
            >
              View Demo
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative z-10 mt-5 mb-16 text-xs text-muted-foreground/80 sm:mb-20"
        >
          No credit card required · Free during early access
        </motion.p>

        {/* Dynamic fanned deck of creator profile cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="relative mt-auto flex h-[32rem] w-full max-w-[16.5rem] items-center justify-center pt-16 -mb-32 sm:h-[36rem] sm:max-w-[18.5rem] sm:-mb-48"
        >
          {CARDS.map((card, i) => {
            const offset = (i - activeIndex + CARDS.length) % CARDS.length;

            let x = "0%";
            let y = 0;
            let rotate = 0;
            let scale = 1;
            let zIndex = 0;
            let opacity = 1;

            if (offset === 0) {
              x = "0%"; y = 0; rotate = 0; scale = 1.1; zIndex = 30;
            } else if (offset === 1) {
              x = "65%"; y = 32; rotate = 8; scale = 0.95; zIndex = 20;
            } else if (offset === 2) {
              x = "130%"; y = 72; rotate = 16; scale = 0.9; zIndex = 10;
            } else if (offset === 3) {
              x = "-130%"; y = 72; rotate = -16; scale = 0.9; zIndex = 10;
            } else if (offset === 4) {
              x = "-65%"; y = 32; rotate = -8; scale = 0.95; zIndex = 20;
            }

            return (
              <motion.div
                key={card.handle}
                initial={false}
                animate={{ x, y, rotate, scale, zIndex, opacity }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col overflow-hidden rounded-[2.5rem] border-[6px] border-zinc-900 bg-zinc-950 p-1 shadow-2xl shadow-black/80 ring-1 ring-white/10"
              >
                <div
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] p-6"
                  style={{ background: card.gradient }}
                >
                  <div className="absolute left-1/2 top-2 z-50 h-[1.125rem] w-[4.5rem] -translate-x-1/2 rounded-full bg-black shadow-sm" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/50" />
                  <div className="pointer-events-none absolute -top-1/3 left-1/2 h-2/3 w-[140%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative mt-5 flex flex-1 flex-col items-center">
                    <div
                      className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full text-xl font-bold text-white shadow-lg shadow-black/40 sm:h-24 sm:w-24 sm:text-2xl"
                      style={{
                        boxShadow: `0 0 0 3px ${card.ring}, 0 0 0 6px rgba(255,255,255,0.12)`,
                        background: card.gradient,
                      }}
                    >
                      <span>{card.initials}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.img}
                        alt={card.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>

                    <span className="mt-4 text-base font-semibold text-white">
                      {card.name}
                    </span>
                    <span className="text-xs text-white/55">{card.handle}</span>

                    <div className="mt-3 flex items-center gap-2 text-[10px] sm:text-[11px]">
                      <span className="rounded-full bg-white/15 px-2.5 py-1 font-medium text-white/90 backdrop-blur">
                        {card.role}
                      </span>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 font-medium text-white/80 backdrop-blur">
                        {card.followers} followers
                      </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      {card.socials.map((s) => (
                        <span
                          key={s}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white/90 backdrop-blur transition-colors sm:h-8 sm:w-8"
                        >
                          <BrandIcon name={s} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto w-full space-y-2.5 pt-6">
                      {card.links.map((label) => (
                        <div
                          key={label}
                          className="flex h-9 items-center rounded-xl bg-white/15 px-3.5 text-xs font-medium text-white/95 shadow-sm backdrop-blur sm:h-10"
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
