"use client";

import { useEffect } from "react";
import { Loader2, Lock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useAuthModal } from "./auth-modal";
import { Button } from "@/components/ui/button";

/** Gate dashboard pages behind authentication. */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useAuth();
  const { openLogin } = useAuthModal();

  useEffect(() => {
    if (!loading && !user && configured) {
      openLogin("/dashboard");
    }
  }, [loading, user, configured, openLogin]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <span className="brand-gradient mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
          <Lock className="h-6 w-6 text-white" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight">Sign in required</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {configured
            ? "Please sign in with Google to access your dashboard."
            : "Firebase isn't configured yet. Add your keys to .env.local to enable sign-in."}
        </p>
        <Button
          className="mt-6"
          onClick={() => openLogin("/dashboard")}
          disabled={!configured}
        >
          Sign in with Google
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
