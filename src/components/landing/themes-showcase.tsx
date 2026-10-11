import { Container, SectionHeading } from "@/components/ui/section";
import { ThemeCarousel } from "@/components/landing/theme-carousel";
import { THEMES } from "@/lib/themes";

/** Every built-in theme, shown on a sample page in a looping carousel. */
export function ThemesShowcase() {
  return (
    <section id="themes" className="overflow-hidden py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Themes"
          title="Pick a look that feels like you"
          subtitle={`${THEMES.length} themes are built in, from clean and minimal to bold and neon. Prefer your own style? Use a background photo instead.`}
        />
      </Container>
      <ThemeCarousel />
    </section>
  );
}
