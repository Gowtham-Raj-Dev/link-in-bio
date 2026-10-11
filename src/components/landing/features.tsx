import {
  GripVertical,
  ImagePlus,
  Laptop,
  MapPin,
  MessageCircle,
  Play,
  RefreshCw,
  Smartphone,
  BookOpen,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

const CARD =
  "reveal lift-card relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-7";

function CardText({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </>
  );
}

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-card/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything your bio link needs, free"
          subtitle="The tools you would expect from a paid link in bio service, without the price tag or the learning curve."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          <article className={cn(CARD, "md:col-span-2 lg:col-span-4")}>
            <div className="grid h-full items-center gap-8 sm:grid-cols-2">
              <div>
                <CardText title="Unlimited links, in the order you choose">
                  Add every link that matters, drag to reorder, group them
                  under section headers and pick an icon for each one.
                </CardText>
              </div>
              <LinksVisual />
            </div>
          </article>

          <article className={cn(CARD, "lg:col-span-2")}>
            <CardText title={`${THEMES.length} themes and your own backgrounds`}>
              Start from a ready-made theme, or use a background photo with
              dimming and blur so your text stays readable.
            </CardText>
            <ThemesVisual />
          </article>

          <article className={cn(CARD, "lg:col-span-2")}>
            <CardText title="A QR code for your page">
              Download a QR code and put it on packaging, posters, menus or
              visiting cards.
            </CardText>
            <QrVisual />
          </article>

          <article className={cn(CARD, "lg:col-span-2")}>
            <CardText title="YouTube and Spotify, playable on your page">
              Paste a video or song link and visitors can play it without
              leaving your page.
            </CardText>
            <EmbedVisual />
          </article>

          <article className={cn(CARD, "lg:col-span-2")}>
            <CardText title="Make one link impossible to miss">
              Give your most important link a pulse, bounce or wobble so it
              stands out from the rest.
            </CardText>
            <HighlightVisual />
          </article>

          <article className={cn(CARD, "lg:col-span-3")}>
            <CardText title="Edit from any device">
              Sign in with Google or email. Your page is saved to the cloud,
              so a change made on your phone is already there on your laptop.
            </CardText>
            <SyncVisual />
          </article>

          <article className={cn(CARD, "lg:col-span-3")}>
            <CardText title="Built for the phone in their hand">
              Most visitors arrive from a social app on a phone, so every
              page is designed mobile-first with large, easy-to-tap buttons.
            </CardText>
            <ul className="mt-auto flex flex-wrap gap-2 pt-6 text-xs font-medium">
              {["Light and dark themes", "Social icon row", "Opens links in a new tab"].map(
                (item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-foreground/80"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------ card visuals ------------------------------ */

const SAMPLE_LINKS = [
  { icon: MessageCircle, title: "Order on WhatsApp", clicks: 312, lifted: false },
  { icon: BookOpen, title: "Menu & price list", clicks: 188, lifted: true },
  { icon: MapPin, title: "Find us on Maps", clicks: 96, lifted: false },
];

function LinksVisual() {
  return (
    <div aria-hidden="true" className="space-y-2.5">
      {SAMPLE_LINKS.map((link) => (
        <div
          key={link.title}
          className={cn(
            "flex items-center gap-3 rounded-xl border bg-background px-3 py-2.5 text-sm",
            link.lifted
              ? "translate-x-3 -rotate-1 border-primary/50 shadow-lg shadow-primary/15"
              : "border-border"
          )}
        >
          <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/60" />
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <link.icon className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0 flex-1 truncate font-medium">{link.title}</span>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {link.clicks} clicks
          </span>
        </div>
      ))}
    </div>
  );
}

function ThemesVisual() {
  return (
    <div aria-hidden="true" className="mt-auto grid grid-cols-4 gap-2 pt-6">
      {THEMES.slice(0, 7).map((theme) => (
        <span
          key={theme.id}
          title={theme.name}
          className="h-11 rounded-xl border border-black/10 dark:border-white/15"
          style={{ background: theme.background }}
        />
      ))}
      <span className="flex h-11 items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground">
        <ImagePlus className="h-4 w-4" />
      </span>
    </div>
  );
}

const QR_SIZE = 21;

/** True for the three square "finder" markers in the corners of a QR code. */
function isFinder(x: number, y: number) {
  const inBlock = (cx: number, cy: number) =>
    x >= cx && x < cx + 7 && y >= cy && y < cy + 7;
  const ring = (cx: number, cy: number) => {
    const dx = x - cx;
    const dy = y - cy;
    const edge = dx === 0 || dx === 6 || dy === 0 || dy === 6;
    const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
    return edge || core;
  };
  if (inBlock(0, 0)) return ring(0, 0);
  if (inBlock(QR_SIZE - 7, 0)) return ring(QR_SIZE - 7, 0);
  if (inBlock(0, QR_SIZE - 7)) return ring(0, QR_SIZE - 7);
  return null;
}

/** Decorative QR-style pattern. Not a scannable code. */
function QrVisual() {
  // One path of unit squares keeps the markup small.
  let path = "";
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      const finder = isFinder(x, y);
      const filled = finder ?? (x * 7 + y * 13 + x * y) % 3 === 0;
      const nearFinder =
        finder === null &&
        ((x < 8 && y < 8) || (x > QR_SIZE - 9 && y < 8) || (x < 8 && y > QR_SIZE - 9));
      if (filled && !nearFinder) path += `M${x} ${y}h1v1h-1z`;
    }
  }
  return (
    <div aria-hidden="true" className="mt-auto flex items-center gap-4 pt-6">
      <svg
        viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
        className="h-28 w-28 shrink-0 rounded-2xl border border-border bg-white p-2.5 text-zinc-900"
        shapeRendering="crispEdges"
      >
        <path d={path} fill="currentColor" />
      </svg>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Scan to open
        <span className="mt-0.5 block font-semibold text-foreground">/u/yourname</span>
      </p>
    </div>
  );
}

function EmbedVisual() {
  return (
    <div aria-hidden="true" className="mt-auto space-y-2.5 pt-6">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 via-fuchsia-600 to-indigo-600">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-lg">
          <Play className="h-4 w-4 translate-x-px fill-current" />
        </span>
        <span className="absolute inset-x-3 bottom-3 h-1 overflow-hidden rounded-full bg-white/30">
          <span className="block h-full w-2/5 rounded-full bg-white" />
        </span>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Play className="h-3 w-3 translate-x-px fill-current" />
        </span>
        <span className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
          <span className="block h-full w-1/3 rounded-full bg-emerald-500" />
        </span>
      </div>
    </div>
  );
}

function HighlightVisual() {
  return (
    <div aria-hidden="true" className="mt-auto space-y-2.5 pt-6">
      <div className="rounded-xl border border-border bg-background px-4 py-2.5 text-center text-sm font-medium text-muted-foreground">
        My portfolio
      </div>
      <div className="anim-pulse brand-gradient rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-white">
        🎉 New launch: tap here
      </div>
      <div className="rounded-xl border border-border bg-background px-4 py-2.5 text-center text-sm font-medium text-muted-foreground">
        Newsletter
      </div>
    </div>
  );
}

function SyncVisual() {
  return (
    <div aria-hidden="true" className="mt-auto pt-6">
      <div className="flex items-center justify-center gap-4 rounded-2xl border border-border bg-background py-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Smartphone className="h-6 w-6" />
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="h-px w-8 bg-border sm:w-12" />
          <RefreshCw className="h-4 w-4 text-primary" />
          <span className="h-px w-8 bg-border sm:w-12" />
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Laptop className="h-6 w-6" />
        </span>
      </div>
    </div>
  );
}
