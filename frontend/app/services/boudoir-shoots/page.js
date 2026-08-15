import { SERVICES } from '@/lib/services'
import { SERVICE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'
import BoudoirPageClient from './BoudoirPageClient'

const SLUG = 'boudoir-shoots'

export function generateMetadata() {
  const seo = SERVICE_SEO[SLUG]
  return buildMetadata(`/services/${SLUG}`, seo)
}

export default function BoudoirPage() {
  const service = SERVICES.find((s) => s.slug === SLUG)
  const seo = SERVICE_SEO[SLUG]
  const jsonLd = pageJsonLd(`/services/${SLUG}`, seo, {
    name: seo?.h1 || service.t,
    serviceName: seo?.serviceTitle || service.t,
    faqs: seo?.faqs || [],
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.t, path: `/services/${SLUG}` },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BoudoirPageClient />
    </>
  )
}
