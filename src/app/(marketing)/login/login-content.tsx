"use client";

import { useSearchParams } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";

export function LoginContent() {
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";
  const tab = params.get("tab") === "signup" ? "signup" : "signin";
  return <AuthForm redirectTo={redirect} defaultTab={tab} showLogo={false} />;
}
