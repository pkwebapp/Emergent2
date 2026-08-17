# PK Photography — Product Requirements & Changelog

## Product
Marketing/portfolio website for PK Photography (Mumbai · Goa · India).
Stack: Next.js 15.5 (frontend + API routes at `/app/frontend`), FastAPI reverse-proxy on :8001 → Next :3000, MongoDB. Cloudinary for media (signed uploads).

## Architecture notes
- API logic: `/app/frontend/app/api/[[...path]]/route.js`
- Shared site chrome + contact + helpers: `/app/frontend/components/site/Chrome.jsx`
- Generic service page: `/app/frontend/app/services/[slug]/ServicePageClient.jsx`
- Dedicated service pages: `weddings/page.js`, `boudoir-shoots/`, `live-streaming/`, `events/`, `editorial-portfolio/`, `drone-services/`, `portraits-headshots/`
- SEO: `/app/frontend/lib/seo.js`; Services: `/app/frontend/lib/services.js`

## Implemented (chronological)
- Boudoir page redesign (dedicated route, Indian touch, testimonials) — screenshot-tested.
- Cloudinary signed uploads + delete flow — API-tested.
- ESLint flat config added (`eslint.config.mjs` at `/app` and `/app/frontend`).
- **2026-06 Wedding films**: wired 4 YouTube links to the "Cinematic stories" cards on `/services/weddings` (`WeddingFilms`/`VideoModal` in `weddings/page.js`). Links: pTd55VFy8JM, Z58zTK4h34s, p7lVQdeQFpM, 1dovh9ArbEk. FINDING: only 1dovh9ArbEk has "Allow embedding" ON; other 3 show "Video unavailable" (owner disabled embedding; p7lVQdeQFpM belongs to another channel "Shaadi Films"). Awaiting user decision (enable embedding / open-in-new-tab fallback / hybrid).
- **2026-06 Boudoir mobile crop fix**: `grid grid-cols-12` sections (About, Covers, Why, FAQ, Final CTA) in `BoudoirPageClient.jsx` had large non-responsive gaps forcing overflow (text cropped by section `overflow-hidden`) on mobile. Fixed by stacking `flex flex-col` on mobile → `md:grid md:grid-cols-12`; headings scaled `text-4xl sm:text-5xl md:*` with `break-words`. Verified by testing_agent at 360/390 widths (100%, 0 bugs).
- **2026-06 Package in booking**: all pricing "Book this package"/"Book Now" links pass `?service=&package=&price=`. Booking form (`app/booking/page.js`) auto-selects Service, shows a "Selected package" banner (Clear button), pre-fills the message, and submits `package` (stored in `contact_enquiries`). Verified.
- **2026-06 Enquiry tracking**: global click listener (`EnquiryTracker` in Chrome.jsx, rendered in SiteShell) logs every WhatsApp click (path, page label, message text, href) to Mongo `whatsapp_enquiries` via same-origin `sendBeacon` (text/plain to avoid preflight). Backend: POST `/api/enquiries/track` (public), GET `/api/enquiries/stats` (admin). Admin dashboard at `/admin/enquiries` (token-gated) shows total, ranking by page, and recent clicks. Verified end-to-end.
- **2026-06 Pricing package CTAs**: every service page pricing card now has BOTH a "Book this package" button and an "Enquire on WhatsApp" button. WhatsApp message includes package name + price via `waLink({service,page,pkg,price})`. Covered: weddings, live-streaming, events, editorial-portfolio, drone-services, portraits-headshots, boudoir-shoots, and dynamic [slug] pages. Verified live.
- **2026-06 WhatsApp enquiry auto-text**: added `waLink({service,page})` + `pageLabel()` in `Chrome.jsx`. All WhatsApp enquire links now open with a pre-filled message containing service name + page name. Global float + footer auto-derive page via `usePathname`. Updated: home, services listing, all service pages, pricing custom-quote, booking. Pricing cards already had detailed prefilled messages. Verified live.

## Backlog / open
- P1: Decide embedding approach for the 3 non-embeddable wedding films (recommended: hybrid inline+new-tab fallback). Also consider updating card titles/durations to match real videos (Aspen & Tyrone, Yogesh & Niyati).
- P2: User verification of boudoir redesign visuals and admin Cloudinary upload/delete in the admin UI.
- Blog inline WhatsApp CTAs still use a raw `WHATSAPP` constant (global float already adds page context on those pages).
