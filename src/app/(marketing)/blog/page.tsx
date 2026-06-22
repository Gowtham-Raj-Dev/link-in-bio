import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/marketing/prose";
import { BLOG_POSTS, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips and ideas for creators on building a better link in bio page — strategy, design and privacy from the LinkinBio team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas for a better bio page"
        subtitle="Practical, no-fluff advice on strategy, design and privacy for creators."
      />
      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                <div className="flex items-center gap-3">
                  <Badge variant="brand">{post.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {post.readingTime}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
