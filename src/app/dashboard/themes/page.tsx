"use client";

import { useState } from "react";
import { Check, Image as ImageIcon, Palette as PaletteIcon } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { PreviewFrame } from "@/components/profile/preview-frame";
import { useAppData } from "@/hooks/use-app-data";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

const IMAGE_BACKGROUNDS = [
  { id: "img-abstract", name: "Abstract Fluid", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
  { id: "img-space", name: "Deep Space", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop" },
  { id: "img-nature", name: "Misty Forest", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2670&auto=format&fit=crop" },
  { id: "img-gradient", name: "Mesh Gradient", url: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop" },
  { id: "img-city", name: "Cyberpunk City", url: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2670&auto=format&fit=crop" },
  { id: "img-minimal", name: "Clean Minimal", url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2667&auto=format&fit=crop" },
];

export default function ThemesPage() {
  const { data, ready, update } = useAppData();
  const [activeTab, setActiveTab] = useState<"colors" | "images">("colors");

  if (!ready || !data) return <div className="h-96 rounded-2xl skeleton" />;

  const selectTheme = (id: string) => {
    update((prev) => ({ 
      ...prev, 
      themeId: id,
      profile: { ...prev.profile, customBg: "" } // Clear custom background when picking a theme
    }));
  };

  const selectImage = (url: string) => {
    update(p => ({
      ...p,
      profile: {
        ...p.profile,
        customBg: `url('${url}')`,
        backgroundStyle: "solid",
        customColor: "#ffffff" // usually images are dark, defaulting text to white looks best
      }
    }));
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Appearance</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a look for your page. Changes preview instantly.
            </p>
          </div>
          
          <div className="flex rounded-lg bg-muted p-1 sm:w-auto">
            <button 
              onClick={() => setActiveTab("colors")}
              className={cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all", activeTab === "colors" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50")}
            >
              <PaletteIcon className="h-4 w-4" /> Colors
            </button>
            <button 
              onClick={() => setActiveTab("images")}
              className={cn("flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all", activeTab === "images" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50")}
            >
              <ImageIcon className="h-4 w-4" /> Images
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {activeTab === "colors" ? (
            THEMES.map((theme) => {
              const active = data.themeId === theme.id && !data.profile.customBg?.includes("url(");
              return (
                <button
                  key={theme.id}
                  onClick={() => selectTheme(theme.id)}
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
            })
          ) : (
            IMAGE_BACKGROUNDS.map((img) => {
              const isActiveImage = data.profile.customBg?.includes(img.url);
              return (
                <button
                  key={img.id}
                  onClick={() => selectImage(img.url)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border-2 text-left transition-all",
                    isActiveImage
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <div
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url('${img.url}')` }}
                  />
                  <div className="flex items-center justify-between bg-card px-3 py-2.5">
                    <span className="text-sm font-medium">{img.name}</span>
                    {isActiveImage && (
                      <span className="brand-gradient flex h-5 w-5 items-center justify-center rounded-full">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <h2 className="font-semibold tracking-tight">Custom Appearance (Pro)</h2>
          <div>
            <Label>Custom Background</Label>
            <div className="mt-1.5 flex gap-2">
              <div className="relative shrink-0">
                <input 
                  type="color" 
                  value={data.profile.customBg?.startsWith("#") ? data.profile.customBg.slice(0, 7) : "#ffffff"}
                  onChange={(e) => update(p => ({...p, profile: {...p.profile, customBg: e.target.value}}))}
                  className="absolute inset-0 h-9 w-12 cursor-pointer opacity-0"
                  title="Choose color"
                />
                <div 
                  className="flex h-9 w-12 items-center justify-center rounded-md border border-input shadow-sm"
                  style={{ background: data.profile.customBg || "#ffffff" }}
                />
              </div>
              <Input 
                placeholder="e.g. #ff0000 or linear-gradient(...)" 
                value={data.profile.customBg || ""}
                onChange={(e) => update(p => ({...p, profile: {...p.profile, customBg: e.target.value}}))}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">Accepts any valid CSS background value.</p>
          </div>
          <div>
            <Label>Background Effect</Label>
            <select 
              className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={data.profile.backgroundStyle || "solid"}
              onChange={(e) => update(p => ({...p, profile: {...p.profile, backgroundStyle: e.target.value as any}}))}
            >
              <option value="solid">Solid / None</option>
              <option value="bubbles">Animated Bubbles ✨</option>
              <option value="dots">Polka Dots</option>
              <option value="waves">Ocean Waves</option>
            </select>
          </div>
          <div>
            <Label>Custom Text Color</Label>
            <div className="mt-1.5 flex gap-2">
              <div className="relative shrink-0">
                <input 
                  type="color" 
                  value={data.profile.customColor?.startsWith("#") ? data.profile.customColor.slice(0, 7) : "#000000"}
                  onChange={(e) => update(p => ({...p, profile: {...p.profile, customColor: e.target.value}}))}
                  className="absolute inset-0 h-9 w-12 cursor-pointer opacity-0"
                  title="Choose color"
                />
                <div 
                  className="flex h-9 w-12 items-center justify-center rounded-md border border-input shadow-sm"
                  style={{ background: data.profile.customColor || "#000000" }}
                />
              </div>
              <Input 
                placeholder="e.g. #ffffff or white" 
                value={data.profile.customColor || ""}
                onChange={(e) => update(p => ({...p, profile: {...p.profile, customColor: e.target.value}}))}
              />
            </div>
          </div>
          <div>
            <Label>Font Family</Label>
            <select 
              className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={data.profile.fontFamily || "Inter"}
              onChange={(e) => update(p => ({...p, profile: {...p.profile, fontFamily: e.target.value}}))}
            >
              <option value="Inter">Inter (Default)</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Roboto Mono">Roboto Mono</option>
              <option value="Outfit">Outfit</option>
              <option value="Space Grotesk">Space Grotesk</option>
            </select>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="mb-4">
              <div className="flex justify-between mb-1.5">
                <Label>Background Dimming</Label>
                <span className="text-xs text-muted-foreground">{data.profile.bgOpacity || 0}%</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                className="w-full accent-primary" 
                value={data.profile.bgOpacity || 0}
                onChange={(e) => update(p => ({...p, profile: {...p.profile, bgOpacity: parseInt(e.target.value)}}))}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">Darken images to make white text easier to read.</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-1.5">
                <Label>Background Blur</Label>
                <span className="text-xs text-muted-foreground">{data.profile.bgBlur || 0}px</span>
              </div>
              <input 
                type="range" 
                min="0" max="20" 
                className="w-full accent-primary" 
                value={data.profile.bgBlur || 0}
                onChange={(e) => update(p => ({...p, profile: {...p.profile, bgBlur: parseInt(e.target.value)}}))}
              />
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between mb-1.5">
                <Label>Manual X Position</Label>
                <span className="text-xs text-muted-foreground">
                  {(() => {
                    const v = parseInt(data.profile.bgPosition?.split(' ')[0] || "50");
                    return isNaN(v) ? 50 : v;
                  })()}%
                </span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                className="w-full accent-primary" 
                value={(() => {
                  const v = parseInt(data.profile.bgPosition?.split(' ')[0] || "50");
                  return isNaN(v) ? 50 : v;
                })()}
                onChange={(e) => {
                  const y = data.profile.bgPosition?.split(' ')[1] || "50%";
                  update(p => ({...p, profile: {...p.profile, bgPosition: `${e.target.value}% ${y}`}}));
                }}
              />
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between mb-1.5">
                <Label>Manual Y Position</Label>
                <span className="text-xs text-muted-foreground">
                  {(() => {
                    const v = parseInt(data.profile.bgPosition?.split(' ')[1] || "50");
                    return isNaN(v) ? 50 : v;
                  })()}%
                </span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                className="w-full accent-primary" 
                value={(() => {
                  const v = parseInt(data.profile.bgPosition?.split(' ')[1] || "50");
                  return isNaN(v) ? 50 : v;
                })()}
                onChange={(e) => {
                  const x = data.profile.bgPosition?.split(' ')[0] || "50%";
                  update(p => ({...p, profile: {...p.profile, bgPosition: `${x} ${e.target.value}%`}}));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <PreviewFrame data={data} />
    </div>
  );
}
