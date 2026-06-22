import type { Metadata } from "next";
import { Container } from "@/components/ui/section";
import { PageHero, Prose } from "@/components/marketing/prose";
import { PrivacyNotice } from "@/components/marketing/privacy-notice";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How LinkinBio handles your data. We store your profile only in your browser and use Google Sign-In solely to identify your account.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "June 22, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`Last updated ${UPDATED}`}
      />
      <Container className="py-16">
        <Prose>
          <PrivacyNotice className="not-prose mb-2" />

          <h2>1. Overview</h2>
          <p>
            This Privacy Policy explains what information {BRAND.name} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;) collects, how we use it, and the choices you have.
            We have written it in plain language because privacy decisions should
            be easy to understand. By using {BRAND.name}, you agree to the
            practices described here.
          </p>

          <h2>2. The short version</h2>
          <p>
            Your profile content — your display name, bio, links, social handles,
            chosen theme and settings — is stored only in your web browser using
            local storage. It is not transmitted to or saved on our servers. If
            you clear your browser data or use a different device, that content
            will not carry over during this early version of the product.
          </p>

          <h2>3. Information we process</h2>
          <p>
            <strong>Account identity.</strong> When you sign in with Google, we
            receive your name, email address and profile photo from Google. We
            use this only to identify your account and personalise your
            experience. Authentication is handled by Google Firebase
            Authentication.
          </p>
          <p>
            <strong>Profile content.</strong> Everything you create in the
            dashboard stays in your browser&apos;s local storage on your device.
            We do not have access to it.
          </p>
          <p>
            <strong>Basic technical data.</strong> Like most websites, our
            hosting provider may process standard request information such as IP
            address and browser type for security and reliability. We do not use
            this to build advertising profiles.
          </p>

          <h2>4. How we use information</h2>
          <ul>
            <li>To let you sign in and recognise your account on return visits.</li>
            <li>To display your name and photo inside your own dashboard.</li>
            <li>To keep the service secure and working correctly.</li>
          </ul>

          <h2>5. Cookies and storage</h2>
          <p>
            We use local storage to hold your profile data and your light/dark
            mode preference. Firebase Authentication may set cookies or local
            storage entries that are necessary to keep you signed in. We do not
            use third-party advertising cookies.
          </p>

          <h2>6. Advertising</h2>
          <p>
            If we display advertising in the future, such as Google AdSense,
            those partners may use cookies to serve relevant ads. We will update
            this policy and, where required, request your consent before any such
            advertising is enabled.
          </p>

          <h2>7. Sharing</h2>
          <p>
            We do not sell your personal information. We rely on Google Firebase
            for authentication and a hosting provider to serve the website. These
            providers process data only to deliver their service to us.
          </p>

          <h2>8. Your choices and rights</h2>
          <p>
            You can export or permanently delete your stored data at any time
            from the Settings page in your dashboard. You may also revoke
            {BRAND.name}&apos;s access from your Google Account settings. Because
            profile content lives on your device, clearing your browser storage
            removes it completely.
          </p>

          <h2>9. Children</h2>
          <p>
            {BRAND.name} is not directed to children under 13, and we do not
            knowingly collect their information.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            As the product grows — for example when we add optional cloud sync —
            we will update this page and revise the date above. Significant
            changes will be highlighted where appropriate.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about privacy? Reach us through our{" "}
            <a href="/contact">contact page</a> and we will be glad to help.
          </p>
        </Prose>
      </Container>
    </>
  );
}
