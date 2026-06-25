import type { Metadata } from "next";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/prose";
import { ContactForm } from "@/components/marketing/contact-form";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the LinkinBio team. Questions, feedback and ideas are always welcome.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="We read every message. Tell us what's working, what isn't, or what you'd love to see next."
      />
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email us"
              value="support@codelove.in"
            />
            <InfoCard
              icon={<MessageSquare className="h-5 w-5" />}
              title="Feedback"
              value="Ideas and feature requests welcome"
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Made by"
              value={`${BRAND.developedBy} · Founder ${BRAND.founder}`}
            />
          </div>

          <Card className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold">Send a message</h2>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">
              Fill in the form and we&apos;ll get back to you.
            </p>
            <ContactForm />
          </Card>
        </div>
      </Container>
    </>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Card className="flex items-start gap-3 p-5">
      <span className="brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </Card>
  );
}
