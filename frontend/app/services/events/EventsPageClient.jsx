'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Check, MessageCircle, Play, Users, Zap } from 'lucide-react'
import { CONTACT } from '@/components/site/Chrome'
import { ReadingProgress, RelatedServices } from '@/components/services/ServiceExtras'
import HeroMedia from '@/components/media/HeroMedia'
import { backendUrl } from '@/lib/backend'

const CLD = 'https://res.cloudinary.com/ddamvvrby/image/upload'

const eventImages = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1651313948618-31644c7fec18?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  `${CLD}/v1771153887/carousel-images/fcbq8mauttaj2tdowdpd.jpg`,
  `${CLD}/v1771155341/carousel-images/v1y8plbup15avvgljrmh.jpg`,
  `${CLD}/v1771154401/carousel-images/fdgbinlwnq6bviqxkrom.jpg`,
]

const included = [
  {
    icon: <Calendar size={18} />,
    title: 'Pre-event planning',
    copy: 'Schedule, venue layout, VIPs, brand requirements and shot list aligned before event day.',
  },
  {
    icon: <Users size={18} />,
    title: 'Event photography',
    copy: 'Setup, branding, arrivals, speakers, audience, networking, awards and behind-the-scenes moments.',
  },
  {
    icon: <Play size={18} />,
    title: 'Event videography',
    copy: 'Highlight films, reels, speaker recordings, interviews, multi-camera coverage and live streaming.',
  },
  {
    icon: <Zap size={18} />,
    title: 'Edited delivery',
    copy: 'PR selects, edited galleries, high-resolution files and social-ready versions delivered clearly.',
  },
]

const process = [
  ['01', 'Consultation', 'Event, audience, venue and goals.'],
  ['02', 'Planning', 'Schedule, branding, VIPs and key moments.'],
  ['03', 'Coverage', 'Quiet documentary photo and video.'],
  ['04', 'Editing', 'Clean colour, selection and consistency.'],
  ['05', 'Delivery', 'Gallery, downloads and social-ready files.'],
]

const pricing = [
  {
    name: 'Event Essentials',
    price: '₹6,000',
    bestFor: 'Small events, meetings, seminars',
    items: ['3–4 hours coverage', '1 photographer', 'Edited photos', 'Digital delivery'],
  },
  {
    name: 'Event Plus',
    price: '₹15,000',
    bestFor: 'Launches, mixers, brand events',
    items: ['Photo + video team', 'Cinematic highlight video', 'Edited photo set', 'Fast online delivery'],
    featured: true,
  },
  {
    name: 'Event Pro',
    price: '₹25,000',
    bestFor: 'Conferences, awards, full-day events',
    items: ['Full-day coverage', 'Photo + cinematography', 'Highlight video', 'Optional long-form film'],
  },
]

const faqs = [
  {
    q: 'How much does event photography cost?',
    a: 'Pricing depends on event duration, crew size, location, photography, videography and delivery requirements. Packages start from ₹6,000.',
  },
  {
    q: 'Do you cover corporate conferences and product launches?',
    a: 'Yes. We regularly photograph conferences, seminars, leadership events, award ceremonies, networking events, product launches and corporate celebrations.',
  },
  {
    q: 'Can you provide both photography and videography?',
    a: 'Absolutely. We can provide a single coordinated team for photography, videography, highlight films, reels, interviews and live streaming.',
  },
  {
    q: 'How quickly will we receive the photos?',
    a: 'Priority images for PR and social media can usually be delivered within 24–48 hours, with the complete edited gallery following shortly after.',
  },
  {
    q: 'Do you travel outside Mumbai?',
    a: 'Yes. We work throughout Mumbai, Goa and destination locations across India. Travel requirements are confirmed before booking.',
  },
  {
    q: 'Can you cover branding and sponsor installations?',
    a: 'Yes. We capture branding, signage, exhibition booths, sponsor visibility, venue details and audience interaction alongside candid event coverage.',
  },
  {
    q: 'Do you offer same-day edits?',
    a: 'Yes. Same-day delivery can be arranged for selected images or social media content when planned in advance.',
  },
  {
    q: 'How do we book?',
    a: 'Share your event date, venue, expected duration and requirements. We will recommend the best package and confirm availability.',
  },
]

const storyMoments = [
  'Keynote speakers',
  'Audience engagement',
  'Networking moments',
  'Product demonstrations',
  'Brand installations',
  'Awards & recognitions',
  'Panel discussions',
  'Team interactions',
  'Venue atmosphere',
  'Sponsor branding',
  'VIP guests',
]

const audienceGroups = [
  ['Corporate companies', 'Conferences, town halls, leadership summits and annual events.'],
  ['Marketing teams', 'Website, PR, campaign and social media content.'],
  ['Event companies', 'A reliable team that understands timelines and production flow.'],
  ['Startups & brands', 'Launches, investor meets, demos and community gatherings.'],
  ['PR agencies', 'Fast selects for press, media and online coverage.'],
  ['Institutions', 'Graduations, seminars, workshops and cultural events.'],
]

const trustPoints = [
  ['Documentary style', 'Natural moments without constant direction.'],
  ['One team', 'Photography and videography managed together.'],
  ['Fast PR delivery', 'Priority selects within 24–48 hours.'],
  ['Organized files', 'Easy galleries for marketing teams.'],
]

const eventKinds = [
  'Corporate conferences',
  'Business seminars',
  'Product launches',
  'Award functions',
  'Networking events',
  'Trade shows',
  'Exhibitions',
  'Brand activations',
  'Annual days',
  'Press conferences',
  'Leadership summits',
  'Store launches',
  'Cultural events',
  'Private celebrations',
]

function FadeIn({ children, className = '', delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default function EventsPageClient() {
  const [galleryImages, setGalleryImages] = useState(eventImages)

  useEffect(() => {
    const backend = backendUrl()
    fetch(`${backend}/api/media?slot=events-gallery`, { cache: 'no-store' })
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
      <section className="relative min-h-[92svh] pt-32 md:pt-40 pb-16 overflow-hidden bg-[#11100F] text-white" data-testid="events-hero-section">
        <div className="absolute inset-0">
          <HeroMedia slot="events-banner" fallbackImage={galleryImages[0]} className="opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,16,15,0.92),rgba(17,16,15,0.68),rgba(17,16,15,0.32))]" />
        </div>

        <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-end min-h-[calc(92svh-10rem)]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/55 mb-5" data-testid="events-hero-eyebrow">
                Professional event coverage that tells the story
              </div>
              <h1 className="display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] max-w-[11ch]" data-testid="events-hero-title">
                Event Photography &amp; Videography in Mumbai &amp; Goa
              </h1>
              <p className="mt-6 max-w-xl text-white/72 leading-relaxed" data-testid="events-hero-subtitle">
                Documentary-style photos and films for conferences, product launches, award ceremonies, networking events, exhibitions and private celebrations—captured naturally, delivered ready for PR, social and campaigns.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/booking?service=events" data-testid="events-hero-booking-link" className="inline-flex justify-center items-center gap-3 bg-[#FF5B22] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors">
                  Check availability <ArrowRight size={14} />
                </Link>
                <Link href="/gallery?category=events" data-testid="events-hero-gallery-link" className="inline-flex justify-center items-center gap-3 border border-white/25 text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors">
                  View event gallery
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.08 }} className="relative hidden md:grid grid-cols-12 gap-3" data-testid="events-hero-contact-sheet">
              <div className="col-span-7 aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/15">
                <Image src={eventImages[1]} alt="Conference speaker and audience covered in energetic documentary style, Mumbai" fill={false} width={620} height={780} className="w-full h-full object-cover" unoptimized />
              </div>
              <div className="col-span-5 grid gap-3">
                {[eventImages[2], eventImages[3], eventImages[4]].map((src, i) => (
                  <div key={src} className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/15">
                    <Image src={src} alt={`Event photography detail frame ${i + 1} in documentary style, Mumbai and Goa`} fill sizes="340px" className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 left-10 right-10 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-4 flex items-center justify-between text-sm">
                <span className="text-white/65">Fast PR selects</span>
                <span className="font-semibold">24–48 hrs</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="events-intro-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10 grid lg:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-14 items-center">
          <FadeIn className="max-w-xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">What this service is</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Event photography that works beyond the event.</h2>
            <p className="mt-5 text-[#4C4A46] leading-relaxed">
              A successful event lasts a day. The content from it can support your brand for months—future promotions, sponsor reports, social posts, PR and internal communication.
            </p>
            <div className="mt-7 flex flex-wrap gap-2" data-testid="events-story-moment-chips">
              {storyMoments.slice(0, 8).map((item) => (
                <span key={item} className="rounded-full border border-[#DBD4C6] bg-[#E6E1D5] px-4 py-2 text-xs font-semibold text-[#4C4A46]">{item}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="relative min-h-[390px] rounded-[2rem] overflow-hidden bg-[#161514]" data-testid="events-visual-audience-board">
            <Image src={eventImages[1]} alt="Corporate event audience and venue photographed in documentary style, Mumbai and Goa" fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover opacity-88" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/85 via-transparent to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 grid grid-cols-3 gap-3">
              {[
                ['24–48h', 'PR selects'],
                ['Photo + video', 'One team'],
                ['Mumbai · Goa', 'Local crew'],
              ].map(([stat, label]) => (
                <div key={stat} className="rounded-2xl bg-white/12 backdrop-blur-md border border-white/15 p-4 text-white">
                  <div className="display text-2xl leading-none">{stat}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/58">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="events-audience-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Who this is for</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">Built for teams that need reliable coverage.</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audienceGroups.map(([title, copy]) => (
              <FadeIn key={title} className="rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] p-5" data-testid={`events-audience-card-${title.toLowerCase().replaceAll(' ', '-')}`}>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4C4A46]">{copy}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="events-why-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 items-center">
          <FadeIn className="rounded-[2rem] bg-[#161514] text-white p-7 md:p-9">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Why PK Photography</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Prepared, quiet, fast.</h2>
            <p className="mt-5 text-white/68 leading-relaxed">
              Choosing an event photographer is about more than camera gear. It is about preparation, communication and delivering images that actually serve your business.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {['500+ clients', '10+ years', 'Leading brands', '24–48h selects'].map((stat) => (
                <div key={stat} className="rounded-2xl bg-white/8 border border-white/10 p-4">
                  <div className="display text-2xl">{stat}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn className="grid sm:grid-cols-2 gap-3">
            {trustPoints.map(([title, copy]) => (
              <div key={title} className="rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-5 min-h-[150px] flex flex-col justify-between">
                <Check size={18} className="text-[#FF5B22]" />
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4C4A46]">{copy}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="events-types-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="rounded-[2rem] border border-[#DBD4C6] bg-[#E6E1D5] p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Events we cover</div>
            <h2 className="display text-4xl md:text-5xl leading-[1] max-w-2xl">Different events. One clear visual story.</h2>
            <div className="mt-7 flex flex-wrap gap-2">
              {eventKinds.map((item) => (
                <span key={item} className="rounded-full bg-[#EEEAE1] border border-[#DBD4C6] px-4 py-2 text-xs font-semibold text-[#4C4A46]">{item}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-20 md:pb-24" data-testid="events-included-section">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">What is included</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">Built for busy event days.</h2>
            </div>
            <Link href="/pricing?category=events" data-testid="events-pricing-top-link" className="inline-flex items-center gap-3 text-sm font-semibold text-[#FF5B22] hover:text-[#E24A12]">See event packages <ArrowRight size={14} /></Link>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-4">
            {included.map((item) => (
              <FadeIn key={item.title} className="rounded-[1.75rem] bg-[#161514] text-white p-6 min-h-[205px] flex flex-col justify-between relative overflow-hidden" data-testid={`events-included-${item.title.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="absolute inset-x-0 top-0 h-1 bg-[#FF5B22]" />
                <div className="w-11 h-11 rounded-2xl bg-[#FF5B22] grid place-content-center">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-white/68 leading-relaxed text-sm max-w-[24ch]">{item.copy}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#E6E1D5]" data-testid="events-process-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="max-w-2xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Process</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Our process keeps coverage calm.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {process.map(([num, title, copy]) => (
              <div key={num} className="rounded-[1.5rem] border border-[#DBD4C6] bg-[#EEEAE1] p-5 min-h-[180px] flex flex-col justify-between" data-testid={`events-process-${num}`}>
                <div className="w-12 h-12 rounded-full bg-[#FF5B22] text-white grid place-content-center text-sm font-bold">{num}</div>
                <div>
                  <h3 className="display text-3xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4C4A46]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" data-testid="events-gallery-section">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Portfolio</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Every event tells a different story.</h2>
            </div>
            <Link href="/gallery?category=events" data-testid="events-gallery-cta-link" className="inline-flex items-center gap-3 bg-[#161514] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors">Open event gallery <ArrowRight size={14} /></Link>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((src, i) => (
              <FadeIn key={`${src}-${i}`} delay={i * 0.03} className={`${i === 0 ? 'col-span-2 row-span-2' : ''} relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#161514]`}>
                <Image src={src} alt={`Event portfolio frame ${i + 1} covering conference, launch or celebration in documentary style, Mumbai and Goa`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#161514] text-white" data-testid="events-pricing-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="max-w-2xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Pricing</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Event packages with clear starting points.</h2>
            <p className="mt-5 text-white/65 leading-relaxed">Final pricing depends on coverage hours, crew size, videography, same-day delivery, multiple venues, travel, live streaming and editing requirements.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {pricing.map((plan) => (
              <FadeIn key={plan.name} className={`rounded-[1.75rem] p-6 border ${plan.featured ? 'bg-[#FF5B22] border-[#FF5B22] text-white' : 'bg-white/5 border-white/10'}`} data-testid={`events-pricing-${plan.name.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="text-[11px] uppercase tracking-[0.22em] opacity-65">{plan.bestFor}</div>
                <h3 className="display text-3xl mt-4">{plan.name}</h3>
                <div className="text-3xl font-bold mt-3">{plan.price}</div>
                <ul className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed"><Check size={15} className="mt-0.5 shrink-0" />{item}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" data-testid="events-local-seo-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Mumbai · Goa · Destination events</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Serving Mumbai, Goa &amp; destination events.</h2>
            <details className="mt-6 rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] p-5 group" data-testid="events-local-seo-details">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold">
                <span>Read location, SEO and delivery notes</span>
                <span className="w-9 h-9 rounded-full bg-[#EEEAE1] grid place-content-center group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="mt-5 space-y-4 text-[#4C4A46] leading-relaxed">
                <p>
                  Based in Andheri West, Mumbai, PK Photography provides professional event photography and videography across Mumbai, Navi Mumbai, Thane, BKC, Andheri, Lower Parel, Powai, Goregaon, Juhu, Goa and destination locations across India.
                </p>
                <p>
                  We cover corporate conferences, seminars, product launches, award functions, trade shows, exhibitions, brand activations, annual days, press conferences, store launches, cultural events and private celebrations. The goal is a complete visual record your marketing, PR, HR or family team can use immediately.
                </p>
              </div>
            </details>
          </FadeIn>
        </div>
      </section>

      <section className="pb-20 md:pb-24" data-testid="events-faq-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">FAQs</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Questions event planners ask first.</h2>
          </FadeIn>
          <div className="divide-y divide-[#DBD4C6] border-y border-[#DBD4C6]">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group py-6" data-testid={`events-faq-${i}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <span className="w-9 h-9 rounded-full bg-[#E6E1D5] grid place-content-center group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#4C4A46] leading-relaxed max-w-3xl">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32" data-testid="events-final-cta-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="rounded-[2rem] bg-[#FF5B22] text-white p-8 md:p-12 grid md:grid-cols-[1.15fr_0.85fr] gap-8 items-center overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
            <FadeIn className="relative">
              <h2 className="display text-4xl md:text-6xl leading-[0.95]">Let&rsquo;s capture your event professionally.</h2>
              <p className="mt-5 text-white/82 leading-relaxed max-w-xl">Planning a conference, product launch, exhibition, corporate celebration or networking event? Tell us your date, venue and goals—we&rsquo;ll recommend the right team, timeline and package.</p>
            </FadeIn>
            <FadeIn className="relative flex flex-col sm:flex-row md:flex-col gap-3 md:items-start">
              <Link href="/booking?service=events" data-testid="events-final-booking-link" className="inline-flex justify-center items-center gap-3 bg-white text-[#161514] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#161514] hover:text-white transition-colors">Book event coverage <ArrowRight size={14} /></Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="events-final-whatsapp-link" className="inline-flex justify-center items-center gap-3 border border-white/35 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors"><MessageCircle size={15} /> WhatsApp the team</a>
            </FadeIn>
          </div>
        </div>
      </section>

      <RelatedServices current="events" />
    </main>
  )
}