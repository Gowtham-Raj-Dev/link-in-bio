import { Check } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { WHY_POINTS } from "@/lib/constants";

export function Why() {
  return (
    <section className="border-y border-border bg-card/40 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why LinkinBio"
          title="Why Creators Choose LinkinBio"
          subtitle="Built from the ground up for people who want to share more, faster."
        />
        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
          {WHY_POINTS.map((point, i) => (
            <Reveal key={point} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{point}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
