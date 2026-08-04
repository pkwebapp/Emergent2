import { PAGE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/services', PAGE_SEO.services)

export default function Layout({ children }) {
  const jsonLd = pageJsonLd('/services', PAGE_SEO.services, {
    name: 'Photography Services in Mumbai & Goa',
    serviceName: 'Photography and videography services',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
