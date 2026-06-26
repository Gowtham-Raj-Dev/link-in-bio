import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { BRAND } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} by CodeLove — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name} by CodeLove`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  keywords: [
    "CodeLove",
    "CodeLove link in bio",
    "CodeLove projects",
    "Gowtham CodeLove",
    "link in bio",
    "bio link",
    "linktree alternative",
    "creator tools",
    "social media links",
    "instagram bio link",
    "personal landing page",
    "link in profile",
    "link tracking analytics",
    "custom bio page"
  ],
  authors: [{ name: BRAND.founder, url: "https://codelove.in" }],
  creator: BRAND.developedBy,
  publisher: BRAND.developedBy,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BRAND.name,
    title: `${BRAND.name} by CodeLove — ${BRAND.tagline}`,
    description: BRAND.description,
    url: BRAND.url,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} by CodeLove`,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} by CodeLove — ${BRAND.tagline}`,
    description: BRAND.description,
    creator: "@codelove_in",
    images: ["/og-image.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Playfair+Display:wght@400;600;700&family=Roboto+Mono:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full overflow-x-hidden" suppressHydrationWarning>
        {/* Apply the saved/system color mode before paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k='linkinbio:color-mode';var m=localStorage.getItem(k);if(m!=='light'&&m!=='dark'){m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var e=document.documentElement;e.classList.toggle('dark',m==='dark');e.style.colorScheme=m;}catch(e){}})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
