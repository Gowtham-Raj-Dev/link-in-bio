import type { AppData } from "./types";

/** Sample profile powering the public "View Demo" link. */
export const DEMO_USERNAME = "ariacreates";

export const DEMO_DATA: AppData = {
  profile: {
    avatar: "",
    displayName: "Aria Rivera",
    username: "ariacreates",
    bio: "Filmmaker & creator. Sharing my gear, presets and stories ✨",
    location: "Lisbon, Portugal",
    website: "ariarivera.com",
  },
  links: [
    { id: "d1", title: "🎬 Watch my latest video", url: "https://youtube.com", icon: "Video" },
    { id: "d2", title: "🛍️ Shop my presets", url: "https://example.com/shop", icon: "ShoppingBag" },
    { id: "d3", title: "📬 Join my newsletter", url: "https://example.com/news", icon: "Mail" },
    { id: "d4", title: "🎙️ Listen to the podcast", url: "https://example.com/podcast", icon: "Music" },
    { id: "d5", title: "📸 Book a photoshoot", url: "https://example.com/book", icon: "Camera" },
  ],
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    x: "https://x.com",
    github: "https://github.com",
  },
  themeId: "premium-black",
  settings: {
    showPrivacyBadge: true,
    showSocialIcons: true,
    openLinksInNewTab: true,
  },
  updatedAt: new Date().toISOString(),
};
