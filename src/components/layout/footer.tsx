import Link from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/section";
import { BRAND } from "@/lib/constants";

const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/#features" },
      { label: "Roadmap", href: "/#roadmap" },
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
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {BRAND.tagline} Build a beautiful bio page and share everything
              from one smart link.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold">{group.title}</h4>
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
            </div>
          ))}
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
            Founder: <span className="font-medium text-foreground">{BRAND.founder}</span>
            {" · "}© {new Date().getFullYear()} {BRAND.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
