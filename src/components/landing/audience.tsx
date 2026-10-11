import {
  Briefcase,
  Camera,
  Clapperboard,
  GraduationCap,
  Music,
  Store,
  type LucideIcon,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { AUDIENCES } from "@/lib/constants";

// Imported one by one so the landing page does not ship the whole icon set.
const ICONS: Record<string, LucideIcon> = {
  Camera,
  Clapperboard,
  Store,
  Briefcase,
  GraduationCap,
  Music,
};

export function Audience() {
  return (
    <section id="who-its-for" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who it's for"
          title="A link in bio page for every kind of creator"
          subtitle="Whether you post reels, run a shop from your phone or freelance, one link keeps everything you do in one place."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((audience) => {
            const AudienceIcon = ICONS[audience.icon];
            return (
              <li
                key={audience.title}
                className="reveal lift-card flex h-full flex-col rounded-3xl border border-border bg-card p-6 sm:p-7"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: `color-mix(in srgb, ${audience.accent} 15%, transparent)`,
                    color: audience.accent,
                  }}
                >
                  <AudienceIcon className="h-6 w-6" />
                </span>
                <h3 className="font-display mt-5 text-xl font-semibold tracking-tight">
                  {audience.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {audience.description}
                </p>
                <ul
                  aria-label="Example links"
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {audience.links.map((link) => (
                    <li
                      key={link}
                      className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
