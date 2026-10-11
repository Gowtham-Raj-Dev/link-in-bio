import { Check, Eye, MousePointerClick } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/section";

const STATS = [
  { label: "Profile views", value: "2,481", icon: Eye },
  { label: "Link clicks", value: "1,204", icon: MousePointerClick },
];

const LINK_STATS = [
  { label: "Order on WhatsApp", clicks: 312 },
  { label: "Menu & price list", clicks: 188 },
  { label: "Find us on Google Maps", clicks: 96 },
  { label: "Customer reviews", clicks: 54 },
];

const POINTS = [
  "Total views of your page",
  "Total clicks across all your links",
  "A click count next to every single link",
];

const MAX_CLICKS = Math.max(...LINK_STATS.map((link) => link.clicks));

export function AnalyticsSection() {
  return (
    <section id="analytics" className="border-y border-border bg-card/40 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <Eyebrow>Analytics</Eyebrow>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
              Know which links people actually tap
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              A plain link in your bio tells you very little about what
              happens after someone taps it. LinkinBio counts every visit to
              your page and every click on each link, so you can see what your
              audience cares about and move it to the top.
            </p>
            <ul className="mt-7 space-y-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            role="img"
            aria-label="Sample analytics dashboard showing profile views, link clicks and clicks per link"
            className="reveal relative mx-auto w-full max-w-lg"
          >
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-primary/10 blur-3xl" />
            <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-primary/10 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Your page</p>
                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  Sample data
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border bg-background p-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <stat.icon className="h-4 w-4" />
                    </span>
                    <p className="font-display mt-3 text-2xl font-bold tabular-nums sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                {LINK_STATS.map((link) => (
                  <div key={link.label} className="space-y-1.5">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="truncate font-medium">{link.label}</span>
                      <span className="shrink-0 tabular-nums text-muted-foreground">
                        {link.clicks} clicks
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="brand-gradient h-full rounded-full"
                        style={{ width: `${(link.clicks / MAX_CLICKS) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
