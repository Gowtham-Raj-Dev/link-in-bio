"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandIcon } from "@/components/brand/brand-icon";
import { PreviewFrame } from "@/components/profile/preview-frame";
import { useAppData } from "@/hooks/use-app-data";
import { SOCIAL_PLATFORMS } from "@/lib/constants";
import type { SocialLinks } from "@/lib/types";

export default function SocialsPage() {
  const { data, ready, update } = useAppData();
  const [socials, setSocials] = useState<SocialLinks>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) setSocials(data.socials);
  }, [data]);

  if (!ready || !data) return <div className="h-96 rounded-2xl skeleton" />;

  const handleSave = () => {
    update((prev) => ({ ...prev, socials }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Social Links</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your social profiles. Icons show at the top of your page.
          </p>
        </div>

        <Card>
          <CardContent className="space-y-4 pt-6">
            {SOCIAL_PLATFORMS.map((platform) => (
              <div key={platform.key} className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ background: platform.color }}
                >
                  <BrandIcon name={platform.key} className="h-5 w-5" />
                </span>
                <Input
                  value={socials[platform.key] ?? ""}
                  onChange={(e) =>
                    setSocials((s) => ({ ...s, [platform.key]: e.target.value }))
                  }
                  placeholder={platform.placeholder}
                  aria-label={platform.label}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave}>
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : (
              "Save socials"
            )}
          </Button>
          {saved && (
            <span className="text-sm text-emerald-500">
              Saved to your browser
            </span>
          )}
        </div>
      </div>

      <PreviewFrame data={{ ...data, socials }} />
    </div>
  );
}
