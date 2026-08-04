'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '@/lib/services'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })
  return (
    <motion.div
      data-testid="reading-progress-bar"
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-[#FF5B22] z-[95] pointer-events-none"
    />
  )
}

const RELATED = {
  weddings: ['events', 'drone-services', 'album-design'],
  events: ['live-streaming', 'weddings', 'corporate-industrial'],
  'live-streaming': ['events', 'weddings', 'podcast-production'],
  'portraits-headshots': ['editorial-portfolio', 'brand-content', 'family-kids'],
  'editorial-portfolio': ['fashion-shoots', 'portraits-headshots', 'influencer-celebrity'],
  'drone-services': ['real-estate-architectural', 'weddings', 'events'],
}

export function RelatedServices({ current }) {
  const curated = RELATED[current]
  let items
  if (curated) {
    items = curated.map((sl) => SERVICES.find((s) => s.slug === sl)).filter(Boolean)
  } else {
    const i = Math.max(0, SERVICES.findIndex((s) => s.slug === current))
    items = [1, 2, 3].map((k) => SERVICES[(i + k) % SERVICES.length])
  }
  return (
    <section data-testid="related-services-section" className="border-t border-black/10 py-20 md:py-28">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}>
          <div className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#FF5B22]">Keep exploring</div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-4xl md:text-5xl">You may also like</h2>
            <Link href="/services" data-testid="related-all-services-link" className="group inline-flex items-center gap-2 text-sm font-semibold opacity-70 hover:opacity-100 hover:text-[#FF5B22] transition-[opacity,color]">
              All services <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Link href={`/services/${s.slug}`} data-testid={`related-service-${s.slug}`} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5">
                  <Image src={s.img} alt={s.t} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform [transition-duration:1200ms] ease-out group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#EEEAE1] text-[#161514] grid place-content-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-500">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug group-hover:text-[#FF5B22] transition-colors">{s.t}</h3>
                    <p className="mt-1.5 text-sm opacity-60 leading-relaxed line-clamp-2">{s.d}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
