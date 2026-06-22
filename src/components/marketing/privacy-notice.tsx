import { ShieldCheck } from "lucide-react";
import { PRIVACY_NOTICE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Transparent privacy notice shown throughout the product. */
export function PrivacyNotice({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4",
        className
      )}
    >
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      <p
        className={cn(
          "leading-relaxed text-muted-foreground",
          compact ? "text-xs" : "text-sm"
        )}
      >
        {PRIVACY_NOTICE}
      </p>
    </div>
  );
}
