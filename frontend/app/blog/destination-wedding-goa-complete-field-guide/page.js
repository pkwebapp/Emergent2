import GoaWeddingEditorial from './GoaWeddingEditorial'

const CANONICAL =
  'https://pkphotography.in/blog/destination-wedding-goa-complete-field-guide'
const OG_IMAGE = 'https://pkphotography.in/destination-weddings.jpg'

export const metadata = {
  title:
    'Planning a Destination Wedding in Goa: The Complete Field Guide | PK Photography',
  description:
    'North Goa vs South Goa venues, realistic budgets from ₹15L to ₹1Cr+, what you actually need (venue, catering, photographers, décor, permits), and how a local team saves you 20–35%. A no-fluff 2026 field guide.',
  keywords:
    'destination wedding Goa, Goa wedding planner, Goa wedding photographer, North Goa vs South Goa wedding, Goa wedding cost 2026, best wedding venues Goa, Goa wedding management, destination wedding budget India, Taj Exotica wedding, Leela Goa wedding, PK Photography Goa',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title:
      'Planning a Destination Wedding in Goa — The Complete Field Guide',
    description:
      'North Goa vs South Goa, venues, realistic budgets, what you actually need, and how a local team saves you money. By PK Photography.',
    url: CANONICAL,
    type: 'article',
    locale: 'en_IN',
    siteName: 'PK Photography',
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: 'Destination wedding in Goa — PK Photography field guide' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Destination Wedding in Goa — The Complete Field Guide',
    description:
      'Venues, budgets, timelines and vendors — a local photographer’s no-fluff Goa wedding guide.',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
}

const FAQS = [
  {
    q: 'How much does a destination wedding in Goa realistically cost?',
    a: 'For a comfortable 100–150 guest, 2-day wedding at a mid-range resort, most couples land between ₹30 lakh and ₹1 crore all-in. Intimate villa weddings (25–50 guests) can be done from around ₹8–15 lakh, while premium 5-star buyouts easily cross ₹1.5–2.5 crore. The single biggest variables are guest count, resort tier and décor scale.',
  },
  {
    q: 'North Goa or South Goa — which is better for a wedding?',
    a: 'South Goa is calmer, greener, and dominated by large 5-star beachfront resorts like Taj Exotica, The Leela and Park Hyatt — better for family-friendly, private celebrations. North Goa is trendier and busier, with cliffside and villa venues like W Goa, Grand Hyatt and Vagator/Assagao Portuguese villas — better for younger, high-energy weddings and easier for guest movement. We shoot both, most weeks.',
  },
  {
    q: 'When is the best season to get married in Goa?',
    a: 'October to March is the wedding season — cool breeze, clear skies, no rain. November to February is peak (and priciest). April and early October are shoulder months and can work if you time the ceremony for late afternoon. We avoid pure monsoon dates (June–September) for outdoor setups, though moody villa weddings then are very beautiful.',
  },
  {
    q: 'What licences and permits do I need for a Goa wedding?',
    a: 'The resort itself handles most in-house permits (music licence, alcohol, fireworks where allowed). For beach ceremonies, drone shoots, or amplified music on public land, additional permissions may be needed — most planners and larger resorts handle these end-to-end. If you want a legal registration in Goa, it needs at least 30 days’ residence and is usually paperwork-heavy — most couples register in their home city and celebrate in Goa.',
  },
  {
    q: 'Why book a Goa-based photographer instead of flying our own team in?',
    a: 'Three reasons: cost, knowledge and reliability. Local teams don’t need flights, twin-share rooms or return travel days, which alone saves 20–35% versus flying in an equivalent team. We already know every venue’s light, every backup spot when it rains, and every logistics quirk. And on the day, we can reach any north-or-south Goa location without depending on Mumbai traffic or delayed flights.',
  },
  {
    q: 'Do you handle full wedding management or only photography?',
    a: 'Both. We offer three ways to work with us: full wedding management (venue, décor, catering, entertainment, guest logistics — end-to-end), a guided planner model (we help you make choices, but you book directly and save the planning fee), or pure photography + cinematography teams if you already have a planner. We only accept a limited number of full-management weddings each season.',
  },
  {
    q: 'How far in advance should we book?',
    a: 'For peak season dates (Nov–Feb) at premium resorts, book venue + core vendors 9–12 months out. Off-peak or shoulder dates are usually possible with 4–6 months of runway. Photography teams for saved dates lock 6–12 months ahead in season.',
  },
  {
    q: 'Do you cover both North Goa and South Goa on the same wedding?',
    a: 'Yes. It’s common for our couples to do a haldi/mehendi at a North Goa villa and the main ceremony at a South Goa resort — we drive between locations with the full team without inter-city flights or delays.',
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
    headline: 'Planning a Destination Wedding in Goa: The Complete Field Guide',
    image: [OG_IMAGE],
    author: { '@type': 'Organization', name: 'PK Photography' },
    publisher: {
      '@type': 'Organization',
      name: 'PK Photography',
      logo: { '@type': 'ImageObject', url: 'https://pkphotography.in/images/studio.jpeg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    description: metadata.description,
    articleSection: 'Destination Weddings',
    keywords: metadata.keywords,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <GoaWeddingEditorial faqs={FAQS} />
    </>
  )
}
