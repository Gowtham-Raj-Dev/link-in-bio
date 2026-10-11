import Link from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/section";
import { BRAND, CODELOVE_NETWORK } from "@/lib/constants";

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
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
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
          <nav aria-label="More from CodeLove">
            <h2 className="text-sm font-semibold">More from CodeLove</h2>
            <ul className="mt-4 space-y-2.5">
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
            <a
              href="https://codelove.in"
              aria-label="CodeLove — codelove.in"
              className="mt-6 block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/codelove/codelove-footer-on-light.png"
                alt="CodeLove"
                width={704}
                height={144}
                loading="lazy"
                className="h-auto w-full max-w-[235px] [.dark_&]:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/codelove/codelove-footer-on-dark.png"
                alt="CodeLove"
                width={704}
                height={144}
                loading="lazy"
                className="hidden h-auto w-full max-w-[235px] [.dark_&]:block"
              />
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> by{" "}
            <a
              href="https://codelove.in"
              className="font-medium text-foreground hover:underline"
            >
              {BRAND.developedBy}
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
