import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sunset, Mountain, Send, Home, ArrowUpRight } from "lucide-react";
import { BLOG } from "@/constants/testIds/blog";

const LOCATIONS = [
  {
    id: "ashvem-mandrem",
    num: "01",
    title: "Ashvem & Mandrem",
    subtitle: "The quiet north",
    best: "Best for: soft, floaty pre-weddings",
    body:
      "Shallow tidal pools that mirror the sky, casuarina trees, and a beach that empties by 6:30 pm. This is where we shoot our softest work — light dresses, bare feet, salt in your hair.",
    icons: [
      { icon: Sunset, label: "Sunset" },
      { icon: Send, label: "Drone-friendly" },
      { icon: Home, label: "Quiet & private" },
    ],
    img:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "arambol",
    num: "02",
    title: "Arambol",
    subtitle: "Bohemian & textured",
    best: "Best for: portraits with character",
    body:
      "Cliff paths, sweetwater lake, and a bazaar that looks like an editorial location scout planted it there. Great for couples who want the shots to feel a little lived-in, a little wild.",
    icons: [
      { icon: Mountain, label: "Cliff views" },
      { icon: Sunset, label: "Sunset" },
      { icon: Send, label: "Drone-friendly" },
    ],
    img:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "vagator",
    num: "03",
    title: "Vagator & Chapora Fort",
    subtitle: "Drama & silhouette",
    best: "Best for: bold, cinematic frames",
    body:
      "The black basalt at Vagator and the fort's red laterite walls give us frames that look painted. Come here when you want silhouettes, wide skies, and shots that feel epic.",
    icons: [
      { icon: Mountain, label: "Cliff views" },
      { icon: Sunset, label: "Sunset" },
      { icon: Send, label: "Drone-friendly" },
    ],
    img:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "villa",
    num: "04",
    title: "Private Villa Shoots",
    subtitle: "For the introverts",
    best: "Best for: fully private couple & maternity",
    body:
      "We scout an Assagao or Anjuna Portuguese villa — chequered floors, arched doorways, a pool — and shoot the whole day there. Total privacy, wardrobe changes on tap, catering optional.",
    icons: [
      { icon: Home, label: "Quiet & private" },
      { icon: Sunset, label: "Golden hour" },
      { icon: Mountain, label: "Curated set" },
    ],
    img:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=85",
  },
];

function LocationCard({ loc, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const flipped = index % 2 === 1;

  return (
    <article
      ref={ref}
      data-testid={BLOG.locationCard(loc.id)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-14 md:py-20"
    >
      {/* Image column */}
      <div
        className={`lg:col-span-8 ${flipped ? "lg:order-2 lg:col-start-5" : "lg:col-start-1"}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(var(--ink))]/5">
          <motion.img
            src={loc.img}
            alt={`${loc.title} — pre-wedding shoot Goa location`}
            className="absolute inset-0 w-full h-[120%] object-cover"
            style={{ y }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))]/40 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 text-[hsl(var(--cream))] max-w-md">
            <p className="font-mono text-[10px] tracking-[0.32em] opacity-80">
              LOCATION {loc.num} / 04
            </p>
            <h3 className="mt-1 font-display text-3xl md:text-5xl leading-none tracking-[-0.02em] font-light">
              {loc.title}
            </h3>
          </div>
          <div className="absolute top-5 right-5 text-[hsl(var(--cream))] text-[10px] uppercase tracking-[0.28em] flex items-center gap-2 bg-[hsl(var(--ink))]/40 backdrop-blur px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
            {loc.subtitle}
          </div>
        </div>
      </div>

      {/* Info column */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className={`lg:col-span-4 flex flex-col justify-center ${
          flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"
        }`}
      >
        <p className="chapter-num text-[hsl(var(--gold-deep))]">{loc.best}</p>
        <p className="mt-5 text-[hsl(var(--ink-soft))] leading-relaxed">
          {loc.body}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
          {loc.icons.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--ink-soft))]"
            >
              <Icon className="w-3.5 h-3.5 text-[hsl(var(--gold-deep))]" />
              {label}
            </li>
          ))}
        </ul>
        <a
          href="/booking"
          className="mt-8 inline-flex items-center gap-2 self-start text-sm uppercase tracking-[0.22em] link-underline"
        >
          Shoot here <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </article>
  );
}

export default function Locations() {
  return (
    <section
      id="locations"
      className="relative bg-[hsl(var(--sand))] border-y border-[hsl(var(--ink))]/10"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl"
        >
          <p className="chapter-num">Chapter 03 — The atlas</p>
          <h2 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] font-light">
            Four locations we return to,{" "}
            <span className="italic font-editorial text-[hsl(var(--gold-deep))]">
              again and again.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-[hsl(var(--ink-soft))] leading-relaxed">
            Every pre-wedding shoot in Goa starts with a scout call. Here's
            what we usually recommend, and why. Distances, timing, permits, and
            a Plan B for rain — all handled by us.
          </p>
        </motion.div>

        <div className="mt-14 md:mt-20 divide-y divide-[hsl(var(--ink))]/10">
          {LOCATIONS.map((loc, i) => (
            <LocationCard key={loc.id} loc={loc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
