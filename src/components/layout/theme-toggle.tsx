"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useColorMode } from "@/components/providers/theme-provider";

export function ThemeToggle() {
  const { mode, toggle } = useColorMode();
  // Avoid a hydration mismatch: only render the mode-specific icon after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color mode"
      title={mounted ? (mode === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle color mode"}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-muted"
    >
      {!mounted ? (
        <span className="h-[18px] w-[18px]" />
      ) : mode === "dark" ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
