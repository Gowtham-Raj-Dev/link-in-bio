import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { Platforms } from "@/components/landing/platforms";
import { Audience } from "@/components/landing/audience";
import { Features } from "@/components/landing/features";
import { ThemesShowcase } from "@/components/landing/themes-showcase";
import { AnalyticsSection } from "@/components/landing/analytics-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { HOME_JSON_LD } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Platforms />
      <Audience />
      <Features />
      <ThemesShowcase />
      <AnalyticsSection />
      <HowItWorks />
      <Faq />
      <Cta />
      {/* Structured data: the product and the FAQ shown above. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />
    </>
  );
}
