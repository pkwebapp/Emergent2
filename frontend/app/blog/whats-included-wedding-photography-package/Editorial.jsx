'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Plus, Minus, ArrowRight, ArrowUpRight, MessageCircle,
  Camera, Video, Film, Plane, BookOpen, Radio, Sparkles, Check, QrCode, Clapperboard, Instagram,
  Calendar, Mail, Phone, User, Send, Loader2, CheckCircle2,
} from 'lucide-react'
import { useBlogInside } from '@/hooks/useMediaSlot'

const POST_ID = 'wedding-package'

const WHATSAPP = 'https://wa.me/+918888766739'

const TOC = [
  { id: 'candid', label: 'Candid', full: 'Candid Photography' },
  { id: 'traditional-photography', label: 'Traditional Photo', full: 'Traditional Photography' },
  { id: 'cinematic-videography', label: 'Cinematic Video', full: 'Cinematic Videography' },
  { id: 'traditional-videography', label: 'Traditional Video', full: 'Traditional Videography' },
  { id: 'drone', label: 'Drone', full: 'Drone Cinematography' },
  { id: 'albums', label: 'Albums', full: 'Album Prints & Design' },
  { id: 'live-streaming', label: 'Live Streaming', full: 'Live Streaming' },
  { id: 'add-ons', label: 'Add-ons', full: 'Add-On Services' },
  { id: 'faqs', label: 'FAQs', full: 'FAQs' },
]

const STATS = [
  { value: 12, suffix: '+', label: 'Years' },
  { value: 2000, suffix: '+', label: 'Projects' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 25, suffix: '+', label: 'Awards' },
]

const SERVICES = [
  {
    id: 'candid',
    n: '01',
    Icon: Camera,
    title: 'Candid Photography',
    tagline: 'The Unscripted Moments',
    image: '/wedding/emotions.jpg',
    alt: 'Unposed emotional candid reaction captured at a wedding by PK Photography',
    body: [
      'Candid photography is about catching real emotion before it disappears: your father’s face as he sees you ready, your best friend laughing mid-sentence, the quiet moment before the baraat starts.',
      'Our candid photographers work discreetly through the entire event, never staging or interrupting, so your gallery ends up full of moments you didn’t even know were captured.',
    ],
    included: [
      'Full-day discreet candid coverage across all functions',
      'Emotion-first storytelling shots — reactions, glances, tears, laughter',
      'Behind-the-scenes getting-ready coverage',
      'Guest and family candid moments, not just the couple',
    ],
    quote: 'The best photographs are the ones nobody posed for.',
    search: 'candid wedding photography Mumbai · candid vs traditional photos',
    link: '/services/weddings',
  },
  {
    id: 'traditional-photography',
    n: '02',
    Icon: Camera,
    title: 'Traditional Photography',
    tagline: 'The Timeless Records',
    image: '/wedding/rituals.jpg',
    alt: 'Traditional wedding ritual and formal ceremony photograph by PK Photography',
    body: [
      'While candid captures emotion, traditional photography captures the moments your family will want framed — the rituals, the formal couple portraits, the group shots with every relative accounted for.',
      'This is the archival backbone of your wedding album, and it’s non-negotiable for Indian weddings where ceremonies carry deep ritual significance.',
    ],
    included: [
      'Posed couple portraits in multiple setups and outfits',
      'Ritual-by-ritual documentation — varmala, saptapadi, sindoor',
      'Formal family and group photographs',
      'Detail shots: decor, mandap, jewellery, outfits, invitations',
    ],
    search: 'traditional wedding photography · wedding ritual photography Mumbai',
    link: '/services/weddings',
  },
  {
    id: 'cinematic-videography',
    n: '03',
    Icon: Film,
    title: 'Cinematic Videography',
    tagline: 'Your Wedding as a Film',
    image: '/wedding/corousal/img4.jpg',
    alt: 'Cinematic wedding film still frame shot by PK Photography videography team',
    image2: '/wedding/corousal/img7.jpg',
    alt2: 'Behind the scenes of a cinematic wedding videographer filming the couple',
    body: [
      'This is the highlight reel that makes people cry at your anniversary party. Our cinematic team shoots your wedding like a short film — think movement, music, colour grading, and storytelling arcs — rather than a flat recording of events.',
      'It’s the format most couples now prioritise, especially for Instagram-worthy trailers and highlight films.',
    ],
    included: [
      'Cinematic highlight film (3–6 min) with licensed music and colour grading',
      'Pre-wedding teaser / trailer (optional add-on)',
      'Multi-camera coverage of key moments — entry, vows, first dance',
      'Slow-motion and creative b-roll of venue and details',
    ],
    quote: 'A film you’ll still be watching on your tenth anniversary.',
    search: 'cinematic wedding videography Mumbai · wedding highlight film cost',
    link: '/services/weddings',
  },
  {
    id: 'traditional-videography',
    n: '04',
    Icon: Video,
    title: 'Traditional Videography',
    tagline: 'The Complete Record',
    image: '/wedding/corousal/img9.jpg',
    alt: 'Multi-camera traditional wedding videography setup by PK Photography',
    body: [
      'Not every family wants an edited-down highlight reel — many want the full, unedited ceremony recorded start to finish, especially for relatives who couldn’t attend or for religious archival purposes.',
      'Our traditional videography runs parallel to the cinematic team, so nothing is missed.',
    ],
    included: [
      'Full, uncut ceremony recordings',
      'Multi-angle fixed and handheld coverage',
      'Complete speech and ritual documentation',
      'Raw footage handover option (on request)',
    ],
    search: 'full wedding video recording Mumbai · traditional wedding videography package',
    link: '/services/weddings',
  },
  {
    id: 'drone',
    n: '05',
    Icon: Plane,
    title: 'Drone Cinematography & Photography',
    tagline: 'The Big-Picture View',
    image: '/wedding/preWedding.jpg',
    alt: 'Aerial drone wedding photograph of an outdoor venue in Goa by PK Photography',
    body: [
      'Whether it’s a rooftop Mumbai wedding or a beachfront Goa ceremony, aerial coverage adds a scale and grandeur that ground-level shots simply can’t.',
      'Drone footage has become one of the most requested add-ons for destination and outdoor weddings.',
    ],
    included: [
      'Licensed drone pilot and equipment',
      'Aerial venue establishing shots',
      'Sky-view coverage of processions, mandap and outdoor ceremonies',
      'Drone photography stills for album and social use',
    ],
    quote: 'Some moments only make sense from a hundred feet up.',
    search: 'drone wedding photography Goa · aerial wedding videography Mumbai',
    link: '/services/drone-services',
  },
  {
    id: 'albums',
    n: '06',
    Icon: BookOpen,
    title: 'Album Prints & Design',
    tagline: 'Your Story, Bound Forever',
    image: '/wedding/reception.jpg',
    alt: 'Close-up of a premium printed wedding album designed by PK Photography',
    body: [
      'Digital galleries are great, but nothing replaces a physical album your grandparents can hold. We handle end-to-end album design — curating the best shots, laying out spreads that flow like a story, and printing on premium archival-quality material.',
    ],
    included: [
      'Professional album curation and layout design',
      'Premium print material — leather-bound, acrylic or linen options',
      'Parent albums and mini albums (optional add-on)',
      'Unlimited design revisions before final print',
    ],
    search: 'wedding album design Mumbai · premium wedding photo album printing',
    link: '/services/weddings',
  },
  {
    id: 'live-streaming',
    n: '07',
    Icon: Radio,
    title: 'Live Streaming',
    tagline: 'For the Guests Who Can’t Be There',
    image: '/wedding/engagement.jpg',
    alt: 'Professional multi-camera wedding live streaming setup at the venue by PK Photography',
    body: [
      'For NRI families or guests unable to travel, live streaming has gone from a “nice to have” to an expected service, especially post-2020.',
      'We set up a professional multi-camera live feed so no one misses the vows, even from another continent.',
    ],
    included: [
      'Multi-camera professional live stream setup',
      'Stable high-quality feed — YouTube, Zoom or private link',
      'Dedicated technician managing the stream throughout the event',
      'Recorded backup of the full stream',
    ],
    search: 'wedding live streaming service Mumbai · live stream wedding for NRI guests',
    link: '/services/live-streaming',
  },
]

const ADDONS = [
  {
    Icon: QrCode,
    title: 'QR Gallery Display',
    body: 'A QR code displayed at the venue lets guests instantly access and download event photos on their phones — no more “please send me the pics” messages weeks later.',
    image: '/wedding/corousal/img2.jpg',
    alt: 'QR code wedding gallery display card for guests to download photos',
  },
  {
    Icon: Clapperboard,
    title: 'Same-Day Edit (SDE)',
    body: 'A short, beautifully edited video compiled and played the same evening at the reception — capturing the day’s emotion while it’s still fresh, often the most memorable part of the night.',
    image: '/wedding/corousal/img6.jpg',
    alt: 'Same-day edit wedding video screening at a reception by PK Photography',
  },
  {
    Icon: Instagram,
    title: 'Reels & Social Content',
    body: 'Vertical, Instagram-ready reels edited with trending audio and quick cuts, formatted for Reels and Stories so your wedding content performs well online, not just in a private album.',
    image: '/wedding/corousal/img11.jpg',
    alt: 'Vertical Instagram wedding reel edited by PK Photography social team',
  },
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
      {n.toLocaleString('en-IN')}{suffix}
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
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

/* ---------------- Service (zig-zag) section ---------------- */
function ServiceSection({ s, reverse }) {
  return (
    <section id={s.id} className="scroll-mt-28 py-16 md:py-28">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
          {/* Media */}
          <div className={`${reverse ? 'md:[direction:ltr]' : ''}`}>
            <Reveal y={40}>
              {s.image2 ? (
                <div className="relative">
                  <ParallaxImage src={s.image} alt={s.alt} className="aspect-[4/5] rounded-[4px]" />
                  <div className="absolute -bottom-10 -right-4 w-2/5 aspect-square rounded-[4px] overflow-hidden ring-8 ring-[#EEEAE1] shadow-2xl hidden md:block">
                    <Image src={s.image2} alt={s.alt2 || s.alt} fill sizes="20vw" className="object-cover" loading="lazy" />
                  </div>
                </div>
              ) : (
                <ParallaxImage src={s.image} alt={s.alt} className="aspect-[4/5] rounded-[4px]" />
              )}
            </Reveal>
          </div>

          {/* Text */}
          <div className={`${reverse ? 'md:[direction:ltr]' : ''}`}>
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-cormorant text-5xl md:text-6xl leading-none text-[#FF5B22]">{s.n}</span>
                <span className="h-px flex-1 bg-[#DBD4C6]" />
                <s.Icon size={22} className="text-[#8A857D]" strokeWidth={1.5} />
              </div>
              <p className="eyebrow mb-3">{s.tagline}</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514] mb-6">
                {s.title}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed text-[#4a463f] mb-4 max-w-xl">{p}</p>
              ))}

              {s.quote && (
                <blockquote className="my-8 pl-6 border-l-2 border-[#FF5B22]">
                  <p className="font-cormorant italic text-2xl md:text-3xl leading-snug text-[#161514]">“{s.quote}”</p>
                </blockquote>
              )}

              <p className="eyebrow mb-4 mt-8">What’s included</p>
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

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={s.link}
                  data-testid={`service-link-${s.id}`}
                  className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[#161514] hover:text-[#FF5B22] transition-colors"
                >
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
              data-testid={`faq-toggle-${i}`}
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

/* ---------------- Related reads ---------------- */
const RELATED = [
  {
    chip: 'Editorial',
    title: 'Capturing Elegance: A Timeless Portrait in Festive Wear',
    excerpt: 'A behind-the-scenes look at how we shape light, colour and mood for a traditional bridal portrait.',
    image: '/wedding/bridalPortrait.jpg',
    alt: 'Bridal portrait editorial by PK Photography',
    href: '/blogs/capturing-elegance-a-timeless-portrait-of-tanya-in-traditional-indian-festive-wear',
  },
  {
    chip: 'Guide',
    title: 'Planning a Destination Wedding in Goa',
    excerpt: 'From beachfront ceremonies to drone-friendly venues — what to know before booking coverage.',
    image: '/wedding/preWedding.jpg',
    alt: 'Destination wedding couple photographed in Goa by PK Photography',
    href: '/services/weddings',
  },
  {
    chip: 'Pricing',
    title: 'Wedding Package Pricing & Inclusions',
    excerpt: 'See how candid, cinematic, drone and album coverage come together across our package tiers.',
    image: '/wedding/reception.jpg',
    alt: 'Wedding reception photograph representing PK Photography pricing packages',
    href: '/pricing',
  },
]

function RelatedReads() {
  return (
    <section className="py-16 md:py-24 bg-[#F3E4DC]/40 border-t border-[#DBD4C6]">
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="eyebrow mb-3">Keep Reading</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02] text-[#161514]">
                You Might Also Like
              </h2>
            </div>
            <Link
              href="/blogs"
              data-testid="related-view-all"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[#161514] hover:text-[#FF5B22] transition-colors"
            >
              View all articles <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {RELATED.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1} y={36}>
              <Link
                href={r.href}
                data-testid={`related-card-${i}`}
                className="group block h-full rounded-[4px] overflow-hidden bg-white border border-[#DBD4C6] lift"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image src={r.image} alt={r.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.16em] font-semibold bg-[#161514] text-white px-3 py-1.5 rounded-full">{r.chip}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-cormorant text-2xl leading-snug text-[#161514] mb-2 group-hover:text-[#E24A12] transition-colors">{r.title}</h3>
                  <p className="text-[#4a463f] leading-relaxed text-[15px] mb-4">{r.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF5B22]">
                    Read article <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Inline enquiry / quote form ---------------- */
const SERVICE_OPTIONS = [
  'Wedding Photography',
  'Wedding Videography',
  'Full Coverage (Photo + Video)',
  'Pre-Wedding Shoot',
  'Drone Coverage',
  'Live Streaming',
  'Other',
]

function EnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const required = ['name', 'email', 'phone', 'date', 'service']
    const missing = required.filter((k) => !String(form[k]).trim())
    if (missing.length) {
      setStatus('error')
      setError('Please fill in your name, email, phone, preferred date and service.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  const inputCls =
    'w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/45 text-sm focus:outline-none focus:border-[#FF5B22] focus:bg-white/[0.14] transition-colors'

  if (status === 'success') {
    return (
      <div data-testid="enquiry-success" className="rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md p-8 md:p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-[#FF5B22] grid place-content-center mx-auto mb-5">
          <CheckCircle2 size={26} className="text-white" />
        </div>
        <h3 className="font-cormorant text-3xl text-white mb-3">Thank you — we’ve got it.</h3>
        <p className="text-white/70 leading-relaxed max-w-sm mx-auto">
          Our team will reach out within 24 hours to plan your coverage. For anything urgent, message us on WhatsApp.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb757] text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <MessageCircle size={16} /> Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      data-testid="enquiry-form"
      className="rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-md p-6 md:p-8 text-left"
    >
      <p className="eyebrow mb-1 !text-[#FF7A4d]">Request a Quote</p>
      <h3 className="font-cormorant text-2xl md:text-3xl text-white mb-6 leading-tight">Tell us about your day</h3>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <input data-testid="enquiry-name" className={inputCls} placeholder="Your name" value={form.name} onChange={set('name')} />
        <input data-testid="enquiry-phone" type="tel" className={inputCls} placeholder="Phone" value={form.phone} onChange={set('phone')} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <input data-testid="enquiry-email" type="email" className={inputCls} placeholder="Email" value={form.email} onChange={set('email')} />
        <input data-testid="enquiry-date" type="date" className={`${inputCls} [color-scheme:dark]`} value={form.date} onChange={set('date')} />
      </div>
      <select data-testid="enquiry-service" className={`${inputCls} mb-3 ${form.service ? 'text-white' : '!text-white/45'}`} value={form.service} onChange={set('service')}>
        <option value="" className="text-[#161514]">Which coverage are you after?</option>
        {SERVICE_OPTIONS.map((s) => (
          <option key={s} value={s} className="text-[#161514]">{s}</option>
        ))}
      </select>
      <textarea data-testid="enquiry-message" rows={3} className={`${inputCls} mb-4 resize-none`} placeholder="Venue, city, guest count or anything else (optional)" value={form.message} onChange={set('message')} />

      {status === 'error' && (
        <p data-testid="enquiry-error" className="text-[#ffb59b] text-sm mb-4">{error}</p>
      )}

      <button
        type="submit"
        data-testid="enquiry-submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#FF5B22] hover:bg-[#E24A12] disabled:opacity-70 text-white font-semibold px-6 py-4 rounded-full transition-colors"
      >
        {status === 'loading' ? (<><Loader2 size={17} className="animate-spin" /> Sending…</>) : (<>Request My Quote <Send size={16} /></>)}
      </button>
      <p className="mt-3 text-[11px] text-white/45 text-center">We reply within 24 hours · No spam, ever.</p>
    </form>
  )
}

/* ================= PAGE ================= */
export default function Editorial({ faqs }) {
  const heroRef = useRef(null)
  const { scrollYProgress: pageProgress } = useScroll()
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.12])
  const heroTextY = useTransform(heroProgress, [0, 1], ['0%', '60%'])
  const heroFade = useTransform(heroProgress, [0, 0.8], [1, 0])

  const [active, setActive] = useState('candid')

  // Admin-managed inside images (ordered 1,2,3,4… via the "Sort order" field).
  const { pick } = useBlogInside(POST_ID)
  const services = SERVICES.map((s, i) => ({ ...s, image: pick(i + 1, s.image) }))

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

  const headline = ['What’s Included in Our', 'Wedding Photography', 'Package']

  return (
    <main className="bg-[#EEEAE1] text-[#161514]">
      {/* Top scroll progress */}
      <motion.div
        style={{ scaleX: pageProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF5B22] z-[95] origin-left"
      />

      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        data-transparent-header="true"
        data-testid="blog-hero-section"
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-end"
      >
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/wedding/cover.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/wedding/Wedding.mp4" type="video/mp4" />
          </video>
        </motion.div>
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/40 to-[#0d0c0b]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0b]/70 via-transparent to-transparent" />

        <motion.div style={{ y: heroTextY, opacity: heroFade }} className="relative z-10 w-full">
          <div className="container mx-auto max-w-[1400px] px-6 md:px-10 pb-20 md:pb-28">
            {/* breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/blogs" className="hover:text-white transition-colors">Blog</Link></li>
                <li aria-hidden>/</li>
                <li className="text-[#FF5B22]">Wedding Package Breakdown</li>
              </ol>
            </nav>

            <p className="eyebrow !text-[#FF7A4d] mb-5">The Complete Breakdown · Mumbai &amp; Goa</p>
            <h1 className="font-cormorant text-white text-[3rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[6.5rem] max-w-5xl">
              {headline.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block pb-[0.06em]"
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
              className="mt-7 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed"
            >
              Every side of your big day — candid emotion, cinematic drama, and the details that get missed if you blink.
            </motion.p>
          </div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          style={{ opacity: heroFade }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------- MOBILE TOC (sticky pill bar) ---------------- */}
      <div className="md:hidden sticky top-[60px] z-[70] bg-[#EEEAE1]/92 backdrop-blur-md border-y border-[#DBD4C6]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
          {TOC.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              data-testid={`toc-mobile-${t.id}`}
              className={`shrink-0 whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                active === t.id ? 'bg-[#161514] text-white border-[#161514]' : 'bg-transparent text-[#4a463f] border-[#DBD4C6]'
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>

      {/* ---------------- INTRO + TOC layout ---------------- */}
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="md:grid md:grid-cols-[1fr_260px] md:gap-16">
          {/* main column */}
          <div>
            {/* Intro */}
            <section className="py-16 md:py-24">
              <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <Reveal>
                  <p className="eyebrow mb-4">The Introduction</p>
                  <h2 className="font-cormorant text-3xl md:text-[2.75rem] leading-[1.06] mb-6 text-[#161514]">
                    Booking a wedding photographer shouldn’t feel like decoding a menu of confusing add-ons.
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f] mb-4">
                    At PK Photography, we’ve spent <strong className="text-[#161514]">12+ years and 2000+ weddings</strong> perfecting a coverage system that captures every side of your big day — the raw emotion, the traditional formality, the cinematic drama, and the small details that get missed if you blink.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-[#4a463f]">
                    Whether you’re planning a wedding in <strong className="text-[#161514]">Mumbai</strong> or a destination celebration in <strong className="text-[#161514]">Goa</strong>, here’s exactly what goes into our packages — and why each piece matters.
                  </p>
                </Reveal>
                <Reveal delay={0.15} y={40}>
                  <ParallaxImage
                    src="/wedding/bridalPortrait.jpg"
                    alt="Bridal portrait from a PK Photography wedding shoot in Mumbai"
                    priority
                    className="aspect-[4/5] rounded-[4px] shadow-2xl"
                  />
                </Reveal>
              </div>

              {/* Trust stats */}
              <Reveal delay={0.1}>
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-[#DBD4C6] pt-10">
                  {STATS.map((st) => (
                    <div key={st.label} className="text-center md:text-left">
                      <div className="font-cormorant text-4xl md:text-6xl text-[#161514] leading-none">
                        <Counter value={st.value} suffix={st.suffix} />
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#8A857D]">{st.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Service sections (zig-zag) */}
            <div className="divide-y divide-[#DBD4C6]/70">
              {services.map((s, i) => (
                <ServiceSection key={s.id} s={s} reverse={i % 2 === 1} />
              ))}
            </div>
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
                            on ? 'bg-[#FF5B22] border-[#FF5B22]' : 'bg-[#EEEAE1] border-[#CFC7B6]'
                          }`}
                        />
                        <a
                          href={`#${t.id}`}
                          data-testid={`toc-${t.id}`}
                          className={`block py-1.5 text-sm transition-colors ${
                            on ? 'text-[#161514] font-semibold' : 'text-[#8A857D] hover:text-[#161514]'
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

      {/* ---------------- ADD-ONS (3-col grid, full width) ---------------- */}
      <section id="add-ons" className="scroll-mt-28 py-16 md:py-28 bg-[#161514] text-white overflow-hidden">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-2xl mb-14">
              <span className="font-cormorant text-5xl md:text-6xl text-[#FF5B22] leading-none">08</span>
              <p className="eyebrow mt-4 mb-3 !text-[#FF7A4d]">The Details That Make It Modern</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.02]">Add-On Services</h2>
              <p className="mt-5 text-white/70 text-lg leading-relaxed">
                Beyond the core coverage, today’s weddings often need a few extra modern touches — smoother for guests, and content couples can actually use right away.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {ADDONS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.1} y={36}>
                <div className="group h-full flex flex-col rounded-[4px] overflow-hidden bg-white/[0.04] border border-white/10 lift">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={a.image} alt={a.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[#FF5B22] grid place-content-center text-white">
                      <a.Icon size={18} strokeWidth={1.8} />
                    </div>
                  </div>
                  <div className="p-7 flex-1">
                    <h3 className="font-cormorant text-2xl md:text-[1.7rem] mb-3">{a.title}</h3>
                    <p className="text-white/65 leading-relaxed">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[11px] uppercase tracking-[0.14em] text-white/40">
            same day edit wedding video · QR code wedding photo gallery · wedding reels video editor
          </p>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faqs" className="scroll-mt-28 py-16 md:py-28">
        <div className="container mx-auto max-w-[900px] px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">People Also Ask</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl leading-[1.02] text-[#161514]">
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq faqs={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- RELATED READS ---------------- */}
      <RelatedReads />

      {/* ---------------- FINAL CTA + INLINE ENQUIRY ---------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/wedding/corousal/img12.jpg" alt="PK Photography wedding coverage in Mumbai and Goa" fill sizes="100vw" className="object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[#0d0c0b]/85" />
        </div>
        <div className="relative container mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28 text-white">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: pitch */}
            <Reveal>
              <p className="eyebrow mb-5 !text-[#FF7A4d]">Let’s Begin</p>
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.02] mb-6">
                Ready to Plan Your Wedding Coverage?
              </h2>
              <p className="max-w-xl text-white/75 text-lg leading-relaxed mb-8">
                From candid emotion to cinematic drama, drone views to same-day edits — we bring every piece together so nothing about your day goes uncaptured. Share a few details and we’ll build a package around your celebration.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                data-testid="cta-whatsapp"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb757] text-white font-semibold px-7 py-4 rounded-full transition-colors"
              >
                <MessageCircle size={17} /> Prefer to chat? WhatsApp us
              </a>
              <div className="mt-8 flex items-center gap-6 text-sm">
                <Link href="/services/weddings" data-testid="cta-gallery" className="link-underline text-white/80 hover:text-white inline-flex items-center gap-1.5">
                  View Wedding Gallery <ArrowUpRight size={14} />
                </Link>
                <span className="text-white/30">·</span>
                <Link href="/pricing" data-testid="cta-pricing" className="link-underline text-white/80 hover:text-white inline-flex items-center gap-1.5">
                  See Pricing <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>

            {/* Right: inline enquiry form */}
            <Reveal delay={0.12} y={36}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
