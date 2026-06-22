"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    router.push("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-border bg-card p-0.5 pr-3 transition-colors hover:bg-muted"
      >
        <Avatar user={user} />
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {user.displayName?.split(" ")[0] ?? "Account"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Avatar user={user} size={40} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user.displayName ?? "Creator"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
          <div className="p-1.5">
            <MenuLink href="/dashboard" icon={<LayoutDashboard className="h-4 w-4" />} onClick={() => setOpen(false)}>
              Dashboard
            </MenuLink>
            <MenuLink href="/dashboard/profile" icon={<UserIcon className="h-4 w-4" />} onClick={() => setOpen(false)}>
              My Profile
            </MenuLink>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
    >
      {icon}
      {children}
    </Link>
  );
}

export function Avatar({
  user,
  size = 32,
}: {
  user: { displayName?: string | null; photoURL?: string | null };
  size?: number;
}) {
  const initial = user.displayName?.charAt(0).toUpperCase() ?? "U";
  if (user.photoURL) {
    return (
      <Image
        src={user.photoURL}
        alt={user.displayName ?? "Avatar"}
        width={size}
        height={size}
        className="rounded-full object-cover"
        unoptimized
      />
    );
  }
  return (
    <span
      className="brand-gradient flex items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      {initial}
    </span>
  );
}
