import HeadshotsPageClient from './HeadshotsPageClient'
import { SERVICE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/services/portraits-headshots', {
  ...SERVICE_SEO['portraits-headshots'],
  title: 'Professional Headshots & Portrait Photography in Mumbai | PK Photography',
  description:
    'Corporate headshots, LinkedIn portraits and personal branding photography in Mumbai for CEOs, founders, professionals, teams and visitors.',
})

export default function HeadshotsPage() {
  const seo = SERVICE_SEO['portraits-headshots']
  const jsonLd = pageJsonLd('/services/portraits-headshots', seo, {
    name: 'Professional Headshots & Portrait Photography in Mumbai',
    serviceName: 'Corporate headshots, LinkedIn portraits and personal branding photography',
    faqs: seo.faqs,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Portraits & Headshots', path: '/services/portraits-headshots' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeadshotsPageClient />
    </>
  )
}