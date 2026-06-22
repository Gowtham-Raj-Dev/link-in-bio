import type { SocialPlatform } from "./types";

export const BRAND = {
  name: "LinkinBio",
  tagline: "One Link. Unlimited Possibilities.",
  developedBy: "CodeLove.in",
  founder: "Gowtham",
  url: "https://linkinbio.codelove.in",
  description:
    "Create a beautiful bio page for Instagram, YouTube, TikTok, LinkedIn and more. Share everything from one smart link.",
};

export const PRIVACY_NOTICE =
  "We believe your data belongs to you. Currently LinkinBio stores your profile information only inside your browser using local storage. We do not store your links, profile content, analytics, or personal data on our servers. Google Sign-In is used only to identify your account and provide a personalized experience.";

export const COMING_SOON = [
  "Cloud Sync",
  "Custom Domains",
  "Live Analytics",
  "Team Accounts",
  "Premium Themes",
  "Advanced Branding",
  "Monetization Tools",
  "Pricing Plans",
];

export const FEATURES = [
  {
    icon: "Link2",
    title: "Unlimited Links",
    description:
      "Add as many links as you want. Showcase every project, profile, and product without limits.",
  },
  {
    icon: "Palette",
    title: "Beautiful Themes",
    description:
      "Ten hand-crafted themes from minimal to neon. Switch looks instantly with a live preview.",
  },
  {
    icon: "Smartphone",
    title: "Mobile Optimized",
    description:
      "Your page looks stunning on every device, with a layout designed mobile-first.",
  },
  {
    icon: "ShieldCheck",
    title: "Google Sign-In",
    description:
      "Secure one-tap login with Google. No passwords to remember, no friction.",
  },
  {
    icon: "Zap",
    title: "Fast Performance",
    description:
      "Built on Next.js for instant loads. Your audience never waits around.",
  },
  {
    icon: "BarChart3",
    title: "Future Analytics",
    description:
      "Profile views, link clicks and audience growth insights are on the roadmap.",
  },
];

export const WHY_POINTS = [
  "Easier than building a website",
  "Faster than traditional portfolio tools",
  "Mobile-first experience",
  "Share everything from one link",
  "Built for creators, developers, freelancers, and businesses",
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Login with Google",
    description: "Sign in securely in one tap. No passwords, no waiting.",
    icon: "LogIn",
  },
  {
    step: 2,
    title: "Customize Your Profile",
    description: "Add your photo, name, bio and pick a theme that fits you.",
    icon: "UserCircle",
  },
  {
    step: 3,
    title: "Add Your Links",
    description: "Drop in every link that matters and reorder with a drag.",
    icon: "ListPlus",
  },
  {
    step: 4,
    title: "Share Anywhere",
    description: "Put one link in every bio and send people everywhere.",
    icon: "Share2",
  },
];

export const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Local Profile Builder",
    description:
      "Build your page entirely in your browser. Fast, private, and free.",
    status: "live" as const,
  },
  {
    phase: "Phase 2",
    title: "Cloud Storage",
    description: "Securely sync your profile across all of your devices.",
    status: "soon" as const,
  },
  {
    phase: "Phase 3",
    title: "Analytics Dashboard",
    description: "Track views, clicks and audience growth in real time.",
    status: "soon" as const,
  },
  {
    phase: "Phase 4",
    title: "Custom Domains",
    description: "Connect your own domain for a fully branded presence.",
    status: "soon" as const,
  },
  {
    phase: "Phase 5",
    title: "Premium Features",
    description: "Monetization tools, team accounts and advanced branding.",
    status: "soon" as const,
  },
];

export const FAQS = [
  {
    question: "Is LinkinBio free?",
    answer: "Yes. All current features are free.",
  },
  {
    question: "Do you store my profile?",
    answer: "No. Everything is stored locally in your browser.",
  },
  {
    question: "Why Google Login?",
    answer:
      "To uniquely identify users and provide a personalized experience.",
  },
  {
    question: "Will cloud sync be available?",
    answer: "Yes. It is part of our future roadmap.",
  },
  {
    question: "Will analytics be available?",
    answer: "Yes. Advanced analytics are coming soon.",
  },
];

export interface SocialMeta {
  key: SocialPlatform;
  label: string;
  icon: string; // lucide icon name
  placeholder: string;
  color: string;
}

export const SOCIAL_PLATFORMS: SocialMeta[] = [
  {
    key: "instagram",
    label: "Instagram",
    icon: "Instagram",
    placeholder: "https://instagram.com/yourhandle",
    color: "#E1306C",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: "Youtube",
    placeholder: "https://youtube.com/@yourchannel",
    color: "#FF0000",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: "Facebook",
    placeholder: "https://facebook.com/yourpage",
    color: "#1877F2",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: "Linkedin",
    placeholder: "https://linkedin.com/in/yourname",
    color: "#0A66C2",
  },
  {
    key: "github",
    label: "GitHub",
    icon: "Github",
    placeholder: "https://github.com/yourname",
    color: "#181717",
  },
  {
    key: "threads",
    label: "Threads",
    icon: "AtSign",
    placeholder: "https://threads.net/@yourhandle",
    color: "#000000",
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: "Music2",
    placeholder: "https://tiktok.com/@yourhandle",
    color: "#010101",
  },
  {
    key: "x",
    label: "X",
    icon: "Twitter",
    placeholder: "https://x.com/yourhandle",
    color: "#000000",
  },
];

/** Lucide icon options offered when adding a link. */
export const LINK_ICONS = [
  "Link2",
  "Globe",
  "Mail",
  "ShoppingBag",
  "Music",
  "Video",
  "FileText",
  "Camera",
  "Briefcase",
  "Calendar",
  "Heart",
  "Star",
  "Rss",
  "Gift",
  "Coffee",
  "BookOpen",
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Privacy", href: "/privacy" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "FAQ", href: "/#faq" },
];
