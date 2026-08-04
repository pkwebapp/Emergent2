'use client'

import { useState } from 'react'
import { Download, Heart, LogOut, ShieldCheck, Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/site/Chrome'

const GALLERY = [
  'https://res.cloudinary.com/ddamvvrby/image/upload/v1764433882/carousel-images/x8dfyruht0f52mzy8z9j.jpg',
  'https://res.cloudinary.com/ddamvvrby/image/upload/v1764433947/carousel-images/fgbuoicipe3uxxx6bjmp.jpg',
  'https://res.cloudinary.com/ddamvvrby/image/upload/v1764433993/carousel-images/bsdbxtu9tbgxsppl2mug.jpg',
  'https://res.cloudinary.com/ddamvvrby/image/upload/v1764434019/carousel-images/kzw0scmrr3tidz4viw79.jpg',
  'https://res.cloudinary.com/ddamvvrby/image/upload/v1764434035/carousel-images/dl8tpfoygwvsg9hwlcbr.jpg',
  'https://res.cloudinary.com/ddamvvrby/image/upload/v1764434059/carousel-images/chjn5dwyaioqwtiznous.jpg',
]

export default function ClientDashboard({ user }) {
  const [busy, setBusy] = useState(false)

  const logout = async () => {
    setBusy(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } finally {
      window.location.replace('/client')
    }
  }

  const initials = (user.name || user.email || 'C').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
  const firstName = (user.name || 'friend').split(' ')[0]

  return (
    <main className="bg-[#EEEAE1]" data-testid="client-dashboard">
      <PageHeader
        eyebrow="05 / Client Portal"
        title={<>Welcome, <span className="text-[#FF5B22] italic font-medium">{firstName}.</span></>}
        subtitle="Your private galleries, downloads and booking history — all in one place."
      />
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-[#DBD4C6] bg-gradient-to-br from-[#EEEAE1] to-[#E6E1D5] p-5 md:p-6">
            <div className="flex items-center gap-4">
              {user.picture ? (
                <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-full ring-2 ring-[#F3E4DC] object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#FF5B22] text-white grid place-content-center font-semibold">{initials}</div>
              )}
              <div>
                <div className="font-semibold text-[#161514] flex items-center gap-2" data-testid="client-user-name">
                  {user.name || user.email}
                  {user.role === 'owner' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-[#161514] text-white px-2 py-0.5 rounded-full">
                      <ShieldCheck size={11} /> Owner
                    </span>
                  )}
                </div>
                <div className="text-sm text-[#8A857D]" data-testid="client-user-email">{user.email}</div>
              </div>
            </div>
            <button onClick={logout} disabled={busy} data-testid="client-logout-btn" className="inline-flex items-center justify-center gap-2 border border-[#DBD4C6] text-[#161514] h-11 px-5 rounded-full font-semibold text-sm hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors disabled:opacity-60">
              {busy ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />} Sign out
            </button>
          </div>

          <div className="mt-10 flex items-end justify-between">
            <div>
              <div className="eyebrow mb-2">Delivered Gallery</div>
              <h2 className="display text-3xl md:text-4xl">Your latest shoot.</h2>
            </div>
            <button className="hidden sm:inline-flex items-center gap-2 bg-[#161514] text-white h-11 px-5 rounded-full font-semibold text-sm hover:bg-[#FF5B22] transition-colors" data-testid="download-all-btn">
              <Download size={15} /> Download all
            </button>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((src, i) => (
              <div key={i} className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#DBD4C6]" data-testid={`gallery-item-${i}`}>
                <img src={src} alt={`Delivered photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button aria-label="Favourite" className="w-9 h-9 rounded-full bg-[#EEEAE1]/95 text-[#161514] grid place-content-center hover:text-[#FF5B22]"><Heart size={15} /></button>
                  <button aria-label="Download" className="w-9 h-9 rounded-full bg-[#EEEAE1]/95 text-[#161514] grid place-content-center hover:text-[#FF5B22]"><Download size={15} /></button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#8A857D]">Your private galleries appear here after each shoot. Star favourites during selection rounds and download originals anytime.</p>
        </div>
      </section>
    </main>
  )
}
