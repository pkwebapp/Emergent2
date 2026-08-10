"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { ArrowRight, Lock, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/site/Chrome";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", mobileNo: "" });
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // If already signed in, go straight to the client portal.
  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => {
        if (active && u && (u.user_id || u.email)) router.replace("/client");
      })
      .catch(() => {})
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  const validateMobile = (number) => {
    const digits = number.replace(/\D/g, "");
    return digits.length === 10 || (digits.startsWith("91") && digits.length === 12);
  };

  const signInWithGoogle = () => {
    const redirectUrl = window.location.origin + "/client";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMobileError("");
    if (!validateMobile(form.mobileNo)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    try {
      // Save the lead, then hand off to secure Google sign-in.
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName.trim() || "Guest",
          mobile: form.mobileNo.replace(/\D/g, ""),
        }),
      }).catch(() => {});
      toast.success("Almost there — continue with Google to finish signing in.");
      signInWithGoogle();
    } catch (error) {
      toast.error("Something went wrong. Please try Google sign-in.");
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <main className="bg-[#EEEAE1] min-h-[70vh] grid place-content-center">
        <div className="flex flex-col items-center gap-3 text-[#8A857D]">
          <Loader2 className="animate-spin text-[#FF5B22]" size={30} />
          <span className="text-sm">Loading…</span>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#EEEAE1]">
      <PageHeader
        eyebrow="Client Portal"
        title={<>Welcome <span className="text-[#FF5B22] italic font-medium">back.</span></>}
        subtitle="Log in to access your personalized dashboard, downloads, and booking history."
      />
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-[520px] px-6">
          <div className="rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-8 md:p-10">
            <div className="w-12 h-12 rounded-xl bg-[#F3E4DC] text-[#FF5B22] grid place-content-center mb-6"><Lock size={20} /></div>
            <h2 className="display text-3xl">Sign in</h2>
            <p className="mt-2 text-sm text-[#8A857D]">Use your Google account for instant, secure access to your private galleries.</p>

            <button onClick={signInWithGoogle} data-testid="login-google-btn" className="mt-8 w-full inline-flex items-center justify-center gap-3 border border-[#DBD4C6] h-12 rounded-full font-semibold text-sm hover:border-[#FF5B22] hover:shadow-md transition-all bg-white">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-4 text-xs text-[#8A857D]">
              <span className="flex-1 h-px bg-[#DBD4C6]" /> or use your phone <span className="flex-1 h-px bg-[#DBD4C6]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Full Name</span>
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none" placeholder="Your name" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8A857D]">Mobile Number</span>
                <input required value={form.mobileNo} onChange={(e) => setForm({ ...form, mobileNo: e.target.value })} className="h-12 px-4 rounded-xl border border-[#DBD4C6] focus:border-[#FF5B22] focus:outline-none" placeholder="+91…" />
                {mobileError && <span className="text-sm text-red-600">{mobileError}</span>}
              </label>
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-[#161514] text-white h-12 rounded-full font-semibold text-sm hover:bg-[#FF5B22] transition-colors disabled:opacity-70">
                {loading ? "Please wait…" : <>Continue <ArrowRight size={14} /></>}
              </button>
            </form>

            <p className="text-center text-sm text-[#8A857D] mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#FF5B22] font-semibold hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
