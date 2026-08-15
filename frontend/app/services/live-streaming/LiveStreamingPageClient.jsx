'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Globe, MessageCircle, Mic, MonitorPlay, Play, Radio, ShieldCheck, Video, Wifi } from 'lucide-react'
import { waLink } from '@/components/site/Chrome'
import { ReadingProgress, RelatedServices } from '@/components/services/ServiceExtras'
import HeroMedia from '@/components/media/HeroMedia'
import { backendUrl } from '@/lib/backend'

const CLD = 'https://res.cloudinary.com/ddamvvrby/image/upload'

const IMG = {
  hero: `${CLD}/v1771154401/carousel-images/fdgbinlwnq6bviqxkrom.jpg`,
  console: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  hybrid: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  stage: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  concert: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  camera: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  conference: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  wedding: `${CLD}/v1771153677/carousel-images/q9uunwxx92hobej4ogft.jpg`,
}

const stats = [
  ['300+', 'Events streamed live'],
  ['35+', 'Countries reached'],
  ['4K', 'Multi-camera rigs'],
  ['0', 'Streams lost to internet'],
]

const subServices = [
  {
    n: '01',
    t: 'Wedding & ceremony streaming',
    d: 'Multi-camera coverage of pheras, vows, sangeet and receptions—streamed privately to family anywhere in the world.',
    img: IMG.wedding,
    alt: 'Wedding ceremony being live streamed in candid cinematic style, Mumbai',
  },
  {
    n: '02',
    t: 'Corporate & conference streaming',
    d: 'Town halls, product launches and summits broadcast to Zoom, YouTube or your own platform with branded graphics.',
    img: IMG.conference,
    alt: 'Corporate conference keynote live streamed with professional cameras, Mumbai',
  },
  {
    n: '03',
    t: 'Concerts & performances',
    d: 'Stage shows and cultural performances with switched camera angles and clean soundboard audio.',
    img: IMG.concert,
    alt: 'Live concert performance streamed with multi-camera stage coverage, Mumbai',
  },
  {
    n: '04',
    t: 'Religious & community broadcasts',
    d: 'Church masses, poojas and community gatherings streamed respectfully for members who cannot attend.',
    img: IMG.stage,
    alt: 'Religious ceremony broadcast live for community viewers, Mumbai and Goa',
  },
  {
    n: '05',
    t: 'Hybrid & multi-venue events',
    d: 'Parallel sessions, remote speakers and venue-to-venue links managed by a dedicated stream engineer.',
    img: IMG.hybrid,
    alt: 'Live streaming control desk with video switcher at hybrid event, Mumbai',
  },
]

const process = [
  ['01', 'Brief & platform', 'Event type, audience, and where it streams—YouTube private link, Zoom or custom RTMP.'],
  ['02', 'Venue recce', 'Internet speed test, camera positions, power points and audio access confirmed in advance.'],
  ['03', 'Rig & audio', 'Cameras, switcher and a direct soundboard feed set up hours before guests arrive.'],
  ['04', 'Rehearsal', 'A private test stream with graphics, titles and lower thirds checked end to end.'],
  ['05', 'Go live', 'Live camera switching on wired internet with bonded 4G/5G backup running in parallel.'],
  ['06', 'Recording delivered', 'Full HD recording and a 30-day replay link shared within 24 hours.'],
]

const projects = [
  {
    title: 'Juniors Fashion Week Live',
    tag: 'Fashion event · Mumbai',
    thumb: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
    href: '/gallery',
  },
  {
    title: 'Fr. Agnel Ashram Church Mass',
    tag: 'Religious broadcast · Bandra, Mumbai',
    thumb: 'https://img.youtube.com/vi/8IOuQzcCuQs/maxresdefault.jpg',
    href: 'https://youtu.be/8IOuQzcCuQs',
  },
  {
    title: 'Anup Jalota Live in Concert',
    tag: 'Performance · Mumbai',
    thumb: 'https://img.youtube.com/vi/8I-Ir6xXC3k/maxresdefault.jpg',
    href: 'https://youtu.be/8I-Ir6xXC3k',
  },
]

const whyUs = [
  {
    icon: <Video size={18} />,
    t: 'Broadcast-grade multi-cam',
    d: 'Professional cinema cameras with a live vision switcher—not a phone on a tripod. Your viewers see a produced broadcast, with the right angle at the right moment.',
  },
  {
    icon: <Wifi size={18} />,
    t: 'Internet that never becomes the story',
    d: 'Wired primary line plus bonded 4G/5G backup at every event. In 300+ streams we have never lost a broadcast to connectivity.',
  },
  {
    icon: <Mic size={18} />,
    t: 'Clean board audio',
    d: 'We take a direct feed from the venue sound desk, so vows, speeches and music sound crisp—not echoey room audio from a camera mic.',
  },
  {
    icon: <ShieldCheck size={18} />,
    t: 'Private & secure by default',
    d: 'Unlisted links, password pages or your own RTMP server. Your family moments and corporate content stay visible only to invited viewers.',
  },
]

const deliverables = [
  ['Private viewing link', 'Works on any phone, TV or laptop worldwide—no app needed'],
  ['Full HD recording', 'Complete MP4 file of the broadcast, delivered within 24 hours'],
  ['Switched multi-angle edit', 'The live-directed cut with every camera angle already in place'],
  ['Titles & lower thirds', 'Names, event branding and graphics rendered into the stream'],
  ['30-day replay window', 'Guests who missed it live can rewatch at their own time'],
  ['Viewer report', 'How many watched, from where and for how long'],
]

const pricing = [
  {
    name: 'Solo Stream',
    price: '₹15,000',
    was: '₹20,000',
    save: 'Save 25%',
    bestFor: 'Intimate ceremonies, masses, small events',
    items: ['1 camera, up to 3 hours', 'Private YouTube link', 'Wired + 4G backup internet', 'Full HD recording copy'],
  },
  {
    name: 'Signature Stream',
    price: '₹35,000',
    was: '₹45,000',
    save: 'Save 22%',
    bestFor: 'Weddings, receptions, corporate townhalls',
    items: ['2–3 cameras with live switching', 'Direct soundboard audio feed', 'Titles & lower-third graphics', 'Bonded backup internet', 'Recording + 30-day replay link'],
    featured: true,
  },
  {
    name: 'Broadcast Pro',
    price: '₹75,000',
    was: '₹95,000',
    save: 'Save 21%',
    bestFor: 'Conferences, concerts, multi-venue events',
    items: ['4+ cameras, up to 4K', 'Dedicated stream engineer', 'Multi-platform simulcast', 'Branded graphics package', 'Same-day highlight clip'],
  },
]

const addOns = [
  ['Extra camera angle', 'Add a dedicated camera for the audience, stage side or drone feed'],
  ['Drone-to-stream', 'Live aerial shots of the venue cut into the broadcast'],
  ['LED screen at venue', 'Show the live feed on screens inside the venue for guests'],
  ['Extra streaming hour', 'Extend coverage beyond the package duration'],
  ['Same-day highlight reel', 'A 60–90 second edit delivered before the night ends'],
  ['Multi-platform simulcast', 'Stream to YouTube, Facebook and Zoom at the same time'],
]

const keywords = [
  ['Wedding live streaming Mumbai', '/services/weddings'],
  ['Corporate event streaming', '/services/events'],
  ['Church mass live telecast', '/gallery'],
  ['Multi-camera webcast India', '/booking'],
  ['Live streaming packages', '/pricing'],
]

function FadeIn({ children, className = '', delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default function LiveStreamingPageClient({ faqs }) {
  const [galleryProjects, setGalleryProjects] = useState(projects)

  useEffect(() => {
    const backend = backendUrl()
    fetch(`${backend}/api/media?slot=live-streaming-gallery`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = (data?.items || []).filter((i) => i.secure_url).map((i, idx) => ({
          title: i.alt || projects[idx]?.title || `Live Event ${idx + 1}`,
          tag: projects[idx]?.tag || 'Live streaming · Mumbai',
          thumb: i.secure_url,
          href: '/gallery',
          _resource_type: i.resource_type,
        }))
        if (items.length) setGalleryProjects(items)
      })
      .catch(() => {})
  }, [])

  return (
    <main className="bg-[#EEEAE1] text-[#161514] overflow-x-hidden selection:bg-[#FF5B22] selection:text-white">
      <ReadingProgress />

      {/* ---------- Hero ---------- */}
      <section className="relative min-h-[92svh] pt-32 md:pt-40 pb-16 overflow-hidden bg-[#11100F] text-white" data-testid="livestream-hero-section">
        <div className="absolute inset-0">
          <HeroMedia slot="live-streaming-banner" fallbackImage={IMG.hero} className="opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,16,15,0.94),rgba(17,16,15,0.7),rgba(17,16,15,0.35))]" />
        </div>

        <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative">
          <nav className="text-[10px] tracking-[0.28em] uppercase text-white/55 mb-8 flex items-center gap-2" data-testid="livestream-breadcrumb">
            <Link href="/" className="hover:text-[#FF5B22]">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#FF5B22]">Services</Link>
            <span>/</span>
            <span className="text-white">Live Streaming</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_0.95fr] gap-10 items-end min-h-[calc(92svh-14rem)]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#EEEAE1]/10 backdrop-blur border border-white/20 px-4 py-1.5 text-[10px] font-semibold tracking-[0.28em] uppercase mb-6" data-testid="livestream-hero-eyebrow">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5B22] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5B22]" />
                </span>
                Multi-camera live streaming · Mumbai & Goa
              </div>
              <h1 className="display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] max-w-[12ch]" data-testid="livestream-hero-title">
                Live Streaming Services in Mumbai &amp; Goa
              </h1>
              <p className="mt-6 max-w-xl text-white/72 leading-relaxed" data-testid="livestream-hero-subtitle">
                For everyone who couldn&rsquo;t be in the room—bring them into the moment. Weddings, conferences, concerts and ceremonies broadcast in HD to a private link that works anywhere in the world.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/booking?service=live-streaming" data-testid="livestream-hero-booking-link" className="inline-flex justify-center items-center gap-3 bg-[#FF5B22] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors">
                  Book your stream <ArrowRight size={14} />
                </Link>
                <a href={waLink({ service: 'Live Streaming', page: 'Live Streaming' })} target="_blank" rel="noreferrer" data-testid="livestream-hero-whatsapp-link" className="inline-flex justify-center items-center gap-3 border border-white/25 text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors">
                  <MessageCircle size={15} /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.08 }} className="relative hidden md:block" data-testid="livestream-hero-visual">
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/15">
                <Image src={IMG.console} alt="Broadcast video switcher and monitors at a live streamed event, Mumbai" fill sizes="640px" className="object-cover" unoptimized />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur px-3.5 py-1.5 text-[11px] font-bold tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
                </div>
              </div>
              <div className="absolute -bottom-6 left-8 right-8 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-4 flex items-center justify-between text-sm">
                <span className="text-white/65 inline-flex items-center gap-2"><Globe size={14} /> Private link, worldwide</span>
                <span className="font-semibold">Zero missed moments</span>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4" data-testid="livestream-stats-strip">
            {stats.map(([v, l]) => (
              <div key={l} className="text-center md:text-left">
                <div className="display text-3xl md:text-4xl">{v}</div>
                <div className="mt-2 text-[10px] tracking-[0.28em] uppercase text-white/55">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Intro chapter ---------- */}
      <section className="py-16 md:py-24" data-testid="livestream-intro-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-14 items-center">
          <FadeIn className="max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">What this service is</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Distance shouldn&rsquo;t decide who gets to be there.</h2>
            <p className="mt-5 text-[#4C4A46] leading-relaxed">
              Live streaming is a professionally produced broadcast of your event—multiple cameras, switched live, with clean audio—delivered to a private link your guests open on any device.
            </p>
            <p className="mt-4 text-[#4C4A46] leading-relaxed">
              Grandparents abroad, colleagues in another office, friends who couldn&rsquo;t travel: they watch in real time, and a full recording arrives the next day.
            </p>
          </FadeIn>
          <FadeIn delay={0.08} className="relative min-h-[390px] rounded-[2rem] overflow-hidden bg-[#161514]" data-testid="livestream-intro-visual">
            <Image src={IMG.stage} alt="Church ceremony venue broadcast live with streaming cameras, Mumbai" fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover opacity-88" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/85 via-transparent to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 grid grid-cols-3 gap-3">
              {[
                ['HD/4K', 'Broadcast quality'],
                ['Any device', 'Phone to smart TV'],
                ['24 hrs', 'Recording delivered'],
              ].map(([stat, label]) => (
                <div key={stat} className="rounded-2xl bg-white/12 backdrop-blur-md border border-white/15 p-4 text-white">
                  <div className="display text-2xl leading-none">{stat}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/58">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---------- Service breakdown grid ---------- */}
      <section className="pb-16 md:pb-24" data-testid="livestream-subservices-section">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn className="max-w-2xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">What we stream</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">One crew. Every kind of live moment.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subServices.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.04} className={`${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''} group rounded-[1.75rem] overflow-hidden bg-[#161514] text-white relative min-h-[340px] flex flex-col justify-end`} data-testid={`livestream-subservice-${s.n}`}>
                <Image src={s.img} alt={s.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover opacity-55 group-hover:opacity-70 group-hover:scale-[1.04] transition-[opacity,transform] [transition-duration:900ms]" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/95 via-[#161514]/35 to-transparent" />
                <div className="relative p-6">
                  <div className="display text-4xl text-[#FF5B22]/70">{s.n}</div>
                  <h3 className="text-xl font-semibold mt-2">{s.t}</h3>
                  <p className="mt-2.5 text-sm text-white/70 leading-relaxed">{s.d}</p>
                  <a href={waLink({ service: 'Live Streaming', page: 'Live Streaming' })} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22] group-hover:gap-3 transition-[gap]">
                    Enquire about this service <ArrowUpRight size={14} />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="py-20 md:py-24 bg-[#E6E1D5]" data-testid="livestream-process-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="max-w-2xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">How a stream comes together</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Planned like a broadcast, not an afterthought.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {process.map(([num, title, copy]) => (
              <div key={num} className="rounded-[1.5rem] border border-[#DBD4C6] bg-[#EEEAE1] p-5 min-h-[180px] flex flex-col justify-between" data-testid={`livestream-process-${num}`}>
                <div className="w-12 h-12 rounded-full bg-[#FF5B22] text-white grid place-content-center text-sm font-bold">{num}</div>
                <div>
                  <h3 className="display text-3xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4C4A46]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Gallery strip ---------- */}
      <section className="py-20 md:py-24" data-testid="livestream-gallery-section">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Recent broadcasts</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">Streams our clients went live with.</h2>
            </div>
            <Link href="/gallery" data-testid="livestream-gallery-cta-link" className="inline-flex items-center gap-3 bg-[#161514] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors">Open gallery <ArrowRight size={14} /></Link>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-4">
            {galleryProjects.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.05}>
                <a href={p.href} target="_blank" rel="noreferrer" className="group block" data-testid={`livestream-project-${i}`}>
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#161514]">
                    <Image src={p.thumb} alt={`${p.title} live streamed by PK Photography, Mumbai`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-[1.05] transition-transform [transition-duration:900ms]" unoptimized />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors" />
                    <div className="absolute inset-0 grid place-content-center">
                      <span className="w-14 h-14 rounded-full bg-[#EEEAE1]/90 text-[#161514] grid place-content-center group-hover:bg-[#FF5B22] group-hover:text-white transition-colors"><Play size={18} className="ml-0.5" /></span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-[10px] tracking-[0.24em] uppercase text-[#8A857D]">{p.tag}</div>
                    <h3 className="mt-1.5 text-lg font-semibold group-hover:text-[#FF5B22] transition-colors">{p.title}</h3>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why choose us ---------- */}
      <section className="pb-16 md:pb-24" data-testid="livestream-why-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 items-stretch">
          <FadeIn className="relative rounded-[2rem] overflow-hidden bg-[#161514] text-white min-h-[420px]">
            <Image src={IMG.camera} alt="Broadcast camera operator filming a live streamed event, Mumbai" fill sizes="(max-width: 1024px) 100vw, 540px" className="object-cover opacity-55" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-7 md:p-9">
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Why PK Photography</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">Live means no second take.</h2>
              <p className="mt-4 text-white/70 leading-relaxed max-w-md">A stream has one chance to go right. Everything we set up—cameras, audio, internet—is built around that fact.</p>
            </div>
          </FadeIn>
          <FadeIn className="grid sm:grid-cols-2 gap-3">
            {whyUs.map((w) => (
              <div key={w.t} className="rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-5 min-h-[190px] flex flex-col justify-between" data-testid={`livestream-why-${w.t.toLowerCase().replaceAll(' ', '-').slice(0, 20)}`}>
                <div className="w-10 h-10 rounded-2xl bg-[#FF5B22] text-white grid place-content-center">{w.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg leading-snug">{w.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4C4A46]">{w.d}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ---------- Deliverables ---------- */}
      <section className="pb-20 md:pb-24" data-testid="livestream-deliverables-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="rounded-[2rem] bg-[#161514] text-white p-7 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">What you take home</div>
                <h2 className="display text-4xl md:text-5xl leading-[1]">The stream ends. The files stay.</h2>
              </div>
              <MonitorPlay size={36} className="text-[#FF5B22] hidden md:block" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {deliverables.map(([title, copy]) => (
                <div key={title} className="rounded-2xl bg-white/8 border border-white/10 p-5" data-testid={`livestream-deliverable-${title.toLowerCase().replaceAll(' ', '-')}`}>
                  <Check size={16} className="text-[#FF5B22]" />
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-white/62 leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="py-20 md:py-24 bg-[#E6E1D5]" data-testid="livestream-pricing-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="max-w-2xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Pricing</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Streaming packages with clear starting points.</h2>
            <p className="mt-5 text-[#4C4A46] leading-relaxed">Final pricing depends on cameras, event duration, platform requirements, venue connectivity and travel. Multi-day and multi-venue events are quoted custom.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {pricing.map((plan) => (
              <FadeIn key={plan.name} className={`rounded-[1.75rem] p-6 border flex flex-col ${plan.featured ? 'bg-[#161514] border-[#161514] text-white' : 'bg-[#EEEAE1] border-[#DBD4C6]'}`} data-testid={`livestream-pricing-${plan.name.toLowerCase().replaceAll(' ', '-')}`}>
                <div className={`text-[11px] uppercase tracking-[0.22em] ${plan.featured ? 'text-white/55' : 'text-[#8A857D]'}`}>{plan.bestFor}</div>
                <h3 className="display text-3xl mt-4">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className={`line-through text-sm ${plan.featured ? 'text-white/40' : 'text-[#8A857D]'}`}>{plan.was}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5B22]">{plan.save}</span>
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed"><Check size={15} className={`mt-0.5 shrink-0 ${plan.featured ? 'text-[#FF5B22]' : 'text-[#FF5B22]'}`} />{item}</li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-col gap-2.5">
                  <Link href={`/booking?service=live-streaming&package=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`} data-testid={`livestream-pricing-book-${plan.name.toLowerCase().replaceAll(' ', '-')}`} className={`inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors ${plan.featured ? 'bg-[#FF5B22] text-white hover:bg-white hover:text-[#161514]' : 'bg-[#161514] text-white hover:bg-[#FF5B22]'}`}>Book this package <ArrowRight size={14} /></Link>
                  <a href={waLink({ service: 'Live Streaming', page: 'Live Streaming', pkg: plan.name, price: plan.was ? `${plan.price} (was ${plan.was})` : plan.price })} target="_blank" rel="noreferrer" className={`inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-colors ${plan.featured ? 'border-white/30 text-white hover:bg-white/10' : 'border-[#161514]/20 text-[#161514] hover:border-[#FF5B22] hover:text-[#FF5B22]'}`} data-testid={`livestream-pricing-whatsapp-${plan.name.toLowerCase().replaceAll(' ', '-')}`}>
                    <MessageCircle size={14} /> Enquire on WhatsApp
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-6 rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-5 text-sm text-[#4C4A46] leading-relaxed" data-testid="livestream-pricing-note">
            <span className="font-semibold text-[#161514]">Custom &amp; add-on pricing:</span> extra cameras, extra hours, drone feeds, LED screens and multi-day coverage are priced individually. Share your event details on WhatsApp and we&rsquo;ll send an itemised quote the same day.
          </FadeIn>
        </div>
      </section>

      {/* ---------- Add-ons ---------- */}
      <section className="py-20 md:py-24" data-testid="livestream-addons-section">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn className="max-w-2xl mb-8">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Popular add-ons</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Make the broadcast bigger.</h2>
          </FadeIn>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x" data-testid="livestream-addons-carousel">
            {addOns.map(([title, copy]) => (
              <div key={title} className="snap-start shrink-0 w-[260px] rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] p-5 min-h-[160px] flex flex-col justify-between">
                <Radio size={18} className="text-[#FF5B22]" />
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4C4A46]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Testimonial ---------- */}
      <section className="pb-20 md:pb-24" data-testid="livestream-testimonial-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn className="rounded-[2rem] border border-[#DBD4C6] bg-[#E6E1D5] p-8 md:p-12 text-center">
            <div className="text-[#FF5B22] text-4xl font-serif leading-none">&ldquo;</div>
            <blockquote className="display text-2xl md:text-3xl leading-[1.25] mt-2">
              My parents in Toronto watched our entire wedding live, in HD, without a single glitch. It genuinely felt like they were there with us.
            </blockquote>
            <div className="mt-6 text-sm font-semibold">Wedding client · Mumbai</div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#8A857D] mt-1">Streamed to 6 countries</div>
          </FadeIn>
        </div>
      </section>

      {/* ---------- SEO content block ---------- */}
      <section className="pb-20 md:pb-24" data-testid="livestream-seo-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Mumbai · Goa · Anywhere online</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Live streaming across Mumbai, Goa &amp; beyond.</h2>
            <div className="mt-6 space-y-4 text-[#4C4A46] leading-relaxed">
              <p>
                PK Photography provides professional live streaming across Mumbai—including Bandra, Juhu, Andheri, South Mumbai, BKC and Navi Mumbai—and throughout Goa, from beach resort weddings in Vagator and Palolem to hotel ballroom conferences in Panjim. Our clients are couples streaming weddings to family overseas, corporates broadcasting town halls and product launches, event organisers running hybrid conferences, and churches and community groups sharing ceremonies with members who cannot attend in person.
              </p>
              <p>
                Every broadcast is produced with multi-camera coverage, a direct soundboard audio feed and our own internet with bonded backup—so the wedding live streaming, corporate webcast or church mass live telecast your guests see is smooth, private and broadcast-quality. Whether you need a single-camera stream for an intimate ceremony or a 4K multi-camera production streamed to YouTube, Zoom and a custom platform simultaneously, we plan connectivity and crew around your venue before the event day.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2" data-testid="livestream-keyword-row">
              {keywords.map(([label, href]) => (
                <Link key={label} href={href} className="rounded-full border border-[#DBD4C6] bg-[#E6E1D5] px-4 py-2 text-xs font-semibold text-[#4C4A46] hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="pb-20 md:pb-24" data-testid="livestream-faq-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">FAQs</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Questions people ask before going live.</h2>
          </FadeIn>
          <div className="divide-y divide-[#DBD4C6] border-y border-[#DBD4C6]">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group py-6" data-testid={`livestream-faq-${i}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <span className="w-9 h-9 rounded-full bg-[#E6E1D5] grid place-content-center group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#4C4A46] leading-relaxed max-w-3xl">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="pb-24 md:pb-32" data-testid="livestream-final-cta-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="rounded-[2rem] bg-[#FF5B22] text-white p-8 md:p-12 grid md:grid-cols-[1.15fr_0.85fr] gap-8 items-center overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
            <FadeIn className="relative">
              <h2 className="display text-4xl md:text-6xl leading-[0.95]">Let&rsquo;s take your event live.</h2>
              <p className="mt-5 text-white/82 leading-relaxed max-w-xl">Share your event date, venue and where you want it streamed—we&rsquo;ll confirm the setup, run a connectivity check and send an exact quote within hours.</p>
            </FadeIn>
            <FadeIn className="relative flex flex-col sm:flex-row md:flex-col gap-3 md:items-start">
              <Link href="/booking?service=live-streaming" data-testid="livestream-final-booking-link" className="inline-flex justify-center items-center gap-3 bg-white text-[#161514] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#161514] hover:text-white transition-colors">Book live streaming <ArrowRight size={14} /></Link>
              <a href={waLink({ service: 'Live Streaming', page: 'Live Streaming' })} target="_blank" rel="noreferrer" data-testid="livestream-final-whatsapp-link" className="inline-flex justify-center items-center gap-3 border border-white/35 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors"><MessageCircle size={15} /> WhatsApp the team</a>
            </FadeIn>
          </div>
        </div>
      </section>

      <RelatedServices current="live-streaming" />
    </main>
  )
}
