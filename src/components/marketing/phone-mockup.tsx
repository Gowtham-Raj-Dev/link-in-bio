"use client";

import { motion } from "framer-motion";
import { BrandIcon } from "@/components/brand/brand-icon";
import type { SocialPlatform } from "@/lib/types";

const SAMPLE_SOCIALS: SocialPlatform[] = ["instagram", "youtube", "x", "github"];

const SAMPLE_LINKS = [
  { title: "🎬 Watch my latest video", accent: false },
  { title: "🛍️ Shop my presets", accent: true },
  { title: "📬 Join my newsletter", accent: false },
  { title: "🎙️ Listen to the podcast", accent: false },
];

/** Premium animated phone mockup displaying a creator profile. */
export function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto w-[280px]"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-[2.75rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-2xl shadow-primary/20"
      >
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-zinc-900" />
        <div
          className="relative h-[560px] overflow-hidden rounded-[2.1rem] px-5 pt-12"
          style={{
            background:
              "linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
          }}
        >
          {/* avatar */}
          <div className="flex flex-col items-center text-center">
            <div className="brand-gradient flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg">
              AR
            </div>
            <h3 className="mt-3 text-lg font-bold text-white">Aria Rivera</h3>
            <p className="text-xs text-indigo-200">@ariacreates</p>
            <p className="mt-2 px-2 text-[11px] leading-relaxed text-indigo-100/80">
              Filmmaker &amp; creator. Sharing my gear, presets and stories ✨
            </p>
          </div>

          {/* socials */}
          <div className="mt-4 flex justify-center gap-3 text-white/80">
            {SAMPLE_SOCIALS.map((key) => (
              <span
                key={key}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"
              >
                <BrandIcon name={key} className="h-4 w-4" />
              </span>
            ))}
          </div>

          {/* links */}
          <div className="mt-5 space-y-3">
            {SAMPLE_LINKS.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                className={
                  link.accent
                    ? "brand-gradient rounded-xl px-4 py-3 text-center text-xs font-semibold text-white shadow-lg"
                    : "rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center text-xs font-medium text-white backdrop-blur"
                }
              >
                {link.title}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* floating glow */}
      <div className="absolute -inset-8 -z-10 rounded-full bg-primary/20 blur-3xl" />
    </motion.div>
  );
}
