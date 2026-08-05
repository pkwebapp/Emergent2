import PageBanner from '@/components/media/PageBanner'
import DroneServicesPageClient from './DroneServicesPageClient'
import { SERVICE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/services/drone-services', {
  ...SERVICE_SEO['drone-services'],
  title: 'Drone Photography & Videography in Mumbai & Goa | Aerial Cinematography',
  description:
    'Cinematic drone photography and aerial videography in Mumbai, Goa and destination locations for weddings, real estate, events, resorts and commercial projects.',
})

export default function DroneServicesPage() {
  const seo = SERVICE_SEO['drone-services']
  const jsonLd = pageJsonLd('/services/drone-services', seo, {
    name: 'Drone Photography & Videography in Mumbai & Goa',
    serviceName: 'Aerial drone photography and cinematic drone videography',
    faqs: seo.faqs,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Drone Photography & Videography', path: '/services/drone-services' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageBanner slot="drone-services-banner" />
      <DroneServicesPageClient />
    </>
  )
}