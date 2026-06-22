import Link from "next/link";
import { Link2 } from "lucide-react";
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
      <span className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl shadow-lg shadow-primary/30">
        <Link2 className="h-5 w-5 text-white" strokeWidth={2.5} />
      </span>
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
