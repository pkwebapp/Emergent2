'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Lock, Download, Image as ImageIcon, Heart, Loader2 } from 'lucide-react'
import { PageHeader } from '@/components/site/Chrome'

export default function ClientAuth() {
  const [form, setForm] = useState({ name: '', phone: '' })
  const [exchanging, setExchanging] = useState(false)
  const processed = useRef(false)

  // Handle Emergent OAuth callback: URL fragment #session_id=...
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (!hash.includes('session_id=')) return
    if (processed.current) return
    processed.current = true
    setExchanging(true)
    const sessionId = new URLSearchParams(hash.slice(1)).get('session_id')
    ;(async () => {
      try {
        const r = await fetch('/api/auth/google-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ session_id: sessionId }),
        })
        if (!r.ok) throw new Error('exchange failed')
        // Reload without the hash so the server renders the authed dashboard.
        window.location.replace('/client')
      } catch {
        window.history.replaceState(null, '', '/client')
        setExchanging(false)
      }
    })()
  }, [])

  const signInWithGoogle = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/client'
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`
  }

  if (exchanging) {
    return (
      <main className="bg-[#EEEAE1] min-h-[70vh] grid place-content-center" data-testid="client-exchanging">
        <div className="flex flex-col items-center gap-3 text-[#8A857D]">
          <Loader2 className="animate-spin text-[#FF5B22]" size={30} />
          <span className="text-sm">Signing you in…</span>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#EEEAE1]">
      <PageHeader
        eyebrow="05 / Client Portal"
        title={<>Welcome <span className="text-[#FF5B22] italic font-medium">back.</span></>}
        subtitle="Access your personalized dashboard, downloads, and booking history."
      />
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="flex flex-col gap-8 md:grid md:grid-cols-12">
            <div className="col-span-12 md:col-span-6 rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-8 md:p-10">
              <div className="w-12 h-12 rounded-xl bg-[#F3E4DC] text-[#FF5B22] grid place-content-center mb-6"><Lock size={20} /></div>
              <h2 className="display text-3xl">Sign in</h2>
              <p className="mt-2 text-sm text-[#8A857D]">Use your Google account for instant, secure access to your private galleries.</p>

              <button onClick={signInWithGoogle} data-testid="google-signin-btn" className="mt-8 w-full inline-flex items-center justify-center gap-3 border border-[#DBD4C6] h-12 rounded-full font-semibold text-sm hover:border-[#FF5B22] hover:shadow-md transition-all">
                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                Continue with Google
              </button>

              <div className="my-6 flex items-center gap-4 text-xs text-[#8A857D]">
                <span className="flex-1 h-px bg-[#DBD4C6]" /> or use your phone <span className="flex-1 h-px bg-[#DBD4C6]" />
              </div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('OTP sent to ' + form.phone) }}>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Full Name</span>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none" placeholder="Your name" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Mobile Number</span>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none" placeholder="+91…" />
                </label>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#161514] text-white h-12 rounded-full font-semibold text-sm hover:bg-[#FF5B22] transition-colors">
                  Continue <ArrowRight size={14} />
                </button>
              </form>
              <p className="mt-6 text-xs text-center text-[#8A857D]">By signing in you agree to our <Link href="#" className="underline">Terms</Link> and <Link href="#" className="underline">Privacy Policy</Link>.</p>
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
              {[
                { i: <ImageIcon size={18} />, t: 'Private Galleries', d: 'Every completed shoot gets its own private gallery. Download originals, share links, order prints.' },
                { i: <Download size={18} />, t: 'One-click Downloads', d: 'Download individual images or your full album in a single click. Never lose a memory.' },
                { i: <Heart size={18} />, t: 'Favourites & Selects', d: 'Star your favourites during selection rounds. We use your picks to guide final edits.' },
              ].map((f, i) => (
                <div key={i} className="rounded-2xl border border-[#DBD4C6] p-6 bg-gradient-to-br from-[#EEEAE1] to-[#E6E1D5] hover:border-[#FF5B22] transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#FF5B22] text-white grid place-content-center mb-4">{f.i}</div>
                  <h3 className="display text-xl">{f.t}</h3>
                  <p className="mt-2 text-sm text-[#8A857D] leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
