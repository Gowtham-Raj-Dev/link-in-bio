import type { Metadata } from "next";
import { Container } from "@/components/ui/section";
import { PageHero, Prose } from "@/components/marketing/prose";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of LinkinBio, a link in bio tool by CodeLove.in.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "June 22, 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle={`Last updated ${UPDATED}`}
      />
      <Container className="py-16">
        <Prose>
          <h2>1. Agreement</h2>
          <p>
            These Terms of Service govern your access to and use of {BRAND.name}
            (the &ldquo;Service&rdquo;), operated by {BRAND.developedBy}. By
            creating an account or using the Service, you agree to these terms. If
            you do not agree, please do not use the Service.
          </p>

          <h2>2. Your account</h2>
          <p>
            You sign in using Google. You are responsible for activity that
            happens under your account and for keeping your Google credentials
            secure. You must be at least 13 years old to use {BRAND.name}.
          </p>

          <h2>3. Your content</h2>
          <p>
            You own the content you create — your profile details, links and
            social handles. During this early version that content is stored in
            your own browser. You are responsible for the links you publish and
            for making sure they comply with the law and with this agreement.
          </p>

          <h2>4. Acceptable use</h2>
          <p>You agree not to use {BRAND.name} to:</p>
          <ul>
            <li>Share content that is illegal, harmful, hateful or deceptive.</li>
            <li>Distribute malware, spam, or phishing links.</li>
            <li>Infringe the intellectual property or privacy of others.</li>
            <li>Attempt to disrupt, abuse or reverse engineer the Service.</li>
          </ul>

          <h2>5. Availability</h2>
          <p>
            We work hard to keep {BRAND.name} running smoothly, but the Service is
            provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            basis. Because your data is stored locally in your browser during this
            phase, we are not responsible for content lost when you clear your
            browser, switch devices or experience a device failure. We recommend
            exporting your data from the Settings page as a backup.
          </p>

          <h2>6. Free service and future changes</h2>
          <p>
            All current features are free. As outlined on our roadmap, we may
            introduce optional paid features in the future. If we do, we will make
            the pricing clear before you choose to use them.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {BRAND.developedBy} will not
            be liable for any indirect, incidental or consequential damages, or
            for any loss of data, arising from your use of the Service.
          </p>

          <h2>8. Termination</h2>
          <p>
            You may stop using {BRAND.name} at any time and delete your data from
            the Settings page. We may suspend or end access for accounts that
            violate these terms.
          </p>

          <h2>9. Changes to these terms</h2>
          <p>
            We may update these terms as the Service evolves. When we make
            material changes, we will revise the date above and, where
            appropriate, notify you.
          </p>

          <h2>10. Contact</h2>
          <p>
            If you have questions about these terms, reach us via our{" "}
            <a href="/contact">contact page</a>.
          </p>
        </Prose>
      </Container>
    </>
  );
}
