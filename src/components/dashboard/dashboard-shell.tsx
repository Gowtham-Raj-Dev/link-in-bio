"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ExternalLink,
  LayoutGrid,
  Link2,
  LogOut,
  Menu,
  Palette,
  Settings,
  Share2,
  UserCircle,
  X,
  Eye,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar } from "@/components/auth/user-menu";
import { useAuth } from "@/lib/auth-context";
import { useAppData } from "@/hooks/use-app-data";
import { Modal } from "@/components/ui/modal";
import { ProfileView } from "@/components/profile/profile-view";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  { label: "Links", href: "/dashboard/links", icon: Link2 },
  { label: "Themes", href: "/dashboard/themes", icon: Palette },
  { label: "Socials", href: "/dashboard/socials", icon: Share2 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { data } = useAppData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const username = data?.profile.username;

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "brand-gradient text-white shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-border p-3">
        {username && (
          <Link
            href={`/u/${username}`}
            target="_blank"
            className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted/70"
          >
            <ExternalLink className="h-4 w-4" />
            View public page
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
            <Avatar user={user} size={36} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.displayName}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to sign out?")) {
              signOut();
            }
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-card/50 lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border bg-card">
            <button
              className="absolute right-3 top-4 rounded-lg p-1.5 hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-semibold text-muted-foreground">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-500 transition-colors hover:bg-emerald-500/20 sm:flex">
              <BarChart3 className="h-3.5 w-3.5" />
              Live Analytics Active
            </Link>
            <button 
              className="flex items-center justify-center rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 lg:hidden"
              onClick={() => setPreviewOpen(true)}
            >
              <Eye className="mr-1.5 h-4 w-4" />
              Preview
            </button>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>

      {/* Mobile Live Preview Modal */}
      <Modal 
        open={previewOpen} 
        onClose={() => setPreviewOpen(false)} 
        className="w-[300px] max-w-[300px] mx-auto p-0 overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-950 shadow-2xl bg-black ring-1 ring-white/10"
      >
        <div className="h-[600px] max-h-[80vh] w-full overflow-y-auto no-scrollbar">
          {data && <ProfileView data={data} preview />}
        </div>
      </Modal>
    </div>
  );
}
