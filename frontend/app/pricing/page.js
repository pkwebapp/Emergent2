'use client'

import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Calendar, MessageCircle, Link as LinkIcon, Check, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IMG, CONTACT } from '@/components/site/Chrome'

const CATEGORIES = [
  { key: 'portraits', label: 'Portraits, Portfolio & Headshots' },
  { key: 'weddings', label: 'Weddings' },
  { key: 'events', label: 'Events' },
]

/* -------------------- PORTRAITS / PORTFOLIO / HEADSHOTS -------------------- */
const PORTRAIT_TIERS = [
  {
    badge: 'Starter Package',
    price: '₹5,000',
    name: 'One-Hour Portrait Session',
    duration: '1 Hour',
    features: [
      'Unlimited dress changes within the time frame',
      'Shooting & Editing costs (Hair & Makeup not included)',
      '5 Edited Photographs',
      'All Raw Photos via Drive Link',
    ],
    note: 'Dresses not included',
    img: IMG.p6,
    featured: false,
  },
  {
    badge: 'Standard Package',
    price: '₹15,000',
    name: 'Mini Portfolio Shoot',
    duration: '3 to 4 Hours',
    features: [
      '3 Different Looks',
      'Studio, Shooting, Editing',
      'Hair & Makeup Artist Costs Included',
      '15 Edited Photographs',
      'All Raw Photos via Drive Link',
    ],
    note: 'Dresses not included',
    img: IMG.p4,
    featured: true,
    badgeText: 'Most Popular',
  },
  {
    badge: 'Premium Package',
    price: '₹20,000',
    name: 'Full Portfolio Shoot',
    duration: '5 to 6 Hours',
    features: [
      '5 Different Looks',
      'Studio, Shooting, Editing',
      'Hair & Makeup Artist Costs Included',
      '20 Edited Photographs',
      'All Raw Photos via Drive Link',
    ],
    note: 'Dresses not included',
    img: IMG.p1,
    featured: false,
  },
]

/* --------------------------------- WEDDINGS --------------------------------- */
const WEDDING_TIERS = [
  {
    badge: 'Standard Package',
    price: '₹80,000',
    original: '₹1,20,000',
    save: 'Save 33%',
    name: 'Intimate Wedding Coverage',
    duration: 'Single-Day Coverage',
    features: [
      '2 Photographers',
      '2 Videographers',
      'Drone Cinematography',
      'All Edited Photos',
      'Traditional Wedding Film',
      'Online Gallery',
      'Pen Drive',
      'Luxury Printed Album',
    ],
    note: 'For the intimate, unhurried celebration',
    img: IMG.v1,
    featured: false,
  },
  {
    badge: 'Premium Package',
    price: '₹1,20,000',
    original: '₹1,80,000',
    save: 'Save 33%',
    name: 'Complete Wedding Story',
    duration: 'Full Wedding Day',
    features: [
      '2 Photographers',
      '2 Videographers',
      'Drone Cinematography',
      'All Edited Photos',
      '8–10 Minute Cinematic Film',
      'Traditional Film',
      'Pre-Wedding Consultation',
      'Online Gallery',
      'Premium Printed Album',
    ],
    note: 'Our most-chosen — balance of story and completeness',
    img: IMG.v3,
    featured: true,
    badgeText: 'Most Chosen',
  },
  {
    badge: 'Luxury Package',
    price: '₹2,00,000',
    original: '₹2,80,000',
    save: 'Save 28%',
    name: 'Multi-Day Wedding Feature',
    duration: 'Multi-Day Coverage',
    features: [
      '3 Photographers',
      '2 Videographers',
      'Multi-Day Coverage',
      'Drone Cinematography',
      'All Edited Photos',
      '12–15 Minute Cinematic Feature Film',
      'Half-Day Pre-Wedding Shoot',
      'Online Gallery',
      'Hardcover Luxury Album',
    ],
    note: 'For the wedding that unfolds over days, not hours',
    img: IMG.v5,
    featured: false,
  },
]

/* ---------------------------------- EVENTS ---------------------------------- */
const EVENT_TIERS = [
  {
    badge: 'Event Essentials',
    price: '₹6,000',
    name: 'Event Essentials',
    duration: '3–4 Hours',
    features: [
      '3–4 Hours Coverage',
      '1 Professional Photographer',
      'All Raw Images',
      'Professionally Edited Photos',
      'Digital Delivery',
    ],
    note: 'Perfect for meetings, seminars, workshops, and small corporate events.',
    img: IMG.v2,
    featured: false,
  },
  {
    badge: 'Event Plus',
    price: '₹15,000',
    name: 'Event Plus',
    duration: '3–4 Hours',
    features: [
      '3–4 Hours Coverage',
      '1 Professional Photographer',
      '1 Professional Videographer',
      'All Raw Images',
      'Professionally Edited Photos',
      '1 Cinematic Highlight Video',
      'Digital Delivery',
    ],
    note: 'Ideal for product launches, networking events, conferences, and brand activations.',
    img: IMG.v4,
    featured: true,
    badgeText: 'Most Popular',
  },
  {
    badge: 'Event Pro',
    price: '₹25,000',
    name: 'Event Pro',
    duration: 'Full-Day',
    features: [
      'Full-Day Event Coverage',
      '1 Professional Photographer',
      '1 Professional Cinematographer',
      'All Raw Images',
      'Professionally Edited Photos',
      '1 Cinematic Highlight Video',
      'Traditional 30-Minute Event Film (Optional)',
      'Digital Delivery',
    ],
    note: 'Complete coverage for conferences, award ceremonies, exhibitions, annual meetings and premium corporate events.',
    img: IMG.v6,
    featured: false,
  },
]

const EVENT_ADDONS = [
  { name: 'Additional Photographer', price: '₹8,000' },
  { name: 'Additional Cinematographer', price: '₹12,000' },
  { name: 'Luxury Printed Album', price: '₹8,000' },
  { name: 'Instant Photo Printing', price: '₹8,000' },
  { name: 'Live LED Screen Coverage', price: '₹15,000' },
]

const TIERS_BY_KEY = {
  portraits: PORTRAIT_TIERS,
  weddings: WEDDING_TIERS,
  events: EVENT_TIERS,
}

/* --------------------------------- COMPONENT -------------------------------- */
export default function PricingPage() {
  return (
    <Suspense fallback={<PricingShell />}>
      <PricingInner />
    </Suspense>
  )
}

function PricingShell() {
  return (
    <main className="bg-[#EEEAE1]">
      <PricingHero />
    </main>
  )
}

function PricingHero() {
  const highlights = ['Wedding packages', 'Portrait pricing', 'Event coverage', 'Mumbai · Goa']

  return (
    <section className="relative overflow-hidden pt-36 md:pt-44 pb-12 md:pb-16 bg-[#EEEAE1]" data-testid="pricing-hero-section">
      <div className="absolute -top-28 right-[-8%] w-[420px] h-[420px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.16), transparent 62%)' }} />
      <div className="absolute bottom-[-38%] left-[-8%] w-[520px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,21,20,0.08), transparent 65%)' }} />
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="eyebrow mb-5" data-testid="pricing-hero-eyebrow">03 / Pricing</div>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[0.98] max-w-[11ch]" data-testid="pricing-hero-title">
              Photography Packages &amp; Prices in <span className="text-[#FF5B22] italic font-medium">Mumbai &amp; Goa.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[#4C4A46] text-base leading-relaxed" data-testid="pricing-hero-subtitle">
              Clear starting packages for weddings, portraits and events — with custom quotes for destination, brand and multi-day shoots.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#pricing-grid" data-testid="pricing-hero-view-packages" className="inline-flex justify-center items-center gap-3 bg-[#161514] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors">
                View packages <ArrowRight size={14} />
              </a>
              <Link href="/booking" data-testid="pricing-hero-booking-link" className="inline-flex justify-center items-center gap-3 border border-[#DBD4C6] bg-[#EEEAE1] text-[#161514] px-6 py-3 rounded-full text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
                Check availability
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }} className="relative rounded-[2rem] border border-[#DBD4C6] bg-[#E6E1D5]/80 p-5 md:p-6 overflow-hidden" data-testid="pricing-hero-card">
            <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-[#FF5B22]/12" />
            <div className="relative grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-3xl bg-[#161514] text-white p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Starting from</div>
                <div className="display text-4xl mt-2">₹5,000</div>
                <p className="mt-2 text-sm text-white/65">Portrait, portfolio, wedding and event packages with clear inclusions.</p>
              </div>
              {highlights.map((item) => (
                <div key={item} className="rounded-2xl border border-[#DBD4C6] bg-[#EEEAE1] px-4 py-3 text-sm font-semibold text-[#4C4A46]">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PricingInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialKey = (() => {
    const raw = (searchParams.get('category') || '').toLowerCase()
    return CATEGORIES.find((c) => c.key === raw) ? raw : 'portraits'
  })()

  const [active, setActive] = useState(initialKey)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const raw = (searchParams.get('category') || '').toLowerCase()
    const next = CATEGORIES.find((c) => c.key === raw)?.key || 'portraits'
    if (next !== active) setActive(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const setTab = (key) => {
    setActive(key)
    router.push(`/pricing?category=${key}`, { scroll: false })
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        const el = document.getElementById('pricing-grid')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  const copyShareLink = async () => {
    try {
      const url = `${window.location.origin}/pricing?category=${active}`
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) { /* no-op */ }
  }

  const activeCategory = CATEGORIES.find((c) => c.key === active)
  const tiers = TIERS_BY_KEY[active]

  return (
    <main className="bg-[#EEEAE1]">
      <PricingHero />

      {/* Category Tabs */}
      <section className="border-b border-[#DBD4C6] bg-[#EEEAE1]/95 sticky top-[80px] md:top-[92px] z-30 backdrop-blur">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide py-4" data-testid="pricing-tabs">
            {CATEGORIES.map((c) => (
              <a
                key={c.key}
                href={`/pricing?category=${c.key}`}
                onClick={(e) => { e.preventDefault(); setTab(c.key) }}
                data-testid={`pricing-tab-${c.key}`}
                className={`shrink-0 group inline-flex items-center gap-2 px-5 md:px-7 py-3 rounded-full text-sm md:text-base font-semibold transition-colors ${
                  active === c.key
                    ? 'bg-[#161514] text-white'
                    : 'bg-[#EEEAE1] text-[#161514] border border-[#DBD4C6] hover:border-[#FF5B22] hover:text-[#FF5B22]'
                }`}
              >
                {c.label}
                <ArrowRight
                  size={14}
                  className={`transition-transform ${active === c.key ? 'translate-x-0.5' : 'group-hover:translate-x-1'}`}
                />
              </a>
            ))}
            <button
              onClick={copyShareLink}
              data-testid="pricing-copy-link"
              title="Copy shareable link to this pricing"
              className={`ml-auto shrink-0 inline-flex items-center gap-2 px-4 md:px-5 py-3 rounded-full text-xs md:text-sm font-semibold transition-colors ${
                copied
                  ? 'bg-[#FF5B22] text-white'
                  : 'bg-[#EEEAE1] text-[#161514] border border-[#DBD4C6] hover:border-[#FF5B22] hover:text-[#FF5B22]'
              }`}
            >
              {copied ? <Check size={14} /> : <LinkIcon size={14} />}
              {copied ? 'Link copied' : 'Share'}
            </button>
          </div>
        </div>
      </section>

      {/* Active Category Header */}
      <section className="pt-14 md:pt-20 pb-6">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <div className="eyebrow mb-3" data-testid="pricing-active-eyebrow">
                  {String(CATEGORIES.findIndex((c) => c.key === active) + 1).padStart(2, '0')} · {activeCategory.label}
                </div>
                <h2 className="display text-5xl md:text-6xl leading-[0.98]" data-testid="pricing-active-title">
                  {active === 'portraits' && (<>Portrait, portfolio &amp;<br /><span className="text-[#FF5B22] italic font-medium">headshot packages.</span></>)}
                  {active === 'weddings' && (<>Wedding day,<br /><span className="text-[#FF5B22] italic font-medium">documented in full.</span></>)}
                  {active === 'events' && (<>Every event, every angle,<br /><span className="text-[#FF5B22] italic font-medium">covered.</span></>)}
                </h2>
              </div>
              <p className="max-w-md text-[#8A857D]">
                {active === 'portraits' && 'Studio & on-location sessions for individuals, models, actors and corporate teams. Includes hair & makeup on Standard/Premium.'}
                {active === 'weddings' && 'Full crew, drone cinematography, cinematic films and premium printed albums for Mumbai weddings and Goa destination celebrations.'}
                {active === 'events' && 'Corporate meetings, conferences, launches, exhibitions and social gatherings — one photographer or a full crew, your call.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing-grid" className="pb-16">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-testid="pricing-cards"
            >
              {tiers.map((t, i) => (
                <PricingCard key={t.name + '-' + i} tier={t} index={i} categoryLabel={activeCategory.label} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Wedding travel note */}
          {active === 'weddings' && (
            <p className="mt-10 text-center text-xs text-[#8A857D] max-w-2xl mx-auto italic">
              Travel within Mumbai and Goa are included in all packages. Destination weddings across Jaipur, Udaipur, Delhi &amp; the rest of India are quoted separately with transparent travel &amp; stay costs.
            </p>
          )}

          {/* Event Add-ons */}
          {active === 'events' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] overflow-hidden"
              data-testid="pricing-addons"
            >
              <div className="p-6 md:p-8 border-b border-[#DBD4C6] flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#161514] text-white grid place-content-center">
                  <Plus size={18} />
                </span>
                <div>
                  <div className="eyebrow">Optional Extras</div>
                  <h3 className="display text-2xl md:text-3xl">Add-On Services</h3>
                </div>
              </div>
              <ul className="divide-y divide-[#DBD4C6]">
                {EVENT_ADDONS.map((a, i) => (
                  <li
                    key={a.name}
                    data-testid={`pricing-addon-${i}`}
                    className="flex items-center justify-between px-6 md:px-8 py-5 hover:bg-[#EEEAE1] transition-colors"
                  >
                    <span className="font-medium text-[#161514]">{a.name}</span>
                    <span className="font-semibold text-[#FF5B22] tabular">{a.price}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Custom Quote CTA */}
          <div className="mt-16 rounded-3xl bg-[#E6E1D5] border border-[#DBD4C6] p-8 md:p-12 flex flex-col md:flex-row justify-between gap-6 items-center">
            <div>
              <div className="eyebrow mb-2">Custom Quote</div>
              <h3 className="display text-3xl md:text-4xl">Need something bigger?</h3>
              <p className="mt-2 text-[#8A857D] max-w-xl">
                Multi-day productions, destination weddings, and enterprise events get custom scoping. Share your brief and we&apos;ll respond within a few hours.
              </p>
            </div>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="pricing-custom-quote-whatsapp" className="inline-flex items-center gap-3 bg-[#FF5B22] text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-[#E24A12] transition-colors shrink-0">
              <MessageCircle size={16} /> Request Custom Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function PricingCard({ tier, index, categoryLabel }) {
  const featured = !!tier.featured
  const waMessage = [
    `Hi Prabhakar, I want to book for this service:`,
    ``,
    `Category: ${categoryLabel}`,
    `Package: ${tier.name} (${tier.badge})`,
    `Price: ${tier.price}${tier.original ? ` (was ${tier.original})` : ''}`,
    `Duration: ${tier.duration}`,
    `Includes:`,
    ...tier.features.map((f) => `• ${f}`),
    ``,
    `Please share the next steps. Thanks!`,
  ].join('\n')
  const waUrl = `https://wa.me/918888766739?text=${encodeURIComponent(waMessage)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      data-testid={`pricing-card-${index}`}
      className={`relative rounded-3xl overflow-hidden border flex flex-col ${
        featured
          ? 'border-[#FF5B22] bg-gradient-to-b from-[#EFE9DE] to-[#EEEAE1] shadow-2xl md:-mt-6 md:mb-6'
          : 'border-[#DBD4C6] bg-[#EEEAE1]'
      }`}
    >
      {featured && (
        <div className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase bg-[#FF5B22] text-white px-3 py-1.5 rounded-full z-10">
          {tier.badgeText || 'Most Popular'}
        </div>
      )}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={tier.img} alt={`${tier.name} package at Mumbai and Goa photography setting in luxury editorial style, Mumbai & Goa`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
      <div className="p-7 flex flex-col grow">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#FF5B22]">{tier.badge}</div>
        <div className="mt-3 flex items-baseline gap-3 flex-wrap">
          <span className="display text-4xl md:text-5xl">{tier.price}</span>
          <span className="text-xs text-[#8A857D]">INR</span>
          {tier.original && (
            <span className="text-sm text-[#8A857D] line-through">{tier.original}</span>
          )}
          {tier.save && (
            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F3E4DC] text-[#E24A12] px-2 py-1 rounded-full">
              {tier.save}
            </span>
          )}
        </div>
        <div className="mt-4 pb-4 border-b border-[#DBD4C6]">
          <div className="text-lg font-semibold">{tier.name}</div>
          <div className="text-xs text-[#8A857D] mt-1 flex items-center gap-2">
            <Calendar size={12} className="text-[#FF5B22]" /> Duration: {tier.duration}
          </div>
        </div>
        <ul className="mt-4 space-y-3 grow">
          {tier.features.map((f, j) => (
            <li key={j} className="flex items-start gap-3 text-sm text-[#161514]">
              <span className="w-4 h-4 rounded-full bg-[#F3E4DC] text-[#FF5B22] grid place-content-center shrink-0 mt-0.5">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        {tier.note && (
          <div className="mt-4 text-[11px] italic text-[#8A857D]">Note: {tier.note}</div>
        )}
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            data-testid={`pricing-card-${index}-whatsapp`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Enquire on WhatsApp
          </a>
          <Link
            href="/booking"
            data-testid={`pricing-card-${index}-form`}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-sm transition-colors ${
              featured ? 'bg-[#FF5B22] text-white hover:bg-[#E24A12]' : 'bg-[#161514] text-white hover:bg-[#FF5B22]'
            }`}
          >
            Or use booking form <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
