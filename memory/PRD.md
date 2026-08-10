# PK Photography — Emergent2 (Next.js) Site + Goa Editorial Blog

## Problem statement
Pull the full public repo `github.com/pkwebapp/Emergent2` into /app without changing anything, then add a new editorial blog article — "Pre-Wedding, Couple & Portrait Shoots in Goa" at `/blog/pre-wedding-couple-portrait-shoot-locations-goa` — as one of the posts on the existing blog index.

## Architecture
- Next.js 15.5 (App Router) frontend, FastAPI reverse-proxy backend that forwards `/api/*` to Next.js API routes on port 3000, MongoDB.
- Supervisor already runs `yarn start` (= `next dev`) in `/app/frontend`.
- Existing blog posts live at `/app/frontend/app/blog/{slug}/page.js` and are indexed by `/app/frontend/app/blogs/posts.js` (rendered by `Journal.jsx`).

## What was added (untouched: everything else)
- `/app/frontend/app/blog/pre-wedding-couple-portrait-shoot-locations-goa/page.js` — server component with metadata, OG, FAQPage & Article JSON-LD, keywords.
- `/app/frontend/app/blog/pre-wedding-couple-portrait-shoot-locations-goa/GoaEditorial.jsx` — full client component (hero, sticky TOC + mobile pill bar, intro w/ animated stat counters, 5 zig-zag services, iPhone reel highlight, 4 parallax location cards, 3-package pricing w/ "Most Popular" badge, FAQ accordion, final CTA with Book / WhatsApp).
- `/app/frontend/app/blogs/posts.js` — one new entry prepended for the Goa blog (Category = Goa, 9 min read, Dec 1 2025).

## Design fit
- Reused the exact same visual system as the wedding-package editorial: Cormorant Garamond headlines, `#EEEAE1` cream base, `#161514` ink, `#FF5B22`/`#FF7A4d` orange accents, `.eyebrow` / `.link-underline` / `.lift` utilities, framer-motion Reveal/ParallaxImage/Counter patterns.
- Imagery pulled from the repo's existing `/public` assets (`/wedding/*`, `/outdoors/*`, `/destination-weddings.jpg`).

## SEO
- Canonical URL, OG, Twitter, keyword list, article + FAQPage JSON-LD, semantic H1 → H2 → H3, alt text with location + "pre-wedding shoot Goa".

## Known caveats
- Placeholder starting prices (₹18k / ₹42k / ₹75k) — swap for the real values.
- WhatsApp number reuses the existing `+91 8888766739` from other pages.
- Location images are drawn from the repo's existing wedding/outdoor folders as placeholders — swap once real Ashvem / Mandrem / Arambol / Vagator frames are ready.

## Update — Full-site audit + auth fix (Aug 2025)
- Removed orphaned next-auth `<SessionProvider>` from `app/providers.js` (app uses custom cookie auth, not next-auth) — this eliminated the repeating `CLIENT_FETCH_ERROR` (`/api/auth/session` 404) that appeared on every page.
- Added safe next-auth shims in `route.js` (`/auth/session`, `/auth/providers`, `/auth/csrf`, `/auth/_log`) as a defensive fallback.
- Rewrote orphaned pages `/login` and `/profile` to use the working custom Google auth (`/api/auth/me`, `/api/auth/logout`, Emergent OAuth → `/client`). `/signup` already used custom auth.
- Audit result: all 30 routes return 200; backend 20/20 API tests pass; frontend audit passed (auth pages, gallery title/location + no-lightbox, navigation). Benign 401 on `/api/auth/me` for logged-out users is expected. Dead next-auth template components (LoginPromptModal, GoogleLoginButton, ClientHome, Card.js) remain in `src/` but are not mounted anywhere.

## Update — Gallery Title + Location (Aug 2025)
- Media records now support a `location` field (Title = existing `alt`). Backend: POST/PATCH `/api/media` in `frontend/app/api/[[...path]]/route.js`.
- Admin `/admin/media`: each gallery image card now has editable **Title** + **Location** text inputs (auto-save on blur) for Galleries tab (Weddings/Events/Portraits-Headshots/Portfolio), Service Pages galleries, and Portfolio tab.
- Public pages: removed the "Open story" link and the full-screen lightbox from the Weddings mosaic (`services/weddings/page.js`), the generic service Portfolio Showcase (`services/[slug]/ServicePageClient.jsx`), and the `/gallery` page (`gallery/GalleryClient.jsx`). Tiles are now non-clickable and show Title + Location on hover.
