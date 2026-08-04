import GoaEditorial from './GoaEditorial'

const CANONICAL =
  'https://pkphotography.in/blog/pre-wedding-couple-portrait-shoot-locations-goa'
const OG_IMAGE = 'https://pkphotography.in/wedding/preWedding.jpg'

export const metadata = {
  title:
    'Pre-Wedding & Couple Shoot Locations in Goa: Complete Guide + Packages | PK Photography',
  description:
    'Planning a pre-wedding, couple, or portrait shoot in Goa? Explore the best locations — Ashvem, Mandrem, Arambol, Vagator — plus our photography, drone & reel packages.',
  keywords:
    'pre-wedding shoot locations in Goa, pre wedding shoot Goa, couple shoot Goa, portrait shoot Goa, Ashvem pre wedding, Mandrem couple shoot, Vagator photoshoot, Arambol photoshoot, maternity shoot Goa, baby shoot Goa, iPhone reel Goa, Goa photographer, PK Photography',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'Pre-Wedding, Couple & Portrait Shoots in Goa — A Complete Location + Package Guide',
    description:
      'A cinematic, editorial guide to pre-wedding and couple shoots in Goa — locations, services, packages, and answers by PK Photography.',
    url: CANONICAL,
    type: 'article',
    locale: 'en_IN',
    siteName: 'PK Photography',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Pre-wedding couple shoot in Goa by PK Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pre-Wedding & Couple Shoot Locations in Goa | PK Photography',
    description:
      'Ashvem, Mandrem, Arambol, Vagator & private villas — the complete pre-wedding & couple shoot guide, plus packages.',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: "When's the best time for a pre-wedding shoot in Goa?",
    a: 'October to March is the sweet spot — soft light, no rain, cool sea breeze. April and early October also work if you\u2019re fine with a warmer late-afternoon call time. We avoid the monsoon (June\u2013September) for beach shoots, though moody villa shoots then are stunning.',
  },
  {
    q: 'How many locations can we cover in one day?',
    a: 'Realistically, two locations for a half-day and three for a full-day \u2014 with buffer for wardrobe changes and travel between north Goa spots. We usually pair a beach (Ashvem or Mandrem) with a cliff or fort (Vagator or Chapora) and optionally a villa or cafe.',
  },
  {
    q: 'What outfits work best for a pre-wedding shoot in Goa?',
    a: 'Flowy fabrics, light colours and one bolder look for contrast. We share a full styling guide once you book \u2014 including palettes that photograph well against black basalt, wet sand, and casuarina green.',
  },
  {
    q: 'How long until we get our photos and reels?',
    a: 'A hero teaser lands within 5 days, the full gallery in 10\u201314 days for hourly and half-day shoots, and up to 21 days for full-day shoots. Reels are colour-graded and delivered vertical-first so they\u2019re feed-ready.',
  },
  {
    q: 'Do we need permits for beach or fort shoots in Goa?',
    a: 'For personal pre-wedding and couple sessions, permits are usually not required at public beaches. For Chapora Fort, private villas, and any commercial or drone-heavy shoot, we handle permits and clearances on your behalf.',
  },
  {
    q: 'What if it rains on our shoot day?',
    a: 'We build a Plan B into every itinerary \u2014 usually a Portuguese villa nearby or a covered heritage location. If the weather is unworkable, we reschedule at no extra charge within 6 months.',
  },
]

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Pre-Wedding, Couple & Portrait Shoots in Goa \u2014 A Complete Guide',
    image: [OG_IMAGE],
    author: { '@type': 'Organization', name: 'PK Photography' },
    publisher: {
      '@type': 'Organization',
      name: 'PK Photography',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pkphotography.in/images/studio.jpeg',
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    description: metadata.description,
    articleSection: 'Pre-Wedding & Couple Photography',
    keywords: metadata.keywords,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <GoaEditorial faqs={FAQS} />
    </>
  )
}
