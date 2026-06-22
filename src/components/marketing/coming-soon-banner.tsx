import { Check, Sparkles } from "lucide-react";
import { COMING_SOON } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Marquee-free "Coming Soon" roadmap banner reused across the site. */
export function ComingSoonBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 sm:p-6",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Coming Soon
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
        {COMING_SOON.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
            <span className="text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
