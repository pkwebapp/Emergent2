'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ArrowRight, Menu, X, Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin, MessageCircle, User } from 'lucide-react'

/* -------- Shared image URLs (from real pkphotography.in) -------- */
export const IMG = {
  studio: 'https://pkphotography.in/images/studio.jpeg',
  p1: 'https://pkphotography.in/pricing/PKP_0763%20cover.jpg',
  p2: 'https://pkphotography.in/pricing/PKP_7916l.jpg',
  p3: 'https://pkphotography.in/pricing/PKP_2826.jpg',
  p4: 'https://pkphotography.in/pricing/PKP_8780pl.jpg',
  p5: 'https://pkphotography.in/pricing/0N3A7946.jpg',
  p6: 'https://pkphotography.in/pricing/PKP_551.jpg',
  p7: 'https://pkphotography.in/pricing/5S1A9900%20cover.jpg',
  p8: 'https://pkphotography.in/pricing/Anushka%204.jpg',
  v1: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1736666653/carousel-images/zpxixg7zyaqkcmavjgv8.jpg',
  v2: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1736666630/carousel-images/kfyabpofxwwkkpnjw4am.jpg',
  v3: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1736666501/carousel-images/qtd79jti7nx02czxtpff.jpg',
  v4: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1736666141/carousel-images/sfopw2s4oas311spclp5.jpg',
  v5: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1736667169/carousel-images/ziiadg7ohyf5ffb2dyga.jpg',
  v6: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1736667130/carousel-images/ttbnpl9tavmcrwwh9zon.jpg',
  v7: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1736667087/carousel-images/zcy76zsihwohwgomqxx0.jpg',
  v8: 'https://res.cloudinary.com/ddamvvrby/image/upload/v1736666853/carousel-images/jzm6vxnbgitc0jejgjga.jpg',
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Booking', href: '/booking' },
  { label: 'Client', href: '/client' },
]

export const CONTACT = {
  phone: '+91 8888766739',
  phoneRaw: '+918888766739',
  email: 'prabhakar@pkphotography.in',
  address: 'Andheri West, Mumbai 400053, Maharashtra',
  whatsapp: 'https://wa.me/918888766739',
  studios: [
    {
      city: 'Mumbai',
      label: 'Mumbai Studio',
      addressLines: [
        'C1302, Evershine Cosmic,',
        'Opp. Infiniti Mall, Veera Desai Industrial Estate,',
        'Andheri West, Mumbai, Maharashtra 400053',
      ],
      phone: '+91 8888766739',
      phoneRaw: '+918888766739',
      mapsUrl: 'https://share.google/KRRlSGRe31W2g95nU',
    },
    {
      city: 'Goa',
      label: 'Goa Studio',
      addressLines: [
        'House No. 1053 A, Madhlavaddo,',
        'Morjim, Goa 403512',
      ],
      phone: '+91 81888 81165',
      phoneRaw: '+918188881165',
      mapsUrl: 'https://share.google/Ej67vDaFeSCl2Zp4U',
    },
  ],
}

/* -------- WhatsApp enquiry link with pre-filled message (service + page) -------- */
const WA_NUMBER = '918888766739'

export function waLink({ service, page, pkg, price } = {}) {
  const bits = ["Hi PK Photography, I'd like to enquire"]
  if (service) bits.push(`about ${service}`)
  if (pkg) bits.push(`— the ${pkg} package`)
  if (price) bits.push(`priced ${price}`)
  if (page) bits.push(`(via the ${page} page)`)
  const message = bits.join(' ') + '.'
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

/* Turn a pathname into a readable page label, e.g. /services/weddings -> "Weddings" */
export function pageLabel(pathname) {
  if (!pathname || pathname === '/') return 'Home'
  const seg = pathname.split('/').filter(Boolean)
  const last = seg[seg.length - 1] || 'Home'
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/* -------- Logo (MakeMePulse-inspired animated mark) -------- */
export function Logo({ dark = false, size = 'md' }) {
  const sizeMap = {
    sm: { mark: 26, txt: 'text-[12px]', sub: 'text-[8px]' },
    md: { mark: 32, txt: 'text-[13px]', sub: 'text-[9px]' },
    lg: { mark: 54, txt: 'text-lg',     sub: 'text-[10px]' },
  }
  const s = sizeMap[size]
  const stroke = dark ? '#ffffff' : '#161514'
  return (
    <Link href="/" aria-label="PK Photography — Home" className="group relative flex items-center gap-2.5 select-none">
      {/* Animated mark: three parallelograms + orange bar */}
      <svg
        width={s.mark * 1.35}
        height={s.mark}
        viewBox="0 0 54 40"
        fill="none"
        className="shrink-0"
        aria-hidden
      >
        <defs>
          <clipPath id="pk-mark-clip"><rect x="0" y="0" width="54" height="40" /></clipPath>
        </defs>
        <g clipPath="url(#pk-mark-clip)">
          {/* three parallelograms, staggered */}
          {[0, 1, 2].map(k => (
            <motion.polygon
              key={k}
              points={`${4 + k * 9},4 ${16 + k * 9},4 ${12 + k * 9},36 ${0 + k * 9},36`}
              fill={stroke}
              initial={false}
              animate={{
                y: [0, -1.8, 0],
                opacity: [0.92, 1, 0.92],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: k * 0.35,
              }}
              className="origin-center group-hover:[transform:translateY(-1.5px)] transition-transform"
            />
          ))}
          {/* signature orange accent bar */}
          <motion.rect
            x="30"
            y="18"
            width="24"
            height="4"
            fill="#FF5B22"
            initial={{ scaleX: 0.6, originX: 0 }}
            animate={{ scaleX: [0.6, 1, 0.6] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            className="group-hover:[transform:scaleX(1)]"
          />
        </g>
      </svg>
      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          data-font="display"
          className={`${s.txt} font-medium tracking-tight ${dark ? 'text-white' : 'text-[#161514]'} relative overflow-hidden inline-block`}
        >
          <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full">PK Photography</span>
          <span className="inline-block absolute inset-0 translate-y-full text-[#FF5B22] transition-transform duration-500 ease-out group-hover:translate-y-0" aria-hidden>PK Photography</span>
        </span>
        <span className={`${s.sub} tracking-[0.32em] uppercase mt-1 ${dark ? 'text-white/60' : 'text-[#8A857D]'}`}>
          Mumbai · Goa · India
        </span>
      </div>
    </Link>
  )
}

/* -------- Preloader (disabled: caused stuck white overlay in production build) -------- */
export function Preloader() {
  return null
}

/* -------- Nav -------- */
export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(false)
  const [user, setUser] = useState(null)
  const pathname = usePathname()
  useEffect(() => {
    const s = () => {
      const y = window.scrollY
      setScrolled(y > 30)
      const hero = document.querySelector('[data-transparent-header="true"], [data-testid$="hero-section"], main > section:first-child')
      const heroBottom = hero?.getBoundingClientRect?.().bottom ?? 0
      // Keep header transparent while the visitor is still inside the page hero.
      setOverHero(heroBottom > 84)
    }
    s(); window.addEventListener('scroll', s, { passive: true }); window.addEventListener('resize', s); return () => { window.removeEventListener('scroll', s); window.removeEventListener('resize', s) }
  }, [pathname])
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    let active = true
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => (r.ok ? r.json() : null))
      .then(u => { if (active) setUser(u) })
      .catch(() => {})
    return () => { active = false }
  }, [pathname])
  const firstName = (user?.name || user?.email || 'Account').split(' ')[0]
  const avatarLetter = (user?.name || user?.email || 'U').slice(0, 1).toUpperCase()

  const darkHero = pathname === '/' || pathname === '/wedding' || pathname === '/services' || pathname.startsWith('/services/') || pathname.startsWith('/blog')
  const dark = overHero && darkHero // true = show light text over dark hero
  const headerBg = overHero
    ? 'bg-transparent py-5'
    : (scrolled ? 'bg-[#EEEAE1]/85 border-b border-[#DBD4C6] backdrop-blur-lg py-3' : 'bg-[#EEEAE1]/60 backdrop-blur-sm py-5')
  const linkBase = dark
    ? 'text-white/85 hover:text-white'
    : 'text-[#161514]/80 hover:text-[#FF5B22]'
  const activeCls = dark ? 'text-white' : 'text-[#FF5B22]'

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[90] transition-[background-color,padding,border-color,backdrop-filter] duration-500 ${headerBg}`}>
        <div className="container mx-auto max-w-[1400px] flex items-center justify-between px-6 md:px-10">
          <Logo dark={dark} />
          <nav className="hidden md:flex items-center gap-5 lg:gap-8">
            {NAV_LINKS.map(l => {
              const active = pathname === l.href
              return (
                <Link key={l.label} href={l.href} className={`relative text-[13px] font-medium whitespace-nowrap transition-colors ${active ? activeCls : linkBase}`}>
                  {l.label}
                  {active && <motion.span layoutId="nav-active" className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full ${dark ? 'bg-white' : 'bg-[#FF5B22]'}`} />}
                </Link>
              )
            })}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link href="/client" data-testid="nav-profile-btn" className={`hidden md:inline-flex items-center gap-2 text-[12px] font-semibold pl-1.5 pr-4 py-1.5 rounded-full transition-colors ${dark ? 'bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white hover:text-[#161514]' : 'bg-[#161514] text-white hover:bg-[#FF5B22]'}`}>
                {user.picture ? (
                  <img src={user.picture} alt={user.name || 'Profile'} referrerPolicy="no-referrer" className="w-7 h-7 rounded-full object-cover ring-1 ring-white/30" />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-[#FF5B22] grid place-content-center text-[11px] text-white">{avatarLetter}</span>
                )}
                {firstName}
              </Link>
            ) : (
              <Link href="/client" data-testid="nav-login-btn" className={`hidden md:inline-flex items-center gap-2 text-[12px] font-semibold px-5 py-3 rounded-full transition-colors ${dark ? 'bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white hover:text-[#161514]' : 'bg-[#161514] text-white hover:bg-[#FF5B22]'}`}>
                Login <ArrowRight size={14} />
              </Link>
            )}
            <button
              onClick={() => setOpen(true)}
              data-testid="hamburger-btn"
              aria-label="Open menu"
              className={`inline-flex items-center justify-center group ${dark ? 'text-white' : 'text-[#161514]'}`}
            >
              <span className="flex flex-col justify-center items-end gap-1.5 w-8 h-8">
                <span className={`block h-[2px] w-7 ${dark ? 'bg-white' : 'bg-[#161514]'} transition-all group-hover:w-5`} />
                <span className={`block h-[2px] w-5 ${dark ? 'bg-white' : 'bg-[#161514]'} transition-all group-hover:w-7`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <FullscreenMenu open={open} onClose={() => setOpen(false)} user={user} firstName={firstName} avatarLetter={avatarLetter} />
    </>
  )
}

/* -------- Fullscreen hamburger overlay (pkphotography.in style) -------- */
const OVERLAY_PRIMARY = [
  { label: 'Home',    href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog',    href: '/blogs' },
  { label: 'Booking', href: '/booking' },
  { label: 'Client',  href: '/client' },
]
const OVERLAY_SECONDARY = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Talents',   href: '/talents' },
  { label: 'Careers',   href: '/careers' },
  { label: 'Signup',    href: '/signup' },
  { label: 'Privacy Policy',     href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
]
const OVERLAY_STATS = [
  { n: '500+',  t: 'Weddings & Events' },
  { n: '700+',  t: 'Corporate Clients' },
  { n: '1000+', t: 'Portfolios Shot' },
  { n: '10+',   t: 'Years of Craft' },
]

function FullscreenMenu({ open, onClose, user, firstName, avatarLetter }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[110] bg-[#0b0b0b] text-white overflow-y-auto"
          data-testid="fullscreen-menu"
          role="dialog"
          aria-modal="true"
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-6 md:px-14 pt-6 md:pt-10">
            <Link href="/" onClick={onClose} aria-label="PK Photography — Home" className="flex items-center gap-2.5">
              <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden>
                <g stroke="#ffffff" strokeWidth="2" fill="none">
                  <rect x="3" y="12"  width="12" height="12" transform="rotate(-15 9 18)" />
                  <rect x="13" y="12" width="12" height="12" transform="rotate(-15 19 18)" />
                  <rect x="23" y="12" width="12" height="12" transform="rotate(-15 29 18)" />
                </g>
              </svg>
              <div className="leading-tight">
                <div className="text-[12px] font-semibold tracking-wide">PK</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/70">Photography</div>
              </div>
            </Link>
            <button
              onClick={onClose}
              data-testid="menu-close-btn"
              aria-label="Close menu"
              className="w-11 h-11 grid place-content-center rounded-full border border-white/15 hover:bg-white hover:text-black transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body grid */}
          <div className="px-6 md:px-14 pt-10 md:pt-16 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: primary nav */}
            <nav className="lg:col-span-8">
              <ul>
                {OVERLAY_PRIMARY.map((l, i) => {
                  const active = pathname === l.href
                  return (
                    <motion.li
                      key={l.label}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-white/15 group"
                    >
                      <Link
                        href={l.href}
                        onClick={onClose}
                        className={`block py-4 md:py-6 text-[44px] md:text-[76px] leading-[1.05] tracking-tight font-light transition-colors ${active ? 'text-white/40' : 'text-white group-hover:text-white/70'}`}
                      >
                        {l.label}
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Right column */}
            <aside className="lg:col-span-4 flex flex-col gap-10">
              {/* Secondary links */}
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="space-y-3 text-lg md:text-xl text-white/90"
              >
                {OVERLAY_SECONDARY.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} onClick={onClose} className="inline-block hover:text-[#FF5B22] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
                {user && (
                  <li>
                    <Link href="/client" onClick={onClose} className="inline-flex items-center gap-2 hover:text-[#FF5B22] transition-colors">
                      <span className="w-6 h-6 rounded-full bg-[#FF5B22] grid place-content-center text-[10px] text-white">{avatarLetter}</span>
                      {firstName}
                    </Link>
                  </li>
                )}
              </motion.ul>

              {/* Say hello */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-3">Say Hello</div>
                <a href={`tel:${CONTACT.phoneRaw}`} className="block text-base md:text-lg hover:text-[#FF5B22] transition-colors">
                  {CONTACT.phone}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="block text-base md:text-lg hover:text-[#FF5B22] transition-colors mt-1 break-all">
                  {CONTACT.email}
                </a>
                <div className="mt-3 text-sm text-white/60">Mumbai · Goa · Pan India</div>
              </motion.div>

              {/* Stats */}
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="space-y-2 text-sm md:text-base"
              >
                {OVERLAY_STATS.map((s) => (
                  <li key={s.t} className="text-white/80">
                    <span className="font-semibold text-white mr-2">{s.n}</span>{s.t}
                  </li>
                ))}
              </motion.ul>
            </aside>
          </div>

          {/* Footer socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="px-6 md:px-14 pb-8 md:pb-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-sm text-white/70"
          >
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/itspkphotography.in/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://x.com/pkphotographym?lang=en" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>
              <a href="https://www.linkedin.com/company/pkphotography/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.facebook.com/pkfashionphotography" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://www.youtube.com/@itspkphotography" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a>
            </div>
            <div className="text-white/40 text-[11px] uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} PK Photography
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* -------- WhatsApp float -------- */
export function WhatsAppFloat() {
  const pathname = usePathname()
  return (
    <a href={waLink({ page: pageLabel(pathname) })} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-6 right-6 z-[80] w-14 h-14 rounded-full bg-[#25D366] text-white grid place-content-center shadow-2xl hover:scale-110 transition-transform">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </a>
  )
}

/* -------- Footer (light theme, cyan accents, same content) -------- */
export function Footer() {
  const pathname = usePathname()
  return (
    <footer className="relative bg-[#EEEAE1] border-t border-[#DBD4C6] pt-20 pb-8 overflow-hidden">
      {/* Decorative cyan gradient blob */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.12), transparent 60%)' }} />

      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative">
        {/* Main footer grid */}
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <Logo size="lg" />
            <p className="mt-5 text-[#8A857D] leading-relaxed max-w-sm">Based in Andheri West, Mumbai, PK Photography provides professional photography and videography services across Mumbai, Goa and destination locations. From weddings and corporate events to commercial, product and real estate photography, we help people and brands create visuals that leave a lasting impression.</p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.instagram.com/itspkphotography.in/" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full grid place-content-center border border-[#DBD4C6] text-[#161514] hover:bg-[#FF5B22] hover:border-[#FF5B22] hover:text-white transition-colors"><Instagram size={16} /></a>
              <a href="https://www.facebook.com/pkfashionphotography" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full grid place-content-center border border-[#DBD4C6] text-[#161514] hover:bg-[#FF5B22] hover:border-[#FF5B22] hover:text-white transition-colors"><Facebook size={16} /></a>
              <a href="https://www.linkedin.com/company/pkphotography/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full grid place-content-center border border-[#DBD4C6] text-[#161514] hover:bg-[#FF5B22] hover:border-[#FF5B22] hover:text-white transition-colors"><Linkedin size={16} /></a>
              <a href="https://x.com/pkphotographym" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="w-10 h-10 rounded-full grid place-content-center border border-[#DBD4C6] text-[#161514] hover:bg-[#FF5B22] hover:border-[#FF5B22] hover:text-white transition-colors"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
              <a href="https://www.youtube.com/@itspkphotography" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full grid place-content-center border border-[#DBD4C6] text-[#161514] hover:bg-[#FF5B22] hover:border-[#FF5B22] hover:text-white transition-colors"><Youtube size={16} /></a>
              <a href={waLink({ page: pageLabel(pathname) })} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full grid place-content-center border border-[#DBD4C6] text-[#161514] hover:bg-[#FF5B22] hover:border-[#FF5B22] hover:text-white transition-colors"><MessageCircle size={16} /></a>
              <a href={`mailto:${CONTACT.email}`} aria-label="Email" className="w-10 h-10 rounded-full grid place-content-center border border-[#DBD4C6] text-[#161514] hover:bg-[#FF5B22] hover:border-[#FF5B22] hover:text-white transition-colors"><Mail size={16} /></a>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#161514] mb-4">Explore</div>
            <ul className="space-y-3 text-sm text-[#8A857D]">
              <li><Link href="/services" className="link-underline hover:text-[#FF5B22]">Services</Link></li>
              <li><Link href="/gallery" className="link-underline hover:text-[#FF5B22]">Gallery</Link></li>
              <li><Link href="/pricing" className="link-underline hover:text-[#FF5B22]">Pricing</Link></li>
              <li><Link href="/booking" className="link-underline hover:text-[#FF5B22]">Booking</Link></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#161514] mb-4">Support</div>
            <ul className="space-y-3 text-sm text-[#8A857D]">
              <li><Link href="/client" className="link-underline hover:text-[#FF5B22]">Client Login</Link></li>
              <li><Link href="/privacy-policy" className="link-underline hover:text-[#FF5B22]">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="link-underline hover:text-[#FF5B22]">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="link-underline hover:text-[#FF5B22]">Refund Policy</Link></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#161514] mb-4">Contact</div>
            <div className="space-y-4 text-sm">
              <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 group">
                <span className="w-9 h-9 rounded-full bg-[#F3E4DC] text-[#FF5B22] grid place-content-center shrink-0 group-hover:bg-[#FF5B22] group-hover:text-white transition-colors"><Mail size={14} /></span>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#8A857D]">Email</div>
                  <div className="text-[#161514] font-medium">{CONTACT.email}</div>
                </div>
              </a>
              {CONTACT.studios.map((s) => (
                <div key={s.city} className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#F3E4DC] text-[#FF5B22] grid place-content-center shrink-0"><MapPin size={14} /></span>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-widest text-[#8A857D]">{s.label}</div>
                    <a href={s.mapsUrl} target="_blank" rel="noreferrer" className="block text-[#161514] font-medium leading-snug hover:text-[#FF5B22] transition-colors">
                      {s.addressLines.map((l, i) => (
                        <span key={i} className="block">{l}</span>
                      ))}
                    </a>
                    <a href={`tel:${s.phoneRaw}`} className="mt-1 inline-flex items-center gap-1.5 text-[#8A857D] hover:text-[#FF5B22] transition-colors text-[13px]">
                      <Phone size={12} /> {s.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-16 pt-6 border-t border-[#DBD4C6] flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#8A857D]">
          <span>© {new Date().getFullYear()} PK Photography. All rights reserved.</span>
          <span className="flex items-center gap-2">Crafted with care in Mumbai <span className="w-1 h-1 rounded-full bg-[#FF5B22]" /></span>
        </div>
      </div>
    </footer>
  )
}

/* -------- Page section-header helper for inner pages -------- */
export function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-20 bg-[#EEEAE1] overflow-hidden">
      <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.18), transparent 60%)' }} />
      <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.10), transparent 60%)' }} />
      <div className="container mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <div className="eyebrow mb-4">{eyebrow}</div>
          <h1 className="display text-5xl md:text-7xl leading-[0.95]">{title}</h1>
          {subtitle && <p className="mt-6 text-lg text-[#8A857D] max-w-2xl leading-relaxed">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}

/* -------- Reading progress bar (site-wide) -------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden="true"
      data-testid="site-scroll-progress"
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#FF5B22] z-[95] origin-left pointer-events-none"
    />
  )
}

/* -------- Site chrome wrapper -------- */
/* -------- Enquiry tracker: logs every WhatsApp click (page-level analytics) -------- */
function EnquiryTracker() {
  const pathname = usePathname()
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target?.closest?.('a[href*="wa.me"]')
      if (!a) return
      let text = ''
      try { text = new URL(a.href).searchParams.get('text') || '' } catch (err) {}
      const path = pathname || window.location.pathname
      const payload = {
        path,
        page: pageLabel(path),
        text,
        href: a.href,
        referrer: document.referrer || '',
      }
      try {
        const url = '/api/enquiries/track'
        const bodyStr = JSON.stringify(payload)
        if (navigator.sendBeacon) navigator.sendBeacon(url, new Blob([bodyStr], { type: 'text/plain;charset=UTF-8' }))
        else fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: bodyStr, keepalive: true }).catch(() => {})
      } catch (err) {}
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])
  return null
}

export function SiteShell({ children }) {
  return (
    <>
      <ScrollProgress />
      <Preloader />
      <Nav />
      <div>{children}</div>
      <Footer />
      <WhatsAppFloat />
      <EnquiryTracker />
    </>
  )
}
