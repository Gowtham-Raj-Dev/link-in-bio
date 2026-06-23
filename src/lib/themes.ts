/** Visual themes for the public profile page.
 *  Values are concrete CSS so they can be applied as inline styles. */

export interface Theme {
  id: string;
  name: string;
  description: string;
  /** Page background (any CSS background value, e.g. a gradient). */
  background: string;
  /** Primary text color. */
  text: string;
  /** Secondary / muted text color. */
  muted: string;
  /** Link button background. */
  buttonBg: string;
  /** Link button text color. */
  buttonText: string;
  /** Link button border. */
  buttonBorder: string;
  /** Whether the button has a glass/blur effect. */
  glass?: boolean;
  /** Accent color used for small details. */
  accent: string;
}

export const THEMES: Theme[] = [
  {
    id: "midnight",
    name: "Midnight",
    description: "Deep indigo gradient for a calm, premium night look.",
    background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
    text: "#f8fafc",
    muted: "#a5b4fc",
    buttonBg: "rgba(255,255,255,0.08)",
    buttonText: "#f8fafc",
    buttonBorder: "1px solid rgba(255,255,255,0.14)",
    glass: true,
    accent: "#818cf8",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Cool blues and teals like a clear coastline.",
    background: "linear-gradient(160deg, #0ea5e9 0%, #0369a1 55%, #0c4a6e 100%)",
    text: "#f0f9ff",
    muted: "#bae6fd",
    buttonBg: "rgba(255,255,255,0.14)",
    buttonText: "#f0f9ff",
    buttonBorder: "1px solid rgba(255,255,255,0.22)",
    glass: true,
    accent: "#7dd3fc",
  },
  {
    id: "neon",
    name: "Neon",
    description: "Electric pink and cyan for a bold, club-ready vibe.",
    background: "linear-gradient(160deg, #18181b 0%, #2e1065 50%, #581c87 100%)",
    text: "#fdf4ff",
    muted: "#f0abfc",
    buttonBg: "rgba(217,70,239,0.16)",
    buttonText: "#fdf4ff",
    buttonBorder: "1px solid rgba(232,121,249,0.5)",
    glass: true,
    accent: "#e879f9",
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm orange to magenta, like golden hour.",
    background: "linear-gradient(160deg, #f97316 0%, #db2777 60%, #7c3aed 100%)",
    text: "#fff7ed",
    muted: "#fed7aa",
    buttonBg: "rgba(255,255,255,0.16)",
    buttonText: "#fff7ed",
    buttonBorder: "1px solid rgba(255,255,255,0.28)",
    glass: true,
    accent: "#fdba74",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Soft greens and violets like northern lights.",
    background:
      "linear-gradient(160deg, #042f2e 0%, #134e4a 40%, #4c1d95 100%)",
    text: "#ecfdf5",
    muted: "#99f6e4",
    buttonBg: "rgba(255,255,255,0.1)",
    buttonText: "#ecfdf5",
    buttonBorder: "1px solid rgba(45,212,191,0.4)",
    glass: true,
    accent: "#5eead4",
  },
  {
    id: "forest",
    name: "Forest",
    description: "Grounded greens for a natural, earthy feel.",
    background: "linear-gradient(160deg, #14532d 0%, #166534 55%, #052e16 100%)",
    text: "#f0fdf4",
    muted: "#bbf7d0",
    buttonBg: "rgba(255,255,255,0.1)",
    buttonText: "#f0fdf4",
    buttonBorder: "1px solid rgba(255,255,255,0.16)",
    glass: true,
    accent: "#86efac",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean light background with crisp dark buttons.",
    background: "#f8fafc",
    text: "#0f172a",
    muted: "#64748b",
    buttonBg: "#0f172a",
    buttonText: "#f8fafc",
    buttonBorder: "1px solid #0f172a",
    accent: "#0f172a",
  },
  {
    id: "pure-white",
    name: "Pure White",
    description: "Absolute white canvas with high contrast.",
    background: "#ffffff",
    text: "#000000",
    muted: "#52525b",
    buttonBg: "#000000",
    buttonText: "#ffffff",
    buttonBorder: "1px solid #000000",
    accent: "#000000",
  },
  {
    id: "glass",
    name: "Glass",
    description: "Frosted glassmorphism over a soft gradient.",
    background:
      "linear-gradient(160deg, #e0e7ff 0%, #f5d0fe 50%, #cffafe 100%)",
    text: "#1e293b",
    muted: "#475569",
    buttonBg: "rgba(255,255,255,0.45)",
    buttonText: "#1e293b",
    buttonBorder: "1px solid rgba(255,255,255,0.7)",
    glass: true,
    accent: "#6366f1",
  },
  {
    id: "premium-black",
    name: "Premium Black",
    description: "Pure black luxury with subtle silver edges.",
    background: "linear-gradient(160deg, #000000 0%, #111111 100%)",
    text: "#fafafa",
    muted: "#a1a1aa",
    buttonBg: "rgba(255,255,255,0.06)",
    buttonText: "#fafafa",
    buttonBorder: "1px solid rgba(255,255,255,0.18)",
    glass: true,
    accent: "#e4e4e7",
  },
  {
    id: "creator-gold",
    name: "Creator Gold",
    description: "Black canvas with rich gold accents for creators.",
    background: "linear-gradient(160deg, #1c1917 0%, #292524 100%)",
    text: "#fffbeb",
    muted: "#fcd34d",
    buttonBg: "linear-gradient(90deg, rgba(245,158,11,0.18), rgba(217,119,6,0.18))",
    buttonText: "#fffbeb",
    buttonBorder: "1px solid rgba(245,158,11,0.55)",
    glass: true,
    accent: "#f59e0b",
  },
];

export const DEFAULT_THEME_ID = "midnight";

export function getTheme(id: string | undefined): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
