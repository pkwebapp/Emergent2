'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '@/app/page'
import { useMediaSlot } from '@/hooks/useMediaSlot'

/**
 * Resolve a service card's still + video from that service's own hero banner
 * slot (`<slug>-banner`) — the SAME media used on the service page hero.
 * Falls back to the hardcoded defaults when the admin hasn't uploaded yet.
 */
function useBannerMedia(slug, fallbackImage, fallbackVideo) {
  const { items } = useMediaSlot(`${slug}-banner`)
  const img = items.find((i) => i.resource_type === 'image')?.secure_url || fallbackImage
  const video = items.find((i) => i.resource_type === 'video')?.secure_url || fallbackVideo || null
  return { img, video }
}

/* --- Hero image cluster --- */
const HERO_IMG = {
  main: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1764434035/carousel-images/dl8tpfoygwvsg9hwlcbr.jpg',
  couple: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1764433882/carousel-images/x8dfyruht0f52mzy8z9j.jpg',
  headshot: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1765199683/carousel-images/dlkon31dr7dhouimtnoh.jpg',
}


/* --- Ambient looping videos per featured service (Mixkit CDN) --- */
const VIDEOS = {
  weddings: 'https://assets.mixkit.co/videos/42933/42933-720.mp4',
  events: 'https://assets.mixkit.co/videos/4111/4111-720.mp4',
  'portraits-headshots': 'https://assets.mixkit.co/videos/4067/4067-720.mp4',
  'editorial-portfolio': 'https://assets.mixkit.co/videos/5060/5060-720.mp4',
}

/* --- Curated tag chips per service --- */
const TAGS = {
  weddings: ['photo', 'film', 'drone', 'album'],
  events: ['photo', 'film', 'live-stream'],
  'portraits-headshots': ['studio', 'on-location', 'retouch'],
  'editorial-portfolio': ['concept', 'styling', 'retouch'],
  'live-streaming': ['multi-cam', 'broadcast', 'live'],
  'family-kids': ['candid', 'studio', 'on-location'],
  'fashion-shoots': ['editorial', 'lookbook', 'campaign'],
  'boudoir-shoots': ['studio', 'intimate', 'retouch'],
  'brand-content': ['photo', 'video', 'reels'],
  'product-ecommerce': ['photo', 'catalog', 'retouch'],
  'food-photography': ['styled', 'menu', 'restaurant'],
  'corporate-industrial': ['photo', 'video', 'campaign'],
  'real-estate-architectural': ['photo', 'video', 'drone'],
  'influencer-celebrity': ['photo', 'social', 'discreet'],
  'podcast-production': ['audio', 'multi-cam', 'edit'],
  'editing-retouching': ['photo', 'video', 'colour'],
  'album-design': ['design', 'print', 'binding'],
  'drone-services': ['aerial', 'photo', 'film'],
  'design-services': ['graphic', 'templates', 'print'],
}

function splitTitle(title) {
  const words = title.split(' ')
  if (words.length <= 2) return { head: '', tail: title }
  const tailLen = Math.min(2, Math.floor(words.length / 2))
  return {
    head: words.slice(0, words.length - tailLen).join(' '),
    tail: words.slice(words.length - tailLen).join(' '),
  }
}

/* =========================================================================
   Root
   ========================================================================= */
export default function ServicesPage() {
  const featured = SERVICES.filter((s) => s.featured)
  const rest = SERVICES.filter((s) => !s.featured)
  const reduce = useReducedMotion()

  return (
    <main className="relative bg-[#EEEAE1] text-[#161514] overflow-x-hidden selection:bg-[#FF5B22] selection:text-white">
      <CustomCursor />
      <NoiseOverlay />
      <AmbientMesh />
      <Header reduce={reduce} />
      <FeaturedList items={featured} reduce={reduce} />
      <SectionDivider label="More disciplines" small="Fifteen ways we work with light" />
      <RestGrid items={rest} reduce={reduce} />
      <Cta />
    </main>
  )
}

/* =========================================================================
   Ambient mesh gradient — very slow drifting radial glows
   ========================================================================= */
function AmbientMesh() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        initial={{ x: '-15%', y: '10%' }}
        animate={{ x: ['-15%', '15%', '-10%', '-15%'], y: ['10%', '-8%', '18%', '10%'] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/3 left-0 w-[80vw] h-[80vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.10), transparent 65%)', filter: 'blur(80px)', willChange: 'transform' }}
      />
      <motion.div
        initial={{ x: '20%', y: '30%' }}
        animate={{ x: ['20%', '-10%', '25%', '20%'], y: ['30%', '50%', '20%', '30%'] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-0 w-[70vw] h-[70vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(22,21,20,0.08), transparent 65%)', filter: 'blur(90px)', willChange: 'transform' }}
      />
      <motion.div
        initial={{ x: '10%', y: '60%' }}
        animate={{ x: ['10%', '-15%', '5%', '10%'], y: ['60%', '80%', '55%', '60%'] }}
        transition={{ duration: 48, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/4 w-[60vw] h-[60vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.06), transparent 65%)', filter: 'blur(100px)', willChange: 'transform' }}
      />
    </div>
  )
}

/* =========================================================================
   Paper grain overlay — steady
   ========================================================================= */
function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}

/* =========================================================================
   Hero — word-by-word reveal, morphing dynamic word, mouse parallax, scroll fade
   ========================================================================= */
function Header({ reduce }) {
  const words = ['Wedding', 'Events', 'Headshots', 'Portraits', 'Brands', 'Businesses', 'Campaigns', 'Products', 'Portfolios', 'Families', 'Stories', 'Corporate']
  const [wi, setWi] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setWi((v) => (v + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [reduce])

  /* Scroll-driven fade + scale as user scrolls the hero away */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  /* Mouse parallax */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.5 })
  const py = useSpring(my, { stiffness: 40, damping: 20, mass: 0.5 })
  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mx.set(((e.clientX - cx) / cx) * 22)
      my.set(((e.clientY - cy) / cy) * 22)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, reduce])

  /* Word-by-word reveal on mount */
  const line1 = ['Crafting', 'visual', 'stories']
  const line2 = ['for', 'your']

  const wordContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }
  const wordItem = {
    hidden: { y: '110%', opacity: 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.9, ease: [0.7, 0, 0.2, 1] },
    },
  }

  return (
    <section ref={heroRef} className="relative pt-32 md:pt-40 lg:pt-44 pb-16 md:pb-20 z-10 overflow-hidden">
      {/* Mouse-parallax accent shapes */}
      <motion.div
        aria-hidden="true"
        style={{ translateX: px, translateY: py, willChange: 'transform' }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute top-[10%] right-[6%] w-[520px] h-[520px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.14), transparent 65%)', filter: 'blur(50px)' }} />
        <div className="absolute bottom-[-14%] left-[-6%] w-[460px] h-[460px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(22,21,20,0.06), transparent 65%)', filter: 'blur(70px)' }} />
      </motion.div>

      <motion.div
        style={{ scale, opacity, willChange: 'transform, opacity' }}
        className="container mx-auto max-w-[1400px] px-6 md:px-14 relative"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* ---------------- LEFT: copy ---------------- */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.7, 0, 0.2, 1] }}
              className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#8A857D] mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-2.5">
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]"
                />
                Our Services · PK Photography
              </span>
            </motion.div>

            <h1
              className="text-[2.6rem] sm:text-[3.6rem] lg:text-[4.2rem] xl:text-[5rem] leading-[0.98] tracking-[-0.02em] font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="block">Crafting visual stories</span>

              <span className="flex flex-wrap items-baseline gap-x-[0.3ch]">
                <span>for your</span>
                <span className="relative inline-flex items-baseline overflow-hidden pb-[0.06em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wi}
                      initial={{ y: '110%', opacity: 0, scale: 0.94 }}
                      animate={{ y: '0%', opacity: 1, scale: 1 }}
                      exit={{ y: '-110%', opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.85, ease: [0.7, 0, 0.2, 1] }}
                      className="italic text-[#FF5B22] pr-1 inline-block will-change-transform"
                    >
                      {words[wi]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="italic text-[#FF5B22]">.</span>
                </span>
              </span>
            </h1>

            {/* short accent rule */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
              className="block origin-left w-16 h-[2px] bg-[#FF5B22] mt-7 mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
              className="hidden sm:block max-w-[46ch] text-[15px] md:text-base leading-[1.7] text-[#4C4A46] font-light"
            >
              From intimate portraits to grand weddings, corporate events, and brand campaigns, we create photography, films, and visual content across Mumbai, Goa, and beyond&mdash;capturing moments, building brands, and telling stories worth remembering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.12, duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Link
                href="/booking"
                data-magnetic
                data-cursor="Book"
                className="group inline-flex items-center gap-3 bg-[#161514] text-[#EEEAE1] pl-6 pr-2 py-2 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors shadow-[0_14px_34px_-14px_rgba(22,21,20,0.55)]"
              >
                Request a quote
                <span className="w-8 h-8 rounded-full bg-[#EEEAE1]/15 grid place-content-center group-hover:bg-[#161514]/15 transition-colors">
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
              <a
                href="https://wa.me/918888766739"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-cursor="Open"
                className="text-sm font-semibold text-[#8A857D] hover:text-[#161514] transition-colors"
              >
                or WhatsApp us &rarr;
              </a>
            </motion.div>
          </div>

          {/* ---------------- RIGHT: image cluster ---------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
            className="relative mt-4 lg:mt-0 h-[440px] sm:h-[540px] lg:h-[600px]"
          >
            {/* glow */}
            <div aria-hidden className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.22), transparent 62%)', filter: 'blur(40px)' }} />

            {/* main arched image */}
            <motion.div
              style={{ translateX: px, translateY: py }}
              className="absolute right-2 sm:right-6 lg:right-2 top-6 w-[74%] sm:w-[66%] lg:w-[70%] h-[92%] overflow-hidden rounded-t-[160px] sm:rounded-t-[200px] rounded-b-[22px] shadow-[0_40px_90px_-40px_rgba(22,21,20,0.5)] ring-1 ring-[#161514]/5"
            >
              <img src={HERO_IMG.main} alt="Portrait photography by PK Photography" loading="eager" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/15 to-transparent" />
            </motion.div>

            {/* top-left floating thumb */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
              className="hidden sm:block absolute left-0 lg:-left-4 top-16 lg:top-20 w-40 lg:w-52 aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(22,21,20,0.5)] ring-4 ring-[#EEEAE1] z-20"
            >
              <img src={HERO_IMG.couple} alt="Wedding photography" loading="lazy" className="w-full h-full object-cover" />
            </motion.div>

            {/* bottom-right floating thumb (B&W) */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.95, duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
              className="hidden sm:block absolute right-0 lg:-right-4 bottom-8 lg:bottom-14 w-36 lg:w-44 aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(22,21,20,0.55)] ring-4 ring-[#EEEAE1] z-20"
            >
              <img src={HERO_IMG.headshot} alt="Headshot photography" loading="lazy" className="w-full h-full object-cover grayscale" />
            </motion.div>

          </motion.div>
        </div>

        {/* SCROLL cue */}
        <div className="hidden md:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-0 text-[10px] tracking-[0.36em] uppercase text-[#8A857D]">
          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>scroll</motion.span>
          <span className="block w-px h-10 bg-gradient-to-b from-[#161514]/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}

/* =========================================================================
   Featured stack
   ========================================================================= */
function FeaturedList({ items, reduce }) {
  return (
    <section className="pt-8 md:pt-14 pb-10 relative z-10">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-14">
        {items.map((s, i) => (
          <FeaturedRow key={s.slug} item={s} index={i} total={items.length} reverse={i % 2 === 1} reduce={reduce} />
        ))}
      </div>
    </section>
  )
}

function FeaturedRow({ item, index, total, reverse, reduce }) {
  const wrapRef = useRef(null)
  const mediaRef = useRef(null)
  const videoRef = useRef(null)
  const [hover, setHover] = useState(false)

  const { scrollYProgress: rowP } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] })
  const y = useTransform(rowP, [0, 1], ['12%', '-12%'])
  const scale = useTransform(rowP, [0, 0.5, 1], [1.1, 1, 1.06])
  const textY = useTransform(rowP, [0, 0.4, 0.8, 1], [40, 0, 0, -20])
  const textOpacity = useTransform(rowP, [0, 0.3, 0.75, 1], [0.2, 1, 1, 0.5])

  /* Entrance clip-path mask reveal */
  const { scrollYProgress: revealP } = useScroll({ target: mediaRef, offset: ['start 0.95', 'start 0.55'] })
  const mask = useTransform(revealP, [0, 1], [100, 0])
  const clip = useTransform(mask, (m) => `inset(${m / 2}% ${m / 2}% ${m / 2}% ${m / 2}%)`)

  const { head, tail } = splitTitle(item.t)
  const tags = TAGS[item.slug] || []
  const { img: stillSrc, video } = useBannerMedia(item.slug, item.img, VIDEOS[item.slug])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (hover) v.play().catch(() => {})
    else {
      v.pause()
      v.currentTime = 0
    }
  }, [hover, video])

  return (
    <Link
      href={`/services/${item.slug}`}
      data-magnetic
      data-cursor="View"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={wrapRef}
      className={`group relative grid grid-cols-12 gap-4 md:gap-10 items-center py-16 md:py-24 border-b border-[#161514]/10 ${
        index === 0 ? 'border-t' : ''
      }`}
    >
      {/* Media column */}
      <motion.div
        ref={mediaRef}
        style={{ clipPath: reduce ? 'none' : clip, willChange: 'clip-path' }}
        className={`col-span-12 md:col-span-7 relative aspect-[4/5] md:aspect-[16/11] overflow-hidden rounded-sm bg-[#161514] ${
          reverse ? 'md:order-2' : ''
        }`}
      >
        <motion.div style={{ y: reduce ? 0 : y, scale: reduce ? 1 : scale, willChange: 'transform' }} className="absolute inset-[-8%]">
          <Image
            src={stillSrc}
            alt={item.t}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={`object-cover transition-opacity duration-700 ${hover ? 'opacity-0' : 'opacity-100'}`}
            unoptimized
          />
          {video && (
            <video
              key={video}
              ref={videoRef}
              src={video}
              muted
              playsInline
              loop
              preload="none"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hover ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </motion.div>

        {/* Dynamic light beam sweeps in on hover */}
        <div
          className={`pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-700 ${
            hover ? 'opacity-90' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%)',
          }}
        />

        <div className="absolute top-5 left-5 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/90 z-10 mix-blend-difference">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="w-6 h-px bg-[#EEEAE1]/60" />
          <span>{String(total).padStart(2, '0')}</span>
        </div>
      </motion.div>

      {/* Text column with scroll-driven float */}
      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : textOpacity, willChange: 'transform, opacity' }}
        className={`col-span-12 md:col-span-5 flex flex-col ${reverse ? 'md:order-1 md:pr-14' : 'md:pl-6'}`}
      >
        <StaggerGroup className="flex flex-wrap items-center gap-x-1.5 gap-y-2 mb-6 text-[10px] tracking-[0.24em] uppercase text-[#8A857D]">
          {tags.map((t, k) => (
            <StaggerItem key={t} delay={k * 0.05}>
              <span className="inline-flex items-center gap-1.5">
                <span className="rounded-full border border-[#161514]/15 px-2.5 py-1 group-hover:border-[#FF5B22]/60 group-hover:text-[#161514] transition-colors">
                  {t}
                </span>
                {k < tags.length - 1 && <span className="text-[#161514]/25">·</span>}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StaggerHeadline
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[0.98] max-w-[15ch]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {head && <span>{head} </span>}
          <span className="italic text-[#FF5B22]">{tail}</span>
        </StaggerHeadline>

        <StaggerItem delay={0.28}>
          <p className="mt-6 text-[15px] leading-relaxed text-[#4C4A46] font-light max-w-md">{item.d}</p>
        </StaggerItem>

        <StaggerItem delay={0.38}>
          <span className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-[#161514] border-b border-[#161514]/30 pb-1 self-start group-hover:border-[#FF5B22] group-hover:text-[#FF5B22] transition-colors">
            View discipline
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </StaggerItem>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: 'radial-gradient(1200px 400px at 50% 50%, rgba(255,91,34,0.08), transparent 60%)' }}
      />
    </Link>
  )
}

/* =========================================================================
   Stagger helpers — subtle blur+slide-up reveal on inView
   ========================================================================= */
function StaggerGroup({ children, className }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, delay = 0 }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 24, opacity: 0 },
        show: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.9, ease: [0.7, 0, 0.2, 1], delay },
        },
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

function StaggerHeadline({ children, className, style }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.7, 0, 0.2, 1], delay: 0.15 }}
      className={className}
      style={{ ...style, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.h3>
  )
}

/* =========================================================================
   Section Divider — cinematic light beam sweep
   ========================================================================= */
function SectionDivider({ label, small }) {
  return (
    <div className="pt-24 md:pt-32 pb-10 md:pb-16 relative z-10">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-14">
        <div className="relative flex items-end justify-between gap-6 flex-wrap pb-8 md:pb-12">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
            className="text-3xl md:text-5xl font-light tracking-[-0.01em]"
            style={{ fontFamily: "'Cormorant Garamond', serif", willChange: 'transform, opacity' }}
          >
            {label}
          </motion.h2>
          {small && (
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-[11px] tracking-[0.3em] uppercase text-[#8A857D] font-medium"
            >
              {small}
            </motion.span>
          )}

          {/* Baseline + animated light beam */}
          <div className="absolute left-0 right-0 bottom-0 h-px overflow-hidden">
            <div className="absolute inset-0 bg-[#161514]/12" />
            <motion.div
              initial={{ x: '-40%', opacity: 0 }}
              whileInView={{ x: '140%', opacity: [0, 1, 0] }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.8, delay: 0.3, ease: [0.7, 0, 0.2, 1] }}
              className="absolute inset-y-0 w-1/3"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,91,34,0.9), transparent)',
                filter: 'blur(1px)',
                willChange: 'transform, opacity',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   Rest grid
   ========================================================================= */
function RestGrid({ items, reduce }) {
  return (
    <section className="pb-24 md:pb-32 relative z-10">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((s, i) => (
            <RestCard key={s.slug} item={s} index={i + 5} col={i % 3} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RestCard({ item, index, col, reduce }) {
  const cardRef = useRef(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 130, damping: 20 })
  const sRotY = useSpring(rotY, { stiffness: 130, damping: 20 })
  const videoRef = useRef(null)
  const [hover, setHover] = useState(false)

  const { head, tail } = splitTitle(item.t)
  const tags = TAGS[item.slug] || []
  const { img: stillSrc, video } = useBannerMedia(item.slug, item.img, VIDEOS[item.slug])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (hover) v.play().catch(() => {})
    else { v.pause(); v.currentTime = 0 }
  }, [hover])

  const onMove = (e) => {
    if (reduce) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotY.set(dx * 4)
    rotX.set(-dy * 4)
  }
  const onLeave = () => {
    setHover(false)
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.95, ease: [0.7, 0, 0.2, 1], delay: col * 0.09 }}
      style={{ willChange: 'transform, opacity', perspective: 900 }}
    >
      <Link
        href={`/services/${item.slug}`}
        data-magnetic
        data-cursor="Explore"
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        ref={cardRef}
        className="group relative block overflow-hidden rounded-sm bg-[#F5F2ED]"
      >
        <motion.div style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d', willChange: 'transform' }} className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={stillSrc}
            alt={item.t}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-[transform,filter] [transition-duration:1400ms] ease-out group-hover:scale-[1.08] group-hover:brightness-[1.06]"
            unoptimized
          />
          {video && (
            <video
              key={video}
              ref={videoRef}
              src={video}
              muted
              playsInline
              loop
              preload="none"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hover ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C] via-[#0E0D0C]/68 to-transparent" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: 'radial-gradient(500px 260px at 50% 100%, rgba(255,91,34,0.22), transparent 65%)' }}
          />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] tracking-[0.28em] uppercase text-white/85">
            <span>/ {String(index + 1).padStart(2, '0')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="absolute top-14 left-4 right-4 flex flex-wrap items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-white/30 px-2.5 py-1 text-[9px] tracking-[0.24em] uppercase text-white/95 bg-black/25 backdrop-blur">
                {t}
              </span>
            ))}
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-black/10 p-1" data-testid={`service-card-copy-${item.slug}`}>
            <h3
              className="text-2xl md:text-[2rem] font-light tracking-[-0.02em] leading-[1.02] text-white max-w-[15ch]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {head && <span>{head} </span>}
              <span className="italic text-[#FF5B22]">{tail}</span>
            </h3>
            <div className="mt-3 h-px w-8 bg-[#EEEAE1]/50 group-hover:w-16 group-hover:bg-[#FF5B22] transition-all duration-500" />
            <p className="mt-3 text-[12px] md:text-[13px] leading-relaxed text-white/90 font-light max-w-[32ch]">
              {item.d}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

/* =========================================================================
   CTA — cinematic finale with looping video + floating particles
   ========================================================================= */
function Cta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const vScale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const vOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.85, 1])

  return (
    <section ref={ref} className="relative pb-32 md:pb-44 pt-24 md:pt-32 z-10 overflow-hidden">
      {/* Cinematic backdrop */}
      <motion.div
        style={{ scale: vScale, opacity: vOpacity, willChange: 'transform, opacity' }}
        className="absolute inset-0 -z-10"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/5060/5060-720.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#EEEAE1]/78 backdrop-blur-[2px]" />
      </motion.div>

      <div className="container mx-auto max-w-[1400px] px-6 md:px-14 relative">
        <StaggerHeadline
          className="text-6xl md:text-8xl lg:text-[10vw] font-light tracking-[-0.02em] leading-[0.95] max-w-[14ch]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Ready to <span className="italic text-[#FF5B22]">shoot?</span>
        </StaggerHeadline>

        <StaggerGroup className="mt-14 flex flex-wrap items-center gap-4">
          <StaggerItem delay={0.05}>
            <Link
              href="/booking"
              data-magnetic
              data-cursor="Book"
              className="inline-flex items-center gap-3 bg-[#161514] text-[#EEEAE1] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors shadow-[0_10px_30px_-12px_rgba(22,21,20,0.5)]"
            >
              Book your session
              <ArrowUpRight size={16} />
            </Link>
          </StaggerItem>
          <StaggerItem delay={0.14}>
            <a
              href="https://wa.me/918888766739"
              target="_blank"
              rel="noreferrer"
              data-magnetic
              data-cursor="Open"
              className="inline-flex items-center gap-3 border border-[#161514]/20 text-[#161514] px-8 py-4 rounded-full text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors bg-[#EEEAE1]/60 backdrop-blur"
            >
              Or WhatsApp
            </a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  )
}

function FloatingParticles() {
  return null
}

/* =========================================================================
   Custom cursor — raw DOM, no springs, zero scroll lag
   ========================================================================= */
function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    if (!dot) return

    let visible = false
    let raf = 0
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
      }
      const t = e.target
      const magnetic = t && t.closest && t.closest('[data-magnetic]')
      dot.style.backgroundColor = magnetic ? '#FF5B22' : '#161514'
    }
    const leave = () => {
      visible = false
      dot.style.opacity = '0'
    }
    const loop = () => {
      x += (tx - x) * 0.32
      y += (ty - y) * 0.32
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = window.requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseleave', leave)
    raf = window.requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] w-3 h-3 -ml-1.5 -mt-1.5 rounded-full hidden md:block opacity-0"
      style={{ willChange: 'transform, opacity, background-color', backgroundColor: '#161514', transition: 'background-color 200ms ease-out' }}
    />
  )
}
