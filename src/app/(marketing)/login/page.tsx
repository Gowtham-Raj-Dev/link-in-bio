import type { Metadata } from "next";
import { Suspense } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/section";
import { BRAND } from "@/lib/constants";
import { LoginContent } from "./login-content";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in or create your free LinkinBio account with email or Google.",
  alternates: { canonical: "/login" },
};

const PERKS = [
  "Unlimited links from one smart page",
  "10 premium themes with live preview",
  "Privacy-first — your data stays in your browser",
  "Free during early access, no credit card",
];

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="aurora-bg" />
      <Container className="relative">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:grid-cols-2">
          {/* Brand panel */}
          <div className="brand-gradient relative hidden flex-col justify-between p-10 text-white lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_55%)]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                {BRAND.tagline}
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight">
                Your whole world,
                <br />
                behind one link.
              </h2>
              <p className="mt-3 max-w-xs text-sm text-white/80">
                Join creators building a beautiful online presence with
                LinkinBio.
              </p>
            </div>

            <ul className="relative mt-10 space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-white/90">{perk}</span>
                </li>
              ))}
            </ul>

            <p className="relative mt-10 text-xs text-white/70">
              Built by {BRAND.developedBy} · Founder {BRAND.founder}
            </p>
          </div>

          {/* Form panel */}
          <div className="p-6 sm:p-10">
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
      </Container>
    </section>
  );
}
