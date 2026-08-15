'use client'

import { useEffect, useState, useCallback } from 'react'
import { backendUrl } from '@/lib/backend'

/* ================= Login Gate ================= */
function LoginGate({ onOK }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      const res = await fetch(`${backendUrl()}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('pk_admin_token', data.token)
      onOK(data.token)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen grid place-content-center bg-[#161514] px-6">
      <form onSubmit={submit} className="w-[min(92vw,380px)] rounded-3xl bg-[#1F1D1B] border border-white/10 p-8" data-testid="enquiries-login-form">
        <h1 className="display text-3xl text-white">Enquiry analytics</h1>
        <p className="mt-2 text-sm text-white/50">Enter the admin token to view WhatsApp enquiry stats.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin token"
          data-testid="enquiries-login-input"
          className="mt-6 w-full rounded-full bg-[#161514] border border-white/15 px-5 py-3 text-white text-sm outline-none focus:border-[#FF5B22]"
        />
        {error && <div className="mt-3 text-sm text-red-400" data-testid="enquiries-login-error">{error}</div>}
        <button type="submit" disabled={busy} data-testid="enquiries-login-submit" className="mt-5 w-full rounded-full bg-[#FF5B22] text-white py-3 text-sm font-semibold hover:bg-[#E24A12] transition-colors disabled:opacity-60">
          {busy ? 'Checking…' : 'View analytics'}
        </button>
      </form>
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return '—'
  try { return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) } catch { return iso }
}

export default function EnquiriesPage() {
  const [token, setToken] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('pk_admin_token') : null
    if (t) setToken(t)
  }, [])

  const load = useCallback(async (t) => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${backendUrl()}/api/enquiries/stats`, {
        headers: { Authorization: `Bearer ${t}` },
      })
      if (res.status === 401) { localStorage.removeItem('pk_admin_token'); setToken(null); return }
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load')
      setData(json)
    } catch (err) {
      setError(err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { if (token) load(token) }, [token, load])

  if (!token) return <LoginGate onOK={setToken} />

  const pages = data?.pages || []
  const total = data?.total || 0
  const maxCount = pages.reduce((m, p) => Math.max(m, p.count), 0) || 1

  return (
    <div className="min-h-screen bg-[#EEEAE1] text-[#161514] pt-28 pb-20" data-testid="enquiries-dashboard">
      <div className="container mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Analytics</div>
            <h1 className="display text-4xl md:text-5xl">WhatsApp enquiries</h1>
            <p className="mt-3 text-[#8A857D]">Which pages drive the most WhatsApp enquiries.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#161514] text-white px-5 py-3 text-center" data-testid="enquiries-total">
              <div className="display text-3xl">{total}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">Total clicks</div>
            </div>
            <button onClick={() => load(token)} data-testid="enquiries-refresh" className="rounded-full border border-[#DBD4C6] px-5 py-3 text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>

        {error && <div className="mt-6 rounded-2xl bg-red-100 border border-red-200 text-red-700 px-5 py-3 text-sm" data-testid="enquiries-error">{error}</div>}

        {/* Ranking by page */}
        <div className="mt-10 rounded-3xl border border-[#DBD4C6] bg-[#F5EFE6] p-6 md:p-8" data-testid="enquiries-by-page">
          <h2 className="text-lg font-semibold mb-5">Enquiries by page</h2>
          {pages.length === 0 && !loading ? (
            <p className="text-[#8A857D] text-sm" data-testid="enquiries-empty">No enquiries tracked yet. Once visitors tap an “Enquire on WhatsApp” button, they’ll appear here.</p>
          ) : (
            <div className="space-y-3">
              {pages.map((p, i) => (
                <div key={p.path + i} className="flex items-center gap-4" data-testid={`enquiries-row-${i}`}>
                  <div className="w-8 text-sm font-bold text-[#FF5B22]">{String(i + 1).padStart(2, '0')}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold truncate">{p.page || p.path}</span>
                      <span className="text-sm font-bold shrink-0">{p.count}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-[#E0D8C8] overflow-hidden">
                      <div className="h-full rounded-full bg-[#FF5B22]" style={{ width: `${Math.max(6, (p.count / maxCount) * 100)}%` }} />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-[#8A857D]">
                      <span className="truncate">{p.path}</span>
                      <span className="shrink-0">Last: {formatDate(p.last)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent enquiries */}
        <div className="mt-8 rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-6 md:p-8" data-testid="enquiries-recent">
          <h2 className="text-lg font-semibold mb-5">Recent clicks</h2>
          {(data?.recent || []).length === 0 ? (
            <p className="text-[#8A857D] text-sm">Nothing yet.</p>
          ) : (
            <div className="divide-y divide-[#DBD4C6]">
              {(data?.recent || []).map((r, i) => (
                <div key={r.id || i} className="py-3" data-testid={`enquiries-recent-${i}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-sm">{r.page || r.path}</span>
                    <span className="text-[11px] text-[#8A857D] shrink-0">{formatDate(r.created_at)}</span>
                  </div>
                  {r.text && <p className="mt-1 text-xs text-[#8A857D] leading-relaxed">{r.text}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
