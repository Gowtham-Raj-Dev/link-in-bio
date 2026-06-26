"use client";

import { useState } from "react";
import { Check, Image as ImageIcon, Palette as PaletteIcon, Upload, Trash2 } from "lucide-react";
import { Input, Label } from "@/components/ui/input";
import { PreviewFrame } from "@/components/profile/preview-frame";
import { useAppData } from "@/hooks/use-app-data";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

const IMAGE_BACKGROUNDS = [
  { id: "img-1", name: "Abstract Fluid", url: "/bg-images/bg-1.webp" },
  { id: "img-2", name: "Deep Space", url: "/bg-images/bg-2.jpg" },
  { id: "img-3", name: "Misty Forest", url: "/bg-images/bg-3.avif" },
  { id: "img-4", name: "Mesh Gradient", url: "/bg-images/bg-4.jpg" },
  { id: "img-5", name: "Cyberpunk City", url: "/bg-images/bg-5.jpg" },
  { id: "img-6", name: "Clean Minimal", url: "/bg-images/bg-6.jpg" },
  { id: "img-7", name: "Aurora", url: "/bg-images/bg-7.jpg" },
  { id: "img-8", name: "Neon Lines", url: "/bg-images/bg-8.jpg" },
  { id: "img-9", name: "Dark Texture", url: "/bg-images/bg-9.webp" },
  { id: "img-10", name: "Liquid Color", url: "/bg-images/bg-10.jpg" },
];

export default function ThemesPage() {
  const { data, ready, update } = useAppData();
  const [activeTab, setActiveTab] = useState<"colors" | "images" | "my_images">("colors");

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1080;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        update(p => {
          const prevImgs = p.profile.uploadedBgImages || [];
          // Put the new image at the start, keep up to 5 total
          const newImgs = [dataUrl, ...prevImgs].slice(0, 5);
          return {
            ...p,
            profile: {
              ...p.profile,
              uploadedBgImages: newImgs,
              customBg: `url('${dataUrl}')`,
              backgroundStyle: "solid",
              customColor: "#ffffff"
            }
          };
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const deleteUploadedImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    update(p => {
      const imgs = [...(p.profile.uploadedBgImages || [])];
      const removed = imgs.splice(index, 1)[0];
      const newProfile = { ...p.profile, uploadedBgImages: imgs };
      
      // If deleted image was active, switch to another upload or none
      if (newProfile.customBg?.includes(removed)) {
        newProfile.customBg = imgs.length > 0 ? `url('${imgs[0]}')` : "";
      }
      return { ...p, profile: newProfile };
    });
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
          
          <div className="grid w-full grid-cols-3 rounded-lg bg-muted p-1 sm:w-auto">
            <button 
              onClick={() => setActiveTab("colors")}
              className={cn("flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all sm:gap-2 sm:text-sm", activeTab === "colors" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50")}
            >
              <PaletteIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> <span className="truncate">Colors</span>
            </button>
            <button 
              onClick={() => setActiveTab("images")}
              className={cn("flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all sm:gap-2 sm:text-sm", activeTab === "images" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50")}
            >
              <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> <span className="truncate">Images</span>
            </button>
            <button 
              onClick={() => setActiveTab("my_images")}
              className={cn("flex cursor-pointer items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all sm:gap-2 sm:text-sm", activeTab === "my_images" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50")}
            >
              <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> <span className="truncate">My Images</span>
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
                    "group relative cursor-pointer overflow-hidden rounded-2xl border-2 text-left transition-all",
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
          ) : activeTab === "my_images" ? (
            <>
              {(!data.profile.uploadedBgImages || data.profile.uploadedBgImages.length < 5) && (
                <label className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-border text-left transition-all hover:border-primary/50 hover:bg-muted/50">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="flex h-32 flex-col items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary">
                      <Upload className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                      Upload New Image
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-card px-3 py-2.5 border-t border-border/50">
                    <span className="text-sm font-medium">
                      {(data.profile.uploadedBgImages?.length || 0)} / 5 Uploads
                    </span>
                  </div>
                </label>
              )}

              {data.profile.uploadedBgImages?.map((imgUrl, idx) => {
                const isActive = data.profile.customBg?.includes(imgUrl);
                return (
                  <div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    onClick={() => selectImage(imgUrl)}
                    className={cn(
                      "group relative cursor-pointer overflow-hidden rounded-2xl border-2 text-left transition-all",
                      isActive
                        ? "border-primary shadow-lg shadow-primary/20"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <div
                      className="h-32 bg-cover bg-center"
                      style={{ backgroundImage: `url('${imgUrl}')` }}
                    />
                    <button
                      onClick={(e) => deleteUploadedImage(e, idx)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-all hover:bg-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center justify-between bg-card px-3 py-2.5">
                      <span className="text-sm font-medium">Upload {idx + 1}</span>
                      {isActive && (
                        <span className="brand-gradient flex h-5 w-5 items-center justify-center rounded-full">
                          <Check className="h-3 w-3 text-white" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            IMAGE_BACKGROUNDS.map((img) => {
                const isActiveImage = data.profile.customBg?.includes(img.url);
                return (
                  <button
                    key={img.id}
                    onClick={() => selectImage(img.url)}
                    className={cn(
                      "group relative cursor-pointer overflow-hidden rounded-2xl border-2 text-left transition-all",
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

        {(activeTab === "images" || activeTab === "my_images") && (
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <h2 className="font-semibold tracking-tight">Image Adjustments</h2>
            
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between mb-1.5">
                  <Label>Background Dimming</Label>
                  <span className="text-xs text-muted-foreground">{data.profile.bgOpacity || 0}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  className="w-full cursor-pointer accent-primary" 
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
                  className="w-full cursor-pointer accent-primary" 
                  value={data.profile.bgBlur || 0}
                  onChange={(e) => update(p => ({...p, profile: {...p.profile, bgBlur: parseInt(e.target.value)}}))}
                />
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between mb-1.5">
                  <Label>Manual X Position (Left/Right)</Label>
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
                  className="w-full cursor-pointer accent-primary" 
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
                  <Label>Manual Y Position (Up/Down)</Label>
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
                  className="w-full cursor-pointer accent-primary" 
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

              <div className="pt-2">
                <Label>Custom Text Color</Label>
                <div className="mt-1.5 flex gap-2">
                  <div className="relative shrink-0">
                    <input 
                      type="color" 
                      value={data.profile.customColor?.startsWith("#") ? data.profile.customColor.slice(0, 7) : "#ffffff"}
                      onChange={(e) => update(p => ({...p, profile: {...p.profile, customColor: e.target.value}}))}
                      className="absolute inset-0 h-9 w-12 cursor-pointer opacity-0"
                      title="Choose color"
                    />
                    <div 
                      className="flex h-9 w-12 items-center justify-center rounded-md border border-input shadow-sm"
                      style={{ background: data.profile.customColor || "#ffffff" }}
                    />
                  </div>
                  <Input 
                    placeholder="e.g. #ffffff or white" 
                    value={data.profile.customColor || ""}
                    onChange={(e) => update(p => ({...p, profile: {...p.profile, customColor: e.target.value}}))}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <PreviewFrame data={data} />
    </div>
  );
}
