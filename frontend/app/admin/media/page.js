'use client'

import { useEffect, useState } from 'react'
import ImageUploader from '@/components/media/ImageUploader'
import { listMedia, deleteMedia, updateMedia } from '@/lib/cloudinary'

const HERO_SLOT = 'hero-slides'
const GALLERY_CATEGORIES = [
  'wedding', 'prewedding', 'headshots', 'boudoir', 'brandshoot',
  'editorial', 'festival', 'food', 'celebrity', 'realestate',
  'portrait', 'outdoor', 'baby', 'ads',
]

const TABS = [
  { key: 'hero', label: 'Hero Slides' },
  { key: 'gallery', label: 'Galleries' },
  { key: 'about', label: 'About' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'blog', label: 'Blog' },
]

/* ================= Login Gate ================= */
function LoginGate({ onOK }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      const res = await fetch(`${backend}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('pk_admin_token', data.token)
      onOK(data.token)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-8">
        <h1 className="text-2xl font-semibold text-neutral-100">Admin Media Panel</h1>
        <p className="mt-1 text-sm text-neutral-400">Enter the admin token to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin token"
          className="mt-6 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3 text-neutral-100 focus:outline-none focus:border-orange-500"
          autoFocus
        />
        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 w-full rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium py-3"
        >
          {busy ? 'Verifying…' : 'Unlock'}
        </button>
      </form>
    </div>
  )
}

/* ================= Media Card ================= */
function MediaCard({ item, onDelete, onSort, sortValue }) {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.secure_url} alt={item.alt || ''} className="w-full h-40 object-cover" />
      <div className="p-2 text-xs text-neutral-400 flex items-center justify-between gap-2">
        <input
          type="number"
          value={sortValue}
          onChange={(e) => onSort(Number(e.target.value))}
          className="w-16 rounded bg-neutral-800 border border-neutral-700 px-2 py-1 text-neutral-100"
          title="Sort order"
        />
        <button
          onClick={() => onDelete(item)}
          className="rounded bg-red-500/10 hover:bg-red-500/20 text-red-300 px-2 py-1"
        >Delete</button>
      </div>
    </div>
  )
}

/* ================= Media Grid ================= */
function MediaGrid({ items, adminToken, onChanged }) {
  const [drafts, setDrafts] = useState({})

  const del = async (item) => {
    if (!confirm(`Delete ${item.original_filename || item.public_id}? This removes it from Cloudinary too.`)) return
    try {
      await deleteMedia(item.id, adminToken)
      onChanged()
    } catch (e) {
      alert(e.message)
    }
  }

  const changeSort = (id, value) => {
    setDrafts((old) => ({ ...old, [id]: value }))
  }

  const saveSort = async (item) => {
    const value = drafts[item.id]
    if (value == null || value === item.sort_order) return
    try {
      await updateMedia(item.id, { sort_order: value }, adminToken)
      onChanged()
    } catch (e) {
      alert(e.message)
    }
  }

  if (!items.length) {
    return <div className="text-sm text-neutral-500 mt-4">No images yet. Upload some above.</div>
  }
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {items.map((item) => (
        <div key={item.id} onBlur={() => saveSort(item)}>
          <MediaCard
            item={item}
            sortValue={drafts[item.id] ?? item.sort_order}
            onSort={(v) => changeSort(item.id, v)}
            onDelete={del}
          />
        </div>
      ))}
    </div>
  )
}

/* ================= Hero Slides Section ================= */
function HeroSlidesSection({ adminToken }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { items } = await listMedia({ slot: HERO_SLOT })
    setItems(items || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Home Page — Hero Slides</h2>
      <p className="mt-1 text-sm text-neutral-400">
        Upload the images that rotate in the Home hero. Once you upload at least one, the site will use these instead of the built-in defaults. Order by the number under each thumbnail (lowest first).
      </p>
      <div className="mt-4">
        <ImageUploader
          category="homepage"
          slot={HERO_SLOT}
          adminToken={adminToken}
          multiple
          sortOrderStart={items.length}
          onUploaded={load}
          label="Drop hero images here (multiple allowed)"
        />
      </div>
      {loading ? (
        <div className="mt-6 text-sm text-neutral-500">Loading…</div>
      ) : (
        <MediaGrid items={items} adminToken={adminToken} onChanged={load} />
      )}
    </div>
  )
}

/* ================= Gallery Section ================= */
function GallerySection({ adminToken }) {
  const [cat, setCat] = useState(GALLERY_CATEGORIES[0])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { items } = await listMedia({ category: cat })
    // Only gallery-slot items (exclude hero-slides / about / portfolio when browsing gallery)
    setItems((items || []).filter(i => !i.slot || i.slot === 'gallery'))
    setLoading(false)
  }
  useEffect(() => { load() }, [cat])

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Galleries</h2>
      <p className="mt-1 text-sm text-neutral-400">Bulk upload photos into a gallery category. These render on that category's gallery page.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-sm rounded-full px-3 py-1 border ${cat === c ? 'bg-orange-500 border-orange-500 text-white' : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'}`}
          >{c}</button>
        ))}
      </div>

      <div className="mt-4">
        <ImageUploader
          category={cat}
          slot="gallery"
          adminToken={adminToken}
          multiple
          sortOrderStart={items.length}
          onUploaded={load}
          label={`Drop images for "${cat}" (multiple allowed)`}
        />
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-neutral-500">Loading…</div>
      ) : (
        <MediaGrid items={items} adminToken={adminToken} onChanged={load} />
      )}
    </div>
  )
}

/* ================= Simple slot sections (About / Portfolio / Blog) ================= */
function SlotSection({ adminToken, slot, title, description, category = 'homepage', multiple = false }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { items } = await listMedia({ slot })
    setItems(items || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [slot])

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">{title}</h2>
      <p className="mt-1 text-sm text-neutral-400">{description}</p>
      <div className="mt-4">
        <ImageUploader
          category={category}
          slot={slot}
          adminToken={adminToken}
          multiple={multiple}
          sortOrderStart={items.length}
          onUploaded={load}
        />
      </div>
      {loading ? (
        <div className="mt-6 text-sm text-neutral-500">Loading…</div>
      ) : (
        <MediaGrid items={items} adminToken={adminToken} onChanged={load} />
      )}
    </div>
  )
}

/* ================= Main Page ================= */
export default function AdminMediaPage() {
  const [token, setToken] = useState(null)
  const [checked, setChecked] = useState(false)
  const [tab, setTab] = useState('hero')

  useEffect(() => {
    const t = localStorage.getItem('pk_admin_token')
    if (t) {
      // verify with backend
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      fetch(`${backend}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${t}` },
      }).then((r) => {
        if (r.ok) setToken(t)
        else localStorage.removeItem('pk_admin_token')
      }).finally(() => setChecked(true))
    } else {
      setChecked(true)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('pk_admin_token')
    setToken(null)
  }

  if (!checked) {
    return <div className="min-h-screen bg-[#0e0d0c] text-neutral-400 flex items-center justify-center">Loading…</div>
  }
  if (!token) {
    return (
      <div className="min-h-screen bg-[#0e0d0c] text-neutral-100">
        <LoginGate onOK={setToken} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">Media Admin</h1>
            <p className="text-sm text-neutral-400">Upload &amp; manage images across the site (Cloudinary + MongoDB).</p>
          </div>
          <button onClick={logout} className="text-sm rounded-md border border-neutral-700 hover:border-neutral-500 px-3 py-1.5">
            Log out
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-neutral-800 pb-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-sm rounded-t-md px-4 py-2 ${tab === t.key ? 'bg-neutral-900 text-white border border-neutral-800 border-b-0' : 'text-neutral-400 hover:text-white'}`}
            >{t.label}</button>
          ))}
        </div>

        <div className="mt-6">
          {tab === 'hero' && <HeroSlidesSection adminToken={token} />}
          {tab === 'gallery' && <GallerySection adminToken={token} />}
          {tab === 'about' && (
            <SlotSection
              adminToken={token}
              slot="about"
              title="About Section Image"
              description="Upload a single image for the About/Studio section on the home page. If multiple are uploaded, the earliest is used."
              multiple={false}
            />
          )}
          {tab === 'portfolio' && (
            <SlotSection
              adminToken={token}
              slot="portfolio-featured"
              title="Featured Portfolio (Home Page)"
              description="Images shown in the Featured Portfolio strip on the home page."
              multiple
            />
          )}
          {tab === 'blog' && (
            <SlotSection
              adminToken={token}
              slot="blog-cover"
              title="Blog Cover Images"
              description="Cover images for the Blog listing page. Attach post-specific images via the Blog admin once we build it."
              multiple
              category="blog"
            />
          )}
        </div>
      </div>
    </div>
  )
}
