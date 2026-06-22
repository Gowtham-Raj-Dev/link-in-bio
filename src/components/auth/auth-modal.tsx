"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { GoogleIcon } from "./google-icon";
import { PRIVACY_NOTICE } from "@/lib/constants";

interface AuthModalContextValue {
  openLogin: (redirectTo?: string) => void;
  closeLogin: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(
  undefined
);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/dashboard");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { signInWithGoogle, configured, user } = useAuth();
  const router = useRouter();

  const openLogin = useCallback((target = "/dashboard") => {
    setRedirectTo(target);
    setError(null);
    setOpen(true);
  }, []);
  const closeLogin = useCallback(() => setOpen(false), []);

  // Close automatically once a user is present.
  useEffect(() => {
    if (user && open) {
      setOpen(false);
      router.push(redirectTo);
    }
  }, [user, open, redirectTo, router]);

  const handleSignIn = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sign-in failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthModalContext.Provider value={{ openLogin, closeLogin }}>
      {children}
      <Modal open={open} onClose={closeLogin} className="max-w-sm">
        <div className="flex flex-col items-center text-center">
          <Logo href={null} />
          <h2 className="mt-5 text-2xl font-bold tracking-tight">
            Welcome to LinkinBio
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to build and manage your bio page.
          </p>

          {!configured && (
            <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-500">
              Firebase isn&apos;t configured yet. Add your keys to{" "}
              <code>.env.local</code> to enable Google Sign-In.
            </p>
          )}

          <Button
            variant="outline"
            size="lg"
            className="mt-6 w-full bg-background"
            onClick={handleSignIn}
            disabled={submitting || !configured}
          >
            <GoogleIcon className="h-5 w-5" />
            {submitting ? "Signing in…" : "Continue with Google"}
          </Button>

          {error && (
            <p className="mt-3 text-xs text-red-500">{error}</p>
          )}

          <div className="mt-6 flex items-start gap-2 rounded-xl bg-muted p-3 text-left">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              {PRIVACY_NOTICE}
            </p>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            Free forever during early access
          </p>
        </div>
      </Modal>
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx)
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  return ctx;
}
