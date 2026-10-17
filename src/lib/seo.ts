import type { Metadata } from "next";
import { BRAND, FAQS } from "./constants";
import { THEMES } from "./themes";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;

/** Date the marketing pages last changed. Used as the sitemap `lastmod`, so
 *  bump it when page content changes instead of reporting every build as new. */
export const SITE_UPDATED = "2026-10-10";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${BRAND.name} by CodeLove: free link in bio page builder`,
};

/** Search phrases the site is written for. Google ignores the keywords tag,
 *  but other engines read it and it documents the targeting in one place. */
export const KEYWORDS = [
  "link in bio",
  "free link in bio",
  "link in bio for Instagram",
  "bio link maker",
  "link in bio page builder",
  "Linktree alternative",
  "free Linktree alternative",
  "link in bio India",
  "WhatsApp link in bio",
  "link in bio for small business",
  "link in bio with analytics",
  "one link for all social media",
  "Instagram bio link",
  "creator tools",
  "bio link for Instagram free",
  "linktree free alternative India",
  "link in bio website",
  "multiple links in Instagram bio",
  "CodeLove",
  "CodeLove link in bio",
];

/** Per-page metadata with its own canonical, Open Graph and Twitter card.
 *  Next replaces (not merges) `openGraph`, so the image and siteName are
 *  repeated here instead of being dropped from the root layout's values. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} · ${BRAND.name} by CodeLove`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: BRAND.name,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

const ORGANIZATION_ID = "https://codelove.in/#organization";

/** Site-wide graph: who publishes the site and what the site is. */
export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BRAND.url}/#website`,
      url: BRAND.url,
      name: BRAND.name,
      alternateName: [`${BRAND.name} by CodeLove`, "Link in Bio by CodeLove"],
      description: BRAND.description,
      inLanguage: "en-IN",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "CodeLove",
      url: "https://codelove.in",
      logo: `${BRAND.url}/icon-192.png`,
      founder: { "@type": "Person", name: BRAND.founder },
    },
  ],
};

/** Home page graph: the product itself plus the visible FAQ. */
export const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${BRAND.url}/#app`,
      name: BRAND.name,
      url: BRAND.url,
      description: BRAND.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern web browser.",
      inLanguage: "en-IN",
      isAccessibleForFree: true,
      image: `${BRAND.url}${OG_IMAGE.url}`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "Unlimited links",
        `${THEMES.length} themes and custom background images`,
        "Profile view and link click analytics",
        "QR code for your page",
        "YouTube and Spotify embeds",
        "Social icons for Instagram, YouTube, WhatsApp and more",
      ],
      audience: {
        "@type": "Audience",
        audienceType:
          "Content creators, influencers, small businesses, freelancers and students",
      },
      author: { "@type": "Person", name: BRAND.founder },
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "FAQPage",
      "@id": `${BRAND.url}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

/** Home > page breadcrumb for the simple marketing pages. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BRAND.url },
      { "@type": "ListItem", position: 2, name, item: `${BRAND.url}${path}` },
    ],
  };
}
