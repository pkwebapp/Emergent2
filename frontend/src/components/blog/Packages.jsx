import { motion } from "framer-motion";
import { Check, Star, ArrowUpRight } from "lucide-react";
import { BLOG } from "@/constants/testIds/blog";

const PACKAGES = [
  {
    id: "hourly",
    name: "Hourly",
    starting: "₹18,000",
    unit: "/ hr",
    tag: "Testing the waters",
    inclusions: [
      "1 lead photographer",
      "60 minutes on location",
      "40+ edited hero frames",
      "Private online gallery",
      "Delivery in 10 days",
    ],
    highlighted: false,
  },
  {
    id: "half-day",
    name: "Half-Day",
    starting: "₹42,000",
    unit: "/ 4 hrs",
    tag: "Most-booked couple session",
    inclusions: [
      "Lead photographer + assistant",
      "4 hours, up to 2 locations",
      "120+ edited frames",
      "3 short reels (add-on)",
      "Wardrobe consult over call",
      "Delivery in 14 days",
    ],
    highlighted: false,
  },
  {
    id: "full-day",
    name: "Full-Day",
    starting: "₹75,000",
    unit: "/ 8 hrs",
    tag: "The full editorial",
    inclusions: [
      "Photo + reel team (3 people)",
      "8 hours, up to 3 locations",
      "250+ edited frames",
      "6 cinematic reels included",
      "Drone coverage included",
      "10 hero prints (A4)",
      "Same-week teaser reel",
    ],
    highlighted: true,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="relative bg-[hsl(var(--cream))]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <p className="chapter-num">Chapter 04 — The invest</p>
          <h2 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] font-light max-w-4xl">
            Three ways to work with us —{" "}
            <span className="italic font-editorial text-[hsl(var(--gold-deep))]">
              or hand us a brief.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-[hsl(var(--ink-soft))] leading-relaxed">
            Prices below are starting points for shoots in Goa. All packages
            include travel within North Goa. Custom itineraries, multi-day, and
            wedding coverage are always available on request.
          </p>
        </motion.div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PACKAGES.map((p, i) => (
            <motion.article
              key={p.id}
              data-testid={BLOG.packageCard(p.id)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative flex flex-col p-8 md:p-10 border rounded-sm ${
                p.highlighted
                  ? "bg-[hsl(var(--ink))] text-[hsl(var(--cream))] border-[hsl(var(--ink))] md:-translate-y-4"
                  : "bg-[hsl(var(--sand))] text-[hsl(var(--ink))] border-[hsl(var(--ink))]/15"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-8 flex items-center gap-1.5 bg-[hsl(var(--gold))] text-[hsl(var(--ink))] px-3 py-1 text-[10px] uppercase tracking-[0.24em] font-medium">
                  <Star className="w-3 h-3 fill-current" /> Most popular
                </span>
              )}

              <p
                className={`chapter-num ${
                  p.highlighted
                    ? "!text-[hsl(var(--cream))]/60"
                    : "!text-[hsl(var(--ink-mute))]"
                }`}
              >
                {p.tag}
              </p>
              <h3 className="mt-3 font-display text-4xl md:text-5xl font-light leading-none tracking-[-0.02em]">
                {p.name}
              </h3>
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] ${
                    p.highlighted
                      ? "text-[hsl(var(--cream))]/60"
                      : "text-[hsl(var(--ink-mute))]"
                  }`}
                >
                  Starting from
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl md:text-5xl font-light">
                  {p.starting}
                </span>
                <span
                  className={`text-sm ${
                    p.highlighted
                      ? "text-[hsl(var(--cream))]/60"
                      : "text-[hsl(var(--ink-mute))]"
                  }`}
                >
                  {p.unit}
                </span>
              </div>

              <ul className="mt-8 space-y-3.5 flex-1">
                {p.inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        p.highlighted
                          ? "text-[hsl(var(--gold))]"
                          : "text-[hsl(var(--gold-deep))]"
                      }`}
                    />
                    <span
                      className={
                        p.highlighted
                          ? "text-[hsl(var(--cream))]/85"
                          : "text-[hsl(var(--ink-soft))]"
                      }
                    >
                      {inc}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="/booking"
                className={`mt-10 inline-flex items-center justify-between gap-2 pill px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors ${
                  p.highlighted
                    ? "bg-[hsl(var(--gold))] text-[hsl(var(--ink))] hover:bg-[hsl(var(--cream))]"
                    : "border border-[hsl(var(--ink))] hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--cream))]"
                }`}
              >
                Book {p.name.toLowerCase()} <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="mt-16 border-t border-[hsl(var(--ink))]/15 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="chapter-num">Something bespoke?</p>
            <h4 className="mt-2 font-display text-2xl md:text-3xl font-light leading-tight">
              Multi-day itineraries, destination weddings, brand campaigns —
              tell us the story, we'll draft the plan.
            </h4>
          </div>
          <a
            data-testid={BLOG.packageCtaCustom}
            href="/booking"
            className="pill self-start bg-[hsl(var(--ink))] text-[hsl(var(--cream))] px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[hsl(var(--gold-deep))] transition-colors"
          >
            Request a custom quote →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
