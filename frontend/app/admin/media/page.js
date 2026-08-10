'use client'

import { useEffect, useState } from 'react'
import ImageUploader from '@/components/media/ImageUploader'
import { listMedia, deleteMedia, updateMedia } from '@/lib/cloudinary'
import { POSTS as BLOG_POSTS } from '@/app/blogs/posts'

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

// Legacy pages removed — the old /wedding, /headshots, … routes have been
// deleted from the site, so their admin group is no longer needed.

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
function MediaCard({ item, onDelete, onSortSave, sortValue, onSortChange, showMeta, titleValue, locationValue, onTitleChange, onLocationChange, onMetaSave }) {
  const isVideo = item.resource_type === 'video'
  return (
    <div className="group relative rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800">
      {isVideo ? (
        <video src={item.secure_url} muted loop playsInline className="w-full h-40 object-cover" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.secure_url} alt={item.alt || ''} className="w-full h-40 object-cover" />
      )}
      {showMeta && (
        <div className="p-2 pb-0 space-y-1.5">
          <input
            type="text" value={titleValue} onChange={(e) => onTitleChange(e.target.value)} onBlur={onMetaSave}
            placeholder="Title (e.g. Ananya & Rohan)"
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-2 py-1 text-[11px] text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-orange-500"
            title="Title shown on the image" />
          <input
            type="text" value={locationValue} onChange={(e) => onLocationChange(e.target.value)} onBlur={onMetaSave}
            placeholder="Location (e.g. Taj Land's End · Mumbai)"
            className="w-full rounded bg-neutral-800 border border-neutral-700 px-2 py-1 text-[11px] text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-orange-500"
            title="Location shown on the image" />
        </div>
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

function MediaGrid({ items, adminToken, onChanged, showMeta = false }) {
  const [drafts, setDrafts] = useState({})
  const [metaDrafts, setMetaDrafts] = useState({})

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

  const changeMeta = (id, field, value) =>
    setMetaDrafts((old) => ({ ...old, [id]: { ...old[id], [field]: value } }))

  const saveMeta = async (item) => {
    const draft = metaDrafts[item.id] || {}
    const nextTitle = draft.alt ?? (item.alt || '')
    const nextLoc = draft.location ?? (item.location || '')
    const patch = {}
    if (nextTitle !== (item.alt || '')) patch.alt = nextTitle
    if (nextLoc !== (item.location || '')) patch.location = nextLoc
    if (!Object.keys(patch).length) return
    try { await updateMedia(item.id, patch, adminToken); onChanged() }
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
          showMeta={showMeta}
          sortValue={drafts[item.id] ?? item.sort_order}
          onSortChange={(v) => changeSort(item.id, v)}
          onSortSave={() => saveSort(item)}
          titleValue={metaDrafts[item.id]?.alt ?? (item.alt || '')}
          locationValue={metaDrafts[item.id]?.location ?? (item.location || '')}
          onTitleChange={(v) => changeMeta(item.id, 'alt', v)}
          onLocationChange={(v) => changeMeta(item.id, 'location', v)}
          onMetaSave={() => saveMeta(item)}
          onDelete={del} />
      ))}
    </div>
  )
}

/* ================= Slot Section ================= */
function SlotSection({ adminToken, slot, title, description, multiple = false, acceptVideo = false, category, startIndex = 0, showMeta = false }) {
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
          sortOrderStart={items.length + startIndex}
          onUploaded={load}
        />
      </div>
      {loading ? (
        <div className="mt-6 text-sm text-neutral-500">Loading…</div>
      ) : (
        <MediaGrid items={items} adminToken={adminToken} onChanged={load} showMeta={showMeta} />
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
  const list = SERVICE_PAGES
  const [page, setPage] = useState(list[0].key)
  const active = list.find((p) => p.key === page) || list[0]
  const bannerSlot = `${active.key}-banner`
  const gallerySlot = `${active.key}-gallery`

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Service Pages</h2>
      <p className="mt-1 text-sm text-neutral-400">Every service page has a banner strip (top of page) and a gallery. Upload images or videos.</p>
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
        description={`Renders as an image grid on the ${active.label} page. Add a Title and Location to each image — they appear over the photo on hover.`}
        multiple
        category={active.key}
        showMeta
      />
    </div>
  )
}

/* ================= Galleries tab — matches /gallery page tabs 1:1 =================
   Uploads here go to the SAME slot as the service page gallery,
   so a single upload shows on BOTH the /gallery listing AND the service page.
================================================================ */
const GALLERY_TABS = [
  { key: 'portfolio', label: 'Portfolio', slot: 'editorial-portfolio-gallery', category: 'editorial-portfolio', servicePage: '/services/editorial-portfolio' },
  { key: 'headshots', label: 'Headshots', slot: 'portraits-headshots-gallery', category: 'portraits-headshots', servicePage: '/services/portraits-headshots' },
  { key: 'weddings', label: 'Weddings', slot: 'weddings-gallery', category: 'weddings', servicePage: '/services/weddings' },
  { key: 'events', label: 'Events', slot: 'events-gallery', category: 'events', servicePage: '/services/events' },
]

function GalleryTab({ adminToken }) {
  const [key, setKey] = useState(GALLERY_TABS[0].key)
  const active = GALLERY_TABS.find((t) => t.key === key) || GALLERY_TABS[0]
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { items } = await listMedia({ slot: active.slot })
    setItems(items || [])
    setLoading(false)
  }
  useEffect(() => { load() /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [key])

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Galleries — the /gallery page tabs</h2>
      <p className="mt-1 text-sm text-neutral-400">
        These are the 4 tabs shown on your public <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-orange-300">/gallery</code> page.
        Each upload here also appears on the matching service page&apos;s gallery section — one upload, both places.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {GALLERY_TABS.map((t) => (
          <button key={t.key} onClick={() => setKey(t.key)}
            className={`text-sm rounded-full px-4 py-1.5 border ${key === t.key ? 'bg-orange-500 border-orange-500 text-white' : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'}`}
          >{t.label}</button>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-neutral-950/50 border border-neutral-800 px-4 py-3 text-xs text-neutral-400 flex flex-wrap gap-3 items-center">
        <span>Slot: <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-orange-300">{active.slot}</code></span>
        <span>·</span>
        <span>Appears on: <a href={active.servicePage} target="_blank" rel="noreferrer" className="underline hover:text-white">{active.servicePage}</a></span>
        <span>·</span>
        <span>and <a href={`/gallery?category=${active.key}`} target="_blank" rel="noreferrer" className="underline hover:text-white">/gallery?category={active.key}</a></span>
      </div>

      <div className="mt-4">
        <ImageUploader
          category={active.category}
          slot={active.slot}
          adminToken={adminToken}
          multiple
          acceptVideo
          sortOrderStart={items.length}
          onUploaded={load}
          label={`Drop images or videos for "${active.label}" (multiple allowed)`}
        />
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-neutral-500">Loading…</div>
      ) : (
        <MediaGrid items={items} adminToken={adminToken} onChanged={load} showMeta />
      )}
    </div>
  )
}

/* Blog posts that have a full article page wired to render numbered inside
   images. Value = how many ordered image spots that article supports. */
const ARTICLE_INSIDE_SLOTS = {
  'goa-wedding-guide': 4,
  'headshots-mumbai': 3,
  'pre-wedding-goa': 10,
  'wedding-package': 7,
  'corporate-playbook': 6,
}

/* ================= Blog tab ================= */
function BlogTab({ adminToken }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-100">Blog</h2>
      <p className="mt-1 text-sm text-neutral-400">Manage the blog page banner and the cover image of every blog post. New posts you add to the site appear here automatically.</p>
      <SlotSection
        adminToken={adminToken}
        slot="blog-banner"
        title="Blog page top banner (hero)"
        description="Background media for the hero at the top of the /blogs page (image or video)."
        multiple
        acceptVideo
        category="blog"
      />

      <div className="mt-8 border-t border-neutral-800 pt-6">
        <h3 className="text-lg font-semibold text-neutral-100">Blog post covers</h3>
        <p className="mt-1 text-sm text-neutral-400">
          Each card below is one blog post. Upload a cover image and it replaces the default cover on the
          <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-orange-300 mx-1">/blogs</code>
          listing for that post. Leave empty to keep the built-in image. ({BLOG_POSTS.length} posts)
        </p>
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950/30 p-4">
            <div className="text-sm font-semibold text-orange-300">{post.title}</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Post id: <code className="bg-neutral-900 px-1 rounded">{post.id}</code></div>
            <SlotSection
              adminToken={adminToken}
              slot={`blog-cover-${post.id}`}
              title="Thumbnail / cover image"
              description={`Single cover shown on the /blogs card for this post. Falls back to ${post.image} if empty.`}
              multiple={false}
              category="blog-cover"
            />
            {ARTICLE_INSIDE_SLOTS[post.id] ? (
              <SlotSection
                adminToken={adminToken}
                slot={`blog-inside-${post.id}`}
                title={`Inside images (ordered 1 – ${ARTICLE_INSIDE_SLOTS[post.id]})`}
                description={`Images shown INSIDE the article. Set the "Sort order" on each to mark 1, 2, 3, 4 … — they fill this article's ${ARTICLE_INSIDE_SLOTS[post.id]} image spots in that order. Empty spots keep the built-in image.`}
                multiple
                category="blog-inside"
                startIndex={1}
              />
            ) : (
              <p className="mt-3 text-xs text-neutral-600 italic">This post links out / has no dedicated article layout, so it only has a cover image.</p>
            )}
          </div>
        ))}
      </div>
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
        description="Photos shown in the main portfolio grid. Add a Title and Location to each image — they appear over the photo on hover."
        multiple
        category="portfolio"
        showMeta
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
