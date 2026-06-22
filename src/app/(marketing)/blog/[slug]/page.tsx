import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Container } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/marketing/prose";
import { BLOG_POSTS, formatDate, getPost } from "@/lib/blog";
import { BRAND } from "@/lib/constants";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="py-16">
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <header className="mx-auto mt-8 max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <Badge variant="brand">{post.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {post.readingTime}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {formatDate(post.date)} · by {BRAND.founder}
          </p>
        </header>

        <div className="mt-12">
          <Prose>
            {post.content.map((block, i) =>
              block.startsWith("## ") ? (
                <h2 key={i}>{block.replace("## ", "")}</h2>
              ) : (
                <p key={i}>{block}</p>
              )
            )}
          </Prose>
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 text-center">
          <h2 className="text-lg font-semibold">Ready to build your page?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Put these ideas into practice with a free LinkinBio page.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Get started free →
          </Link>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Person", name: BRAND.founder },
            publisher: { "@type": "Organization", name: BRAND.developedBy },
          }),
        }}
      />
    </article>
  );
}
