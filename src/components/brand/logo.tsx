import Link from "next/link";

import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

interface LogoProps {
  className?: string;
  withText?: boolean;
  href?: string | null;
}

export function Logo({ className, withText = true, href = "/" }: LogoProps) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Same mark as the favicon: white chain on a violet→pink rounded tile. */}
      <img src="/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-[10px] shadow-sm shadow-fuchsia-500/20" />
      {withText && (
        <span className="text-lg font-bold tracking-tight">
          Linkin<span className="brand-text">Bio</span>
        </span>
      )}
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} aria-label={BRAND.name}>
      {inner}
    </Link>
  );
}
