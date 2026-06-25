import { Cloud, Globe, ShieldCheck, Zap } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function PrivacySection() {
  return (
    <section id="infrastructure" className="py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider brand-text">
              Secure & Fast
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Enterprise-Grade Cloud
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Your profile is instantly synced to the cloud and served globally. We use state-of-the-art infrastructure to ensure your link-in-bio loads in milliseconds, anywhere in the world.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Secure authentication via Google",
                "Global CDN delivery for blazing fast load times",
                "Real-time cloud sync across all your devices",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative rounded-3xl border border-border bg-card p-8 shadow-xl">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-500">
                      <Cloud className="h-7 w-7" />
                    </span>
                    <span className="text-xs font-medium">Cloud Database</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-px w-16 bg-gradient-to-r from-brand-500/60 to-brand-500/60 relative">
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2">
                        <Zap className="h-3 w-3 text-brand-500" />
                      </span>
                    </div>
                    <span className="mt-2 text-[10px] text-muted-foreground">
                      instant sync
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-500">
                      <Globe className="h-7 w-7" />
                    </span>
                    <span className="text-xs font-medium">Global Edge</span>
                  </div>
                </div>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Data flows securely from the cloud directly to your audience.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
