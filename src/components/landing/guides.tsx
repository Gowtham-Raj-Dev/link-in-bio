import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { BLOG_POSTS } from "@/lib/blog";

/** Every blog post, linked straight from the home page so search engines
 *  reach each one in one click. New posts appear here automatically. */
export function Guides() {
  return (
    <section id="guides" className="border-t border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Guides"
          title="Link in bio guides and ideas"
          subtitle="Short, practical reads on getting more from your bio link: Instagram setup, small business ideas and page design."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {post.readingTime}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  Read the guide
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-sm">
          <Link
            href="/blog"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            All posts on the LinkinBio blog →
          </Link>
        </p>
      </Container>
    </section>
  );
}
