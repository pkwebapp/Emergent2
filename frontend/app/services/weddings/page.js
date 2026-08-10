'use client'
import HeroMedia from '@/components/media/HeroMedia'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ArrowLeft, MessageCircle, Play, Camera, Video, Film, Sparkles, MapPin, Clock, X, Check, Heart, Star, Award } from 'lucide-react'
import { CONTACT } from '@/components/site/Chrome'
import { ReadingProgress, RelatedServices } from '@/components/services/ServiceExtras'

/* ---------- Assets ---------- */
const CLD = 'https://res.cloudinary.com/ddamvvrby/image/upload'
const IMG = {
  video: 'https://assets.mixkit.co/videos/42933/42933-720.mp4',
  filmVideo: 'https://assets.mixkit.co/videos/4111/4111-720.mp4',
  w1: `${CLD}/v1764433882/carousel-images/x8dfyruht0f52mzy8z9j.jpg`,
  w2: `${CLD}/v1764433947/carousel-images/fgbuoicipe3uxxx6bjmp.jpg`,
  w3: `${CLD}/v1764433993/carousel-images/bsdbxtu9tbgxsppl2mug.jpg`,
  w4: `${CLD}/v1764434019/carousel-images/kzw0scmrr3tidz4viw79.jpg`,
  w5: `${CLD}/v1764434035/carousel-images/dl8tpfoygwvsg9hwlcbr.jpg`,
  w6: `${CLD}/v1764434059/carousel-images/chjn5dwyaioqwtiznous.jpg`,
  w7: `${CLD}/v1764434086/carousel-images/hqaoj7xtlallr22dhx44.jpg`,
  w8: `${CLD}/v1764434110/carousel-images/gfvzdsk4r3npfm9kiqsl.jpg`,
  w9: `${CLD}/v1764434129/carousel-images/abw02otalfbwooa8kfxo.jpg`,
  w10: `${CLD}/v1764434154/carousel-images/qlz5oqo6smjnovl3jlim.jpg`,
  w11: `${CLD}/v1764434230/carousel-images/pkdcn0xyx9izn1stggjq.jpg`,
  w12: `${CLD}/v1764434251/carousel-images/gmtruuytuvxwse0qtfng.jpg`,
  hero: `${CLD}/v1771153677/carousel-images/q9uunwxx92hobej4ogft.jpg`,
}

/* ---------- Animated Counter ---------- */
function AnimatedNumber({ value, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const numeric = parseFloat(value)
    const startTime = performance.now()
    const raf = (t) => {
      const p = Math.min((t - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(numeric * eased)
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, value, duration])
  const display = Number.isInteger(parseFloat(value)) ? Math.floor(n) : n.toFixed(1)
  return <span ref={ref} className="tabular">{display}{suffix}</span>
}

/* ---------- Ornamental divider ---------- */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#FF5B22]/60" />
      <Heart size={12} className="fill-[#FF5B22] text-[#FF5B22]" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#FF5B22]/60" />
    </div>
  )
}

/* ---------- Hero ---------- */
function Hero({ onPlayFilm }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#161514]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <HeroMedia slot="weddings-banner" fallbackImage={IMG.hero} fallbackVideo={IMG.video} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161514]/50 via-[#161514]/25 to-[#161514]/95" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 md:px-14 pt-32 pb-16 container mx-auto max-w-[1400px]">
        <nav className="text-[10px] tracking-[0.28em] uppercase text-white/60 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#FF5B22]">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#FF5B22]">Services</Link>
          <span>/</span>
          <span className="text-white">Weddings</span>
        </nav>

        <div className="max-w-3xl flex-1 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEEAE1]/10 backdrop-blur border border-white/20 text-[10px] font-semibold tracking-[0.28em] uppercase text-white mb-7">
            <Heart size={10} className="fill-[#FF5B22] text-[#FF5B22]" />
            Wedding photographers &amp; filmmakers in Mumbai and Goa
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.7, 0, 0.2, 1] }} className="display text-white text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-[-0.015em] max-w-[22ch]">
            Wedding <span className="font-cormorant italic text-[#FF5B22] font-light">Photography</span>{' '}
            <span className="block mt-1"><span className="font-cormorant italic text-white/85 font-light">&amp;</span> <span className="font-cormorant italic text-[#FF5B22] font-light">Videography</span></span>
          </motion.h1>

          <span className="mt-7 block w-11 h-px bg-[#EEEAE1]/55" aria-hidden="true" />

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-6 max-w-[52ch] text-white/80 text-[15px] md:text-base font-light leading-relaxed">
            <span className="font-cormorant italic text-lg md:text-xl text-white/90 block mb-2">A love story deserves more than photographs.</span>
            Capturing timeless Mumbai and Goa weddings through candid photography, cinematic films &amp; luxury editorial storytelling.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/booking" className="group inline-flex items-center gap-3 bg-[#EEEAE1] text-[#161514] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#FF5B22] hover:text-white transition-colors">
              Book your wedding <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#EEEAE1]/10 backdrop-blur border border-white/25 text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#25D366] hover:border-[#25D366] transition-colors">
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }} className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {[
            { v: 12, s: '+', l: 'Years telling love stories' },
            { v: 1000, s: '+', l: 'Weddings witnessed' },
            { v: 500, s: '+', l: 'Couples, one family' },
            { v: 'Mumbai · Goa · India', l: 'Wherever love takes you', isText: true },
          ].map((t, i) => (
            <div key={i} className="text-center md:text-left text-white">
              <div className="display text-3xl md:text-4xl">
                {t.isText ? <span className="text-base md:text-lg font-semibold tracking-tight">{t.v}</span> : <><AnimatedNumber value={t.v} suffix={t.s} /></>}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.28em] uppercase text-white/60">{t.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Wave divider */}
      <svg className="absolute bottom-0 left-0 right-0 w-full z-10" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ height: '90px' }}>
        <path d="M0,100 C240,20 720,80 1440,10 L1440,100 Z" fill="#EEEAE1" />
      </svg>
    </section>
  )
}

/* ---------- Storytelling ---------- */
function Storytelling() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yImg = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <section ref={ref} className="relative py-24 md:py-40 bg-[#FDFBF7] overflow-hidden">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <Divider />
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-center mt-12">
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow mb-6">Chapter One</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="display text-4xl md:text-6xl lg:text-[6vw] leading-[1] tracking-tight">
              Every wedding has <span className="font-cormorant italic text-[#FF5B22] font-light">thousands</span> of moments.
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-10 space-y-6 text-lg md:text-xl text-[#8A857D] leading-relaxed max-w-xl font-cormorant">
              <p className="italic">Some happen in seconds.</p>
              <p className="italic">Some become family heirlooms.</p>
              <p className="text-[#161514] font-normal not-italic font-sans">From stolen glances to joyful celebrations, we preserve every emotion with timeless photography and cinematic storytelling &mdash; so you can relive your wedding for generations.</p>
            </motion.div>
          </div>
          <motion.div style={{ y: yImg }} className="col-span-12 lg:col-span-5 order-1 lg:order-2 relative">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={IMG.w3} alt="Bride and groom at traditional wedding mandap in candid cinematic style, Mumbai & Goa" fill className="object-cover" sizes="500px" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="absolute -bottom-6 -left-6 w-2/3 aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-2xl hidden md:block">
              <Image src={IMG.w7} alt="Wedding ritual at luxury venue in documentary editorial style, Mumbai & Goa" fill className="object-cover" sizes="280px" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Wedding Services (5 storytelling blocks) ---------- */
const SERVICE_BLOCKS = [
  { t: 'Candid Photography', d: 'Capture authentic emotions, natural smiles and unscripted moments that make every wedding uniquely yours.', img: IMG.w1, icon: <Camera size={18} />, n: '01' },
  { t: 'Traditional Photography', d: 'Beautifully document every ritual, every blessing and every family portrait with complete attention to detail.', img: IMG.w4, icon: <Camera size={18} />, n: '02' },
  { t: 'Cinematic Videography', d: 'Transform your wedding into an emotional film with cinematic storytelling, professional colour grading and carefully selected music.', img: IMG.w8, icon: <Video size={18} />, n: '03' },
  { t: 'Traditional Videography', d: 'Complete documentary coverage of your wedding ceremonies ensuring every important ritual is preserved for the years ahead.', img: IMG.w2, icon: <Film size={18} />, n: '04' },
  { t: 'Drone Cinematography', d: 'Epic aerial storytelling showcasing venues, celebrations and unforgettable cinematic perspectives from the sky.', img: IMG.w11, icon: <Sparkles size={18} />, n: '05' },
]

function ServiceBlocks() {
  return (
    <section className="relative py-24 md:py-32 bg-[#F5EFE6]">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 mb-16 text-center">
        <Divider />
        <div className="eyebrow mb-4 mt-8">Wedding Services</div>
        <h2 className="display text-4xl md:text-6xl">The way we <span className="font-cormorant italic text-[#FF5B22] font-light">document love.</span></h2>
      </div>

      <div className="space-y-24 md:space-y-40">
        {SERVICE_BLOCKS.map((b, i) => (
          <ServiceBlock key={i} block={b} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}

function ServiceBlock({ block, reverse }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  return (
    <div ref={ref} className="container mx-auto max-w-[1400px] px-6 md:px-10">
      <div className={`grid grid-cols-12 gap-8 md:gap-16 items-center ${reverse ? 'lg:[direction:rtl]' : ''}`}>
        <motion.div style={{ y }} initial={{ opacity: 0, x: reverse ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1 }} className={`col-span-12 lg:col-span-7 [direction:ltr]`}>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
            <Image src={block.img} alt={`${block.t} at wedding venue in candid cinematic style, Mumbai & Goa`} fill sizes="800px" className="object-cover transition-transform [transition-duration:1400ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/40 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEEAE1]/95 backdrop-blur text-[#161514] text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" /> {block.icon} <span>Service {block.n}</span>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }} className="col-span-12 lg:col-span-5 [direction:ltr]">
          <div className="display text-8xl md:text-9xl text-[#FF5B22]/15 leading-none">{block.n}</div>
          <h3 className="display text-4xl md:text-5xl mt-4 leading-[1.05]">{block.t}</h3>
          <p className="mt-6 text-[#8A857D] text-lg leading-relaxed">{block.d}</p>
          <div className="mt-8 flex items-center gap-3 text-sm">
            <Link href="/booking" className="link-underline font-semibold text-[#161514]">Enquire about this service &rarr;</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- Wedding Journey Timeline ---------- */
const JOURNEY = [
  { t: 'Bride & Groom Preparations', d: 'The quiet before the storm — hands, jewellery, first looks.', img: IMG.w2 },
  { t: 'Family Moments', d: 'Blessings, laughter and the people who made you.', img: IMG.w9 },
  { t: 'Baraat', d: 'The grand entry — drums, dancing, joy in motion.', img: IMG.w6 },
  { t: 'Varmala', d: 'The exchange that begins forever.', img: IMG.w3 },
  { t: 'Reception', d: 'Where everyone celebrates the newest chapter.', img: IMG.w5 },
  { t: 'Wedding Ceremony', d: 'Rituals, fire and sacred silence.', img: IMG.w4 },
  { t: 'Pheras', d: 'Seven promises. One forever.', img: IMG.w10 },
  { t: 'Vidaai', d: 'The tender goodbye that opens a new home.', img: IMG.w12 },
]

function JourneyTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const fillHeight = useTransform(scrollYProgress, [0.05, 0.85], ['0%', '100%'])
  return (
    <section ref={ref} className="relative py-24 md:py-40 bg-[#FDFBF7] overflow-hidden">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-center mb-16 md:mb-24">
          <Divider />
          <div className="eyebrow mb-4 mt-8">The Wedding Journey</div>
          <h2 className="display text-4xl md:text-6xl">A story told in <span className="font-cormorant italic text-[#FF5B22] font-light">eight chapters.</span></h2>
          <p className="mt-6 max-w-xl mx-auto text-[#8A857D]">Scroll to walk through a PK Photography wedding day &mdash; from the first getting-ready shot to the final vidaai.</p>
        </div>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-[#DBD4C6]" />
          <motion.div style={{ height: fillHeight }} className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-px bg-[#FF5B22] origin-top" />

          <div className="space-y-16 md:space-y-24">
            {JOURNEY.map((j, i) => (
              <JourneyStep key={i} step={j} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function JourneyStep({ step, idx }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const isLeft = idx % 2 === 0
  return (
    <div ref={ref} className={`relative flex items-center gap-6 md:gap-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Node */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-5 h-5 z-10">
        <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="w-5 h-5 rounded-full bg-[#FF5B22] border-4 border-white shadow-lg" />
      </div>
      {/* Content */}
      <div className="pl-16 md:pl-0 md:w-1/2 md:px-8">
        <motion.div initial={{ opacity: 0, x: isLeft ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#FF5B22] font-bold">Chapter {String(idx + 1).padStart(2, '0')}</div>
          <h3 className="display text-3xl md:text-4xl mt-2">{step.t}</h3>
          <p className="mt-3 text-[#8A857D] leading-relaxed">{step.d}</p>
        </motion.div>
      </div>
      {/* Image */}
      <div className="hidden md:block md:w-1/2 md:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
          <Image src={step.img} alt={`${step.t} at wedding celebration in luxury editorial style, Mumbai & Goa`} fill sizes="400px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/40 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- Portfolio (editorial mosaic with location + couple hover) ---------- */
const PORTFOLIO = [
  { img: IMG.w1, couple: 'Ananya & Rohan', place: 'Taj Land\'s End · Mumbai', size: 'lg' },
  { img: IMG.w2, couple: 'Ishita & Karan', place: 'JW Marriott · Juhu', size: 'sm' },
  { img: IMG.w3, couple: 'Priya & Arjun', place: 'Fairmont · Jaipur', size: 'md' },
  { img: IMG.w4, couple: 'Nisha & Rahul', place: 'ITC Grand Central', size: 'sm' },
  { img: IMG.w5, couple: 'Riya & Aditya', place: 'W Goa', size: 'lg' },
  { img: IMG.w6, couple: 'Meera & Vikram', place: 'Sofitel · BKC', size: 'md' },
  { img: IMG.w9, couple: 'Sanaya & Dev', place: 'Hyatt · Andheri', size: 'sm' },
  { img: IMG.w11, couple: 'Kavya & Yash', place: 'Umaid Bhawan · Jodhpur', size: 'lg' },
]

function Portfolio({ onOpen }) {
  const [portfolio, setPortfolio] = useState(PORTFOLIO)

  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    fetch(`${backend}/api/media?slot=weddings-gallery`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = (data?.items || []).filter((i) => i.secure_url).map((i, idx) => {
          const defaultItem = PORTFOLIO[idx] || {}
          return {
            img: i.secure_url,
            couple: i.alt || defaultItem.couple || `Wedding ${idx + 1}`,
            place: defaultItem.place || 'PK Photography',
            size: defaultItem.size || (['lg', 'md', 'sm'][idx % 3]),
            _uploaded: true,
          }
        })
        if (items.length) setPortfolio(items)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="relative py-24 md:py-32 bg-[#F5EFE6]">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow mb-3">Selected Weddings</div>
            <h2 className="display text-4xl md:text-6xl">Real couples, <span className="font-cormorant italic text-[#FF5B22] font-light">real stories.</span></h2>
          </div>
          <Link href="/gallery?category=weddings" className="inline-flex items-center gap-2 text-sm font-semibold text-[#161514] hover:text-[#FF5B22]">View full archive <ArrowRight size={14} /></Link>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
          {portfolio.map((p, i) => {
            return (
              <motion.button
                key={i}
                onClick={() => onOpen(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.06 }}
                className="group relative block w-full mb-4 md:mb-5 break-inside-avoid overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={`${p.couple} wedding at ${p.place} in candid cinematic style, Mumbai & Goa`} loading="lazy" className="w-full h-auto block transition-transform [transition-duration:1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/85 via-[#161514]/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-left text-white">
                  <div className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    <div className="text-[10px] tracking-[0.28em] uppercase text-[#67E8F9] flex items-center gap-2"><MapPin size={11} /> {p.place}</div>
                  </div>
                  <div className="display text-xl md:text-2xl mt-2">{p.couple}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">Open story <ArrowUpRight size={11} /></div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Wedding Films ---------- */
function WeddingFilms({ onPlay }) {
  const films = [
    { t: 'The Vows · Rohit &amp; Rasmi', dur: '02:01', img: IMG.w1 },
    { t: 'A Marathi Morning', dur: '03:22', img: IMG.w6 },
    { t: 'By the Arabian Sea', dur: '04:11', img: IMG.w5 },
    { t: 'Baraat &amp; Beyond', dur: '02:45', img: IMG.w11 },
  ]
  return (
    <section className="relative py-24 md:py-32 bg-[#FDFBF7]">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow mb-3">Wedding Films</div>
            <h2 className="display text-4xl md:text-6xl">Cinematic <span className="font-cormorant italic text-[#FF5B22] font-light">stories.</span></h2>
          </div>
          <p className="max-w-sm text-[#8A857D]">The closest thing to being back at your wedding. Press play, and step inside.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {films.map((f, i) => (
            <motion.button key={i} onClick={onPlay} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.1 }} className="group relative aspect-[16/10] rounded-3xl overflow-hidden shadow-lg text-left">
              <Image src={f.img} alt={`${f.t} at wedding venue in cinematic film style, Mumbai & Goa`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform [transition-duration:1400ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/85 via-[#161514]/20 to-transparent" />
              <div className="absolute inset-0 grid place-content-center">
                <motion.span whileHover={{ scale: 1.1 }} className="w-20 h-20 rounded-full bg-[#EEEAE1]/95 backdrop-blur text-[#161514] grid place-content-center shadow-2xl">
                  <Play size={26} fill="#161514" className="ml-1" />
                </motion.span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <div className="text-[10px] tracking-[0.28em] uppercase text-[#67E8F9]">Wedding Film · PK Photography</div>
                  <h3 className="display text-2xl md:text-3xl mt-1" dangerouslySetInnerHTML={{__html: f.t}} />
                </div>
                <span className="text-xs font-semibold bg-[#EEEAE1]/20 backdrop-blur border border-white/20 px-3 py-1.5 rounded-full">{f.dur}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Why Us - editorial storytelling ---------- */
function WhyUs() {
  const blocks = [
    { t: 'Storytellers, not just shooters', d: 'A close-knit family of photographers and cinematographers who have quietly witnessed a thousand weddings. We do not just click — we listen, we anticipate, we belong to your day.', img: IMG.w2 },
    { t: 'Films that feel like love letters', d: 'Your wedding film is scored, paced and colour-graded like a short feature. Music that matches your emotions, edits that breathe, moments that linger.', img: IMG.w5 },
    { t: 'Every photograph, hand-finished', d: 'Nothing leaves our studio without individual attention — colour, skin, mood, light. Your album will look like it belongs on a coffee table.', img: IMG.w7 },
    { t: 'Held safely, delivered on time', d: 'Your memories are backed up the same night, sneak-peeks reach you within 48 hours, and every deliverable arrives when we promised it would.', img: IMG.w9 },
    { t: 'Wherever love takes you', d: 'From Marine Drive to Mandvi, from a Malabar Hill terrace to a Goa beach or a Jaipur palace — if your wedding is happening, we will be there.', img: IMG.w11 },
  ]
  return (
    <section className="relative py-24 md:py-32 bg-[#F5EFE6]">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 mb-14 md:mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow mb-4">Why Couples Choose Us</div>
          <h2 className="display text-4xl md:text-6xl">Chosen with <span className="font-cormorant italic text-[#FF5B22] font-light">care.</span></h2>
        </div>
      </div>
      <div className="space-y-20 md:space-y-28">
        {blocks.map((b, i) => (
          <WhyBlock key={i} block={b} idx={i} />
        ))}
      </div>
    </section>
  )
}

function WhyBlock({ block, idx }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const isLeft = idx % 2 === 0
  return (
    <div ref={ref} className="container mx-auto max-w-[1200px] px-6 md:px-10">
      <div className={`grid grid-cols-12 gap-8 md:gap-16 items-center ${isLeft ? '' : 'lg:[direction:rtl]'}`}>
        <motion.div initial={{ opacity: 0, x: isLeft ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }} className="col-span-12 lg:col-span-5 [direction:ltr]">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#FF5B22] font-bold">Reason {String(idx + 1).padStart(2, '0')}</div>
          <h3 className="display text-4xl md:text-5xl mt-3">{block.t}</h3>
          <p className="mt-5 text-lg text-[#8A857D] leading-relaxed">{block.d}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.15 }} className="col-span-12 lg:col-span-7 [direction:ltr]">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
            <Image src={block.img} alt={`${block.t} at Mumbai or Goa wedding setting in premium editorial style, Mumbai & Goa`} fill sizes="700px" className="object-cover" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- Deliverables ---------- */
function Deliverables() {
  const items = [
    { t: 'Edited Candid & Traditional Photographs', d: 'All edited, hand-selected and colour-graded high-resolution stills capturing every emotion and ritual.', img: IMG.w1 },
    { t: 'Private Online Gallery', d: 'A private, secure online gallery to relive, download and share your wedding for a lifetime.', img: IMG.w4 },
    { t: 'Cinematic Highlight Film', d: 'A professionally edited 3–5 minute cinematic film telling your story through carefully chosen moments and music.', img: IMG.w6 },
    { t: 'Traditional Full Wedding Film', d: 'Complete documentary coverage of every ceremony, ritual and family moment without missing anything.', img: IMG.w8 },
    { t: 'Pen Drive + Luxury Printed Album', d: 'Premium luxury printed album on archival paper plus a beautifully-packaged pen drive of all raw and edited files.', img: IMG.w10 },
  ]
  return (
    <section className="relative py-24 md:py-32 bg-[#FDFBF7]">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Divider />
          <div className="eyebrow mb-4 mt-8">What You Take Home</div>
          <h2 className="display text-4xl md:text-6xl">Everything to preserve <span className="font-cormorant italic text-[#FF5B22] font-light">your memories.</span></h2>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {items.map((it, i) => {
            const span = i === 0 ? 'col-span-12 md:col-span-8 aspect-[16/9]' : i === 1 ? 'col-span-12 md:col-span-4 aspect-[4/5]' : i === 2 ? 'col-span-12 md:col-span-4 aspect-[4/5]' : i === 3 ? 'col-span-12 md:col-span-4 aspect-[4/5]' : 'col-span-12 md:col-span-4 aspect-[4/5]'
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: (i % 3) * 0.06 }} className={`group relative overflow-hidden rounded-3xl ${span}`}>
                <Image src={it.img} alt={`${it.t} at wedding preparation setting in luxury editorial style, Mumbai & Goa`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform [transition-duration:1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/95 via-[#161514]/40 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                  <div className="w-11 h-11 rounded-xl bg-[#FF5B22] grid place-content-center mb-4"><Check size={18} /></div>
                  <h3 className="display text-2xl md:text-3xl leading-tight">{it.t}</h3>
                  <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-md">{it.d}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Pricing ---------- */
const TIERS = [
  { name: 'Standard', tag: 'For the intimate, unhurried celebration.', price: '₹80,000', original: '₹1,20,000', save: 'Save 33%', f: ['2 Photographers', '2 Videographers', 'Drone Cinematography', 'All Edited Photos', 'Traditional Wedding Film', 'Online Gallery', 'Pen Drive', 'Luxury Printed Album'], featured: false },
  { name: 'Premium', tag: 'Our most-chosen — the balance of story and completeness.', price: '₹1,20,000', original: '₹1,80,000', save: 'Save 33%', badge: 'Most Chosen', f: ['2 Photographers', '2 Videographers', 'Drone Cinematography', 'All Edited Photos', '8–10 Minute Cinematic Film', 'Traditional Film', 'Pre-Wedding Consultation', 'Online Gallery', 'Premium Printed Album'], featured: true },
  { name: 'Luxury', tag: 'For the wedding that unfolds over days, not hours.', price: '₹2,00,000', original: '₹2,80,000', save: 'Save 28%', f: ['3 Photographers', '2 Videographers', 'Multi-Day Coverage', 'Drone Cinematography', 'All Edited Photos', '12–15 Minute Cinematic Feature Film', 'Half-Day Pre-Wedding Shoot', 'Online Gallery', 'Hardcover Luxury Album'], featured: false },
]

function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-[#F5EFE6]">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Divider />
          <div className="eyebrow mb-4 mt-8">Wedding Packages</div>
          <h2 className="display text-4xl md:text-6xl">Investment in <span className="font-cormorant italic text-[#FF5B22] font-light">forever.</span></h2>
          <p className="mt-5 text-[#8A857D]">Every package is built around real weddings we’ve documented. Choose one, or write to us and we’ll compose something for yours alone.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative rounded-[28px] p-8 md:p-10 transition-all hover:-translate-y-1 flex flex-col ${t.featured ? 'bg-gradient-to-b from-[#161514] to-[#111827] text-white shadow-2xl md:-mt-6 md:mb-6 ring-1 ring-[#FF5B22]/40' : 'bg-[#EEEAE1] border border-[#DBD4C6] hover:border-[#FF5B22] shadow-sm'}`}>
              {t.badge && <div className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase bg-[#FF5B22] text-white px-3 py-1.5 rounded-full">{t.badge}</div>}

              <div className={`text-[11px] font-bold tracking-[0.28em] uppercase ${t.featured ? 'text-[#67E8F9]' : 'text-[#FF5B22]'}`}>{t.name}</div>
              <p className={`mt-2 text-sm ${t.featured ? 'text-white/70' : 'text-[#8A857D]'}`}>{t.tag}</p>

              <div className="mt-6">
                <div className={`text-xs mb-1 ${t.featured ? 'text-white/60' : 'text-[#8A857D]'}`}>Starting at</div>
                <div className="flex items-baseline gap-3">
                  <span className="display text-5xl">{t.price}</span>
                  <span className={`text-sm line-through ${t.featured ? 'text-white/40' : 'text-[#8A857D]'}`}>{t.original}</span>
                </div>
                <div className={`mt-1 inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${t.featured ? 'bg-[#FF5B22]/20 text-[#67E8F9]' : 'bg-[#F3E4DC] text-[#E24A12]'}`}>{t.save}</div>
              </div>

              <ul className={`mt-8 space-y-3 flex-1 ${t.featured ? 'border-t border-white/10' : 'border-t border-[#DBD4C6]'} pt-6`}>
                {t.f.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <span className={`w-5 h-5 rounded-full grid place-content-center shrink-0 mt-0.5 ${t.featured ? 'bg-[#FF5B22] text-white' : 'bg-[#F3E4DC] text-[#FF5B22]'}`}><Check size={11} /></span>
                    <span className={t.featured ? 'text-white/90' : 'text-[#161514]'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-sm transition-colors ${t.featured ? 'bg-[#EEEAE1] text-[#161514] hover:bg-[#FF5B22] hover:text-white' : 'bg-[#161514] text-white hover:bg-[#FF5B22]'}`}>
                <MessageCircle size={14} /> Enquire on WhatsApp
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[#8A857D] max-w-2xl mx-auto italic">Travel within Mumbai is included in all packages. Destination weddings across Goa, Jaipur, Udaipur, Delhi &amp; the rest of India are quoted separately with transparent travel &amp; stay costs.</p>
      </div>
    </section>
  )
}

/* ---------- Add-ons horizontal scroll ---------- */
const ADDONS = [
  { t: 'Live Streaming', p: 'From ₹25,000', d: 'HD private live streaming for family across the world.' },
  { t: 'Instant Photobooth', p: 'From ₹35,000', d: 'Luxury instant prints with custom branding.' },
  { t: 'Wedding Website', p: 'From ₹15,000', d: 'Beautiful personalised wedding website with RSVP, schedule and your love story.' },
  { t: 'Same-Day Edit', p: 'From ₹40,000', d: 'A cinematic teaser delivered during your reception.' },
  { t: 'LED Wall Live Feed', p: 'From ₹25,000', d: 'Live projection of the ceremony for large venues.' },
  { t: 'Couple Interview Film', p: 'From ₹20,000', d: 'Tell your love story in your own words before the wedding day.' },
  { t: 'Extra Crew (per day)', p: 'From ₹15,000', d: 'Additional photographer, videographer or drone crew for larger weddings.' },
  { t: 'Custom Experiences', p: 'On request', d: 'Aerial reveals, sparkler exits, luxury album upgrades and custom requests.' },
]

function AddOns() {
  return (
    <section className="relative py-24 md:py-32 bg-[#FDFBF7] overflow-hidden">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-3">Elevate Your Day</div>
            <h2 className="display text-4xl md:text-6xl">Bespoke <span className="font-cormorant italic text-[#FF5B22] font-light">add-ons.</span></h2>
          </div>
          <p className="max-w-sm text-[#8A857D]">Little indulgences that turn a beautiful wedding into an unforgettable one. Slide across &rarr;</p>
        </div>
      </div>
      <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">
        <div className="flex gap-5 px-6 md:px-14 pb-6">
          {ADDONS.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.06 }} className="snap-start shrink-0 w-[300px] md:w-[360px] rounded-3xl bg-gradient-to-b from-[#EFE9DE] to-[#EEEAE1] border border-[#DBD4C6] p-7 hover:border-[#FF5B22] hover:shadow-xl transition-all">
              <div className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#FF5B22]">Add-on {String(i + 1).padStart(2, '0')}</div>
              <h3 className="display text-2xl mt-3">{a.t}</h3>
              <div className="mt-2 text-lg font-semibold text-[#161514]">{a.p}</div>
              <p className="mt-4 text-sm text-[#8A857D] leading-relaxed">{a.d}</p>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22] link-underline">Ask about this <ArrowRight size={13} /></a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    { n: 'Ananya & Rohan', role: 'Wedding · Taj Land\'s End, Mumbai', img: IMG.w3, q: 'PK Photography didn\'t just photograph our wedding — they preserved a feeling. Every frame is a memory we can walk back into.' },
    { n: 'Priya & Arjun', role: 'Destination · Fairmont, Jaipur', img: IMG.w6, q: 'The most considered, elegant wedding team we\'ve worked with. Every ritual felt seen, every moment felt held.' },
    { n: 'Meera & Vikram', role: 'Wedding · Sofitel BKC', img: IMG.w2, q: 'Ten years from now, this is still what we\'ll be showing our children. Absolutely unmatched storytelling.' },
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % items.length), 8000)
    return () => clearInterval(t)
  }, [items.length])
  return (
    <section className="relative py-24 md:py-32 bg-[#161514] text-white overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.28), transparent 60%)', filter: 'blur(80px)' }} />
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <div className="text-center mb-14">
          <div className="text-[10px] tracking-[0.28em] uppercase text-[#67E8F9] mb-3 font-bold">From the couples</div>
          <h2 className="display text-4xl md:text-6xl">Words from our <span className="font-cormorant italic text-[#FF5B22] font-light">couples.</span></h2>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, ease: [0.7,0,0.2,1] }} className="grid grid-cols-12 gap-8 md:gap-14 items-center max-w-5xl mx-auto">
            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image src={items[i].img} alt={`${items[i].n} wedding client portrait at Mumbai or Goa venue in candid style, Mumbai & Goa`} fill sizes="400px" className="object-cover" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="flex items-center gap-1 mb-6">{[...Array(5)].map((_, k) => <Star key={k} size={16} className="fill-[#FF5B22] text-[#FF5B22]" />)}</div>
              <blockquote className="display text-2xl md:text-4xl leading-[1.2] font-normal italic">&ldquo;{items[i].q}&rdquo;</blockquote>
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="text-lg font-semibold">{items[i].n}</div>
                <div className="text-sm text-white/60 mt-1">{items[i].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-center gap-2 mt-12">
          {items.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k+1}`} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-12 bg-[#FF5B22]' : 'w-6 bg-[#EEEAE1]/20 hover:bg-[#EEEAE1]/40'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Mumbai + Goa SEO section ---------- */
function MumbaiSection() {
  const cities = ['Andheri', 'Bandra', 'Juhu', 'BKC', 'South Mumbai', 'Fontainhas', 'Vagator', 'Palolem', 'Agonda', 'Chapora']
  return (
    <section className="relative py-24 md:py-32 bg-[#FDFBF7] overflow-hidden">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="col-span-12 lg:col-span-7">
            <div className="eyebrow mb-4">Wedding Photography Across Mumbai &amp; Goa</div>
            <h2 className="display text-4xl md:text-6xl leading-[1.05]">Mumbai &amp; Goa&apos;s trusted <span className="font-cormorant italic text-[#FF5B22] font-light">wedding photographer.</span></h2>
            <p className="mt-8 text-lg text-[#8A857D] leading-relaxed max-w-xl">
              Mumbai is home and Goa is one of our most-requested destination wedding settings. PK Photography has quietly documented over a thousand weddings and events across grand five-star mandaps in Juhu and Andheri, intimate rooftop ceremonies in Bandra and South Mumbai, and coastal celebrations around Fontainhas, Vagator, Palolem, Agonda and Chapora. If your wedding is in Mumbai or Goa, we plan around the light, weather and ritual flow before the day begins.
            </p>
            <p className="mt-4 text-[#8A857D] leading-relaxed max-w-xl">
              And when you take your wedding somewhere else — a beach in Goa, a haveli in Jaipur, a backwater in Kerala, or anywhere your story is happening — we come with you. Every destination wedding is planned with the same warmth as a Mumbai celebration and the polish of a luxury editorial production.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {cities.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#161514] bg-[#EFE9DE] border border-[#F3E4DC] px-3 py-1.5 rounded-full"><MapPin size={11} className="text-[#FF5B22]" /> {c}</span>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src={IMG.w5} alt="Destination wedding couple at Goa beach venue in cinematic editorial style, Goa" fill sizes="300px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-[9px] tracking-widest uppercase text-[#67E8F9]">Destination</div>
                <div className="text-sm font-bold">Goa</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden mt-8">
              <Image src={IMG.w1} alt="Luxury wedding ceremony at Mumbai venue in candid editorial style, Mumbai" fill sizes="300px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-[9px] tracking-widest uppercase text-[#67E8F9]">Base</div>
                <div className="text-sm font-bold">Mumbai</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src={IMG.w11} alt="Destination wedding venue aerial in cinematic style, Mumbai & Goa" fill sizes="300px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-[9px] tracking-widest uppercase text-[#67E8F9]">Destination</div>
                <div className="text-sm font-bold">Jaipur</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative aspect-[4/5] rounded-2xl overflow-hidden mt-8">
              <Image src={IMG.w9} alt="Wedding celebration at destination venue in luxury editorial style, Mumbai & Goa" fill sizes="300px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-[9px] tracking-widest uppercase text-[#67E8F9]">Pan India</div>
                <div className="text-sm font-bold">Everywhere</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: 'How early should we book our wedding?', a: 'We recommend booking 3–6 months in advance for the best dates, especially between October and March. For destination weddings and multi-day events, earlier is always better. For short-notice weddings, WhatsApp us and we\'ll try our best to accommodate.' },
    { q: 'Do you travel outside Mumbai?', a: 'Absolutely. We\'ve shot destination weddings in Goa, Jaipur, Udaipur, Delhi, Kerala and abroad. Travel within Goa is included in all packages. Destination weddings outside Goa are quoted separately with transparent travel and stay costs.' },
    { q: 'What is included in each package?', a: 'Every package includes a full crew (photographers, videographers, drone as applicable), edited photos, an online private gallery, pen drive delivery and a luxury printed album. Premium and Luxury tiers add cinematic films, pre-wedding consultations and multi-day coverage. See the pricing section for a detailed breakdown.' },
    { q: 'How long does delivery take?', a: 'Sneak-peek within 48 hours, full edited photos in 3–4 weeks, and the cinematic film in 6–8 weeks. Traditional full-length films are delivered within 8 weeks. Rush delivery is available on request.' },
    { q: 'Do you provide raw files?', a: 'Yes — every package includes all unedited raw photos and video footage on a pen drive and via a cloud drive link, alongside the fully-edited final deliverables.' },
    { q: 'Can we customise packages?', a: 'Of course. Every wedding is different, and we build custom scopes for cultural specifics, multi-day timelines, additional crew, drone add-ons and luxury album upgrades. Share your brief on WhatsApp and we\'ll respond within a few hours.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <section className="py-24 md:py-32 bg-[#F5EFE6]">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 md:col-span-4">
            <div className="eyebrow mb-3">Common Questions</div>
            <h2 className="display text-4xl md:text-5xl">You&apos;ve <span className="font-cormorant italic text-[#FF5B22] font-light">wondered.</span><br /> We&apos;ve <span className="font-cormorant italic text-[#FF5B22] font-light">answered.</span></h2>
            <p className="mt-6 text-[#8A857D]">Something else on your mind? Message us on WhatsApp and we&apos;ll reply within the hour.</p>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22]"><MessageCircle size={16} /> Chat on WhatsApp</a>
          </div>
          <div className="col-span-12 md:col-span-8">
            {items.map((f, i) => (
              <div key={i} className="border-b border-[#DBD4C6]">
                <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between py-6 text-left gap-6">
                  <span className="text-lg md:text-xl font-semibold pr-4">{f.q}</span>
                  <span className={`w-10 h-10 rounded-full grid place-content-center shrink-0 transition-all ${open === i ? 'bg-[#FF5B22] text-white rotate-45' : 'bg-[#EEEAE1] border border-[#DBD4C6] text-[#161514]'}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                      <p className="pb-6 text-[#8A857D] leading-relaxed max-w-2xl">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative min-h-[80svh] flex items-center overflow-hidden bg-[#161514]">
      <div className="absolute inset-0">
        <Image src={IMG.w3} alt="Couple booking wedding photography at Mumbai or Goa venue in candid cinematic style, Mumbai & Goa" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161514]/70 via-[#161514]/60 to-[#161514]/95" />
      </div>
      <div className="relative container mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 text-center text-white">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[10px] tracking-[0.4em] uppercase text-[#67E8F9] mb-6">One last thought</motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="display text-5xl md:text-7xl lg:text-[7vw] leading-[0.98] max-w-5xl mx-auto">
          Your wedding happens <span className="font-cormorant italic text-[#FF5B22] font-light">once.</span><br />The memories should last <span className="font-cormorant italic text-[#FF5B22] font-light">forever.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-10 max-w-2xl mx-auto text-white/80 text-lg leading-relaxed">
          Whether you&apos;re planning a luxury celebration in Mumbai or a destination wedding anywhere in India, our team is ready to tell your story through timeless photography and cinematic films.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="/booking" className="group inline-flex items-center gap-3 bg-[#EEEAE1] text-[#161514] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#FF5B22] hover:text-white transition-colors">
            Book Your Wedding <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#EEEAE1]/10 backdrop-blur border border-white/25 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#25D366] hover:border-[#25D366] transition-colors">
            <MessageCircle size={16} /> Talk on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Video Lightbox ---------- */
function VideoModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-sm grid place-content-center p-4">
          <motion.div initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-[min(92vw,1200px)] aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe src="https://www.youtube-nocookie.com/embed/22SExhaXwi0?autoplay=1&rel=0&modestbranding=1" title="PK Photography Wedding Film" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="absolute inset-0 w-full h-full" />
          </motion.div>
          <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur text-white grid place-content-center hover:bg-[#EEEAE1]/20"><X size={20} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Image Lightbox ---------- */
function ImageLightbox({ index, images, onClose, onNav }) {
  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onNav])
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-sm grid place-content-center p-4">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-[min(92vw,1100px)] aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image src={images[index].img} alt={`${images[index].couple} wedding at ${images[index].place} in candid cinematic style, Mumbai & Goa`} fill sizes="1100px" className="object-cover" priority />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 to-transparent">
              <div className="text-[10px] tracking-widest uppercase text-[#67E8F9] flex items-center gap-2"><MapPin size={11} /> {images[index].place}</div>
              <div className="display text-2xl text-white mt-1">{images[index].couple}</div>
              <div className="text-xs text-white/60 mt-1">Frame {index + 1} / {images.length}</div>
            </div>
          </motion.div>
          <button onClick={() => onNav(-1)} aria-label="Previous" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur border border-white/20 text-white grid place-content-center hover:bg-[#EEEAE1]/20"><ArrowLeft size={18} /></button>
          <button onClick={() => onNav(1)} aria-label="Next" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur border border-white/20 text-white grid place-content-center hover:bg-[#EEEAE1]/20"><ArrowRight size={18} /></button>
          <button onClick={onClose} aria-label="Close" className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur text-white grid place-content-center hover:bg-[#EEEAE1]/20"><X size={20} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Sticky Enquire ---------- */
function StickyEnquire() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const s = () => setShow(window.scrollY > 900)
    s(); window.addEventListener('scroll', s); return () => window.removeEventListener('scroll', s)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] hidden md:flex">
          <div className="flex items-center gap-3 bg-[#161514] text-white rounded-full pl-5 pr-2 py-2 shadow-2xl border border-white/10">
            <div className="w-9 h-9 rounded-full bg-[#FF5B22] grid place-content-center"><Heart size={14} fill="white" /></div>
            <div className="text-xs leading-tight">
              <div className="text-white/60 text-[9px] uppercase tracking-widest">Ready when you are</div>
              <div className="font-semibold">Reserve your wedding date</div>
            </div>
            <Link href="/booking" className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-[#E24A12] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-colors">Enquire <ArrowRight size={12} /></Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function WeddingLocalSeoBlock() {
  const keywords = [
    'wedding photographer in Mumbai',
    'destination wedding photographer in Goa',
    'candid wedding photographer Mumbai',
    'cinematic wedding photography Mumbai',
    'luxury destination wedding photographer Goa',
    'wedding photography packages Mumbai',
  ]

  return (
    <section className="py-16 md:py-20 bg-[#EEEAE1] border-t border-[#DBD4C6]/50">
      <div className="container mx-auto max-w-[980px] px-6 md:px-10" data-testid="service-local-seo-copy">
        <h2 className="display text-2xl md:text-3xl text-[#161514] leading-[1.25] max-w-3xl">
          Wedding Photographer across Mumbai, North Goa and South Goa
        </h2>
        <div className="mt-6 space-y-5 text-[#4C4A46] text-[15px] leading-[1.85] font-light">
          <p>
            Wedding Photographer in Mumbai &amp; Goa is the core service PK Photography is known for: candid rituals, cinematic films, drone moments and premium editorial portraits planned with calm precision. From Bandra, Juhu and South Mumbai to Fontainhas, Vagator, Palolem, Agonda and Chapora, every celebration is mapped around light, venue movement, family priorities and weather backup.
          </p>
          <p>
            Mumbai weddings often need quick movement between home, hotel and reception spaces, while Goa destination weddings need coastal timing, resort permissions, humidity planning and sunset discipline. The team brings one coherent visual language across both cities, so your wedding album, teaser, full film and social-ready highlights feel consistent from haldi to reception.
          </p>
          <p>
            If you are comparing the best wedding photographer in Mumbai, a luxury destination wedding photographer in Goa, or clear wedding photography packages for Mumbai and Goa, start with real work in the gallery, review the pricing page, then reserve your date online.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/gallery?category=weddings" data-testid="service-internal-gallery-link" className="rounded-2xl border border-[#DBD4C6] bg-[#E6E1D5] p-4 text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
            View wedding gallery →
          </Link>
          <Link href="/pricing?category=weddings" data-testid="service-internal-pricing-link" className="rounded-2xl border border-[#DBD4C6] bg-[#E6E1D5] p-4 text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
            Compare wedding packages →
          </Link>
          <Link href="/booking" data-testid="service-internal-booking-link" className="rounded-2xl border border-[#DBD4C6] bg-[#161514] text-white p-4 text-sm font-semibold hover:bg-[#FF5B22] transition-colors">
            Book your wedding date →
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2" data-testid="service-keyword-tags">
          {keywords.map((keyword) => (
            <span key={keyword} className="text-[10px] tracking-[0.12em] uppercase text-[#8A857D] border border-[#DBD4C6] rounded-full px-3 py-1.5">{keyword}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WeddingsPage() {
  const [lightbox, setLightbox] = useState(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const [portfolioImages, setPortfolioImages] = useState(PORTFOLIO)

  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    fetch(`${backend}/api/media?slot=weddings-gallery`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = (data?.items || []).filter((i) => i.secure_url).map((i, idx) => {
          const d = PORTFOLIO[idx] || {}
          return { img: i.secure_url, couple: i.alt || d.couple || `Wedding ${idx + 1}`, place: d.place || 'PK Photography', size: d.size || (['lg','md','sm'][idx % 3]) }
        })
        if (items.length) setPortfolioImages(items)
      })
      .catch(() => {})
  }, [])

  return (
    <main className="bg-[#EEEAE1]">
      <ReadingProgress />
      <Hero onPlayFilm={() => setVideoOpen(true)} />
      <Storytelling />
      <ServiceBlocks />
      <JourneyTimeline />
      <Portfolio onOpen={(i) => setLightbox(i)} />
      <WeddingFilms onPlay={() => setVideoOpen(true)} />
      <WhyUs />
      <Deliverables />
      <Pricing />
      <AddOns />
      <Testimonials />
      <WeddingLocalSeoBlock />
      <MumbaiSection />
      <FAQ />
      <RelatedServices current="weddings" />
      <FinalCTA />

      <StickyEnquire />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <ImageLightbox
        index={lightbox}
        images={portfolioImages}
        onClose={() => setLightbox(null)}
        onNav={(d) => setLightbox((v) => (v + d + portfolioImages.length) % portfolioImages.length)}
      />
    </main>
  )
}

