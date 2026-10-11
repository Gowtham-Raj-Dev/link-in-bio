import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { BRAND } from "@/lib/constants";
import { ADSENSE_CLIENT } from "@/lib/adsense";
import { KEYWORDS, OG_IMAGE, SITE_JSON_LD } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for marketing headings.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: BRAND.seoTitle,
    template: `%s · ${BRAND.name} by CodeLove`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  category: "technology",
  keywords: KEYWORDS,
  authors: [{ name: BRAND.founder, url: "https://codelove.in" }],
  creator: BRAND.developedBy,
  publisher: BRAND.developedBy,
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BRAND.name,
    title: BRAND.seoTitle,
    description: BRAND.description,
    url: BRAND.url,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.seoTitle,
    description: BRAND.description,
    creator: "@codelove_in",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        {/* A ternary, not `&&`: an empty ID would otherwise render "" into
            <head>, which breaks hydration and drops the stylesheet. */}
        {ADSENSE_CLIENT ? (
          <>
            <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
              crossOrigin="anonymous"
            />
          </>
        ) : null}
      </head>
      <body className="min-h-full overflow-x-hidden" suppressHydrationWarning>
        {/* Apply the saved/system color mode before paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='linkinbio:color-mode';var m=localStorage.getItem(k);if(m!=='light'&&m!=='dark'){m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var e=document.documentElement;e.classList.toggle('dark',m==='dark');e.style.colorScheme=m;}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
