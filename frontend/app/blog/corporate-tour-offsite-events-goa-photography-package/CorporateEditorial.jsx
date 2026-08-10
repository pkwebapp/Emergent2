'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Plus, Minus, ArrowRight, ArrowUpRight, MessageCircle,
  Presentation, Users, Camera, Trophy, Plane, Film, Sparkles, Check,
  Linkedin, Instagram, Clapperboard,
} from 'lucide-react'
import { useBlogInside } from '@/hooks/useMediaSlot'

const POST_ID = 'corporate-playbook'

const WHATSAPP = 'https://wa.me/+918888766739'

const TOC = [
  { id: 'conference', label: 'Conference', full: 'Conference Coverage' },
  { id: 'team-building', label: 'Team-Building', full: 'Team-Building Coverage' },
  { id: 'candid', label: 'Candid', full: 'Candid Documentation' },
  { id: 'gala', label: 'Gala & Awards', full: 'Gala & Awards Night' },
  { id: 'drone', label: 'Drone', full: 'Drone & Aerial Coverage' },
  { id: 'branded-video', label: 'Branded Video', full: 'Branded Videography' },
  { id: 'reels', label: 'Reels & Social', full: 'Reels & Social Content' },
  { id: 'faqs', label: 'FAQs', full: 'FAQs' },
]

const STATS = [
  { value: 12, suffix: '+', label: 'Years' },
  { value: 2000, suffix: '+', label: 'Projects' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { text: 'Mumbai · Goa · Delhi', label: 'Active Across' },
]

const SERVICES = [
  {
    id: 'conference', n: '01', Icon: Presentation,
    title: 'Conference & Plenary Session Coverage',
    tagline: 'The Formal Core',
    image: '/live-streaming/annual_tech_confrence.jpg',
    alt: 'Speaker on stage during a corporate conference in Goa photographed by PK Photography',
    body: [
      'Every offsite has its formal core — keynotes, panel discussions, award announcements, leadership addresses. This is the content your marketing and communications team will actually use on LinkedIn, in annual reports, and in internal newsletters.',
      'It needs to be clean, well-lit, and professionally shot — no distractions, no missed moments.',
    ],
    included: [
      'Multi-angle stage and speaker coverage',
      'Audience reaction and engagement shots',
      'High-resolution slides / branding capture for reference',
      'Quick-turnaround edited stills for same-day social posting',
    ],
    search: 'conference photography Goa · corporate event photographer for offsite',
    link: '/services/corporate-industrial',
  },
  {
    id: 'team-building', n: '02', Icon: Users,
    title: 'Team-Building & Offsite Activity Coverage',
    tagline: 'Where the Energy Lives',
    image: '/event-photography-6.jpg',
    alt: 'Corporate team-building beach activity in Goa captured by PK Photography',
    body: [
      'The real energy of a corporate offsite usually happens outside the conference hall — beach games, water sports, treasure hunts, cultural evenings.',
      'These moments are what employees actually remember and share, and they’re often the most engaging content for internal culture pages and recruitment marketing.',
    ],
    included: [
      'On-ground coverage of team-building activities and games',
      'Group and candid participation shots across the venue',
      'Coverage of themed evenings, bonfires and beach sessions',
      'Action-oriented shots for water sports / adventure activities',
    ],
    search: 'team building event photography Goa · corporate offsite activity coverage',
    link: '/services/events',
  },
  {
    id: 'candid', n: '03', Icon: Camera,
    title: 'Candid & Documentary-Style Coverage',
    tagline: 'The Real Story',
    image: '/event-photography-5.jpg',
    alt: 'Candid networking moment between colleagues at a corporate offsite in Goa',
    body: [
      'Beyond the scheduled sessions, the small interactions — colleagues networking, spontaneous laughter, unplanned group photos — tell the real story of how a team came together.',
      'Our team shoots documentary-style throughout the event so nothing feels staged or forced.',
    ],
    included: [
      'Discreet candid coverage across all offsite days',
      'Networking and informal interaction shots',
      'Behind-the-scenes moments — arrivals, check-ins, downtime',
      'Unscripted group and team moments',
    ],
    search: 'candid corporate event photography Goa · documentary style corporate coverage',
    link: '/services/corporate-industrial',
  },
  {
    id: 'gala', n: '04', Icon: Trophy,
    title: 'Gala Dinners & Awards Night Coverage',
    tagline: 'The Emotional High Point',
    image: '/event-photography-7.jpeg',
    alt: 'Corporate awards night and gala dinner celebration photographed in Goa by PK Photography',
    body: [
      'The closing night — whether it’s an awards ceremony, gala dinner, or themed party — is usually the emotional high point of a corporate offsite.',
      'This calls for a different shooting style: low-light expertise, stage lighting coordination, and coverage that balances formal award moments with the celebratory atmosphere.',
    ],
    included: [
      'Low-light and stage-lit event photography',
      'Award / recognition moment coverage',
      'Candid coverage of the celebration and dinner',
      'Group photos with leadership and teams',
    ],
    search: 'corporate awards night photography · gala dinner event photographer Goa',
    link: '/services/events',
  },
  {
    id: 'drone', n: '05', Icon: Plane,
    title: 'Drone & Aerial Coverage',
    tagline: 'Production-Value Scale',
    image: '/cinematic-video-aerials.jpg',
    alt: 'Aerial drone establishing shot of a beachfront resort corporate venue in Goa',
    body: [
      'Goa’s resort and beachfront venues are made for aerial shots — and for offsites, drone footage adds a scale and production value that ground-level coverage can’t match.',
      'It’s especially powerful for post-event brand films and recap videos.',
    ],
    included: [
      'Licensed drone pilot and equipment',
      'Aerial establishing shots of venue and resort',
      'Sky-view coverage of large group activities and team formations',
      'Drone stills for use in reports and marketing decks',
    ],
    search: 'drone photography corporate event Goa · aerial corporate offsite coverage',
    link: '/services/drone-services',
  },
  {
    id: 'branded-video', n: '06', Icon: Film,
    title: 'Branded Videography & Highlight Films',
    tagline: 'Your Brand, On Film',
    image: '/live-streaming/multi_camera_livestream.png',
    alt: 'Video crew filming a branded corporate highlight film at a Goa offsite',
    body: [
      'A well-edited recap film does more for internal engagement and employer branding than a photo gallery ever could.',
      'We build your offsite’s story into a highlight film that reflects your company’s visual identity — logos, brand colours, and tone included.',
    ],
    included: [
      'Multi-camera event videography across all days',
      'Branded intro / outro with company logo and colours',
      'Edited highlight film (3–6 min) with licensed music',
      'Raw footage handover option for internal archives',
    ],
    search: 'corporate event videography Goa · branded event highlight film',
    link: '/services/live-streaming',
  },
]

const REELS = [
  {
    Icon: Linkedin,
    title: 'LinkedIn Recap Content',
    body: 'Polished photo sets and short clips formatted specifically for LinkedIn, ready to post as the event wraps up.',
    image: '/event-photography-8.jpeg',
    alt: 'LinkedIn recap content set from a corporate offsite by PK Photography',
  },
  {
    Icon: Instagram,
    title: 'Instagram & Social Reels',
    body: 'Vertical, trend-aware reels covering team energy, activities, and highlights — built for Instagram and Stories engagement.',
    image: '/live-streaming/corporate_mettings.jpg',
    alt: 'Instagram social reels from a corporate event edited by PK Photography',
  },
  {
    Icon: Clapperboard,
    title: 'Same-Day Highlight Edit',
    body: 'A quick-turnaround edited video summarising the day’s key moments — useful for closing sessions or same-day leadership sharing.',
    image: '/event-photography-10.jpg',
    alt: 'Same-day highlight edit of a corporate offsite being reviewed on a laptop',
  },
]

/* ---------------- animated counter ---------------- */
function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 1600
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <span ref={ref} className="tabular">{n.toLocaleString('en-IN')}{suffix}</span>
}

function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ParallaxImage({ src, alt, priority = false, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 h-[116%] -top-[8%]">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority={priority} loading={priority ? undefined : 'lazy'} />
      </motion.div>
    </div>
  )
}

function ServiceSection({ s, reverse }) {
  return (
    <section id={s.id} className="scroll-mt-28 py-16 md:py-24">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
          <div className={`${reverse ? 'md:[direction:ltr]' : ''}`}>
            <Reveal y={40}>
              <ParallaxImage src={s.image} alt={s.alt} className="aspect-[4/3] rounded-[4px]" />
            </Reveal>
          </div>
          <div className={`${reverse ? 'md:[direction:ltr]' : ''}`}>
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-cormorant text-5xl md:text-6xl leading-none text-[#B8863B]">{s.n}</span>
                <span className="h-px flex-1 bg-[#DBD4C6]" />
                <s.Icon size={22} className="text-[#8A857D]" strokeWidth={1.5} />
              </div>
              <p className="eyebrow mb-3">{s.tagline}</p>
              <h2 className="font-cormorant text-3xl md:text-4xl lg:text-[3rem] leading-[1.04] text-[#161514] mb-6">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed text-[#4a463f] mb-4 max-w-xl">{p}</p>
              ))}
              <p className="eyebrow mb-4 mt-8">What’s included</p>
              <ul className="space-y-3 mb-8">
                {s.included.map((it, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="mt-1 shrink-0 w-5 h-5 rounded-full grid place-content-center" style={{ backgroundColor: '#F1E7D2' }}>
                      <Check size={12} className="text-[#B8863B]" strokeWidth={3} />
                    </span>
                    <span className="text-[#4a463f] leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href={s.link} data-testid={`service-link-${s.id}`} className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[#161514] hover:text-[#B8863B] transition-colors">
                  Explore this service <ArrowRight size={15} />
                </Link>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#a8a298]">{s.search}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Faq({ faqs }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-[#DBD4C6] border-y border-[#DBD4C6]">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button data-testid={`faq-toggle-${i}`} onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-6 py-6 text-left group" aria-expanded={isOpen}>
              <span className={`font-cormorant text-2xl md:text-[1.75rem] leading-snug transition-colors ${isOpen ? 'text-[#B8863B]' : 'text-[#161514] group-hover:text-[#96662a]'}`}>{f.q}</span>
              <span className={`shrink-0 w-9 h-9 rounded-full grid place-content-center border transition-colors ${isOpen ? 'bg-[#B8863B] border-[#B8863B] text-white' : 'border-[#DBD4C6] text-[#161514] group-hover:border-[#B8863B]'}`}>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                  <p className="pb-7 pr-12 text-base md:text-lg leading-relaxed text-[#4a463f] max-w-3xl">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ================= PAGE ================= */
export default function CorporateEditorial({ faqs }) {
  const heroRef = useRef(null)
  const { scrollYProgress: pageProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '20%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.12])
  const heroTextY = useTransform(heroProgress, [0, 1], ['0%', '55%'])
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0])

  const [active, setActive] = useState('conference')

  // Admin-managed inside images (ordered 1,2,3,4… via the "Sort order" field).
  const { pick } = useBlogInside(POST_ID)
  const services = SERVICES.map((s, i) => ({ ...s, image: pick(i + 1, s.image) }))
  useEffect(() => {
    const ids = TOC.map((t) => t.id)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const headline = ['Corporate Tour & Offsite', 'Events in Goa']

  return (
    <main className="bg-[#EEEAE1] text-[#161514]">
      <motion.div style={{ scaleX: pageProgress }} className="fixed top-0 left-0 right-0 h-[3px] bg-[#B8863B] z-[95] origin-left" />

      {/* ---------------- HERO ---------------- */}
      <section ref={heroRef} data-transparent-header="true" data-testid="corporate-hero-section" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden flex items-end">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image src="/event-photography-cover.jpg" alt="Corporate offsite conference and gala setup at a Goa beach resort" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/45 to-[#0d0f12]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f12]/70 via-transparent to-transparent" />

        <motion.div style={{ y: heroTextY, opacity: heroFade }} className="relative z-10 w-full">
          <div className="container mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/blogs" className="hover:text-white transition-colors">Blog</Link></li>
                <li aria-hidden>/</li>
                <li className="text-[#E7C67A]">Corporate Offsite Coverage Goa</li>
              </ol>
            </nav>
            <p className="eyebrow !text-[#E7C67A] mb-5">MICE &amp; Corporate Events · Goa</p>
            <h1 className="font-cormorant text-white text-[2.8rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[6rem] max-w-5xl">
              {headline.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em]">
                  <motion.span className="block pb-[0.06em]" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }} className="mt-7 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">
              Professional coverage your marketing team can use — and candid energy your people will actually share. Here’s exactly what’s included.
            </motion.p>
          </div>
        </motion.div>

        <motion.div style={{ opacity: heroFade }} className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}><ChevronDown size={20} /></motion.div>
        </motion.div>
      </section>

      {/* ---------------- MOBILE TOC ---------------- */}
      <div className="md:hidden sticky top-[60px] z-[70] bg-[#EEEAE1]/92 backdrop-blur-md border-y border-[#DBD4C6]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
          {TOC.map((t) => (
            <a key={t.id} href={`#${t.id}`} data-testid={`toc-mobile-${t.id}`} className={`shrink-0 whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${active === t.id ? 'bg-[#161514] text-white border-[#161514]' : 'bg-transparent text-[#4a463f] border-[#DBD4C6]'}`}>{t.label}</a>
          ))}
        </div>
      </div>

      {/* ---------------- INTRO + TOC ---------------- */}
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="md:grid md:grid-cols-[1fr_260px] md:gap-16">
          <div>
            <section className="py-16 md:py-24">
              <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <Reveal>
                  <p className="eyebrow mb-4">The Introduction</p>
                  <h2 className="font-cormorant text-3xl md:text-[2.6rem] leading-[1.08] mb-6 text-[#161514]">
                    Goa is India’s go-to destination for corporate offsites — but an offsite is only as memorable as its documentation.
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f] mb-4">
                    The beaches, resort infrastructure, and relaxed setting make it perfect for teams to bond and businesses to celebrate milestones. With <strong className="text-[#161514]">12+ years and 2000+ projects</strong> across Mumbai, Goa, and Delhi, we’ve built a coverage system specifically for corporate groups.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f]">
                    One that captures both the professional moments your marketing team needs and the candid energy your HR team wants to share internally. Here’s exactly what’s included.
                  </p>
                </Reveal>
                <Reveal delay={0.15} y={40}>
                  <ParallaxImage src="/live-streaming/tech_summit.jpg" alt="Corporate summit session at a Goa resort covered by PK Photography" priority className="aspect-[4/5] rounded-[4px] shadow-2xl" />
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-[#DBD4C6] pt-10">
                  {STATS.map((st) => (
                    <div key={st.label} className="text-center md:text-left">
                      <div className="font-cormorant text-3xl md:text-[2.75rem] text-[#161514] leading-tight">
                        {st.text ? st.text : <Counter value={st.value} suffix={st.suffix} />}
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8A857D]">{st.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            <div className="divide-y divide-[#DBD4C6]/70">
              {services.map((s, i) => (
                <ServiceSection key={s.id} s={s} reverse={i % 2 === 1} />
              ))}
            </div>
          </div>

          <aside className="hidden md:block">
            <div className="sticky top-28 py-24">
              <p className="eyebrow mb-6">On this page</p>
              <nav className="relative">
                <span className="absolute left-[5px] top-1 bottom-1 w-px bg-[#DBD4C6]" />
                <ul className="space-y-1">
                  {TOC.map((t) => {
                    const on = active === t.id
                    return (
                      <li key={t.id} className="relative pl-6">
                        <span className={`absolute left-0 top-[9px] w-[11px] h-[11px] rounded-full border-2 transition-colors ${on ? 'bg-[#B8863B] border-[#B8863B]' : 'bg-[#EEEAE1] border-[#CFC7B6]'}`} />
                        <a href={`#${t.id}`} data-testid={`toc-${t.id}`} className={`block py-1.5 text-sm transition-colors ${on ? 'text-[#161514] font-semibold' : 'text-[#8A857D] hover:text-[#161514]'}`}>{t.full}</a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* ---------------- REELS 3-COL GRID ---------------- */}
      <section id="reels" className="scroll-mt-28 py-16 md:py-28 bg-[#12233A] text-white overflow-hidden">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <span className="font-cormorant text-5xl md:text-6xl text-[#E7C67A] leading-none">07</span>
              <p className="eyebrow mt-4 mb-3 !text-[#E7C67A]">Quick-Turnaround Content</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02]">Reels &amp; Social Content</h2>
              <p className="mt-5 text-white/70 text-lg leading-relaxed">
                Corporate content moves fast — your marketing team often needs shareable content within hours, not weeks. We build a same-day / next-day delivery workflow so your team can post while the event is still relevant.
              </p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {REELS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1} y={36}>
                <div className="group h-full flex flex-col rounded-[4px] overflow-hidden bg-white/[0.05] border border-white/10 lift">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={a.image} alt={a.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[#B8863B] grid place-content-center text-white"><a.Icon size={18} strokeWidth={1.8} /></div>
                  </div>
                  <div className="p-7 flex-1">
                    <h3 className="font-cormorant text-2xl md:text-[1.7rem] mb-3">{a.title}</h3>
                    <p className="text-white/65 leading-relaxed">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[11px] uppercase tracking-[0.14em] text-white/40">corporate event reels · same day edit corporate event video</p>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faqs" className="scroll-mt-28 py-16 md:py-28">
        <div className="container mx-auto max-w-[900px] px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">People Also Ask</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-[#161514]">Frequently Asked Questions</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}><Faq faqs={faqs} /></Reveal>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/destination-weddings.jpg" alt="Beachfront corporate offsite venue in Goa" fill sizes="100vw" className="object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[#0d0f12]/85" />
        </div>
        <div className="relative container mx-auto max-w-[1000px] px-6 md:px-10 py-24 md:py-32 text-center text-white">
          <Reveal>
            <p className="eyebrow mb-5 !text-[#E7C67A]">Let’s Plan It</p>
            <h2 className="font-cormorant text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.02] mb-6">Planning a Corporate Offsite in Goa?</h2>
            <p className="max-w-2xl mx-auto text-white/75 text-lg leading-relaxed mb-10">
              From conference sessions to beach team-building, gala nights to branded recap films — we document every part of your corporate event so your team, and your brand, get to relive it properly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking" data-testid="cta-quote" className="inline-flex items-center gap-2 bg-[#B8863B] hover:bg-[#96662a] text-white font-semibold px-8 py-4 rounded-full transition-colors">
                Get a Custom Quote <ArrowRight size={17} />
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" data-testid="cta-whatsapp" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb757] text-white font-semibold px-8 py-4 rounded-full transition-colors">
                <MessageCircle size={17} /> Quick Chat on WhatsApp
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm">
              <Link href="/services/corporate-industrial" data-testid="cta-gallery" className="link-underline text-white/80 hover:text-white inline-flex items-center gap-1.5">View Corporate Event Gallery <ArrowUpRight size={14} /></Link>
              <span className="text-white/30">·</span>
              <Link href="/pricing" data-testid="cta-pricing" className="link-underline text-white/80 hover:text-white inline-flex items-center gap-1.5">See Pricing <ArrowUpRight size={14} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
