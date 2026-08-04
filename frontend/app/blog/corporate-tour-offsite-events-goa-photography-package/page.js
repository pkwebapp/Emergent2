import CorporateEditorial from './CorporateEditorial'

const CANONICAL = 'https://pkphotography.in/blog/corporate-tour-offsite-events-goa-photography-package'
const OG_IMAGE = 'https://pkphotography.in/event-photography-cover.jpg'

export const metadata = {
  title: "Corporate Offsite & Event Photography in Goa: What's Included | PK Photography",
  description:
    "Planning a corporate offsite or MICE event in Goa? See exactly what PK Photography's coverage includes — conferences, team activities, gala nights, drone shots, branded videos & reels.",
  keywords:
    'corporate offsite photography Goa, corporate event videography Goa, MICE event photography Goa, corporate offsite video coverage, conference photography Goa, corporate event reels, team building event photography, drone photography corporate event Goa',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Corporate Tour & Offsite Events in Goa: What Our Coverage Includes',
    description:
      'Conferences, team-building, gala nights, drone coverage, branded highlight films and same-day reels — every part of a PK Photography corporate offsite package in Goa.',
    url: CANONICAL,
    type: 'article',
    locale: 'en_IN',
    siteName: 'PK Photography',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'PK Photography corporate offsite coverage in Goa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Corporate Offsite Photography in Goa: What's Included | PK Photography",
    description: 'Conference, team-building, gala, drone, branded video & reels coverage for corporate offsites in Goa.',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: "What's typically included in a corporate offsite photography package in Goa?",
    a: 'A complete package usually includes conference/session coverage, team-building activity coverage, candid documentation, gala night coverage, drone shots, and an edited branded highlight film, with reels and same-day content often included or available as an add-on.',
  },
  {
    q: 'Can you cover multi-day offsite events?',
    a: 'Yes — our teams cover multi-day corporate tours and offsites in Goa, with dedicated crews assigned across conference sessions, activities, and evening events as needed.',
  },
  {
    q: 'Do you provide branded video content for internal and marketing use?',
    a: "Yes, we build highlight films and recap videos with your company's branding, logo, and colour palette, suitable for internal comms, LinkedIn, and employer branding use.",
  },
  {
    q: 'How quickly can we get photos/videos after the event for social media?',
    a: 'We offer quick-turnaround delivery, including same-day edited highlights and next-day full galleries, so your marketing team can post while the event is still current.',
  },
  {
    q: 'Is drone coverage available at all Goa venues?',
    a: "Drone coverage depends on the venue's outdoor space and local flying permissions; we assess this during planning and arrange licensed drone coverage wherever possible.",
  },
  {
    q: 'Can the package be customized based on group size or number of days?',
    a: 'Yes — every corporate offsite package is customized based on your group size, event duration, and specific deliverables. Get in touch for a tailored quote.',
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
    headline: 'Corporate Tour & Offsite Events in Goa: What Our Photography & Videography Package Covers',
    image: [OG_IMAGE],
    author: { '@type': 'Organization', name: 'PK Photography' },
    publisher: {
      '@type': 'Organization',
      name: 'PK Photography',
      logo: { '@type': 'ImageObject', url: 'https://pkphotography.in/images/studio.jpeg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    description: metadata.description,
    articleSection: 'Corporate Event Photography',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <CorporateEditorial faqs={FAQS} />
    </>
  )
}
