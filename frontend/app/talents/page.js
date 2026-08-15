'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  X,
  MapPin,
  Instagram,
  ExternalLink,
  ArrowRight,
  Check,
  Loader2,
  Sparkles,
  Star,
} from 'lucide-react'

const CATEGORIES = [
  { key: 'all',          label: 'All' },
  { key: 'model',        label: 'Models' },
  { key: 'actor',        label: 'Actors' },
  { key: 'dancer',       label: 'Dancers' },
  { key: 'musician',     label: 'Musicians' },
  { key: 'voice_artist', label: 'Voice Artists' },
]

const prettyCategory = (c) =>
  ({ model: 'Model', actor: 'Actor', dancer: 'Dancer', musician: 'Musician', voice_artist: 'Voice Artist' }[c] || c)

/* -------------------- Page -------------------- */
export default function TalentsPage() {
  const [talents, setTalents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState(null)
  const [applyOpen, setApplyOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    const url = new URL('/api/talents', window.location.origin)
    if (category !== 'all') url.searchParams.set('category', category)
    if (search.trim()) url.searchParams.set('search', search.trim())
    fetch(url.toString())
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setTalents(Array.isArray(data.items) ? data.items : [])
      })
      .catch(() => {
        if (!cancelled) setError('Could not load talents. Please refresh.')
      })
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [search, category])

  return (
    <main className="min-h-screen bg-[#EEEAE1] text-[#161514]">
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-14 md:pb-20 px-6 md:px-14 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-20 w-[360px] h-[360px] rounded-full bg-[#FF5B22]/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 w-[300px] h-[300px] rounded-full bg-[#161514]/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF5B22] bg-[#FF5B22]/10 px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={12} /> PK Talent Network
          </div>
          <h1
            className="text-5xl md:text-7xl leading-[1.02] tracking-tight"
            data-font="display"
          >
            Faces, <span className="italic text-[#FF5B22]">voices</span> &amp;<br />movement, cast-ready.
          </h1>
          <p className="mt-5 text-base md:text-lg text-[#5b5851] max-w-2xl mx-auto leading-relaxed">
            A hand-picked roster of models, actors, dancers, musicians and voice artists —
            book them directly through PK Photography for your next campaign, wedding or brand film.
          </p>
        </div>
      </section>

      {/* Search + filter bar */}
      <section className="px-6 md:px-14 -mt-4 md:-mt-6">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm border border-[#DBD4C6] rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A857D]" />
              <input
                type="text"
                data-testid="talents-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, city or skill…"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#EEEAE1] border border-transparent text-[15px] focus:outline-none focus:border-[#FF5B22] focus:ring-2 focus:ring-[#FF5B22]/20"
              />
            </div>
            <button
              onClick={() => setApplyOpen(true)}
              data-testid="apply-open-btn"
              className="h-12 px-5 rounded-xl bg-[#161514] text-white font-semibold text-sm hover:bg-[#FF5B22] transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Apply as talent <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c.key
              return (
                <button
                  key={c.key}
                  onClick={() => setCategory(c.key)}
                  data-testid={`filter-${c.key}`}
                  className={`text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full transition-colors ${
                    active
                      ? 'bg-[#161514] text-white'
                      : 'bg-[#EEEAE1] text-[#5b5851] hover:bg-[#161514]/10'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-14 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <GridSkeleton />
          ) : error ? (
            <div className="text-center py-20 text-[#5b5851]">{error}</div>
          ) : talents.length === 0 ? (
            <EmptyState onApply={() => setApplyOpen(true)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {talents.map((t, i) => (
                <TalentCard
                  key={t.id}
                  talent={t}
                  index={i}
                  onOpen={() => setSelected(t)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 md:px-14 pb-20">
        <div className="max-w-6xl mx-auto bg-[#161514] text-white rounded-3xl overflow-hidden relative">
          <div className="absolute -top-20 -right-16 w-[280px] h-[280px] rounded-full bg-[#FF5B22]/25 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-14 items-center">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60 mb-3">Join the roster</div>
              <h2 className="text-4xl md:text-5xl leading-tight tracking-tight" data-font="display">
                Are you a <span className="italic text-[#FF5B22]">talent?</span>
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed max-w-md">
                We onboard 20 new profiles a quarter. Send us your portfolio, showreel or a recent test-shoot —
                we&apos;ll review and get back within 5 working days.
              </p>
            </div>
            <div className="md:justify-self-end">
              <button
                onClick={() => setApplyOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-[#161514] font-semibold px-6 py-3.5 rounded-full hover:bg-[#FF5B22] hover:text-white transition-colors"
              >
                Start your application <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <TalentDetailModal talent={selected} onClose={() => setSelected(null)} />
      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </main>
  )
}

/* -------------------- Card -------------------- */
function TalentCard({ talent, onOpen, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#DBD4C6] hover:border-[#FF5B22] transition-colors shadow-sm hover:shadow-xl"
      data-testid={`talent-card-${talent.id}`}
    >
      <button onClick={onOpen} className="block w-full text-left">
        <div className="relative w-full aspect-[4/5] bg-[#EEEAE1] overflow-hidden">
          <Image
            src={talent.image_url}
            alt={`${talent.name} — ${prettyCategory(talent.category)}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            unoptimized
          />
          {talent.featured && (
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-[#FF5B22] text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
              <Star size={10} className="fill-white" /> Featured
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#161514]/70 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="text-[10px] uppercase tracking-[0.24em] opacity-80">{prettyCategory(talent.category)}</div>
            <div className="text-xl leading-tight" data-font="display">
              {talent.name}
            </div>
          </div>
        </div>
      </button>

      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2 text-sm text-[#5b5851]">
          <MapPin size={13} className="text-[#FF5B22]" /> {talent.city}
          {talent.experience_years ? (
            <span className="text-[#8A857D]/70">· {talent.experience_years} yrs</span>
          ) : null}
        </div>
        {talent.tagline && (
          <p className="mt-2 text-sm text-[#5b5851] line-clamp-1">{talent.tagline}</p>
        )}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={onOpen}
            className="flex-1 h-10 rounded-full border border-[#161514] text-[#161514] text-xs font-semibold hover:bg-[#161514] hover:text-white transition-colors"
          >
            View profile
          </button>
          <Link
            href={`/booking?talent=${encodeURIComponent(talent.name)}`}
            className="flex-1 h-10 rounded-full bg-[#161514] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#FF5B22] transition-colors"
          >
            Book <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white/60 border border-[#DBD4C6] rounded-2xl overflow-hidden">
          <div className="w-full aspect-[4/5] bg-[#EEEAE1] animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-2/3 bg-[#EEEAE1] rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-[#EEEAE1] rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ onApply }) {
  return (
    <div className="text-center py-20">
      <div className="w-14 h-14 mx-auto rounded-full bg-[#FF5B22]/10 grid place-content-center text-[#FF5B22] mb-4">
        <Search size={22} />
      </div>
      <h3 className="text-2xl mb-1" data-font="display">
        No talents matched
      </h3>
      <p className="text-sm text-[#8A857D] max-w-md mx-auto">
        Try a different keyword, or apply to be the first on our roster in that category.
      </p>
      <button
        onClick={onApply}
        className="mt-6 inline-flex items-center gap-2 bg-[#161514] text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#FF5B22] transition-colors"
      >
        Apply as talent <ArrowRight size={14} />
      </button>
    </div>
  )
}

/* -------------------- Detail Modal -------------------- */
function TalentDetailModal({ talent, onClose }) {
  useEffect(() => {
    if (!talent) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [talent, onClose])

  return (
    <AnimatePresence>
      {talent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          data-testid="talent-detail-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#EEEAE1] rounded-3xl overflow-hidden max-w-4xl w-full max-h-[92vh] overflow-y-auto grid md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] md:aspect-auto bg-[#DBD4C6]">
              <Image
                src={talent.image_url}
                alt={talent.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
              {talent.featured && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-[#FF5B22] text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <Star size={10} className="fill-white" /> Featured
                </div>
              )}
            </div>

            <div className="relative p-6 md:p-8">
              <button
                onClick={onClose}
                data-testid="talent-detail-close"
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 grid place-content-center rounded-full bg-white/80 hover:bg-[#161514] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF5B22]">
                {prettyCategory(talent.category)}
              </div>
              <h2 className="mt-1 text-4xl md:text-5xl leading-tight" data-font="display">
                {talent.name}
              </h2>
              {talent.tagline && <p className="mt-2 text-sm md:text-base text-[#5b5851]">{talent.tagline}</p>}

              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#161514]/70">
                <span className="inline-flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-full">
                  <MapPin size={11} className="text-[#FF5B22]" /> {talent.city}
                </span>
                {talent.age && <span className="bg-white/80 px-2.5 py-1 rounded-full">{talent.age} yrs</span>}
                {talent.height && <span className="bg-white/80 px-2.5 py-1 rounded-full">{talent.height}</span>}
                {talent.experience_years && (
                  <span className="bg-white/80 px-2.5 py-1 rounded-full">{talent.experience_years} yrs experience</span>
                )}
              </div>

              {talent.bio && (
                <p className="mt-6 text-sm md:text-[15px] text-[#5b5851] leading-relaxed">{talent.bio}</p>
              )}

              {Array.isArray(talent.skills) && talent.skills.length > 0 && (
                <div className="mt-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A857D] mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {talent.skills.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-[#161514] text-white/90">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(talent.languages) && talent.languages.length > 0 && (
                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A857D] mb-2">Languages</div>
                  <div className="text-sm text-[#5b5851]">{talent.languages.join(' · ')}</div>
                </div>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={`/booking?talent=${encodeURIComponent(talent.name)}`}
                  className="inline-flex items-center gap-2 bg-[#161514] text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#FF5B22] transition-colors"
                >
                  Book {talent.name.split(' ')[0]} <ArrowRight size={14} />
                </Link>
                {talent.instagram && (
                  <a
                    href={`https://instagram.com/${talent.instagram.replace(/^@/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#161514] hover:text-[#FF5B22] transition-colors"
                  >
                    <Instagram size={15} /> {talent.instagram}
                  </a>
                )}
                {talent.portfolio_url && (
                  <a
                    href={talent.portfolio_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#161514] hover:text-[#FF5B22] transition-colors"
                  >
                    <ExternalLink size={15} /> Portfolio
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* -------------------- Apply Modal -------------------- */
function ApplyModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    category: 'model', experience: '', portfolio_url: '', instagram: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setDone(false)
      setErrors({})
    }
  }, [open])

  const onChange = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: null })
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Enter a valid email.'
    const digits = form.phone.replace(/\D/g, '')
    if (!(digits.length === 10 || (digits.startsWith('91') && digits.length === 12))) errs.phone = 'Enter a valid 10-digit mobile.'
    if (!form.city.trim()) errs.city = 'Please share your base city.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    setLoading(true)
    try {
      const res = await fetch('/api/talents/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: digits,
          city: form.city.trim(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrors({ form: data.error || 'Something went wrong. Try again.' })
      } else {
        setDone(true)
      }
    } catch (err) {
      setErrors({ form: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          data-testid="apply-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#EEEAE1] rounded-3xl overflow-hidden max-w-lg w-full max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 relative">
              <button
                onClick={onClose}
                data-testid="apply-close"
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 grid place-content-center rounded-full bg-white/80 hover:bg-[#161514] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {done ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-[#FF5B22] text-white grid place-content-center mx-auto mb-4">
                    <Check size={22} />
                  </div>
                  <h3 className="text-2xl" data-font="display">
                    Application received
                  </h3>
                  <p className="mt-2 text-sm text-[#5b5851] max-w-sm mx-auto">
                    Thanks! Our team will review your details and get back within 5 working days.
                    Meanwhile, feel free to share a portfolio link on WhatsApp.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 inline-flex items-center gap-2 bg-[#161514] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#FF5B22] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF5B22] mb-2">Join the roster</div>
                  <h3 className="text-3xl" data-font="display">
                    Apply as talent
                  </h3>
                  <p className="mt-2 text-sm text-[#5b5851]">A quick 60-second application. We only need the basics — you can share full portfolio after we get in touch.</p>

                  <form onSubmit={submit} className="mt-5 space-y-3.5" noValidate>
                    <Field label="Full name" error={errors.name}>
                      <input
                        data-testid="apply-name"
                        value={form.name}
                        onChange={onChange('name')}
                        placeholder="Priya Sharma"
                        className="ap-input"
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Email" error={errors.email}>
                        <input
                          data-testid="apply-email"
                          type="email"
                          value={form.email}
                          onChange={onChange('email')}
                          placeholder="you@email.com"
                          className="ap-input"
                        />
                      </Field>
                      <Field label="Mobile" error={errors.phone}>
                        <input
                          data-testid="apply-phone"
                          inputMode="numeric"
                          maxLength={12}
                          value={form.phone}
                          onChange={onChange('phone')}
                          placeholder="9876543210"
                          className="ap-input"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Category">
                        <select data-testid="apply-category" value={form.category} onChange={onChange('category')} className="ap-input">
                          {CATEGORIES.filter((c) => c.key !== 'all').map((c) => (
                            <option key={c.key} value={c.key}>{c.label}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="City" error={errors.city}>
                        <input
                          data-testid="apply-city"
                          value={form.city}
                          onChange={onChange('city')}
                          placeholder="Mumbai"
                          className="ap-input"
                        />
                      </Field>
                    </div>

                    <Field label="Experience (optional)">
                      <input
                        value={form.experience}
                        onChange={onChange('experience')}
                        placeholder="e.g. 3 years, 2 fashion weeks, 5 brand films"
                        className="ap-input"
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Portfolio URL (optional)">
                        <input
                          value={form.portfolio_url}
                          onChange={onChange('portfolio_url')}
                          placeholder="https://…"
                          className="ap-input"
                        />
                      </Field>
                      <Field label="Instagram (optional)">
                        <input
                          value={form.instagram}
                          onChange={onChange('instagram')}
                          placeholder="@handle"
                          className="ap-input"
                        />
                      </Field>
                    </div>

                    <Field label="Message (optional)">
                      <textarea
                        value={form.message}
                        onChange={onChange('message')}
                        rows={3}
                        placeholder="Tell us a line or two about yourself…"
                        className="ap-input resize-none"
                      />
                    </Field>

                    {errors.form && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{errors.form}</p>
                    )}

                    <button
                      type="submit"
                      data-testid="apply-submit"
                      disabled={loading}
                      className="w-full h-12 rounded-full bg-[#161514] text-white font-semibold text-sm hover:bg-[#FF5B22] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? (<><Loader2 size={16} className="animate-spin" /> Submitting…</>) : (<>Submit application <ArrowRight size={16} /></>)}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ label, children, error }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A857D] mb-1.5">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-600 mt-1">{error}</span>}
      <style jsx>{`
        :global(.ap-input) {
          width: 100%;
          height: 44px;
          padding: 0 12px;
          border-radius: 10px;
          background: #ffffffb3;
          border: 1px solid #DBD4C6;
          font-size: 14px;
          color: #161514;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(textarea.ap-input) { height: auto; padding: 10px 12px; }
        :global(.ap-input:focus) {
          outline: none;
          border-color: #FF5B22;
          box-shadow: 0 0 0 3px rgba(255,91,34,0.15);
        }
      `}</style>
    </label>
  )
}
