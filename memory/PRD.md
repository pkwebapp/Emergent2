# PK Photography — Editorial Blog Page

## Problem statement
Add a new magazine-style blog article to the PK Photography site:
`/blog/pre-wedding-couple-portrait-shoot-locations-goa` — long-form guide to
pre-wedding, couple, and portrait shoots in Goa (locations, services,
packages, FAQ, final CTA).

## Architecture
- Frontend-only feature (React + CRACO). No backend/DB changes.
- Route added in `App.js` under BrowserRouter → `/blog/pre-wedding-couple-portrait-shoot-locations-goa` (also default `/` for now).
- Smooth momentum scrolling via `lenis` wrapper `SmoothScroll` component.
- Scroll-reveal & parallax micro-interactions via `framer-motion`.
- Shadcn Accordion used for FAQ; JSON-LD `FAQPage` and `Article` structured data emitted.

## Design system
- Palette (HSL variables in `index.css`): cream/sand base, charcoal ink,
  sunset gold + gold-deep accent, ocean teal secondary.
- Fonts: Fraunces + Cormorant Garamond for display headings; Inter for
  body; JetBrains Mono for chapter numbers / labels.
- Editorial touches: grain overlay, kinetic on-load line reveals,
  numbered manifesto chapters, editorial marquee, sticky TOC (2xl+
  left rail, pill-bar below).

## Sections
1. Hero (parallax cinematic image, masked line-by-line headline)
2. Sticky TOC (2xl left rail / mobile pill bar)
3. Intro (two-column + trust stats: 12+ yrs · 2000+ · Mumbai · Goa · Delhi)
4. Editorial location marquee
5. Services zig-zag (Pre-Wedding, Couple, Portrait, Outdoor Portfolio,
   Maternity, Baby) + highlighted iPhone Reel dark card
6. Location Guide (Ashvem/Mandrem, Arambol, Vagator/Chapora, Villa) with
   scroll-parallax hero images and icon rows
7. Packages (Hourly / Half-Day / Full-Day with Most Popular badge on
   Full-Day) + custom quote CTA
8. FAQ Accordion (6 Qs) with FAQPage JSON-LD
9. Final CTA (Book Now → /booking, WhatsApp → wa.me, email link)
10. Footer

## Files added / modified
- `/app/frontend/public/index.html` — meta tags, OG, Google Fonts.
- `/app/frontend/src/index.css` — palette, typography, marquee, grain, scroll indicator.
- `/app/frontend/src/App.js` — router with new blog route.
- `/app/frontend/src/App.css` — minimal baseline.
- `/app/frontend/src/pages/BlogGoa.jsx` — page composition + Article JSON-LD.
- `/app/frontend/src/components/blog/*` — SmoothScroll, Navbar, Hero, TOC, Intro, Marquee, Services, Locations, Packages, FAQ, CTA, Footer.
- `/app/frontend/src/constants/testIds/blog.js` — data-testid registry.
- `lenis@1.1.20` added to package.json.

## Implemented (Dec 2025)
- Full editorial blog page live at
  `/blog/pre-wedding-couple-portrait-shoot-locations-goa`
- Responsive at 390 / 768 / 1440 / 1920+
- FAQPage & Article structured data
- Semantic H1 → H2 per section → H3 per service/location
- Internal links to /services/weddings, /services/portraits,
  /services/maternity-baby, /booking
- Placeholder WhatsApp number (`+91 99999 99999`) — replace with real one
- Placeholder starting prices — replace with real pricing

## Backlog / next steps
- P1: Client to supply real photos to replace stock Unsplash/Pexels imagery
- P1: Replace placeholder WhatsApp number & pricing
- P2: Additional blog articles reusing this component system
- P2: MDX/CMS pipeline so content is editable without code changes
- P2: Backend endpoint for the booking form & lead capture
