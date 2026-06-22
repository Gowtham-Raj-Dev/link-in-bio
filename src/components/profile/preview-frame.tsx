"use client";

import { Smartphone } from "lucide-react";
import { ProfileView } from "./profile-view";
import type { AppData } from "@/lib/types";

/** Sticky phone-style live preview used across dashboard editor pages. */
export function PreviewFrame({ data }: { data: AppData }) {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Smartphone className="h-4 w-4" />
        Live preview
      </div>
      <div className="mx-auto w-[300px] overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-900 shadow-2xl">
        <div className="h-[600px] overflow-y-auto no-scrollbar">
          <ProfileView data={data} preview />
        </div>
      </div>
    </div>
  );
}
