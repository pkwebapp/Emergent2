'use client'

import { useEffect, useState } from 'react'

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
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
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
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    fetch(`${backend}/api/media?category=${encodeURIComponent(category)}`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => { if (!cancelled) { setItems(data?.items || []); setLoading(false) } })
      .catch(() => { if (!cancelled) { setItems([]); setLoading(false) } })
    return () => { cancelled = true }
  }, [category])
  return { items, loading }
}
