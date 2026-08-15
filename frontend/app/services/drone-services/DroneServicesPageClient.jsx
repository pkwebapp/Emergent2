'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, CloudSun, Film, Map, MessageCircle, ShieldCheck, Sparkles, Wind, Zap } from 'lucide-react'
import { waLink } from '@/components/site/Chrome'
import { ReadingProgress, RelatedServices } from '@/components/services/ServiceExtras'
import HeroMedia from '@/components/media/HeroMedia'
import { backendUrl } from '@/lib/backend'

const aerialImages = [
  'https://images.unsplash.com/photo-1499669404910-ba8b35824a3c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1499750264616-eca69646ae17?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://images.unsplash.com/photo-1526404423292-15db8c2334e5?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
  'https://images.pexels.com/photos/1556989/pexels-photo-1556989.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://images.pexels.com/photos/7937301/pexels-photo-7937301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  'https://res.cloudinary.com/ddamvvrby/image/upload/v1771156827/carousel-images/rvroy30spxfwb9usqcgn.jpg',
]

const useCases = [
  ['Weddings & events', 'Venue reveals, baraat entries, beach ceremonies, crowd scale and cinematic establishing shots.'],
  ['Real estate & architecture', 'Property scale, location advantage, amenities, access roads and luxury exterior storytelling.'],
  ['Hotels & resorts', 'Aerial resort films, pool-to-beach reveals, hospitality campaigns and destination marketing assets.'],
  ['Commercial projects', 'Brand films, construction updates, factory/site visuals and launch campaigns with aerial authority.'],
  ['Goa destination shoots', 'Coastal sequences, cliffs, beaches, villas and resort stories captured with immersive movement.'],
  ['Social campaigns', 'Vertical reels, teaser clips, opening shots and scroll-stopping aerial content.'],
]

const deliverables = [
  { icon: <Film size={18} />, title: 'Cinematic aerial films', copy: '4K/6K-style aerial clips for reels, highlight films, brand films and property videos.' },
  { icon: <Map size={18} />, title: 'High-resolution photos', copy: 'Clean aerial stills for listings, websites, brochures, social media and presentations.' },
  { icon: <ShieldCheck size={18} />, title: 'Safety-first planning', copy: 'Site checks, weather windows, local restrictions and safe flight planning before take-off.' },
  { icon: <Zap size={18} />, title: 'Edited delivery', copy: 'Raw clips, edited selects, colour-graded footage and social-ready versions when required.' },
]

const process = [
  ['01', 'Scout', 'Location, airspace, weather, safety and shot purpose.'],
  ['02', 'Board', 'Aerial shot list, movement style and deliverables.'],
  ['03', 'Fly', 'Controlled cinematic flight with safety-first operation.'],
  ['04', 'Edit', 'Stabilized, graded and cut for the final use.'],
  ['05', 'Deliver', 'Raw footage, selects, reels or final film assets.'],
]

const packages = [
  {
    name: 'Aerial Essentials',
    price: '₹12,000',
    bestFor: 'Small events, simple property visuals',
    items: ['Up to 2 hours flight window', '1 location', 'Aerial photos + short clips', 'Basic edited selects', 'Digital delivery'],
  },
  {
    name: 'Cinematic Drone Film',
    price: '₹25,000',
    bestFor: 'Weddings, resorts, launches, brand videos',
    items: ['Half-day coverage', 'Cinematic aerial movements', 'Edited highlight sequence', 'Raw footage available', 'Social-ready versions'],
    featured: true,
  },
  {
    name: 'Commercial Aerial Production',
    price: 'Custom Quote',
    bestFor: 'Real estate, construction, multi-location campaigns',
    items: ['Pre-production planning', 'Multiple flight windows', 'Photo + video deliverables', 'Advanced edit options', 'Travel/permissions scoped'],
  },
]

const faqs = [
  ['How much does drone photography cost in Mumbai or Goa?', 'Pricing depends on location, flight time, permissions, crew, deliverables and editing. Smaller shoots can start from ₹12,000, while commercial productions are custom quoted.'],
  ['Can you shoot drone footage for weddings?', 'Yes. Drone footage works beautifully for venue reveals, baraat entries, beach weddings, destination celebrations and cinematic wedding films.'],
  ['Do you cover real estate and resort properties?', 'Yes. We create aerial photos and videos for villas, apartments, commercial spaces, hotels, resorts, amenities and surrounding location context.'],
  ['Do drone shoots require permission?', 'Some locations may require permission or restrictions based on airspace, venue rules, crowd safety or local regulations. We help assess feasibility before confirming the shoot.'],
  ['What happens if the weather is bad?', 'Drone work depends on wind, rain and visibility. If conditions are unsafe, we recommend rescheduling the flight window.'],
  ['Can you provide raw drone footage?', 'Yes. Raw footage can be included depending on the package or quoted as an add-on. Edited reels and colour-graded clips are also available.'],
  ['Can you shoot in Goa?', 'Yes. We cover Goa weddings, resorts, villas, beaches and destination projects, with logistics and permissions scoped in advance.'],
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

function DroneHero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 120])
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 1.12])

  return (
    <section className="relative min-h-[94svh] overflow-hidden bg-[#071014] text-white" data-testid="drone-hero-section">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <HeroMedia slot="drone-services-banner" fallbackImage={aerialImages[0]} className="opacity-68" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_30%,rgba(255,91,34,0.20),transparent_26%),linear-gradient(90deg,rgba(7,16,20,0.94),rgba(7,16,20,0.62),rgba(7,16,20,0.25))]" />
      </motion.div>

      <div className="absolute left-1/2 top-[18%] hidden h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/15 md:block" />
      <div className="absolute left-1/2 top-[18%] hidden h-[290px] w-[290px] -translate-x-1/2 rounded-full border border-white/10 md:block" />

      <div className="relative z-10 min-h-[94svh] container mx-auto max-w-[1400px] px-6 md:px-10 pt-32 pb-16 flex items-end">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }} className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/55 mb-5" data-testid="drone-hero-eyebrow">Cinematic aerial storytelling · Mumbai · Goa</div>
          <h1 className="display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] max-w-[11ch]" data-testid="drone-hero-title">Drone Photography &amp; Videography</h1>
          <p className="mt-6 max-w-xl text-white/72 leading-relaxed" data-testid="drone-hero-subtitle">
            Aerial films and photographs for weddings, events, real estate, resorts and commercial projects—planned safely, shot cinematically and delivered ready for campaigns.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/booking?service=drone-services" data-testid="drone-hero-booking-link" className="inline-flex justify-center items-center gap-3 bg-[#FF5B22] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#071014] transition-colors">Plan an aerial shoot <ArrowRight size={14} /></Link>
            <Link href="/gallery" data-testid="drone-hero-gallery-link" className="inline-flex justify-center items-center gap-3 border border-white/25 text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#071014] transition-colors">View aerial work</Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function DroneServicesPageClient() {
  const [galleryImages, setGalleryImages] = useState(aerialImages)

  useEffect(() => {
    const backend = backendUrl()
    fetch(`${backend}/api/media?slot=drone-services-gallery`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = (data?.items || []).filter((i) => i.secure_url).map((i) => i.secure_url)
        if (items.length) setGalleryImages(items)
      })
      .catch(() => {})
  }, [])

  return (
    <main className="bg-[#EAF0EC] text-[#071014] overflow-x-hidden selection:bg-[#FF5B22] selection:text-white">
      <ReadingProgress />
      <DroneHero />

      <section className="py-16 md:py-24" data-testid="drone-perspective-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-14 items-center">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#62706A] mb-4">Why aerial matters</div>
            <h2 className="display text-5xl md:text-7xl leading-[0.9] max-w-[8ch]">Show the scale people cannot see from the ground.</h2>
            <p className="mt-7 max-w-xl text-[#3F4B47] leading-relaxed">Drone visuals turn a venue, property or brand film into a bigger story: location, movement, atmosphere and perspective in one shot.</p>
          </FadeIn>
          <FadeIn className="relative min-h-[500px] rounded-[2rem] overflow-hidden bg-[#071014]" data-testid="drone-map-board">
            <Image src={galleryImages[2] || aerialImages[2]} alt="Aerial road and architecture composition for commercial drone videography" fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071014]/88 via-transparent to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 grid grid-cols-3 gap-3 text-white">
              {[
                ['4K/6K', 'cinematic feel'],
                ['Photo + film', 'one flight plan'],
                ['Mumbai · Goa', 'destination ready'],
              ].map(([stat, label]) => (
                <div key={stat} className="rounded-2xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
                  <div className="display text-2xl leading-none">{stat}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/58">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="drone-use-cases-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <FadeIn className="mb-8 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#62706A] mb-4">Who books drone coverage</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">For projects where perspective sells the story.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {useCases.map(([title, copy], i) => (
              <FadeIn key={title} delay={i * 0.03} className={`rounded-[1.5rem] p-5 min-h-[172px] border ${i % 2 === 0 ? 'bg-[#071014] text-white border-[#071014]' : 'bg-white/55 border-[#C9D3CD]'}`} data-testid={`drone-use-case-${title.toLowerCase().replaceAll(' ', '-')}`}>
                <CloudSun size={18} className={i % 2 === 0 ? 'text-[#FF5B22]' : 'text-[#FF5B22]'} />
                <h3 className="mt-8 font-semibold text-lg">{title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${i % 2 === 0 ? 'text-white/68' : 'text-[#3F4B47]'}`}>{copy}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#071014] text-white" data-testid="drone-deliverables-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">What is included</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">Aerial deliverables built for real use.</h2>
            </div>
            <Link href="/pricing" data-testid="drone-pricing-top-link" className="inline-flex items-center gap-3 text-sm font-semibold text-[#FFB199] hover:text-white">See packages <ArrowRight size={14} /></Link>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-4">
            {deliverables.map((item) => (
              <FadeIn key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 min-h-[220px] flex flex-col justify-between" data-testid={`drone-deliverable-${item.title.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="w-11 h-11 rounded-2xl bg-[#FF5B22] grid place-content-center">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">{item.copy}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="drone-process-section">
        <div className="container mx-auto max-w-[1300px] px-6 md:px-10">
          <FadeIn className="mb-8 max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#62706A] mb-4">Flight plan</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Scout. Board. Fly. Edit. Deliver.</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {process.map(([num, title, copy]) => (
              <FadeIn key={num} className="rounded-[1.5rem] border border-[#C9D3CD] bg-white/55 p-5 min-h-[190px] flex flex-col justify-between" data-testid={`drone-process-${num}`}>
                <div className="w-12 h-12 rounded-full bg-[#FF5B22] text-white grid place-content-center text-sm font-bold">{num}</div>
                <div>
                  <h3 className="display text-3xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3F4B47]">{copy}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="drone-portfolio-section">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-[#62706A] mb-4">Aerial portfolio</div>
              <h2 className="display text-4xl md:text-5xl leading-[1]">Movement, scale and atmosphere.</h2>
            </div>
            <Link href="/gallery" data-testid="drone-gallery-link" className="inline-flex items-center gap-3 bg-[#071014] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#FF5B22] transition-colors">View gallery <ArrowRight size={14} /></Link>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {galleryImages.map((src, i) => (
              <FadeIn key={`${src}-${i}`} delay={i * 0.03} className={`${i === 0 || i === 3 ? 'md:col-span-3 md:row-span-2' : 'md:col-span-2'} relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#071014]`}>
                <Image src={src} alt={`Drone photography and aerial videography portfolio frame ${i + 1}, Mumbai Goa cinematic aerial perspective`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#071014] text-white" data-testid="drone-pricing-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <FadeIn className="max-w-3xl mb-10">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/45 mb-4">Pricing</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Drone packages with safe planning built in.</h2>
            <p className="mt-5 text-white/65 leading-relaxed">Pricing depends on flight time, location permissions, deliverables, crew, editing and travel. Complex airspace or commercial productions are quoted after scope review.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {packages.map((plan) => (
              <FadeIn key={plan.name} className={`rounded-[1.75rem] p-6 border ${plan.featured ? 'bg-[#FF5B22] border-[#FF5B22] text-white' : 'bg-white/5 border-white/10'}`} data-testid={`drone-pricing-${plan.name.toLowerCase().replaceAll(' ', '-')}`}>
                <div className="text-[11px] uppercase tracking-[0.22em] opacity-65">{plan.bestFor}</div>
                <h3 className="display text-3xl mt-4">{plan.name}</h3>
                <div className="text-3xl font-bold mt-3">{plan.price}</div>
                <ul className="mt-6 space-y-3">
                  {plan.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed"><Check size={15} className="mt-0.5 shrink-0" />{item}</li>)}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="drone-safety-seo-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#62706A] mb-4">Mumbai · Goa · Safety notes</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Drone photography in Mumbai &amp; Goa requires more than a good drone.</h2>
            <details className="mt-6 rounded-3xl border border-[#C9D3CD] bg-white/55 p-5 group" data-testid="drone-local-seo-details">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold">
                <span>Read location, permission and delivery notes</span>
                <span className="w-9 h-9 rounded-full bg-[#EAF0EC] grid place-content-center group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="mt-5 space-y-4 text-[#3F4B47] leading-relaxed">
                <p>PK Photography provides drone photography and aerial videography in Mumbai, Goa and destination locations for weddings, resorts, real estate, corporate events, construction, hospitality and commercial campaigns. Common locations include South Mumbai, Bandra, Juhu, BKC, North Goa, South Goa, villas, beach venues, resorts and project sites.</p>
                <p>Commercial drone work must consider venue rules, airspace restrictions, safety, weather, crowd density, wind and visibility. We scope the flight plan before confirming so the final production is safe, realistic and useful for the campaign or event film.</p>
              </div>
            </details>
          </FadeIn>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-testid="drone-faq-section">
        <div className="container mx-auto max-w-[980px] px-6 md:px-10">
          <FadeIn className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#62706A] mb-4">FAQs</div>
            <h2 className="display text-4xl md:text-5xl leading-[1]">Questions before an aerial shoot.</h2>
          </FadeIn>
          <div className="divide-y divide-[#C9D3CD] border-y border-[#C9D3CD]">
            {faqs.map(([q, a], i) => (
              <details key={q} className="group py-6" data-testid={`drone-faq-${i}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-semibold text-lg">{q}</span>
                  <span className="w-9 h-9 rounded-full bg-white/60 grid place-content-center group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#3F4B47] leading-relaxed max-w-3xl">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32" data-testid="drone-final-cta-section">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="rounded-[2rem] bg-[#FF5B22] text-white p-8 md:p-12 grid md:grid-cols-[1.05fr_0.95fr] gap-8 items-center overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
            <FadeIn className="relative">
              <h2 className="display text-4xl md:text-6xl leading-[0.95]">Ready to show the bigger picture?</h2>
              <p className="mt-5 text-white/82 leading-relaxed max-w-xl">Send your location, date, project type and intended use. We will recommend the right flight plan, crew and deliverables.</p>
            </FadeIn>
            <FadeIn className="relative flex flex-col sm:flex-row md:flex-col gap-3 md:items-start">
              <Link href="/booking?service=drone-services" data-testid="drone-final-booking-link" className="inline-flex justify-center items-center gap-3 bg-white text-[#071014] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#071014] hover:text-white transition-colors">Book drone coverage <ArrowRight size={14} /></Link>
              <a href={waLink({ service: 'Drone Services', page: 'Drone Services' })} target="_blank" rel="noreferrer" data-testid="drone-final-whatsapp-link" className="inline-flex justify-center items-center gap-3 border border-white/35 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#071014] transition-colors"><MessageCircle size={15} /> WhatsApp the team</a>
            </FadeIn>
          </div>
        </div>
      </section>

      <RelatedServices current="drone-services" />
    </main>
  )
}