import { motion } from "framer-motion";
import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { BLOG } from "@/constants/testIds/blog";

const CTA_IMG =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85";

const WA_LINK =
  "https://wa.me/919999999999?text=Hi%20PK%20Photography%2C%20I'd%20like%20to%20plan%20a%20Goa%20shoot%20—%20";

export default function CTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-[hsl(var(--ink))] text-[hsl(var(--cream))]"
    >
      <motion.img
        src={CTA_IMG}
        alt="Golden hour pre-wedding couple silhouette in Goa"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        loading="lazy"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.2, 0.7, 0.2, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--ink))]/70 via-[hsl(var(--ink))]/60 to-[hsl(var(--ink))]" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <p className="chapter-num !text-[hsl(var(--cream))]/60">
            Chapter 06 — The next step
          </p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em] font-light max-w-5xl">
            Ready to plan your{" "}
            <span className="italic font-editorial text-[hsl(var(--gold))]">
              Goa shoot?
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-[hsl(var(--cream))]/75 text-lg font-light leading-relaxed">
            Send us a note with your dates, vibe, and a couple of Pinterest
            references — we'll come back with a scout call and a tailored plan.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              data-testid={BLOG.finalCtaBook}
              href="/booking"
              className="pill bg-[hsl(var(--gold))] text-[hsl(var(--ink))] px-7 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-[hsl(var(--cream))] transition-colors inline-flex items-center gap-2"
            >
              Book now <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              data-testid={BLOG.finalCtaWhatsapp}
              href={WA_LINK}
              target="_blank"
              rel="noreferrer noopener"
              className="pill border border-[hsl(var(--cream))]/40 text-[hsl(var(--cream))] px-7 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-[hsl(var(--cream))]/10 transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp us
            </a>
            <a
              data-testid={BLOG.finalCtaEmail}
              href="mailto:hello@pkphotography.in"
              className="text-[hsl(var(--cream))]/80 text-sm uppercase tracking-[0.22em] link-underline inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> hello@pkphotography.in
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-[hsl(var(--cream))]/15 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.22em] text-[hsl(var(--cream))]/60">
            <span>Related:</span>
            <a href="/services/weddings" className="link-underline">Weddings</a>
            <a href="/services/portraits" className="link-underline">Portraits</a>
            <a href="/services/maternity-baby" className="link-underline">Maternity &amp; Baby</a>
            <a href="/booking" className="link-underline">Booking</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
