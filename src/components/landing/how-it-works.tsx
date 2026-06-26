import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-card/40 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="Live in four simple steps"
          subtitle="From sign-in to sharing in minutes — no design skills needed."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-6">
                <span className="absolute right-5 top-5 text-4xl font-bold text-muted/60">
                  0{step.step}
                </span>
                <div className="brand-gradient mb-5 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg shadow-primary/25">
                  <Icon name={step.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
