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

  // Generate table of contents
  const toc = post.content
    .filter((block) => block.startsWith("## "))
    .map((block) => {
      const title = block.replace("## ", "");
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { title, id };
    });

  // Get related posts (just pick 2 others)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="py-16">
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <header className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <Badge variant="brand">{post.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {post.readingTime}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            {formatDate(post.date)} · by {BRAND.founder}
          </p>
        </header>

        {post.image && (
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="w-full h-auto object-cover aspect-[2/1]" />
          </div>
        )}

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[1fr_280px]">
          {/* Main Content */}
          <div className="min-w-0">
            <Prose>
              {post.content.map((block, i) => {
                if (block.startsWith("## ")) {
                  const title = block.replace("## ", "");
                  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return <h2 key={i} id={id} className="scroll-m-20">{title}</h2>;
                }
                if (block.startsWith("### ")) {
                  const title = block.replace("### ", "");
                  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return <h3 key={i} id={id} className="scroll-m-20">{title}</h3>;
                }
                if (block.startsWith("![") && block.includes("](")) {
                  const alt = block.match(/!\[(.*?)\]/)?.[1] || "";
                  const url = block.match(/\((.*?)\)/)?.[1] || "";
                  return (
                    <figure key={i} className="my-8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={alt} className="rounded-2xl border border-border w-full object-cover shadow-sm" />
                    </figure>
                  );
                }
                return <p key={i}>{block}</p>;
              })}
            </Prose>

            <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/[0.06] p-8 text-center sm:p-10">
              <h2 className="text-xl font-bold">Ready to build your page?</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                Put these ideas into practice with a free LinkinBio page by CodeLove. Get started in seconds.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create your link for free
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-8">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-semibold text-sm tracking-tight mb-4">Table of Contents</h3>
              <ul className="space-y-3">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block leading-tight"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
        
        {/* Related Posts */}
        <div className="mx-auto mt-24 max-w-5xl border-t border-border pt-16">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Read next</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
                <Badge variant="outline" className="mb-4">{p.category}</Badge>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">Read article →</span>
              </Link>
            ))}
          </div>
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
