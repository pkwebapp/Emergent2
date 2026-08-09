'use client'

import { useEffect, useRef, useState } from 'react'
import { useMediaSlot } from '@/hooks/useMediaSlot'

/**
 * PageBanner — full-width hero that renders on top of a page IF the admin has
 * uploaded content for the given slot. Silent (renders null) otherwise.
 *
 * All uploaded items (images AND videos) rotate ONE BY ONE inside the SAME hero
 * area as a slideshow:
 *   - Images auto-advance after `imageDuration` ms.
 *   - Videos play (muted, looping disabled) and advance when they finish, with a
 *     safety fallback timer so a stalled video never freezes the slideshow.
 */
export default function PageBanner({
  slot,
  height = 'h-[60vh] md:h-[70vh]',
  imageDuration = 5000,
  videoFallback = 20000,
}) {
  const { items, loading } = useMediaSlot(slot)
  const [index, setIndex] = useState(0)
  const videoRef = useRef(null)
  const timerRef = useRef(null)

  const count = items?.length || 0
  // Keep index valid if the item list length changes.
  useEffect(() => {
    if (count > 0 && index >= count) setIndex(0)
  }, [count, index])

  const current = count > 0 ? items[Math.min(index, count - 1)] : null
  const isVideo = current?.resource_type === 'video'

  const advance = () => {
    setIndex((i) => (count > 0 ? (i + 1) % count : 0))
  }

  // Drive auto-advance for the ACTIVE slide.
  useEffect(() => {
    if (count <= 1 || !current) return
    if (timerRef.current) clearTimeout(timerRef.current)

    if (isVideo) {
      const v = videoRef.current
      if (v) {
        try {
          v.currentTime = 0
          const p = v.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        } catch (e) { /* ignore autoplay errors */ }
      }
      // Safety fallback in case `ended` never fires (e.g. blocked autoplay).
      timerRef.current = setTimeout(advance, videoFallback)
    } else {
      timerRef.current = setTimeout(advance, imageDuration)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count, isVideo, current?.secure_url])

  if (loading || !current) return null

  return (
    <section className="relative w-full bg-[#0e0d0c] text-white overflow-hidden">
      <div className={`relative w-full ${height}`}>
        {/* Slides stacked; only the active one is visible (crossfade). */}
        {items.map((item, i) => {
          const active = i === index
          const itemIsVideo = item.resource_type === 'video'
          return (
            <div
              key={item.id || i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              {itemIsVideo ? (
                <video
                  ref={active ? videoRef : null}
                  src={item.secure_url}
                  autoPlay={active}
                  muted
                  playsInline
                  preload="auto"
                  onEnded={active ? advance : undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.secure_url}
                  alt={item.alt || 'Banner'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          )
        })}

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0e0d0c]/70 via-transparent to-transparent pointer-events-none" />

        {/* Dots indicator + manual navigation (only when more than one item). */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur flex items-center justify-center transition"
            >
              <span className="text-lg leading-none">&#8249;</span>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={advance}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur flex items-center justify-center transition"
            >
              <span className="text-lg leading-none">&#8250;</span>
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {items.map((item, i) => (
                <button
                  key={item.id || i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
