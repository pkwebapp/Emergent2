import HeadshotsEditorial from './HeadshotsEditorial'

const CANONICAL =
  'https://pkphotography.in/blog/corporate-headshot-photography-mumbai'
const OG_IMAGE = 'https://pkphotography.in/headshot/Hed_1.jpg'

export const metadata = {
  title:
    'Corporate Headshot Photography in Mumbai: Why Every Professional Needs One | PK Photography',
  description:
    "Professional headshots get 21x more profile views. Learn why every professional needs one, how it differs from a portrait, and book a session at our Andheri West studio.",
  keywords:
    'corporate headshot photography Mumbai, professional headshot photographer Andheri, LinkedIn headshot Mumbai, business headshot studio Mumbai, executive headshot photographer, headshot vs portrait, corporate photography studio Andheri West, headshot photographer Mumbai, PK Photography',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'Corporate Headshot Photography in Mumbai \u2014 Andheri West Studio',
    description:
      'A studio-grade guide to corporate headshots in Mumbai \u2014 why they matter, how our lighting works, packages, bulk pricing and FAQs.',
    url: CANONICAL,
    type: 'article',
    locale: 'en_IN',
    siteName: 'PK Photography',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Corporate headshot studio session in Andheri West Mumbai by PK Photography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Headshot Photography in Mumbai | PK Photography',
    description:
      'Studio-grade corporate headshots in Andheri West Mumbai \u2014 individual, team & bulk pricing.',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'How long does a corporate headshot session take?',
    a: 'Individual sessions are typically quick \u2014 most professionals are in and out within 20\u201330 minutes, including a few minutes of expression coaching to help you relax in front of the camera.',
  },
  {
    q: 'Can you shoot headshots for our entire team at once?',
    a: 'Yes, we run bulk headshot sessions for companies, enterprises, government departments, schools, and colleges, using identical lighting and background setup so every headshot looks consistent \u2014 pricing is custom based on group size.',
  },
  {
    q: 'Do you offer bulk pricing for schools, colleges, or government offices?',
    a: 'Yes, we offer volume-based custom pricing for institutional bookings \u2014 including staff/faculty directories, student batches, and department-wide headshots \u2014 with a streamlined process to move large groups through efficiently.',
  },
  {
    q: 'What should I wear for a corporate headshot?',
    a: 'Solid colours and clean lines photograph best \u2014 avoid busy patterns or logos. Dress one level more polished than your daily work outfit, and bring a backup option if you\u2019re unsure.',
  },
  {
    q: 'How is a headshot different from a regular portrait?',
    a: 'A headshot is a tightly cropped, evenly lit, professional image meant for quick first impressions \u2014 LinkedIn, company sites, business cards. A portrait is a broader, more artistic image that tells a fuller story, often used for personal branding or creative projects.',
  },
  {
    q: 'How soon will I get my edited photos?',
    a: 'Turnaround time depends on the package \u2014 we\u2019ll confirm exact delivery timelines with you at the time of booking.',
  },
  {
    q: 'Do you offer on-location headshot sessions at our office?',
    a: 'Yes, for corporate and team bookings we can set up studio-quality lighting on-site at your office as an alternative to visiting our Andheri West studio.',
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
      'Corporate Headshot Photography in Mumbai: Why Every Professional Needs One',
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
    articleSection: 'Corporate Headshot Photography',
    keywords: metadata.keywords,
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'PhotographyBusiness',
    name: 'PK Photography \u2014 Corporate Headshot Studio',
    image: OG_IMAGE,
    url: CANONICAL,
    telephone: '+91-8888766739',
    priceRange: '\u20b9\u20b9\u20b9',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'C1302, Evershine Cosmic, opp. Infiniti Mall, Veera Desai Industrial Estate, Andheri West',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400053',
      addressCountry: 'IN',
    },
    areaServed: ['Mumbai', 'Andheri', 'Bandra', 'Powai', 'Navi Mumbai'],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.1362,
      longitude: 72.8296,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '19:00',
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeadshotsEditorial faqs={FAQS} />
    </>
  )
}
