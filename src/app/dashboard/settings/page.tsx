"use client";

import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Modal } from "@/components/ui/modal";
import { PrivacyNotice } from "@/components/marketing/privacy-notice";
import { useAppData } from "@/hooks/use-app-data";
import { useAuth } from "@/lib/auth-context";
import { clearData, exportData } from "@/lib/storage";
import type { UserSettings } from "@/lib/types";

const TOGGLES: { key: keyof UserSettings; label: string; desc: string }[] = [
  {
    key: "showSocialIcons",
    label: "Show social icons",
    desc: "Display social media icons at the top of your page.",
  },
  {
    key: "showPrivacyBadge",
    label: "Show privacy badge",
    desc: "Display a “data stored locally” badge on your public page.",
  },
  {
    key: "openLinksInNewTab",
    label: "Open links in new tab",
    desc: "Visitors' clicks open in a new browser tab.",
  },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { data, ready, update } = useAppData();
  const [confirmClear, setConfirmClear] = useState(false);

  if (!ready || !data) return <div className="h-96 rounded-2xl skeleton" />;

  const toggle = (key: keyof UserSettings) =>
    update((prev) => ({
      ...prev,
      settings: { ...prev.settings, [key]: !prev.settings[key] },
    }));

  const handleExport = () => {
    if (!user) return;
    const blob = new Blob([exportData(user.uid)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "linkinbio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (!user) return;
    clearData(user.uid);
    setConfirmClear(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your preferences and data.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {TOGGLES.map((t) => (
            <div
              key={t.key}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <Switch
                checked={Boolean(data.settings[t.key])}
                onCheckedChange={() => toggle(t.key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Row label="Name" value={user?.displayName ?? "—"} />
          <Row label="Email" value={user?.email ?? "—"} />
          <Row label="User ID" value={user?.uid ?? "—"} mono />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PrivacyNotice compact />
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" /> Export data (JSON)
            </Button>
            <Button variant="danger" onClick={() => setConfirmClear(true)}>
              <Trash2 className="h-4 w-4" /> Clear all data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Modal
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        title="Clear all data?"
        description="This permanently removes your profile, links, socials and theme from this browser. This cannot be undone."
      >
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setConfirmClear(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClear}>
            Yes, clear everything
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`max-w-[60%] truncate text-sm font-medium ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
