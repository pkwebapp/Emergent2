'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ fullName: '', email: '', mobile: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Please enter a valid email.'
    }
    const digits = form.mobile.replace(/\D/g, '')
    if (!digits || (digits.length !== 10 && !(digits.startsWith('91') && digits.length === 12))) {
      e.mobile = 'Enter a valid 10-digit mobile number.'
    }
    return e
  }

  const onChange = (k) => (ev) => {
    setForm({ ...form, [k]: ev.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: null })
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.fullName.trim(),
          email: form.email.trim() || null,
          mobile: form.mobile.replace(/\D/g, ''),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrors({ form: data.error || 'Something went wrong. Please try again.' })
      } else {
        setDone(true)
      }
    } catch (err) {
      setErrors({ form: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = () => {
    if (typeof window === 'undefined') return
    const redirectUrl = window.location.origin + '/client'
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`
  }

  return (
    <main className="min-h-screen bg-[#EEEAE1] text-[#161514] flex items-center justify-center px-6 py-24 md:py-32">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8A857D] mb-3">
            Join PK Photography
          </div>
          <h1
            className="text-4xl md:text-5xl leading-[1.05] tracking-tight"
            data-font="display"
          >
            Create your <span className="italic text-[#FF5B22]">account</span>
          </h1>
          <p className="text-sm md:text-base text-[#5b5851] mt-3">
            Access your personalized dashboard, booking history and photo downloads.
          </p>
        </div>

        {done ? (
          <div className="bg-white/70 backdrop-blur-sm border border-[#DBD4C6] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF5B22] text-white grid place-content-center mx-auto mb-4">
              <Check size={22} />
            </div>
            <h2 className="text-2xl mb-2" data-font="display">
              You&apos;re on the list
            </h2>
            <p className="text-sm text-[#5b5851] mb-6">
              We&apos;ve saved your details. Sign in with your Google account to activate your dashboard.
            </p>
            <button
              onClick={signInWithGoogle}
              data-testid="signup-google-btn"
              className="w-full h-12 rounded-full bg-[#161514] text-white font-semibold text-sm hover:bg-[#FF5B22] transition-colors inline-flex items-center justify-center gap-2"
            >
              Continue with Google <ArrowRight size={16} />
            </button>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-[#8A857D] hover:text-[#FF5B22] transition-colors"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-sm border border-[#DBD4C6] rounded-2xl p-6 md:p-8 shadow-sm">
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="fullName" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A857D] mb-1.5">
                  Full name
                </label>
                <input
                  id="fullName"
                  data-testid="signup-fullname"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={onChange('fullName')}
                  className="w-full h-12 px-4 rounded-lg border border-[#DBD4C6] bg-white/80 text-[15px] focus:outline-none focus:border-[#FF5B22] focus:ring-2 focus:ring-[#FF5B22]/20 transition-colors"
                  placeholder="Priya Sharma"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1.5">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A857D] mb-1.5">
                  Email <span className="text-[#8A857D]/60 normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <input
                  id="email"
                  data-testid="signup-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange('email')}
                  className="w-full h-12 px-4 rounded-lg border border-[#DBD4C6] bg-white/80 text-[15px] focus:outline-none focus:border-[#FF5B22] focus:ring-2 focus:ring-[#FF5B22]/20 transition-colors"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1.5">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A857D] mb-1.5">
                  Mobile number
                </label>
                <div className="flex items-stretch rounded-lg border border-[#DBD4C6] bg-white/80 focus-within:border-[#FF5B22] focus-within:ring-2 focus-within:ring-[#FF5B22]/20 transition-colors overflow-hidden">
                  <span className="px-3 grid place-content-center text-sm text-[#5b5851] border-r border-[#DBD4C6] bg-[#EEEAE1]/60">
                    +91
                  </span>
                  <input
                    id="mobile"
                    data-testid="signup-mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={12}
                    value={form.mobile}
                    onChange={onChange('mobile')}
                    className="flex-1 h-12 px-3 bg-transparent text-[15px] focus:outline-none"
                    placeholder="98765 43210"
                  />
                </div>
                {errors.mobile && <p className="text-xs text-red-600 mt-1.5">{errors.mobile}</p>}
              </div>

              {errors.form && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {errors.form}
                </p>
              )}

              <button
                type="submit"
                data-testid="signup-submit"
                disabled={loading}
                className="w-full h-12 rounded-full bg-[#161514] text-white font-semibold text-sm hover:bg-[#FF5B22] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Creating…
                  </>
                ) : (
                  <>
                    Sign up <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <span className="flex-1 h-px bg-[#DBD4C6]" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#8A857D]">or</span>
              <span className="flex-1 h-px bg-[#DBD4C6]" />
            </div>

            <button
              onClick={signInWithGoogle}
              data-testid="signup-google-btn"
              type="button"
              className="w-full h-12 rounded-full border border-[#DBD4C6] bg-white hover:border-[#FF5B22] hover:shadow-md transition-all inline-flex items-center justify-center gap-3 text-sm font-semibold"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-[#5b5851] mt-6">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[#FF5B22] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        )}

        <p className="text-center text-[11px] text-[#8A857D] mt-6 leading-relaxed">
          By signing up you agree to our{' '}
          <Link href="/terms-and-conditions" className="underline hover:text-[#FF5B22]">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy-policy" className="underline hover:text-[#FF5B22]">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  )
}
