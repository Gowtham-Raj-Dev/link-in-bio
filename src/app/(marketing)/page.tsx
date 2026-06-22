import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Why } from "@/components/landing/why";
import { PrivacySection } from "@/components/landing/privacy-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { RoadmapSection } from "@/components/landing/roadmap-section";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { BRAND } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Why />
      <PrivacySection />
      <HowItWorks />
      <RoadmapSection />
      <Faq />
      <Cta />
      {/* Structured data for SEO / rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: BRAND.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: BRAND.description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: BRAND.founder },
            publisher: { "@type": "Organization", name: BRAND.developedBy },
          }),
        }}
      />
    </>
  );
}
