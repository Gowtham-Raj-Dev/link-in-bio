import type { SocialPlatform } from "./types";

export const BRAND = {
  name: "LinkinBio",
  tagline: "One Link. Unlimited Possibilities.",
  developedBy: "CodeLove.in",
  founder: "Gowtham",
  url: "https://linkinbio.codelove.in",
  /** Browser title and search result headline for the home page. */
  seoTitle: "Free Link in Bio Page Builder for Instagram | LinkinBio by CodeLove",
  description:
    "Create a free link in bio page in minutes. Add unlimited links, pick a theme, share one link on Instagram, YouTube and WhatsApp, and track every click.",
};

export const CONTACT_EMAIL = "support@codelove.in";

/** The CodeLove network: the main hub plus the sister tools. */
export const CODELOVE_NETWORK = [
  {
    label: "CodeLove",
    href: "https://codelove.in",
    description: "The CodeLove home page",
  },
  {
    label: "Free 3D Models",
    href: "https://models.codelove.in",
    description: "Free 3D model library",
  },
  {
    label: "Free 3D Games",
    href: "https://games.codelove.in",
    description: "Free 3D games in your browser",
  },
  {
    label: "Instagram & Pinterest Downloader",
    href: "https://downloader.codelove.in",
    description: "Instagram and Pinterest media downloader",
  },
  {
    label: "Video to GIF",
    href: "https://videotogif.codelove.in",
    description: "Turn videos into GIFs",
  },
  {
    label: "Video to Images",
    href: "https://videotoimages.codelove.in",
    description: "Extract frames and images from videos",
  },
  {
    label: "Free YouTube Automation",
    href: "https://utubeflow.codelove.in",
    description: "Bulk upload & schedule YouTube videos for free",
  },
  {
    label: "Free Java Games",
    href: "https://javaplay.codelove.in",
    description: "Play old Java J2ME phone games free in your browser or on Android",
  },
];

/** Guides on codelove.in that go deeper on link in bio pages. */
export const CODELOVE_GUIDES = [
  {
    label: "How link-in-bio pages boost your presence",
    href: "https://codelove.in/learn/guide/how-link-in-bio-pages-boost-your-presence",
  },
  {
    label: "What to put on your link-in-bio page",
    href: "https://codelove.in/learn/guide/what-to-put-on-your-link-in-bio-page",
  },
];

export const PRIVACY_NOTICE =
  "We believe your data belongs to you. LinkinBio stores your profile information and analytics securely in the cloud using Firebase, ensuring it syncs seamlessly across your devices. We do not sell your personal data. Google Sign-In is used exclusively to identify your account and protect your data.";

export const COMING_SOON = [
  "Cloud Data Sync",
  "Custom Profile URLs",
  "Live Real-time Analytics",
  "Unlimited Smart Links",
  "Premium SaaS Themes",
  "Animated SVG Backgrounds",
  "Advanced Pixel Styling",
  "100% Free Forever",
];

/** Who the product is for. Each entry is a card in the "Who it's for" section. */
export const AUDIENCES = [
  {
    icon: "Camera",
    title: "Instagram creators & influencers",
    description:
      "Send followers from your reels and stories to your latest collab, YouTube channel, affiliate picks and booking form, all from one bio link.",
    links: ["Latest reel", "Brand collabs", "Affiliate picks"],
    accent: "#ec4899",
  },
  {
    icon: "Clapperboard",
    title: "YouTubers & streamers",
    description:
      "Share your newest video, playlists, community and merch. YouTube links can play right on your page.",
    links: ["Watch latest video", "Join the community", "Merch store"],
    accent: "#ef4444",
  },
  {
    icon: "Store",
    title: "Small businesses & online shops",
    description:
      "Take orders on WhatsApp, share your catalogue or menu, add your Google Maps location and collect reviews without building a website.",
    links: ["Order on WhatsApp", "Menu & price list", "Find us on Maps"],
    accent: "#22c55e",
  },
  {
    icon: "Briefcase",
    title: "Freelancers & professionals",
    description:
      "Put your portfolio, résumé, LinkedIn and an enquiry link on one professional page you can send to any client.",
    links: ["Portfolio", "Book a call", "Résumé"],
    accent: "#0ea5e9",
  },
  {
    icon: "GraduationCap",
    title: "Developers & students",
    description:
      "Bring together GitHub, projects, LinkedIn and your résumé for placements, internships and hackathons.",
    links: ["GitHub", "Projects", "LinkedIn"],
    accent: "#8b5cf6",
  },
  {
    icon: "Music",
    title: "Musicians, artists & coaches",
    description:
      "Share songs, shows, classes and courses. Spotify links play directly on your page.",
    links: ["Listen on Spotify", "Upcoming shows", "Join my class"],
    accent: "#f59e0b",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Create your free account",
    description:
      "Sign up with Google or email and pick your username. No credit card, no setup fee.",
    icon: "UserPlus",
  },
  {
    step: 2,
    title: "Add links and choose a theme",
    description:
      "Add your links and social profiles, drag them into order and pick a look that fits you.",
    icon: "ListPlus",
  },
  {
    step: 3,
    title: "Share one link everywhere",
    description:
      "Paste your link into your Instagram, YouTube or WhatsApp bio, or print the QR code.",
    icon: "Share2",
  },
];

export const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Smart Profile Builder",
    description:
      "Build your page entirely in your browser with our fast, intuitive editor.",
    status: "live" as const,
  },
  {
    phase: "Phase 2",
    title: "Cloud Storage Sync",
    description: "Securely sync your profile across all of your devices automatically.",
    status: "live" as const,
  },
  {
    phase: "Phase 3",
    title: "Analytics Dashboard",
    description: "Track views, individual link clicks, and audience growth in real time.",
    status: "live" as const,
  },
  {
    phase: "Phase 4",
    title: "Premium Themes & Styling",
    description: "Access advanced background animations, CSS effects, and premium Google fonts.",
    status: "live" as const,
  },
  {
    phase: "Phase 5",
    title: "Custom Domains & Monetization",
    description: "Connect your own domain and unlock advanced creator monetization tools.",
    status: "soon" as const,
  },
];

/** Rendered on the home page and mirrored into FAQPage structured data. */
export const FAQS = [
  {
    question: "What is a link in bio?",
    answer:
      "A link in bio is a single page that holds all your important links. Social apps give you very little room for links on your profile, so you share one link in your bio and it opens a page with everything: your channels, shop, WhatsApp, portfolio and more.",
  },
  {
    question: "Is LinkinBio free?",
    answer:
      "Yes. Creating your page, unlimited links, themes, background images, the QR code and click analytics are all free. You don't need a credit card to sign up.",
  },
  {
    question: "How do I add my link to my Instagram bio?",
    answer:
      "Open Instagram, go to your profile and tap Edit profile, then Links, then Add external link. Paste your LinkinBio link (linkinbio.codelove.in/u/yourname), tap Done, and it shows on your profile.",
  },
  {
    question: "Can I use it for my small business or WhatsApp orders?",
    answer:
      "Yes. Add a WhatsApp chat link so customers can message you in one tap, along with your catalogue or menu, Google Maps location, payment page and review link.",
  },
  {
    question: "Can I see how many people clicked my links?",
    answer:
      "Yes. Your dashboard shows total profile views and total link clicks, and the Links page shows a click count next to every individual link.",
  },
  {
    question: "Is LinkinBio an alternative to Linktree?",
    answer:
      "Yes. LinkinBio does the same core job, one page for all your links, and includes themes, custom backgrounds, a QR code and click analytics for free.",
  },
  {
    question: "Do I need a website or coding skills?",
    answer:
      "No. You fill in your name and bio, paste your links and choose a theme. Your page is live as soon as you save.",
  },
  {
    question: "Which platforms can I link to?",
    answer:
      "Any link works. There are built-in icons for Instagram, YouTube, WhatsApp, Facebook, LinkedIn, X, Threads, Telegram, TikTok and GitHub, and YouTube and Spotify links can play directly on your page.",
  },
  {
    question: "Can I change my links or username later?",
    answer:
      "Yes, as often as you like. Edits to your links, theme and profile show on your page straight away.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your profile is stored with Google Firebase and you sign in with Google or with an email and password. We do not sell your personal data, and you can export or delete your data from Settings at any time.",
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
    key: "whatsapp",
    label: "WhatsApp",
    icon: "WhatsApp",
    placeholder: "https://wa.me/919876543210",
    color: "#25D366",
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
    key: "telegram",
    label: "Telegram",
    icon: "Telegram",
    placeholder: "https://t.me/yourhandle",
    color: "#26A5E4",
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

/** Icon names that render a brand glyph instead of a Lucide icon. */
export const BRAND_ICON_NAMES = [
  "Youtube",
  "Instagram",
  "WhatsApp",
  "Facebook",
  "Twitter",
  "Linkedin",
  "Github",
  "TikTok",
  "Threads",
  "Telegram",
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
  ...BRAND_ICON_NAMES,
];

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Who it's for", href: "/#who-its-for" },
  { label: "Themes", href: "/#themes" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
];
