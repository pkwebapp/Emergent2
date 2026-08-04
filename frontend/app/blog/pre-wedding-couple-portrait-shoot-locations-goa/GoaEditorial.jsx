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
  Camera,
  Film,
  Sparkles,
  Smartphone,
  Check,
  Sunset,
  Mountain,
  Home,
  Send,
  MapPin,
  Star,
  Compass,
} from 'lucide-react'

const WHATSAPP = 'https://wa.me/+918888766739'

const TOC = [
  { id: 'intro', label: 'Intro', full: 'The Premise' },
  { id: 'services', label: 'Services', full: 'What We Shoot' },
  { id: 'locations', label: 'Locations', full: 'Location Atlas' },
  { id: 'packages', label: 'Packages', full: 'Packages & Pricing' },
  { id: 'faqs', label: 'FAQs', full: 'FAQs' },
]

const STATS = [
  { value: 12, suffix: '+', label: 'Years' },
  { value: 2000, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '', label: 'Cities · Mumbai · Goa · Delhi' },
]

const SERVICES = [
  {
    id: 'pre-wedding',
    n: '01',
    Icon: Camera,
    title: 'Pre-Wedding',
    tagline: 'Cinematic storytelling',
    image: '/wedding/preWedding.jpg',
    alt: 'Pre-wedding shoot Goa — couple on a north Goa beach at golden hour by PK Photography',
    body: [
      'A choreographed, laid-back edit of you two — beach walks, candid laughs, one hero portrait. Full-day and half-day formats, always paced around the light.',
    ],
    included: [
      'Story-led shot list with hero portraits',
      'Drone coverage for wide beach frames',
      'Vertical reels included in Half-Day and above',
      'Colour-graded delivery + private online gallery',
    ],
    link: '/services/weddings',
  },
  {
    id: 'couple',
    n: '02',
    Icon: Camera,
    title: 'Couple & Private Couple',
    tagline: 'Just the two of you',
    image: '/wedding/engagement.jpg',
    alt: 'Private couple shoot in Goa — intimate anniversary portrait by PK Photography',
    body: [
      'Anniversary, honeymoon, or "no reason" — a two-hour private session at a spot you love. Quiet, tender, unposed — the kind of frames you’ll print.',
    ],
    included: [
      '1–2 hour private session',
      'Choice of beach, villa, or heritage location',
      '20–30 hero frames, retouched',
      'Two teaser reels (add-on)',
    ],
    link: '/services/weddings',
  },
  {
    id: 'portrait',
    n: '03',
    Icon: Camera,
    title: 'Portrait',
    tagline: 'One person, one story',
    image: '/wedding/bridalPortrait.jpg',
    alt: 'Editorial portrait shoot in Goa by PK Photography',
    body: [
      'For your book, your brand, your birthday. Studio-quality light on a beach or in a courtyard, framed like a magazine cover — no more awkward phone selfies.',
    ],
    included: [
      'Editorial direction + 3 wardrobe looks',
      'Natural + strobe light where needed',
      'Retouched hero set for print and social',
      'Same-week teaser delivery',
    ],
    link: '/services/weddings',
  },
  {
    id: 'outdoor',
    n: '04',
    Icon: Camera,
    title: 'Outdoor Portfolio',
    tagline: 'Actor, model, creator',
    image: '/wedding/rituals.jpg',
    alt: 'Outdoor model portfolio shoot in Goa — pre-wedding shoot Goa aesthetic reference',
    body: [
      'A complete portfolio in a day — three looks, two locations, curated retouching. Deliverables sized for print, casting, and Instagram.',
    ],
    included: [
      'Full-day, multi-location shoot',
      'Retouched hero set (15–20 frames)',
      'Vertical + horizontal crops delivered',
      'Studio-quality light management',
    ],
    link: '/services/weddings',
  },
  {
    id: 'maternity',
    n: '05',
    Icon: Sparkles,
    title: 'Maternity & Baby',
    tagline: 'Soft, quiet, tender',
    image: '/wedding/emotions.jpg',
    alt: 'Maternity and baby shoot Goa — golden hour session by PK Photography',
    body: [
      'Golden-hour maternity on Ashvem’s still water — floaty silks, held hands, one portrait you’ll frame forever. For newborns, we bring the shoot to your villa: patient, quiet, natural light only.',
    ],
    included: [
      'Golden-hour styling consult',
      'On-location wardrobe options',
      'At-home / villa newborn setup',
      'Under 2-hour comfortable sessions',
    ],
    link: '/services/weddings',
  },
]

const REEL = {
  title: 'iPhone Reel Shoot',
  tagline: 'Cinematic, vertical, yours.',
  body: 'A dedicated reel shooter armed with an iPhone Pro, gimbal & ND filters — designed to fit your feed the day of the shoot. Slow-mo, transitions, colour grade, delivered vertical-first.',
  bullets: ['4–6 reels', 'Same-week delivery', 'Colour graded', 'Available as add-on'],
  image: '/wedding/corousal/img7.jpg',
  alt: 'iPhone reel shoot in Goa — cinematic vertical content by PK Photography',
}

const LOCATIONS = [
  {
    id: 'ashvem-mandrem',
    n: '01',
    title: 'Ashvem & Mandrem',
    subtitle: 'The quiet north',
    best: 'Best for: soft, floaty pre-weddings',
    body:
      'Shallow tidal pools that mirror the sky, casuarina trees, and a beach that empties by 6:30 pm. Where we shoot our softest work — light dresses, bare feet, salt in your hair.',
    icons: [
      { Icon: Sunset, label: 'Sunset' },
      { Icon: Compass, label: 'Drone-friendly' },
      { Icon: Home, label: 'Quiet & private' },
    ],
    image: '/outdoors/Out_1.jpg',
    alt: 'Ashvem beach pre-wedding shoot Goa — golden hour photograph by PK Photography',
  },
  {
    id: 'arambol',
    n: '02',
    title: 'Arambol',
    subtitle: 'Bohemian & textured',
    best: 'Best for: portraits with character',
    body:
      'Cliff paths, sweetwater lake, and a bazaar that looks like an editorial location scout planted it there. For couples who want the shots to feel a little lived-in, a little wild.',
    icons: [
      { Icon: Mountain, label: 'Cliff views' },
      { Icon: Sunset, label: 'Sunset' },
      { Icon: Compass, label: 'Drone-friendly' },
    ],
    image: '/destination-weddings.jpg',
    alt: 'Arambol pre-wedding shoot Goa — cliff coast portrait by PK Photography',
  },
  {
    id: 'vagator',
    n: '03',
    title: 'Vagator & Chapora Fort',
    subtitle: 'Drama & silhouette',
    best: 'Best for: bold, cinematic frames',
    body:
      'Black basalt at Vagator and Chapora Fort’s red laterite walls give us frames that look painted. Come here when you want silhouettes, wide skies, and shots that feel epic.',
    icons: [
      { Icon: Mountain, label: 'Cliff views' },
      { Icon: Sunset, label: 'Sunset' },
      { Icon: Compass, label: 'Drone-friendly' },
    ],
    image: '/wedding/preWedding.jpg',
    alt: 'Vagator cliff pre-wedding shoot Goa by PK Photography',
  },
  {
    id: 'villa',
    n: '04',
    title: 'Private Villa Shoots',
    subtitle: 'For the introverts',
    best: 'Best for: fully private couple & maternity',
    body:
      'We scout an Assagao or Anjuna Portuguese villa — chequered floors, arched doorways, a pool — and shoot the whole day there. Total privacy, wardrobe changes on tap, catering optional.',
    icons: [
      { Icon: Home, label: 'Quiet & private' },
      { Icon: Sunset, label: 'Golden hour' },
      { Icon: MapPin, label: 'Curated set' },
    ],
    image: '/wedding/corousal/img4.jpg',
    alt: 'Private villa pre-wedding shoot Goa — Portuguese heritage villa by PK Photography',
  },
]

const PACKAGES = [
  {
    id: 'hourly',
    name: 'Hourly Session',
    starting: '₹5,000',
    unit: '/ hour',
    tag: 'Quick, focused couple or portrait shoot',
    inclusions: [
      '1 hour on location',
      '1 photographer',
      '1 location',
      'All raw photos + 25–30 selected edited photos',
      'Private online gallery',
      'Photos delivered same day',
    ],
    highlighted: false,
  },
  {
    id: 'half-day',
    name: 'Half-Day',
    starting: '₹10,000',
    unit: '/ 3–4 hrs',
    tag: 'Most-booked — stills, motion & aerials',
    inclusions: [
      '3–4 hours coverage',
      'Up to 2 locations',
      'Photography + Cinematography + Drone shoot',
      'All raw photos + 60–80 selected edited photos',
      '1 short reel',
      'Photos delivered same day, video in 1–2 days',
    ],
    highlighted: true,
  },
  {
    id: 'full-day',
    name: 'Full-Day',
    starting: '₹15,000',
    unit: '/ 6–7 hrs',
    tag: 'The full editorial experience',
    inclusions: [
      '6–7 hours coverage',
      '2–3 locations',
      'Photography + Cinematography + Drone shoot',
      'All raw photos + 120+ selected edited photos',
      '2–3 reels',
      'Outfit change support across locations',
      'Photos delivered same day, video in 1–2 days',
    ],
    highlighted: false,
  },
]

const ADDONS = [
  { name: 'Extra Photographer', price: '₹8,000 / day' },
  { name: 'Extra Videographer', price: '₹10,000 / day' },
  { name: 'Drone Cinematographer', price: '₹10,000 / day' },
  { name: 'Makeup / Hair Artist', price: '₹6,000 / day' },
  { name: 'iPhone Reel & BTS Shooter', price: '₹5,000 / day' },
  { name: 'Printed Luxury Album', price: '₹8,000' },
  { name: 'Extra Hour Extension', price: '₹2,000 / hour' },
  { name: 'Extra Reel Edit', price: '₹2,000 / reel' },
]

/* ---------------- Animated counter ---------------- */
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

/* ---------------- Scroll reveal wrapper ---------------- */
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

/* ---------------- Parallax image ---------------- */
function ParallaxImage({ src, alt, priority = false, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 h-[116%] -top-[8%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      </motion.div>
    </div>
  )
}

/* ---------------- Service (zig-zag) ---------------- */
function ServiceSection({ s, reverse }) {
  return (
    <section id={s.id} className="scroll-mt-28 py-14 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className={reverse ? 'md:order-2' : ''}>
          <Reveal y={40}>
            <ParallaxImage
              src={s.image}
              alt={s.alt}
              className="aspect-[4/5] rounded-[4px]"
            />
          </Reveal>
        </div>
        <div>
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-cormorant text-5xl md:text-6xl leading-none text-[#FF5B22]">
                {s.n}
              </span>
              <span className="h-px flex-1 bg-[#DBD4C6]" />
              <s.Icon size={22} className="text-[#8A857D]" strokeWidth={1.5} />
            </div>
            <p className="eyebrow mb-3">{s.tagline}</p>
            <h3 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514] mb-6">
              {s.title}
            </h3>
            {s.body.map((p, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed text-[#4a463f] mb-4 max-w-xl">
                {p}
              </p>
            ))}
            <p className="eyebrow mb-4 mt-8">What&rsquo;s included</p>
            <ul className="space-y-3 mb-8">
              {s.included.map((it, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#F3E4DC] grid place-content-center">
                    <Check size={12} className="text-[#E24A12]" strokeWidth={3} />
                  </span>
                  <span className="text-[#4a463f] leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
            <Link
              href={s.link}
              data-testid={`goa-service-link-${s.id}`}
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[#161514] hover:text-[#FF5B22] transition-colors"
            >
              Explore this service <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Reel highlight (dark card) ---------------- */
function ReelHighlight() {
  return (
    <section className="scroll-mt-28 my-14 md:my-24">
      <Reveal y={40}>
        <div className="relative overflow-hidden rounded-[6px] bg-[#161514] text-white grid md:grid-cols-2">
          <div className="relative min-h-[320px] md:min-h-[440px]">
            <Image
              src={REEL.image}
              alt={REEL.alt}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-[#161514]/40 to-transparent" />
            <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#FF7A4d]">
              <Sparkles size={14} /> Signature offering
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="eyebrow !text-[#FF7A4d] mb-3">Service 06 &mdash; for the algorithm &amp; the archive</p>
            <h3 className="font-cormorant text-4xl md:text-5xl leading-[1.02] mb-4">
              {REEL.title}
              <span className="block italic text-[#FF7A4d]">&mdash; {REEL.tagline}</span>
            </h3>
            <p className="text-white/75 leading-relaxed max-w-md mb-6">{REEL.body}</p>
            <div className="flex flex-wrap gap-2">
              {REEL.bullets.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/25 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/80 inline-flex items-center gap-1.5"
                >
                  <Smartphone size={12} /> {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------------- Location card with scroll parallax ---------------- */
function LocationCard({ loc, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const reverse = index % 2 === 1
  return (
    <article ref={ref} className="grid md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16">
      <div className={`md:col-span-8 ${reverse ? 'md:order-2 md:col-start-5' : 'md:col-start-1'}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[#DBD4C6]">
          <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
            <Image
              src={loc.image}
              alt={loc.alt}
              fill
              sizes="(max-width:768px) 100vw, 66vw"
              className="object-cover"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/50 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 text-white max-w-md">
            <p className="text-[10px] tracking-[0.32em] opacity-85 font-mono">
              LOCATION {loc.n} / 04
            </p>
            <h3 className="mt-1 font-cormorant text-3xl md:text-5xl leading-none tracking-[-0.01em]">
              {loc.title}
            </h3>
          </div>
          <div className="absolute top-5 right-5 text-white text-[10px] uppercase tracking-[0.28em] flex items-center gap-2 bg-[#161514]/50 backdrop-blur px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
            {loc.subtitle}
          </div>
        </div>
      </div>
      <div className={`md:col-span-4 flex flex-col justify-center ${reverse ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
        <Reveal>
          <p className="eyebrow !text-[#E24A12]">{loc.best}</p>
          <p className="mt-5 text-[#4a463f] leading-relaxed">{loc.body}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {loc.icons.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#4a463f]">
                <Icon size={14} className="text-[#E24A12]" />
                {label}
              </li>
            ))}
          </ul>
          <Link
            href="/booking"
            data-testid={`goa-location-cta-${loc.id}`}
            className="mt-8 inline-flex items-center gap-2 self-start text-sm uppercase tracking-[0.22em] link-underline text-[#161514] hover:text-[#FF5B22]"
          >
            Shoot here <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </div>
    </article>
  )
}

/* ---------------- FAQ accordion ---------------- */
function Faq({ faqs }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="divide-y divide-[#DBD4C6] border-y border-[#DBD4C6]">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              data-testid={`goa-faq-toggle-${i}`}
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

/* ================= PAGE ================= */
export default function GoaEditorial({ faqs }) {
  const heroRef = useRef(null)
  const { scrollYProgress: pageProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.12])
  const heroTextY = useTransform(heroProgress, [0, 1], ['0%', '60%'])
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

  const headline = ['Salt, silk,', '& slow', 'golden hours.']

  return (
    <main data-testid="goa-blog-page" className="bg-[#EEEAE1] text-[#161514]">
      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        data-transparent-header="true"
        data-testid="goa-blog-hero"
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-end"
      >
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <Image
            src="/wedding/preWedding.jpg"
            alt="Pre-wedding shoot Goa — couple silhouette at golden hour by PK Photography"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/40 to-[#0d0c0b]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0b]/70 via-transparent to-transparent" />

        <motion.div style={{ y: heroTextY, opacity: heroFade }} className="relative z-10 w-full">
          <div className="container mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blogs" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-[#FF5B22]">Pre-Wedding & Couple Shoots in Goa</li>
              </ol>
            </nav>

            <p className="eyebrow !text-[#FF7A4d] mb-5">A Goa Editorial &middot; Vol. 07</p>
            <h1 className="font-cormorant text-white text-[3rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[6.5rem] max-w-5xl">
              {headline.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className={`block pb-[0.06em] ${i === 1 ? 'italic text-[#FF7A4d]' : ''}`}
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
              className="mt-7 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed"
            >
              A complete guide to pre-wedding, couple &amp; portrait shoots in Goa &mdash; the
              locations we love, how we shoot them, and packages built for real
              moments (not stiff poses).
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/booking"
                data-testid="goa-hero-cta-book"
                className="inline-flex items-center gap-2 bg-white text-[#161514] hover:bg-[#FF5B22] hover:text-white transition-colors font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                Plan your Goa shoot <ArrowUpRight size={15} />
              </Link>
              <a
                href="#locations"
                data-testid="goa-hero-cta-locations"
                className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 transition-colors font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                See the locations
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

      {/* ---------------- MOBILE TOC ---------------- */}
      <div className="md:hidden sticky top-[60px] z-[70] bg-[#EEEAE1]/92 backdrop-blur-md border-y border-[#DBD4C6]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
          {TOC.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              data-testid={`goa-toc-mobile-${t.id}`}
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

      {/* ---------------- INTRO + TOC LAYOUT ---------------- */}
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="md:grid md:grid-cols-[1fr_260px] md:gap-16">
          <div>
            {/* Intro */}
            <section id="intro" className="scroll-mt-28 py-16 md:py-24">
              <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <Reveal>
                  <p className="eyebrow mb-4">Chapter 01 &mdash; The premise</p>
                  <h2 className="font-cormorant text-3xl md:text-[2.75rem] leading-[1.06] mb-6 text-[#161514]">
                    Goa is not a <em className="text-[#E24A12] not-italic font-normal">backdrop</em>. It&rsquo;s a{' '}
                    <em className="text-[#E24A12] not-italic font-normal">mood</em> &mdash; and we shoot it that way.
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f] mb-4">
                    For a decade, we&rsquo;ve been packing lenses into Innovas and driving
                    north &mdash; chasing the last hour of sun through Ashvem&rsquo;s
                    casuarinas, the black basalt at Vagator, the wet mirror sand at
                    Mandrem after a wave pulls back. This guide is the map we wish
                    we&rsquo;d had.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f]">
                    Whether you&rsquo;re planning a{' '}
                    <strong className="text-[#161514]">pre-wedding shoot in Goa</strong>, a
                    quiet couple session, a portfolio for portraits, or an iPhone
                    reel that actually looks like a film &mdash; this is how we work.
                  </p>
                </Reveal>
                <Reveal delay={0.15} y={40}>
                  <ParallaxImage
                    src="/wedding/engagement.jpg"
                    alt="Pre-wedding couple portrait on a Goa beach at golden hour by PK Photography"
                    priority
                    className="aspect-[4/5] rounded-[4px] shadow-2xl"
                  />
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-y-8 border-t border-[#DBD4C6] pt-10">
                  {STATS.map((st) => (
                    <div key={st.label} className="text-center md:text-left">
                      <div className="font-cormorant text-4xl md:text-6xl text-[#161514] leading-none">
                        <Counter value={st.value} suffix={st.suffix} />
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8A857D]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Services zig-zag */}
            <section id="services" className="scroll-mt-28">
              <Reveal>
                <div className="border-b border-[#DBD4C6] pb-8 mb-4">
                  <p className="eyebrow mb-3">Chapter 02 &mdash; What we shoot</p>
                  <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                    Six ways we work, in Goa.
                  </h2>
                </div>
              </Reveal>
              <div className="divide-y divide-[#DBD4C6]/70">
                {SERVICES.map((s, i) => (
                  <ServiceSection key={s.id} s={s} reverse={i % 2 === 1} />
                ))}
              </div>
              <ReelHighlight />
            </section>
          </div>

          {/* Sticky desktop TOC */}
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
                          data-testid={`goa-toc-${t.id}`}
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

      {/* ---------------- LOCATIONS (full-bleed on cream) ---------------- */}
      <section id="locations" className="scroll-mt-28 py-16 md:py-24 bg-[#F3E4DC]/40 border-y border-[#DBD4C6]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-4xl mb-10 md:mb-14">
              <p className="eyebrow mb-3">Chapter 03 &mdash; The atlas</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                Four locations we return to, <em className="text-[#E24A12] not-italic font-normal">again and again.</em>
              </h2>
              <p className="mt-5 max-w-xl text-[#4a463f] text-base md:text-lg leading-relaxed">
                Every pre-wedding shoot in Goa starts with a scout call. Here&rsquo;s
                what we usually recommend, and why. Distances, timing, permits,
                and a Plan B for rain &mdash; all handled by us.
              </p>
            </div>
          </Reveal>
          <div className="divide-y divide-[#DBD4C6]">
            {LOCATIONS.map((loc, i) => (
              <LocationCard key={loc.id} loc={loc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PACKAGES ---------------- */}
      <section id="packages" className="scroll-mt-28 py-16 md:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="mb-12 md:mb-16 max-w-3xl">
              <p className="eyebrow mb-3">Chapter 04 &mdash; The invest</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                Packages &amp; <em className="text-[#E24A12] not-italic font-normal">Pricing Structure</em>
              </h2>
              <p className="mt-5 text-[#4a463f] text-base md:text-lg leading-relaxed">
                Here&rsquo;s what most couples actually want to know before booking:
                how many hours, how many locations, how many photos (and do
                you get the raw files or just a curated set), and &mdash; most
                importantly &mdash; how long delivery actually takes.
              </p>
              <p className="mt-4 text-[#4a463f] text-base md:text-lg leading-relaxed">
                Industry-wide, pre-wedding photo delivery typically takes{' '}
                <strong className="text-[#161514]">3&ndash;8 weeks</strong>, and
                most studios only hand over a small edited selection, never the
                originals.{' '}
                <strong className="text-[#161514]">We do it differently:</strong>{' '}
                you get all your raw photos plus a fully edited selection, with
                photos delivered <em className="text-[#E24A12] not-italic">the same day</em>{' '}
                and full video edits following in 1&ndash;2 days.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1} y={36}>
                <article
                  data-testid={`goa-package-card-${p.id}`}
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
                  <p className={`eyebrow ${p.highlighted ? '!text-[#FF7A4d]' : ''}`}>{p.tag}</p>
                  <h3 className="mt-3 font-cormorant text-4xl md:text-5xl leading-none">{p.name}</h3>
                  <div className={`mt-6 text-[10px] uppercase tracking-[0.22em] ${p.highlighted ? 'text-white/60' : 'text-[#8A857D]'}`}>
                    Starting from
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-cormorant text-4xl md:text-5xl">{p.starting}</span>
                    <span className={`text-sm ${p.highlighted ? 'text-white/60' : 'text-[#8A857D]'}`}>{p.unit}</span>
                  </div>
                  <ul className="mt-8 space-y-3.5 flex-1">
                    {p.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-sm">
                        <Check
                          size={16}
                          className={`mt-0.5 shrink-0 ${p.highlighted ? 'text-[#FF7A4d]' : 'text-[#E24A12]'}`}
                          strokeWidth={2.5}
                        />
                        <span className={p.highlighted ? 'text-white/85' : 'text-[#4a463f]'}>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    data-testid={`goa-package-cta-${p.id}`}
                    className={`mt-10 inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors ${
                      p.highlighted
                        ? 'bg-[#FF5B22] text-white hover:bg-white hover:text-[#161514]'
                        : 'border border-[#161514] hover:bg-[#161514] hover:text-white'
                    }`}
                  >
                    Book {p.name.toLowerCase()} <ArrowUpRight size={14} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Add-Ons */}
          <Reveal>
            <div className="mt-16 md:mt-20">
              <div className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <p className="eyebrow mb-3">Add-Ons</p>
                  <h3 className="font-cormorant text-3xl md:text-4xl leading-tight text-[#161514] max-w-2xl">
                    Want to extend or customize any package? Here&rsquo;s what
                    we offer on top of the base plans.
                  </h3>
                </div>
              </div>

              <div
                data-testid="goa-addons-table"
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
                      data-testid={`goa-addon-${a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
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
                Add-ons can be combined with any package.{' '}
                <Link
                  href="/booking"
                  data-testid="goa-addons-inline-cta"
                  className="link-underline text-[#161514] font-semibold hover:text-[#FF5B22]"
                >
                  Get in touch to build a custom quote for your shoot.
                </Link>
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 border-t border-[#DBD4C6] pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow">Note</p>
                <h4 className="mt-2 font-cormorant text-2xl md:text-3xl leading-tight text-[#161514]">
                  Packages can be customized based on your preferred locations,
                  outfit changes, and add-ons. Get in touch for a tailored quote.
                </h4>
              </div>
              <Link
                href="/booking"
                data-testid="goa-package-cta-custom"
                className="self-start inline-flex items-center gap-2 bg-[#161514] text-white hover:bg-[#E24A12] transition-colors font-semibold px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.22em]"
              >
                Request a tailored quote <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faqs" className="scroll-mt-28 py-16 md:py-24 border-t border-[#DBD4C6]">
        <div className="container mx-auto max-w-[900px] px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Chapter 05 &mdash; The fine print</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-[#161514]">
                Questions, answered.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq faqs={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/wedding/preWedding.jpg"
            alt="Golden hour pre-wedding couple silhouette in Goa by PK Photography"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0d0c0b]/85" />
        </div>
        <div className="relative container mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28 text-white">
          <Reveal>
            <p className="eyebrow !text-[#FF7A4d] mb-5">Chapter 06 &mdash; The next step</p>
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.02] max-w-4xl mb-6">
              Ready to plan your <em className="not-italic text-[#FF7A4d]">Goa shoot?</em>
            </h2>
            <p className="max-w-xl text-white/75 text-lg leading-relaxed mb-10">
              Send us a note with your dates, vibe and a couple of Pinterest
              references &mdash; we&rsquo;ll come back with a scout call and a tailored
              plan.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                data-testid="goa-final-cta-book"
                className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-white hover:text-[#161514] transition-colors text-white font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em]"
              >
                Book now <ArrowUpRight size={15} />
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                data-testid="goa-final-cta-whatsapp"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb757] text-white font-semibold px-7 py-4 rounded-full text-[12px] uppercase tracking-[0.22em] transition-colors"
              >
                <MessageCircle size={15} /> WhatsApp us
              </a>
            </div>
            <div className="mt-14 pt-8 border-t border-white/15 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.22em] text-white/60">
              <span>Related:</span>
              <Link href="/services/weddings" className="link-underline hover:text-white">
                Weddings
              </Link>
              <Link href="/services/weddings" className="link-underline hover:text-white">
                Portraits
              </Link>
              <Link href="/services/weddings" className="link-underline hover:text-white">
                Maternity &amp; Baby
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

