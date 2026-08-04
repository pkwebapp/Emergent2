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
  User,
  Users,
  Building2,
  Star,
  Quote,
  Sparkles,
} from 'lucide-react'

const WHATSAPP = 'https://wa.me/+918888766739'
const STUDIO_ADDRESS =
  'C1302, Evershine Cosmic, opp. Infiniti Mall, Veera Desai Industrial Estate, Andheri West, Mumbai 400053'
const MAP_EMBED =
  'https://www.google.com/maps?q=Evershine+Cosmic+Andheri+West+Mumbai&output=embed'

const TOC = [
  { id: 'intro', label: 'Intro', full: 'Introduction' },
  { id: 'why', label: 'Why', full: 'Why You Need One' },
  { id: 'compare', label: 'vs Portrait', full: 'Headshot vs Portrait' },
  { id: 'craft', label: 'Craft', full: 'Lighting & Posing' },
  { id: 'studio', label: 'Studio', full: 'Studio Location' },
  { id: 'packages', label: 'Packages', full: 'Packages & Pricing' },
  { id: 'bts', label: 'BTS', full: 'Behind the Scenes' },
  { id: 'clients', label: 'Clients', full: 'Client Stories' },
  { id: 'faqs', label: 'FAQs', full: 'FAQs' },
]

const STATS = [
  {
    value: '21',
    suffix: 'x',
    title: 'more profile views',
    body:
      'LinkedIn’s own research shows profiles with a professional photo get up to 21 times more profile views.',
  },
  {
    value: '9',
    suffix: 'x',
    title: 'more connection requests',
    body:
      'The same profiles receive nine times more connection requests — your network grows faster with the right photo.',
  },
  {
    value: '36',
    suffix: 'x',
    title: 'more messages',
    body:
      'Recent studies indicate profiles with a professional headshot can receive up to 36 times more messages.',
  },
  {
    value: '67',
    suffix: '%',
    title: 'higher recruiter reach-out',
    body:
      'Recruiters are significantly less likely to reach out to candidates with unprofessional or missing photos.',
  },
]

const BEYOND_LINKEDIN = [
  'Job searching & career moves — often the first impression a recruiter forms',
  'Client-facing roles (consulting, sales, real estate, finance) — trust before the first meeting',
  'Company websites and team pages — representing your brand, not just yourself',
  'Speaker bios, press mentions and conference profiles — credibility judged instantly',
  'Founders and startups — investors research faces before they research pitch decks',
]

const COMPARE = {
  headshot: {
    title: 'Corporate Headshot',
    kicker: 'Professional identity',
    image: '/headshot/Hed_1.jpg',
    alt: 'Corporate headshot studio session Andheri West Mumbai — professional business headshot by PK Photography',
    rows: [
      { k: 'Purpose', v: 'LinkedIn, company sites, business cards' },
      { k: 'Framing', v: 'Tight crop — head & shoulders, face fills the frame' },
      { k: 'Lighting', v: 'Soft, even, minimal shadows — clarity over drama' },
      { k: 'Background', v: 'Clean, solid, or softly blurred — never a distraction' },
      { k: 'Expression', v: 'Confident, approachable, direct eye contact' },
    ],
  },
  portrait: {
    title: 'Regular Portrait',
    kicker: 'Personal storytelling',
    image: '/personal-portrait.jpg',
    alt: 'Editorial personal portrait photography in Mumbai by PK Photography',
    rows: [
      { k: 'Purpose', v: 'Art, editorial, personal branding with nuance' },
      { k: 'Framing', v: 'Wider — includes environment, styling or context' },
      { k: 'Lighting', v: 'Creative, directional — can be moody or dramatic' },
      { k: 'Background', v: 'Often part of the story — textures, settings' },
      { k: 'Expression', v: 'Candid, reflective, in-motion — not always eye contact' },
    ],
  },
}

const CRAFT = [
  {
    id: 'lighting',
    n: '01',
    title: 'Lighting Setup',
    Icon: Sun,
    image: '/servicesPage/corporate.jpg',
    alt: 'Three-point studio lighting setup for corporate headshots in Mumbai',
    body:
      'We use a soft three-point lighting setup: a key light to evenly illuminate the face, a fill light to soften shadows on the opposite side, and a subtle hair/kicker light to separate you from the background. The goal is clarity, not drama — clean, even light that makes skin tones and features look natural rather than flat or overexposed.',
    diagram: true,
  },
  {
    id: 'posing',
    n: '02',
    title: 'Posing Guide',
    Icon: User,
    image: '/headshot/Hed_2.jpg',
    alt: 'Corporate headshot posing guide — 45-degree body angle for LinkedIn photo',
    body: null,
    bullets: [
      'Camera at eye level — direct connection, not looking up or down',
      'Face fills roughly 60% of the frame — tight enough for LinkedIn’s circular crop',
      '45-degree body angle — photographs slimmer, feels dynamic',
      'Chin slightly forward and down — avoids the "double chin" angle',
    ],
  },
  {
    id: 'expression',
    n: '03',
    title: 'Expression Coaching',
    Icon: Camera,
    image: '/live-streaming/corporate_mettings.jpg',
    alt: 'Expression coaching during a corporate headshot session in Mumbai',
    body:
      'Most people freeze up in front of a camera, which is exactly why we don’t just say "smile" and shoot. We talk you through it — natural conversation, practice frames, small adjustments — until the tension drops and the expression looks like you on a good day at work, not you posing for a photo.',
  },
]

const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential Headshot',
    price: '₹6,000',
    tag: 'Best for LinkedIn, resumes & company profiles',
    Icon: User,
    inclusions: [
      '30–45 minute studio session',
      '1–2 looks',
      'Signature studio lighting',
      'Guided posing & expression coaching',
      '8 retouched images',
      'High-resolution & web-ready files',
    ],
    highlighted: false,
  },
  {
    id: 'personal',
    name: 'Personal Branding',
    price: '₹12,000',
    tag: 'Best for founders, consultants, speakers, creators',
    Icon: Sparkles,
    inclusions: [
      '90-minute session',
      'Up to 3 outfit changes',
      'Multiple backgrounds',
      'Headshots + lifestyle portraits',
      '20 edited images',
      'Personal branding usage',
    ],
    highlighted: true,
  },
  {
    id: 'executive',
    name: 'Executive Branding',
    price: '₹20,000',
    tag: 'Best for CEOs, leadership, authors & public figures',
    Icon: Star,
    inclusions: [
      'Premium studio session',
      'Multiple lighting setups',
      'Unlimited outfit changes within session',
      'Headshots + environmental portraits',
      '35 edited images',
      'Priority editing + commercial usage',
    ],
    highlighted: false,
  },
]

const BULK_POINTS = [
  'Custom per-person pricing based on group size',
  'Identical lighting/background across every headshot',
  'Streamlined scheduling for large groups — staggered slots or full-day blocks',
  'Options for both in-studio and on-location sessions',
  'Suitable for corporate teams, government departments, school and college batches',
]

const ADDONS = [
  { name: 'Makeup / Hair Artist', price: '₹5,000' },
  { name: 'On-Location Setup', price: 'Starting ₹2,000' },
]

const BTS = [
  { src: '/servicesPage/corporate.jpg', alt: 'Studio lighting setup for a corporate headshot session in Andheri West Mumbai' },
  { src: '/images/studio.jpeg', alt: 'PK Photography Andheri West headshot studio interior' },
  { src: '/headshot/Hed_1.jpg', alt: 'Executive corporate headshot Mumbai — studio lit' },
  { src: '/live-streaming/corporate_mettings.jpg', alt: 'Client being coached through posing during a Mumbai headshot session' },
  { src: '/headshot/Hed_2.jpg', alt: 'LinkedIn headshot Mumbai — professional business headshot' },
  { src: '/headshots-portraits.jpg', alt: 'Behind the scenes at the Andheri West corporate headshot studio' },
]

const TESTIMONIALS = [
  {
    quote:
      'Booked a slot on lunch break, walked out 25 minutes later with a headshot I’m actually proud to put on LinkedIn.',
    name: 'A. Mehta',
    role: 'Senior Associate, BFSI',
    img: '/headshot/Hed_1.jpg',
  },
  {
    quote:
      'We refreshed the entire leadership team’s photos in a single afternoon. Every headshot lines up perfectly on our site.',
    name: 'R. Iyer',
    role: 'People Ops, SaaS scale-up',
    img: '/headshot/Hed_2.jpg',
  },
  {
    quote:
      'Between the coaching, the lighting, and how fast they turned around the edits — it was easily the smoothest shoot I’ve done.',
    name: 'S. Kapoor',
    role: 'Founder & CEO',
    img: '/personal-portrait.jpg',
  },
]

/* ---------------- Reveal wrapper ---------------- */
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

/* ---------------- Big stat callout ---------------- */
function StatCallout({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)
  const numeric = parseInt(stat.value, 10)
  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return
    const dur = 1600
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * numeric))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, numeric])
  return (
    <div
      ref={ref}
      data-testid={`hs-stat-${index}`}
      className="grid md:grid-cols-[minmax(220px,320px)_1fr] gap-6 md:gap-14 items-center py-10 md:py-14 border-b border-[#DBD4C6] last:border-b-0"
    >
      <div className="font-cormorant leading-[0.9] tracking-[-0.02em] text-[#161514]">
        <span className="text-[7rem] md:text-[10rem]">{n}</span>
        <span className="text-[3rem] md:text-[4rem] text-[#FF5B22] align-top ml-1">
          {stat.suffix}
        </span>
      </div>
      <div>
        <p className="eyebrow mb-2">{stat.title}</p>
        <p className="text-[#4a463f] text-base md:text-lg leading-relaxed max-w-xl">
          {stat.body}
        </p>
      </div>
    </div>
  )
}

/* ---------------- Simple lighting diagram (SVG) ---------------- */
function LightingDiagram() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-auto" aria-hidden="true">
      <defs>
        <radialGradient id="hg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7A4d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF7A4d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#161514" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#161514" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* subject */}
      <circle cx="200" cy="150" r="30" fill="none" stroke="#161514" strokeWidth="1.4" />
      <text x="200" y="200" textAnchor="middle" fontSize="10" letterSpacing="2" fill="#8A857D">
        SUBJECT
      </text>
      {/* key light */}
      <circle cx="290" cy="90" r="46" fill="url(#hg)" />
      <rect x="278" y="78" width="24" height="24" rx="2" fill="#FF5B22" />
      <line x1="278" y1="102" x2="220" y2="140" stroke="#FF5B22" strokeWidth="1" strokeDasharray="4 3" />
      <text x="290" y="60" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill="#161514" fontWeight="600">
        KEY LIGHT
      </text>
      {/* fill light */}
      <circle cx="110" cy="90" r="42" fill="url(#fg)" />
      <rect x="98" y="78" width="24" height="24" rx="2" fill="#4a463f" />
      <line x1="122" y1="102" x2="180" y2="140" stroke="#4a463f" strokeWidth="1" strokeDasharray="4 3" />
      <text x="110" y="60" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill="#161514" fontWeight="600">
        FILL LIGHT
      </text>
      {/* hair / kicker */}
      <rect x="188" y="30" width="24" height="12" rx="2" fill="#161514" />
      <line x1="200" y1="42" x2="200" y2="118" stroke="#161514" strokeWidth="1" strokeDasharray="4 3" />
      <text x="200" y="24" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill="#161514" fontWeight="600">
        HAIR / KICKER
      </text>
      {/* camera */}
      <rect x="180" y="228" width="40" height="20" rx="3" fill="none" stroke="#161514" strokeWidth="1.4" />
      <circle cx="200" cy="238" r="5" fill="none" stroke="#161514" strokeWidth="1.4" />
      <text x="200" y="256" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill="#8A857D">
        CAMERA · EYE LEVEL
      </text>
    </svg>
  )
}

/* ---------------- FAQ Accordion ---------------- */
function Faq({ faqs }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-[#DBD4C6] border-y border-[#DBD4C6]">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              data-testid={`hs-faq-toggle-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              aria-expanded={isOpen}
            >
              <span
                className={`font-cormorant text-2xl md:text-[1.75rem] leading-snug transition-colors ${
                  isOpen
                    ? 'text-[#FF5B22]'
                    : 'text-[#161514] group-hover:text-[#E24A12]'
                }`}
              >
                {f.q}
              </span>
              <span
                className={`shrink-0 w-9 h-9 rounded-full grid place-content-center border transition-colors ${
                  isOpen
                    ? 'bg-[#FF5B22] border-[#FF5B22] text-white'
                    : 'border-[#DBD4C6] text-[#161514] group-hover:border-[#FF5B22]'
                }`}
              >
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

/* ================= PAGE ================= */
export default function HeadshotsEditorial({ faqs }) {
  const heroRef = useRef(null)
  const { scrollYProgress: pageProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '18%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08])
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0])

  const [active, setActive] = useState('intro')

  useEffect(() => {
    const ids = TOC.map((t) => t.id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const headline = ['A face that', 'earns the', 'benefit of the doubt.']

  return (
    <main
      data-testid="headshots-blog-page"
      className="bg-[#EEEAE1] text-[#161514]"
    >
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: pageProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#161514] z-[95] origin-left"
      />

      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        data-transparent-header="true"
        data-testid="hs-hero"
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-end"
      >
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 h-full">
            {[
              '/headshot/Hed_1.jpg',
              '/headshot/Hed_2.jpg',
              '/headshots-portraits.jpg',
              '/personal-portrait.jpg',
            ].map((src, i) => (
              <div key={src + i} className="relative overflow-hidden">
                <Image
                  src={src}
                  alt={`Professional headshot studio session Andheri West Mumbai frame ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-[#0d0c0b]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/30 to-[#0d0c0b]/60" />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 w-full">
          <div className="container mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-[#FF7A4d]">Corporate Headshot Photography</li>
              </ol>
            </nav>

            <p className="eyebrow !text-[#FF7A4d] mb-5">
              Mumbai · Andheri West Studio
            </p>
            <h1 className="font-cormorant text-white text-[2.6rem] leading-[1] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
              {headline.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className={`block ${i === 1 ? 'italic text-[#FF7A4d]' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 1,
                      delay: 0.15 + i * 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
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
              Corporate headshot photography in Mumbai — studio-lit, LinkedIn-ready,
              built for individuals and full teams at our Andheri West studio.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/booking"
                data-testid="hs-hero-cta-book"
                className="inline-flex items-center gap-2 bg-white text-[#161514] hover:bg-[#FF5B22] hover:text-white transition-colors font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                Book a studio slot <ArrowUpRight size={15} />
              </Link>
              <a
                href="#packages"
                data-testid="hs-hero-cta-packages"
                className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 transition-colors font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                See packages
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroFade }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------- MOBILE TOC ---------------- */}
      <div className="md:hidden sticky top-[60px] z-[70] bg-[#EEEAE1]/92 backdrop-blur-md border-y border-[#DBD4C6]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
          {TOC.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              data-testid={`hs-toc-mobile-${t.id}`}
              className={`shrink-0 whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                active === t.id
                  ? 'bg-[#161514] text-white border-[#161514]'
                  : 'bg-transparent text-[#4a463f] border-[#DBD4C6]'
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>

      {/* ---------------- MAIN GRID ---------------- */}
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="md:grid md:grid-cols-[1fr_240px] md:gap-16">
          <div>
            {/* ==== Intro ==== */}
            <section id="intro" className="scroll-mt-28 py-16 md:py-24">
              <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <Reveal>
                  <p className="eyebrow mb-4">Chapter 01 — The premise</p>
                  <h2 className="font-cormorant text-3xl md:text-[2.6rem] leading-[1.06] mb-6 text-[#161514]">
                    Your photo is often the first thing anyone sees{' '}
                    <em className="text-[#E24A12] not-italic font-normal">
                      before they read a single word about you.
                    </em>
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f] mb-4">
                    On LinkedIn, your company&rsquo;s &ldquo;About Us&rdquo;
                    page, a conference speaker bio, or a client proposal. In a
                    city like Mumbai, where every professional is one scroll
                    away from being compared to hundreds of others, a genuinely
                    good headshot isn&rsquo;t vanity — it&rsquo;s basic
                    professional infrastructure.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f]">
                    At <strong className="text-[#161514]">PK Photography</strong>,
                    with 12+ years and 2000+ projects across Mumbai, Goa and
                    Delhi, we run a dedicated corporate headshot studio in
                    Andheri West — consistent lighting, a repeatable
                    process, and a fast turnaround for individuals and full
                    teams alike.
                  </p>
                </Reveal>
                <Reveal delay={0.12} y={40}>
                  <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden shadow-2xl">
                    <Image
                      src="/headshot/Hed_1.jpg"
                      alt="Corporate headshot studio session Andheri West Mumbai by PK Photography"
                      fill
                      sizes="(max-width:768px) 100vw, 40vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <div className="mt-16 grid grid-cols-3 gap-6 border-t border-[#DBD4C6] pt-10">
                  <div>
                    <div className="font-cormorant text-4xl md:text-6xl leading-none text-[#161514]">
                      12+
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8A857D]">
                      Years
                    </div>
                  </div>
                  <div>
                    <div className="font-cormorant text-4xl md:text-6xl leading-none text-[#161514]">
                      2000+
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8A857D]">
                      Projects
                    </div>
                  </div>
                  <div>
                    <div className="font-cormorant text-2xl md:text-3xl leading-tight text-[#161514]">
                      Mumbai’s Corporate Studio
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8A857D]">
                      Andheri West
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* ==== Why every professional needs one ==== */}
            <section id="why" className="scroll-mt-28 py-12 md:py-20 border-t border-[#DBD4C6]">
              <Reveal>
                <div className="mb-10 md:mb-14 max-w-3xl">
                  <p className="eyebrow mb-3">Chapter 02 — The numbers</p>
                  <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                    Why every professional needs{' '}
                    <em className="text-[#E24A12] not-italic font-normal">a corporate headshot.</em>
                  </h2>
                  <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                    A professional headshot isn&rsquo;t just a nicer photo
                    — it measurably changes how often you get seen,
                    contacted and taken seriously.
                  </p>
                </div>
              </Reveal>
              <div>
                {STATS.map((s, i) => (
                  <StatCallout key={s.value + s.suffix} stat={s} index={i} />
                ))}
              </div>

              <Reveal>
                <div className="mt-14 grid md:grid-cols-[280px_1fr] gap-8 items-start">
                  <p className="eyebrow">Beyond LinkedIn, a consistent headshot matters for:</p>
                  <ul className="space-y-3">
                    {BEYOND_LINKEDIN.map((it) => (
                      <li key={it} className="flex gap-3 items-start">
                        <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#F3E4DC] grid place-content-center">
                          <Check size={12} className="text-[#E24A12]" strokeWidth={3} />
                        </span>
                        <span className="text-[#4a463f] leading-relaxed text-base md:text-lg">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>

            {/* ==== Headshot vs Portrait ==== */}
            <section id="compare" className="scroll-mt-28 py-16 md:py-24 border-t border-[#DBD4C6]">
              <Reveal>
                <div className="mb-10 md:mb-14 max-w-3xl">
                  <p className="eyebrow mb-3">Chapter 03 — The difference</p>
                  <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                    Headshot <em className="text-[#E24A12] not-italic font-normal">vs</em> Portrait.
                  </h2>
                  <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                    People often assume &ldquo;portrait&rdquo; and
                    &ldquo;headshot&rdquo; are interchangeable — they
                    aren&rsquo;t, and using the wrong one can actually work
                    against you.
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                {[COMPARE.headshot, COMPARE.portrait].map((col, idx) => (
                  <Reveal key={col.title} delay={idx * 0.08}>
                    <article
                      data-testid={`hs-compare-${idx === 0 ? 'headshot' : 'portrait'}`}
                      className={`h-full flex flex-col border rounded-[4px] overflow-hidden ${
                        idx === 0
                          ? 'bg-[#161514] text-white border-[#161514]'
                          : 'bg-white text-[#161514] border-[#DBD4C6]'
                      }`}
                    >
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image
                          src={col.image}
                          alt={col.alt}
                          fill
                          sizes="(max-width:768px) 100vw, 45vw"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-7 md:p-9 flex-1">
                        <p className={`eyebrow ${idx === 0 ? '!text-[#FF7A4d]' : ''}`}>{col.kicker}</p>
                        <h3 className="mt-2 font-cormorant text-3xl md:text-4xl leading-tight">
                          {col.title}
                        </h3>
                        <dl className="mt-6 space-y-4">
                          {col.rows.map((r) => (
                            <div key={r.k} className="grid grid-cols-[110px_1fr] gap-4">
                              <dt className={`text-[10px] uppercase tracking-[0.22em] pt-1 ${idx === 0 ? 'text-white/60' : 'text-[#8A857D]'}`}>
                                {r.k}
                              </dt>
                              <dd className={`text-base leading-relaxed ${idx === 0 ? 'text-white/85' : 'text-[#4a463f]'}`}>
                                {r.v}
                              </dd>
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
                  If you need something that works the moment someone glances at
                  your profile in under a second, you need a headshot. If
                  you&rsquo;re building a personal brand website or a more
                  expressive &ldquo;About Me&rdquo; page, a portrait session
                  might serve you better — and we do both.
                </p>
              </Reveal>
            </section>

            {/* ==== Craft: lighting & posing ==== */}
            <section id="craft" className="scroll-mt-28 py-16 md:py-24 border-t border-[#DBD4C6]">
              <Reveal>
                <div className="mb-10 md:mb-14 max-w-3xl">
                  <p className="eyebrow mb-3">Chapter 04 — The craft</p>
                  <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                    Our lighting &amp; posing{' '}
                    <em className="text-[#E24A12] not-italic font-normal">guide.</em>
                  </h2>
                  <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                    Good headshots aren&rsquo;t accidental — they come
                    from a repeatable, technical process. Here&rsquo;s how we
                    approach it.
                  </p>
                </div>
              </Reveal>

              <div className="divide-y divide-[#DBD4C6]">
                {CRAFT.map((c, i) => {
                  const reverse = i % 2 === 1
                  return (
                    <div
                      key={c.id}
                      className="grid md:grid-cols-2 gap-10 md:gap-16 items-center py-12 md:py-20"
                    >
                      <div className={reverse ? 'md:order-2' : ''}>
                        <Reveal y={40}>
                          {c.diagram ? (
                            <div className="bg-white border border-[#DBD4C6] rounded-[4px] p-6 md:p-10">
                              <LightingDiagram />
                              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[#8A857D] text-center">
                                Three-point studio lighting · signature setup
                              </p>
                            </div>
                          ) : (
                            <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden">
                              <Image
                                src={c.image}
                                alt={c.alt}
                                fill
                                sizes="(max-width:768px) 100vw, 45vw"
                                className="object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </Reveal>
                      </div>
                      <div>
                        <Reveal>
                          <div className="flex items-center gap-4 mb-6">
                            <span className="font-cormorant text-5xl md:text-6xl leading-none text-[#FF5B22]">
                              {c.n}
                            </span>
                            <span className="h-px flex-1 bg-[#DBD4C6]" />
                            <c.Icon size={22} className="text-[#8A857D]" strokeWidth={1.5} />
                          </div>
                          <h3 className="font-cormorant text-4xl md:text-5xl leading-[1.02] text-[#161514] mb-6">
                            {c.title}
                          </h3>
                          {c.body && (
                            <p className="text-base md:text-lg leading-relaxed text-[#4a463f] max-w-xl">
                              {c.body}
                            </p>
                          )}
                          {c.bullets && (
                            <ul className="space-y-3 mt-2">
                              {c.bullets.map((b) => (
                                <li key={b} className="flex gap-3 items-start">
                                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#F3E4DC] grid place-content-center">
                                    <Check size={12} className="text-[#E24A12]" strokeWidth={3} />
                                  </span>
                                  <span className="text-[#4a463f] leading-relaxed text-base md:text-lg">{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </Reveal>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          {/* ==== Sticky Desktop TOC ==== */}
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
                        <span
                          className={`absolute left-0 top-[9px] w-[11px] h-[11px] rounded-full border-2 transition-colors ${
                            on
                              ? 'bg-[#FF5B22] border-[#FF5B22]'
                              : 'bg-[#EEEAE1] border-[#CFC7B6]'
                          }`}
                        />
                        <a
                          href={`#${t.id}`}
                          data-testid={`hs-toc-${t.id}`}
                          className={`block py-1.5 text-sm transition-colors ${
                            on
                              ? 'text-[#161514] font-semibold'
                              : 'text-[#8A857D] hover:text-[#161514]'
                          }`}
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

      {/* ==== Studio location (full-bleed section) ==== */}
      <section
        id="studio"
        className="scroll-mt-28 py-16 md:py-24 bg-[#F3E4DC]/40 border-y border-[#DBD4C6]"
      >
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-4xl mb-10 md:mb-14">
              <p className="eyebrow mb-3">Chapter 05 — The studio</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                Visit our studio in{' '}
                <em className="text-[#E24A12] not-italic font-normal">Andheri West.</em>
              </h2>
              <p className="mt-5 max-w-2xl text-[#4a463f] text-base md:text-lg leading-relaxed">
                Our dedicated headshot studio is set up specifically for
                consistent, repeatable corporate photography — ideal for
                individuals and full teams who need everyone shot under
                identical lighting and background conditions.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-stretch">
            <Reveal className="md:col-span-3 h-full" y={40}>
              <div
                data-testid="hs-studio-map"
                className="relative w-full h-[360px] md:h-full min-h-[360px] rounded-[4px] overflow-hidden border border-[#DBD4C6] bg-white"
              >
                <iframe
                  src={MAP_EMBED}
                  title="PK Photography Studio Andheri West Mumbai"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <Reveal className="md:col-span-2" delay={0.1}>
              <div className="bg-white border border-[#DBD4C6] rounded-[4px] p-7 md:p-9 h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] mb-6">
                  <Image
                    src="/images/studio.jpeg"
                    alt="PK Photography corporate headshot studio interior in Andheri West Mumbai"
                    fill
                    sizes="(max-width:768px) 100vw, 40vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="eyebrow mb-3">Studio address</p>
                <p className="font-cormorant text-xl md:text-2xl leading-snug text-[#161514]">
                  C1302, Evershine Cosmic,
                  <br />
                  opp. Infiniti Mall, Veera Desai
                  <br />
                  Industrial Estate, Andheri West,
                  <br />
                  Mumbai 400053
                </p>
                <p className="mt-5 text-sm text-[#4a463f] leading-relaxed">
                  Located right opposite <strong>Infiniti Mall</strong> —
                  walk-ins by appointment, corporate team sessions by prior
                  scheduling. Parking available in-building.
                </p>
                <div className="mt-auto pt-8 flex flex-wrap gap-3">
                  <Link
                    href="/booking"
                    data-testid="hs-studio-cta-book"
                    className="inline-flex items-center gap-2 bg-[#161514] text-white hover:bg-[#FF5B22] transition-colors font-semibold px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.22em]"
                  >
                    Book a studio slot <ArrowUpRight size={14} />
                  </Link>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      STUDIO_ADDRESS
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="hs-studio-directions"
                    className="inline-flex items-center gap-2 border border-[#161514]/25 text-[#161514] hover:bg-[#161514] hover:text-white transition-colors font-semibold px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.22em]"
                  >
                    <MapPin size={14} /> Directions
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==== Packages ==== */}
      <section id="packages" className="scroll-mt-28 py-16 md:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="mb-12 md:mb-16 max-w-3xl">
              <p className="eyebrow mb-3">Chapter 06 — The invest</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                Packages &amp;{' '}
                <em className="text-[#E24A12] not-italic font-normal">Pricing.</em>
              </h2>
              <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                All packages below are for sessions at our{' '}
                <strong className="text-[#161514]">
                  in-house Andheri West studio
                </strong>
                , using our signature studio lighting setup.
              </p>
            </div>
          </Reveal>

          <p className="eyebrow mb-6">Individual studio packages</p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} y={36}>
                <article
                  data-testid={`hs-package-${p.id}`}
                  className={`relative flex flex-col h-full p-8 md:p-10 border rounded-[4px] lift ${
                    p.highlighted
                      ? 'bg-[#161514] text-white border-[#161514] md:-translate-y-2'
                      : 'bg-white text-[#161514] border-[#DBD4C6]'
                  }`}
                >
                  {p.highlighted && (
                    <span className="absolute -top-3 left-8 flex items-center gap-1.5 bg-[#FF5B22] text-white px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-semibold rounded-full">
                      <Star size={11} className="fill-current" /> Most popular
                    </span>
                  )}
                  <p className={`eyebrow ${p.highlighted ? '!text-[#FF7A4d]' : ''}`}>
                    {p.tag}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <p.Icon size={22} strokeWidth={1.5} className={p.highlighted ? 'text-[#FF7A4d]' : 'text-[#8A857D]'} />
                    <h3 className="font-cormorant text-3xl md:text-4xl leading-none">
                      {p.name}
                    </h3>
                  </div>
                  <div className={`mt-6 text-[10px] uppercase tracking-[0.22em] ${p.highlighted ? 'text-white/60' : 'text-[#8A857D]'}`}>
                    Starting from
                  </div>
                  <div className="mt-1 font-cormorant text-4xl md:text-5xl">
                    {p.price}
                  </div>
                  <ul className="mt-7 space-y-3.5 flex-1">
                    {p.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-sm">
                        <Check
                          size={16}
                          className={`mt-0.5 shrink-0 ${p.highlighted ? 'text-[#FF7A4d]' : 'text-[#E24A12]'}`}
                          strokeWidth={2.5}
                        />
                        <span className={p.highlighted ? 'text-white/85' : 'text-[#4a463f]'}>
                          {inc}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    data-testid={`hs-package-cta-${p.id}`}
                    className={`mt-10 inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors ${
                      p.highlighted
                        ? 'bg-[#FF5B22] text-white hover:bg-white hover:text-[#161514]'
                        : 'border border-[#161514] hover:bg-[#161514] hover:text-white'
                    }`}
                  >
                    Book this session <ArrowUpRight size={14} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Bulk banner */}
          <Reveal>
            <div
              data-testid="hs-bulk-banner"
              className="mt-14 md:mt-20 relative overflow-hidden rounded-[6px] bg-[#161514] text-white grid md:grid-cols-[1.1fr_1fr]"
            >
              <div className="p-8 md:p-12">
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#FF7A4d] mb-4">
                  <Building2 size={14} /> Bulk headshots
                </span>
                <h3 className="font-cormorant text-3xl md:text-5xl leading-[1.02] mb-4">
                  For companies, enterprises, government &amp;{' '}
                  <em className="text-[#FF7A4d] not-italic font-normal">
                    schools/colleges.
                  </em>
                </h3>
                <p className="text-white/75 leading-relaxed max-w-lg mb-6">
                  Consistent, professional headshots across a large group
                  — employee ID photos, faculty directories, team-wide
                  LinkedIn refreshes, or annual staff/student photos —
                  with volume-based pricing and a streamlined studio process.
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                  {BULK_POINTS.map((b) => (
                    <li key={b} className="flex gap-3 items-start text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#FF7A4d]" strokeWidth={2.5} />
                      <span className="text-white/85 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/booking"
                    data-testid="hs-bulk-cta-quote"
                    className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-white hover:text-[#161514] transition-colors text-white font-semibold px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.22em]"
                  >
                    Get a bulk quote <ArrowUpRight size={14} />
                  </Link>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="hs-bulk-cta-whatsapp"
                    className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 transition-colors text-white font-semibold px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.22em]"
                  >
                    <MessageCircle size={14} /> WhatsApp us
                  </a>
                </div>
              </div>
              <div className="relative min-h-[300px] md:min-h-full">
                <Image
                  src="/live-streaming/corporate_mettings.jpg"
                  alt="Bulk corporate headshot session Mumbai — team-wide LinkedIn refresh by PK Photography"
                  fill
                  sizes="(max-width:768px) 100vw, 45vw"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#161514] via-transparent to-transparent md:block hidden" />
              </div>
            </div>
          </Reveal>

          {/* Add-ons */}
          <Reveal>
            <div className="mt-16 md:mt-20">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <p className="eyebrow mb-3">Add-Ons</p>
                  <h3 className="font-cormorant text-3xl md:text-4xl leading-tight text-[#161514] max-w-2xl">
                    A couple of extras, if you need them.
                  </h3>
                </div>
              </div>
              <div
                data-testid="hs-addons-table"
                className="rounded-[4px] border border-[#DBD4C6] bg-white overflow-hidden"
              >
                <div className="hidden md:grid md:grid-cols-[1fr_auto] px-6 py-4 bg-[#F3E4DC]/60 border-b border-[#DBD4C6]">
                  <span className="eyebrow !text-[#4a463f]">Add-On</span>
                  <span className="eyebrow !text-[#4a463f]">Price</span>
                </div>
                <ul className="divide-y divide-[#DBD4C6]">
                  {ADDONS.map((a) => (
                    <li
                      key={a.name}
                      className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 md:gap-8 px-6 py-5 hover:bg-[#F3E4DC]/40 transition-colors"
                    >
                      <span className="font-cormorant text-xl md:text-2xl leading-snug text-[#161514]">
                        {a.name}
                      </span>
                      <span className="text-sm md:text-base font-semibold text-[#E24A12] md:text-right tabular whitespace-nowrap">
                        {a.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 text-[#4a463f] text-base md:text-lg leading-relaxed max-w-2xl">
                <strong className="text-[#161514]">Note:</strong> On-location
                setup pricing varies based on distance and setup complexity.
                Individual packages above are for in-house Andheri West studio
                sessions.{' '}
                <Link href="/booking" className="link-underline text-[#161514] font-semibold hover:text-[#FF5B22]">
                  Get in touch for a tailored quote — individual or bulk.
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==== BTS ==== */}
      <section id="bts" className="scroll-mt-28 py-16 md:py-24 bg-[#F3E4DC]/40 border-y border-[#DBD4C6] overflow-hidden">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10 mb-10">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">Chapter 07 — The process</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                Behind the{' '}
                <em className="text-[#E24A12] not-italic font-normal">scenes.</em>
              </h2>
              <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                A polished headshot looks simple in the final frame — but
                there&rsquo;s a fair amount happening behind it: dialling in
                lighting ratios, adjusting reflectors, testing exposure, and
                helping clients relax in front of the camera. Here&rsquo;s a
                look at our process in the studio.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pl-6 md:pl-10 pr-6 md:pr-10 pb-4">
            {BTS.map((img, i) => (
              <Reveal key={img.src + i} delay={i * 0.05} className="shrink-0 snap-start">
                <figure
                  data-testid={`hs-bts-${i}`}
                  className="relative w-[78vw] sm:w-[420px] md:w-[520px] aspect-[4/3] overflow-hidden rounded-[4px] bg-[#DBD4C6]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width:768px) 78vw, 520px"
                    className="object-cover"
                    loading="lazy"
                  />
                  <figcaption className="absolute bottom-3 left-3 bg-[#161514]/70 backdrop-blur text-white text-[10px] uppercase tracking-[0.24em] px-3 py-1.5 rounded-full">
                    Frame {String(i + 1).padStart(2, '0')} / {String(BTS.length).padStart(2, '0')}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==== Client stories ==== */}
      <section id="clients" className="scroll-mt-28 py-16 md:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-3xl mb-10 md:mb-14">
              <p className="eyebrow mb-3">Chapter 08 — The proof</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                What our clients{' '}
                <em className="text-[#E24A12] not-italic font-normal">say.</em>
              </h2>
              <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                Placeholder quotes below — we’ll swap in real client
                testimonials and their actual headshots as they come in.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <article
                  data-testid={`hs-testimonial-${i}`}
                  className="h-full flex flex-col bg-white border border-[#DBD4C6] rounded-[4px] p-7 md:p-8"
                >
                  <Quote size={26} className="text-[#FF5B22]" strokeWidth={1.5} />
                  <p className="mt-4 font-cormorant text-xl md:text-2xl leading-snug text-[#161514] flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-6 border-t border-[#DBD4C6] flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#DBD4C6] shrink-0">
                      <Image
                        src={t.img}
                        alt={`Client headshot — ${t.name}, ${t.role}`}
                        fill
                        sizes="56px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-[#161514] leading-tight">{t.name}</div>
                      <div className="text-xs text-[#8A857D] leading-tight mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==== FAQ ==== */}
      <section id="faqs" className="scroll-mt-28 py-16 md:py-24 border-t border-[#DBD4C6]">
        <div className="container mx-auto max-w-[900px] px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Chapter 09 — The fine print</p>
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

      {/* ==== Final CTA ==== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/headshots-portraits.jpg"
            alt="Corporate headshot studio session Andheri West Mumbai — book with PK Photography"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0d0c0b]/85" />
        </div>
        <div className="relative container mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28 text-white">
          <Reveal>
            <p className="eyebrow !text-[#FF7A4d] mb-5">
              Chapter 10 — The next step
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.02] max-w-4xl mb-6">
              Ready for a headshot that works as hard as{' '}
              <em className="not-italic text-[#FF7A4d]">you do?</em>
            </h2>
            <p className="max-w-xl text-white/75 text-lg leading-relaxed mb-10">
              Whether it&rsquo;s a single LinkedIn update or a full company-wide
              refresh, our Andheri West studio is built for exactly this.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                data-testid="hs-final-cta-book"
                className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-white hover:text-[#161514] transition-colors text-white font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                Book your session <ArrowUpRight size={15} />
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                data-testid="hs-final-cta-whatsapp"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb757] text-white font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em] transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp us
              </a>
            </div>
            <div className="mt-14 pt-8 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.22em] text-white/60">
              <span>Related:</span>
              <Link href="/services/headshots" className="link-underline hover:text-white">
                Headshot portfolio
              </Link>
              <Link href="/services/corporate-industrial" className="link-underline hover:text-white">
                Team / corporate pricing
              </Link>
              <Link href="/booking" className="link-underline hover:text-white">
                Booking
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
