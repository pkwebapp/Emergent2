'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'

/**
 * Sticky "Interested in <label>? Book Now" bar that slides up after the
 * visitor scrolls down a long service page. Desktop only (mirrors the
 * generic /services/[slug] behaviour) so it never clashes with the mobile
 * WhatsApp floating button.
 */
export default function ServiceStickyCTA({ label, service }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] hidden md:flex"
          data-testid="service-sticky-cta"
        >
          <div className="flex items-center gap-3 bg-[#161514] text-white rounded-full pl-5 pr-2 py-2 shadow-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF5B22] grid place-content-center"><Clock size={14} /></div>
              <div className="text-xs leading-tight">
                <div className="text-white/60 text-[9px] uppercase tracking-widest">Interested in</div>
                <div className="font-semibold">{label}?</div>
              </div>
            </div>
            <Link href={`/booking?service=${service}`} data-testid="service-sticky-cta-link" className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-[#E24A12] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-colors">Book Now <ArrowRight size={12} /></Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
