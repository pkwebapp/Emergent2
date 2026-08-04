import { PAGE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/booking', PAGE_SEO.booking)

export default function Layout({ children }) {
  const jsonLd = pageJsonLd('/booking', PAGE_SEO.booking, {
    name: 'Book a Wedding Photographer in Mumbai & Goa',
    serviceName: 'Online wedding photographer booking',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Booking', path: '/booking' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
