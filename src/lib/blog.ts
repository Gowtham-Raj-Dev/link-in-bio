export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  category: string;
  /** Paragraphs and headings. A line starting with "## " is a heading. */
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-one-link-beats-a-link-list",
    title: "Why one good link beats a wall of links",
    description:
      "More links in your bio isn't always better. Here's how to choose the few that actually move people to act.",
    date: "2026-06-10",
    readingTime: "4 min read",
    category: "Strategy",
    content: [
      "It is tempting to add every link you have ever made to your bio page. The shop, the newsletter, three different videos, your old portfolio, that one tweet you are proud of. The logic feels right: more options, more chances someone clicks. In practice, the opposite usually happens.",
      "When a visitor lands on your page, they are making a quick decision about where to spend their attention. A long list forces them to read, compare and choose. Most people will not do that work. They scan for a second, feel a little overwhelmed, and leave. A short, confident page does the choosing for them.",
      "## Start with one goal",
      "Before you add a single link, ask what you most want a new visitor to do this month. Subscribe to your newsletter? Watch your latest video? Buy a product? Pick one. That becomes your primary link, and it should sit at the top with a clear, action-led title like \"Watch my latest video\" instead of a bare channel name.",
      "Everything else on the page supports that goal or gets cut. This is hard, because every link feels important to you. But your visitor does not share your context. They need a path, not a directory.",
      "## Write titles that promise something",
      "A link titled \"YouTube\" tells people where they will go. A link titled \"Watch: how I edit in 20 minutes\" tells people what they will get. The second one wins almost every time, because it speaks to a benefit rather than a destination.",
      "Keep titles short enough to read at a glance on a phone, and lead with a verb when you can. A small emoji at the start can help the eye find the right row quickly, but a row of competing emojis just adds noise.",
      "## Review it like a stranger",
      "Once a month, open your page as if you have never seen it. Does the first link match your current goal? Is anything out of date? Could two links become one? Trimming is not failure; it is maintenance. The best bio pages feel curated, not collected.",
      "One link in your social bio is a small piece of real estate, but it is some of the most valuable space you own. Treat it with intention and it will quietly do a lot of work for you.",
    ],
  },
  {
    slug: "anatomy-of-a-high-converting-bio-page",
    title: "The anatomy of a bio page people actually use",
    description:
      "A practical breakdown of the elements that make a link in bio page feel trustworthy and clickable.",
    date: "2026-06-05",
    readingTime: "5 min read",
    category: "Design",
    content: [
      "A great bio page is not about flashy design. It is about clarity and trust. When the basics are right, people understand who you are in seconds and feel comfortable clicking. Let us walk through the parts that matter, from top to bottom.",
      "## A photo that looks like you",
      "Your profile picture is the first signal of trust. Use a clear, well-lit photo where your face is easy to see, or a clean logo if you are a brand. Avoid busy backgrounds and heavy filters. People connect with people, and a recognisable photo makes your page feel personal rather than anonymous.",
      "## A name and a one-line promise",
      "Right under your photo, state who you are and what you offer in a single line. \"Filmmaker sharing gear and presets\" tells a visitor more than a clever tagline ever will. If someone reads only your name and that one line, they should still understand why they are here.",
      "## Links in priority order",
      "Order is everything. The link you most want clicked goes first. People read top to bottom and lose momentum as they scroll, so do not bury your most important action halfway down. Consider giving your top link a stronger visual treatment so it stands out from the rest.",
      "## Social icons, kept small",
      "Social icons are useful, but they are a supporting act. Place them near the top as a compact row rather than as full-width buttons. That way they are available for people who want them without competing with your primary links.",
      "## Consistent, readable styling",
      "Pick a theme and stick with it. Buttons should be large enough to tap easily on a phone, with enough spacing that nobody mis-taps. Good contrast between text and background is not just an aesthetic choice; it is what makes your page readable in bright sunlight, which is exactly when many people are scrolling.",
      "## A reason to trust you",
      "Small details build confidence: a working website link, accurate handles, and a page that loads instantly. When everything feels cared for, visitors assume the same care extends to whatever you are asking them to click.",
      "None of this requires design skills. It requires restraint and a clear sense of what you want people to do. Get the anatomy right and the page does the rest.",
    ],
  },
  {
    slug: "your-data-your-rules-local-first",
    title: "Your data, your rules: why we started local-first",
    description:
      "A look at why LinkinBio keeps your profile in your browser for now, and what that means for you.",
    date: "2026-05-28",
    readingTime: "4 min read",
    category: "Privacy",
    content: [
      "When we set out to build LinkinBio, we made an unusual early decision: your profile data would live in your own browser, not on our servers. For a product that could just as easily store everything in a database, this might seem backwards. We think it is a feature worth explaining.",
      "## What local-first actually means",
      "Local-first means the information you create — your bio, links, theme and settings — is saved in your browser's local storage. It stays on your device. We use Google Sign-In only to recognise your account, not to copy your content into a database somewhere. In plain terms, we cannot read your links, because we never receive them.",
      "## Why we chose it",
      "Trust is hard to earn and easy to lose. Starting local-first let us ship a genuinely private tool from day one, without asking you to take our word for how we handle a server full of personal data. It also keeps the product fast, because there is no round trip to a database every time you edit a link.",
      "## The honest trade-offs",
      "Local-first is not magic, and we want to be upfront about the limits. Because your data lives in one browser, it will not appear if you switch devices or clear your browser storage. There is no automatic backup yet. That is why we added a one-click export in your settings, so you can keep a copy of your data whenever you like.",
      "## Where this is going",
      "Local-first is our starting point, not our ceiling. Optional cloud sync is on the roadmap, and when it arrives it will be exactly that — optional. You will choose whether to sync, and you will keep the same clarity about what is stored and where. The goal is to add convenience without quietly taking away the privacy we started with.",
      "We believe people should not have to trade ownership of their information for a useful product. Local-first is how we are keeping that promise while we grow.",
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
