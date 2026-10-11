import { BrandIcon } from "@/components/brand/brand-icon";
import { Container } from "@/components/ui/section";
import { SOCIAL_PLATFORMS } from "@/lib/constants";

/** Scrolling row of the platforms that have a built-in icon. */
export function Platforms() {
  return (
    <section
      aria-label="Supported platforms"
      className="border-y border-border bg-card/40 py-8"
    >
      <Container>
        <p className="text-center text-sm font-medium text-muted-foreground">
          One link for every place your audience finds you
        </p>
        {/* The clipping and the single-row layout are utilities, so the row
            stays intact even if the marquee animation itself fails to load. */}
        <div className="marquee mt-5 overflow-hidden">
          <div className="marquee-track flex w-max">
            {/* The list is rendered twice so the loop has no visible seam. */}
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-3 pr-3"
              >
                {SOCIAL_PLATFORMS.map((platform) => (
                  <li
                    key={platform.key}
                    className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-4 text-sm font-medium"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full text-white ring-1 ring-white/15"
                      style={{ background: platform.color }}
                    >
                      <BrandIcon name={platform.key} className="h-3.5 w-3.5" />
                    </span>
                    {platform.label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
