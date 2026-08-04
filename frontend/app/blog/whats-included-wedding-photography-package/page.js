import Editorial from './Editorial'

const CANONICAL = 'https://pkphotography.in/blog/whats-included-wedding-photography-package'
const OG_IMAGE = 'https://pkphotography.in/wedding/cover.jpg'

export const metadata = {
  title: "What's Included in Our Wedding Photography Package? Complete Breakdown | PK Photography",
  description:
    'Confused about what a wedding photography package covers? PK Photography breaks down candid, traditional, cinematic video, drone coverage, albums, live streaming & more — Mumbai & Goa.',
  keywords:
    'wedding photography package Mumbai, wedding photography package inclusions, candid wedding photography, cinematic wedding videography, drone wedding photography Mumbai, wedding album design, wedding live streaming, same day edit wedding video, QR code wedding gallery, wedding reels video',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "What's Included in Our Wedding Photography Package: A Complete Breakdown",
    description:
      'Candid, traditional, cinematic video, drone coverage, albums, live streaming, same-day edits & reels — every part of a PK Photography wedding package, explained.',
    url: CANONICAL,
    type: 'article',
    locale: 'en_IN',
    siteName: 'PK Photography',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'PK Photography wedding coverage' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's Included in Our Wedding Photography Package | PK Photography",
    description:
      'A complete breakdown of candid, traditional, cinematic, drone, album, live-streaming & add-on wedding coverage in Mumbai & Goa.',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'What is usually included in a wedding photography package?',
    a: 'A complete package typically includes candid and traditional photography, cinematic and traditional videography, album design, and increasingly drone coverage, live streaming, and social media reels as standard or add-on inclusions.',
  },
  {
    q: 'Do I need both candid and traditional photography?',
    a: 'Most couples choose both — traditional captures formal family records and rituals, while candid captures genuine emotion and behind-the-scenes moments. Together they give a complete picture of the day.',
  },
  {
    q: 'How soon do I get my same-day edit video?',
    a: 'The same-day edit is compiled and ready to screen at the reception itself, usually within a few hours of the ceremony ending.',
  },
  {
    q: 'Is drone photography available for indoor/banquet weddings?',
    a: 'Drone coverage is best suited for outdoor or open venues. For indoor banquet weddings, we recommend focusing your budget on cinematic and traditional coverage instead.',
  },
  {
    q: 'Can I customize my package to include only certain services?',
    a: 'Yes — every PK Photography wedding package is customizable based on your venue, guest count, and priorities. Get in touch for a tailored quote.',
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
    headline: "What's Included in Our Wedding Photography Package: A Complete Breakdown",
    image: [OG_IMAGE],
    author: { '@type': 'Organization', name: 'PK Photography' },
    publisher: {
      '@type': 'Organization',
      name: 'PK Photography',
      logo: { '@type': 'ImageObject', url: 'https://pkphotography.in/images/studio.jpeg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    description: metadata.description,
    articleSection: 'Wedding Photography',
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
      <Editorial faqs={FAQS} />
    </>
  )
}
