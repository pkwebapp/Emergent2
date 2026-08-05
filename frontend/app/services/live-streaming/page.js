import PageBanner from '@/components/media/PageBanner'
import LiveStreamingPageClient from './LiveStreamingPageClient'
import { SERVICE_SEO, buildMetadata, pageJsonLd } from '@/lib/seo'

export const metadata = buildMetadata('/services/live-streaming', {
  ...SERVICE_SEO['live-streaming'],
  title: 'Live Streaming Services in Mumbai & Goa | PK Photography',
  description:
    'Multi-camera live streaming in Mumbai & Goa for weddings, corporate events, concerts and religious ceremonies. Private HD links, backup internet and full recording delivered.',
})

const faqs = [
  {
    q: 'How much does live streaming cost in Mumbai?',
    a: 'Single-camera streams start at ₹15,000 for up to 3 hours. Multi-camera setups with live switching, board audio and backup internet range from ₹35,000 to ₹75,000+ depending on cameras, duration and platform requirements.',
  },
  {
    q: 'What happens if the venue internet fails?',
    a: 'We never rely on venue Wi-Fi alone. Every stream runs on our own wired or bonded 4G/5G connection with an automatic backup line, so the broadcast continues even if one network drops.',
  },
  {
    q: 'Can overseas family watch the wedding on their phones?',
    a: 'Yes. We share a private viewing link that works on any phone, tablet, laptop or smart TV worldwide—no app or account needed. Most families simply tap the link and watch.',
  },
  {
    q: 'Is the stream private?',
    a: 'Completely. We broadcast to unlisted or private links visible only to people you share them with. For corporate events we can stream to Zoom, a password-protected page or your own custom RTMP server.',
  },
  {
    q: 'Do we get a recording after the event?',
    a: 'Always. Every package includes the full recording as an HD MP4 file, and the viewing link stays live for replays for 30 days after the event.',
  },
  {
    q: 'Can you stream multi-day or multi-venue events?',
    a: 'Yes. We regularly cover multi-day weddings and conferences across Mumbai and Goa, including parallel sessions and venue changes. Share your schedule and we will plan crews and connectivity for each location.',
  },
]

export default function LiveStreamingPage() {
  const seo = SERVICE_SEO['live-streaming']
  const jsonLd = pageJsonLd('/services/live-streaming', seo, {
    name: 'Live Streaming Services in Mumbai & Goa',
    serviceName: 'Multi-camera live streaming for weddings, corporate events and ceremonies',
    faqs,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'Live Streaming', path: '/services/live-streaming' },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageBanner slot="live-streaming-banner" />
      <LiveStreamingPageClient faqs={faqs} />
    </>
  )
}
