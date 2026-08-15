'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, MessageCircle, Sparkles } from 'lucide-react'
import { waLink } from '@/components/site/Chrome'
import { ReadingProgress, RelatedServices } from '@/components/services/ServiceExtras'
import HeroMedia from '@/components/media/HeroMedia'
import { backendUrl } from '@/lib/backend'
import { SERVICES } from '@/lib/services'
import { SERVICE_SEO } from '@/lib/seo'

const service = SERVICES.find((item) => item.slug === 'editorial-portfolio')
const seo = SERVICE_SEO['editorial-portfolio']
const heroVideo = 'https://assets.mixkit.co/videos/5060/5060-720.mp4'

const editorialImages = [
  'https://images.unsplash.com/photo-1606143412458-acc5f86de897?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://pkphotography.in/pricing/PKP_8780pl.jpg',
  'https://pkphotography.in/pricing/PKP_2826.jpg',
]

const details = ['Styling', 'Lighting', 'Posing', 'Expressions', 'Colours', 'Locations', 'Storytelling', 'Composition']

const audience = [
  ['Actors', 'Casting-ready portfolios for auditions, production houses, OTT platforms and talent agencies.'],
  ['Models', 'Versatile images that show range, confidence, body language, expressions and commercial potential.'],
  ['Artists', 'Visual identity for dancers, DJs, musicians, singers, performers, painters and creative professionals.'],
  ['Creators & Influencers', 'Campaign-ready content for Instagram, YouTube, collaborations, websites and personal branding.'],
  ['Entrepreneurs & Personal Brands', 'Creative portraits that go beyond traditional headshots and tell a more memorable story.'],
  ['Anyone Different', 'Birthdays, milestones or a personal creative experience that feels cinematic and unforgettable.'],
]

const why = [
  ['Creative direction', 'Concepts shaped around your personality, goals, visual references and intended use.'],
  ['Posing guidance', 'Movement, hands, body angles, expressions and camera confidence directed throughout.'],
  ['Fashion-inspired lighting', 'Beauty light, dramatic shadows, coloured gels and cinematic studio setups.'],
  ['Story-focused photography', 'A complete visual story with variety, mood, emotion and usable range.'],
  ['Pinterest moodboards', 'References, colours, styling and locations aligned before shoot day.'],
  ['Studio + outdoor options', 'Controlled studio work, city streets, beaches, cafés, architecture and luxury spaces.'],
]

const styles = [
  'Fashion Editorial', 'High Fashion', 'Glamour Portraits', 'Lifestyle Portraits', 'Commercial Modelling', 'Fitness Portfolio', 'Dance Photography', 'Music Artist Portraits', 'DJ Branding Photos', 'Magazine Style Portraits', 'Creative Beauty Portraits', 'Dark Moody Editorials', 'Street Style', 'Luxury Portraits', 'Minimal Studio Portraits'
]

const studioOutdoor = [
  {
    title: 'Studio Sessions',
    image: editorialImages[0],
    copy: 'Controlled light, seamless backgrounds, beauty portraits, dramatic shadows and coloured-gel setups for polished editorial images.',
    points: ['Fashion editorials', 'Beauty portraits', 'Clean portfolios', 'Dramatic lighting', 'Seamless backdrops'],
  },
  {
    title: 'Outdoor Editorial Sessions',
    image: editorialImages[3],
    copy: 'City, beach, architecture and lifestyle locations selected to support the concept—not distract from the subject.',
    points: ['Mumbai streets', 'South Mumbai architecture', 'Bandra', 'Goa beaches', 'Heritage locations'],
  },
]

const process = [
  ['01', 'Discovery', 'Goals, inspiration, personality, wardrobe and usage.'],
  ['02', 'Mood board', 'Pinterest references, colours, styling and locations.'],
  ['03', 'Photoshoot', 'Guided posing, lighting, movement and experiments.'],
  ['04', 'Selection & edit', 'Strongest frames, colour, skin tones and consistency.'],
  ['05', 'Delivery', 'High-resolution files for portfolios, agencies and social.'],
]

const pricing = [
  {
    name: 'Starter Portfolio',
    price: '₹5,000',
    bestFor: 'New models, actors, students, creators',
    items: ['1 hour studio session', 'Unlimited outfit changes within session', 'Guided posing', '5 professionally edited images', 'All RAW images via Drive', 'Basic retouching'],
  },
  {
    name: 'Portfolio Plus',
    price: '₹15,000',
    bestFor: 'Models, actors, artists, influencers',
    items: ['3–4 hour session', 'Studio + outdoor optional', 'Up to 3 looks', 'Creative lighting setups', '15 edited images', 'All RAW images + styling guidance'],
    featured: true,
  },
  {
    name: 'Premium Editorial Experience',
    price: '₹20,000',
    bestFor: 'Magazine, campaign and artist branding',
    items: ['5–6 hour session', 'Multiple concepts', 'Studio + outdoor locations', 'Up to 5 looks', 'Advanced lighting', '20 edited images + all RAW images'],
  },
]

const addons = [
  ['Profile introduction video', '₹2,000'],
  ['Polaroid digitals only', '₹3,000'],
  ['Instagram reel', '₹3,000 / reel'],
  ['Professional stylist', '₹10,000'],
  ['Makeup artist', 'Custom quote'],
  ['Hair styling', 'Custom quote'],
  ['Additional edited images', '₹500 / image'],
  ['Additional location', 'Custom quote'],
]

const faqs = [
  ['I have never modelled before. Can you guide me?', 'Absolutely. Most clients are not professional models. We guide posing, expressions, movement, hands and camera angles throughout the session.'],
  ['What should I wear?', 'We help plan outfits before the shoot based on your goals, style, references and concept.'],
  ['Can we shoot both indoors and outdoors?', 'Yes. Depending on your package, we can combine studio and outdoor locations for a more diverse portfolio.'],
  ['Do you help with creative ideas?', 'Yes. Every session includes concept planning, mood boards, references and creative direction.'],
  ['Are makeup artists and stylists available?', 'Yes. Makeup artists, hair stylists and fashion stylists can be arranged as add-on services.'],
  ['Will I receive RAW photos?', 'Yes. Packages include RAW image delivery via Google Drive along with edited photographs.'],
  ['Can these images be used for auditions and agencies?', 'Yes. These portfolios are suitable for modelling agencies, casting directors, OTT platforms, websites, social media, magazines and personal branding.'],
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
  const shortTitle = 'Editorial & Portfolio'
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#161514]" data-testid="editorial-hero-section">
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.16,1,0.3,1] }} className="absolute inset-0">
        <HeroMedia slot="editorial-portfolio-banner" fallbackImage={service?.img} fallbackVideo={heroVideo} />
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
            <Link href="/booking?service=editorial-portfolio" data-testid="service-hero-booking-link" className="group inline-flex items-center gap-3 bg-[#EEEAE1] text-[#161514] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#FF5B22] hover:text-white transition-colors">
              Book this service <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={waLink({ service: 'Editorial Portfolio', page: 'Editorial Portfolio' })} target="_blank" rel="noreferrer" data-testid="service-hero-whatsapp-link" className="inline-flex items-center gap-3 text-white/90 hover:text-white text-sm font-semibold">
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <svg className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '100px' }}>
        <path d="M0,120 C240,20 720,100 1440,10 L1440,120 Z" fill="#EEEAE1" />
      </svg>
    </section>
  )
}

export default function EditorialPortfolioPageClient() {
  const [galleryImages, setGalleryImages] = useState(editorialImages)

  useEffect(() => {
    const backend = backendUrl()
    fetch(`${backend}/api/media?slot=editorial-portfolio-gallery`, { cache: 'no-store' })
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

      <section className="py-16 md:py-24" data-testid="editorial-stop-scrolling-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 items-center">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">More than a photoshoot</div>
            <h2 className="display text-5xl md:text-7xl leading-[0.9] max-w-[8ch]">Create images that make people stop scrolling.</h2>
            <p className="mt-7 max-w-xl text-[#4C4A46] leading-relaxed">
              A portfolio should do more than show your face. It should show your identity, range and the kind of work you want to attract.
            </p>
          </FadeIn>
          <FadeIn className="relative min-h-[520px] rounded-[2rem] overflow-hidden bg-[#161514]" data-testid="editorial-magazine-board">
            <Image src={editorialImages[0]} alt="Fashion editorial portrait inspired by magazine campaign photography in Mumbai and Goa" fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/90 via-transparent to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {details.map((item) => <span key={item} className="rounded-full bg-white/12 border border-white/15 px-3 py-2 text-center text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur">{item}</span>)}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="editorial-audience-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <FadeIn className="mb-8 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Who this is for</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">For people building a visual identity, not just a photo set.</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-3">
            {audience.map(([title, copy], i) => (
              <FadeIn key={title} delay={i * 0.03} className={`rounded-[1.5rem] p-5 min-h-[180px] border ${i % 2 === 0 ? 'bg-[#161514] text-white border-[#161514]' : 'bg-[#E6E1D5] border-[#DBD4C6]'}`} data-testid={`editorial-audience-${title.toLowerCase().replaceAll(' ', '-')}`}>
                <h3 className="display text-3xl">{title}</h3>
                <p className={`mt-4 text-sm leading-relaxed ${i % 2 === 0 ? 'text-white/68' : 'text-[#4C4A46]'}`}>{copy}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#161514] text-white" data-testid="editorial-why-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start">
          <FadeIn className="lg:sticky lg:top-28">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Why PK Photography</div>
            <h2 className="display text-5xl md:text-6xl leading-[0.95]">Vision before camera.</h2>
            <p className="mt-6 max-w-md text-white/65 leading-relaxed">Great editorial photography is not random. It is concept, styling, pose, light and emotion aligned before the shutter clicks.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-3">
            {why.map(([title, copy], i) => (
              <FadeIn key={title} delay={i * 0.03} className="rounded-3xl border border-white/10 bg-white/5 p-5 min-h-[170px] flex flex-col justify-between" data-testid={`editorial-why-${title.toLowerCase().replaceAll(' ', '-')}`}>
                <Sparkles size={18} className="text-[#FF5B22]" />
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{copy}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="editorial-styles-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="rounded-[2rem] border border-[#DBD4C6] bg-[#E6E1D5] p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">What can we create?</div>
            <h2 className="display text-4xl md:text-5xl leading-[1] max-w-2xl">Every portfolio needs its own visual language.</h2>
            <div className="mt-7 flex flex-wrap gap-2">
              {styles.map((item) => <span key={item} className="rounded-full bg-[#EEEAE1] border border-[#DBD4C6] px-4 py-2 text-xs font-semibold text-[#4C4A46]">{item}</span>)}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="editorial-studio-outdoor-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10 grid lg:grid-cols-2 gap-5">
          {studioOutdoor.map((item) => (
            <FadeIn key={item.title} className="rounded-[2rem] overflow-hidden border border-[#DBD4C6] bg-[#EEEAE1]" data-testid={`editorial-location-${item.title.toLowerCase().replaceAll(' ', '-')}`}>
              <div className="relative aspect-[16/10]">
                <Image src={item.image} alt={`${item.title} for fashion editorial portfolio photography in Mumbai and Goa`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" unoptimized />
              </div>
              <div className="p-6 md:p-7">
                <h2 className="display text-4xl">{item.title}</h2>
                <p className="mt-4 text-[#4C4A46] leading-relaxed">{item.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.points.map((point) => <span key={point} className="rounded-full bg-[#E6E1D5] border border-[#DBD4C6] px-3 py-1.5 text-xs font-semibold text-[#4C4A46]">{point}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#E6E1D5]" data-testid="editorial-process-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <FadeIn className="mb-8 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Creative process</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">From reference to final frame.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {process.map(([num, title, copy]) => (
              <FadeIn key={num} className="rounded-[1.5rem] border border-[#DBD4C6] bg-[#EEEAE1] p-5 min-h-[190px] flex flex-col justify-between" data-testid={`editorial-process-${num}`}>
                <div className="w-12 h-12 rounded-full bg-[#FF5B22] text-white grid place-content-center text-sm font-bold">{num}</div>
                <div>
                  <h3 className="display text-3xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4C4A46]">{copy}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="editorial-portfolio-section">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Portfolio gallery</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">A different story in every frame.</h2>
            </div>
            <Link href="/gallery?category=portfolio" data-testid="editorial-gallery-link" className="inline-flex items-center gap-3 bg-[#161514] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors">View portfolio <ArrowRight size={14} /></Link>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {galleryImages.map((src, i) => (
              <FadeIn key={`${src}-${i}`} delay={i * 0.03} className={`${i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2'} relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#161514]`}>
                <Image src={src} alt={`Editorial fashion portfolio frame ${i + 1}, model actor or artist portfolio photography in Mumbai and Goa`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#161514] text-white" data-testid="editorial-pricing-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Pricing</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Portfolio packages built around creative range.</h2>
            <p className="mt-5 text-white/65 leading-relaxed">Final pricing may vary depending on concept, locations, styling, studio rental and production requirements.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {pricing.map((plan) => (
              <FadeIn key={plan.name} className={`rounded-[1.75rem] p-6 border flex flex-col ${plan.featured ? 'bg-[#FF5B22] border-[#FF5B22] text-white' : 'bg-white/5 border-white/10'}`} data-testid={`editorial-pricing-${plan.name.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="text-[11px] uppercase tracking-[0.22em] opacity-65">{plan.bestFor}</div>
                <h3 className="display text-3xl mt-4">{plan.name}</h3>
                <div className="text-3xl font-bold mt-3">{plan.price}</div>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed"><Check size={15} className="mt-0.5 shrink-0" />{item}</li>)}
                </ul>
                <div className="mt-6 flex flex-col gap-2.5">
                  <Link href="/booking?service=editorial-portfolio" data-testid={`editorial-pricing-book-${plan.name.toLowerCase().replaceAll(' ', '-')}`} className="inline-flex justify-center items-center gap-2 bg-white text-[#161514] px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#161514] hover:text-white transition-colors">Book this package <ArrowRight size={14} /></Link>
                  <a href={waLink({ service: 'Editorial Portfolio', page: 'Editorial Portfolio', pkg: plan.name, price: plan.price })} target="_blank" rel="noreferrer" data-testid={`editorial-pricing-whatsapp-${plan.name.toLowerCase().replaceAll(' ', '-')}`} className="inline-flex justify-center items-center gap-2 border border-white/40 text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"><MessageCircle size={14} /> Enquire on WhatsApp</a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-6" data-testid="editorial-addons-section">
            <h3 className="font-semibold text-lg">Creative add-ons</h3>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {addons.map(([item, price]) => (
                <div key={item} className="rounded-2xl bg-white/7 border border-white/10 p-4">
                  <div className="text-sm font-semibold">{item}</div>
                  <div className="mt-2 text-[#FFB199] font-bold">{price}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="editorial-local-seo-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">Mumbai · Goa · Editorial portfolios</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Portfolio, actor and fashion editorial photography in Mumbai &amp; Goa.</h2>
            <details className="mt-6 rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] p-5 group" data-testid="editorial-local-seo-details">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold">
                <span>Read service and location notes</span>
                <span className="w-9 h-9 rounded-full bg-[#EEEAE1] grid place-content-center group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="mt-5 space-y-4 text-[#4C4A46] leading-relaxed">
                <p>PK Photography creates portfolio photography in Mumbai and Goa for models, actors, artists, creators, entrepreneurs and personal brands. Sessions can be built for casting profiles, agency submissions, OTT auditions, fashion campaigns, magazine features, Instagram, websites and artist branding.</p>
                <p>Popular shoot directions include model portfolio photography in Mumbai, actor portfolio shoots, editorial photoshoots, glamour portraits, creative beauty portraits, fashion photography, street-style portraits and destination editorial sessions in Goa.</p>
              </div>
            </details>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="editorial-faq-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#8A857D] mb-4">FAQs</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Questions before a portfolio shoot.</h2>
          </FadeIn>
          <div className="divide-y divide-[#DBD4C6] border-y border-[#DBD4C6]">
            {faqs.map(([q, a], i) => (
              <details key={q} className="group py-6" data-testid={`editorial-faq-${i}`}>
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

      <section className="pb-24 md:pb-32" data-testid="editorial-final-cta-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="rounded-[2rem] bg-[#FF5B22] text-white p-8 md:p-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
            <FadeIn className="relative">
              <h2 className="display text-4xl md:text-6xl leading-[0.95]">Create a portfolio that opens doors.</h2>
              <p className="mt-5 text-white/82 leading-relaxed max-w-xl">Whether you are stepping into the industry or refreshing your personal brand, we will help create photographs that feel confident, creative and unforgettable.</p>
            </FadeIn>
            <FadeIn className="relative flex flex-col sm:flex-row md:flex-col gap-3 md:items-start">
              <Link href="/booking?service=editorial-portfolio" data-testid="editorial-final-booking-link" className="inline-flex justify-center items-center gap-3 bg-white text-[#161514] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#161514] hover:text-white transition-colors">Book your portfolio shoot <ArrowRight size={14} /></Link>
              <Link href="/booking?service=editorial-portfolio" data-testid="editorial-final-concept-link" className="inline-flex justify-center items-center gap-3 border border-white/35 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors">Discuss your creative concept</Link>
              <a href={waLink({ service: 'Editorial Portfolio', page: 'Editorial Portfolio' })} target="_blank" rel="noreferrer" data-testid="editorial-final-whatsapp-link" className="inline-flex justify-center items-center gap-3 border border-white/35 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#161514] transition-colors"><MessageCircle size={15} /> WhatsApp us</a>
            </FadeIn>
          </div>
        </div>
      </section>

      <RelatedServices current="editorial-portfolio" />
    </main>
  )
}