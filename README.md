# LinkinBio

> One Link. Unlimited Possibilities.

A premium, privacy-first **link in bio** SaaS built with **Next.js (App Router)**,
**TypeScript**, **Tailwind CSS**, **Firebase Authentication** and **Framer Motion**.

Built by [CodeLove.in](https://codelove.in) · Founder: **Gowtham**

---

## ✨ Highlights

- **Premium marketing site** — hero with animated phone mockup, features, roadmap, FAQ, dark/light mode.
- **Google Sign-In only** via Firebase Authentication (no passwords).
- **Privacy-first MVP** — all profile data, links, socials, themes and settings are stored **only in the browser's local storage**. Nothing is saved on a server.
- **Full creator dashboard** — Overview, Profile editor, drag-and-drop Links, 10 Themes with live preview, Social links, Settings (export / clear data).
- **Public profile page** at `/u/[username]` with a beautiful, mobile-first layout.
- **SEO ready** — About, Privacy, Terms, Contact, Blog pages, Open Graph tags, JSON-LD structured data, `sitemap.xml` and `robots.txt`.
- **Future-ready architecture** — the entire data layer lives in [`src/lib/storage.ts`](src/lib/storage.ts), so swapping local storage for a database later touches a single file.

> ℹ️ This project was scaffolded with the latest stable **Next.js 16** (App Router, React 19, Tailwind v4). The brief referenced Next.js 15; Next 16 is the current stable release and is fully App-Router compatible.

---

## 🚀 Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

1. Create a project at the [Firebase Console](https://console.firebase.google.com).
2. Enable **Authentication → Sign-in method → Google**.
3. Add a **Web app** and copy its config values.
4. Copy the env template and fill it in:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> Add your deployment domain (and `localhost`) under **Authentication → Settings → Authorized domains** in Firebase.
> The app runs without keys, but Google Sign-In stays disabled and shows a friendly notice until they are added.

### 3. Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Try the demo page at `/u/ariacreates`.

---

## 📦 Deploy to Firebase Hosting

This app uses Firebase Hosting's **web frameworks** support, which detects Next.js automatically.

```bash
npm install -g firebase-tools
firebase login
firebase experiments:enable webframeworks

# set your project id in .firebaserc, then:
firebase deploy
```

- The public profile route `/u/[username]` is server-rendered on demand, so SSR requires the **Blaze (pay-as-you-go)** plan, which provisions the backend automatically.
- Remember to add your `*.web.app` / `*.firebaseapp.com` domain to Firebase **Authorized domains**.

Other hosts (Vercel, Netlify, etc.) work out of the box with `npm run build`.

---

## 🗂️ Project structure

```
src/
├─ app/
│  ├─ (marketing)/        # Public site: landing, about, privacy, terms, contact, blog
│  ├─ dashboard/          # Auth-protected creator dashboard
│  ├─ u/[username]/       # Public profile page
│  ├─ layout.tsx          # Root layout + providers + SEO metadata
│  ├─ sitemap.ts          # sitemap.xml
│  └─ robots.ts           # robots.txt
├─ components/
│  ├─ ui/                 # Reusable primitives (button, card, input, modal, …)
│  ├─ auth/               # Login modal, user menu, protected route
│  ├─ landing/            # Landing page sections
│  ├─ dashboard/          # Dashboard shell / sidebar
│  ├─ profile/            # Shared public profile renderer + preview frame
│  ├─ marketing/          # Phone mockup, banners, prose, contact form
│  ├─ brand/              # Logo + social brand icons
│  └─ providers/          # Theme + app providers
├─ hooks/                 # use-app-data
└─ lib/                   # firebase, auth-context, storage, themes, types, constants, blog
```

## 🧱 Data layer

All persistence goes through [`src/lib/storage.ts`](src/lib/storage.ts):

- Data is namespaced per Firebase `uid`.
- A small `username → uid` registry powers the `/u/[username]` lookup.
- Helpers: `loadData`, `saveData`, `getOrCreateData`, `loadPublicProfile`, `exportData`, `clearData`.

When you're ready for cloud sync, reimplement these functions against your database — the rest of the app is unchanged.

---

## 🛣️ Roadmap

Phase 1 — Local Profile Builder ✅ · Phase 2 — Cloud Storage · Phase 3 — Analytics ·
Phase 4 — Custom Domains · Phase 5 — Premium Features

---

Built with ❤️ by **CodeLove.in** — Founder **Gowtham**.
