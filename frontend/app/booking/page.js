'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Mail, Phone, MapPin, MessageCircle, Calendar } from 'lucide-react'
import { CONTACT, waLink } from '@/components/site/Chrome'

function BookingHero() {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44 pb-12 md:pb-16 bg-[#EEEAE1]" data-testid="booking-hero-section">
      <div className="absolute -top-28 right-[-8%] w-[430px] h-[430px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.16), transparent 62%)' }} />
      <div className="absolute bottom-[-42%] left-[-10%] w-[520px] h-[340px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(22,21,20,0.08), transparent 65%)' }} />
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-end">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="eyebrow mb-5" data-testid="booking-hero-eyebrow">04 / Booking</div>
            <h1 className="display text-4xl sm:text-5xl lg:text-6xl leading-[0.98] max-w-[12ch]" data-testid="booking-hero-title">
              Book Photography &amp; Videography in <span className="text-[#FF5B22] italic font-medium">Mumbai &amp; Goa.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[#4C4A46] text-base leading-relaxed" data-testid="booking-hero-subtitle">
              Tell us your date, service and location. We&rsquo;ll reply with availability, next steps and the right package guidance.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#booking-form" data-testid="booking-hero-start-link" className="inline-flex justify-center items-center gap-3 bg-[#161514] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors">
                Start enquiry <ArrowRight size={14} />
              </a>
              <a href={waLink({ page: 'Booking' })} target="_blank" rel="noreferrer" data-testid="booking-hero-whatsapp-link" className="inline-flex justify-center items-center gap-3 border border-[#DBD4C6] bg-[#EEEAE1] text-[#161514] px-6 py-3 rounded-full text-sm font-semibold hover:border-[#25D366] hover:text-[#25D366] transition-colors">
                WhatsApp us
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }} className="relative rounded-[2rem] border border-[#DBD4C6] bg-[#E6E1D5]/80 p-5 md:p-6 overflow-hidden" data-testid="booking-hero-card">
            <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-[#FF5B22]/12" />
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ['01', 'Share your date'],
                ['02', 'Confirm availability'],
                ['03', 'Plan the shoot'],
              ].map(([num, label]) => (
                <div key={num} className="rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-4 min-h-[118px] flex flex-col justify-between">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-[#FF5B22]">{num}</span>
                  <span className="display text-xl leading-tight text-[#161514]">{label}</span>
                </div>
              ))}
              <div className="sm:col-span-3 rounded-3xl bg-[#161514] text-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Response</div>
                  <div className="display text-3xl mt-1">Same-day reply</div>
                </div>
                <Calendar size={26} className="text-[#FF5B22]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const SERVICES = ['Wedding', 'Events', 'Portrait', 'Headshots', 'Portfolio', 'Fashion', 'Editorial', 'Celebrity', 'Family', 'Ads', 'Boudoir', 'Food', 'E-Commerce', 'Real Estate', 'Design', 'Live Streaming', 'Drone']

// Maps values coming from "Book Now" links (?service= slug or ?category=) to a dropdown option.
const SERVICE_ALIASES = {
  wedding: 'Wedding', weddings: 'Wedding', 'wedding-photography': 'Wedding', 'pre-wedding': 'Wedding', 'pre wedding': 'Wedding',
  event: 'Events', events: 'Events', corporate: 'Events', 'corporate events': 'Events', 'corporate-industrial': 'Events',
  portrait: 'Portrait', portraits: 'Portrait', 'portraits-headshots': 'Portrait',
  'family-kids': 'Family', family: 'Family', kids: 'Family',
  headshot: 'Headshots', headshots: 'Headshots', 'corporate-headshots': 'Headshots',
  portfolio: 'Portfolio', 'editorial-portfolio': 'Portfolio', 'model-portfolio': 'Portfolio',
  fashion: 'Fashion', 'fashion-shoots': 'Fashion',
  editorial: 'Editorial',
  celebrity: 'Celebrity', 'influencer-celebrity': 'Celebrity', influencer: 'Celebrity',
  ads: 'Ads', advertising: 'Ads', commercial: 'Ads', 'brand-content': 'Ads', brand: 'Ads',
  boudoir: 'Boudoir', 'boudoir-shoots': 'Boudoir',
  food: 'Food', 'food-photography': 'Food',
  'e-commerce': 'E-Commerce', ecommerce: 'E-Commerce', product: 'E-Commerce', products: 'E-Commerce', 'product-ecommerce': 'E-Commerce',
  'real-estate': 'Real Estate', 'real estate': 'Real Estate', realestate: 'Real Estate', 'real-estate-architectural': 'Real Estate', architectural: 'Real Estate',
  design: 'Design', 'design-services': 'Design', 'album-design': 'Design', 'editing-retouching': 'Design', editing: 'Design', retouching: 'Design',
  'live-streaming': 'Live Streaming', 'live streaming': 'Live Streaming', livestream: 'Live Streaming', streaming: 'Live Streaming', 'podcast-production': 'Live Streaming', podcast: 'Live Streaming',
  drone: 'Drone', 'drone-services': 'Drone', aerial: 'Drone',
}

function normalizeService(raw) {
  if (!raw) return null
  const key = String(raw).trim().toLowerCase()
  const direct = SERVICES.find((s) => s.toLowerCase() === key)
  if (direct) return direct
  return SERVICE_ALIASES[key] || null
}

export default function BookingPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', service: 'Wedding', package: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Auto-select the service + package based on where the visitor came from
  // (?service= / ?category= and ?package= / ?price= from a "Book this package" link)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const match = normalizeService(params.get('service') || params.get('category') || '')
      const pkg = (params.get('package') || '').trim()
      const price = (params.get('price') || '').trim()
      setForm((f) => {
        const next = { ...f }
        if (match) next.service = match
        if (pkg) {
          next.package = price ? `${pkg} — ${price}` : pkg
          if (!f.message) next.message = `I'm interested in the ${pkg} package${price ? ` (${price})` : ''}. Please share availability and next steps.`
        }
        return next
      })
    } catch { /* ignore */ }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setSent(false)
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not send enquiry')
      setSent(true)
      setForm({ name: '', email: '', phone: '', date: '', service: 'Wedding', package: '', message: '' })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try WhatsApp or email.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="bg-[#EEEAE1]">
      <BookingHero />
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="flex flex-col gap-8 md:gap-14 lg:grid lg:grid-cols-12">
            <motion.form id="booking-form" data-testid="booking-form" action="/api/contact" method="post" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={submit} className="col-span-12 lg:col-span-7 rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-8 md:p-10 shadow-sm">
              <div className="eyebrow mb-2">Enquiry Form</div>
              <h2 className="display text-3xl md:text-4xl">A few quick details.</h2>
              {form.package && (
                <div data-testid="booking-selected-package" className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-[#FF5B22]/40 bg-[#F3E4DC] px-4 py-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[#FF5B22] text-white grid place-content-center shrink-0"><Check size={12} /></span>
                    <span className="text-[#161514]">Selected package: <strong data-testid="booking-selected-package-name">{form.package}</strong></span>
                  </div>
                  <button type="button" data-testid="booking-clear-package" onClick={() => setForm((f) => ({ ...f, package: '' }))} className="text-xs font-semibold text-[#8A857D] hover:text-[#FF5B22] shrink-0">Clear</button>
                </div>
              )}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Full name</span>
                  <input data-testid="booking-name-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none" placeholder="Your name" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Phone</span>
                  <input data-testid="booking-phone-input" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none" placeholder="+91…" />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Email</span>
                  <input data-testid="booking-email-input" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none" placeholder="you@email.com" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Preferred date</span>
                  <input data-testid="booking-date-input" required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Service</span>
                  <select data-testid="booking-service-select" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none bg-[#EEEAE1]">
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Tell us more (optional)</span>
                  <textarea data-testid="booking-message-textarea" rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="px-4 py-3 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none resize-none" placeholder="Location, timing, expectations…" />
                </label>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <p className="text-xs text-[#8A857D]">By submitting, you agree to be contacted about your enquiry.</p>
                <button type="submit" disabled={submitting} data-testid="booking-submit-button" className="inline-flex items-center gap-3 bg-[#161514] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#FF5B22] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? 'Sending…' : 'Send Enquiry'} <ArrowRight size={14} />
                </button>
              </div>
              {sent && (
                <div data-testid="booking-success-message" className="mt-5 p-4 rounded-xl bg-[#F3E4DC] text-[#E24A12] text-sm flex items-center gap-2">
                  <Check size={16} /> Your enquiry has been sent. We&apos;ll respond shortly with availability and package guidance.
                </div>
              )}
              {error && (
                <div data-testid="booking-error-message" className="mt-5 p-4 rounded-xl bg-red-50 text-red-700 text-sm flex items-center gap-2">
                  {error}
                </div>
              )}
            </motion.form>

            <aside className="col-span-12 lg:col-span-5">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-3xl bg-gradient-to-br from-[#EFE9DE] to-[#EEEAE1] border border-[#DBD4C6] p-7">
                  <div className="eyebrow mb-3">Prefer to talk?</div>
                  <h3 className="display text-2xl">We&apos;re one message away.</h3>
                  <div className="mt-5 space-y-3">
                    <a href={waLink({ page: 'Booking' })} target="_blank" rel="noreferrer" data-testid="booking-whatsapp-link" className="flex items-center gap-3 p-3 rounded-xl bg-[#EEEAE1] border border-[#DBD4C6] hover:border-[#FF5B22] transition">
                      <span className="w-10 h-10 rounded-lg bg-[#25D366] text-white grid place-content-center"><MessageCircle size={16} /></span>
                      <div className="flex-1"><div className="text-[10px] uppercase tracking-widest text-[#8A857D]">WhatsApp</div><div className="font-semibold text-sm">{CONTACT.phone}</div></div>
                    </a>
                    <a href={`mailto:${CONTACT.email}`} data-testid="booking-email-link" className="flex items-center gap-3 p-3 rounded-xl bg-[#EEEAE1] border border-[#DBD4C6] hover:border-[#FF5B22] transition">
                      <span className="w-10 h-10 rounded-lg bg-[#FF5B22] text-white grid place-content-center"><Mail size={16} /></span>
                      <div className="flex-1"><div className="text-[10px] uppercase tracking-widest text-[#8A857D]">Email</div><div className="font-semibold text-sm truncate">{CONTACT.email}</div></div>
                    </a>
                    <a href={`tel:${CONTACT.phoneRaw}`} data-testid="booking-phone-link" className="flex items-center gap-3 p-3 rounded-xl bg-[#EEEAE1] border border-[#DBD4C6] hover:border-[#FF5B22] transition">
                      <span className="w-10 h-10 rounded-lg bg-[#161514] text-white grid place-content-center"><Phone size={16} /></span>
                      <div className="flex-1"><div className="text-[10px] uppercase tracking-widest text-[#8A857D]">Call</div><div className="font-semibold text-sm">{CONTACT.phone}</div></div>
                    </a>
                    {CONTACT.studios.map((s) => (
                      <a
                        key={s.city}
                        href={s.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`booking-studio-${s.city.toLowerCase()}`}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#EEEAE1] border border-[#DBD4C6] hover:border-[#FF5B22] transition"
                      >
                        <span className="w-10 h-10 rounded-lg bg-[#FF5B22]/10 text-[#FF5B22] grid place-content-center shrink-0"><MapPin size={16} /></span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] uppercase tracking-widest text-[#8A857D]">{s.label}</div>
                          <div className="font-semibold text-sm leading-snug">
                            {s.addressLines.map((l, i) => (
                              <span key={i} className="block">{l}</span>
                            ))}
                          </div>
                          <div className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-[#8A857D]">
                            <Phone size={11} /> {s.phone}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl bg-[#161514] text-white p-7 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-[240px] h-[240px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.4), transparent 60%)' }} />
                  <Calendar size={20} className="text-[#FF5B22]" />
                  <div className="mt-3 display text-xl">Same-day reply</div>
                  <p className="mt-2 text-white/70 text-sm">Enquiries are personally read by Prabhakar. We aim to respond within the same working day.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
