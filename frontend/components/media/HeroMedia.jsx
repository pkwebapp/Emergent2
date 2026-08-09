'use client'

import { useEffect, useRef, useState } from 'react'
import { useMediaSlot } from '@/hooks/useMediaSlot'

/**
 * HeroMedia — background media layer for a page hero.
 *
 * Behaviour:
 *   1. Shows the admin-uploaded IMAGE (from `slot`) as the hero background first.
 *   2. Loads the admin-uploaded VIDEO in the background; once it is FULLY loaded
 *      (canplaythrough), it fades in and plays over the image — so you see the
 *      photo instantly, then the video takes over smoothly.
 *
 * If the slot has no uploaded media, it falls back to `fallbackImage` /
 * `fallbackVideo` so existing pages keep their default hero.
 */
export default function HeroMedia({ slot, fallbackImage, fallbackVideo, className = '' }) {
  const { items } = useMediaSlot(slot)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef(null)

  const uploadedImage = items.find((i) => i.resource_type === 'image')?.secure_url
  const uploadedVideo = items.find((i) => i.resource_type === 'video')?.secure_url

  const posterUrl = uploadedImage || fallbackImage || ''
  const videoUrl = uploadedVideo || fallbackVideo || ''

  // Reset the fade whenever the video source changes.
  useEffect(() => {
    setVideoReady(false)
  }, [videoUrl])

  // If the video is already buffered by the time the ref mounts, reflect it.
  useEffect(() => {
    const v = videoRef.current
    if (v && v.readyState >= 4) setVideoReady(true)
  }, [videoUrl])

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Photo layer — visible immediately, stays until the video is ready */}
      {posterUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video layer — fades in only after it is fully loaded */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoReady(true)}
          onLoadedData={(e) => { if (e.currentTarget.readyState >= 4) setVideoReady(true) }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}
