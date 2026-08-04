'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  ChevronDown, ArrowRight, ArrowUpRight, Clock, Loader2, CheckCircle2, Instagram, Send,
} from 'lucide-react'
import { CATEGORIES, catColor, POSTS, EDITORS, SLIDES, INSTA_IMAGES } from './posts'

const INSTAGRAM = 'https://www.instagram.com/'
const WHATSAPP = 'https://wa.me/+918888766739'

/* ---------- reveal ---------- */
function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- category pill tag ---------- */
function Tag({ label, color, className = '' }) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white px-3 py-1.5 rounded-full ${className}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  )
}

/* ---------- big block card ---------- */
function StoryCard({ post, priority = false }) {
  const isExternal = post.image?.startsWith('http')
  const primaryCat = post.cats?.[0] || 'weddings'
  return (
    <Link href={post.href} data-testid={`story-card-${post.id}`} className="group block">
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[6px] bg-[#DBD4C6]">
        {isExternal ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            loading={priority ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            onError={(e) => { e.currentTarget.src = '/wedding/cover.jpg' }}
          />
        ) : (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <Tag label={post.category} color={catColor(primaryCat)} />
        </div>
      </div>
      <div className="pt-5">
        <h3 className="font-cormorant text-2xl md:text-[1.9rem] leading-[1.1] text-[#161514] mb-2">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-no-repeat bg-left-bottom transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
            {post.title}
          </span>
        </h3>
        {post.excerpt && <p className="text-[#4a463f] leading-relaxed mb-3 max-w-xl">{post.excerpt}</p>}
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.12em] text-[#8A857D]">
          <span>{post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {post.read}</span>
        </div>
      </div>
    </Link>
  )
}

/* ---------- newsletter form ---------- */
function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error'); setError('Please enter a valid email address.'); return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'Please try again.') }
      setStatus('success')
    } catch (err) { setStatus('error'); setError(err.message || 'Please try again.') }
  }
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/the-big-days.jpg" alt="PK Photography editorial background" fill sizes="100vw" className="object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#0d0c0b]/85 backdrop-blur-[2px]" />
      </div>
      <div className="relative container mx-auto max-w-[900px] px-6 md:px-10 py-20 md:py-28 text-center text-white">
        <Reveal>
          <p className="eyebrow mb-4 !text-[#FF7A4d]">The Journal, In Your Inbox</p>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.03] mb-4">
            Get Wedding &amp; Event Inspiration in Your Inbox
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-9">
            Planning tips, real weddings, and behind-the-scenes stories — no spam, just good stories.
          </p>
          {status === 'success' ? (
            <div data-testid="newsletter-success" className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full pl-5 pr-6 py-4">
              <CheckCircle2 size={22} className="text-[#FF7A4d]" />
              <span className="text-white">You’re in — welcome to the Journal.</span>
            </div>
          ) : (
            <form onSubmit={submit} noValidate data-testid="newsletter-form" className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  data-testid="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 bg-white/10 border border-white/25 rounded-full px-6 py-4 text-white placeholder-white/45 text-sm focus:outline-none focus:border-[#FF5B22] transition-colors"
                />
                <button
                  type="submit"
                  data-testid="newsletter-submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF5B22] hover:bg-[#E24A12] disabled:opacity-70 text-white font-semibold px-7 py-4 rounded-full transition-colors whitespace-nowrap"
                >
                  {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <>Subscribe <Send size={15} /></>}
                </button>
              </div>
              {status === 'error' && <p data-testid="newsletter-error" className="text-[#ffb59b] text-sm mt-3">{error}</p>}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

/* ================= PAGE ================= */
export default function Journal() {
  const searchParams = useSearchParams()
  const active = searchParams.get('category') || 'all'

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500)
    return () => clearInterval(t)
  }, [])

  const [external, setExternal] = useState([])
  useEffect(() => {
    let on = true
    ;(async () => {
      try {
        const mod = await import('@live/utils/axiosConfig')
        const res = await mod.default.get('/blogs')
        if (on && Array.isArray(res.data)) {
          const classify = (t = '') => {
            const s = t.toLowerCase()
            if (s.includes('goa')) return ['goa']
            if (s.includes('corporate') || s.includes('event')) return ['corporate']
            if (s.includes('mumbai')) return ['mumbai']
            if (s.includes('wedding') || s.includes('bride')) return ['weddings']
            return ['bts']
          }
          const mapped = res.data.slice(0, 8).map((b) => ({
            id: `ext-${b._id}`,
            category: 'From the Studio',
            cats: classify(b.title),
            title: b.title,
            excerpt: b.subtitle,
            image: b.imageUrl || '/wedding/cover.jpg',
            date: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
            read: `${Math.max(3, Math.round((b.content?.length || 800) / 900))} min read`,
            href: `/blogs/${b._id}`,
          }))
          setExternal(mapped)
        }
      } catch (_) { /* external feed optional */ }
    })()
    return () => { on = false }
  }, [])

  const allPosts = [...POSTS, ...external]
  const filtered = active === 'all' ? allPosts : allPosts.filter((p) => p.cats?.includes(active))

  const PAGE = 6
  const [visible, setVisible] = useState(PAGE)
  useEffect(() => { setVisible(PAGE) }, [active])
  const shown = filtered.slice(0, visible)

  return (
    <main className="bg-[#EEEAE1] text-[#161514]">
      {/* ---------------- HERO ---------------- */}
      <section
        ref={heroRef}
        data-transparent-header="true"
        data-testid="journal-hero"
        className="relative h-[92svh] min-h-[620px] w-full overflow-hidden flex flex-col justify-end"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          {SLIDES.map((src, i) => (
            <motion.div
              key={src}
              initial={false}
              animate={{ opacity: slide === i ? 1 : 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/35 to-[#0d0c0b]/50" />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 container mx-auto max-w-[1400px] px-6 md:px-10 pb-14 md:pb-16">
          <div className="max-w-4xl">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="eyebrow !text-[#FF7A4d] mb-4">
              Mumbai · Goa · Delhi
            </motion.p>
            <h1 className="font-cormorant text-white leading-[0.98] text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[6rem]">
              <span className="block overflow-hidden"><motion.span className="block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>The PK Photography</motion.span></span>
              <span className="block overflow-hidden"><motion.span className="block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}>Journal</motion.span></span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }} className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              Wedding guides, event insights, and behind-the-lens stories — from Mumbai’s studios to Goa’s beaches.
            </motion.p>
          </div>
        </motion.div>

        <motion.div style={{ opacity: heroFade }} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll to explore</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ChevronDown size={18} /></motion.div>
        </motion.div>
      </section>

      {/* ---------------- STICKY FILTER BAR ---------------- */}
      <div className="sticky top-[56px] md:top-[64px] z-[70] bg-[#EEEAE1]/92 backdrop-blur-md border-b border-[#DBD4C6]">
        <div className="container mx-auto max-w-[1400px] px-4 md:px-10">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-4">
            {CATEGORIES.map((c) => {
              const on = active === c.slug
              return (
                <Link
                  key={c.slug}
                  href={c.slug === 'all' ? '/blogs' : `/blogs?category=${c.slug}`}
                  scroll={false}
                  data-testid={`filter-${c.slug}`}
                  className={`shrink-0 whitespace-nowrap text-sm font-semibold px-5 py-2.5 rounded-full border transition-colors ${
                    on ? 'bg-[#161514] text-white border-[#161514]' : 'bg-transparent text-[#4a463f] border-[#DBD4C6] hover:border-[#161514]'
                  }`}
                >
                  {c.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* ---------------- EDITOR'S PICKS ---------------- */}
      {active === 'all' && (
        <section className="container mx-auto max-w-[1400px] px-6 md:px-10 pt-16 md:pt-24">
          <Reveal>
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="eyebrow mb-3">Hand-picked</p>
                <h2 className="font-cormorant text-4xl md:text-5xl leading-[1.02]">Editor’s Picks</h2>
              </div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {EDITORS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1} y={36}>
                <StoryCard post={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- MAIN GRID ---------------- */}
      <section className="container mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-3">The Collection</p>
              <h2 className="font-cormorant text-4xl md:text-5xl leading-[1.02]">
                {active === 'all' ? 'All Stories' : CATEGORIES.find((c) => c.slug === active)?.label}
              </h2>
            </div>
            <span className="hidden md:block text-sm text-[#8A857D] tabular">{filtered.length} stories</span>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {shown.length === 0 ? (
              <p className="text-[#8A857D] py-16 text-center">No stories in this category yet — check back soon.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">
                {shown.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 2) * 0.08} y={30}>
                    <StoryCard post={p} priority={i < 2} />
                  </Reveal>
                ))}
              </div>
            )}

            {/* Category band after first batch */}
            {active === 'all' && visible >= PAGE && filtered.length > PAGE && (
              <div className="my-14 md:my-20">
                <Link href="/blogs?category=goa" scroll={false} data-testid="category-band-goa" className="group relative block w-full h-[280px] md:h-[360px] rounded-[8px] overflow-hidden">
                  <Image src="/pre-wedding.jpg" alt="Goa destination wedding stories" fill sizes="100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0b]/80 via-[#0d0c0b]/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white max-w-2xl">
                    <Tag label="Destination" color={catColor('goa')} className="w-fit mb-4" />
                    <h3 className="font-cormorant text-3xl md:text-5xl leading-[1.02] mb-4">Explore Goa Wedding Stories</h3>
                    <p className="text-white/75 mb-6 max-w-md leading-relaxed">Beach ceremonies, sunset portraits and aerial cinematography from India’s favourite destination.</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF7A4d]">Browse Goa stories <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {visible < filtered.length && (
          <div className="text-center mt-16">
            <button
              data-testid="load-more"
              onClick={() => setVisible((v) => v + PAGE)}
              className="inline-flex items-center gap-2 border border-[#161514] text-[#161514] hover:bg-[#161514] hover:text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Load more stories <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* ---------------- NEWSLETTER ---------------- */}
      <Newsletter />

      {/* ---------------- INSTAGRAM STRIP ---------------- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="eyebrow mb-3">Follow the Feed</p>
                <h2 className="font-cormorant text-4xl md:text-5xl leading-[1.02]">Latest from @pkphotography</h2>
              </div>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" data-testid="instagram-follow" className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[#161514] hover:text-[#FF5B22] transition-colors">
                <Instagram size={16} /> Follow on Instagram <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {INSTA_IMAGES.map((src, i) => (
              <Reveal key={src} delay={i * 0.05} y={20}>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="group relative block aspect-square overflow-hidden rounded-[4px]">
                  <Image src={src} alt="PK Photography Instagram post" fill sizes="(max-width:768px) 33vw, 16vw" className="object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-[#FF5B22]/0 group-hover:bg-[#FF5B22]/25 transition-colors grid place-content-center">
                    <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/wedding-coverage.jpg" alt="PK Photography wedding and event coverage" fill sizes="100vw" className="object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[#0d0c0b]/82" />
        </div>
        <div className="relative container mx-auto max-w-[900px] px-6 md:px-10 py-24 md:py-32 text-center text-white">
          <Reveal>
            <p className="eyebrow mb-5 !text-[#FF7A4d]">Your Story Next</p>
            <h2 className="font-cormorant text-4xl md:text-6xl leading-[1.02] mb-5">Ready to Tell Your Story?</h2>
            <p className="text-white/75 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              From weddings to corporate offsites — let’s capture it right.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking" data-testid="cta-book" className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-[#E24A12] text-white font-semibold px-8 py-4 rounded-full transition-colors">
                Book Your Session <ArrowRight size={17} />
              </Link>
              <Link href="/services" data-testid="cta-services" className="inline-flex items-center gap-2 bg-white/10 border border-white/25 hover:bg-white hover:text-[#161514] text-white font-semibold px-8 py-4 rounded-full transition-colors">
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
