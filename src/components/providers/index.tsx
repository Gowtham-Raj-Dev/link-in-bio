"use client";

import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { AuthModalProvider } from "@/components/auth/auth-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthModalProvider>{children}</AuthModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
