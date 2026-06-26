export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  category: string;
  /** Paragraphs and headings. A line starting with "## " is a heading. */
  content: string[];
  image?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-you-need-a-custom-link-in-bio",
    title: "Why You Need a Custom Link in Bio (And Not Just Instagram's Default)",
    description: "Stop losing out on valuable insights. Here is the real reason why relying purely on standard social media linking is holding you back.",
    date: "2026-06-26",
    readingTime: "3 min read",
    category: "Growth",
    image: "/blog/hero.png",
    content: [
      "Let's be honest for a second. We've all done it: we have a new video, a new product, or a new portfolio piece, and we just slap that single link right into our Instagram profile. It feels fast, it feels easy, and it seems like it gets the job done.",
      "But here is the problem that most creators and business owners don't realize until it's too late: you are flying completely blind.",
      "## The Problem with Default Instagram Links",
      "When you use a normal link directly on Instagram or TikTok, those platforms give you the bare minimum of information. Sure, you might see a generic 'website clicks' metric in your insights, but it is extremely limited.",
      "You can't track exactly *how many* people clicked today versus yesterday with high precision. You can't tell if someone actually opened the link or just tapped and bounced. And if you change that link frequently (like swapping it out every time you drop a new video), your historical data is just gone. It's impossible to understand what your audience actually wants because you don't have the real numbers.",
      "## The Illusion of Engagement",
      "We often confuse views with actual engagement. A reel might get 10,000 views, but if you only have one standard link, you won't know if those views translated into 10 clicks or 1,000 clicks. You are operating in the dark.",
      "## Enter Link in Bio by CodeLove",
      "This is exactly why we built a dedicated Link in Bio platform. It's not just about making a pretty page with some nice gradients (although, let's be real, it does look incredible). It's about giving you the power of data.",
      "When you use our tool, you aren't just sending people to a list. You get a fully featured, real-time analytics dashboard built right in. We show you exactly how many people visited your profile, and more importantly, we track individual clicks for *every single link*.",
      "## Stop Guessing, Start Tracking",
      "Imagine having five links on your page: your YouTube, your newsletter, your store, and a couple of recent posts. With our built-in analytics, you can see that your newsletter link is getting 70% of the clicks, while your store link is barely getting any. ",
      "![Dashboard Analytics](/blog/hero.png)",
      "That is actionable data. You immediately know you need to improve your store's call-to-action or reposition it on the page.",
      "## Own Your Branding",
      "Beyond analytics, a custom Link in Bio lets you control the narrative. You aren't just passing traffic to another app—you are welcoming them into your personal digital home, styled exactly the way you want.",
      "Without a proper Link in Bio, you are just guessing. With it, you are making smart decisions based on exactly what your audience is clicking. Don't leave your growth to chance—take control of your traffic."
    ]
  },
  {
    slug: "why-one-link-beats-a-link-list",
    title: "Why one good link beats a wall of links",
    description:
      "More links in your bio isn't always better. Here's how to choose the few that actually move people to act.",
    date: "2026-06-10",
    readingTime: "4 min read",
    category: "Strategy",
    image: "/blog/blog_one_link.png",
    content: [
      "It is tempting to add every link you have ever made to your bio page. The shop, the newsletter, three different videos, your old portfolio, that one tweet you are proud of. The logic feels right: more options, more chances someone clicks. In practice, the opposite usually happens.",
      "When a visitor lands on your page, they are making a quick decision about where to spend their attention. A long list forces them to read, compare and choose. Most people will not do that work. They scan for a second, feel a little overwhelmed, and leave. A short, confident page does the choosing for them.",
      "## Start with one goal",
      "Before you add a single link, ask what you most want a new visitor to do this month. Subscribe to your newsletter? Watch your latest video? Buy a product? Pick one. That becomes your primary link, and it should sit at the top with a clear, action-led title like \"Watch my latest video\" instead of a bare channel name.",
      "Everything else on the page supports that goal or gets cut. This is hard, because every link feels important to you. But your visitor does not share your context. They need a path, not a directory.",
      "## The Cost of Decision Fatigue",
      "When confronted with 15 different links, a psychological phenomenon called 'decision fatigue' kicks in. The brain tries to evaluate all options simultaneously, gets tired, and defaults to the easiest action: closing the tab. Fewer links mean higher overall click-through rates.",
      "## Write titles that promise something",
      "A link titled \"YouTube\" tells people where they will go. A link titled \"Watch: how I edit in 20 minutes\" tells people what they will get. The second one wins almost every time, because it speaks to a benefit rather than a destination.",
      "Keep titles short enough to read at a glance on a phone, and lead with a verb when you can. A small emoji at the start can help the eye find the right row quickly, but a row of competing emojis just adds noise.",
      "## Review it like a stranger",
      "Once a month, open your page as if you have never seen it. Does the first link match your current goal? Is anything out of date? Could two links become one? Trimming is not failure; it is maintenance. The best bio pages feel curated, not collected.",
      "## Rotate Instead of Stacking",
      "Instead of adding a new link at the bottom every time you create something, get into the habit of rotating. If you have a new video, replace the old video link. Keep your list lean and let your content shine.",
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
    image: "/blog/blog_anatomy.png",
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
      "## Why Speed Matters",
      "You have about three seconds before someone loses patience. Heavy images, complex animations, or slow server response times will kill your conversion rate before the user even sees your buttons. Keep it light, fast, and optimized.",
      "## The Power of Analytics",
      "Even the perfect anatomy needs constant testing. Keep an eye on your click-through rates. If your primary button isn't getting clicks, change the copy or the color. Anatomy is a starting point, but data is how you evolve.",
      "None of this requires design skills. It requires restraint and a clear sense of what you want people to do. Get the anatomy right and the page does the rest.",
    ],
  },
  {
    slug: "secure-cloud-sync-with-firebase",
    title: "Your Data, Your Rules: Secure Cloud Sync with Firebase",
    description:
      "A look at how LinkinBio keeps your profile synced across devices securely using Google Firestore, and what that means for your privacy.",
    date: "2026-05-28",
    readingTime: "4 min read",
    category: "Privacy",
    image: "/blog/blog_cloud.png",
    content: [
      "When we set out to build LinkinBio, we made a crucial decision: your profile data must be secure, fast, and instantly available across all your devices. To achieve this, we partnered with Google's robust infrastructure.",
      "## Powered by Google Firestore",
      "Your data—your bio, links, theme, and settings—is securely stored in Firebase Firestore. This enterprise-grade cloud database ensures that the moment you update a link on your phone, it instantly reflects on your desktop and for your audience. There is no refreshing or manual saving required.",
      "## Privacy First, Always",
      "We use Google Sign-In not to track your every move, but exclusively to authenticate you and secure your data. Your information is siloed to your account. We don't sell your personal details, and we only store what is strictly necessary to make your bio page function beautifully.",
      "## The Honest Trade-offs",
      "Relying on the cloud means you need an internet connection to make edits to your profile. However, this trade-off allows us to offer real-time analytics, instantaneous updates, and seamless device syncing. If you ever lose your phone or switch computers, your profile is perfectly preserved in the cloud, ready the moment you sign in.",
      "## Security Built-In",
      "With Google Firestore, your data is encrypted both in transit and at rest. This means that hackers can't intercept your information while you're updating your profile on a coffee shop Wi-Fi, nor can they access it easily from the servers.",
      "## Where This is Going",
      "Secure cloud storage is our foundation. It allows us to build powerful features like live click tracking, advanced aesthetic themes, and team collaborations without compromising speed or safety.",
      "## Preparing for the Future",
      "As we plan to introduce team management and multiple profile linking, a robust cloud infrastructure ensures that everything scales smoothly without any data conflicts or overwritten changes.",
      "We believe people shouldn't have to trade ownership of their information for a useful product. Utilizing Firebase is how we keep your data secure while giving you the best possible experience."
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
