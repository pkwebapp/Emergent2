'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Star, MessageCircle, ChevronDown, Mail, MapPin, Play } from 'lucide-react'
import { IMG, CONTACT } from '@/components/site/Chrome'
import { SERVICES } from '@/lib/services'
import { useMediaSlot } from '@/hooks/useMediaSlot'

/* Resolve a service panel image from that service's admin banner slot
   (`<slug>-banner`), falling back to the hardcoded default image. */
function PanelImage({ slug, fallback, alt, sizes, className }) {
  const { items } = useMediaSlot(`${slug}-banner`)
  const uploaded = items.find((i) => i.resource_type === 'image')?.secure_url
  const src = uploaded || fallback
  return <Image src={src} alt={alt} fill sizes={sizes} className={className} unoptimized={!!uploaded} />
}

/* ================================================================
   Re-export SERVICES so existing imports from '@/app/page' keep working.
   Actual data lives in /app/frontend/lib/services.js (server-safe).
================================================================ */
export { SERVICES }

/* ================================================================
   Small helper: animated counter (respects prefers-reduced-motion)
================================================================ */
function Counter({ to, suffix = '', duration = 1.8, testid }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (started.current) return
      started.current = true
      if (reduce) { setVal(to); return }
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min(1, Math.max(0, (now - start) / (duration * 1000)))
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(to * eased))
        if (p < 1) requestAnimationFrame(tick)
        else setVal(to)
      }
      requestAnimationFrame(tick)
    }

    const inViewNow = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.top < vh && r.bottom > 0
    }

    // Already visible on mount (e.g. short mobile pages) — start immediately.
    if (inViewNow()) { run(); return }

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { run(); io.disconnect() }
    }, { threshold: 0 })
    io.observe(el)

    // Safety net: some mobile browsers can miss the IO callback — poll briefly.
    const fb = setInterval(() => { if (inViewNow()) { run() } if (started.current) clearInterval(fb) }, 400)

    return () => { io.disconnect(); clearInterval(fb) }
  }, [to, duration])

  return <span ref={ref} data-testid={testid}>{val.toLocaleString('en-IN')}{suffix}</span>
}

/* ================================================================
   1. HERO — cinematic photo-montage crossfade with Ken Burns
================================================================ */
const HERO_PHOTOS_DEFAULT = [
  { src: IMG.p1, alt: 'PK Photography — wedding photography Mumbai' },
  { src: IMG.p7, alt: 'PK Photography — portrait shoot Andheri' },
  { src: IMG.v1, alt: 'PK Photography — cinematic wedding videography' },
  { src: IMG.p3, alt: 'PK Photography — editorial portrait Mumbai' },
  { src: IMG.v3, alt: 'PK Photography — destination wedding Goa' },
  { src: IMG.p8, alt: 'PK Photography — luxury portrait session' },
]

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [i, setI] = useState(0)
  const [heroPhotos, setHeroPhotos] = useState(HERO_PHOTOS_DEFAULT)

  // Load admin-uploaded hero slides from backend (falls back to defaults on empty/error)
  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    fetch(`${backend}/api/media?slot=hero-slides`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = (data?.items || [])
          .filter((it) => it.secure_url)
          .map((it) => ({
            src: it.secure_url,
            alt: it.alt || 'PK Photography',
            type: it.resource_type === 'video' ? 'video' : 'image',
          }))
        if (items.length) setHeroPhotos(items)
      })
      .catch(() => { /* keep defaults */ })
  }, [])

  // Slow crossfade every 5.5s
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % heroPhotos.length), 5500)
    return () => clearInterval(t)
  }, [heroPhotos.length])

  // Subtle mouse parallax on hero content
  const mx = useMotionValue(0), my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 40, damping: 20 })
  const smy = useSpring(my, { stiffness: 40, damping: 20 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10)
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative h-[100svh] overflow-hidden bg-[#0e0d0c]"
      data-testid="hero-section"
    >
      {/* Photo montage — Ken Burns crossfade (supports videos) */}
      <motion.div style={{ y }} className="absolute inset-0">
        {heroPhotos.map((p, k) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{
              opacity: k === i ? 1 : 0,
              scale: k === i ? 1.14 : 1.06,
            }}
            transition={{
              opacity: { duration: 1.8, ease: [0.7, 0, 0.2, 1] },
              scale: { duration: 8, ease: 'linear' },
            }}
            className="absolute inset-0 will-change-[opacity,transform]"
          >
            {p.type === 'video' ? (
              <video
                src={p.src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={p.src}
                alt={p.alt}
                fill
                priority={k === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </motion.div>
        ))}
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0d0c]/45 via-[#0e0d0c]/25 to-[#0e0d0c]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0d0c]/70 via-transparent to-transparent" />
        {/* Grain */}
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.6%22/></svg>")' }} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, x: smx, y: smy }}
        className="relative z-10 h-[100svh] flex flex-col justify-end px-6 md:px-14 pt-32 pb-10 md:pb-14 container mx-auto max-w-[1400px]"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1, ease: [0.7, 0, 0.2, 1] }}
          className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/70 mb-5"
          data-testid="hero-eyebrow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
          Mumbai · Goa · Pan India
        </motion.div>

        {/* Headline */}
        <div className="max-w-[25ch] md:max-w-[24ch]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
            data-font="display"
            className="text-white text-[2rem] sm:text-[2.6rem] md:text-[3.15rem] lg:text-[3.65rem] leading-[1.02] font-light tracking-[-0.02em]"
            data-testid="hero-headline"
          >
            Professional photography, videography &amp; drone services <span className="italic text-[#FF5B22]">in Mumbai &amp; Goa.</span>
          </motion.h1>
        </div>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-5 max-w-[58ch] text-white/75 text-[13px] md:text-[13.5px] font-light leading-[1.65]"
          data-testid="hero-subheadline"
        >
          PK Photography specialises in wedding, pre-wedding, corporate, product, fashion, and real estate photography and videography, along with professional drone photography and aerial videography. Based in Mumbai and Goa, we create high-quality, natural, and cinematic visuals for clients across India.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/booking"
            data-testid="hero-booking-cta"
            className="group relative overflow-hidden inline-flex items-center gap-2.5 bg-[#FF5B22] text-white pl-5 pr-1.5 py-1.5 rounded-full text-[13px] font-semibold hover:pr-5 transition-[padding] duration-500"
          >
            <span className="tracking-wide">Book Your Shoot</span>
            <span className="w-8 h-8 rounded-full bg-white/20 grid place-content-center group-hover:bg-white group-hover:text-[#FF5B22] transition-colors">
              <ArrowRight size={12} />
            </span>
          </Link>
          <Link
            href="/gallery"
            data-testid="hero-portfolio-cta"
            className="group inline-flex items-center gap-2.5 text-[13px] font-semibold text-white/95 border border-white/25 pl-5 pr-1.5 py-1.5 rounded-full hover:border-white transition-colors"
          >
            <span className="tracking-wide">View Portfolio</span>
            <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur grid place-content-center border border-white/25 group-hover:bg-white group-hover:text-[#161514] group-hover:border-white transition-colors">
              <ArrowRight size={12} />
            </span>
          </Link>
        </motion.div>

        {/* Meta row: montage index + scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15 }}
          className="mt-9 flex items-center justify-between text-white/70"
        >
          <div className="flex items-center gap-3 text-[12px]">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, k) => <Star key={k} size={10} className="fill-[#FF5B22] text-[#FF5B22]" />)}
            </div>
            <span className="font-medium">4.9</span>
            <span className="text-white/50 hidden sm:inline">· 380+ Google reviews</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {heroPhotos.map((_, k) => (
                <button
                  key={k}
                  aria-label={`Hero photo ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-px transition-all duration-500 ${k === i ? 'w-7 bg-[#FF5B22]' : 'w-4 bg-white/30 hover:bg-white/60'}`}
                />
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase text-white/50 ml-3">
              Scroll
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                <ChevronDown size={10} />
              </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ================================================================
   2. TRUST — animated counters
================================================================ */
function Trust() {
  const stats = [
    { n: 500, s: '+', label: 'Couples, businesses & brands across Mumbai, Goa & beyond', k: 'weddings' },
    { n: 700, s: '+', label: 'Corporate Clients', k: 'corp' },
    { n: 1000, s: '+', label: 'Portfolios Shot', k: 'port' },
    { n: 10, s: '+', label: 'Years of Craft', k: 'years' },
  ]
  return (
    <section className="relative py-24 md:py-32 bg-[#EEEAE1]" data-testid="trust-section">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-14 md:gap-x-10">
          {stats.map((st, k) => (
            <motion.div
              key={st.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: k * 0.06, ease: [0.7, 0, 0.2, 1] }}
              className="flex flex-col"
              data-testid={`trust-stat-${st.k}`}
            >
              <div
                data-font="display"
                className="text-[#161514] text-[3rem] md:text-[4.5rem] leading-none font-light tracking-[-0.02em]"
              >
                <Counter to={st.n} suffix={st.s} testid={`counter-${st.k}`} />
              </div>
              <div className="mt-4 text-[11px] tracking-[0.28em] uppercase text-[#8A857D] font-medium">
                {st.label}
              </div>
            </motion.div>
          ))}
          {/* 5th cell: Locations */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="col-span-2 md:col-span-1 flex flex-col"
            data-testid="trust-stat-locations"
          >
            <div
              data-font="display"
              className="text-[#161514] text-[2rem] md:text-[2.6rem] leading-[1.05] italic font-light tracking-tight"
            >
              Mumbai · Goa
              <br />
              <span className="text-[#FF5B22]">Pan India.</span>
            </div>
            <div className="mt-4 text-[11px] tracking-[0.28em] uppercase text-[#8A857D] font-medium">
              Where we shoot
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   3. ABOUT — editorial layout with large portrait
================================================================ */
function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const [aboutSrc, setAboutSrc] = useState(IMG.p1)

  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    fetch(`${backend}/api/media?slot=home-about-portrait`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const first = (data?.items || [])[0]
        if (first?.secure_url) setAboutSrc(first.secure_url)
      })
      .catch(() => {})
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-40 bg-[#EEEAE1] overflow-hidden" data-testid="about-section">
      {/* Backdrop editorial word */}
      <div aria-hidden className="absolute left-0 right-0 top-16 md:top-24 pointer-events-none flex justify-center">
        <div
          data-font="display"
          className="text-[18vw] md:text-[15vw] leading-none italic text-[#161514]/[0.045] tracking-tighter select-none whitespace-nowrap"
        >
          the studio
        </div>
      </div>

      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-end">
          {/* Portrait */}
          <div className="col-span-1 md:col-span-5 order-2 md:order-1">
            <motion.div style={{ y: imgY }} className="relative aspect-[4/5] overflow-hidden rounded-none md:rounded-sm">
              <Image
                src={aboutSrc}
                alt="Prabhakar Kumar — PK Photography studio, Andheri West Mumbai"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/40 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="col-span-1 md:col-span-7 order-1 md:order-2 md:pl-10">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#8A857D] flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
              About the studio
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
              data-font="display"
              className="text-[#161514] text-[2.4rem] sm:text-[3.2rem] md:text-[4.4rem] lg:text-[5.2rem] leading-[0.98] tracking-[-0.02em] font-light"
            >
              Photography that <span className="italic text-[#FF5B22]">feels natural.</span>
            </motion.h2>
            <p className="mt-8 max-w-[58ch] text-[#4C4A46] text-[15px] md:text-base leading-[1.75] font-light">
              At PK Photography, we believe great photographs shouldn&rsquo;t look staged. For over 10 years, we&rsquo;ve worked with couples, families, brands, creators and businesses across Mumbai and Goa, creating photographs and films that feel authentic, timeless and full of emotion.
            </p>
            <p className="mt-5 max-w-[58ch] text-[#4C4A46] text-[15px] md:text-base leading-[1.75] font-light">
              Whether we&rsquo;re documenting a wedding, photographing a new product launch or creating content for a brand, our focus stays the same&mdash;understanding your story before picking up the camera. Because every client is different, every shoot is planned differently.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/services"
                data-testid="about-learn-more"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-[#161514] border-b border-[#161514] pb-1.5 hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors"
              >
                Learn more
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] tracking-[0.28em] uppercase text-[#8A857D] hover:text-[#FF5B22] transition-colors"
              >
                or chat with us →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   4. FEATURED SERVICES — expanding scroll panels (Active Theory style)
================================================================ */
function FeaturedServices() {
  const featured = SERVICES.filter(s => s.featured).concat(SERVICES.filter(s => !s.featured).slice(0, 2)) // 6 panels
  const [active, setActive] = useState(0)
  const serviceCopy = {
    weddings: 'Natural wedding photography and cinematic films that capture every emotion&mdash;from intimate ceremonies to grand celebrations across Mumbai, Goa and destination weddings.',
    events: 'Professional event photography and videography for conferences, award ceremonies, networking events, launches and social gatherings across Mumbai and Goa.',
    'portraits-headshots': 'Clean portraits and headshots for founders, artists, professionals and teams, guided with natural posing and polished editing.',
    'editorial-portfolio': 'Editorial portfolio photography for models, creators, performers and personal brands who need images that feel confident, current and professional.',
    'live-streaming': 'Reliable live streaming and video coverage for weddings, corporate events and hybrid gatherings, with clear audio and multi-camera production.',
    'family-kids': 'Warm family, maternity, newborn and kids photography that preserves real expressions, small details and meaningful milestones.',
  }

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#161514] text-white overflow-hidden" data-testid="services-section">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-white/50 flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
              What we shoot
            </div>
            <h2
              data-font="display"
              className="text-white text-[2.4rem] sm:text-[3.4rem] md:text-[5rem] leading-[0.98] font-light tracking-[-0.02em] max-w-[16ch]"
            >
              Professional photography services
              <br />
              <span className="italic text-[#FF5B22]">in Mumbai &amp; Goa.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-sm text-[15px] leading-relaxed font-light">
            From wedding photography and corporate events to product shoots, portraits, fashion campaigns and videography services, every shoot is planned around your goal, location and timeline.
          </p>
        </div>
      </div>

      {/* Desktop: horizontal expanding panels */}
      <div className="hidden md:block px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="flex gap-2 h-[560px]" data-testid="services-panels">
          {featured.map((s, k) => {
            const isActive = k === active
            return (
              <motion.div
                key={s.slug}
                onMouseEnter={() => setActive(k)}
                animate={{ flex: isActive ? 4 : 1 }}
                transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
                className="relative overflow-hidden rounded-sm cursor-pointer group"
                data-testid={`service-panel-${s.slug}`}
              >
                <Link href={`/services/${s.slug}`} className="block absolute inset-0">
                  <PanelImage
                    slug={s.slug}
                    fallback={s.img}
                    alt={s.t}
                    sizes="(max-width: 1200px) 20vw, 400px"
                    className="object-cover transition-transform [transition-duration:1400ms] ease-out group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-gradient-to-t from-[#0e0d0c]/90 via-[#0e0d0c]/20 to-transparent' : 'bg-[#0e0d0c]/55'}`} />
                  {/* Index */}
                  <div className="absolute top-6 left-6 text-[10px] tracking-[0.35em] uppercase text-white/70">
                    {String(k + 1).padStart(2, '0')}
                  </div>
                  {/* Title */}
                  <div className="absolute inset-x-6 bottom-6">
                    <motion.div
                      animate={{ y: isActive ? 0 : 0 }}
                      className={`transition-all duration-700 ${isActive ? '' : 'writing-vertical'}`}
                      style={isActive ? {} : { writingMode: 'vertical-rl', transform: 'rotate(180deg)', transformOrigin: 'center' }}
                    >
                      <div
                        data-font="display"
                        className={`text-white font-light tracking-tight leading-[1] ${isActive ? 'text-[2.2rem] lg:text-[2.6rem]' : 'text-[1.1rem] lg:text-[1.25rem]'}`}
                      >
                        {s.t}
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mt-4 flex items-end justify-between gap-6"
                        >
                          <p className="text-white/80 text-[13px] leading-relaxed max-w-md font-light">
                            {serviceCopy[s.slug] || s.d}
                          </p>
                          <span className="shrink-0 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[#FF5B22]">
                            View <ArrowUpRight size={14} />
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Mobile: stacked, reveals on scroll */}
      <div className="md:hidden px-6 space-y-3 max-w-[1400px] mx-auto">
        {featured.map((s, k) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: k * 0.05 }}
            className="relative aspect-[4/3] overflow-hidden rounded-sm"
            data-testid={`service-panel-mobile-${s.slug}`}
          >
            <Link href={`/services/${s.slug}`} className="block absolute inset-0">
              <PanelImage slug={s.slug} fallback={s.img} alt={s.t} sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0c]/85 via-[#0e0d0c]/10 to-transparent" />
              <div className="absolute top-4 left-5 text-[10px] tracking-[0.35em] uppercase text-white/70">
                {String(k + 1).padStart(2, '0')}
              </div>
              <div className="absolute inset-x-5 bottom-5">
                <div data-font="display" className="text-white text-2xl font-light">
                  {s.t}
                </div>
                <div className="mt-2 text-white/70 text-xs leading-relaxed">{serviceCopy[s.slug] || s.d}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          href="/services"
          data-testid="services-explore-all"
          className="group inline-flex items-center gap-3 text-sm font-semibold text-white border border-white/25 pl-6 pr-2 py-2 rounded-full hover:border-white transition-colors"
        >
          <span className="tracking-wide">Explore all 19 services</span>
          <span className="w-10 h-10 rounded-full bg-white/10 grid place-content-center border border-white/20 group-hover:bg-[#FF5B22] group-hover:border-[#FF5B22] transition-colors">
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>
    </section>
  )
}

/* ================================================================
   5. PORTFOLIO — horizontal cinematic gallery
================================================================ */
const PORTFOLIO = [
  { img: IMG.v1, name: 'Aanya × Rohan',  loc: 'Alibaug',        cat: 'Wedding' },
  { img: IMG.p1, name: 'Studio Sessions', loc: 'Andheri West',   cat: 'Portrait' },
  { img: IMG.v3, name: 'HDFC Life Gala',  loc: 'BKC, Mumbai',    cat: 'Corporate' },
  { img: IMG.p3, name: 'Editorial No. 07', loc: 'Bandra',        cat: 'Editorial' },
  { img: IMG.v5, name: 'Beach Wedding',    loc: 'Goa',            cat: 'Destination' },
  { img: IMG.p7, name: 'Anushka',          loc: 'Andheri',        cat: 'Portfolio' },
  { img: IMG.v7, name: 'PK × Nykaa',       loc: 'Mumbai',         cat: 'Brand' },
  { img: IMG.p8, name: 'Golden Hour',      loc: 'Versova',        cat: 'Portrait' },
]

function Portfolio() {
  const trackRef = useRef(null)
  const [portfolio, setPortfolio] = useState(PORTFOLIO)

  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    fetch(`${backend}/api/media?slot=home-portfolio-featured`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = (data?.items || []).filter((i) => i.secure_url).map((i) => ({
          img: i.secure_url,
          name: i.alt || 'Featured',
          loc: '',
          cat: 'PK Photography',
          _resource_type: i.resource_type,
        }))
        if (items.length) setPortfolio(items)
      })
      .catch(() => { /* keep defaults */ })
  }, [])

  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-[#EEEAE1] overflow-hidden" data-testid="portfolio-section">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-1 md:col-span-8">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#8A857D] flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
              Featured work
            </div>
            <h2
              data-font="display"
              className="text-[#161514] text-[2.4rem] sm:text-[3.4rem] md:text-[5rem] leading-[0.98] font-light tracking-[-0.02em]"
            >
              Frames we keep coming
              <br />
              <span className="italic text-[#FF5B22]">back to.</span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-4 md:pb-2 flex md:justify-end items-center gap-3">
            <button
              onClick={() => trackRef.current?.scrollBy({ left: -520, behavior: 'smooth' })}
              aria-label="Scroll portfolio left"
              data-testid="portfolio-prev"
              className="w-11 h-11 rounded-full border border-[#DBD4C6] grid place-content-center text-[#161514] hover:bg-[#161514] hover:text-white hover:border-[#161514] transition-colors"
            >
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={() => trackRef.current?.scrollBy({ left: 520, behavior: 'smooth' })}
              aria-label="Scroll portfolio right"
              data-testid="portfolio-next"
              className="w-11 h-11 rounded-full border border-[#DBD4C6] grid place-content-center text-[#161514] hover:bg-[#161514] hover:text-white hover:border-[#161514] transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 md:gap-6 overflow-x-auto pb-6 pl-6 md:pl-10 pr-6 md:pr-10 snap-x snap-mandatory scrollbar-thin"
        data-testid="portfolio-track"
        style={{ scrollBehavior: 'smooth' }}
      >
        {portfolio.map((p, k) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: (k % 4) * 0.06 }}
            className={`relative shrink-0 snap-start rounded-sm overflow-hidden group ${k % 3 === 0 ? 'w-[70vw] md:w-[520px] h-[500px] md:h-[620px]' : k % 3 === 1 ? 'w-[85vw] md:w-[660px] h-[500px] md:h-[620px]' : 'w-[65vw] md:w-[440px] h-[500px] md:h-[620px]'}`}
            data-testid={`portfolio-card-${k}`}
          >
            <Link href="/gallery" className="block absolute inset-0">
              <Image
                src={p.img}
                alt={`${p.name} — ${p.cat} in ${p.loc}`}
                fill
                sizes="(max-width: 768px) 80vw, 640px"
                className="object-cover transition-transform [transition-duration:1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0c]/80 via-transparent to-transparent" />
              {/* Meta hover reveal */}
              <div className="absolute inset-x-6 bottom-6 text-white">
                <div className="text-[10px] tracking-[0.35em] uppercase text-white/70 mb-3">
                  {p.cat} · {p.loc}
                </div>
                <div data-font="display" className="text-3xl md:text-4xl font-light leading-tight">
                  {p.name}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 mt-12">
        <Link href="/gallery" data-testid="portfolio-view-all" className="inline-flex items-center gap-3 text-sm font-semibold text-[#161514] border-b border-[#161514] pb-1.5 hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
          Open the full gallery <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}

/* ================================================================
   6. PROCESS — interactive scroll timeline
================================================================ */
function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const steps = [
    { t: 'Tell Us Your Story', d: 'Every project starts with a conversation. We learn about your event, style, location, timeline and expectations so we can plan the shoot around what matters most to you.', k: 'story' },
    { t: 'Plan Every Detail', d: 'From creating the shoot schedule to suggesting locations, lighting and timelines, we prepare everything in advance. Good planning means a smoother shoot and better results.', k: 'planning' },
    { t: 'Capture Naturally', d: 'On the day, we focus on real moments instead of forced poses. Whether it is a wedding ceremony, product launch or corporate event, we document every important detail with creativity and precision.', k: 'capture' },
    { t: 'Edit & Deliver', d: 'Every image and video is professionally edited for natural colours, sharp details and a timeless look. Your final gallery is delivered on time, ready to share, print or use for your business.', k: 'delivery' },
  ]

  return (
    <section ref={ref} className="relative py-24 md:py-40 bg-[#E6E1D5]" data-testid="process-section">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="col-span-1 md:col-span-5">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#8A857D] flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
              How we work
            </div>
            <h2
              data-font="display"
              className="text-[#161514] text-[2.4rem] sm:text-[3.4rem] md:text-[4.4rem] leading-[0.98] font-light tracking-[-0.02em]"
            >
              A simple process.
              <br />
              <span className="italic text-[#FF5B22]">No stress.</span>
            </h2>
          </div>
          <p className="col-span-1 md:col-span-6 md:col-start-7 md:pt-4 text-[#4C4A46] max-w-lg text-[15px] leading-relaxed font-light">
            Whether you&rsquo;re planning a wedding, a brand campaign or a corporate event, we keep the process straightforward. Clear communication, careful planning and attention to detail ensure you can enjoy the experience while we focus on creating photographs and films you&rsquo;ll love.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-y-14 gap-x-8">
          {/* Progress line (desktop, horizontal) */}
          <div aria-hidden className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#DBD4C6]" />
          <motion.div
            aria-hidden
            style={{ scaleX: scrollYProgress, transformOrigin: '0 50%' }}
            className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-[#FF5B22]"
          />

          {/* Progress line (mobile, vertical — runs down through the numbered nodes) */}
          <div aria-hidden className="md:hidden absolute left-[18px] top-2 bottom-2 w-px bg-[#DBD4C6]" />
          <motion.div
            aria-hidden
            style={{ scaleY: scrollYProgress, transformOrigin: '50% 0' }}
            className="md:hidden absolute left-[18px] top-2 bottom-2 w-px bg-[#FF5B22]"
          />

          {steps.map((step, k) => (
            <ProcessStep key={step.k} step={step} index={k} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, index, progress }) {
  // Each step "activates" at (index+1)/(steps.length) of progress
  const active = useTransform(progress, v => v >= (index) / 4 ? 1 : 0)
  const [isActive, setIsActive] = useState(false)
  useEffect(() => active.on('change', v => setIsActive(v >= 1)), [active])
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="relative pl-14 md:pl-0"
      data-testid={`process-step-${step.k}`}
    >
      {/* Node */}
      <div className={`absolute left-0 top-1.5 md:relative md:top-0 w-9 h-9 rounded-full grid place-content-center border transition-colors duration-500 ${isActive ? 'bg-[#FF5B22] border-[#FF5B22] text-white' : 'bg-[#EEEAE1] border-[#DBD4C6] text-[#8A857D]'}`}>
        <span className="text-[11px] font-semibold tabular">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="md:mt-8">
        <div data-font="display" className="text-[#161514] text-2xl md:text-3xl font-light leading-tight">
          {step.t}
        </div>
        <p className="mt-3 text-[#4C4A46] text-[14px] leading-relaxed font-light max-w-xs">
          {step.d}
        </p>
      </div>
    </motion.div>
  )
}

/* ================================================================
   7. WHY CHOOSE US — large editorial statements + visuals
================================================================ */
const WHY = [
  {
    t: 'Authentic Photography',
    stat: 'Natural moments · Real expressions · Honest colour',
    s: 'We capture genuine emotions and natural expressions instead of overly posed photographs. The result is professional photography that still feels personal, warm and true to the moment.',
    points: ['Candid wedding photography in Mumbai and Goa', 'Natural direction for portraits, families and events', 'Clean editing that keeps skin tones and colours believable'],
    img: IMG.v2,
  },
  {
    t: 'Experienced Team',
    stat: 'Weddings · Corporate events · Fashion · Products',
    s: 'With years of experience across weddings, corporate photography, fashion, products and commercial photography, we know how to adapt to every shoot without losing the creative standard.',
    points: ['Wedding photographer in Mumbai and Goa', 'Corporate photography and event coverage', 'Commercial photography for brands, products and hospitality'],
    img: IMG.p4,
  },
  {
    t: 'Clear Communication',
    stat: 'Briefs · Timelines · Transparent expectations',
    s: 'From your first enquiry to final delivery, you always know what is happening and what to expect. We confirm scope, timings, locations and deliverables before the shoot begins.',
    points: ['Clear planning for weddings, events and campaigns', 'One point of contact from enquiry to delivery', 'Simple updates before, during and after the shoot'],
    img: IMG.p6,
  },
  {
    t: 'On-Time Delivery',
    stat: 'Edited photographs · Films · Business-ready files',
    s: 'We value your deadlines. Whether it is wedding memories or marketing content for your business, we deliver professionally edited photographs and films on schedule.',
    points: ['Delivery timelines discussed before booking', 'Edited galleries ready to share, print or publish', 'Reliable handover for campaigns, launches and corporate work'],
    img: IMG.v6,
  },
  {
    t: 'High-End Equipment',
    stat: 'Professional cameras · Lighting · Drone technology',
    s: 'We use professional cameras, lenses, lighting and drone technology to ensure every image meets commercial-quality standards for print, digital, social media and brand use.',
    points: ['Professional photography and videography services', 'Lighting setups for portraits, products and events', 'Drone coverage available for weddings, venues and real estate'],
    img: IMG.v4,
  },
  {
    t: 'Trusted Across Mumbai & Goa',
    stat: 'Destination weddings · Brands · Hotels · Events',
    s: 'From destination weddings and family celebrations to brands, hotels, restaurants and corporate events, clients choose us because they know they will receive quality work with a personal approach.',
    points: ['Photographer in Mumbai and photographer in Goa', 'Destination wedding photographer for Goa celebrations', 'Trusted by families, businesses, hospitality teams and brands'],
    img: IMG.p2,
  },
]

function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-40 bg-[#EEEAE1]" data-testid="why-section">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-28 items-end">
          <div className="col-span-1 md:col-span-8">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#8A857D] flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
              Why PK Photography
            </div>
            <h2
              data-font="display"
              className="text-[#161514] text-[2.4rem] sm:text-[3.4rem] md:text-[5rem] leading-[0.98] font-light tracking-[-0.02em] max-w-[18ch]"
            >
              Why clients choose
              <span className="italic text-[#FF5B22]"> PK Photography.</span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-4 md:pl-8">
            <p className="text-[#4C4A46] text-[15px] leading-[1.75] font-light">
              Photography isn&rsquo;t just about beautiful images. It&rsquo;s about working with a team that&rsquo;s reliable, understands your vision and delivers consistently. That&rsquo;s why clients across Mumbai and Goa trust PK Photography for their most important moments and projects.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <div>
                <div data-font="display" className="text-3xl leading-none text-[#161514]">98%</div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#8A857D] mt-1">Repeat / referral</div>
              </div>
              <div className="h-8 w-px bg-[#DBD4C6]" />
              <div>
                <div data-font="display" className="text-3xl leading-none text-[#161514]">4.9<span className="text-[#FF5B22]">★</span></div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#8A857D] mt-1">380+ Google reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-24 md:space-y-40">
          {WHY.map((w, k) => (
            <WhyRow key={w.t} item={w} index={k} total={WHY.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyRow({ item, index, total }) {
  const flip = index % 2 === 1
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  return (
    <div ref={ref} className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-center ${flip ? 'md:[direction:rtl]' : ''}`} data-testid={`why-row-${index}`}>
      {/* Visual */}
      <div className="col-span-1 md:col-span-6 md:[direction:ltr]">
        <motion.div style={{ y }} className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-sm">
          <Image src={item.img} alt={item.t} fill sizes="(max-width: 768px) 100vw, 640px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0c]/25 via-transparent to-transparent" />
          {/* Index label */}
          <div className="absolute top-6 left-6 text-white/85 text-[10px] tracking-[0.32em] uppercase">
            0{index + 1} / 0{total}
          </div>
        </motion.div>
      </div>
      {/* Statement */}
      <div className="col-span-1 md:col-span-6 md:[direction:ltr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <div className="text-[11px] tracking-[0.28em] uppercase text-[#FF5B22] mb-4 font-medium">{item.stat}</div>
          <h3
            data-font="display"
            className="text-[#161514] text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] leading-[1.02] font-light tracking-[-0.02em]"
          >
            {item.t}
            <span className="text-[#FF5B22]">.</span>
          </h3>
          <p className="mt-5 max-w-md text-[#4C4A46] text-[14.5px] leading-[1.75] font-light">
            {item.s}
          </p>
          <ul className="mt-6 space-y-2.5 max-w-md">
            {item.points.map((p, k) => (
              <li key={k} className="flex items-start gap-3 text-[13.5px] text-[#4C4A46] font-light">
                <span className="mt-2 w-4 h-px bg-[#FF5B22] shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

/* ================================================================
   8. CLIENTS — logo marquee (existing style, refined)
================================================================ */
function Clients() {
  const logos = [1,2,3,4,5,6,8,9].map(n => `https://pkphotography.in/clients/c${n}.webp`)
  return (
    <section id="client" className="py-16 md:py-24 bg-[#EEEAE1] border-t border-[#DBD4C6]/50" data-testid="clients-section">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 mb-10">
        <div className="text-[11px] tracking-[0.32em] uppercase text-[#8A857D] flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
          Brands That Trust PK Photography
          <span className="ml-3 hidden md:inline text-[#8A857D]/60">— KFC · AMD · Amazon · Godrej · Nykaa · OYO · Adani · and more</span>
        </div>
        <p className="mt-5 max-w-3xl text-[#4C4A46] text-[15px] leading-relaxed font-light">
          Over the years, we&rsquo;ve partnered with startups, established businesses, hospitality brands, celebrities and creative professionals to create visual content that drives results. Whether it&rsquo;s a campaign shoot, product launch or corporate event, we focus on delivering images that reflect your brand professionally.
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex items-center gap-14 md:gap-24 animate-marquee-slow whitespace-nowrap">
          {[...logos, ...logos].map((src, i) => (
            <div key={i} className="relative shrink-0 w-[110px] h-[54px] opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <Image src={src} alt="Client" fill sizes="110px" className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   9. TESTIMONIALS — rotator with Google reviews
================================================================ */
function Testimonials() {
  const items = [
    { n: 'Siddharth Tiwari',   meta: 'PORTFOLIO SHOOT · MUMBAI',  q: 'I had a wonderful experience with Prabhakar Kumar and the PK team. Despite it being a Sunday and on very short notice, he arranged everything quickly and handled the entire process smoothly. Absolutely recommended for anyone in Mumbai.' },
    { n: 'Jessica Mahood',     meta: 'PORTRAIT SESSION · ANDHERI', q: 'The best experience — super easy booking, a really enjoyable vibe on set, and the finished photographs are perfect. I would recommend PK to anyone building their portfolio.' },
    { n: 'Akanksha Madhwani',  meta: 'PORTFOLIO SHOOT · MUMBAI',  q: 'A professional portfolio shoot with PK Photography. The team was cooperative and supportive throughout — Prabhakar was calm and patiently tried every possible posture until we had the right ones.' },
    { n: 'Nirmesh Raghav',     meta: 'CORPORATE EVENT · BKC',      q: 'We hired PK Photography for our Game Changer program in Mumbai. The team was incredibly skilled, professional and attentive from the first briefing to the last delivery.' },
  ]
  const [i, setI] = useState(0)
  const paused = useRef(false)
  useEffect(() => {
    const t = setInterval(() => { if (!paused.current) setI(v => (v + 1) % items.length) }, 8000)
    return () => clearInterval(t)
  }, [items.length])

  return (
    <section
      className="relative py-20 md:py-32 bg-[#E6E1D5] overflow-hidden max-w-full"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      data-testid="testimonials-section"
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.10), transparent 60%)', filter: 'blur(60px)' }} />
      <div aria-hidden className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.08), transparent 60%)', filter: 'blur(60px)' }} />

      <div className="container mx-auto max-w-[1400px] px-6 md:px-14 relative min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start min-w-0">
          <div className="col-span-1 md:col-span-5 min-w-0">
            <div className="text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.32em] uppercase text-[#8A857D] flex items-center gap-3 mb-6 break-words" data-testid="testimonials-eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
              Kind words · Real Google reviews
            </div>
            <h2
              data-font="display"
              className="text-[#161514] text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] font-light break-words"
            >
              From the clients
              <span className="block mt-1">we&rsquo;ve <span className="italic text-[#FF5B22]">shot</span><span className="text-[#FF5B22]">.</span></span>
            </h2>

            <div className="mt-10 flex flex-col gap-6" data-testid="testimonials-rating-block">
              <div className="flex items-center gap-4 min-w-0 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, k) => <Star key={k} size={22} className="fill-[#FF5B22] text-[#FF5B22]" strokeWidth={0} />)}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span data-font="display" className="text-3xl leading-none text-[#161514]">4.9</span>
                    <span className="text-xs text-[#8A857D]">/ 5</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.22em] uppercase text-[#8A857D] mt-1 break-words">Based on 380+ Google reviews</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 max-w-full">
                <a href="https://g.page/r/CVhvUcwRhP2GEAE/review" target="_blank" rel="noreferrer" data-testid="testimonials-write-review" className="inline-flex items-center gap-2 bg-[#161514] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors">
                  Write a review on Google
                </a>
                <a href="https://www.google.com/search?q=PK+Photography+Mumbai" target="_blank" rel="noreferrer" data-testid="testimonials-read-reviews" className="inline-flex items-center gap-2 text-sm font-semibold text-[#161514] hover:text-[#FF5B22] transition-colors">
                  Read all reviews <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-7 md:pt-4 min-w-0 overflow-hidden">
            <div className="relative min-h-[300px] md:min-h-[340px] max-w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}>
                  <blockquote data-font="display" className="text-[#161514] text-[1.55rem] md:text-3xl lg:text-[2rem] leading-[1.4] italic font-light max-w-full break-words overflow-wrap-anywhere">
                    &ldquo;{items[i].q}&rdquo;
                  </blockquote>
                  <figcaption className="mt-12 flex items-end justify-between gap-6 flex-wrap max-w-full">
                    <div className="min-w-0">
                      <div data-font="display" className="text-2xl text-[#161514] leading-none mb-2">{items[i].n}</div>
                      <div className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.28em] uppercase text-[#8A857D] font-medium break-words">{items[i].meta}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {items.map((_, k) => (
                        <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} data-testid={`testimonials-dot-${k}`} className={`h-px transition-all duration-500 ${k === i ? 'w-10 bg-[#FF5B22]' : 'w-6 bg-[#161514]/25 hover:bg-[#161514]/55'}`} />
                      ))}
                    </div>
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   10. PRICING TEASER — kept, refined
================================================================ */
function PricingTeaser() {
  const tiers = [
    { badge: 'Starter',  price: '\u20B95,000',  name: 'One-Hour Portrait Session' },
    { badge: 'Standard', price: '\u20B915,000', name: 'Mini Portfolio Shoot', featured: true },
    { badge: 'Premium',  price: '\u20B920,000', name: 'Full Portfolio Shoot' },
  ]
  return (
    <section className="py-24 md:py-32 bg-[#EEEAE1]" data-testid="pricing-section">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#8A857D] flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
              Shoot pricing
            </div>
            <h2 data-font="display" className="text-[#161514] text-[2.4rem] sm:text-[3rem] md:text-[4.2rem] leading-[0.98] font-light tracking-[-0.02em]">
              Transparent <span className="italic text-[#FF5B22]">packages.</span>
            </h2>
          </div>
          <Link href="/pricing" data-testid="pricing-see-all" className="inline-flex items-center gap-2 text-sm font-semibold text-[#161514] hover:text-[#FF5B22] transition-colors">
            See all packages <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {tiers.map((t, k) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: k * 0.08, duration: 0.7 }}
              className={`group rounded-sm p-8 md:p-10 transition-colors ${t.featured ? 'bg-[#161514] text-white' : 'bg-[#EEEAE1] border border-[#DBD4C6] text-[#161514] hover:border-[#FF5B22]'}`}
              data-testid={`pricing-tier-${t.badge.toLowerCase()}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${t.featured ? 'text-[#FF5B22]' : 'text-[#FF5B22]'}`}>{t.badge}</span>
                {t.featured && <span className="text-[10px] font-bold uppercase tracking-widest bg-[#FF5B22] text-white px-2.5 py-1 rounded-full">Popular</span>}
              </div>
              <div data-font="display" className="mt-6 text-5xl md:text-6xl font-light">{t.price}</div>
              <div className={`mt-2 ${t.featured ? 'text-white/70' : 'text-[#8A857D]'}`}>{t.name}</div>
              <Link href="/pricing" className={`mt-10 inline-flex items-center gap-2 text-sm font-semibold ${t.featured ? 'text-white group-hover:text-[#FF5B22]' : 'text-[#161514] group-hover:text-[#FF5B22]'} transition-colors`}>
                View details <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   11. FAQ — accordion with JSON-LD FAQPage
================================================================ */
const FAQS = [
  { q: 'What makes PK Photography different?', a: 'Over 12 years of experience combined with a small, dedicated in-house team means every shoot is handled personally by Prabhakar Kumar. From your first enquiry to final delivery, you work with the same crew, in the same studio.' },
  { q: 'Do you shoot destination weddings outside Mumbai?', a: 'Yes. We regularly shoot destination weddings in Goa and travel Pan India — Udaipur, Jaipur, Kerala, and beyond. Travel is included in most packages beyond 200 km on request.' },
  { q: 'How can I book an event, wedding, or headshot session?', a: 'Book directly through the Booking page, or WhatsApp us at +91 8888766739. We confirm your date and share a checklist within a few hours.' },
  { q: 'How soon do I receive edited photos and videos?', a: 'Headshot and portrait shoots are delivered in 5–7 working days. Weddings and larger productions typically take 3–5 weeks with a highlight teaser within 48 hours of the shoot.' },
  { q: 'Can I customize a package for my event or shoot?', a: 'Absolutely. Beyond the standard packages, we build custom scopes for weddings, multi-day corporate productions and destination shoots. Share the brief and we\u2019ll revert the same day.' },
]

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-20 md:py-32 bg-[#E6E1D5] overflow-hidden max-w-full" data-testid="faq-section">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start min-w-0">
          <div className="col-span-1 md:col-span-4 min-w-0">
            <div className="text-[10px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.32em] uppercase text-[#8A857D] flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
              FAQs
            </div>
            <h2 data-font="display" className="text-[#161514] text-[2.35rem] md:text-5xl font-light leading-[1.02] break-words">
              Questions, <span className="italic text-[#FF5B22]">answered.</span>
            </h2>
            <p className="mt-6 text-[#4C4A46] font-light leading-relaxed">Still unsure? WhatsApp us and we&rsquo;ll respond within the hour.</p>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="faq-whatsapp" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22] border-b border-[#FF5B22]/50 pb-1 hover:border-[#FF5B22]"><MessageCircle size={16} /> Chat on WhatsApp</a>
          </div>
          <div className="col-span-1 md:col-span-8 min-w-0 overflow-hidden">
            {FAQS.map((f, k) => (
              <div key={k} className="border-b border-[#161514]/12" data-testid={`faq-item-${k}`}>
                <button
                  onClick={() => setOpen(open === k ? -1 : k)}
                  aria-expanded={open === k}
                  aria-controls={`faq-panel-${k}`}
                  data-testid={`faq-toggle-${k}`}
                  className="w-full flex items-start justify-between gap-4 py-7 text-left group min-w-0"
                >
                  <span data-font="display" className="text-xl md:text-[1.6rem] font-light text-[#161514] group-hover:text-[#FF5B22] transition-colors flex-1 min-w-0 break-words">
                    {f.q}
                  </span>
                  <span className={`w-9 h-9 rounded-full grid place-content-center shrink-0 transition-all duration-500 ${open === k ? 'bg-[#FF5B22] text-white rotate-45' : 'bg-transparent border border-[#161514]/25 text-[#161514]'}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === k && (
                    <motion.div id={`faq-panel-${k}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }} className="overflow-hidden">
                      <p className="pb-7 text-[#4C4A46] leading-[1.75] font-light max-w-2xl break-words">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
    </section>
  )
}

/* ================================================================
   12. FINAL CTA — Let's tell your story
================================================================ */
function CTA() {
  return (
    <section id="booking" className="relative py-20 md:py-40 bg-[#0e0d0c] text-white overflow-hidden max-w-full" data-testid="cta-section">
      {/* Ambient */}
      <div aria-hidden className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.28), transparent 60%)', filter: 'blur(80px)' }} />
      <div aria-hidden className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.16), transparent 60%)', filter: 'blur(80px)' }} />

      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center min-w-0">
          <div className="col-span-1 lg:col-span-7 min-w-0">
            <div className="text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.32em] uppercase text-white/60 flex items-center gap-3 mb-8 break-words">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22] animate-pulse" />
              Booking open · {new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' })}
            </div>
            <h2 data-font="display" className="text-white text-[2.35rem] sm:text-[3.8rem] md:text-[5.6rem] leading-[0.98] font-light tracking-[-0.02em] break-words max-w-full">
              Let&rsquo;s create something <span className="italic text-[#FF5B22]">worth remembering.</span>
            </h2>
            <p className="mt-8 max-w-lg text-white/70 text-[15px] md:text-base leading-relaxed font-light break-words">
              Planning a wedding? Launching a brand? Need professional photos for your business? We&rsquo;re here to make the process simple&mdash;from planning the shoot to delivering beautifully edited photographs and videos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 max-w-full">
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="cta-whatsapp" className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 bg-[#FF5B22] text-white pl-6 pr-2 py-2 rounded-full text-sm font-semibold hover:pr-6 transition-[padding] duration-500">
                <span className="tracking-wide">Chat on WhatsApp</span>
                <span className="w-10 h-10 rounded-full bg-white/20 grid place-content-center group-hover:bg-white group-hover:text-[#FF5B22] transition-colors">
                  <MessageCircle size={16} />
                </span>
              </a>
              <Link href="/booking" data-testid="cta-booking" className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 text-sm font-semibold text-white border border-white/25 pl-6 pr-2 py-2 rounded-full hover:border-white transition-colors">
                <span className="tracking-wide">Start booking</span>
                <span className="w-10 h-10 rounded-full bg-white/10 grid place-content-center border border-white/20 group-hover:bg-white group-hover:text-[#161514] transition-colors">
                  <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 grid gap-3 min-w-0">
            <a href={`mailto:${CONTACT.email}`} data-testid="cta-email" className="group flex items-center gap-4 p-5 rounded-sm bg-white/[0.03] border border-white/10 hover:border-[#FF5B22] hover:bg-white/[0.06] transition-all">
              <span className="w-11 h-11 rounded-full bg-[#FF5B22] text-white grid place-content-center shrink-0"><Mail size={16} /></span>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-white/50">Email</div>
                <div className="font-medium text-white truncate">{CONTACT.email}</div>
              </div>
              <ArrowUpRight size={16} className="text-white/50 group-hover:text-[#FF5B22] ml-auto shrink-0" />
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} data-testid="cta-phone" className="group flex items-center gap-4 p-5 rounded-sm bg-white/[0.03] border border-white/10 hover:border-[#FF5B22] hover:bg-white/[0.06] transition-all">
              <span className="w-11 h-11 rounded-full bg-[#FF5B22] text-white grid place-content-center shrink-0"><MessageCircle size={16} /></span>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-white/50">Call / WhatsApp</div>
                <div className="font-medium text-white">{CONTACT.phone}</div>
              </div>
              <ArrowUpRight size={16} className="text-white/50 group-hover:text-[#FF5B22] ml-auto shrink-0" />
            </a>
            <div className="flex items-center gap-4 p-5 rounded-sm bg-white/[0.03] border border-white/10">
              <span className="w-11 h-11 rounded-full bg-[#FF5B22] text-white grid place-content-center shrink-0"><MapPin size={16} /></span>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-white/50">Based in</div>
                <div className="font-medium text-white">{CONTACT.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   Homepage JSON-LD (LocalBusiness) — SEO
================================================================ */
function HomeJsonLd() {
  const SAME_AS = [
    'https://www.instagram.com/itspkphotography.in/',
    'https://www.facebook.com/pkfashionphotography',
    'https://www.linkedin.com/company/pkphotography/',
    'https://www.youtube.com/@itspkphotography',
    'https://x.com/pkphotographym',
  ]
  const SERVICE_TYPES = [
    'Wedding Photography Mumbai',
    'Wedding Videographer Mumbai',
    'Wedding Photography Goa',
    'Destination Wedding Photographer Goa',
    'Drone Photography Mumbai',
    'Drone Videography Goa',
    'Aerial Photography India',
    'Corporate Photographer Mumbai',
    'Event Photographer Mumbai',
    'Product Photography Mumbai',
    'Fashion Photography Mumbai',
    'Real Estate Photography Mumbai',
    'Luxury Wedding Photographer India',
  ]
  const GBP_MUMBAI = 'https://share.google/KRRlSGRe31W2g95nU'
  const GBP_GOA = 'https://share.google/Ej67vDaFeSCl2Zp4U'
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'PhotographyBusiness',
        '@id': 'https://pkphotography.in/#mumbai',
        name: 'PK Photography — Mumbai Studio',
        image: 'https://pkphotography.in/images/studio.jpeg',
        url: 'https://pkphotography.in/',
        telephone: '+918888766739',
        email: CONTACT.email,
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'C1302, Evershine Cosmic, Opp. Infiniti Mall, Veera Desai Industrial Estate, Andheri West',
          addressLocality: 'Mumbai',
          addressRegion: 'Maharashtra',
          postalCode: '400053',
          addressCountry: 'IN',
        },
        areaServed: ['Mumbai', 'Maharashtra', 'India'],
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '380' },
        hasMap: GBP_MUMBAI,
        sameAs: [GBP_MUMBAI, ...SAME_AS],
        serviceType: SERVICE_TYPES,
      },
      {
        '@type': 'PhotographyBusiness',
        '@id': 'https://pkphotography.in/#goa',
        name: 'PK Photography — Goa Studio',
        image: 'https://pkphotography.in/images/studio.jpeg',
        url: 'https://pkphotography.in/',
        telephone: '+918188881165',
        email: CONTACT.email,
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'House No. 1053 A, Madhlavaddo',
          addressLocality: 'Morjim',
          addressRegion: 'Goa',
          postalCode: '403512',
          addressCountry: 'IN',
        },
        areaServed: ['Goa', 'India'],
        hasMap: GBP_GOA,
        sameAs: [GBP_GOA, ...SAME_AS],
        serviceType: SERVICE_TYPES,
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

/* ================================================================
   Composition
================================================================ */
export default function App() {
  return (
    <main className="bg-[#EEEAE1] text-[#161514] overflow-x-hidden max-w-full" data-testid="home-main">
      <HomeJsonLd />
      <Hero />
      <Trust />
      <About />
      <FeaturedServices />
      <Portfolio />
      <Process />
      <WhyChooseUs />
      <Clients />
      <Testimonials />
      <PricingTeaser />
      <FAQ />
      <CTA />
    </main>
  )
}
