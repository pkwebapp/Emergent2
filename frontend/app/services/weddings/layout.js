import { SERVICE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/services/weddings', SERVICE_SEO.weddings)

export default function Layout({ children }) {
  const seo = SERVICE_SEO.weddings
  const jsonLd = pageJsonLd('/services/weddings', seo, {
    name: seo.h1,
    serviceName: 'Wedding photography and videography',
    faqs: seo.faqs,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Wedding Photography', path: '/services/weddings' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}