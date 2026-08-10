"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LogOut, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/site/Chrome";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => {
        if (!active) return;
        if (u && (u.user_id || u.email)) setUser(u);
        else router.replace("/login");
      })
      .catch(() => {
        if (active) router.replace("/login");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [router]);

  const logout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {
      /* ignore network errors on logout */
    }
    window.location.href = "/";
  };

  const getInitials = (name) => (name ? name.trim().charAt(0).toUpperCase() : "U");

  if (loading) {
    return (
      <main className="bg-[#EEEAE1] min-h-[70vh] grid place-content-center">
        <div className="flex flex-col items-center gap-3 text-[#8A857D]">
          <Loader2 className="animate-spin text-[#FF5B22]" size={30} />
          <span className="text-sm">Loading your profile…</span>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#EEEAE1]">
      <PageHeader
        eyebrow="Client Portal"
        title={<>Your <span className="text-[#FF5B22] italic font-medium">profile.</span></>}
        subtitle="Manage your account and jump into your private galleries."
      />
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto max-w-[720px] px-6">
          <div className="rounded-3xl border border-[#DBD4C6] bg-[#EEEAE1] p-8 md:p-10">
            <div className="flex items-center gap-6">
              {user?.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.picture} alt={user?.name || "Profile"} className="w-20 h-20 rounded-full object-cover border border-[#DBD4C6]" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#FF5B22] text-white text-2xl font-bold grid place-content-center">{getInitials(user?.name)}</div>
              )}
              <div>
                <h2 className="display text-3xl">{user?.name || "Client"}</h2>
                {user?.email && <p className="text-sm text-[#8A857D] mt-1">{user.email}</p>}
                {user?.role && <span className="inline-block mt-2 text-[10px] uppercase tracking-widest bg-[#F3E4DC] text-[#FF5B22] px-3 py-1 rounded-full">{user.role}</span>}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/client" className="flex-1 inline-flex items-center justify-center gap-2 bg-[#161514] text-white h-12 rounded-full font-semibold text-sm hover:bg-[#FF5B22] transition-colors">
                Go to my galleries <ArrowRight size={14} />
              </Link>
              <button onClick={logout} disabled={loggingOut} className="inline-flex items-center justify-center gap-2 border border-[#DBD4C6] h-12 px-6 rounded-full font-semibold text-sm hover:border-[#FF5B22] transition-colors disabled:opacity-70">
                <LogOut size={15} /> {loggingOut ? "Logging out…" : "Log out"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
