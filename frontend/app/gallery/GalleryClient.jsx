'use client'

import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, ChevronLeft, ChevronRight, Link as LinkIcon, Check } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IMG, PageHeader } from '@/components/site/Chrome'
import axiosInstance from '@live/utils/axiosConfig'

// Main service categories shown on this page
// backendKey = value used against remote API (?category=)
// slot = corresponds to admin /admin/media > Service Pages > {slot}-gallery
const SERVICES = [
  {
    key: 'portfolio',
    label: 'Portfolio',
    backendKey: 'Portfolio',
    slot: 'editorial-portfolio-gallery',
    blurb: 'Story-driven visuals for models, artists and creators — built as portfolios that get you noticed.',
  },
  {
    key: 'headshots',
    label: 'Headshots',
    backendKey: 'Headshots',
    slot: 'portraits-headshots-gallery',
    blurb: 'Corporate & artist headshots — sharp, honest, and consistent across your team.',
  },
  {
    key: 'weddings',
    label: 'Weddings',
    backendKey: 'Wedding',
    slot: 'weddings-gallery',
    blurb: 'Cinematic wedding day coverage — every glance, every ritual, every laugh, held.',
  },
  {
    key: 'events',
    label: 'Events',
    backendKey: 'Events',
    slot: 'events-gallery',
    blurb: 'Corporate functions, launches, parties and social gatherings — captured end-to-end.',
  },
]

/* Fallback in-house photos when the backend has no results for a category */
const FALLBACK_IMAGES = [IMG.p1, IMG.p2, IMG.p3, IMG.p4, IMG.p5, IMG.p6, IMG.p7, IMG.p8]

const LOCATION_BY_CATEGORY = {
  portfolio: 'Bandra, South Mumbai, Fontainhas and Goa',
  headshots: 'Andheri West studio and Bandra editorial setting, Mumbai',
  weddings: 'Mumbai wedding venue and Goa destination setting',
  events: 'BKC, South Mumbai and Goa event venue',
}

export default function GalleryClient() {
  return (
    <Suspense fallback={<GalleryShell />}>
      <GalleryInner />
    </Suspense>
  )
}

function GalleryShell() {
  return (
    <main className="bg-[#EEEAE1]">
      <PageHeader
        eyebrow="02 / Gallery"
        title={<>Selected <span className="text-[#FF5B22] italic font-medium">frames.</span></>}
        subtitle="Loading gallery…"
      />
    </main>
  )
}

function GalleryInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read initial tab from URL (?category=headshots) — falls back to portfolio
  const initialKey = (() => {
    const raw = (searchParams.get('category') || '').toLowerCase()
    return SERVICES.find((s) => s.key === raw) ? raw : 'portfolio'
  })()

  const [active, setActive] = useState(initialKey)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lightbox, setLightbox] = useState(null) // { idx }
  const [copied, setCopied] = useState(false)

  const activeService = SERVICES.find((s) => s.key === active)

  // Keep local state in sync when the user hits back/forward or shares a link
  useEffect(() => {
    const raw = (searchParams.get('category') || '').toLowerCase()
    const next = SERVICES.find((s) => s.key === raw)?.key || 'portfolio'
    if (next !== active) setActive(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Push URL when the user clicks a tab (shareable link)
  const setTab = (key) => {
    setActive(key)
    const url = `/gallery?category=${key}`
    router.push(url, { scroll: false })
    // Ensure user sees the grid after switching
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        const el = document.getElementById('gallery-grid')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  const copyShareLink = async () => {
    try {
      const url = `${window.location.origin}/gallery?category=${active}`
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      /* no-op */
    }
  }

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
        // Fetch admin-uploaded media (from /admin/media) and external gallery in parallel
        const [uploadedRes, externalRes] = await Promise.allSettled([
          fetch(`${backend}/api/media?slot=${encodeURIComponent(activeService.slot)}`, { cache: 'no-store' })
            .then((r) => r.ok ? r.json() : { items: [] }),
          axiosInstance.get(`/gallery/all?category=${encodeURIComponent(activeService.backendKey)}`)
            .then((r) => r.data?.data || []),
        ])
        if (cancelled) return

        // Normalise uploaded media into the same shape as the external gallery items
        const uploadedItems = (uploadedRes.status === 'fulfilled' ? (uploadedRes.value.items || []) : [])
          .filter((i) => i.secure_url)
          .map((i) => ({
            _id: i.id,
            imageUrl: i.secure_url,
            imageName: i.alt || activeService.label,
            resource_type: i.resource_type,
            _uploaded: true,
          }))

        const externalItems = externalRes.status === 'fulfilled' ? externalRes.value : []

        // Uploaded items come first (they're the newest/curated), then the external gallery
        setImages([...uploadedItems, ...externalItems])
      } catch (e) {
        if (cancelled) return
        setError(e?.response?.data?.message || e.message || 'Failed to load gallery')
        setImages([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [active])

  const gridItems = images.length > 0 ? images : []
  const isEmpty = !loading && !error && gridItems.length === 0
  const displayItems = gridItems.length > 0
    ? gridItems
    : FALLBACK_IMAGES.map((src, i) => ({ imageUrl: src, imageName: activeService.label, _fallback: true, _id: `fb-${i}` }))

  return (
    <main className="bg-[#EEEAE1]">
      <PageHeader
        eyebrow="02 / Gallery"
        title={<>Photography <span className="text-[#FF5B22] italic font-medium">portfolio.</span></>}
        subtitle="Browse PK Photography galleries across portfolio shoots, headshots, weddings and events — real work from Mumbai, Goa and destination assignments."
      />

      <section className="pb-10 -mt-8 bg-[#EEEAE1]" data-testid="gallery-seo-intro">
        <div className="container mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] p-6 md:p-8 grid gap-5 md:grid-cols-[1.2fr_0.8fr] items-start">
            <div>
              <h1 className="display text-3xl md:text-5xl leading-[1]">Portfolio, Headshots, Weddings &amp; Events — Mumbai &amp; Goa</h1>
              <p className="mt-5 text-[#4C4A46] leading-relaxed">
                This gallery brings together portfolio shoots, professional headshots, wedding stories and event coverage from the PK Photography archive. Explore work created for couples, artists, professionals, businesses and celebrations across Mumbai, Goa and destination locations.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em] text-[#8A857D]">
              {['Portfolio shoots', 'Professional headshots', 'Wedding stories', 'Event coverage', 'Mumbai galleries', 'Goa assignments'].map((tag) => (
                <span key={tag} className="rounded-full border border-[#DBD4C6] bg-[#EEEAE1] px-3 py-2">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <section
        id="gallery-tabs-section"
        className="border-b border-[#DBD4C6] bg-[#EEEAE1]/95 sticky top-[80px] md:top-[92px] z-30 backdrop-blur"
      >
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto scrollbar-hide py-4" data-testid="gallery-tabs">
            {SERVICES.map((s) => (
              <a
                key={s.key}
                href={`/gallery?category=${s.key}`}
                onClick={(e) => {
                  e.preventDefault()
                  setTab(s.key)
                }}
                data-testid={`gallery-tab-${s.key}`}
                className={`shrink-0 group inline-flex items-center gap-2 px-5 md:px-7 py-3 rounded-full text-sm md:text-base font-semibold transition-colors ${
                  active === s.key
                    ? 'bg-[#161514] text-white'
                    : 'bg-[#EEEAE1] text-[#161514] border border-[#DBD4C6] hover:border-[#FF5B22] hover:text-[#FF5B22]'
                }`}
              >
                {s.label}
                <ArrowRight
                  size={14}
                  className={`transition-transform ${
                    active === s.key ? 'translate-x-0.5' : 'group-hover:translate-x-1'
                  }`}
                />
              </a>
            ))}
            <button
              onClick={copyShareLink}
              data-testid="gallery-copy-link"
              title="Copy shareable link to this gallery"
              className={`ml-auto shrink-0 inline-flex items-center gap-2 px-4 md:px-5 py-3 rounded-full text-xs md:text-sm font-semibold transition-colors ${
                copied
                  ? 'bg-[#FF5B22] text-white'
                  : 'bg-[#EEEAE1] text-[#161514] border border-[#DBD4C6] hover:border-[#FF5B22] hover:text-[#FF5B22]'
              }`}
            >
              {copied ? <Check size={14} /> : <LinkIcon size={14} />}
              {copied ? 'Link copied' : 'Share this gallery'}
            </button>
          </div>
        </div>
      </section>

      {/* Active Category Header */}
      <section className="pt-14 md:pt-20 pb-8">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <div className="eyebrow mb-3" data-testid="gallery-active-eyebrow">
                  {String(SERVICES.findIndex((s) => s.key === active) + 1).padStart(2, '0')} · {activeService.label}
                </div>
                <h2 className="display text-5xl md:text-6xl" data-testid="gallery-active-title">
                  {activeService.label}{' '}
                  <span className="text-[#FF5B22] italic font-medium">gallery.</span>
                </h2>
              </div>
              <p className="max-w-md text-[#8A857D]">{activeService.blurb}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Masonry grid — CSS columns preserves each image's natural aspect ratio */}
      <section id="gallery-grid" className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          {loading && (
            <div data-testid="gallery-loading" className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 [column-fill:_balance]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  style={{ height: `${240 + (i % 4) * 80}px` }}
                  className="mb-4 md:mb-5 rounded-2xl bg-[#F0F2F5] animate-pulse break-inside-avoid"
                />
              ))}
            </div>
          )}

          {error && !loading && (
            <div
              data-testid="gallery-error"
              className="rounded-3xl border border-[#DBD4C6] p-10 text-center bg-[#E6E1D5]"
            >
              <div className="text-xs uppercase tracking-widest text-[#8A857D] mb-2">Couldn't reach the gallery</div>
              <div className="font-semibold text-[#161514]">{error}</div>
              <button
                onClick={() => setActive(active)}
                className="mt-6 inline-flex items-center gap-2 bg-[#161514] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors"
              >
                Try again <ArrowRight size={14} />
              </button>
            </div>
          )}

          {isEmpty && (
            <div
              data-testid="gallery-empty"
              className="mb-10 rounded-3xl border border-dashed border-[#DBD4C6] bg-[#E6E1D5] p-8 md:p-10 text-center"
            >
              <div className="text-xs uppercase tracking-widest text-[#8A857D] mb-2">
                Fresh work coming soon
              </div>
              <div className="font-semibold text-[#161514] text-lg">
                We're curating {activeService.label.toLowerCase()} highlights. In the meantime, here's a taste of our recent frames.
              </div>
            </div>
          )}

          {!loading && !error && (
            <div
              data-testid="gallery-grid"
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 [column-fill:_balance]"
            >
              {displayItems.map((item, i) => (
                <GalleryTile
                  key={(item._id || item.imageUrl) + '-' + i}
                  item={item}
                  index={i}
                  categoryLabel={activeService.label}
                  location={LOCATION_BY_CATEGORY[active]}
                  onOpen={() => setLightbox({ idx: i })}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            items={displayItems}
            index={lightbox.idx}
            categoryLabel={activeService.label}
            location={LOCATION_BY_CATEGORY[active]}
            onClose={() => setLightbox(null)}
            onNav={(nextIdx) => setLightbox({ idx: nextIdx })}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

/* Single tile — uses natural image aspect (no cropping) via next/image with width/height auto */
function GalleryTile({ item, index, categoryLabel, location, onOpen }) {
  const isVideo = item.resource_type === 'video'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.04 }}
      onClick={onOpen}
      data-testid={`gallery-card-${index}`}
      className="group relative mb-4 md:mb-5 rounded-2xl overflow-hidden cursor-pointer break-inside-avoid bg-[#F0F2F5]"
    >
      {isVideo ? (
        <video
          src={item.imageUrl}
          muted
          loop
          playsInline
          autoPlay
          className="block w-full h-auto transition-transform [transition-duration:1400ms] group-hover:scale-[1.03]"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={typeof item === 'string' ? item : item.imageUrl}
          alt={`${item.imageName || categoryLabel} at ${location} in candid cinematic style, Mumbai & Goa`}
          loading="lazy"
          className="block w-full h-auto transition-transform [transition-duration:1400ms] group-hover:scale-[1.03]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161514]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
        <div className="text-[10px] tracking-widest uppercase opacity-70">
          PK Photography · {categoryLabel}
        </div>
        {item.imageName && <div className="font-semibold truncate">{item.imageName}</div>}
        {item.subtitle && <div className="text-xs opacity-80 truncate">{item.subtitle}</div>}
      </div>
    </motion.div>
  )
}

function Lightbox({ items, index, categoryLabel, location, onClose, onNav }) {
  const item = items[index]
  const prev = () => onNav((index - 1 + items.length) % items.length)
  const next = () => onNav((index + 1) % items.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm grid place-content-center p-4"
      data-testid="gallery-lightbox"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        data-testid="gallery-lightbox-close"
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur grid place-content-center text-white hover:bg-[#EEEAE1]/20"
      >
        <X size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label="Previous"
        data-testid="gallery-lightbox-prev"
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur grid place-content-center text-white hover:bg-[#EEEAE1]/20"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label="Next"
        data-testid="gallery-lightbox-next"
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur grid place-content-center text-white hover:bg-[#EEEAE1]/20"
      >
        <ChevronRight size={22} />
      </button>
      <motion.div
        key={item.imageUrl}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center gap-4"
        style={{ maxWidth: 'min(92vw, 1400px)' }}
      >
        {item.resource_type === 'video' ? (
          <video
            src={item.imageUrl}
            autoPlay
            controls
            loop
            playsInline
            className="block"
            style={{ maxHeight: '82vh', maxWidth: '92vw', width: 'auto', height: 'auto', objectFit: 'contain' }}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.imageUrl}
            alt={`${item.imageName || categoryLabel} at ${location} in luxury editorial style, Mumbai & Goa`}
            className="block"
            style={{ maxHeight: '82vh', maxWidth: '92vw', width: 'auto', height: 'auto', objectFit: 'contain' }}
          />
        )}
        {(item.imageName || item.subtitle) && (
          <div className="bg-black/50 backdrop-blur text-white text-center px-6 py-3 rounded-full text-sm max-w-[90%]">
            <span className="font-semibold">{item.imageName}</span>
            {item.subtitle ? <span className="opacity-70"> · {item.subtitle}</span> : null}
          </div>
        )}
      </motion.div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest uppercase">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  )
}
