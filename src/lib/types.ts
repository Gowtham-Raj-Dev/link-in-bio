/** Core data model. Everything here is persisted to the browser's
 *  localStorage only — nothing is sent to a server (MVP rule). */

export interface ProfileData {
  avatar: string; // data URL or remote URL
  displayName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string; // lucide icon name
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
