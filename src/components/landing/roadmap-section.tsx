import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { ComingSoonBanner } from "@/components/marketing/coming-soon-banner";
import { ROADMAP } from "@/lib/constants";

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Roadmap"
          title="The Future of LinkinBio"
          subtitle="We're just getting started. Here's where we're headed next."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border sm:left-1/2" />
          <div className="space-y-6">
            {ROADMAP.map((item, i) => (
              <Reveal key={item.phase} delay={i * 0.05}>
                <div className="relative flex gap-5 sm:grid sm:grid-cols-2 sm:gap-8">
                  <span className="absolute left-[11px] top-5 z-10 h-4 w-4 rounded-full border-2 border-background brand-gradient sm:left-1/2 sm:-translate-x-1/2" />
                  <div
                    className={
                      i % 2 === 0
                        ? "ml-12 sm:ml-0 sm:pr-10 sm:text-right"
                        : "ml-12 sm:col-start-2 sm:pl-10"
                    }
                  >
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <div
                        className={
                          i % 2 === 0
                            ? "flex items-center gap-2 sm:justify-end"
                            : "flex items-center gap-2"
                        }
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {item.phase}
                        </span>
                        <Badge variant={item.status === "live" ? "success" : "soon"}>
                          {item.status === "live" ? "Live" : "Coming Soon"}
                        </Badge>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <ComingSoonBanner className="mx-auto mt-14 max-w-3xl" />
        </Reveal>
      </Container>
    </section>
  );
}
