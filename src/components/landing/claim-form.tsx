"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { saveClaimedUsername } from "@/lib/claim";
import { BRAND } from "@/lib/constants";
import { cn, slugify } from "@/lib/utils";

const PROFILE_PREFIX = `${BRAND.url.replace(/^https?:\/\//, "")}/u/`;

const BUTTON_CLASS =
  "inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-4 text-sm font-semibold shadow-lg transition-all hover:brightness-110 active:scale-[0.98] sm:px-5";
const GRADIENT_BUTTON = "brand-gradient text-white shadow-primary/30";

/** "Pick your username" box. The chosen name is remembered and pre-filled in
 *  the profile editor once the visitor has signed up. */
export function ClaimForm({
  id,
  onGradient = false,
  className,
}: {
  /** Unique per page, so each form's label points at its own input. */
  id: string;
  /** Set when the form sits on the brand gradient, where a gradient button would vanish. */
  onGradient?: boolean;
  className?: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState("");

  if (user) {
    return (
      <div className={className}>
        <Link
          href="/dashboard"
          className={cn(
            BUTTON_CLASS,
            "h-12 px-6 text-base",
            onGradient ? "bg-white text-zinc-900 shadow-black/20" : GRADIENT_BUTTON
          )}
        >
          Go to your dashboard <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = slugify(value);
    if (username) saveClaimedUsername(username);
    router.push("/login?tab=signup&redirect=%2Fdashboard%2Fprofile");
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label htmlFor={id} className="sr-only">
        Choose a username for your link in bio page
      </label>
      <div className="flex items-center rounded-2xl border border-border bg-card p-1.5 text-left shadow-xl shadow-primary/10 transition-shadow focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/15">
        <span className="shrink-0 select-none pl-3 text-sm text-muted-foreground">
          <span className="hidden min-[440px]:inline">{PROFILE_PREFIX}</span>
          <span className="min-[440px]:hidden">/u/</span>
        </span>
        <input
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="yourname"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={30}
          className="h-11 min-w-0 flex-1 bg-transparent pr-2 text-sm font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/60"
        />
        <button type="submit" className={cn(BUTTON_CLASS, GRADIENT_BUTTON)}>
          <span className="hidden sm:inline">Claim my link</span>
          <span className="sm:hidden">Claim</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
