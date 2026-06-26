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
      <img
        src="/favicon.ico"
        alt="Logo"
        className="h-7 w-7 object-contain"
      />
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
