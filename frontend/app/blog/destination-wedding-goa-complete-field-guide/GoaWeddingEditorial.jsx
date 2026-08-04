'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import {
  ChevronDown,
  Plus,
  Minus,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Check,
  MapPin,
  Sun,
  Camera,
  Utensils,
  Palette,
  Music,
  Sparkles,
  Users,
  Compass,
  Home,
  Star,
  Quote,
  Percent,
  Coins,
  Route,
  Clock,
  ShieldCheck,
} from 'lucide-react'

const WHATSAPP = 'https://wa.me/+918888766739'

const TOC = [
  { id: 'intro', label: 'Intro', full: 'Why Goa' },
  { id: 'checklist', label: 'What you need', full: 'What you actually need' },
  { id: 'regions', label: 'N vs S', full: 'North Goa vs South Goa' },
  { id: 'venues', label: 'Venues', full: 'Venue Guide' },
  { id: 'budget', label: 'Budget', full: 'Real cost breakdown' },
  { id: 'local', label: 'Why us', full: 'Why book a local team' },
  { id: 'management', label: 'Management', full: 'Our wedding management' },
  { id: 'timeline', label: 'Timeline', full: '12-month timeline' },
  { id: 'faqs', label: 'FAQs', full: 'FAQs' },
]

const STATS_INTRO = [
  { v: 12, s: '+', l: 'Years shooting Goa' },
  { v: 200, s: '+', l: 'Goa weddings delivered' },
  { v: 2, s: '', l: 'Both North & South Goa' },
]

const CHECKLIST = [
  {
    id: 'venue',
    Icon: Home,
    title: 'Venue & accommodation',
    body:
      'Your single biggest line item — commonly 30–65% of the wedding budget. Options range from a 25-guest villa to a full 200-room beach resort buyout.',
    tag: '30–65% of budget',
  },
  {
    id: 'catering',
    Icon: Utensils,
    title: 'Catering & bar',
    body:
      'Mid-to-upscale plate cost usually lands between ₹2,000–₹5,500. Multi-cuisine buffets, live counters, and bar packages are all separate line items.',
    tag: '₹2k–₹5.5k / plate',
  },
  {
    id: 'photography',
    Icon: Camera,
    title: 'Photography & cinematography',
    body:
      'Full-wedding packages (2–3 days, photo + film + drone + reels) commonly land between ₹3–8 lakh — depending on team size, days, and deliverables.',
    tag: '₹3L–₹8L',
  },
  {
    id: 'decor',
    Icon: Palette,
    title: 'Décor, floral & mandap',
    body:
      'From ₹3 lakh for a clean minimal setup to ₹40 lakh+ for editorial floral installations and multi-space theming. This is where scale shows.',
    tag: '₹3L–₹40L+',
  },
  {
    id: 'entertainment',
    Icon: Music,
    title: 'Entertainment & artists',
    body:
      'Live bands, DJs, sundowner sets, and celebrity acts usually add ₹5–15 lakh, going higher for headline artists. Sound + lights are often bundled.',
    tag: '₹5L–₹15L+',
  },
  {
    id: 'logistics',
    Icon: Users,
    title: 'Guest logistics & hospitality',
    body:
      'Airport transfers, welcome kits, in-hotel coordinators, RSVP tracking. Usually ₹4–10 lakh depending on guest count and how hands-off you want to be.',
    tag: '₹4L–₹10L',
  },
  {
    id: 'planner',
    Icon: Sparkles,
    title: 'Planner / management',
    body:
      'Full-service planners typically charge ₹5–12 lakh (or a % of total spend). A local guided model — like ours — can cut this dramatically without cutting quality.',
    tag: '₹5L–₹12L',
  },
  {
    id: 'permits',
    Icon: ShieldCheck,
    title: 'Permits & compliance',
    body:
      'Sound, alcohol, drone, beach and firework permits — resorts handle most in-house. Beach ceremonies and off-property shoots may need coastal / municipal clearances.',
    tag: 'Handled in-package',
  },
]

const REGIONS = {
  north: {
    title: 'North Goa',
    kicker: 'Trendy · lively · modern',
    image: '/wedding/preWedding.jpg',
    alt: 'North Goa destination wedding — cliffside and beach clubs by PK Photography',
    rows: [
      { k: 'Vibe', v: 'Younger, social, party-friendly — good for a high-energy sangeet' },
      { k: 'Venue types', v: 'Cliff resorts, beach clubs, Portuguese villas — Vagator, Anjuna, Assagao, Mandrem, Candolim' },
      { k: 'Named venues', v: 'W Goa · Grand Hyatt Bambolim · Cidade de Goa · Riva Beach Mandrem · private villas' },
      { k: 'Access', v: 'Manohar Intl. Airport (MOPA) is ~45 min; Dabolim is ~1.5 hr' },
      { k: 'Best for', v: 'Younger couples, cocktail-heavy events, easier guest nightlife' },
    ],
  },
  south: {
    title: 'South Goa',
    kicker: 'Calm · scenic · relaxed',
    image: '/destination-weddings.jpg',
    alt: 'South Goa beach wedding at Taj Exotica or Leela Cavelossim by PK Photography',
    rows: [
      { k: 'Vibe', v: 'Quieter, greener, more private — dinner ceremonies feel cinematic' },
      { k: 'Venue types', v: 'Big 5-star beachfront resorts on wide, empty beaches' },
      { k: 'Named venues', v: 'Taj Exotica · The Leela · Park Hyatt · ITC Grand · Alila Diwa · Caravela Varca' },
      { k: 'Access', v: 'Dabolim Airport is ~45 min; MOPA (North) is ~2 hr' },
      { k: 'Best for', v: 'Family-heavy guest lists, luxury buyouts, beach ceremonies' },
    ],
  },
}

const VENUES = [
  {
    tier: 'Under ₹25 L',
    hue: '#4a463f',
    title: 'Intimate & boutique',
    venues: [
      'Riva Beach Resort, Mandrem — beachfront, mid-range',
      'Private Portuguese villas — Assagao, Anjuna',
      'Nanu Resort, Betalbatim — value beach option',
      '25–60 guests · 1–2 events · minimal décor',
    ],
    image: '/wedding/corousal/img4.jpg',
    alt: 'Boutique beachfront wedding in Goa — under 25 lakh budget',
  },
  {
    tier: '₹25 L – ₹50 L',
    hue: '#8A6A4A',
    title: 'Mid-range resort weddings',
    venues: [
      'Caravela Beach Resort, Varca — dependable South Goa 5-star',
      'Cidade de Goa, Vainguinim — classic Goa feel',
      'Alila Diwa Goa, Majorda — design-led boutique-luxury',
      '80–150 guests · 2 days · full décor',
    ],
    image: '/wedding/corousal/img7.jpg',
    alt: 'Mid-range destination wedding at Caravela or Cidade de Goa',
  },
  {
    tier: '₹50 L – ₹1 Cr',
    hue: '#E24A12',
    title: 'Premium beachfront',
    venues: [
      'Grand Hyatt Goa, Bambolim — big property, flexible',
      'Park Hyatt Goa, Arossim — colonial elegance',
      'ITC Grand Goa, Cansaulim — premium & spacious',
      '120–200 guests · 2–3 events · signature décor',
    ],
    image: '/wedding/corousal/img2.jpg',
    alt: 'Premium beachfront wedding at Grand Hyatt or Park Hyatt Goa',
  },
  {
    tier: '₹1 Cr +',
    hue: '#161514',
    title: 'Luxury & full buyouts',
    venues: [
      'Taj Exotica Resort & Spa, Benaulim — iconic',
      'The Leela Goa, Cavelossim — estate-style',
      'W Goa, Vagator — modern, cliffside',
      '150+ guests · full buyout · editorial-scale décor',
    ],
    image: '/wedding/corousal/img11.jpg',
    alt: 'Luxury destination wedding at Taj Exotica, Leela Goa or W Goa',
  },
]

const BUDGET_ROWS = [
  {
    range: '25–50 guests',
    style: 'Intimate villa or boutique',
    total: '₹8L – ₹15L',
    note: 'Sunset-ceremony format, 1 day + reception dinner.',
  },
  {
    range: '50–100 guests',
    style: 'Boutique resort',
    total: '₹20L – ₹60L',
    note: 'Comfortable starting bracket for a 2-day Goa wedding.',
  },
  {
    range: '100–150 guests',
    style: 'Mid-range 4-star / 5-star',
    total: '₹30L – ₹1 Cr',
    note: 'The most common “full destination wedding” bracket.',
  },
  {
    range: '150–250 guests',
    style: 'Premium beachfront resort',
    total: '₹1 Cr – ₹2.5 Cr',
    note: 'Bigger events, richer décor, longer format.',
  },
  {
    range: '250+ guests',
    style: 'Full-property luxury buyout',
    total: '₹2.5 Cr +',
    note: 'Complete resort takeover, celebrity acts on the roster.',
  },
]

const WHY_LOCAL = [
  {
    Icon: Coins,
    stat: '20–35%',
    title: 'Lower total cost',
    body:
      'No return flights, no twin-share rooms, no travel days — a local team of the same size can be 20–35% cheaper than flying an equivalent crew in from Mumbai or Delhi.',
  },
  {
    Icon: MapPin,
    stat: 'Both',
    title: 'North + South Goa coverage',
    body:
      'We drive between locations without inter-city flights. Haldi in Assagao, cocktail at W Goa, phera at Taj Exotica — same team, same lenses, same day.',
  },
  {
    Icon: Compass,
    stat: '2000+',
    title: 'Location-scouted from memory',
    body:
      'Twelve years of shooting Goa means we already know every property’s light, every rain-backup, every hidden portrait corner. No location recce charges.',
  },
  {
    Icon: ShieldCheck,
    stat: '0',
    title: 'Flight-delay risk',
    body:
      'Wedding morning fog in Delhi doesn’t affect us. We land at the venue the night before regardless — and if a second team is needed, it’s a 40-minute drive, not a 3-hour flight.',
  },
]

const MANAGEMENT = [
  {
    id: 'full',
    Icon: Sparkles,
    title: 'Full Wedding Management',
    tag: 'End-to-end · handled for you',
    price: 'On enquiry',
    inclusions: [
      'Venue shortlist + contract negotiation',
      'Décor, floral & mandap partners curated',
      'Catering / bar / cake orchestration',
      'Guest logistics — airport, transfers, welcome kits',
      'On-ground team on all wedding days',
      'Photography + cinematography built in',
    ],
    highlighted: true,
  },
  {
    id: 'guide',
    Icon: Compass,
    title: 'The Guided Model',
    tag: 'You book direct · we advise',
    price: 'Included with our photography',
    inclusions: [
      'Venue recommendations from 200+ shoots',
      'Vendor contact sheet + honest opinions',
      'Décor mood-board consult',
      'On-call planning support up to wedding day',
      'Zero mark-up on external vendors',
      'Photography team handles day-of logistics',
    ],
    highlighted: false,
  },
  {
    id: 'photo',
    Icon: Camera,
    title: 'Photo & Film Only',
    tag: 'Already have a planner? We plug in.',
    price: 'From ₹80,000',
    inclusions: [
      'Single-day wedding coverage',
      '2 photographers + 2 videographers',
      'Candid & traditional photography',
      'Cinematic & traditional videography',
      'Drone cinematography',
      'All edited photographs',
      'Cinematic wedding highlight film',
      'Traditional wedding film',
    ],
    highlighted: false,
  },
]

const TIMELINE = [
  { m: '12–9 mo', title: 'Lock the shape', body: 'Guest count, budget bracket, region (N vs S), and date window.' },
  { m: '9–6 mo', title: 'Book the anchors', body: 'Venue, photographer/film, planner (if any). These are the hardest to swap later.' },
  { m: '6–4 mo', title: 'Curate the day', body: 'Décor, catering, entertainment, wardrobe. Trials and menu tastings begin.' },
  { m: '4–2 mo', title: 'Guest layer', body: 'Save-the-dates, transfers, welcome kits, RSVP tracking, itinerary drafts.' },
  { m: '2–0 mo', title: 'Rehearse & relax', body: 'Final walk-through, permits, shot-list lock, and the last two weeks reserved for you, not vendors.' },
]

/* ----------- Reveal ----------- */
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

/* ----------- Counter ----------- */
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
  return (
    <span ref={ref} className="tabular">
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

/* ----------- Parallax image ----------- */
function Parallax({ src, alt, className = '', priority = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 h-[116%] -top-[8%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      </motion.div>
    </div>
  )
}

/* ----------- FAQ ----------- */
function Faq({ faqs }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-[#DBD4C6] border-y border-[#DBD4C6]">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              data-testid={`dw-faq-toggle-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              aria-expanded={isOpen}
            >
              <span className={`font-cormorant text-2xl md:text-[1.75rem] leading-snug transition-colors ${isOpen ? 'text-[#FF5B22]' : 'text-[#161514] group-hover:text-[#E24A12]'}`}>
                {f.q}
              </span>
              <span className={`shrink-0 w-9 h-9 rounded-full grid place-content-center border transition-colors ${isOpen ? 'bg-[#FF5B22] border-[#FF5B22] text-white' : 'border-[#DBD4C6] text-[#161514] group-hover:border-[#FF5B22]'}`}>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pr-12 text-base md:text-lg leading-relaxed text-[#4a463f] max-w-3xl">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* =============== PAGE =============== */
export default function GoaWeddingEditorial({ faqs }) {
  const heroRef = useRef(null)
  const { scrollYProgress: pageProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '20%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1])
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0])

  const [active, setActive] = useState('intro')

  useEffect(() => {
    const ids = TOC.map((t) => t.id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const headline = ['Two coastlines,', 'one long', 'wedding weekend.']

  return (
    <main data-testid="dw-blog-page" className="bg-[#EEEAE1] text-[#161514]">
      <motion.div style={{ scaleX: pageProgress }} className="hidden" />

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        data-transparent-header="true"
        data-testid="dw-hero"
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-end"
      >
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image
            src="/destination-weddings.jpg"
            alt="Destination wedding in Goa — beach ceremony at sunset by PK Photography"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/40 to-[#0d0c0b]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0b]/70 via-transparent to-transparent" />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 w-full">
          <div className="container mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70 flex-wrap">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/blogs" className="hover:text-white transition-colors">Blog</Link></li>
                <li aria-hidden>/</li>
                <li className="text-[#FF5B22]">Destination Wedding in Goa</li>
              </ol>
            </nav>

            <p className="eyebrow !text-[#FF7A4d] mb-5">A Goa Field Guide · Vol. 08</p>
            <h1 className="font-cormorant text-white text-[2.6rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[6rem] max-w-5xl">
              {headline.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className={`block pb-[0.06em] ${i === 1 ? 'italic text-[#FF7A4d]' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-6 max-w-2xl text-base md:text-xl text-white/80 leading-relaxed"
            >
              Planning a destination wedding in Goa — venues, real 2026 costs,
              North vs South, what you actually need, and why a local team
              usually saves you 20–35%. No fluff.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/booking"
                data-testid="dw-hero-cta-book"
                className="inline-flex items-center gap-2 bg-white text-[#161514] hover:bg-[#FF5B22] hover:text-white transition-colors font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                Plan your Goa wedding <ArrowUpRight size={15} />
              </Link>
              <a
                href="#venues"
                data-testid="dw-hero-cta-venues"
                className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 transition-colors font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                See venues
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: heroFade }} className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ============ MOBILE TOC ============ */}
      <div className="md:hidden sticky top-[60px] z-[70] bg-[#EEEAE1]/92 backdrop-blur-md border-y border-[#DBD4C6]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
          {TOC.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              data-testid={`dw-toc-mobile-${t.id}`}
              className={`shrink-0 whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${active === t.id ? 'bg-[#161514] text-white border-[#161514]' : 'bg-transparent text-[#4a463f] border-[#DBD4C6]'}`}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>

      {/* ============ MAIN GRID with TOC ============ */}
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="md:grid md:grid-cols-[1fr_240px] md:gap-16">
          <div>

            {/* -------- Intro -------- */}
            <section id="intro" className="scroll-mt-28 py-16 md:py-24">
              <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <Reveal>
                  <p className="eyebrow mb-4">Chapter 01 — The premise</p>
                  <h2 className="font-cormorant text-3xl md:text-[2.6rem] leading-[1.06] mb-6 text-[#161514]">
                    Goa is the only destination in India where{' '}
                    <em className="text-[#E24A12] not-italic font-normal">
                      the beach, the palace, and the jungle
                    </em>{' '}
                    are all a 40-minute drive from each other.
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f] mb-4">
                    That single geographic accident is why you can do a haldi
                    in an Assagao villa on Friday, a cocktail on a Vagator
                    cliff at sunset, and the pheras on a South Goa beach on
                    Sunday morning — without asking your guests to change
                    cities or take a second flight.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f]">
                    This guide is the map we wish we’d had when we started
                    shooting Goa weddings twelve years ago. Venues, budgets,
                    vendors, permits, timelines, and the honest tradeoffs
                    nobody puts on their brochure.
                  </p>
                </Reveal>
                <Reveal delay={0.12} y={40}>
                  <Parallax
                    src="/wedding/rituals.jpg"
                    alt="Destination wedding rituals in Goa — mandap by the beach by PK Photography"
                    className="aspect-[4/5] rounded-[4px]"
                    priority
                  />
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-y-8 border-t border-[#DBD4C6] pt-10">
                  {STATS_INTRO.map((st) => (
                    <div key={st.l} className="text-center md:text-left">
                      <div className="font-cormorant text-4xl md:text-6xl text-[#161514] leading-none">
                        <Counter value={st.v} suffix={st.s} />
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8A857D]">
                        {st.l}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>
          </div>

          {/* -------- Sticky TOC -------- */}
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
                        <span className={`absolute left-0 top-[9px] w-[11px] h-[11px] rounded-full border-2 transition-colors ${on ? 'bg-[#FF5B22] border-[#FF5B22]' : 'bg-[#EEEAE1] border-[#CFC7B6]'}`} />
                        <a
                          href={`#${t.id}`}
                          data-testid={`dw-toc-${t.id}`}
                          className={`block py-1.5 text-sm transition-colors ${on ? 'text-[#161514] font-semibold' : 'text-[#8A857D] hover:text-[#161514]'}`}
                        >
                          {t.full}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* ============ FULL-WIDTH CHAPTERS 2–4 ============ */}
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        {/* -------- What you actually need (checklist grid) -------- */}
        <section id="checklist" className="scroll-mt-28 py-12 md:py-20 border-t border-[#DBD4C6]">
              <Reveal>
                <div className="mb-10 md:mb-14 max-w-3xl">
                  <p className="eyebrow mb-3">Chapter 02 — The moving parts</p>
                  <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                    What a Goa wedding{' '}
                    <em className="text-[#E24A12] not-italic font-normal">actually needs.</em>
                  </h2>
                  <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                    Eight moving parts, in the rough order most couples confront them. Skip any of these and the day looks it — nail all of them and your guests will remember it forever.
                  </p>
                </div>
              </Reveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {CHECKLIST.map((c, i) => (
                  <Reveal key={c.id} delay={i * 0.05} y={30}>
                    <article
                      data-testid={`dw-need-${c.id}`}
                      className="h-full flex flex-col bg-white border border-[#DBD4C6] rounded-[4px] p-6 lift"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-10 h-10 rounded-full bg-[#F3E4DC] grid place-content-center">
                          <c.Icon size={18} className="text-[#E24A12]" strokeWidth={1.75} />
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A857D]">{c.tag}</span>
                      </div>
                      <h3 className="font-cormorant text-2xl md:text-[1.6rem] leading-tight text-[#161514]">{c.title}</h3>
                      <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-[#4a463f]">{c.body}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* -------- N vs S comparison (like Headshot vs Portrait) -------- */}
            <section id="regions" className="scroll-mt-28 py-16 md:py-24 border-t border-[#DBD4C6]">
              <Reveal>
                <div className="mb-10 md:mb-14 max-w-3xl">
                  <p className="eyebrow mb-3">Chapter 03 — Pick your coast</p>
                  <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                    North Goa <em className="text-[#E24A12] not-italic font-normal">vs</em> South Goa.
                  </h2>
                  <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                    Both give you sea, sun and coconut palms. The real difference is the vibe of the guest experience and the shape of the venues you can pick from.
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                {[REGIONS.north, REGIONS.south].map((col, idx) => (
                  <Reveal key={col.title} delay={idx * 0.08}>
                    <article
                      data-testid={`dw-region-${idx === 0 ? 'north' : 'south'}`}
                      className={`h-full flex flex-col border rounded-[4px] overflow-hidden ${idx === 0 ? 'bg-[#161514] text-white border-[#161514]' : 'bg-white text-[#161514] border-[#DBD4C6]'}`}
                    >
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image src={col.image} alt={col.alt} fill sizes="(max-width:768px) 100vw, 45vw" className="object-cover" loading="lazy" />
                      </div>
                      <div className="p-7 md:p-9 flex-1">
                        <p className={`eyebrow ${idx === 0 ? '!text-[#FF7A4d]' : ''}`}>{col.kicker}</p>
                        <h3 className="mt-2 font-cormorant text-3xl md:text-4xl leading-tight">{col.title}</h3>
                        <dl className="mt-6 space-y-4">
                          {col.rows.map((r) => (
                            <div key={r.k} className="grid grid-cols-[110px_1fr] gap-4">
                              <dt className={`text-[10px] uppercase tracking-[0.22em] pt-1 ${idx === 0 ? 'text-white/60' : 'text-[#8A857D]'}`}>{r.k}</dt>
                              <dd className={`text-base leading-relaxed ${idx === 0 ? 'text-white/85' : 'text-[#4a463f]'}`}>{r.v}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <p className="mt-10 text-[#4a463f] text-base md:text-lg leading-relaxed max-w-3xl">
                  You don’t have to pick just one. Roughly half of our couples end up splitting events across both coasts — mehendi + cocktail in North Goa, main ceremony + reception in South Goa. We drive the entire team between them.
                </p>
              </Reveal>
            </section>

            {/* -------- Venue Guide -------- */}
            <section id="venues" className="scroll-mt-28 py-16 md:py-24 border-t border-[#DBD4C6]">
              <Reveal>
                <div className="mb-10 md:mb-14 max-w-3xl">
                  <p className="eyebrow mb-3">Chapter 04 — The venue atlas</p>
                  <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                    Venue options,{' '}
                    <em className="text-[#E24A12] not-italic font-normal">by budget tier.</em>
                  </h2>
                  <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                    Every property below is one we’ve worked at or scouted for our couples. Contact any of them directly, or let us shortlist and negotiate on your behalf.
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {VENUES.map((v, i) => (
                  <Reveal key={v.tier} delay={i * 0.08} y={40}>
                    <article
                      data-testid={`dw-venue-tier-${i}`}
                      className="h-full flex flex-col bg-white border border-[#DBD4C6] rounded-[4px] overflow-hidden lift"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={v.image} alt={v.alt} fill sizes="(max-width:768px) 100vw, 45vw" className="object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/50 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold text-white"
                            style={{ backgroundColor: v.hue }}
                          >
                            {v.tier}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white font-cormorant text-2xl md:text-3xl leading-tight max-w-[80%]">
                          {v.title}
                        </div>
                      </div>
                      <ul className="p-6 md:p-7 space-y-3 flex-1">
                        {v.venues.map((line, j) => (
                          <li key={j} className="flex gap-3 items-start text-[#4a463f] leading-relaxed">
                            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#E24A12]" />
                            <span className="text-sm md:text-base">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>

          {/* ============ BUDGET SECTION (full-bleed) ============ */}
      <section id="budget" className="scroll-mt-28 py-16 md:py-24 bg-[#F3E4DC]/40 border-y border-[#DBD4C6]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-3xl mb-10 md:mb-14">
              <p className="eyebrow mb-3">Chapter 05 — The numbers</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                Real cost breakdown{' '}
                <em className="text-[#E24A12] not-italic font-normal">for 2026.</em>
              </h2>
              <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                Numbers below are aggregate ranges from actual 2025–26 Goa weddings — mid-tier resorts, standard décor, average 2-day format. Add luxury venues or celebrity acts and the top end climbs quickly.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-[4px] border border-[#DBD4C6] bg-white overflow-hidden">
              <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_1.4fr] px-6 py-4 bg-[#161514] text-white">
                <span className="eyebrow !text-white/70">Guest count</span>
                <span className="eyebrow !text-white/70">Style</span>
                <span className="eyebrow !text-white/70">Total budget</span>
                <span className="eyebrow !text-white/70">Notes</span>
              </div>
              <ul className="divide-y divide-[#DBD4C6]">
                {BUDGET_ROWS.map((b) => (
                  <li
                    key={b.range}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1.4fr] gap-1 md:gap-6 px-6 py-5 hover:bg-[#F3E4DC]/40 transition-colors"
                  >
                    <span className="font-cormorant text-xl md:text-2xl leading-snug text-[#161514]">{b.range}</span>
                    <span className="text-sm md:text-base text-[#4a463f] leading-snug">{b.style}</span>
                    <span className="text-sm md:text-base font-semibold text-[#E24A12] tabular whitespace-nowrap">{b.total}</span>
                    <span className="text-sm text-[#8A857D] leading-relaxed">{b.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-[#DBD4C6] rounded-[4px]">
                <Percent size={22} className="text-[#E24A12]" strokeWidth={1.5} />
                <p className="mt-3 eyebrow">Rule of thumb</p>
                <p className="mt-2 font-cormorant text-2xl md:text-[1.6rem] leading-snug text-[#161514]">
                  Venue + rooms = 30–65% of total spend.
                </p>
              </div>
              <div className="p-6 bg-white border border-[#DBD4C6] rounded-[4px]">
                <Coins size={22} className="text-[#E24A12]" strokeWidth={1.5} />
                <p className="mt-3 eyebrow">Per plate</p>
                <p className="mt-2 font-cormorant text-2xl md:text-[1.6rem] leading-snug text-[#161514]">
                  ₹2,000–₹5,500 mid-tier; higher at 5-stars.
                </p>
              </div>
              <div className="p-6 bg-white border border-[#DBD4C6] rounded-[4px]">
                <Route size={22} className="text-[#E24A12]" strokeWidth={1.5} />
                <p className="mt-3 eyebrow">Hidden line-items</p>
                <p className="mt-2 font-cormorant text-2xl md:text-[1.6rem] leading-snug text-[#161514]">
                  GST · outside-vendor charges · overtime.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ WHY LOCAL / WHY US ============ */}
      <section id="local" className="scroll-mt-28 py-16 md:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <Reveal>
              <p className="eyebrow mb-3">Chapter 06 — The unfair advantage</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                Why couples pick a{' '}
                <em className="text-[#E24A12] not-italic font-normal">local Goa team</em>{' '}
                instead of flying their city crew in.
              </h2>
              <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed max-w-xl">
                We’re not against your Mumbai or Delhi photographer coming down — many of them are our friends. But if you’re booking fresh, the math and the logistics almost always favour a local team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  data-testid="dw-local-cta-book"
                  className="inline-flex items-center gap-2 bg-[#161514] text-white hover:bg-[#FF5B22] transition-colors font-semibold px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.22em]"
                >
                  Talk to our Goa team <ArrowUpRight size={14} />
                </Link>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="dw-local-cta-whatsapp"
                  className="inline-flex items-center gap-2 border border-[#161514]/25 text-[#161514] hover:bg-[#161514] hover:text-white transition-colors font-semibold px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.22em]"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid sm:grid-cols-2 gap-5">
                {WHY_LOCAL.map((w) => (
                  <article key={w.title} className="bg-[#161514] text-white rounded-[4px] p-6 lift">
                    <w.Icon size={22} strokeWidth={1.5} className="text-[#FF7A4d]" />
                    <div className="mt-4 font-cormorant text-4xl md:text-5xl leading-none">{w.stat}</div>
                    <div className="mt-3 eyebrow !text-white/70">{w.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{w.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MANAGEMENT MODELS ============ */}
      <section id="management" className="scroll-mt-28 py-16 md:py-24 bg-[#F3E4DC]/40 border-y border-[#DBD4C6]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="mb-12 md:mb-16 max-w-3xl">
              <p className="eyebrow mb-3">Chapter 07 — Three ways to work</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                Full management, guided,{' '}
                <em className="text-[#E24A12] not-italic font-normal">or just the shoot.</em>
              </h2>
              <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                Not every couple wants (or needs) a full-service planner. Pick the model that matches how hands-on you actually want to be.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {MANAGEMENT.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08} y={36}>
                <article
                  data-testid={`dw-management-${m.id}`}
                  className={`relative flex flex-col h-full p-8 md:p-10 border rounded-[4px] lift ${m.highlighted ? 'bg-[#161514] text-white border-[#161514] md:-translate-y-2' : 'bg-white text-[#161514] border-[#DBD4C6]'}`}
                >
                  {m.highlighted && (
                    <span className="absolute -top-3 left-8 flex items-center gap-1.5 bg-[#FF5B22] text-white px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-semibold rounded-full">
                      <Star size={11} className="fill-current" /> Best for hands-off
                    </span>
                  )}
                  <p className={`eyebrow ${m.highlighted ? '!text-[#FF7A4d]' : ''}`}>{m.tag}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <m.Icon size={22} strokeWidth={1.5} className={m.highlighted ? 'text-[#FF7A4d]' : 'text-[#8A857D]'} />
                    <h3 className="font-cormorant text-3xl md:text-4xl leading-none">{m.title}</h3>
                  </div>
                  <div className={`mt-6 text-[10px] uppercase tracking-[0.22em] ${m.highlighted ? 'text-white/60' : 'text-[#8A857D]'}`}>
                    Investment
                  </div>
                  <div className="mt-1 font-cormorant text-3xl md:text-4xl">{m.price}</div>
                  <ul className="mt-7 space-y-3.5 flex-1">
                    {m.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-sm">
                        <Check size={16} className={`mt-0.5 shrink-0 ${m.highlighted ? 'text-[#FF7A4d]' : 'text-[#E24A12]'}`} strokeWidth={2.5} />
                        <span className={m.highlighted ? 'text-white/85' : 'text-[#4a463f]'}>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    data-testid={`dw-management-cta-${m.id}`}
                    className={`mt-10 inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors ${m.highlighted ? 'bg-[#FF5B22] text-white hover:bg-white hover:text-[#161514]' : 'border border-[#161514] hover:bg-[#161514] hover:text-white'}`}
                  >
                    Enquire <ArrowUpRight size={14} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section id="timeline" className="scroll-mt-28 py-16 md:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="mb-10 md:mb-14 max-w-3xl">
              <p className="eyebrow mb-3">Chapter 08 — The runway</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                A honest{' '}
                <em className="text-[#E24A12] not-italic font-normal">12-month timeline.</em>
              </h2>
              <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                Peak-season dates lock 9–12 months out. Off-peak or shoulder weeks are usually possible with 4–6 months of runway.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            <span className="hidden md:block absolute top-6 left-0 right-0 h-px bg-[#DBD4C6]" />
            <div className="grid md:grid-cols-5 gap-6 md:gap-4">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.m} delay={i * 0.08}>
                  <div className="relative pt-0 md:pt-14">
                    <span className="hidden md:block absolute left-6 top-4 w-3 h-3 rounded-full bg-[#FF5B22]" />
                    <div className="flex md:block items-center gap-3">
                      <Clock size={16} className="text-[#8A857D] md:hidden" />
                      <span className="font-mono text-xs tracking-[0.22em] text-[#E24A12] uppercase">
                        {t.m}
                      </span>
                    </div>
                    <h3 className="mt-3 font-cormorant text-2xl md:text-[1.7rem] leading-tight text-[#161514]">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-[#4a463f] leading-relaxed pr-4">
                      {t.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faqs" className="scroll-mt-28 py-16 md:py-24 border-t border-[#DBD4C6]">
        <div className="container mx-auto max-w-[900px] px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Chapter 09 — Answered</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-[#161514]">
                Frequently asked.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq faqs={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/destination-weddings.jpg"
            alt="Book a destination wedding in Goa with PK Photography"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0d0c0b]/85" />
        </div>
        <div className="relative container mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28 text-white">
          <Reveal>
            <p className="eyebrow !text-[#FF7A4d] mb-5">Chapter 10 — The next step</p>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.02] max-w-4xl mb-6">
              Ready to lock the{' '}
              <em className="not-italic text-[#FF7A4d]">Goa date?</em>
            </h2>
            <p className="max-w-xl text-white/75 text-lg leading-relaxed mb-10">
              Tell us your dates, guest count and rough budget — we’ll come
              back with a shortlist of venues, a candid cost estimate, and a
              plan that fits how hands-on you want to be.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                data-testid="dw-final-cta-book"
                className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-white hover:text-[#161514] transition-colors text-white font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                Start planning <ArrowUpRight size={15} />
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                data-testid="dw-final-cta-whatsapp"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb757] text-white font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em] transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp us
              </a>
            </div>
            <div className="mt-14 pt-8 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.22em] text-white/60">
              <span>Related:</span>
              <Link href="/services/weddings" className="link-underline hover:text-white">Wedding services</Link>
              <Link href="/blog/pre-wedding-couple-portrait-shoot-locations-goa" className="link-underline hover:text-white">Pre-wedding in Goa</Link>
              <Link href="/blog/whats-included-wedding-photography-package" className="link-underline hover:text-white">What’s in a package</Link>
              <Link href="/booking" className="link-underline hover:text-white">Book</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
