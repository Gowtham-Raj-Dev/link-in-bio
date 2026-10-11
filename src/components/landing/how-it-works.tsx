import { ListPlus, Share2, UserPlus, type LucideIcon } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { HOW_IT_WORKS } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = { UserPlus, ListPlus, Share2 };

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Your link in bio, live in three steps"
          subtitle="From sign-up to a page you can share takes a few minutes. No design or coding skills needed."
        />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          {/* Line joining the three step markers on wide screens. */}
          <span
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 md:block"
          />
          {HOW_IT_WORKS.map((step) => {
            const StepIcon = ICONS[step.icon];
            return (
              <li key={step.step} className="reveal relative text-center">
                <span className="brand-gradient relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-primary/30 ring-8 ring-background">
                  <StepIcon className="h-6 w-6" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">
                  Step {step.step}
                </p>
                <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
