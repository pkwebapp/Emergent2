'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, MessageCircle, Users } from 'lucide-react'
import { CONTACT } from '@/components/site/Chrome'
import { ReadingProgress, RelatedServices } from '@/components/services/ServiceExtras'
import HeroMedia from '@/components/media/HeroMedia'
import { backendUrl } from '@/lib/backend'
import { SERVICES } from '@/lib/services'
import { SERVICE_SEO } from '@/lib/seo'

const portraitService = SERVICES.find((service) => service.slug === 'portraits-headshots')
const seo = SERVICE_SEO['portraits-headshots']
const heroVideo = 'https://assets.mixkit.co/videos/4067/4067-720.mp4'

const headshotImages = [
  'https://pkphotography.in/pricing/PKP_0763%20cover.jpg',
  'https://pkphotography.in/pricing/PKP_7916l.jpg',
  'https://pkphotography.in/pricing/PKP_2826.jpg',
  'https://pkphotography.in/pricing/PKP_8780pl.jpg',
  'https://pkphotography.in/pricing/0N3A7946.jpg',
  'https://pkphotography.in/pricing/PKP_551.jpg',
]

const useCases = [
  'LinkedIn',
  'Company websites',
  'Speaker profiles',
  'Business magazines',
  'PR articles',
  'Podcasts',
  'Investor decks',
  'Email signatures',
  'Annual reports',
  'Personal websites',
]

const audience = [
  ['CEOs & Founders', 'Investor meetings, media coverage, keynote profiles and leadership branding.'],
  ['Corporate Professionals', 'Executives, managers, consultants, HR teams, sales teams and LinkedIn updates.'],
  ['Companies & Organizations', 'Consistent employee headshots at your office with minimal disruption.'],
  ['Models & Actors', 'Clean portfolio portraits for auditions, casting profiles and agencies.'],
  ['Artists & Creators', 'Personal branding portraits for musicians, authors, designers and speakers.'],
  ['Individuals', 'Career changes, job applications, profile refreshes and confident personal presentation.'],
]

const paths = [
  {
    title: 'Corporate Headshots',
    eyebrow: 'For companies & teams',
    image: headshotImages[0],
    copy: 'We bring a complete mobile studio to your office and create consistent portraits for every employee—fast, organized and polished.',
    points: ['Leadership pages', 'HR directories', 'LinkedIn updates', 'Annual reports', 'Marketing material'],
  },
  {
    title: 'Personal Branding Portraits',
    eyebrow: 'For founders & creators',
    image: headshotImages[1],
    copy: 'A mix of clean headshots and lifestyle portraits that show personality while staying credible, premium and professional.',
    points: ['Websites', 'Speaking profiles', 'Social media', 'PR & magazines', 'Marketing assets'],
  },
]

const why = [
  ['Peter Hurley-inspired studio lighting', 'Clean, modern lighting designed for confident, high-impact portraits.'],
  ['Expression coaching throughout', 'We guide eye contact, posture, chin position and micro-adjustments.'],
  ['Corporate & individual sessions', 'Book one standout portrait or a full on-site employee headshot day.'],
  ['Consistent editing style', 'Polished retouching that keeps people authentic and teams visually aligned.'],
  ['Fast turnaround', 'Efficient delivery for LinkedIn, websites, press, magazines and internal teams.'],
  ['Flexible scheduling', 'Useful for professionals visiting Mumbai for only a day.'],
]

const included = [
  ['Pre-session consultation', 'Purpose, brand, usage and preferred style.'],
  ['Wardrobe guidance', 'Simple advice for colour, fit and camera-friendly outfits.'],
  ['Studio lighting setup', 'Professional lighting with clean, modern backgrounds.'],
  ['Guided posing', 'Expression, posture, angles and eye contact coaching.'],
  ['Image selection', 'Choose the portraits that feel strongest and most useful.'],
  ['Professional retouching', 'Natural skin, colour, contrast and clean finishing.'],
  ['High-res + web files', 'Ready for LinkedIn, websites, print and press.'],
  ['Usage guidance', 'Commercial usage advice where applicable.'],
]

const process = [
  ['01', 'Consultation', 'Purpose, brand and where the images will be used.'],
  ['02', 'Preparation', 'Wardrobe, background and schedule confirmed.'],
  ['03', 'Session', 'Relaxed coaching with professional lighting.'],
  ['04', 'Selection', 'Choose your favourite portraits.'],
  ['05', 'Retouching', 'Natural edits that keep you authentic.'],
  ['06', 'Delivery', 'Files ready for LinkedIn, websites and print.'],
]

const pricing = [
  {
    name: 'Essential Headshot',
    price: '₹6,000',
    bestFor: 'LinkedIn, resumes, company profiles',
    items: ['30–45 minute studio session', '1–2 looks', 'Signature studio lighting', 'Guided posing & expression coaching', '8 retouched images', 'High-resolution & web-ready files'],
  },
  {
    name: 'Personal Branding',
    price: '₹12,000',
    bestFor: 'Founders, consultants, speakers, creators',
    items: ['90-minute session', 'Up to 3 outfit changes', 'Multiple backgrounds', 'Headshots + lifestyle portraits', '20 edited images', 'Personal branding usage'],
    featured: true,
  },
  {
    name: 'Executive Branding',
    price: '₹20,000',
    bestFor: 'CEOs, leadership, authors, public figures',
    items: ['Premium studio session', 'Multiple lighting setups', 'Unlimited outfit changes within session', 'Headshots + environmental portraits', '35 edited images', 'Priority editing + commercial usage'],
  },
]

const addOns = [
  ['Extra retouched image', '₹500 / image'],
  ['Same-day delivery', '₹2,000'],
  ['Office lifestyle portraits', 'From ₹5,000'],
  ['Team group photos', 'From ₹6,000'],
  ['Makeup and hair artist', '₹4,000'],
]

const faqs = [
  ['What should I wear for my headshot?', 'Solid colours, clean fits and simple layers usually work best. We share practical wardrobe guidance before your session.'],
  ['Do you help with posing?', 'Yes. We coach expression, eye contact, chin position, posture and small adjustments throughout the session.'],
  ['I have never been photographed professionally. Is that okay?', 'Absolutely. Most clients are not models. The session is guided, relaxed and designed to reduce camera anxiety.'],
  ['Do you come to our office?', 'Yes. We provide on-site corporate headshot days with a mobile studio setup for companies and institutions.'],
  ['How many employees can you photograph in one day?', 'It depends on the setup and final requirements, but we can plan efficient bulk headshot days for small teams and large organizations.'],
  ['How quickly will we receive our images?', 'Turnaround depends on package and volume. Priority delivery and same-day selects can be arranged when required.'],
  ['Can I book while visiting Mumbai?', 'Yes. If you are in Mumbai for a short business trip, we can schedule an efficient studio session around your itinerary.'],
  ['Can you match existing company headshots?', 'Yes. Share your current examples and we will match lighting, framing, background and retouching as closely as possible.'],
]

function FadeIn({ children, className = '', delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.75, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function Hero() {
  const shortTitle = 'Portraits & Headshots'.replace(/ Photography.*| & Videography/g, '')
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#161514]" data-testid="headshots-hero-section">
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.16,1,0.3,1] }} className="absolute inset-0">
        <HeroMedia slot="portraits-headshots-banner" fallbackImage={portraitService?.img} fallbackVideo={heroVideo} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161514]/40 via-transparent to-[#161514]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161514]/70 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 min-h-[92svh] flex flex-col justify-end px-6 md:px-14 pt-32 pb-16 container mx-auto max-w-[1400px]">
        <nav className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#FF5B22]">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#FF5B22]">Services</Link>
          <span>/</span>
          <span className="text-white">{shortTitle}</span>
        </nav>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl">
          <h1 className="display text-white text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-[-0.015em] max-w-[22ch]" data-testid="service-page-h1">{seo.h1}</h1>
          <span className="mt-7 block w-11 h-px bg-[#EEEAE1]/55" aria-hidden="true" />
          <p className="mt-6 text-white/80 text-[15px] md:text-base max-w-[52ch] leading-relaxed font-light" data-testid="service-page-hero-copy">{seo.hero}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/booking?service=portraits-headshots" data-testid="service-hero-booking-link" className="group inline-flex items-center gap-3 bg-[#EEEAE1] text-[#161514] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#FF5B22] hover:text-white transition-colors">
              Book this service <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="service-hero-whatsapp-link" className="inline-flex items-center gap-3 text-white/90 hover:text-white text-sm font-semibold">
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <svg className="absolute bottom-0 left-0 right-0 w-full z-10" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '100px' }}>
        <path d="M0,120 C240,20 720,100 1440,10 L1440,120 Z" fill="#EEEAE1" />
      </svg>
    </section>
  )
}

export default function HeadshotsPageClient() {
  const [galleryImages, setGalleryImages] = useState(headshotImages)

  useEffect(() => {
    const backend = backendUrl()
    fetch(`${backend}/api/media?slot=portraits-headshots-gallery`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = (data?.items || []).filter((i) => i.secure_url).map((i) => i.secure_url)
        if (items.length) setGalleryImages(items)
      })
      .catch(() => {})
  }, [])

  return (
    <main className="bg-[#EEEAE1] text-[#161514] overflow-x-hidden selection:bg-[#FF5B22] selection:text-white">
      <ReadingProgress />
      <Hero />

      <section className="py-16 md:py-24" data-testid="headshots-outcome-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Why headshots matter</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Build trust before you meet.</h2>
            <p className="mt-5 text-[#4C4A46] leading-relaxed max-w-xl">
              Your profile photo is often the first impression clients, recruiters, investors and employers have of you. A professional headshot helps that first impression feel confident, approachable and credible.
            </p>
            <div className="mt-7 flex flex-wrap gap-2" data-testid="headshots-use-case-chips">
              {useCases.map((item) => (
                <span key={item} className="rounded-full border border-[#DBD4C6] bg-[#E6E1D5] px-4 py-2 text-xs font-semibold text-[#4C4A46]">{item}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="relative rounded-[2rem] bg-[#161514] p-4 md:p-5 overflow-hidden" data-testid="headshots-transformation-card">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden grayscale opacity-70">
                <Image src={headshotImages[2]} alt="Before professional headshot transformation reference in Mumbai studio" fill sizes="300px" className="object-cover" unoptimized />
                <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">Before</span>
              </div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image src={headshotImages[0]} alt="After professional headshot with studio lighting and confident expression, Mumbai" fill sizes="300px" className="object-cover" unoptimized />
                <span className="absolute left-4 top-4 rounded-full bg-[#FF5B22] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">Coached</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-white">
              {['Expression', 'Lighting', 'Retouching'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-center text-xs font-semibold">{item}</div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="headshots-audience-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="mb-8 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Who this is for</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Individuals, leadership teams and entire organizations.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audience.map(([title, copy]) => (
              <FadeIn key={title} className="rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] p-5 min-h-[150px]" data-testid={`headshots-audience-${title.toLowerCase().replaceAll(' ', '-')}`}>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4C4A46]">{copy}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#E6E1D5]" data-testid="headshots-paths-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <FadeIn className="mb-8 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Two ways to book</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Corporate consistency or personal brand range.</h2>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-5">
            {paths.map((path) => (
              <FadeIn key={path.title} className="rounded-[2rem] overflow-hidden bg-[#EEEAE1] border border-[#DBD4C6]" data-testid={`headshots-path-${path.title.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="relative aspect-[16/10]">
                  <Image src={path.image} alt={`${path.title} photographed with professional portrait lighting in Mumbai`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6 md:p-7">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#FF5B22] font-semibold">{path.eyebrow}</div>
                  <h3 className="display text-4xl mt-3">{path.title}</h3>
                  <p className="mt-4 text-[#4C4A46] leading-relaxed">{path.copy}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {path.points.map((point) => <span key={point} className="rounded-full bg-[#E6E1D5] border border-[#DBD4C6] px-3 py-1.5 text-xs font-semibold text-[#4C4A46]">{point}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="headshots-why-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 items-start">
          <FadeIn className="rounded-[2rem] bg-[#161514] text-white p-7 md:p-9 sticky top-28">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Why PK Photography</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Lighting, coaching and consistency.</h2>
            <p className="mt-5 text-white/68 leading-relaxed">No modelling experience is required. We guide your expression, posture and angles so your portraits feel confident without looking forced.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-3">
            {why.map(([title, copy]) => (
              <FadeIn key={title} className="rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-5 min-h-[165px] flex flex-col justify-between" data-testid={`headshots-why-${title.toLowerCase().replaceAll(' ', '-')}`}>
                <Check size={18} className="text-[#FF5B22]" />
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4C4A46]">{copy}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#161514] text-white" data-testid="headshots-included-process-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-start">
            <FadeIn>
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">What is included</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">Everything needed for a confident portrait.</h2>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {included.map(([title, copy], i) => (
                  <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5" data-testid={`headshots-included-${i}`}>
                    <div className="w-9 h-9 rounded-full bg-[#FF5B22] grid place-content-center text-sm font-bold">{i + 1}</div>
                    <h3 className="mt-5 font-semibold text-lg">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{copy}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn className="rounded-[2rem] bg-[#FF5B22] p-6 md:p-7 text-white" data-testid="headshots-process-section">
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/65 mb-4">Process</div>
              <h2 className="display text-4xl leading-[1]">Simple. Guided. Efficient.</h2>
              <div className="mt-7 space-y-3">
                {process.map(([num, title, copy]) => (
                  <div key={num} className="rounded-2xl bg-white/12 border border-white/15 p-4 flex gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-white text-[#161514] grid place-content-center text-sm font-bold">{num}</span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-white/74 leading-relaxed">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="headshots-portfolio-section">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Portfolio</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">Modern portraits with room to breathe.</h2>
            </div>
            <Link href="/gallery?category=headshots" data-testid="headshots-gallery-link" className="inline-flex items-center gap-3 bg-[#161514] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors">View portrait gallery <ArrowRight size={14} /></Link>
          </FadeIn>
          <div className="columns-2 md:columns-3 gap-3">
            {galleryImages.map((src, i) => (
              <FadeIn key={`${src}-${i}`} delay={i * 0.03} className="relative mb-3 break-inside-avoid rounded-3xl overflow-hidden bg-[#161514]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Professional headshot and portrait portfolio frame ${i + 1}, Mumbai studio lighting`} loading="lazy" className="w-full h-auto block hover:scale-105 transition-transform duration-700" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#E6E1D5]" data-testid="headshots-pricing-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Pricing</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Professional headshot & portrait packages.</h2>
            <p className="mt-5 text-[#4C4A46] leading-relaxed">Flexible packages for one LinkedIn portrait, a personal branding set or professional headshots for your entire team.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {pricing.map((plan) => (
              <FadeIn key={plan.name} className={`rounded-[1.75rem] p-6 border ${plan.featured ? 'bg-[#161514] border-[#161514] text-white' : 'bg-[#EEEAE1] border-[#DBD4C6]'}`} data-testid={`headshots-pricing-${plan.name.toLowerCase().replaceAll(' ', '-')}`}>
                <div className={`text-[11px] uppercase tracking-[0.22em] ${plan.featured ? 'text-white/55' : 'text-[#8A857D]'}`}>{plan.bestFor}</div>
                <h3 className="display text-3xl mt-4">{plan.name}</h3>
                <div className="text-3xl font-bold mt-3">{plan.price}</div>
                <ul className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed"><Check size={15} className="mt-0.5 shrink-0 text-[#FF5B22]" />{item}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-5 rounded-[1.75rem] border border-[#DBD4C6] bg-[#EEEAE1] p-6" data-testid="headshots-corporate-quote-card">
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#FF5B22] font-semibold">Corporate team headshots</div>
                <h3 className="display text-4xl mt-3">On-site corporate headshot day</h3>
                <p className="mt-4 text-[#4C4A46] leading-relaxed">We bring a mobile studio to your office for consistent employee portraits. Pricing depends on team size, office locations, shooting hours, background requirements and travel.</p>
              </div>
              <Link href="/booking?service=portraits-headshots" data-testid="headshots-corporate-quote-link" className="inline-flex justify-center items-center gap-3 bg-[#FF5B22] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#161514] transition-colors md:justify-self-end">Request a custom quote <ArrowRight size={14} /></Link>
            </div>
          </FadeIn>

          <FadeIn className="mt-5 rounded-[1.75rem] border border-[#DBD4C6] bg-[#EEEAE1] p-6" data-testid="headshots-addons-section">
            <h3 className="font-semibold text-lg">Add-on services</h3>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {addOns.map(([service, price]) => (
                <div key={service} className="rounded-2xl bg-[#E6E1D5] border border-[#DBD4C6] p-4">
                  <div className="text-sm font-semibold">{service}</div>
                  <div className="mt-2 text-[#FF5B22] font-bold">{price}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="headshots-local-seo-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Mumbai · Goa · Corporate teams</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Corporate headshots, LinkedIn portraits and personal branding photography in Mumbai.</h2>
            <details className="mt-6 rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] p-5 group" data-testid="headshots-local-seo-details">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold">
                <span>Read service and location notes</span>
                <span className="w-9 h-9 rounded-full bg-[#EEEAE1] grid place-content-center group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="mt-5 space-y-4 text-[#4C4A46] leading-relaxed">
                <p>PK Photography provides professional headshots in Mumbai for CEOs, founders, executives, consultants, actors, artists, creators and corporate teams. Sessions are available at the Andheri West studio or on-site for offices, schools, colleges, hospitals, government organizations and NGOs.</p>
                <p>Images are optimized for LinkedIn, company websites, speaker profiles, media kits, annual reports, magazines, press releases, investor presentations and personal branding. We also support visitors in Mumbai who need an efficient studio session during a short business trip.</p>
              </div>
            </details>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="headshots-faq-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">FAQs</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Questions before a headshot session.</h2>
          </FadeIn>
          <div className="divide-y divide-[#DBD4C6] border-y border-[#DBD4C6]">
            {faqs.map(([q, a], i) => (
              <details key={q} className="group py-6" data-testid={`headshots-faq-${i}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-semibold text-lg">{q}</span>
                  <span className="w-9 h-9 rounded-full bg-[#E6E1D5] grid place-content-center group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#4C4A46] leading-relaxed max-w-3xl">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32" data-testid="headshots-final-cta-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="rounded-[2rem] bg-[#FF5B22] text-white p-8 md:p-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
            <FadeIn className="relative">
              <h2 className="display text-4xl md:text-6xl leading-[0.95]">Your professional image starts here.</h2>
              <p className="mt-5 text-white/82 leading-relaxed max-w-xl">Book one standout LinkedIn portrait, schedule a studio branding session, or plan consistent headshots for your entire organization.</p>
            </FadeIn>
            <FadeIn className="relative flex flex-col sm:flex-row md:flex-col gap-3 md:items-start">
              <Link href="/booking?service=portraits-headshots" data-testid="headshots-final-booking-link" className="inline-flex justify-center items-center gap-3 bg-white text-[#161514] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#161514] hover:text-white transition-colors">Book your headshot session <ArrowRight size={14} /></Link>
              <Link href="/booking?service=portraits-headshots" data-testid="headshots-final-corporate-link" className="inline-flex justify-center items-center gap-3 border border-white/35 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors"><Users size={15} /> Schedule corporate headshots</Link>
              <Link href="/gallery?category=headshots" data-testid="headshots-final-gallery-link" className="inline-flex justify-center items-center gap-3 border border-white/35 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors">View portfolio</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <RelatedServices current="portraits-headshots" />
    </main>
  )
}