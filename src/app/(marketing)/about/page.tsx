import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/section";
import { PageHero, Prose } from "@/components/marketing/prose";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind LinkinBio — a privacy-first link in bio tool built by CodeLove.in to help creators share everything from one link.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The story behind LinkinBio"
        subtitle="A simple idea: give every creator one link they actually own."
      />
      <Container className="py-16">
        <Prose>
          <p>
            LinkinBio started with a small frustration. Most of us keep a single
            link in our social bios, but a single link is rarely enough. You have
            a YouTube channel, a shop, a newsletter, maybe a podcast and a
            portfolio. Cramming all of that into one URL means someone always
            misses what matters. We wanted to fix that without making people
            learn a website builder.
          </p>

          <h2>Who we are</h2>
          <p>
            LinkinBio is built by{" "}
            <a href="https://codelove.in">{BRAND.developedBy}</a>, a small
            independent studio. The project is led by our founder,{" "}
            <strong>{BRAND.founder}</strong>, who wanted a tool that felt fast
            and premium without the bloat that creeps into so many SaaS products.
            We are not a large company, and that is on purpose. It keeps us close
            to the people who use what we make.
          </p>

          <h2>What we believe</h2>
          <p>
            Two things guide every decision. First, your data belongs to you.
            During this early version, everything you create — your profile, your
            links, your theme — lives in your own browser. We do not copy it onto
            a server, and we do not sell it. Google Sign-In is used only so we can
            recognise your account between visits.
          </p>
          <p>
            Second, speed is a feature. A bio page is often the first thing
            someone sees, and a slow page loses people in seconds. We build on
            modern web tooling so your page loads quickly and feels smooth on a
            phone, which is where most of your visitors will be.
          </p>

          <h2>Where we are headed</h2>
          <p>
            Storing data locally is a deliberate starting point, not the finish
            line. We are working toward optional cloud sync so your page follows
            you across devices, along with real analytics, custom domains and
            more themes. You can follow that journey on our{" "}
            <Link href="/#roadmap">roadmap</Link>. As we add these features, our promise
            stays the same: clear choices, honest defaults, and no surprises with
            your data.
          </p>

          <h2>Say hello</h2>
          <p>
            We love hearing how people use the product and what they wish it did
            next. If you have feedback, an idea, or just want to share your page,
            reach out through our <Link href="/contact">contact page</Link>. Real
            messages from real creators shape what we build.
          </p>
        </Prose>
      </Container>
    </>
  );
}
