"use client";

import { Moon, Sun } from "lucide-react";
import { useColorMode } from "@/components/providers/theme-provider";

export function ThemeToggle() {
  const { mode, toggle } = useColorMode();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle color mode"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-muted"
    >
      {mode === "dark" ? (
        <Sun className="h-[18px] w-[18px]" />
      ) : (
        <Moon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
