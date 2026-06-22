"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { PhoneMockup } from "@/components/marketing/phone-mockup";
import { useAuth } from "@/lib/auth-context";
import { useAuthModal } from "@/components/auth/auth-modal";
import { BRAND } from "@/lib/constants";

export function Hero() {
  const { user } = useAuth();
  const { openLogin } = useAuthModal();

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24">
      <div className="aurora-bg" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {BRAND.tagline}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Turn One Link Into Your{" "}
            <span className="brand-text">Complete Online Presence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0"
          >
            Create a beautiful bio page for Instagram, YouTube, TikTok, LinkedIn,
            and more. Share everything from one smart link.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => openLogin("/dashboard")}
              >
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            <Link href="/u/ariacreates" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full">
                <Play className="h-4 w-4" />
                View Demo
              </Button>
            </Link>
          </motion.div>

          <p className="mt-5 text-xs text-muted-foreground">
            No credit card required · Free during early access
          </p>
        </div>

        <div className="relative">
          <PhoneMockup />
        </div>
      </Container>
    </section>
  );
}
