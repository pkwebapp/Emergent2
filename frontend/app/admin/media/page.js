'use client'

import { useEffect, useState } from 'react'
import ImageUploader from '@/components/media/ImageUploader'
import { listMedia, deleteMedia, updateMedia } from '@/lib/cloudinary'

/* ================================================================
   Slot configuration — organised by section.
   Each entry: { slot, title, description, multiple, acceptVideo?, category? }
================================================================ */
const HERO_SLOT = 'hero-slides'
const GALLERY_CATEGORIES = [
  'wedding', 'prewedding', 'headshots', 'boudoir', 'brandshoot',
  'editorial', 'festival', 'food', 'celebrity', 'realestate',
  'portrait', 'outdoor', 'baby', 'ads', 'ecommerce', 'design',
  'live-streaming', 'wgoa',
]

const HOME_SLOTS = [
  { slot: 'hero-slides', title: 'Hero slides (rotating — images or videos)', description: 'Big rotating photos/videos in the home hero. Videos autoplay muted and loop.', multiple: true, acceptVideo: true },
  { slot: 'home-about-portrait', title: 'About section portrait', description: 'The portrait shown in the "About the studio" section on Home.', multiple: false },
  { slot: 'home-portfolio-featured', title: 'Featured portfolio strip', description: 'Photos in the Featured Portfolio strip on the home page.', multiple: true },
  { slot: 'home-clients', title: 'Client logos', description: 'Logo images for the "trusted by" client strip.', multiple: true },
]

// Aligned with the OFFICIAL /services listing (lib/services.js).
// Each entry: { slug: matches /services/{slug} on the site, label }
const SERVICE_PAGES = [
  { key: 'weddings', label: 'Weddings' },
  { key: 'events', label: 'Events' },
  { key: 'portraits-headshots', label: 'Portraits & Headshots' },
  { key: 'editorial-portfolio', label: 'Editorial & Portfolio' },
  { key: 'live-streaming', label: 'Live Streaming' },
  { key: 'family-kids', label: 'Family & Kids' },
  { key: 'fashion-shoots', label: 'Fashion Shoots' },
  { key: 'boudoir-shoots', label: 'Boudoir' },
  { key: 'brand-content', label: 'Brand & Content' },
  { key: 'product-ecommerce', label: 'Product & E-Commerce' },
  { key: 'food-photography', label: 'Food' },
  { key: 'corporate-industrial', label: 'Corporate & Industrial' },
  { key: 'real-estate-architectural', label: 'Real Estate & Architectural' },
  { key: 'influencer-celebrity', label: 'Influencer & Celebrity' },
  { key: 'podcast-production', label: 'Podcast Production' },
  { key: 'editing-retouching', label: 'Photo & Video Editing' },
  { key: 'album-design', label: 'Album Design & Printing' },
  { key: 'drone-services', label: 'Drone Photography' },
  { key: 'design-services', label: 'Design Services' },
]

// Legacy pages (older direct URLs like /wedding, /headshots — still exist on site)
const LEGACY_PAGES = [
  { key: 'wedding', label: 'Wedding (legacy /wedding)' },
  { key: 'headshots', label: 'Headshots (legacy)' },
  { key: 'portrait', label: 'Portrait (legacy)' },
  { key: 'boudoir', label: 'Boudoir (legacy)' },
  { key: 'brandshoot', label: 'Brand shoot (legacy)' },
  { key: 'editorial', label: 'Editorial (legacy)' },
  { key: 'festival', label: 'Festival' },
  { key: 'food', label: 'Food (legacy)' },
  { key: 'celebrity', label: 'Celebrity (legacy)' },
  { key: 'realestate', label: 'Real estate (legacy)' },
  { key: 'outdoor', label: 'Outdoor' },
  { key: 'baby', label: 'Baby' },
  { key: 'ads', label: 'Ads' },
  { key: 'ecommerce', label: 'E-commerce (legacy)' },
  { key: 'design', label: 'Design (legacy)' },
  { key: 'wgoa', label: 'Weddings Goa' },
]

const TABS = [
  { key: 'home', label: 'Home' },
  { key: 'services', label: 'Service Pages' },
  { key: 'gallery', label: 'Galleries' },
  { key: 'blog', label: 'Blog' },
  { key: 'portfolio', label: 'Portfolio' },
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
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-8">
        <h1 className="text-2xl font-semibold text-neutral-100">Admin Media Panel</h1>
        <p className="mt-1 text-sm text-neutral-400">Enter the admin token to continue.</p>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin token"
          className="mt-6 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3 text-neutral-100 focus:outline-none focus:border-orange-500"
          autoFocus
        />
        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}
        <button type="submit" disabled={busy || !password}
          className="mt-6 w-full rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium py-3">
          {busy ? 'Verifying…' : 'Unlock'}
        </button>
      </form>
    </div>
  )
}

/* ================= Media Card + Grid ================= */
function MediaCard({ item, onDelete, onSortSave, sortValue, onSortChange }) {
  const isVideo = item.resource_type === 'video'
  return (
    <div className="group relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
      {isVideo ? (
        <video src={item.secure_url} muted loop playsInline className="w-full h-40 object-cover" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.secure_url} alt={item.alt || ''} className="w-full h-40 object-cover" />
      )}
      <div className="p-2 text-xs text-neutral-400 flex items-center justify-between gap-2">
        <input type="number" value={sortValue} onChange={(e) => onSortChange(Number(e.target.value))}
          onBlur={onSortSave}
          className="w-16 rounded bg-neutral-800 border border-neutral-700 px-2 py-1 text-neutral-100"
          title="Sort order" />
        <span className="text-[10px] text-neutral-500 uppercase">{isVideo ? 'video' : 'image'}</span>
        <button onClick={() => onDelete(item)}
          className="rounded bg-red-500/10 hover:bg-red-500/20 text-red-300 px-2 py-1">Delete</button>
      </div>
    </div>
  )
}

function MediaGrid({ items, adminToken, onChanged }) {
  const [drafts, setDrafts] = useState({})

  const del = async (item) => {
    if (!confirm(`Delete ${item.original_filename || item.public_id}? This removes it from Cloudinary too.`)) return
    try { await deleteMedia(item.id, adminToken); onChanged() }
    catch (e) { alert(e.message) }
  }

  const changeSort = (id, value) => setDrafts((old) => ({ ...old, [id]: value }))

  const saveSort = async (item) => {
    const value = drafts[item.id]
    if (value == null || value === item.sort_order) return
    try { await updateMedia(item.id, { sort_order: value }, adminToken); onChanged() }
    catch (e) { alert(e.message) }
  }

  if (!items.length) {
    return <div className="text-sm text-neutral-500 mt-4">No items yet. Upload some above.</div>
  }
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {items.map((item) => (
        <MediaCard key={item.id}
          item={item}
          sortValue={drafts[item.id] ?? item.sort_order}
          onSortChange={(v) => changeSort(item.id, v)}
          onSortSave={() => saveSort(item)}
          onDelete={del} />
      ))}
    </div>
  )
}

/* ================= Slot Section ================= */
function SlotSection({ adminToken, slot, title, description, multiple = false, acceptVideo = false, category }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { items } = await listMedia({ slot })
    setItems(items || [])
    setLoading(false)
  }
  useEffect(() => { load() /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [slot])

  return (
    <div className="mt-8 border border-neutral-800 rounded-xl p-5 bg-neutral-950/40">
      <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>
      <p className="mt-1 text-sm text-neutral-400">{description}</p>
      <p className="mt-1 text-xs text-neutral-500">Slot: <code className="bg-neutral-900 px-1.5 py-0.5 rounded">{slot}</code></p>
      <div className="mt-4">
        <ImageUploader
          category={category || 'homepage'}
          slot={slot}
          adminToken={adminToken}
          multiple={multiple}
          acceptVideo={acceptVideo}
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

/* ================= Home tab ================= */
function HomeTab({ adminToken }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Home Page</h2>
      <p className="mt-1 text-sm text-neutral-400">Manage every visible media area on the home page.</p>
      {HOME_SLOTS.map((s) => (
        <SlotSection key={s.slot} adminToken={adminToken} {...s} category="homepage" />
      ))}
    </div>
  )
}

/* ================= Service Pages tab ================= */
function ServicesTab({ adminToken }) {
  const [group, setGroup] = useState('official') // 'official' | 'legacy'
  const list = group === 'official' ? SERVICE_PAGES : LEGACY_PAGES
  const [page, setPage] = useState(list[0].key)
  const active = list.find((p) => p.key === page) || list[0]
  const bannerSlot = `${active.key}-banner`
  const gallerySlot = `${active.key}-gallery`

  // Keep page valid when switching groups
  useEffect(() => { setPage(list[0].key) /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [group])

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Service Pages</h2>
      <p className="mt-1 text-sm text-neutral-400">Every service page has a banner strip (top of page) and a gallery. Upload images or videos.</p>
      <div className="mt-4 inline-flex rounded-full border border-neutral-800 p-1 bg-neutral-950">
        <button onClick={() => setGroup('official')}
          className={`text-xs px-4 py-1.5 rounded-full ${group === 'official' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'}`}
        >Official services (/services/…)</button>
        <button onClick={() => setGroup('legacy')}
          className={`text-xs px-4 py-1.5 rounded-full ${group === 'legacy' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'}`}
        >Legacy pages (/wedding, /headshots…)</button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {list.map((p) => (
          <button key={p.key} onClick={() => setPage(p.key)}
            className={`text-sm rounded-full px-3 py-1 border ${page === p.key ? 'bg-orange-500 border-orange-500 text-white' : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'}`}
          >{p.label}</button>
        ))}
      </div>
      <SlotSection
        adminToken={adminToken}
        slot={bannerSlot}
        title={`${active.label} — Page Banner (images / videos)`}
        description={`Renders as a full-width banner at the top of the ${active.label} page. First item is the big hero (image or video). Remaining items form a marquee strip.`}
        multiple
        acceptVideo
        category={active.key}
      />
      <SlotSection
        adminToken={adminToken}
        slot={gallerySlot}
        title={`${active.label} — Gallery`}
        description={`Renders as an image grid on the ${active.label} page.`}
        multiple
        category={active.key}
      />
    </div>
  )
}

/* ================= Gallery tab (existing category-based) ================= */
function GalleryTab({ adminToken }) {
  const [cat, setCat] = useState(GALLERY_CATEGORIES[0])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { items } = await listMedia({ category: cat })
    setItems((items || []).filter((i) => !i.slot || i.slot === 'gallery'))
    setLoading(false)
  }
  useEffect(() => { load() /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [cat])

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Galleries (main /gallery listing)</h2>
      <p className="mt-1 text-sm text-neutral-400">Bulk upload photos per category — shown on the site&apos;s master gallery listing.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {GALLERY_CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)}
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

/* ================= Blog tab ================= */
function BlogTab({ adminToken }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Blog</h2>
      <p className="mt-1 text-sm text-neutral-400">Cover images shown on the blog listing page and inside posts.</p>
      <SlotSection
        adminToken={adminToken}
        slot="blog-covers"
        title="Blog listing cover images"
        description="Images shown as covers on the Blog listing page."
        multiple
        category="blog"
      />
      <SlotSection
        adminToken={adminToken}
        slot="blog-banner"
        title="Blog page top banner"
        description="Banner strip at the top of the Blog listing page."
        multiple
        acceptVideo
        category="blog"
      />
    </div>
  )
}

/* ================= Portfolio tab ================= */
function PortfolioTab({ adminToken }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Portfolio Page</h2>
      <p className="mt-1 text-sm text-neutral-400">Images used on the /portfolio page.</p>
      <SlotSection
        adminToken={adminToken}
        slot="portfolio-banner"
        title="Portfolio page banner"
        description="Top-of-page banner (image or video)."
        multiple
        acceptVideo
        category="portfolio"
      />
      <SlotSection
        adminToken={adminToken}
        slot="portfolio-gallery"
        title="Portfolio gallery"
        description="Photos shown in the main portfolio grid."
        multiple
        category="portfolio"
      />
    </div>
  )
}

/* ================= Main Page ================= */
export default function AdminMediaPage() {
  const [token, setToken] = useState(null)
  const [checked, setChecked] = useState(false)
  const [tab, setTab] = useState('home')

  useEffect(() => {
    const t = localStorage.getItem('pk_admin_token')
    if (t) {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      fetch(`${backend}/api/admin/verify`, { headers: { Authorization: `Bearer ${t}` } })
        .then((r) => { if (r.ok) setToken(t); else localStorage.removeItem('pk_admin_token') })
        .finally(() => setChecked(true))
    } else {
      setChecked(true)
    }
  }, [])

  const logout = () => { localStorage.removeItem('pk_admin_token'); setToken(null) }

  if (!checked) return <div className="min-h-screen bg-[#0e0d0c] text-neutral-400 flex items-center justify-center">Loading…</div>
  if (!token) return <div className="min-h-screen bg-[#0e0d0c] text-neutral-100"><LoginGate onOK={setToken} /></div>

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">Media Admin</h1>
            <p className="text-sm text-neutral-400">Upload &amp; manage every image/video across the site.</p>
          </div>
          <button onClick={logout} className="text-sm rounded-md border border-neutral-700 hover:border-neutral-500 px-3 py-1.5">Log out</button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-neutral-800 pb-2">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`text-sm rounded-t-md px-4 py-2 ${tab === t.key ? 'bg-neutral-900 text-white border border-neutral-800 border-b-0' : 'text-neutral-400 hover:text-white'}`}
            >{t.label}</button>
          ))}
        </div>

        <div className="mt-6">
          {tab === 'home' && <HomeTab adminToken={token} />}
          {tab === 'services' && <ServicesTab adminToken={token} />}
          {tab === 'gallery' && <GalleryTab adminToken={token} />}
          {tab === 'blog' && <BlogTab adminToken={token} />}
          {tab === 'portfolio' && <PortfolioTab adminToken={token} />}
        </div>
      </div>
    </div>
  )
}
