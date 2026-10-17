import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// A route handler instead of app/robots.ts so the file can carry comments.
// /u/ and /login stay crawlable on purpose: they carry a noindex tag,
// which crawlers can only see if they are allowed to fetch the page.
const DISALLOW = ["/dashboard/"];

// Search and AI crawlers that are explicitly welcome, with the same rules.
const WELCOME_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
];

function group(userAgent: string) {
  return [
    `User-agent: ${userAgent}`,
    "Allow: /",
    ...DISALLOW.map((path) => `Disallow: ${path}`),
  ].join("\n");
}

export function GET() {
  const body = [
    "# LinkinBio by CodeLove is updated often. Every public page is open to",
    "# crawl, including by search engines and AI assistants. Only the private",
    "# dashboard is off limits.",
    "",
    group("*"),
    "",
    ...WELCOME_BOTS.flatMap((bot) => [group(bot), ""]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
