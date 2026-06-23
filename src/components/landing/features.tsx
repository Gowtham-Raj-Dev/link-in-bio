import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { FEATURES } from "@/lib/constants";

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to shine"
          subtitle="Powerful, polished tools that make your bio page feel premium — without writing a line of code."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                <div className="brand-gradient mb-5 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
                  <Icon name={feature.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
