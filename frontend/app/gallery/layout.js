import { PAGE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/gallery', PAGE_SEO.gallery)

export default function Layout({ children }) {
  const jsonLd = pageJsonLd('/gallery', PAGE_SEO.gallery, {
    name: 'Photography Portfolio, Headshots, Weddings & Events',
    serviceName: 'Photography gallery for portfolio shoots, headshots, weddings and events in Mumbai and Goa',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Gallery', path: '/gallery' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
