import { motion } from "framer-motion";
import { Sparkles, Smartphone, ArrowUpRight } from "lucide-react";
import { BLOG } from "@/constants/testIds/blog";

const SERVICES = [
  {
    id: "pre-wedding",
    num: "01",
    title: "Pre-Wedding",
    kicker: "Cinematic storytelling",
    body:
      "A choreographed, laid-back edit of you two — beach walks, candid laughs, one hero portrait. Full-day and half-day formats.",
    tags: ["Story-led", "Drone-ready", "Reels included"],
    img:
      "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1400&q=85",
    href: "/services/weddings",
  },
  {
    id: "couple",
    num: "02",
    title: "Couple & Private Couple",
    kicker: "Just the two of you",
    body:
      "Anniversary, honeymoon, or 'no reason' — a two-hour private session in a spot you love. Quiet, tender, unposed.",
    tags: ["1–2 hrs", "Private locations", "20–30 hero frames"],
    img:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85",
    href: "/services/weddings",
  },
  {
    id: "portrait",
    num: "03",
    title: "Portrait",
    kicker: "One person, one story",
    body:
      "For your book, your brand, your birthday. Studio-quality light, on a beach or in a courtyard, framed like a magazine cover.",
    tags: ["Editorial", "Natural light", "3 looks"],
    img:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1400&q=85",
    href: "/services/portraits",
  },
  {
    id: "outdoor",
    num: "04",
    title: "Outdoor Portfolio",
    kicker: "Actor, model, creator",
    body:
      "A full portfolio in a day — three looks, two locations, curated retouching. Deliverables sized for print and Instagram.",
    tags: ["Full-day", "Multi-location", "Retouched hero set"],
    img:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
    href: "/services/portraits",
  },
  {
    id: "maternity",
    num: "05",
    title: "Maternity",
    kicker: "Soft, quiet, tender",
    body:
      "Golden-hour maternity on Ashvem's still water — floaty silks, held hands, one portrait you'll frame forever.",
    tags: ["Golden hour", "Wardrobe styling", "Private"],
    img:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1400&q=85",
    href: "/services/maternity-baby",
  },
  {
    id: "baby",
    num: "06",
    title: "Baby & Newborn",
    kicker: "Slow, safe, patient",
    body:
      "Baby-first sessions at your villa or a soft studio setup — natural light, hushed voices, all the time in the world.",
    tags: ["At-home / villa", "Under 2 hrs", "Natural light"],
    img:
      "https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg?auto=compress&cs=tinysrgb&w=1400",
    href: "/services/maternity-baby",
  },
];

const REEL_IMG =
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=85";

function ServiceRow({ s, index }) {
  const flipped = index % 2 === 1;
  return (
    <article
      data-testid={BLOG.serviceCard(s.id)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 md:py-24 border-b border-[hsl(var(--ink))]/10 last:border-0"
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, y: 60, clipPath: "inset(8% 8% 8% 8% round 2px)" }}
        whileInView={{
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0% round 2px)",
        }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-[hsl(var(--paper))]">
          <motion.img
            src={s.img}
            alt={`${s.title} shoot in Goa — pre-wedding shoot Goa reference`}
            className="w-full h-full object-cover"
            loading="lazy"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.2, 0.7, 0.2, 1] }}
          />
          <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-[hsl(var(--cream))] bg-[hsl(var(--ink))]/60 backdrop-blur px-2 py-1">
            {s.num} · {s.kicker}
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}
      >
        <p className="chapter-num">{`Service ${s.num}`}</p>
        <h3 className="mt-4 font-display text-4xl md:text-5xl font-light leading-[1.02] tracking-[-0.02em] text-[hsl(var(--ink))]">
          {s.title}
        </h3>
        <p className="mt-6 text-[hsl(var(--ink-soft))] leading-relaxed max-w-md">
          {s.body}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <li
              key={t}
              className="pill border border-[hsl(var(--ink))]/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--ink-soft))]"
            >
              {t}
            </li>
          ))}
        </ul>
        <a
          href={s.href}
          className="mt-8 inline-flex items-center gap-2 text-[hsl(var(--ink))] link-underline text-sm uppercase tracking-[0.22em]"
        >
          Explore {s.title.toLowerCase()} <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </article>
  );
}

function ReelHighlight() {
  return (
    <motion.article
      data-testid={BLOG.reelCard}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
      className="my-20 md:my-28 relative overflow-hidden rounded-sm bg-[hsl(var(--ink))] text-[hsl(var(--cream))]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 relative aspect-[16/11] lg:aspect-auto min-h-[380px]">
          <img
            src={REEL_IMG}
            alt="iPhone reel shoot in Goa — cinematic vertical content"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))] via-[hsl(var(--ink))]/40 to-transparent" />
          <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--gold))]">
            <Sparkles className="w-3.5 h-3.5" /> Signature offering
          </div>
        </div>
        <div className="lg:col-span-6 p-8 md:p-14 flex flex-col justify-center">
          <p className="chapter-num !text-[hsl(var(--cream))]/60">Service 07 — for the algorithm & the archive</p>
          <h3 className="mt-4 font-display text-4xl md:text-5xl font-light leading-[1.02] tracking-[-0.02em]">
            iPhone Reel Shoot
            <span className="block italic font-editorial text-[hsl(var(--gold))]">
              — cinematic, vertical, yours.
            </span>
          </h3>
          <p className="mt-6 text-[hsl(var(--cream))]/75 leading-relaxed max-w-md">
            A dedicated reel shooter armed with an iPhone Pro, gimbal &amp; ND
            filters — designed to fit your feed the day of the shoot. Slow-mo,
            transitions, colour-graded &amp; delivered vertical-first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["4–6 reels", "Same-week delivery", "Colour graded", "Add-on"].map(
              (t) => (
                <span
                  key={t}
                  className="pill border border-[hsl(var(--cream))]/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--cream))]/80 flex items-center gap-1.5"
                >
                  <Smartphone className="w-3 h-3" /> {t}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-[hsl(var(--cream))]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between border-b border-[hsl(var(--ink))]/15 pb-8"
        >
          <div>
            <p className="chapter-num">Chapter 02</p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] font-light">
              What we{" "}
              <span className="italic font-editorial text-[hsl(var(--gold-deep))]">
                shoot
              </span>
              , in Goa.
            </h2>
          </div>
          <p className="hidden md:block max-w-xs text-sm text-[hsl(var(--ink-mute))] leading-relaxed">
            Seven ways we work. Pick one, or combine. Every package includes
            colour-graded delivery, hero prints, and a private online gallery.
          </p>
        </motion.div>

        <div>
          {SERVICES.slice(0, 4).map((s, i) => (
            <ServiceRow key={s.id} s={s} index={i} />
          ))}
        </div>

        <ReelHighlight />

        <div>
          {SERVICES.slice(4).map((s, i) => (
            <ServiceRow key={s.id} s={s} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
