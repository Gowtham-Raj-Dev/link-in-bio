import Link from "next/link";
import { Plus } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/section";
import { FAQS } from "@/lib/constants";

/** Native <details> keeps every answer in the page HTML, so search engines
 *  can read them and the section works before JavaScript loads. */
export function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-card/40 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">
              Link in bio questions, answered
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              New to link in bio pages? Start here. If your question is not
              covered,{" "}
              <Link
                href="/contact"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                send us a message
              </Link>
              .
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={faq.question}
                open={i === 0}
                className="faq-item group rounded-2xl border border-border bg-card open:border-primary/40"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left">
                  <h3 className="font-medium">{faq.question}</h3>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-300 group-open:rotate-45 group-open:bg-primary/15 group-open:text-primary">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
