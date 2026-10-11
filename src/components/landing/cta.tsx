import { Check } from "lucide-react";
import { Container } from "@/components/ui/section";
import { ClaimForm } from "@/components/landing/claim-form";

const PROMISES = ["Unlimited links", "Themes and QR code", "Click analytics"];

export function Cta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="reveal brand-gradient relative isolate overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white shadow-2xl shadow-primary/30 sm:px-16 sm:py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.28),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(0,0,0,0.25),transparent_50%)]" />
          <h2 className="font-display mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-5xl sm:leading-[1.08]">
            Claim your link in bio before someone else does
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            Pick your username, add your links and share your page today.
            It&apos;s free to use.
          </p>
          <ClaimForm
            id="cta-username"
            onGradient
            className="mx-auto mt-8 max-w-lg text-foreground"
          />
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/90">
            {PROMISES.map((promise) => (
              <li key={promise} className="flex items-center gap-1.5">
                <Check className="h-4 w-4" />
                {promise}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
