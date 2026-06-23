"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useAuth } from "@/lib/auth-context";

export function Cta() {
  const { user } = useAuth();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 p-10 text-center sm:p-16">
            <div className="aurora-bg" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to claim your link?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Join creators building a beautiful online presence with one
                smart link. It&apos;s free to start.
              </p>
              <div className="mt-8 flex justify-center">
                {user ? (
                  <Link href="/dashboard">
                    <Button size="lg">
                      Go to Dashboard <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login?tab=signup">
                    <Button size="lg">
                      Start Free <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
