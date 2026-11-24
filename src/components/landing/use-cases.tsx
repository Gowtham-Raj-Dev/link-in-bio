import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { LANDING_PAGES } from "@/lib/landing-pages";

/** Links every keyword page from the home page with its phrase as the link
 *  text, so search engines find each one in a single click from the page
 *  they already know. New pages in LANDING_PAGES appear here automatically. */
export function UseCases() {
  return (
    <section id="use-cases" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Use cases"
          title="A link in bio for every need"
          subtitle="Pick what you are building. Each guide shows the links to add and how to set your page up."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_PAGES.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${page.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="flex items-center justify-between gap-2 font-semibold">
                  {page.label}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </span>
                <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {page.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
