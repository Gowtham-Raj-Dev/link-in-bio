/** Keyword landing pages. One page per search phrase the site targets, so
 *  each keyword has a page whose title, H1 and copy are written for it.
 *  Every page links to its related pages and the footer links to all of
 *  them, so the set is connected and crawlable from anywhere on the site.
 *  New entries are picked up by the route, the sitemap and the footer. */

export interface LandingSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface LandingPage {
  slug: string;
  /** Short label used in the footer and related links. */
  label: string;
  /** The main phrase this page is written for. */
  keyword: string;
  /** Other phrases the page also covers (used in the keywords meta tag). */
  alsoFor: string[];
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: LandingSection[];
  steps: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "free-link-in-bio",
    label: "Free link in bio",
    keyword: "free link in bio",
    alsoFor: ["one link for all social media", "link in bio", "free bio link"],
    title: "Free Link in Bio: One Link for All Social Media",
    description:
      "Make a free link in bio page in two minutes: one link for Instagram, YouTube, WhatsApp and more, with modern templates and click analytics.",
    h1: "A free link in bio, with one link for all your social media",
    intro:
      "Most apps give you room for a single link. LinkinBio turns that one link into a page that holds all of them: your Instagram, YouTube channel, WhatsApp number, shop, portfolio and anything else you want people to find. It is free, it works on every phone, and you can set it up in about two minutes.",
    sections: [
      {
        heading: "What you get for free",
        body: [
          "There is no trial and no locked starter plan. Everything below is included on a free account during early access.",
        ],
        bullets: [
          "Unlimited links, with section headers to group them",
          "Modern templates with different layouts, button styles and fonts",
          "Your own background photo, with dimming and blur controls",
          "Social icons for Instagram, YouTube, WhatsApp, Telegram, LinkedIn, GitHub, X and more",
          "YouTube and Spotify links that play right on your page",
          "Profile view and link click counts",
          "A QR code for your page, ready to print or share",
        ],
      },
      {
        heading: "One link for all social media",
        body: [
          "Put your LinkinBio link in your Instagram bio, your YouTube channel description, your WhatsApp Business profile and your email signature. Whenever you change something, you update the page once and every place that links to it is up to date.",
          "People who tap your link see a clean page with big, easy buttons, so they reach the right place in one tap instead of searching for you on each app.",
        ],
      },
      {
        heading: "Free does not mean plain",
        body: [
          "Every template was designed to look good on a phone first. Pick a floating glass card, a colour banner with your photo on top, a bold outlined style or a quiet minimal page, and switch any time without losing your links.",
        ],
      },
    ],
    steps: [
      "Sign up free with Google or your email.",
      "Choose your username. Your link becomes linkinbio.codelove.in/u/yourname.",
      "Add your photo, a short bio and your links.",
      "Pick a template and copy your link into your bios.",
    ],
    faqs: [
      {
        question: "Is LinkinBio really free?",
        answer:
          "Yes. All current features are free during early access, and you do not need a credit card to sign up.",
      },
      {
        question: "How many links can I add?",
        answer: "As many as you like. There is no limit on links or section headers.",
      },
      {
        question: "Can I use one link for Instagram, YouTube and WhatsApp?",
        answer:
          "Yes. That is what a link in bio page is for. Add your LinkinBio link to each profile and keep all your other links on the page.",
      },
    ],
    related: ["link-in-bio-for-instagram", "linktree-alternative", "bio-link-maker"],
  },
  {
    slug: "link-in-bio-for-instagram",
    label: "Link in bio for Instagram",
    keyword: "link in bio for Instagram",
    alsoFor: [
      "Instagram bio link",
      "bio link for Instagram free",
      "multiple links in Instagram bio",
    ],
    title: "Link in Bio for Instagram: Multiple Links, Free",
    description:
      "Add multiple links to your Instagram bio with one free link in bio page. Step-by-step setup, tips for more taps and modern templates.",
    h1: "Link in bio for Instagram: share every link from one bio",
    intro:
      "Instagram lets you add links to your profile, but visitors still see a short list with no design, no order and no idea which one to tap. A link in bio page fixes that. You put one link in your Instagram bio, and it opens a page with all your links laid out as clear, tappable buttons.",
    sections: [
      {
        heading: "How to add your link in bio to Instagram",
        body: [
          "Open Instagram, go to your profile and tap Edit profile. Tap Links, then Add external link. Paste your LinkinBio address, give it a title such as \"My links\", and save. Your link now shows under your bio.",
          "After that, you never need to edit your Instagram profile again to change a link. Update your LinkinBio page and the change is live straight away.",
        ],
      },
      {
        heading: "Why one Instagram bio link works better than many",
        body: [
          "A single link with a clear call to action gets more taps than a crowded list. On your LinkinBio page you choose the order, add headers like \"Shop\" or \"Watch\", and make your most important link stand out with a subtle animation.",
        ],
        bullets: [
          "Put your newest post, product or video at the top",
          "Group links with headers so people find things fast",
          "Use your Instagram photo and colours so the page feels like you",
          "Check which links get tapped and move the winners up",
        ],
      },
      {
        heading: "Made for how Instagram users browse",
        body: [
          "Most people open your link inside the Instagram app on a phone. Every LinkinBio template is built for that small screen first, with large buttons, readable text and quick loading, so visitors do not bounce before they tap.",
        ],
      },
    ],
    steps: [
      "Create your free LinkinBio page and add your links.",
      "Copy your page link from the dashboard.",
      "In Instagram, open Edit profile, then Links, then Add external link.",
      "Paste the link, save, and tell your followers to tap the link in bio.",
    ],
    faqs: [
      {
        question: "How many links can I add to my Instagram bio?",
        answer:
          "Instagram shows a small number of links on your profile. With a link in bio page you add one link to Instagram and put as many links as you want on the page.",
      },
      {
        question: "Is a link in bio for Instagram free?",
        answer: "Yes, LinkinBio is free to use, with unlimited links and no credit card.",
      },
      {
        question: "Can I see how many people tap my Instagram bio link?",
        answer:
          "Yes. Your dashboard shows profile views and how many times each link was tapped.",
      },
    ],
    related: ["free-link-in-bio", "link-in-bio-with-analytics", "link-in-bio-for-youtube"],
  },
  {
    slug: "linktree-alternative",
    label: "Free Linktree alternative",
    keyword: "Linktree alternative",
    alsoFor: ["free Linktree alternative", "linktree free alternative India", "Linktree vs LinkinBio"],
    title: "Free Linktree Alternative with Modern Templates",
    description:
      "A free Linktree alternative by CodeLove: unlimited links, modern templates, background photos, embeds and click analytics, all free.",
    h1: "A free Linktree alternative that looks modern out of the box",
    intro:
      "Linktree made the link in bio idea popular, but many of the features people want sit behind a paid plan. LinkinBio is a free alternative from CodeLove. You get unlimited links, designed templates, your own background photo, media embeds and basic analytics without paying.",
    sections: [
      {
        heading: "What LinkinBio includes free",
        body: [
          "These features are all part of a free LinkinBio account today:",
        ],
        bullets: [
          "Unlimited links and section headers",
          "Templates with their own layout, button shape and font, not just a colour swap",
          "Custom background photos with dimming, blur and position controls",
          "YouTube and Spotify embeds that play on your page",
          "Profile views and per-link click counts",
          "A QR code for your page",
          "Sign in with Google or email, with your page synced across devices",
        ],
      },
      {
        heading: "Who switches to a Linktree alternative",
        body: [
          "Creators who want a page that looks designed without paying for a pro plan. Small businesses in India who mostly need WhatsApp, Google Maps and a menu link. Students and freelancers who want a clean portfolio link that is easy to share.",
        ],
      },
      {
        heading: "Moving over takes minutes",
        body: [
          "There is no import step to learn. Sign up, add the same links you have today, pick a template, and replace the old link in your Instagram, YouTube and WhatsApp bios with your new one.",
        ],
      },
    ],
    steps: [
      "Sign up free and pick your username.",
      "Copy your links over and add headers to group them.",
      "Choose a template or upload your own background photo.",
      "Swap the old link in your social bios for your LinkinBio link.",
    ],
    faqs: [
      {
        question: "Is LinkinBio a free alternative to Linktree?",
        answer:
          "Yes. LinkinBio is a free link in bio tool with unlimited links, templates, custom backgrounds, embeds and click analytics.",
      },
      {
        question: "Is LinkinBio made in India?",
        answer:
          "Yes. LinkinBio is built by CodeLove in India, with features that suit Indian creators and small businesses, such as WhatsApp order links.",
      },
      {
        question: "Can I keep my links if I switch?",
        answer:
          "Add the same links to LinkinBio, then update the link in your social bios. Your followers will see the new page right away.",
      },
    ],
    related: ["free-link-in-bio", "link-in-bio-india", "bio-link-maker"],
  },
  {
    slug: "whatsapp-link-in-bio",
    label: "WhatsApp link in bio",
    keyword: "WhatsApp link in bio",
    alsoFor: ["WhatsApp order link", "click to chat link in bio", "WhatsApp business link"],
    title: "WhatsApp Link in Bio: Chat and Order in One Tap",
    description:
      "Add a WhatsApp link in bio so customers can chat or order in one tap. How to make a click-to-chat link and where to put it.",
    h1: "WhatsApp link in bio: turn profile visits into chats",
    intro:
      "For many small businesses and freelancers, WhatsApp is where the sale actually happens. A WhatsApp link in your bio lets a visitor open a chat with you in one tap, without saving your number first. On a LinkinBio page you can put that chat button right next to your menu, prices and location.",
    sections: [
      {
        heading: "How to make a WhatsApp click-to-chat link",
        body: [
          "WhatsApp supports links in the form wa.me/ followed by your full phone number with the country code and no plus sign, spaces or dashes. For an Indian number that looks like wa.me/919876543210.",
          "You can add a ready-made message too. Add ?text= and your message after the number, so the chat opens with something like \"Hi, I would like to place an order\" already typed.",
        ],
      },
      {
        heading: "Where to put your WhatsApp link",
        body: [
          "Add it as the first button on your LinkinBio page and also as a WhatsApp social icon. Then share your LinkinBio link everywhere: your Instagram bio, Google Business profile, YouTube description and printed QR code on your shop counter.",
        ],
        bullets: [
          "Order on WhatsApp, as your top button",
          "Menu or price list, as a PDF or image link",
          "Your location on Google Maps",
          "Customer reviews and photos of your work",
        ],
      },
      {
        heading: "Know which button gets the chats",
        body: [
          "LinkinBio counts taps on every link, so you can see whether people go straight to WhatsApp or check your menu first, and arrange the page to match.",
        ],
      },
    ],
    steps: [
      "Build your wa.me link with your number and an optional message.",
      "Add it to your LinkinBio page as a link and as a WhatsApp icon.",
      "Add your menu, location and reviews below it.",
      "Share your LinkinBio link and print its QR code for your shop.",
    ],
    faqs: [
      {
        question: "What is a WhatsApp link in bio?",
        answer:
          "It is a link in your social media bio that opens a WhatsApp chat with you directly, so people can message you without saving your number.",
      },
      {
        question: "Does a WhatsApp link work for WhatsApp Business?",
        answer:
          "Yes. The same wa.me link format works for WhatsApp and WhatsApp Business numbers.",
      },
      {
        question: "Can I add a WhatsApp link and other links together?",
        answer:
          "Yes. A LinkinBio page holds your WhatsApp link along with your menu, maps location, shop and social profiles.",
      },
    ],
    related: ["link-in-bio-for-small-business", "link-in-bio-india", "free-link-in-bio"],
  },
  {
    slug: "link-in-bio-for-small-business",
    label: "Link in bio for small business",
    keyword: "link in bio for small business",
    alsoFor: ["small business bio link", "link in bio for shops", "link in bio for home business"],
    title: "Link in Bio for Small Business: Orders & Maps",
    description:
      "A free link in bio for small business: your WhatsApp order link, menu, Google Maps location, payments and reviews behind one link.",
    h1: "Link in bio for small business: everything a customer needs, one tap away",
    intro:
      "A customer who finds you on Instagram usually wants three things: what you sell, how much it costs and how to order. A link in bio page answers all three. LinkinBio gives your shop, home bakery, salon or studio a simple page with your order link, menu, location and reviews, free.",
    sections: [
      {
        heading: "Links every small business page should have",
        body: ["Start with these and add more as you grow:"],
        bullets: [
          "Order on WhatsApp, with a ready-typed message",
          "Menu, catalogue or price list",
          "Google Maps location and opening hours",
          "A way to pay, such as your UPI or payment page",
          "Customer reviews",
          "Current offers or new arrivals",
        ],
      },
      {
        heading: "Look professional without a website",
        body: [
          "You do not need to build or pay for a full website to look trustworthy. Add your logo as the profile photo, write one line about what you do, and pick a clean template. Your page is ready to share in minutes.",
          "Print the QR code from your dashboard on bills, packaging and your shop counter, so walk-in customers can find your menu and follow you too.",
        ],
      },
      {
        heading: "See what customers tap",
        body: [
          "The dashboard shows how many people visited your page and which links they tapped. If the price list gets the most taps, move it up. If nobody opens a link, replace it.",
        ],
      },
    ],
    steps: [
      "Sign up free and use your business name as your username.",
      "Add your logo, a one-line description and your order link.",
      "Add your menu, location, payment and review links.",
      "Share the link on Instagram, Google and WhatsApp, and print the QR code.",
    ],
    faqs: [
      {
        question: "Do I need a website if I have a link in bio page?",
        answer:
          "Many small businesses start with only a link in bio page. It holds your order link, menu, location and reviews, and you can add a website link later.",
      },
      {
        question: "Can I add my shop's location?",
        answer: "Yes. Add your Google Maps link as a button so customers can get directions in one tap.",
      },
      {
        question: "Is there a QR code for my page?",
        answer:
          "Yes. Your dashboard creates a QR code for your page that you can download and print.",
      },
    ],
    related: ["whatsapp-link-in-bio", "link-in-bio-india", "link-in-bio-with-analytics"],
  },
  {
    slug: "link-in-bio-india",
    label: "Link in bio India",
    keyword: "link in bio India",
    alsoFor: ["Indian link in bio tool", "link in bio for Indian creators", "bio link India free"],
    title: "Link in Bio India: Free Bio Link Made in India",
    description:
      "Free link in bio tool made in India by CodeLove. WhatsApp, UPI and Google Maps links, modern templates and analytics for Indian creators.",
    h1: "Link in bio, made in India for Indian creators and businesses",
    intro:
      "LinkinBio is built in India by CodeLove. It is free, fast on everyday phones and mobile data, and made for the way people in India actually share and sell: through Instagram, YouTube and WhatsApp.",
    sections: [
      {
        heading: "Built for how India shares",
        body: [
          "Indian customers often move from Instagram straight to a WhatsApp chat, then pay over UPI. A LinkinBio page lets you line those steps up in order, so a follower can go from your post to a chat to a payment without hunting for details.",
        ],
        bullets: [
          "WhatsApp chat and order links",
          "UPI or payment page links",
          "Google Maps location for your shop",
          "YouTube videos that play on your page",
          "Instagram, Telegram and Threads icons",
        ],
      },
      {
        heading: "Free, with nothing to pay in dollars",
        body: [
          "Many link in bio tools charge in US dollars for the features creators want. LinkinBio is free during early access, with no card needed, so students, home businesses and new creators can start today.",
        ],
      },
      {
        heading: "Light and quick on mobile data",
        body: [
          "Your page is a lightweight web page that loads quickly even on a slower connection, and it opens fine inside the Instagram and WhatsApp in-app browsers.",
        ],
      },
    ],
    steps: [
      "Sign up free with Google or email.",
      "Add your WhatsApp, UPI, Maps and social links.",
      "Pick a template that matches your brand.",
      "Share your link in every bio and on printed QR codes.",
    ],
    faqs: [
      {
        question: "Is LinkinBio an Indian company?",
        answer: "LinkinBio is built in India by CodeLove (codelove.in), founded by Gowtham.",
      },
      {
        question: "Can I add a UPI payment link?",
        answer:
          "Yes. Add any payment page or UPI link as a button on your page, alongside your WhatsApp and shop links.",
      },
      {
        question: "Does it cost anything?",
        answer: "No. LinkinBio is free during early access and needs no credit card.",
      },
    ],
    related: ["whatsapp-link-in-bio", "linktree-alternative", "link-in-bio-for-small-business"],
  },
  {
    slug: "bio-link-maker",
    label: "Bio link maker",
    keyword: "bio link maker",
    alsoFor: ["link in bio page builder", "link in bio website", "bio page maker"],
    title: "Bio Link Maker: Make a Link in Bio Page Free",
    description:
      "A free bio link maker and link in bio page builder. Add your photo, links and socials, pick a template, and share your link and QR code.",
    h1: "Bio link maker: build a link in bio page in two minutes",
    intro:
      "LinkinBio is a bio link maker that does the design for you. You bring your photo, a short bio and your links. Pick a template and you get a finished page with its own link and QR code, ready to share.",
    sections: [
      {
        heading: "A page builder without the fiddly parts",
        body: [
          "There are no blocks to drag around and no code to write. Add links in a list, reorder them by dragging, and see every change in a live phone preview next to the editor.",
        ],
        bullets: [
          "Drag-and-drop link ordering",
          "Section headers to split your page into groups",
          "Icons for every link",
          "Optional pulse, bounce or wobble animation for your top link",
          "Live preview while you edit",
        ],
      },
      {
        heading: "Templates with real layouts",
        body: [
          "Each template has its own layout, button shape, shadow and font. Choose a floating glass card, a cover banner with your photo, a bold outlined pop style, an editorial serif or a developer terminal look. You can also use your own background photo.",
        ],
      },
      {
        heading: "Your link in bio website, without a website",
        body: [
          "Your page lives at linkinbio.codelove.in/u/yourname. It works like a small personal website you can share anywhere, with SEO title and description settings so it shows the right text when shared.",
        ],
      },
    ],
    steps: [
      "Sign up free and choose your username.",
      "Add your photo, name and bio.",
      "Add and order your links, then pick a template.",
      "Copy your link or download the QR code.",
    ],
    faqs: [
      {
        question: "What is a bio link maker?",
        answer:
          "It is a tool that builds a single web page holding all your links, so you can share one link in your social media bios.",
      },
      {
        question: "Do I need design or coding skills?",
        answer: "No. Pick a template, add your links, and the page is designed for you.",
      },
      {
        question: "Can I change my template later?",
        answer: "Yes. Switch templates any time and your links stay as they are.",
      },
    ],
    related: ["free-link-in-bio", "linktree-alternative", "link-in-bio-for-youtube"],
  },
  {
    slug: "link-in-bio-with-analytics",
    label: "Link in bio with analytics",
    keyword: "link in bio with analytics",
    alsoFor: ["link in bio click tracking", "bio link analytics", "link click counter"],
    title: "Link in Bio with Analytics: Views and Clicks Free",
    description:
      "A free link in bio with analytics. Track profile views and clicks on every link, see what your audience taps, and get more clicks.",
    h1: "Link in bio with analytics: know what your audience taps",
    intro:
      "A link in bio page is more useful when you can see how it performs. LinkinBio counts how many people view your page and how many times each link is tapped, so you can stop guessing and put your best links first.",
    sections: [
      {
        heading: "What LinkinBio tracks",
        body: [
          "Your dashboard shows the numbers that help you decide what to change:",
        ],
        bullets: [
          "Total profile views, with a views chart",
          "Total link clicks",
          "Clicks for each individual link, shown next to it in your links list",
        ],
      },
      {
        heading: "Use the numbers to get more clicks",
        body: [
          "Look at which links get the most taps and move them to the top. Rename links that nobody taps, or remove them. Add a short animation to the one link you most want people to open, then check the next week whether its clicks went up.",
        ],
      },
      {
        heading: "Nothing extra for your visitors to do",
        body: [
          "Visitors do not need an account or an app. Views and clicks are counted automatically when people open your page and tap your links.",
        ],
      },
    ],
    steps: [
      "Create your free page and share your link.",
      "Open the dashboard to see views and clicks.",
      "Move your most-tapped links to the top.",
      "Test a new order or title and compare the next week.",
    ],
    faqs: [
      {
        question: "Is link in bio analytics free?",
        answer: "Yes. Profile views and link click counts are included on free accounts.",
      },
      {
        question: "Can I see clicks for each link?",
        answer: "Yes. Your links list shows how many times each link was tapped.",
      },
      {
        question: "Do my visitors need an account?",
        answer: "No. Anyone can open your page, and views and clicks are counted automatically.",
      },
    ],
    related: ["link-in-bio-for-instagram", "link-in-bio-for-small-business", "free-link-in-bio"],
  },
  {
    slug: "link-in-bio-for-youtube",
    label: "Link in bio for YouTube",
    keyword: "link in bio for YouTube",
    alsoFor: ["YouTube creator link in bio", "YouTube channel links page", "link in bio for creators"],
    title: "Link in Bio for YouTube: Videos, Gear, Socials",
    description:
      "A free link in bio for YouTube creators. Play your latest video on your page and link your gear, sponsors and socials from one link.",
    h1: "Link in bio for YouTube creators",
    intro:
      "YouTube viewers who want more from you need one place to go. A LinkinBio page holds your latest video, your other socials, gear list, sponsor codes and business email. Put the link in your channel header, video descriptions and pinned comments.",
    sections: [
      {
        heading: "Play your latest video on your page",
        body: [
          "Paste a YouTube video link and LinkinBio shows it as a playable video right on your page. Fans from Instagram or X can watch without leaving, then tap through to subscribe.",
        ],
      },
      {
        heading: "Links YouTube creators usually add",
        body: ["A simple order that works well for most channels:"],
        bullets: [
          "Latest video, embedded at the top",
          "Subscribe link to your channel",
          "Gear or setup list with affiliate links",
          "Sponsor codes and offers",
          "Instagram, X, Threads and Telegram icons",
          "Business email for brand deals",
        ],
      },
      {
        heading: "One link for your channel, Shorts and other apps",
        body: [
          "Use the same LinkinBio link in your channel links, Shorts descriptions and Instagram bio. When you post a new video, update the top link once and every place points to it.",
        ],
      },
    ],
    steps: [
      "Sign up free and pick your channel name as username.",
      "Paste your latest video link so it plays on your page.",
      "Add your gear, sponsor and social links.",
      "Put your LinkinBio link in your channel header and descriptions.",
    ],
    faqs: [
      {
        question: "Can I embed YouTube videos on my link in bio page?",
        answer: "Yes. Paste any YouTube video link and it plays directly on your page.",
      },
      {
        question: "Can I add Spotify too?",
        answer: "Yes. Spotify track, album and playlist links also play on your page.",
      },
      {
        question: "Is it free for creators?",
        answer: "Yes. LinkinBio is free with unlimited links and embeds.",
      },
    ],
    related: ["link-in-bio-for-instagram", "bio-link-maker", "link-in-bio-with-analytics"],
  },
];

export function getLandingPage(slug: string) {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
