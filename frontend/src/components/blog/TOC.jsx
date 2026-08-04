import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BLOG } from "@/constants/testIds/blog";

const ITEMS = [
  { id: "intro", label: "Intro", num: "01" },
  { id: "services", label: "Services", num: "02" },
  { id: "locations", label: "Locations", num: "03" },
  { id: "packages", label: "Packages", num: "04" },
  { id: "faq", label: "FAQ", num: "05" },
];

export default function TOC() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const sections = ITEMS.map((i) => document.getElementById(i.id)).filter(
      Boolean
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Desktop rail */}
      <aside
        data-testid={BLOG.tocDesktop}
        className="hidden 2xl:block fixed top-1/2 -translate-y-1/2 left-6 z-40"
      >
        <ol className="flex flex-col gap-4 border-l border-[hsl(var(--ink))]/15 pl-4">
          {ITEMS.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <a
                  data-testid={BLOG.tocLink(it.id)}
                  href={`#${it.id}`}
                  className="group flex items-center gap-3"
                >
                  <span className="font-mono text-[10px] tracking-widest text-[hsl(var(--ink-mute))] w-6">
                    {it.num}
                  </span>
                  <span
                    className={`h-px transition-all ${
                      isActive
                        ? "w-10 bg-[hsl(var(--gold))]"
                        : "w-4 bg-[hsl(var(--ink))]/30 group-hover:w-8 group-hover:bg-[hsl(var(--ink))]"
                    }`}
                  />
                  <span
                    className={`text-xs uppercase tracking-[0.22em] transition-colors ${
                      isActive
                        ? "text-[hsl(var(--ink))]"
                        : "text-[hsl(var(--ink-mute))] group-hover:text-[hsl(var(--ink))]"
                    }`}
                  >
                    {it.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Mobile pill bar */}
      <div
        data-testid={BLOG.tocMobile}
        className="2xl:hidden sticky top-16 z-40 bg-[hsl(var(--cream))]/90 backdrop-blur-md border-y border-[hsl(var(--ink))]/10"
      >
        <div className="overflow-x-auto no-scrollbar">
          <ol className="flex gap-2 px-4 py-3 w-max">
            {ITEMS.map((it) => {
              const isActive = active === it.id;
              return (
                <li key={it.id}>
                  <a
                    data-testid={BLOG.tocLink(it.id) + "-m"}
                    href={`#${it.id}`}
                    className={`pill px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border transition-colors ${
                      isActive
                        ? "bg-[hsl(var(--ink))] text-[hsl(var(--cream))] border-[hsl(var(--ink))]"
                        : "border-[hsl(var(--ink))]/20 text-[hsl(var(--ink-soft))]"
                    }`}
                  >
                    {it.num} · {it.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
