"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function UserMenu() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2 rounded-full border border-border bg-card p-0.5 pr-3 transition-colors hover:bg-muted"
    >
      <Avatar user={user} />
      <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
        {user.displayName?.split(" ")[0] ?? "My Profile"}
      </span>
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
