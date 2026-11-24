import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Prose } from "@/components/marketing/prose";
import { MiniProfile, SAMPLE_PROFILES } from "@/components/marketing/mini-profile";
import { BLOG_POSTS } from "@/lib/blog";
import { BRAND } from "@/lib/constants";
import { getLandingPage, LANDING_PAGES } from "@/lib/landing-pages";
import { OG_IMAGE } from "@/lib/seo";

// Only the pages listed in LANDING_PAGES exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ landing: page.slug }));
}

type Params = { params: Promise<{ landing: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { landing } = await params;
  const page = getLandingPage(landing);
  if (!page) return {};
  const path = `/${page.slug}`;
  return {
    // Absolute and under 60 characters: the title leads with its keyword.
    title: { absolute: `${page.title} | CodeLove` },
    description: page.description,
    keywords: [page.keyword, ...page.alsoFor, "LinkinBio", "CodeLove"],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: BRAND.name,
      url: path,
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}

const PREVIEW_THEMES = ["midnight", "pop", "ocean"];
const PREVIEW_PROFILES = [SAMPLE_PROFILES.creator, SAMPLE_PROFILES.business, SAMPLE_PROFILES.developer];

export default async function LandingPageRoute({ params }: Params) {
  const { landing } = await params;
  const page = getLandingPage(landing);
  if (!page) notFound();

  const index = LANDING_PAGES.indexOf(page);
  const related = page.related
    .map((slug) => getLandingPage(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const guides = BLOG_POSTS.slice(0, 3);
  const url = `${BRAND.url}/${page.slug}`;

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-glow" />
        <div className="grid-fade" />
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span className="mx-1.5">/</span>
              <span className="text-foreground">{page.label}</span>
            </nav>
            <h1 className="font-display mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {page.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login?tab=signup"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create your free page <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/u/ariacreates"
                className="inline-flex h-12 items-center rounded-full border border-border bg-card px-7 text-sm font-semibold transition-colors hover:border-primary/50"
              >
                See a demo page
              </Link>
            </div>
          </div>
          <div className="mx-auto w-56 sm:w-64">
            <MiniProfile
              profile={PREVIEW_PROFILES[index % PREVIEW_PROFILES.length]}
              themeId={PREVIEW_THEMES[index % PREVIEW_THEMES.length]}
              label={`Example ${page.keyword} page`}
              className="h-[30rem] w-full"
            />
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <Prose className="mx-0 max-w-none [&_h2]:mt-12 [&_h3+p]:mt-2 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_section>*+*]:mt-4 [&_section>h2]:mt-0 [&>section]:pt-6 [&>section:first-child]:pt-0">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <h2>How to set it up</h2>
              <ol>
                {page.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <h2>Frequently asked questions</h2>
              {page.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </Prose>

            <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/[0.06] p-8 text-center sm:p-10">
              <h2 className="text-xl font-bold">Make your {page.keyword} page now</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Free, unlimited links, modern templates. Ready in about two minutes.
              </p>
              <Link
                href="/login?tab=signup"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get started free
              </Link>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold">Included free</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {["Unlimited links", "Modern templates", "Click analytics", "QR code", "YouTube & Spotify embeds"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-sm font-semibold">Related</h2>
              <ul className="mt-4 space-y-2.5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/${r.slug}`} className="text-sm text-primary hover:underline">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-sm font-semibold">Guides</h2>
              <ul className="mt-4 space-y-2.5">
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/blog/${g.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Every keyword page links to every other one. */}
        <nav aria-label="More link in bio guides" className="mx-auto mt-20 max-w-5xl border-t border-border pt-12">
          <h2 className="text-xl font-bold tracking-tight">More ways to use LinkinBio</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LANDING_PAGES.filter((p) => p.slug !== page.slug).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="font-semibold group-hover:text-primary">{p.label}</span>
                  <span className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${url}#webpage`,
                url,
                name: page.title,
                description: page.description,
                inLanguage: "en-IN",
                isPartOf: { "@id": `${BRAND.url}/#website` },
                about: { "@id": `${BRAND.url}/#app` },
              },
              {
                "@type": "HowTo",
                name: `How to set up a ${page.keyword} page`,
                step: page.steps.map((text, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  text,
                })),
              },
              {
                "@type": "FAQPage",
                mainEntity: page.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: BRAND.url },
                  { "@type": "ListItem", position: 2, name: page.label, item: url },
                ],
              },
            ],
          }),
        }}
      />
    </article>
  );
}
