/** Visual themes (templates) for the public profile page.
 *  Values are concrete CSS so they can be applied as inline styles.
 *
 *  A theme is more than colours: it also picks a page layout, the button
 *  shape and shadow, and a font, so every template looks clearly different. */

/** center: classic centred stack. cover: colour banner with the photo
 *  overlapping it. card: everything sits in one floating panel. */
export type ThemeLayout = "center" | "cover" | "card";
export type ButtonShape = "pill" | "rounded" | "square";

export interface Theme {
  id: string;
  name: string;
  description: string;
  /** Short label shown on the theme picker ("Dark", "Light", "New"...). */
  tag: string;
  layout: ThemeLayout;
  /** Page background (any CSS background value, e.g. a gradient). */
  background: string;
  /** Optional texture laid over the background (CSS background-image). */
  pattern?: string;
  /** Banner background for the cover layout. */
  cover?: string;
  /** Panel background for the card layout. */
  card?: string;
  cardBorder?: string;
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
  /** Link button box-shadow. */
  buttonShadow?: string;
  /** Background of the small icon tile inside each button. */
  iconBg: string;
  shape: ButtonShape;
  /** Whether the button has a glass/blur effect. */
  glass?: boolean;
  /** Accent color used for small details. */
  accent: string;
  /** Ring drawn around the profile photo. */
  avatarRing: string;
  /** CSS font-family. Fonts outside the system stack are loaded on demand. */
  font: string;
  /** Font for the name. Falls back to `font`. */
  headingFont?: string;
}

const SANS = "'Outfit', ui-sans-serif, system-ui, sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";
const GROTESK = "'Space Grotesk', ui-sans-serif, system-ui, sans-serif";
const MONO = "'Roboto Mono', ui-monospace, monospace";

export const THEMES: Theme[] = [
  {
    id: "midnight",
    name: "Midnight",
    description: "Frosted card floating on a deep indigo glow.",
    tag: "Dark",
    layout: "card",
    background:
      "radial-gradient(80% 60% at 15% 0%, #4338ca 0%, transparent 60%), radial-gradient(70% 55% at 100% 100%, #7c3aed 0%, transparent 60%), #0b1026",
    card: "rgba(15,23,42,0.55)",
    cardBorder: "1px solid rgba(255,255,255,0.10)",
    text: "#f8fafc",
    muted: "#a5b4fc",
    buttonBg: "rgba(255,255,255,0.07)",
    buttonText: "#f8fafc",
    buttonBorder: "1px solid rgba(255,255,255,0.12)",
    iconBg: "rgba(129,140,248,0.22)",
    shape: "rounded",
    glass: true,
    accent: "#818cf8",
    avatarRing: "0 0 0 3px rgba(129,140,248,0.55)",
    font: SANS,
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Bright blue banner over a clean, airy page.",
    tag: "Light",
    layout: "cover",
    background: "#f0f7ff",
    cover: "linear-gradient(120deg, #0ea5e9 0%, #2563eb 55%, #1e3a8a 100%)",
    text: "#0c1d3a",
    muted: "#4b6a93",
    buttonBg: "#ffffff",
    buttonText: "#0c1d3a",
    buttonBorder: "1px solid #dbe8f7",
    buttonShadow: "0 1px 2px rgba(12,29,58,0.06), 0 8px 20px -12px rgba(37,99,235,0.35)",
    iconBg: "#e0efff",
    shape: "rounded",
    accent: "#2563eb",
    avatarRing: "0 0 0 4px #f0f7ff",
    font: SANS,
  },
  {
    id: "neon",
    name: "Neon",
    description: "Glowing pink outlines on a near-black stage.",
    tag: "Dark",
    layout: "center",
    background:
      "radial-gradient(60% 40% at 50% 0%, rgba(217,70,239,0.35), transparent 70%), radial-gradient(50% 40% at 100% 100%, rgba(34,211,238,0.22), transparent 70%), #07060d",
    text: "#fdf4ff",
    muted: "#f0abfc",
    buttonBg: "rgba(10,8,20,0.6)",
    buttonText: "#fdf4ff",
    buttonBorder: "1px solid rgba(232,121,249,0.75)",
    buttonShadow: "0 0 22px -6px rgba(232,121,249,0.8), inset 0 0 14px -8px rgba(232,121,249,0.9)",
    iconBg: "rgba(232,121,249,0.18)",
    shape: "pill",
    glass: true,
    accent: "#e879f9",
    avatarRing: "0 0 0 2px #e879f9, 0 0 28px -4px #e879f9",
    font: GROTESK,
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Golden-hour banner with warm, soft cards.",
    tag: "Light",
    layout: "cover",
    background: "#fff7f0",
    cover: "linear-gradient(120deg, #fb923c 0%, #f43f5e 55%, #a21caf 100%)",
    text: "#3b0d0c",
    muted: "#9a4a3a",
    buttonBg: "#ffffff",
    buttonText: "#3b0d0c",
    buttonBorder: "1px solid #fde0d0",
    buttonShadow: "0 10px 24px -14px rgba(244,63,94,0.45)",
    iconBg: "#ffe8dc",
    shape: "pill",
    accent: "#f43f5e",
    avatarRing: "0 0 0 4px #fff7f0",
    font: SANS,
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Glass panel over drifting green and violet light.",
    tag: "Dark",
    layout: "card",
    background:
      "radial-gradient(70% 50% at 0% 10%, rgba(45,212,191,0.55), transparent 65%), radial-gradient(70% 55% at 100% 60%, rgba(139,92,246,0.55), transparent 65%), #041614",
    card: "rgba(4,22,20,0.45)",
    cardBorder: "1px solid rgba(153,246,228,0.18)",
    text: "#ecfdf5",
    muted: "#99f6e4",
    buttonBg: "rgba(255,255,255,0.08)",
    buttonText: "#ecfdf5",
    buttonBorder: "1px solid rgba(153,246,228,0.22)",
    iconBg: "rgba(45,212,191,0.22)",
    shape: "pill",
    glass: true,
    accent: "#5eead4",
    avatarRing: "0 0 0 3px rgba(94,234,212,0.55)",
    font: SANS,
  },
  {
    id: "forest",
    name: "Botanical",
    description: "Sage page, deep green buttons and an elegant serif.",
    tag: "Light",
    layout: "center",
    background: "linear-gradient(180deg, #eef2e6 0%, #e2e9d6 100%)",
    text: "#1f3a2a",
    muted: "#5b7663",
    buttonBg: "#2f5d3a",
    buttonText: "#f3f7ee",
    buttonBorder: "1px solid #2f5d3a",
    buttonShadow: "0 10px 22px -14px rgba(31,58,42,0.7)",
    iconBg: "rgba(243,247,238,0.16)",
    shape: "pill",
    accent: "#2f5d3a",
    avatarRing: "0 0 0 3px #eef2e6, 0 0 0 5px #2f5d3a",
    font: SANS,
    headingFont: SERIF,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Quiet off-white page with crisp white cards.",
    tag: "Light",
    layout: "center",
    background: "#fafafa",
    text: "#111111",
    muted: "#6b6b6b",
    buttonBg: "#ffffff",
    buttonText: "#111111",
    buttonBorder: "1px solid #e7e7e7",
    buttonShadow: "0 1px 2px rgba(0,0,0,0.04)",
    iconBg: "#f2f2f2",
    shape: "rounded",
    accent: "#111111",
    avatarRing: "0 0 0 1px #e7e7e7",
    font: SANS,
  },
  {
    id: "pure-white",
    name: "Classic",
    description: "White canvas with bold black pill buttons.",
    tag: "Light",
    layout: "center",
    background: "#ffffff",
    text: "#000000",
    muted: "#52525b",
    buttonBg: "#000000",
    buttonText: "#ffffff",
    buttonBorder: "1px solid #000000",
    iconBg: "rgba(255,255,255,0.14)",
    shape: "pill",
    accent: "#000000",
    avatarRing: "0 0 0 3px #ffffff, 0 0 0 4px #000000",
    font: SANS,
  },
  {
    id: "glass",
    name: "Glass",
    description: "Frosted glass card over a soft pastel blur.",
    tag: "Light",
    layout: "card",
    background:
      "radial-gradient(60% 50% at 0% 0%, #c7d2fe, transparent 70%), radial-gradient(60% 50% at 100% 30%, #f5d0fe, transparent 70%), radial-gradient(70% 50% at 50% 100%, #a5f3fc, transparent 70%), #f8fafc",
    card: "rgba(255,255,255,0.45)",
    cardBorder: "1px solid rgba(255,255,255,0.8)",
    text: "#1e293b",
    muted: "#55657d",
    buttonBg: "rgba(255,255,255,0.6)",
    buttonText: "#1e293b",
    buttonBorder: "1px solid rgba(255,255,255,0.9)",
    buttonShadow: "0 8px 20px -14px rgba(99,102,241,0.45)",
    iconBg: "rgba(99,102,241,0.12)",
    shape: "rounded",
    glass: true,
    accent: "#6366f1",
    avatarRing: "0 0 0 3px rgba(255,255,255,0.9)",
    font: SANS,
  },
  {
    id: "premium-black",
    name: "Premium Black",
    description: "True black with a soft spotlight and silver edges.",
    tag: "Dark",
    layout: "center",
    background: "radial-gradient(70% 45% at 50% 0%, #26262b 0%, #000000 70%)",
    text: "#fafafa",
    muted: "#a1a1aa",
    buttonBg: "#0f0f11",
    buttonText: "#fafafa",
    buttonBorder: "1px solid #27272a",
    buttonShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
    iconBg: "#1c1c1f",
    shape: "rounded",
    accent: "#e4e4e7",
    avatarRing: "0 0 0 1px #3f3f46, 0 0 0 5px #000000, 0 0 0 6px #27272a",
    font: SANS,
  },
  {
    id: "creator-gold",
    name: "Creator Gold",
    description: "Warm black with gold edges and a serif headline.",
    tag: "Dark",
    layout: "center",
    background: "radial-gradient(70% 45% at 50% 0%, #3a2a12 0%, #0c0a09 70%)",
    text: "#fffbeb",
    muted: "#e7c66b",
    buttonBg: "linear-gradient(180deg, rgba(245,158,11,0.10), rgba(245,158,11,0.03))",
    buttonText: "#fffbeb",
    buttonBorder: "1px solid rgba(245,180,60,0.55)",
    iconBg: "rgba(245,158,11,0.18)",
    shape: "square",
    accent: "#f5b43c",
    avatarRing: "0 0 0 2px #0c0a09, 0 0 0 3px #f5b43c",
    font: SANS,
    headingFont: SERIF,
  },
  {
    id: "pop",
    name: "Pop",
    description: "Sunny yellow, thick outlines and hard shadows.",
    tag: "New",
    layout: "center",
    background: "#ffe14d",
    pattern: "radial-gradient(rgba(0,0,0,0.13) 1px, transparent 1.2px)",
    text: "#111111",
    muted: "#3d3d3d",
    buttonBg: "#ffffff",
    buttonText: "#111111",
    buttonBorder: "2px solid #111111",
    buttonShadow: "4px 4px 0 #111111",
    iconBg: "#ffe14d",
    shape: "rounded",
    accent: "#111111",
    avatarRing: "0 0 0 2px #111111, 4px 4px 0 2px #111111",
    font: GROTESK,
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Cream paper, fine lines and a magazine serif.",
    tag: "New",
    layout: "center",
    background: "#f4efe6",
    text: "#1c1917",
    muted: "#78716c",
    buttonBg: "transparent",
    buttonText: "#1c1917",
    buttonBorder: "1px solid #1c1917",
    iconBg: "transparent",
    shape: "square",
    accent: "#9a3412",
    avatarRing: "0 0 0 1px #1c1917, 0 0 0 5px #f4efe6, 0 0 0 6px #1c1917",
    font: SANS,
    headingFont: SERIF,
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "Developer dark mode with mono type and green accents.",
    tag: "New",
    layout: "center",
    background: "#0d1117",
    pattern:
      "linear-gradient(rgba(63,185,80,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(63,185,80,0.06) 1px, transparent 1px)",
    text: "#e6edf3",
    muted: "#3fb950",
    buttonBg: "#161b22",
    buttonText: "#e6edf3",
    buttonBorder: "1px solid #30363d",
    iconBg: "rgba(63,185,80,0.14)",
    shape: "square",
    accent: "#3fb950",
    avatarRing: "0 0 0 2px #3fb950",
    font: MONO,
  },
  {
    id: "candy",
    name: "Candy",
    description: "Pastel pink and lilac with bubbly pill buttons.",
    tag: "New",
    layout: "cover",
    background: "linear-gradient(180deg, #fff1f7 0%, #f5edff 100%)",
    cover: "linear-gradient(120deg, #f9a8d4 0%, #c4b5fd 60%, #a5b4fc 100%)",
    text: "#4a1d3f",
    muted: "#9d5a8a",
    buttonBg: "#ffffff",
    buttonText: "#4a1d3f",
    buttonBorder: "1px solid #fbd5e8",
    buttonShadow: "0 10px 22px -14px rgba(219,39,119,0.5)",
    iconBg: "#fde7f3",
    shape: "pill",
    accent: "#db2777",
    avatarRing: "0 0 0 4px #fff1f7",
    font: SANS,
  },
];

export const DEFAULT_THEME_ID = "midnight";

export function getTheme(id: string | undefined): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/** Corner radius for each button shape. */
export const SHAPE_RADIUS: Record<ButtonShape, string> = {
  pill: "9999px",
  rounded: "16px",
  square: "6px",
};

/** Fonts the themes (and the profile font picker) can use. Loaded only on
 *  pages that need one, so other pages skip the render-blocking stylesheet. */
export const PROFILE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&family=Roboto+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap";
