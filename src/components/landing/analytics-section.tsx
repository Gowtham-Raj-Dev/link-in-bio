import { BarChart3, TrendingUp, Users } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function AnalyticsSection() {
  return (
    <section id="analytics" className="py-20 sm:py-24 bg-muted/50">
      <Container>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
          <Reveal delay={0.1}>
            <div className="relative w-full max-w-lg mx-auto">
              <div className="relative rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-3xl font-bold mt-1">24,592</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-sm font-medium text-emerald-500">
                    <TrendingUp className="h-4 w-4" />
                    +14%
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "My Portfolio", views: "12.4k", percentage: 65 },
                    { label: "Instagram", views: "8.2k", percentage: 45 },
                    { label: "Newsletter", views: "3.9k", percentage: 25 },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{stat.label}</span>
                        <span className="text-muted-foreground">{stat.views} clicks</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div 
                          className="h-full bg-brand-500 rounded-full" 
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider brand-text">
              Live Analytics
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Track Your Success in Real-Time
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Understand your audience with built-in analytics. See exactly which links are performing best and watch your traffic grow as it happens.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Live view counts for your profile",
                "Individual click tracking for every link",
                "Simple, beautiful dashboard with no setup required",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <BarChart3 className="h-5 w-5 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
