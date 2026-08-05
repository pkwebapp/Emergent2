'use client'

import { useMediaSlot } from '@/hooks/useMediaSlot'

/**
 * MediaSlot — renders the first uploaded asset for a slot with a fallback.
 * If fallback is a React node (e.g. <Image src=... />), it's shown when no uploads exist.
 * If uploaded asset is a video, renders a <video> tag; otherwise <img>.
 */
export default function MediaSlot({ slot, fallback = null, className = '', alt = '', videoAutoplay = true }) {
  const { items, loading } = useMediaSlot(slot)
  if (loading) return fallback || null
  if (!items || items.length === 0) return fallback || null
  const item = items[0]
  if (item.resource_type === 'video') {
    return (
      <video
        src={item.secure_url}
        autoPlay={videoAutoplay}
        muted
        loop
        playsInline
        className={className}
      />
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.secure_url} alt={item.alt || alt} className={className} />
  )
}

/**
 * MediaGallery — renders all uploaded items in a slot/category.
 * Each item can be an image or video. Falls back to nothing if empty.
 */
export function MediaGallery({ items, className = 'grid grid-cols-2 md:grid-cols-3 gap-3', itemClassName = 'aspect-square object-cover w-full h-full' }) {
  if (!items || items.length === 0) return null
  return (
    <div className={className}>
      {items.map((it) => (
        <div key={it.id} className="overflow-hidden rounded">
          {it.resource_type === 'video' ? (
            <video src={it.secure_url} muted loop playsInline className={itemClassName} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={it.secure_url} alt={it.alt || ''} className={itemClassName} />
          )}
        </div>
      ))}
    </div>
  )
}
