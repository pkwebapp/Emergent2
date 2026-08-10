import { Suspense } from 'react'
import Journal from './Journal'
import { POSTS } from './posts'

const CANONICAL = 'https://pkphotography.in/blogs'

export const metadata = {
  title: 'Wedding & Event Photography Blog | PK Photography Journal — Mumbai & Goa',
  description:
    "Wedding photography guides, corporate event insights, and behind-the-lens stories from PK Photography — Mumbai's trusted studio, active in Goa and Delhi.",
  keywords:
    'wedding photography blog Mumbai, photography journal, wedding guides, corporate event photography, Goa destination wedding, wedding planning tips, PK Photography',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'The PK Photography Journal — Wedding & Event Insights',
    description:
      'Wedding guides, event insights, and behind-the-lens stories — from Mumbai’s studios to Goa’s beaches.',
    url: CANONICAL,
    type: 'website',
    locale: 'en_IN',
    siteName: 'PK Photography',
    images: [{ url: 'https://pkphotography.in/wedding/cover.jpg', width: 1200, height: 630, alt: 'PK Photography Journal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The PK Photography Journal | Mumbai & Goa',
    description: 'Wedding guides, event insights and behind-the-lens stories from PK Photography.',
    images: ['https://pkphotography.in/wedding/cover.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'The PK Photography Journal',
    itemListElement: POSTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://pkphotography.in${p.href}`,
      name: p.title,
    })),
  }
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The PK Photography Journal',
    url: CANONICAL,
    description: metadata.description,
    publisher: {
      '@type': 'Organization',
      name: 'PK Photography',
      logo: { '@type': 'ImageObject', url: 'https://pkphotography.in/images/studio.jpeg' },
    },
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      image: `https://pkphotography.in${p.image}`,
      articleSection: p.category,
      url: `https://pkphotography.in${p.href}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#EEEAE1]" />}>
        <Journal />
      </Suspense>
    </>
  )
}
