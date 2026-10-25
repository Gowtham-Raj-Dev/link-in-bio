import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { HeartButton } from "@/components/ui/heart-button";
import { Container } from "@/components/ui/section";
import { BRAND, CODELOVE_GUIDES, CODELOVE_NETWORK } from "@/lib/constants";

const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Who it's for", href: "/#who-its-for" },
      { label: "Themes", href: "/#themes" },
      { label: "Analytics", href: "/#analytics" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A free link in bio page builder for creators, small businesses
              and freelancers. Share everything you do from one link.
            </p>
            <Link
              href="/login?tab=signup"
              className="mt-5 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Create your free page →
            </Link>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Guides">
            <h2 className="text-sm font-semibold">Guides</h2>
            <ul className="mt-4 space-y-2.5">
              {CODELOVE_GUIDES.map((guide) => (
                <li key={guide.href}>
                  <a
                    href={guide.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {guide.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* CodeLove network: a full-width row so the eight sites sit side by side instead of one tall column. */}
        <div className="mt-12 grid gap-8 border-t border-border pt-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <nav aria-label="CodeLove network">
            <h2 className="text-sm font-semibold">CodeLove network</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {CODELOVE_NETWORK.map((site) => (
                <li key={site.href}>
                  <a
                    href={site.href}
                    title={site.description}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {site.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="max-w-[260px] lg:justify-self-end">
          <a
            href="https://codelove.in"
            aria-label="CodeLove — codelove.in"
            className="block w-fit"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/codelove/codelove-footer-on-light.png"
              alt="CodeLove"
              width={704}
              height={144}
              loading="lazy"
              className="h-12 w-auto [.dark_&]:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/codelove/codelove-footer-on-dark.png"
              alt="CodeLove"
              width={704}
              height={144}
              loading="lazy"
              className="hidden h-12 w-auto [.dark_&]:block"
            />
          </a>
          {/* What CodeLove is, in one line — same text on every CodeLove site. */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            CodeLove makes free web tools, apps and games for creators, students and developers — simple to use, no
            hidden fees.
          </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Built with <HeartButton /> by{" "}
            <a
              href="https://gowtham.codelove.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              Gowtham
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://codelove.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              CodeLove
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Founder:{" "}
            <a
              href="https://gowtham.codelove.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              {BRAND.founder}
            </a>
            {" · "}© {new Date().getFullYear()} {BRAND.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
