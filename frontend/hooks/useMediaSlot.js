'use client'

import { useEffect, useState } from 'react'
import { backendUrl } from '@/lib/backend'

/**
 * Fetches media records for a given slot or category.
 * Returns { items, loading }.
 */
export function useMediaSlot(slot) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!slot) { setLoading(false); return }
    let cancelled = false
    const backend = backendUrl()
    fetch(`${backend}/api/media?slot=${encodeURIComponent(slot)}`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => { if (!cancelled) { setItems(data?.items || []); setLoading(false) } })
      .catch(() => { if (!cancelled) { setItems([]); setLoading(false) } })
    return () => { cancelled = true }
  }, [slot])
  return { items, loading }
}

export function useMediaCategory(category) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!category) { setLoading(false); return }
    let cancelled = false
    const backend = backendUrl()
    fetch(`${backend}/api/media?category=${encodeURIComponent(category)}`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => { if (!cancelled) { setItems(data?.items || []); setLoading(false) } })
      .catch(() => { if (!cancelled) { setItems([]); setLoading(false) } })
    return () => { cancelled = true }
  }, [category])
  return { items, loading }
}


/**
 * Inside/article images for a blog post, ordered by the admin "Sort order"
 * (so item marked 1 comes first, then 2, 3, 4 …). Slot = `blog-inside-<postId>`.
 * Returns { images: [secure_url, …], pick }.
 *   pick(n, fallback) -> the n-th (1-based) uploaded image, else fallback.
 */
export function useBlogInside(postId) {
  const { items } = useMediaSlot(postId ? `blog-inside-${postId}` : null)
  const imageItems = items.filter((i) => i.resource_type === 'image' && i.secure_url)
  const images = [...imageItems]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((i) => i.secure_url)
  // pick(n): the image whose "Sort order" === n (1-based position in the
  // article). Empty positions fall back to the built-in image.
  const pick = (n, fallback) => {
    const hit = imageItems.find((i) => Number(i.sort_order) === n)
    return hit?.secure_url || fallback
  }
  return { images, pick }
}
