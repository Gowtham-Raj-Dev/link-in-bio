"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Mode = "light" | "dark";

interface ThemeContextValue {
  mode: Mode;
  toggle: () => void;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "linkinbio:color-mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Mode | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial: Mode = stored ?? (prefersDark ? "dark" : "light");
    setModeState(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.style.colorScheme = mode;
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const setMode = useCallback((next: Mode) => setModeState(next), []);
  const toggle = useCallback(
    () => setModeState((m) => (m === "dark" ? "light" : "dark")),
    []
  );

  return (
    <ThemeContext.Provider value={{ mode, toggle, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useColorMode must be used within ThemeProvider");
  return ctx;
}
