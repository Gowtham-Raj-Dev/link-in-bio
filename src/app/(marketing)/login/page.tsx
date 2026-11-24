import type { Metadata } from "next";
import { Suspense } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/section";
import { BRAND } from "@/lib/constants";
import { THEMES } from "@/lib/themes";
import { LoginContent } from "./login-content";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in or create your free LinkinBio account with email or Google.",
  robots: { index: false, follow: false },
};

const PERKS = [
  "Unlimited links from one smart page",
  `${THEMES.length} modern templates with live preview`,
  "Your profile syncs securely across your devices",
  "Free during early access, no credit card",
];

const IMAGE = "/auth/signin.jpg";
const IMAGE_ALT =
  "A phone showing a LinkinBio page with links, next to profile view and click charts";

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16">
      <div className="aurora-bg" />
      <Container className="relative">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:min-h-[640px] lg:grid-cols-[1.05fr_1fr]">
          {/* Image panel */}
          <div className="relative h-52 overflow-hidden bg-black sm:h-64 lg:h-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGE}
              alt={IMAGE_ALT}
              width={1024}
              height={1024}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[30%_25%] lg:h-[78%] lg:object-[30%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black from-25% via-black/75 via-45% to-black/0 to-75% lg:from-35% lg:via-55%" />

            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/25 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                {BRAND.tagline}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8 lg:p-10">
              <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-[34px]">
                Your whole world,
                <br />
                behind one link.
              </h2>
              <ul className="mt-6 hidden space-y-2.5 lg:block">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-white/90">{perk}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 hidden text-xs text-white/60 lg:block">
                Built by {BRAND.developedBy} · Founder {BRAND.founder}
              </p>
            </div>
          </div>

          {/* Form panel */}
          <div className="flex items-center p-6 sm:p-10">
            <div className="mx-auto w-full max-w-sm">
              <Suspense
                fallback={
                  <div className="flex justify-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                }
              >
                <LoginContent />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
