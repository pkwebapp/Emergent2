import { PAGE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/pricing', PAGE_SEO.pricing)

export default function Layout({ children }) {
  const jsonLd = pageJsonLd('/pricing', PAGE_SEO.pricing, {
    name: 'Wedding Photography Packages & Prices',
    serviceName: 'Wedding photography packages and pricing',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
