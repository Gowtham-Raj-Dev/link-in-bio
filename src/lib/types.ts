/** Core data model. Everything here is persisted to the browser's
 *  localStorage only — nothing is sent to a server (MVP rule). */

export interface ProfileData {
  avatar: string; // data URL or remote URL
  displayName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  customBg?: string; // CSS color, gradient, or image URL
  customColor?: string; // CSS text color
  fontFamily?: string; // e.g. "Inter", "Playfair Display"
  backgroundStyle?: "solid" | "bubbles" | "dots" | "waves"; // Custom background pattern/effect
  bgOpacity?: number; // Background dimming (overlay opacity 0-100)
  bgBlur?: number; // Background blur (0-20px)
  bgPosition?: string; // Background image alignment (e.g. '50% 50%')
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string; // lucide icon name
  animation?: "none" | "pulse" | "bounce" | "wobble";
  type?: "link" | "header"; // If header, url/icon are ignored
}

export type SocialPlatform =
  | "instagram"
  | "youtube"
  | "facebook"
  | "linkedin"
  | "github"
  | "threads"
  | "tiktok"
  | "x";

export type SocialLinks = Partial<Record<SocialPlatform, string>>;

export interface UserSettings {
  showPrivacyBadge: boolean;
  showSocialIcons: boolean;
  openLinksInNewTab: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

/** The full bag of data stored per authenticated user. */
export interface AppData {
  profile: ProfileData;
  links: LinkItem[];
  socials: SocialLinks;
  themeId: string;
  settings: UserSettings;
  updatedAt: string;
}
