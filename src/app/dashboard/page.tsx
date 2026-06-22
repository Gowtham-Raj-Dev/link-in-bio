"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Eye,
  Link2,
  Lock,
  MousePointerClick,
  Palette,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ComingSoonBanner } from "@/components/marketing/coming-soon-banner";
import { PrivacyNotice } from "@/components/marketing/privacy-notice";
import { useAppData } from "@/hooks/use-app-data";
import { useAuth } from "@/lib/auth-context";
import { profileCompletion } from "@/lib/storage";
import { getTheme } from "@/lib/themes";
import { timeAgo } from "@/lib/utils";

export default function OverviewPage() {
  const { user } = useAuth();
  const { data, ready } = useAppData();

  if (!ready || !data) return <OverviewSkeleton />;

  const completion = profileCompletion(data);
  const theme = getTheme(data.themeId);

  const stats = [
    {
      label: "Profile Completion",
      value: `${completion}%`,
      icon: TrendingUp,
      href: "/dashboard/profile",
    },
    {
      label: "Total Links",
      value: String(data.links.length),
      icon: Link2,
      href: "/dashboard/links",
    },
    {
      label: "Theme Selected",
      value: theme.name,
      icon: Palette,
      href: "/dashboard/themes",
    },
    {
      label: "Last Updated",
      value: timeAgo(data.updatedAt),
      icon: BarChart3,
      href: "/dashboard/profile",
    },
  ];

  const future = [
    { label: "Profile Views", icon: Eye },
    { label: "Link Clicks", icon: MousePointerClick },
    { label: "Audience Growth", icon: TrendingUp },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.displayName?.split(" ")[0] ?? "creator"} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s an overview of your LinkinBio profile.
        </p>
      </div>

      {/* Completion banner */}
      {completion < 100 && (
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold">
                Your profile is {completion}% complete
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Finish setting up to make your page shine.
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="brand-gradient h-full rounded-full transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
            <Link href="/dashboard/profile">
              <Button>
                Complete profile <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight">
                {stat.value}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Future analytics */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-semibold">Analytics</h2>
          <Badge variant="soon">
            <Lock className="h-3 w-3" /> Future update
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {future.map((item) => (
            <Card key={item.label} className="relative overflow-hidden p-5">
              <div className="pointer-events-none select-none blur-[2px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight">— — —</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-card/40">
                <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Coming soon
                </span>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Analytics available in future update
        </p>
      </div>

      <ComingSoonBanner />
      <PrivacyNotice compact />
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="h-8 w-64 rounded-lg skeleton" />
      <div className="h-28 rounded-2xl skeleton" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl skeleton" />
        ))}
      </div>
    </div>
  );
}
