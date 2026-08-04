import { PAGE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/wedding', PAGE_SEO.wedding)

export default function Layout({ children }) {
  const jsonLd = pageJsonLd('/wedding', PAGE_SEO.wedding, {
    name: 'Wedding Photographer in Mumbai & Goa',
    serviceName: 'Wedding and destination wedding photography',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Wedding', path: '/wedding' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
