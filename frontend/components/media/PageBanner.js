'use client'

import { useMediaSlot } from '@/hooks/useMediaSlot'

/**
 * PageBanner — full-width media strip that renders on top of a page IF
 * the admin has uploaded content for the given slot. Silent (renders null) otherwise.
 *
 * Supports mix of images and videos. First item is used as a large hero;
 * remaining items become a marquee strip (if 2+ items).
 */
export default function PageBanner({ slot, height = 'h-[60vh] md:h-[70vh]', showMarquee = true }) {
  const { items, loading } = useMediaSlot(slot)
  if (loading || !items || items.length === 0) return null

  const [primary, ...rest] = items
  const isVideo = primary.resource_type === 'video'

  return (
    <section className="relative w-full bg-[#0e0d0c] text-white overflow-hidden">
      <div className={`relative w-full ${height}`}>
        {isVideo ? (
          <video
            src={primary.secure_url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={primary.secure_url}
            alt={primary.alt || 'Banner'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d0c]/70 via-transparent to-transparent" />
      </div>
      {showMarquee && rest.length > 0 && (
        <div className="bg-[#0e0d0c] py-3 overflow-hidden">
          <div className="flex gap-3 animate-[marquee_40s_linear_infinite]" style={{ whiteSpace: 'nowrap' }}>
            {[...rest, ...rest].map((item, k) => (
              <div key={k} className="shrink-0 w-[220px] h-[140px] rounded overflow-hidden">
                {item.resource_type === 'video' ? (
                  <video src={item.secure_url} muted playsInline className="w-full h-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.secure_url} alt={item.alt || ''} className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>
          <style>{`@keyframes marquee { 0% { transform: translateX(0);} 100% { transform: translateX(-50%);} }`}</style>
        </div>
      )}
    </section>
  )
}
