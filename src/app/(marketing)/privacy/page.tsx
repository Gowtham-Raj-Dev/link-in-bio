import type { Metadata } from "next";
import { Container } from "@/components/ui/section";
import { PageHero, Prose } from "@/components/marketing/prose";
import { PrivacyNotice } from "@/components/marketing/privacy-notice";
import { BRAND, CONTACT_EMAIL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How LinkinBio handles your data: Firebase sign-in, the profile and link data you store, analytics, cookies and Google AdSense advertising.",
  path: "/privacy",
});

const UPDATED = "October 10, 2026";

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
            &ldquo;us&rdquo;), operated by {BRAND.developedBy}, collects, how we
            use it, and the choices you have. By using {BRAND.name}, you agree to
            the practices described here.
          </p>

          <h2>2. Information we process</h2>
          <p>
            <strong>Account information.</strong> You can create an account with
            an email address and password or sign in with Google. Authentication
            is handled by Google Firebase Authentication. We receive your name,
            email address and, if you use Google Sign-In, your profile photo. We
            never see your Google password, and your {BRAND.name} password is
            handled by Firebase rather than stored by us.
          </p>
          <p>
            <strong>Profile and link data.</strong> The content you create in
            the dashboard is stored in Google Cloud Firestore under your account
            so it can sync across your devices. This includes your display name,
            username, bio, location, website, profile photo or uploaded images,
            your links and social handles, and your theme, background and SEO
            settings. A copy may also be kept in your browser&apos;s local
            storage.
          </p>
          <p>
            <strong>Public profile.</strong> Your page is available at
            /u/your-username. Anything you put on your profile page, including
            your name, bio, photo, links and social handles, is public and can
            be seen by anyone with the link. Do not publish information you want
            to keep private.
          </p>
          <p>
            <strong>Analytics counters.</strong> When someone opens a public
            profile or clicks a link on it, we increment a counter stored against
            that profile (total views, total clicks and clicks per link) so the
            owner can see them on their dashboard. These counters do not contain
            visitor names, email addresses or other personal details.
          </p>
          <p>
            <strong>Basic technical data.</strong> Like most websites, our
            hosting and infrastructure providers may process standard request
            information such as IP address, browser type and device information
            for security and reliability. If you use the contact form, we receive
            the name, email address and message you send.
          </p>

          <h2>3. How we use information</h2>
          <ul>
            <li>To let you sign in, and to store and display your profile and links.</li>
            <li>To show you view and click statistics for your own page.</li>
            <li>To keep the service secure, diagnose problems and improve it.</li>
            <li>To respond to messages you send us.</li>
          </ul>

          <h2>4. Cookies and similar technologies</h2>
          <p>
            We use browser storage to remember your light/dark mode preference
            and to keep a copy of your profile data. Firebase Authentication uses
            cookies or local storage entries that are necessary to keep you
            signed in. Where it is configured, we also use Google Analytics for
            Firebase to understand how the site is used; it may set cookies or
            use similar identifiers and collects usage information such as pages
            viewed and device and browser details. You can block or delete
            cookies in your browser settings, though signing in may stop working.
          </p>

          <h2>5. Advertising</h2>
          <p>
            We use or may use Google AdSense to show ads on this site. Google and
            third-party vendors use cookies to serve ads based on a user&apos;s
            prior visits to this website and other sites on the internet. Google&apos;s
            use of advertising cookies enables it and its partners to serve ads
            based on your visit to our site and/or other sites.
          </p>
          <p>
            You can opt out of personalised advertising by visiting{" "}
            <a href="https://adssettings.google.com" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            , or by visiting{" "}
            <a href="https://www.aboutads.info" rel="noopener noreferrer">
              www.aboutads.info
            </a>{" "}
            to opt out of the use of cookies by third-party vendors for
            personalised advertising. To learn more about how Google uses data
            when you use our site, see{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              rel="noopener noreferrer"
            >
              How Google uses information from sites or apps that use our services
            </a>
            . Where the law requires your consent for advertising cookies, we
            will ask for it before they are used.
          </p>

          <h2>6. Sharing</h2>
          <p>
            We do not sell your personal information. We rely on Google
            (Firebase Authentication, Firestore and, where configured, Analytics
            for Firebase) and our hosting provider to run the service, and these
            providers process data only to deliver their service to us.
            Advertising partners are described in the section above. We may
            disclose information if the law requires it.
          </p>

          <h2>7. Retention and your choices</h2>
          <p>
            We keep your account and profile data for as long as your account
            exists. You can edit your profile at any time, export a copy of your
            data from the Settings page in your dashboard, and clear the copy
            held in your browser there. To have your account and the data stored
            in the cloud deleted, email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. You may also
            revoke {BRAND.name}&apos;s access from your Google Account settings.
          </p>

          <h2>8. Security</h2>
          <p>
            Data is transmitted over HTTPS and stored with Google&apos;s cloud
            infrastructure. No method of transmission or storage is completely
            secure, so we cannot guarantee absolute security.
          </p>

          <h2>9. Children</h2>
          <p>
            {BRAND.name} is not directed to children under 13, and we do not
            knowingly collect their information.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy as the product changes. When we do, we will
            revise the date above. Significant changes will be highlighted where
            appropriate.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about privacy? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use our{" "}
            <a href="/contact">contact page</a>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
