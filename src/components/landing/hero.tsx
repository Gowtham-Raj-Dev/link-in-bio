import Link from "next/link";
import { ArrowRight, Check, Eye, MousePointerClick, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/section";
import { ClaimForm } from "@/components/landing/claim-form";
import { MiniProfile, SAMPLE_PROFILES } from "@/components/marketing/mini-profile";
import { DEMO_USERNAME } from "@/lib/demo";

const PROMISES = ["Free to use", "No credit card", "Set up in minutes"];

/** Stagger for the CSS entrance animation. */
const delay = (seconds: number) =>
  ({ "--delay": `${seconds}s` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="hero-glow" />
      <div className="grid-fade" />
      <Container className="grid items-center gap-16 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-20">
        <div className="text-center lg:text-left">
          <p className="fade-up inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3.5 py-1.5 text-xs font-medium text-foreground/85">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Free link in bio builder · ₹0, no credit card
          </p>

          <h1
            className="fade-up font-display mt-6 text-balance text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4rem]"
            style={delay(0.05)}
          >
            One free link in bio for{" "}
            <span className="headline-gradient">everything you share</span>
          </h1>

          <p
            className="fade-up mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0"
            style={delay(0.12)}
          >
            Put your Instagram, YouTube, WhatsApp, shop and every important
            link on one beautiful page. Pick a theme, paste the link in your
            bio and see exactly which links people tap.
          </p>

          <div className="fade-up mt-8" style={delay(0.2)}>
            <ClaimForm id="hero-username" className="mx-auto max-w-lg lg:mx-0" />
          </div>

          <ul
            className="fade-up mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-start"
            style={delay(0.28)}
          >
            {PROMISES.map((promise) => (
              <li key={promise} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" />
                {promise}
              </li>
            ))}
          </ul>

          <p className="fade-up mt-6 text-sm" style={delay(0.34)}>
            <Link
              href={`/u/${DEMO_USERNAME}`}
              className="group inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
            >
              See a live example page
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </p>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

/** Three sample pages, one per audience, with a couple of analytics chips. */
function HeroVisual() {
  return (
    <div
      className="fade-up relative mx-auto h-[30rem] w-[15rem] sm:h-[32rem] sm:w-[16rem]"
      style={delay(0.2)}
    >
      <MiniProfile
        profile={SAMPLE_PROFILES.developer}
        themeId="premium-black"
        label="Example link in bio page for a developer"
        className="absolute inset-0 -translate-x-[56%] translate-y-10 -rotate-[8deg] scale-[0.86] xl:-translate-x-[64%]"
      />
      <MiniProfile
        profile={SAMPLE_PROFILES.creator}
        themeId="neon"
        label="Example link in bio page for a travel creator"
        className="absolute inset-0 translate-x-[56%] translate-y-10 rotate-[8deg] scale-[0.86] xl:translate-x-[64%]"
      />
      <MiniProfile
        profile={SAMPLE_PROFILES.business}
        themeId="sunset"
        label="Example link in bio page for a home bakery"
        className="absolute inset-0 z-10"
      />

      <div
        aria-hidden="true"
        className="float-y absolute -left-[50%] bg-card top-[13%] z-20 hidden items-center gap-3 rounded-2xl border border-border px-3.5 py-2.5 shadow-xl sm:flex xl:-left-[62%]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Eye className="h-4 w-4" />
        </span>
        <span className="text-left">
          <span className="block text-[11px] text-muted-foreground">Profile views</span>
          <span className="block text-sm font-semibold tabular-nums">2,481</span>
        </span>
      </div>

      <div
        aria-hidden="true"
        className="float-y absolute -right-[50%] bg-card bottom-[11%] z-20 hidden items-center gap-3 rounded-2xl border border-border px-3.5 py-2.5 shadow-xl sm:flex xl:-right-[62%]"
        style={delay(-3)}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
          <MousePointerClick className="h-4 w-4" />
        </span>
        <span className="text-left">
          <span className="block text-[11px] text-muted-foreground">Order on WhatsApp</span>
          <span className="block text-sm font-semibold tabular-nums">312 clicks</span>
        </span>
      </div>
    </div>
  );
}
