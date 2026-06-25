"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, ShieldCheck, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Logo } from "@/components/brand/logo";
import { GoogleIcon } from "./google-icon";
import { PRIVACY_NOTICE } from "@/lib/constants";

type Tab = "signin" | "signup";

/** Map Firebase auth error codes to friendly messages. */
function friendlyError(err: unknown): string {
  const code =
    typeof err === "object" && err && "code" in err
      ? String((err as { code: string }).code)
      : "";
  switch (code) {
    case "auth/invalid-email":
      return "That email address looks invalid.";
    case "auth/missing-password":
      return "Please enter your password.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/email-already-in-use":
      return "An account already exists with this email. Try signing in.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled.";
    case "auth/operation-not-allowed":
      return "This sign-in method isn't enabled in Firebase yet.";
    default:
      return err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";
  }
}

interface AuthFormProps {
  redirectTo?: string;
  defaultTab?: Tab;
  /** Show the LinkinBio logo above the heading. */
  showLogo?: boolean;
  /** Called once the user is authenticated (e.g. to close a modal). */
  onAuthed?: () => void;
}

/** Shared sign-in / sign-up form. */
export function AuthForm({
  redirectTo = "/dashboard",
  defaultTab = "signin",
  showLogo = true,
  onAuthed,
}: AuthFormProps) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    configured,
    user,
  } = useAuth();
  const router = useRouter();

  // Redirect once authenticated.
  useEffect(() => {
    if (user) {
      onAuthed?.();
      router.push(redirectTo);
    }
  }, [user, redirectTo, router, onAuthed]);

  const handleGoogle = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(friendlyError(err));
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (tab === "signup") {
        await signUpWithEmail(name, email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err) {
      setError(friendlyError(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {showLogo && <Logo href="/" />}
      <h2 className="mt-5 text-2xl font-bold tracking-tight">
        {tab === "signup" ? "Create your account" : "Welcome back"}
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {tab === "signup"
          ? "Sign up to start building your bio page."
          : "Sign in to manage your bio page."}
      </p>

      {!configured && (
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-500">
          Firebase isn&apos;t configured yet. Add your keys to{" "}
          <code>.env.local</code> to enable sign-in.
        </p>
      )}

      {/* Tab switch */}
      <div className="mt-6 flex w-full rounded-xl bg-muted p-1">
        {(["signin", "signup"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setError(null);
            }}
            className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "signin" ? "Sign in" : "Sign up"}
          </button>
        ))}
      </div>

      {/* Email / password form */}
      <form
        onSubmit={handleEmailSubmit}
        className="mt-5 w-full space-y-3 text-left"
      >
        {tab === "signup" && (
          <div>
            <Label htmlFor="auth-name">Name</Label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="auth-name"
                className="pl-9"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>
          </div>
        )}
        <div>
          <Label htmlFor="auth-email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="auth-email"
              type="email"
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="auth-password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="auth-password"
              type="password"
              className="pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                tab === "signup" ? "At least 6 characters" : "••••••••"
              }
              autoComplete={
                tab === "signup" ? "new-password" : "current-password"
              }
              required
              minLength={6}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={submitting || !configured}
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : tab === "signup" ? (
            "Create account"
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-5 flex w-full items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        variant="outline"
        size="lg"
        className="w-full bg-background"
        onClick={handleGoogle}
        disabled={submitting || !configured}
      >
        <GoogleIcon className="h-5 w-5" />
        Continue with Google
      </Button>

      {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

      <div className="mt-6 flex items-start gap-2 rounded-xl bg-muted p-3 text-left">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {PRIVACY_NOTICE}
        </p>
      </div>
    </div>
  );
}
