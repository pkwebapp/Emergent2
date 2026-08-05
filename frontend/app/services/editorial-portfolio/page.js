import PageBanner from '@/components/media/PageBanner'
import EditorialPortfolioPageClient from './EditorialPortfolioPageClient'
import { SERVICE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/services/editorial-portfolio', {
  ...SERVICE_SEO['editorial-portfolio'],
  title: 'Editorial & Portfolio Photographer in Mumbai & Goa | Fashion, Actor & Model Portfolios',
  description:
    'Creative editorial, fashion, actor, model and personal branding portfolio photography in Mumbai and Goa with moodboards, styling guidance and cinematic retouching.',
})

export default function EditorialPortfolioPage() {
  const seo = SERVICE_SEO['editorial-portfolio']
  const jsonLd = pageJsonLd('/services/editorial-portfolio', seo, {
    name: 'Editorial & Portfolio Photographer in Mumbai & Goa',
    serviceName: 'Fashion editorial, actor portfolio, model portfolio and creative personal branding photography',
    faqs: seo.faqs,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Editorial & Portfolio', path: '/services/editorial-portfolio' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageBanner slot="editorial-portfolio-banner" />
      <EditorialPortfolioPageClient />
    </>
  )
}