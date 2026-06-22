import { Database, Lock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function PrivacySection() {
  return (
    <section id="privacy" className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider brand-text">
              Privacy First
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Your Data Stays With You
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Unlike many platforms, LinkinBio currently keeps your profile data
              inside your browser. We don&apos;t store your links or profile
              information on our servers.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Profile content lives in your browser's local storage",
                "Google Sign-In is used only to identify your account",
                "No analytics or personal data on our servers",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="aurora-bg opacity-60" />
              <div className="relative rounded-3xl border border-border bg-card p-8 shadow-xl">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                      <Lock className="h-7 w-7" />
                    </span>
                    <span className="text-xs font-medium">Your Browser</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-px w-16 bg-gradient-to-r from-emerald-500/60 to-red-500/40" />
                    <span className="mt-1 text-[10px] text-muted-foreground">
                      stays local
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 opacity-50">
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                      <Database className="h-7 w-7" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-[2px] w-12 -rotate-45 rounded bg-red-500" />
                      </span>
                    </span>
                    <span className="text-xs font-medium">Our Servers</span>
                  </div>
                </div>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Data flows to your device — never to a database.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
