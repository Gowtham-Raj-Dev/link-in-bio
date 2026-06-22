import { Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 sm:py-20">
      <div className="aurora-bg opacity-50" />
      <Container className="relative text-center">
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-wider brand-text">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}

/** Readable long-form content styling without the typography plugin. */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted-foreground",
        "[&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_li]:marker:text-primary",
        className
      )}
    >
      {children}
    </div>
  );
}
