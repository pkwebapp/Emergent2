import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import { BLOG } from "@/constants/testIds/blog";

const HERO_IMG =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=85";

const line = (i) => ({
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: {
      duration: 1.1,
      delay: 0.35 + i * 0.11,
      ease: [0.7, 0, 0.15, 1],
    },
  },
});

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden bg-[hsl(var(--ink))]"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 will-change-transform"
        initial={{ clipPath: "inset(8% 12% 8% 12% round 4px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
        transition={{ duration: 1.8, ease: [0.7, 0, 0.15, 1], delay: 0.05 }}
      >
        <img
          src={HERO_IMG}
          alt="Pre-wedding couple silhouette at golden hour on a Goa beach shoot"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--ink))]/40 via-[hsl(var(--ink))]/25 to-[hsl(var(--ink))]/80"
        />
      </motion.div>

      {/* Top signature strip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="absolute top-20 left-0 right-0 z-10 text-[hsl(var(--cream))]"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between text-[11px] uppercase tracking-[0.28em]">
          <span className="flex items-center gap-2 opacity-80">
            <MapPin className="w-3 h-3" /> Field notes · Vol. 07
          </span>
          <span className="opacity-70 hidden md:inline">
            Ashvem · Mandrem · Arambol · Vagator
          </span>
          <span className="opacity-70">Est. 2013</span>
        </div>
      </motion.div>

      {/* Main headline block */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full text-[hsl(var(--cream))]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="chapter-num !text-[hsl(var(--cream))]/70 mb-6 md:mb-10"
          >
            001 — A Goa Editorial
          </motion.p>

          <h1
            data-testid={BLOG.heroHeadline}
            className="font-display text-[13vw] md:text-[9.5vw] lg:text-[8.5vw] leading-[0.92] tracking-[-0.03em] font-light max-w-[13ch]"
          >
            <span className="reveal-mask">
              <motion.span
                variants={line(0)}
                initial="hidden"
                animate="show"
                className="block"
              >
                Salt, silk,
              </motion.span>
            </span>{" "}
            <span className="reveal-mask">
              <motion.span
                variants={line(1)}
                initial="hidden"
                animate="show"
                className="block italic text-[hsl(var(--gold))] font-editorial"
              >
                &amp; slow
              </motion.span>
            </span>{" "}
            <span className="reveal-mask">
              <motion.span
                variants={line(2)}
                initial="hidden"
                animate="show"
                className="block"
              >
                golden hours.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="mt-8 md:mt-10 max-w-xl text-base md:text-lg font-light text-[hsl(var(--cream))]/80 leading-relaxed"
          >
            A complete guide to pre-wedding, couple &amp; portrait shoots in
            Goa — the locations we love, how we shoot them, and packages built
            for real moments (not stiff poses).
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              data-testid={BLOG.heroCtaPrimary}
              href="/booking"
              className="pill bg-[hsl(var(--cream))] text-[hsl(var(--ink))] px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[hsl(var(--gold))] hover:text-[hsl(var(--cream))] transition-colors"
            >
              Plan your Goa shoot →
            </a>
            <a
              data-testid={BLOG.heroCtaSecondary}
              href="#locations"
              className="pill border border-[hsl(var(--cream))]/40 text-[hsl(var(--cream))] px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[hsl(var(--cream))]/10 transition-colors"
            >
              See the locations
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        data-testid={BLOG.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[hsl(var(--cream))]/70"
      >
        <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
        <div className="scroll-line" />
        <ArrowDown className="w-3 h-3" />
      </motion.div>
    </section>
  );
}
