import PageBanner from '@/components/media/PageBanner'
import EventsPageClient from './EventsPageClient'
import { SERVICE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/services/events', {
  ...SERVICE_SEO.events,
  title: 'Event Photography & Videography in Mumbai & Goa | PK Photography',
  description:
    'Professional event photography and videography in Mumbai, Goa and destination locations for conferences, launches, awards, exhibitions and celebrations.',
})

export default function EventsPage() {
  const seo = SERVICE_SEO.events
  const jsonLd = pageJsonLd('/services/events', seo, {
    name: 'Event Photographer in Mumbai & Goa',
    serviceName: 'Corporate and private event photography and videography',
    faqs: seo.faqs,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Event Photography', path: '/services/events' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageBanner slot="events-banner" />
      <EventsPageClient />
    </>
  )
}