import { notFound } from 'next/navigation'
import { SERVICES } from '@/lib/services'
import { SERVICE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'
import ServicePageClient from './ServicePageClient'

// Pre-render generic service slugs at build-time.
// Custom handcrafted pages (currently /services/events and /services/weddings) live in their own folders.
export function generateStaticParams() {
  return SERVICES.filter((s) => !['events', 'weddings', 'portraits-headshots', 'editorial-portfolio', 'drone-services', 'live-streaming'].includes(s.slug)).map((s) => ({ slug: s.slug }))
}

// Per-slug SEO metadata (title / description / keywords / OG / canonical)
export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  const seo = SERVICE_SEO[slug]
  if (!service && !seo) {
    return { title: 'Service not found · PK Photography' }
  }
  const base = seo || {
    title: `${service.t} in Mumbai · Goa | PK Photography`,
    description: `${service.d} Available across Mumbai, Goa and Pan India by PK Photography.`,
    keywords: [`${service.t} Mumbai`, `${service.t} Goa`, 'PK Photography'],
  }
  return buildMetadata(`/services/${slug}`, base)
}

export default async function ServicePage({ params }) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  const seo = SERVICE_SEO[slug]
  if (!service) return notFound()

  // JSON-LD: LocalBusiness + Service + BreadcrumbList + FAQPage
  const jsonLd = pageJsonLd(`/services/${slug}`, seo, {
    name: seo?.h1 || service.t,
    serviceName: seo?.serviceTitle || service.t,
    faqs: seo?.faqs || [],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.t, path: `/services/${slug}` },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServicePageClient slug={slug} />
    </>
  )
}
