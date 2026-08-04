import { motion } from "framer-motion";
import { Camera, Film, Compass } from "lucide-react";

const INTRO_IMG =
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85";

const stats = [
  { k: "12+", v: "Years shooting couples" },
  { k: "2000+", v: "Projects delivered" },
  { k: "3", v: "Cities — Mumbai · Goa · Delhi" },
];

const fade = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] },
  }),
};

export default function Intro() {
  return (
    <section id="intro" className="relative bg-[hsl(var(--cream))]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: manifesto */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fade}
            className="lg:col-span-7"
          >
            <p className="chapter-num mb-8">Chapter 01 — The premise</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] font-light text-[hsl(var(--ink))]">
              Goa is not a{" "}
              <span className="italic font-editorial text-[hsl(var(--gold-deep))]">
                backdrop
              </span>
              . It's a{" "}
              <span className="italic font-editorial text-[hsl(var(--gold-deep))]">
                mood
              </span>{" "}
              — and we shoot it that way.
            </h2>

            <div className="mt-10 space-y-6 max-w-xl text-[hsl(var(--ink-soft))] leading-relaxed">
              <p>
                For a decade, we've been packing lenses into Innovas and
                driving north — chasing the last hour of sun through Ashvem's
                casuarinas, the black basalt at Vagator, the wet mirror sand at
                Mandrem after a wave pulls back. This guide is the map we wish
                we'd had.
              </p>
              <p>
                Whether you're planning a{" "}
                <em className="font-editorial">pre-wedding shoot in Goa</em>, a
                quiet couple session, a portfolio for portraits, or an iPhone
                reel that actually looks like a film — this is how we work.
              </p>
            </div>

            {/* Trust stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 md:gap-10 border-t border-[hsl(var(--ink))]/10 pt-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.k}
                  custom={i + 1}
                  variants={fade}
                  className="flex flex-col"
                >
                  <span className="font-display text-3xl md:text-4xl font-light text-[hsl(var(--ink))]">
                    {s.k}
                  </span>
                  <span className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--ink-mute))] leading-relaxed">
                    {s.v}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: image + floating chip */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[hsl(var(--paper))]">
              <motion.img
                src={INTRO_IMG}
                alt="Editorial pre-wedding shoot in Goa — couple portrait during golden hour"
                className="w-full h-full object-cover"
                loading="lazy"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
              />
              {/* Editorial frame lines */}
              <div className="pointer-events-none absolute inset-3 border border-[hsl(var(--cream))]/30" />
              <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 text-[hsl(var(--cream))] text-[10px] uppercase tracking-[0.28em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
                Frame · 07 / 24
              </div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-[hsl(var(--cream))] text-[10px] uppercase tracking-[0.28em]">
                Mandrem, 6:41 pm
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--ink-mute))]">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Photo
              </span>
              <span className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" /> Reels
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Drone
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
