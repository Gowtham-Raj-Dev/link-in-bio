"use client";

import { Check, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PreviewFrame } from "@/components/profile/preview-frame";
import { useAppData } from "@/hooks/use-app-data";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

export default function ThemesPage() {
  const { data, ready, update } = useAppData();

  if (!ready || !data) return <div className="h-96 rounded-2xl skeleton" />;

  const select = (id: string) =>
    update((prev) => ({ ...prev, themeId: id }));

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Themes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a look for your page. Changes preview instantly.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {THEMES.map((theme) => {
            const active = data.themeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => select(theme.id)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border-2 text-left transition-all",
                  active
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border hover:border-primary/40"
                )}
              >
                <div
                  className="flex h-32 flex-col items-center justify-center gap-2 p-4"
                  style={{ background: theme.background, color: theme.text }}
                >
                  <span
                    className="h-8 w-8 rounded-full"
                    style={{
                      background: theme.buttonBg,
                      border: theme.buttonBorder,
                    }}
                  />
                  <span
                    className="h-3 w-20 rounded-full"
                    style={{ background: theme.buttonBg, border: theme.buttonBorder }}
                  />
                  <span
                    className="h-3 w-16 rounded-full"
                    style={{ background: theme.buttonBg, border: theme.buttonBorder }}
                  />
                </div>
                <div className="flex items-center justify-between bg-card px-3 py-2.5">
                  <span className="text-sm font-medium">{theme.name}</span>
                  {active && (
                    <span className="brand-gradient flex h-5 w-5 items-center justify-center rounded-full">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
          <Lock className="h-5 w-5 shrink-0 text-amber-500" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Premium themes</span>{" "}
            with custom fonts, backgrounds and animations are{" "}
            <Badge variant="soon" className="mx-1 align-middle">
              Coming soon
            </Badge>
          </p>
        </div>
      </div>

      <PreviewFrame data={data} />
    </div>
  );
}
