'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Clock, Lock, EyeOff, Heart, KeyRound, Feather, ShieldCheck } from 'lucide-react'
import { waLink } from '@/components/site/Chrome'
import { ReadingProgress } from '@/components/services/ServiceExtras'
import HeroMedia from '@/components/media/HeroMedia'
import { SERVICES } from '@/lib/services'
import { SERVICE_SEO, imageAlt } from '@/lib/seo'

const SLUG = 'boudoir-shoots'
const IMG = {
  hero: '/images/boudoir/hero.jpg',
  window: '/images/boudoir/window.jpg',
  drape: '/images/boudoir/drape.jpg',
  fabric: '/images/boudoir/fabric.jpg',
  vanity: '/images/boudoir/vanity-indian.jpg',
  veil: '/images/boudoir/bridal.jpg',
  maternity: '/images/boudoir/maternity.jpg',
  moody: '/images/boudoir/moody.jpg',
  album: '/images/boudoir/album.jpg',
}

/* ---------- Content ---------- */
const ABOUT = 'A boudoir session with us is private, unhurried and completely on your terms. We shoot in a closed studio with only essential crew, a female makeup artist and stylist available on request, and gentle, guided posing — no experience needed, no forced poses, ever. Every image stays confidential: you approve everything, and nothing is shared or published without your written consent.'

const COVERS = [
  { t: 'Session Styles', icon: Heart, img: IMG.fabric, l: ['Bridal boudoir (pre-wedding gift)', 'Milestone & self-celebration shoots', 'Maternity boudoir', 'Couples sessions'] },
  { t: 'Comfort & Privacy', icon: Lock, dark: true, l: ['Closed private studio, essential crew only', 'Female MUA & stylist on request', 'Guided posing — no experience needed', 'Bring a friend along if you wish'] },
  { t: 'Styling & Preparation', icon: Feather, img: IMG.vanity, l: ['Pre-shoot wardrobe consultation', 'Hair & makeup included in packages', 'Mood board agreed before the day', 'Multiple outfit changes & sets'] },
  { t: 'Confidential Delivery', icon: KeyRound, img: IMG.album, l: ['Private, password-protected gallery', 'Fine-art retouching you approve', 'Optional printed keepsake box', 'Never used in our portfolio without consent'] },
]

const AUDIENCE = [
  { t: 'Brides-to-be', d: 'A wedding-day gift they will never expect — and never forget.', img: IMG.veil },
  { t: 'Personal Milestones', d: 'A birthday, a new chapter, a promise kept to yourself.', img: IMG.drape },
  { t: 'Anniversary Gifts', d: 'For the person who has seen every version of you.', img: IMG.moody },
  { t: 'Maternity', d: 'The quiet strength of this season, held in soft light.', img: IMG.maternity },
]

const WHY = [
  { t: 'Privacy first', d: 'A closed studio, minimal crew, and files stored securely from the moment they are taken.' },
  { t: 'A team you choose', d: 'A female makeup artist and stylist are available on request — you decide who is in the room.' },
  { t: 'Gentle direction', d: 'Step-by-step guided posing designed for first-timers. Most of our clients have never done this before.' },
  { t: 'Your written consent', d: 'You approve every image. Nothing is published, shared or shown without your signature.' },
]

const PROCESS = [
  ['Consultation', 'A private call to plan looks, sets and comfort levels — everything is agreed before the day.'],
  ['Prep & Styling', 'Wardrobe finalised, then hair and makeup done in-studio so you walk in ready.'],
  ['Guided Session', 'Unhurried shooting with step-by-step posing. We only shoot what you are comfortable with.'],
  ['Private Reveal', 'You select your favourites, we retouch them, and everything is delivered confidentially.'],
]

const PRICING = [
  { name: 'Essential', price: '₹18,000', original: '₹24,000', f: ['2-hour private studio session', '2 looks / outfit changes', 'Hair & makeup included', '15 fine-art retouched images', 'Private online gallery'] },
  { name: 'Signature', price: '₹32,000', original: '₹40,000', popular: true, f: ['3-hour session, 3–4 looks', 'Wardrobe & styling consultation', 'Hair & makeup artist on set', '30 fine-art retouched images', 'Keepsake print box option'] },
  { name: 'Luxe', price: '₹55,000', original: '₹70,000', f: ['Half-day session, unlimited looks', 'Styled sets & premium lighting', 'MUA + stylist throughout', '50+ retouched images', 'Luxury printed album included'] },
]

const FAQS = [
  { q: 'Is the session completely private?', a: 'Yes. We shoot in a closed studio with only essential crew present, and a female makeup artist and stylist are available on request. You can also bring a friend or partner along for comfort.' },
  { q: 'I have never modelled — will you guide me?', a: 'Absolutely. Most of our clients are first-timers. We guide every pose step by step, keep the session unhurried, and only shoot what you are comfortable with.' },
  { q: 'Who sees my photos?', a: 'Only you and the retoucher working on your selects. Files are stored securely, delivered through a private password-protected gallery, and never used in our portfolio or marketing without your written consent.' },
  { q: 'What should I wear?', a: 'Whatever makes you feel confident — from elegant outfits and sarees to lingerie or a simple shirt. We do a wardrobe consultation before the shoot and plan looks together.' },
  { q: 'How much retouching is done?', a: 'Fine-art retouching that keeps you looking like yourself — skin is refined, not reshaped. You review the selects and approve the final edit.' },
]

const TESTIMONIALS = [
  { name: 'Priya', tag: 'Bridal boudoir · Mumbai', quote: 'I was shaking when I walked in. An hour later I had forgotten the camera was even there. My husband teared up when he opened the album on our wedding morning.' },
  { name: 'Meera', tag: 'Milestone shoot at 40', quote: 'The most seen I have felt in years. Nothing was rushed, nothing felt awkward — draped in my mother\'s saree, it was just… me.' },
  { name: 'Ananya', tag: 'Maternity boudoir · Goa', quote: 'They photographed my saree-draped bump so gently, with so much patience. I look at those frames every single day.' },
  { name: 'Sana', tag: 'Anniversary gift', quote: 'Everything stayed private, exactly as promised — the gallery, the files, all of it. That mattered to me more than anything else.' },
]

const DEFAULT_PORTFOLIO = [
  { url: IMG.window, title: 'Window Light Study' },
  { url: IMG.veil, title: 'Bridal Boudoir' },
  { url: IMG.drape, title: 'Silk & Shoulder' },
  { url: IMG.moody, title: 'Candlelit Session' },
  { url: IMG.maternity, title: 'Maternity in Sheer' },
  { url: IMG.vanity, title: 'The Preparation' },
  { url: IMG.fabric, title: 'Lace Detail' },
  { url: IMG.album, title: 'The Keepsake' },
]

/* ---------- FAQ item (minimal, fine borders, serif question) ---------- */
function FAQItem({ q, a }) {
  return (
    <details className="group border-b border-[#DBD4C6] py-6" data-testid={`boudoir-faq-${q.slice(0, 18).toLowerCase().replace(/[^a-z]+/g, '-')}`}>
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="font-cormorant text-xl md:text-2xl font-medium pr-6 text-[#161514]">{q}</span>
        <span className="w-8 h-8 rounded-full grid place-content-center border border-[#DBD4C6] text-[#8A857D] group-open:bg-[#FF5B22] group-open:border-[#FF5B22] group-open:text-white group-open:rotate-45 transition-all shrink-0">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </span>
      </summary>
      <p className="mt-4 text-[#8A857D] leading-[1.9] max-w-3xl font-light">{a}</p>
    </details>
  )
}

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
}

export default function BoudoirPageClient() {
  const service = SERVICES.find((s) => s.slug === SLUG)
  const seo = SERVICE_SEO[SLUG] || {}
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [portfolio, setPortfolio] = useState(DEFAULT_PORTFOLIO)
  const heroRef = useRef(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '20%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.12])

  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    fetch(`${backend}/api/media?slot=${SLUG}-gallery`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => {
        const items = (data?.items || [])
          .filter((i) => i.secure_url)
          .map((i) => ({ url: i.secure_url, title: i.alt || '', location: i.location || '' }))
        if (items.length) setPortfolio(items)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setShowStickyCTA(window.scrollY > 900)
    onScroll(); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const localAlt = (subject) => imageAlt(subject, 'private Andheri studio, Mumbai and Goa', 'tasteful fine-art boudoir', 'Mumbai & Goa')

  return (
    <main className="bg-[#EEEAE1]">
      <ReadingProgress />

      {/* ---------- Video Hero with parallax (UNCHANGED from template) ---------- */}
      <section ref={heroRef} className="relative min-h-[92svh] overflow-hidden bg-[#161514]">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <HeroMedia slot={`${SLUG}-banner`} fallbackImage={IMG.hero} fallbackVideo={null} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#161514]/40 via-transparent to-[#161514]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161514]/70 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 min-h-[92svh] flex flex-col justify-end px-6 md:px-14 pt-32 pb-16 container mx-auto max-w-[1400px]">
          <nav className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#FF5B22]">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#FF5B22]">Services</Link>
            <span>/</span>
            <span className="text-white">Boudoir Shoots</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/60 mb-5" data-testid="service-page-eyebrow">{(seo.serviceTitle || service.t)} · Mumbai &amp; Goa</div>
            <h1 className="display text-white text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-[-0.015em] max-w-[22ch]" data-testid="service-page-h1">{seo.h1 || service.t}</h1>
            <span className="mt-7 block w-11 h-px bg-[#EEEAE1]/55" aria-hidden="true" />
            <p className="mt-6 text-white/80 text-[15px] md:text-base max-w-[52ch] leading-relaxed font-light" data-testid="service-page-hero-copy">{seo.hero || seo.description}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={`/booking?service=${SLUG}`} data-testid="service-hero-booking-link" className="group inline-flex items-center gap-3 bg-[#EEEAE1] text-[#161514] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#FF5B22] hover:text-white transition-colors">
                Book this service <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={waLink({ service: 'Boudoir Photography', page: 'Boudoir Shoots' })} target="_blank" rel="noreferrer" data-testid="service-hero-whatsapp-link" className="inline-flex items-center gap-3 text-white/90 hover:text-white text-sm font-semibold">
                <MessageCircle size={15} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        <svg className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '100px' }}>
          <path d="M0,120 C240,20 720,100 1440,10 L1440,120 Z" fill="#EEEAE1" />
        </svg>
      </section>

      {/* ---------- About (REDESIGNED: split editorial, serif, portrait) ---------- */}
      <section className="py-24 md:py-36 bg-[#EEEAE1] overflow-hidden" data-testid="boudoir-about-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
            <motion.div {...reveal} className="col-span-12 md:col-span-7 order-2 md:order-1">
              <div className="eyebrow mb-5 text-[#FF5B22]">About This Service</div>
              <h2 className="font-cormorant text-5xl md:text-7xl leading-[1.02] text-[#161514] font-medium">
                Private, unhurried,<br />
                <span className="italic text-[#FF5B22] font-normal">entirely yours.</span>
              </h2>
              <span className="mt-10 block w-14 h-px bg-[#161514]/30" aria-hidden="true" />
              <p className="mt-10 text-[#4C4A46] text-base md:text-lg leading-[2] font-light max-w-[58ch] first-letter:font-cormorant first-letter:text-6xl first-letter:float-left first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:text-[#161514]">
                {ABOUT}
              </p>
              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                {[['Closed studio', EyeOff], ['Female MUA on request', Heart], ['Written-consent policy', ShieldCheck]].map(([t, Icon], i) => (
                  <div key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#8A857D]">
                    <Icon size={15} strokeWidth={1.25} className="text-[#FF5B22]" /> {t}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} className="col-span-12 md:col-span-5 order-1 md:order-2">
              <div className="relative max-w-[420px] mx-auto md:ml-auto">
                <div className="absolute -inset-4 border border-[#DBD4C6] rounded-[32px]" aria-hidden="true" />
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
                  <img src={IMG.window} alt={localAlt('Elegant boudoir silhouette in soft window light')} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-32 h-40 rounded-2xl overflow-hidden border-4 border-[#EEEAE1] shadow-xl hidden md:block">
                  <img src={IMG.fabric} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-6 -right-3 md:-right-6 bg-[#161514] text-[#EEEAE1] rounded-full px-4 py-2 text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 shadow-lg">
                  <Lock size={11} strokeWidth={1.5} className="text-[#FF5B22]" /> 100% Confidential
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- SEO body block (UNCHANGED from template) ---------- */}
      {(seo.body || seo.intro) && (
        <section className="py-16 md:py-20 bg-[#EEEAE1] border-t border-[#DBD4C6]/50">
          <div className="container mx-auto max-w-[980px] px-6 md:px-10" data-testid="service-local-seo-copy">
            {seo.h2 && (
              <h2 className="display text-2xl md:text-3xl text-[#161514] leading-[1.25] max-w-3xl">
                {seo.h2}
              </h2>
            )}
            <div className="mt-6 space-y-5 text-[#4C4A46] text-[15px] leading-[1.85] font-light">
              {(seo.body || [seo.intro]).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/gallery" data-testid="service-internal-gallery-link" className="rounded-2xl border border-[#DBD4C6] bg-[#E6E1D5] p-4 text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
                View Mumbai & Goa gallery →
              </Link>
              <Link href="/pricing" data-testid="service-internal-pricing-link" className="rounded-2xl border border-[#DBD4C6] bg-[#E6E1D5] p-4 text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
                Compare packages & prices →
              </Link>
              <Link href={`/booking?service=${SLUG}`} data-testid="service-internal-booking-link" className="rounded-2xl border border-[#DBD4C6] bg-[#161514] text-white p-4 text-sm font-semibold hover:bg-[#FF5B22] transition-colors">
                Book this service online →
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2" data-testid="service-keyword-tags">
              {(seo.keywords || []).slice(0, 6).map((k) => (
                <span key={k} className="text-[10px] tracking-[0.12em] uppercase text-[#8A857D] border border-[#DBD4C6] rounded-full px-3 py-1.5">{k}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Serif pull-quote divider (REDESIGNED, replaces stats strip) ---------- */}
      <section className="py-20 md:py-28 bg-[#E6E1D5]" data-testid="boudoir-quote-section">
        <div className="container mx-auto max-w-[900px] px-6 md:px-10 text-center">
          <motion.div {...reveal}>
            <span className="font-cormorant text-7xl text-[#FF5B22] leading-none block" aria-hidden="true">“</span>
            <p className="font-cormorant italic text-3xl md:text-[2.6rem] leading-[1.35] text-[#161514] font-light -mt-4">
              You don&apos;t need to know how to pose.<br className="hidden md:block" /> You only need to show up — we&apos;ll take care of the rest.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="w-10 h-px bg-[#161514]/25" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#8A857D]">The PK Boudoir Promise</span>
              <span className="w-10 h-px bg-[#161514]/25" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- What We Cover (REDESIGNED: bento, cream + ink) ---------- */}
      <section className="py-24 md:py-32 bg-[#E6E1D5] border-t border-[#DBD4C6]/60" data-testid="boudoir-covers-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="max-w-2xl mb-16">
            <div className="eyebrow mb-4 text-[#FF5B22]">What Your Session Includes</div>
            <h2 className="font-cormorant text-5xl md:text-6xl leading-[1.05] text-[#161514] font-medium">
              Every detail, held <span className="italic text-[#FF5B22] font-normal">gently.</span>
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-5">
            {/* 01 · Session Styles — tall image card */}
            <motion.div {...reveal} className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden border border-[#DBD4C6] group min-h-[460px]">
              <img src={COVERS[0].img} alt={localAlt('Silk and lace styling detail for a boudoir session')} className="absolute inset-0 w-full h-full object-cover transition-transform [transition-duration:1400ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/90 via-[#161514]/25 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <span className="font-cormorant italic text-lg text-[#EEEAE1]/70">no. 01</span>
                <h3 className="font-cormorant text-3xl font-medium mt-1">{COVERS[0].t}</h3>
                <ul className="mt-5 space-y-2.5">
                  {COVERS[0].l.map((li, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-light text-white/85">
                      <span className="w-1 h-1 rounded-full bg-[#FF5B22] mt-2 shrink-0" /> {li}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 02 · Comfort & Privacy — dark intimate card */}
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }} className="col-span-12 md:col-span-4 rounded-3xl bg-[#161514] text-[#EEEAE1] p-8 md:p-10 flex flex-col min-h-[460px]">
              <div className="w-12 h-12 rounded-full border border-white/15 grid place-content-center">
                <Lock size={18} strokeWidth={1.25} className="text-[#FF5B22]" />
              </div>
              <div className="mt-auto pt-10">
                <span className="font-cormorant italic text-lg text-white/50">no. 02</span>
                <h3 className="font-cormorant text-3xl font-medium mt-1">{COVERS[1].t}</h3>
                <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  {COVERS[1].l.map((li, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-light text-white/80">
                      <Check size={13} strokeWidth={1.5} className="text-[#FF5B22] mt-1 shrink-0" /> {li}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 03 · Styling & Preparation — tall image card */}
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.16 }} className="col-span-12 md:col-span-4 relative rounded-3xl overflow-hidden border border-[#DBD4C6] group min-h-[460px]">
              <img src={COVERS[2].img} alt={localAlt('Boudoir hair, makeup and styling preparation at the vanity')} className="absolute inset-0 w-full h-full object-cover transition-transform [transition-duration:1400ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/90 via-[#161514]/25 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <span className="font-cormorant italic text-lg text-[#EEEAE1]/70">no. 03</span>
                <h3 className="font-cormorant text-3xl font-medium mt-1">{COVERS[2].t}</h3>
                <ul className="mt-5 space-y-2.5">
                  {COVERS[2].l.map((li, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-light text-white/85">
                      <span className="w-1 h-1 rounded-full bg-[#FF5B22] mt-2 shrink-0" /> {li}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* 04 · Confidential Delivery — wide cream card with image */}
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="col-span-12 rounded-3xl bg-[#EEEAE1] border border-[#DBD4C6] overflow-hidden">
              <div className="grid grid-cols-12 items-stretch">
                <div className="col-span-12 md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                  <span className="font-cormorant italic text-lg text-[#8A857D]">no. 04</span>
                  <h3 className="font-cormorant text-3xl md:text-4xl font-medium mt-1 text-[#161514]">{COVERS[3].t}</h3>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {COVERS[3].l.map((li, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#4C4A46] font-light">
                        <KeyRound size={13} strokeWidth={1.5} className="text-[#FF5B22] mt-1 shrink-0" /> {li}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-12 md:col-span-5 relative min-h-[240px] md:min-h-0">
                  <img src={COVERS[3].img} alt={localAlt('Luxury keepsake album and confidential print box delivery')} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Who Is This For (REDESIGNED: image-led, roman numerals) ---------- */}
      <section className="py-24 md:py-32 bg-[#EEEAE1]" data-testid="boudoir-audience-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="eyebrow mb-4 text-[#FF5B22]">Who Is This For?</div>
              <h2 className="font-cormorant text-5xl md:text-6xl leading-[1.05] text-[#161514] font-medium">
                A session for <span className="italic text-[#FF5B22] font-normal">every reason.</span>
              </h2>
            </div>
            <p className="text-[#8A857D] font-light max-w-xs text-sm leading-relaxed">Most of our clients have never been photographed like this before. That&apos;s exactly the point.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUDIENCE.map((a, i) => (
              <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className={`group ${i % 2 === 1 ? 'lg:mt-12' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] border border-[#DBD4C6]">
                  <img src={a.img} alt={localAlt(`${a.t} boudoir session`)} className="w-full h-full object-cover transition-transform [transition-duration:1600ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  <span className="absolute top-5 left-5 font-cormorant italic text-2xl text-white/90">{['I', 'II', 'III', 'IV'][i]}</span>
                </div>
                <h3 className="mt-5 font-cormorant text-2xl md:text-[1.7rem] text-[#161514] font-medium">{a.t}</h3>
                <p className="mt-1.5 text-sm text-[#8A857D] font-light leading-relaxed">{a.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why Choose Us (REDESIGNED: dark intimate, numbered trust points) ---------- */}
      <section className="py-24 md:py-32 bg-[#161514] text-[#EEEAE1] overflow-hidden" data-testid="boudoir-why-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="col-span-12 md:col-span-6">
              <div className="eyebrow mb-4 text-[#FF5B22]">Why Women Trust Us</div>
              <h2 className="font-cormorant text-5xl md:text-6xl leading-[1.05] font-medium">
                Trust, before <span className="italic text-[#FF5B22] font-normal">anything else.</span>
              </h2>
              <div className="mt-14 space-y-0">
                {WHY.map((w, i) => (
                  <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.06 }} className="group flex gap-7 py-7 border-t border-white/10 last:border-b">
                    <span className="font-cormorant text-3xl text-white/25 group-hover:text-[#FF5B22] transition-colors leading-none pt-0.5 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-cormorant text-2xl font-medium">{w.t}</h3>
                      <p className="mt-1.5 text-sm text-white/60 font-light leading-[1.9] max-w-md">{w.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} className="col-span-12 md:col-span-6">
              <div className="relative">
                <div className="absolute -inset-4 border border-white/10 rounded-[32px]" aria-hidden="true" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img src={IMG.moody} alt={localAlt('Candlelit intimate boudoir portrait in a dark private studio')} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/50 to-transparent" />
                </div>
                <div className="absolute -bottom-7 left-8 right-8 bg-[#EEEAE1] text-[#161514] rounded-2xl px-6 py-5 flex items-center gap-4 shadow-2xl">
                  <div className="w-11 h-11 rounded-full bg-[#161514] grid place-content-center shrink-0">
                    <ShieldCheck size={18} strokeWidth={1.5} className="text-[#FF5B22]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Your images are never published</div>
                    <div className="text-xs text-[#8A857D] font-light mt-0.5">without your written consent — it&apos;s in our contract.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Client Words (first-name-only testimonials) ---------- */}
      <section className="pt-32 pb-24 md:pt-36 md:pb-28 bg-[#EEEAE1]" data-testid="boudoir-testimonials-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow mb-4 text-[#FF5B22]">Client Words</div>
              <h2 className="font-cormorant text-5xl md:text-6xl leading-[1.05] text-[#161514] font-medium">
                In their own <span className="italic text-[#FF5B22] font-normal">words.</span>
              </h2>
            </div>
            <p className="text-[#8A857D] font-light max-w-xs text-sm leading-relaxed">First names only, shared with permission — because discretion doesn&apos;t end after the shoot.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.07 }} className="rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5]/60 p-8 md:p-10 flex flex-col" data-testid={`boudoir-testimonial-${t.name.toLowerCase()}`}>
                <span className="font-cormorant text-5xl text-[#FF5B22]/70 leading-none" aria-hidden="true">“</span>
                <blockquote className="mt-2 font-cormorant italic text-xl md:text-[1.45rem] leading-[1.55] text-[#161514] font-light">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 pt-5 border-t border-[#DBD4C6] flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#161514] text-[#EEEAE1] grid place-content-center font-cormorant italic text-lg shrink-0">{t.name[0]}</span>
                  <span>
                    <span className="block text-sm font-semibold text-[#161514]">{t.name}</span>
                    <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8A857D] mt-0.5">{t.tag}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Our Process (REDESIGNED: airy serif timeline) ---------- */}
      <section className="py-24 md:py-32 bg-[#EEEAE1] border-t border-[#DBD4C6]/60" data-testid="boudoir-process-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="text-center mb-20">
            <div className="eyebrow mb-4 text-[#FF5B22]">How It Unfolds</div>
            <h2 className="font-cormorant text-5xl md:text-6xl leading-[1.05] text-[#161514] font-medium">
              Four gentle <span className="italic text-[#FF5B22] font-normal">steps.</span>
            </h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-y-14 md:gap-x-8">
            <div className="hidden md:block absolute top-[7px] left-[12.5%] right-[12.5%] h-px bg-[#DBD4C6]" aria-hidden="true" />
            {PROCESS.map(([t, d], i) => (
              <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} className="relative md:text-center md:px-4">
                <div className="flex md:justify-center items-center gap-4 md:gap-0">
                  <span className="relative z-10 w-[15px] h-[15px] rounded-full bg-[#EEEAE1] border-2 border-[#FF5B22]" aria-hidden="true" />
                  <span className="md:hidden h-px flex-1 bg-[#DBD4C6]" aria-hidden="true" />
                </div>
                <div className="mt-6 font-cormorant italic text-lg text-[#8A857D]">step {['one', 'two', 'three', 'four'][i]}</div>
                <h3 className="mt-1 font-cormorant text-3xl text-[#161514] font-medium">{t}</h3>
                <p className="mt-3 text-sm text-[#8A857D] font-light leading-[1.9] md:max-w-[26ch] md:mx-auto">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pricing (UNCHANGED from template) ---------- */}
      <section className="py-20 md:py-28 bg-[#E6E1D5]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center mb-14">
            <div className="eyebrow mb-3">Packages & Pricing</div>
            <h2 className="display text-4xl md:text-6xl">Transparent <span className="text-[#FF5B22] italic font-medium">investment.</span></h2>
            <p className="mt-4 text-[#8A857D] max-w-xl mx-auto">All packages include studio, direction and in-house post-production. Custom scopes available on request.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`relative rounded-3xl border p-8 transition-all hover:-translate-y-1 ${p.popular ? 'border-[#FF5B22] bg-gradient-to-b from-[#EFE9DE] to-[#EEEAE1] shadow-xl md:-mt-4' : 'border-[#DBD4C6] bg-[#EEEAE1] hover:shadow-lg'}`}>
                {p.popular && <div className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase bg-[#FF5B22] text-white px-3 py-1.5 rounded-full">Most Popular</div>}
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF5B22]">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="display text-4xl md:text-5xl">{p.price}</span>
                  {p.original && <span className="text-sm text-[#8A857D] line-through">{p.original}</span>}
                </div>
                <ul className="mt-6 space-y-3 min-h-[200px]">
                  {p.f.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#F3E4DC] text-[#FF5B22] grid place-content-center shrink-0 mt-0.5"><Check size={11} /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-2.5">
                  <Link href={`/booking?service=${SLUG}&package=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}`} className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-sm transition-colors ${p.popular ? 'bg-[#FF5B22] text-white hover:bg-[#E24A12]' : 'bg-[#161514] text-white hover:bg-[#FF5B22]'}`}>Book Now <ArrowRight size={14} /></Link>
                  <a href={waLink({ service: 'Boudoir Photography', page: 'Boudoir Shoots', pkg: p.name, price: p.original ? `${p.price} (was ${p.original})` : p.price })} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold text-sm border border-[#161514]/20 text-[#161514] hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors"><MessageCircle size={14} /> Enquire on WhatsApp</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Portfolio (REDESIGNED: asymmetric editorial grid) ---------- */}
      <section className="py-24 md:py-32 bg-[#EEEAE1]" data-testid="boudoir-portfolio-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="eyebrow mb-4 text-[#FF5B22]">A Glimpse, With Consent</div>
              <h2 className="font-cormorant text-5xl md:text-6xl leading-[1.05] text-[#161514] font-medium">
                Quiet, elegant <span className="italic text-[#FF5B22] font-normal">frames.</span>
              </h2>
              <p className="mt-4 text-sm text-[#8A857D] font-light max-w-md">Every image here is shared with the written permission of the woman in it.</p>
            </div>
            <Link href="/gallery" data-testid="boudoir-gallery-link" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22]">View full gallery <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] gap-4">
            {portfolio.slice(0, 8).map((p, i) => {
              const src = typeof p === 'string' ? p : p.url
              const title = (typeof p === 'string' ? '' : p.title) || 'Boudoir · Private Session'
              const span = [
                'col-span-2 row-span-2',
                'col-span-1 row-span-1',
                'col-span-1 row-span-2',
                'col-span-1 row-span-1',
                'col-span-1 row-span-1 md:row-span-2',
                'col-span-1 row-span-1',
                'col-span-2 row-span-1',
                'col-span-1 row-span-1',
              ][i % 8]
              return (
                <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: (i % 4) * 0.06 }} className={`relative overflow-hidden rounded-2xl group border border-[#DBD4C6] ${span}`}>
                  <img src={src} alt={localAlt(`${title} boudoir portfolio frame`)} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform [transition-duration:1600ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-700">
                    <div className="font-cormorant italic text-white text-lg leading-tight">{title}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- FAQs (REDESIGNED: minimal fine-line accordion) ---------- */}
      <section className="py-24 md:py-32 bg-[#E6E1D5]" data-testid="boudoir-faq-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 md:gap-16">
            <div className="col-span-12 md:col-span-4">
              <div className="eyebrow mb-4 text-[#FF5B22]">Asked, Quietly</div>
              <h2 className="font-cormorant text-4xl md:text-5xl leading-[1.08] text-[#161514] font-medium">
                Everything you&apos;re <span className="italic text-[#FF5B22] font-normal">wondering.</span>
              </h2>
              <p className="mt-5 text-[#8A857D] font-light text-sm leading-[1.9]">Every enquiry is handled discreetly. Message us privately on WhatsApp — no obligation, no pressure.</p>
              <a href={waLink({ service: 'Boudoir Photography', page: 'Boudoir Shoots' })} target="_blank" rel="noreferrer" data-testid="boudoir-faq-whatsapp-link" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22]"><MessageCircle size={16} /> Chat privately on WhatsApp</a>
            </div>
            <div className="col-span-12 md:col-span-8 border-t border-[#DBD4C6]">
              {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA (UNCHANGED from template) ---------- */}
      <section className="py-20 md:py-28 bg-[#EEEAE1]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="relative rounded-[36px] overflow-hidden bg-[#161514] text-white p-10 md:p-16">
            <div className="absolute -top-32 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.4), transparent 60%)' }} />
            <div className="relative grid grid-cols-12 gap-8 items-center">
              <div className="col-span-12 md:col-span-8">
                <div className="eyebrow text-[#67E8F9] mb-4">Ready when you are</div>
                <h2 className="display text-4xl md:text-6xl">Let&apos;s create your <span className="text-[#FF5B22] italic font-medium">boudoir shoots.</span></h2>
                <p className="mt-4 text-white/70 max-w-xl">Tell us your dates and vision — we&apos;ll confirm within a few hours.</p>
              </div>
              <div className="col-span-12 md:col-span-4 flex md:justify-end">
                <Link href={`/booking?service=${SLUG}`} className="inline-flex items-center gap-2 bg-[#FF5B22] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#E24A12] transition-colors">Inquire Now <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Explore other services (kept, matches template) ---------- */}
      <section className="py-20 md:py-28 bg-[#E6E1D5]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow mb-3">Explore more</div>
              <h2 className="display text-3xl md:text-5xl">Other <span className="text-[#FF5B22] italic font-medium">disciplines.</span></h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22]">View all 19 <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.filter(s => s.slug !== SLUG).slice(0, 4).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} data-testid={`service-related-${s.slug}`} className="group relative aspect-[4/5] rounded-2xl overflow-hidden block">
                <Image src={s.img} alt={imageAlt(s.t, 'Mumbai and Goa service preview', 'premium editorial', 'Mumbai & Goa')} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/85 via-[#161514]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-sm font-bold leading-tight">{s.t}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#67E8F9]">View details <ArrowUpRight size={11} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Sticky Book CTA (UNCHANGED from template) ---------- */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] hidden md:flex">
            <div className="flex items-center gap-3 bg-[#161514] text-white rounded-full pl-5 pr-2 py-2 shadow-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF5B22] grid place-content-center"><Clock size={14} /></div>
                <div className="text-xs leading-tight">
                  <div className="text-white/60 text-[9px] uppercase tracking-widest">Interested in</div>
                  <div className="font-semibold">{service.t}?</div>
                </div>
              </div>
              <Link href={`/booking?service=${SLUG}`} data-testid="boudoir-sticky-book-link" className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-[#E24A12] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-colors">Book Now <ArrowRight size={12} /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
