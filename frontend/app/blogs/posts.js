// Shared, framework-agnostic blog data (no 'use client' — importable by both
// the server page for schema/metadata and the client Journal component).

export const CATEGORIES = [
  { slug: 'all', label: 'All Stories', color: '#FF5B22' },
  { slug: 'weddings', label: 'Weddings', color: '#B8863B' },
  { slug: 'corporate', label: 'Corporate & Events', color: '#3E4A52' },
  { slug: 'goa', label: 'Goa', color: '#2E7D74' },
  { slug: 'mumbai', label: 'Mumbai', color: '#FF5B22' },
  { slug: 'guides', label: 'Planning Guides', color: '#8E3B2E' },
  { slug: 'bts', label: 'Behind the Scenes', color: '#6B6258' },
]

export const catColor = (slug) => CATEGORIES.find((c) => c.slug === slug)?.color || '#FF5B22'

export const POSTS = [
  {
    id: 'pre-wedding-goa', category: 'Goa', cats: ['goa', 'weddings', 'guides'],
    title: 'Pre-Wedding, Couple & Portrait Shoots in Goa: The Complete Guide',
    excerpt: 'Ashvem, Mandrem, Arambol, Vagator & private villas — the locations, services and packages behind a PK Photography Goa shoot.',
    image: '/wedding/preWedding.jpg', date: 'Dec 1, 2025', read: '9 min read',
    href: '/blog/pre-wedding-couple-portrait-shoot-locations-goa',
  },
  {
    id: 'wedding-package', category: 'Weddings', cats: ['weddings', 'guides'],
    title: 'What’s Included in Our Wedding Photography Package: A Complete Breakdown',
    excerpt: 'From candid emotion to cinematic drama — everything that goes into a PK Photography wedding, explained.',
    image: '/wedding/cover.jpg', date: 'Aug 3, 2026', read: '8 min read',
    href: '/blog/whats-included-wedding-photography-package',
  },
  {
    id: 'goa-destination', category: 'Goa', cats: ['goa', 'guides'],
    title: 'Planning a Destination Wedding in Goa: The Complete Field Guide',
    excerpt: 'Beachfront ceremonies, golden-hour light and drone-friendly venues — what to know before you book.',
    image: '/destination-weddings.jpg', date: 'Jul 28, 2026', read: '6 min read',
    href: '/services/weddings',
  },
  {
    id: 'corporate-playbook', category: 'Corporate & Events', cats: ['corporate', 'goa', 'guides'],
    title: 'Corporate Tour & Offsite Events in Goa: What Our Coverage Covers',
    excerpt: 'Conferences, team-building, gala nights, drone shots, branded films and same-day reels — the full corporate offsite package, explained.',
    image: '/event-photography-cover.jpg', date: 'Aug 6, 2026', read: '7 min read',
    href: '/blog/corporate-tour-offsite-events-goa-photography-package',
  },
  {
    id: 'candid-vs-traditional', category: 'Weddings', cats: ['weddings', 'guides'],
    title: 'Candid vs Traditional: Which Wedding Coverage Do You Actually Need?',
    excerpt: 'Two very different crafts, one complete story. Here’s how to choose the right balance for your day.',
    image: '/wedding/emotions.jpg', date: 'Jul 15, 2026', read: '4 min read',
    href: '/blog/whats-included-wedding-photography-package#candid',
  },
  {
    id: 'mumbai-venues', category: 'Mumbai', cats: ['mumbai', 'weddings'],
    title: 'The Best Mumbai Wedding Venues for Beautiful Photographs',
    excerpt: 'From heritage banquets to sea-facing rooftops — venues that photograph as good as they feel.',
    image: '/wedding-coverage.jpg', date: 'Jun 30, 2026', read: '5 min read',
    href: '/services/weddings',
  },
  {
    id: 'cinematic-film', category: 'Behind the Scenes', cats: ['bts'],
    title: 'Inside a Cinematic Wedding Film Shoot',
    excerpt: 'Movement, music and colour grading — a look at how a highlight film comes together on the day.',
    image: '/cinematic-video-aerials.jpg', date: 'Jun 22, 2026', read: '5 min read',
    href: '/blog/whats-included-wedding-photography-package#cinematic-videography',
  },
  {
    id: 'live-streaming', category: 'Corporate & Events', cats: ['corporate', 'guides'],
    title: 'Live Streaming Your Event for Guests Who Can’t Be There',
    excerpt: 'A calm, professional multi-camera feed so no one misses the moment — from anywhere in the world.',
    image: '/live-streaming/multi_camera_livestream.png', date: 'Jun 14, 2026', read: '4 min read',
    href: '/services/live-streaming',
  },
  {
    id: 'drone-beach', category: 'Goa', cats: ['goa', 'bts'],
    title: 'Drone Coverage for Beach & Destination Weddings',
    excerpt: 'The scale and grandeur that only comes from a hundred feet up — where aerials make the difference.',
    image: '/outdoors/Out_1.jpg', date: 'Jun 5, 2026', read: '4 min read',
    href: '/services/drone-services',
  },
]

export const EDITORS = [POSTS[0], POSTS[2], POSTS[1]]
export const SLIDES = ['/wedding/cover.jpg', '/event-photography-cover.jpg', '/destination-weddings.jpg']
export const INSTA_IMAGES = [
  '/personal-portraits-1.jpg', '/wedding-5.jpg', '/magazine-editorials-1.jpg',
  '/event-photography-5.jpg', '/wedding/engagement.jpg', '/post-wedding.jpg',
]
