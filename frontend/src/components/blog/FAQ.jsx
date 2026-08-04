import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BLOG } from "@/constants/testIds/blog";

const FAQS = [
  {
    id: "best-time",
    q: "When's the best time for a pre-wedding shoot in Goa?",
    a: "October to March is our favourite window — soft light, no rain, cool sea breeze. April and early October also work if you're okay with a warmer late-afternoon call time. We avoid the monsoon (June–September) for outdoor shoots, though moody villa shoots then are stunning.",
  },
  {
    id: "how-many-locations",
    q: "How many locations can we cover in one day?",
    a: "Realistically, two locations for a half-day and three for a full-day — with buffer for wardrobe changes and travel between north Goa spots. We usually pair a beach (Ashvem / Mandrem) with a cliff or fort (Vagator / Chapora) and optionally a villa or cafe.",
  },
  {
    id: "outfits",
    q: "What outfits work best in Goa?",
    a: "Flowy fabrics, light colours, and one bolder look for contrast. We share a full styling guide once you book — including colour palettes that photograph well against black basalt, wet sand, and casuarina green.",
  },
  {
    id: "delivery",
    q: "How long until we get our photos and reels?",
    a: "Hero teaser within 5 days, full gallery in 10–14 days for hourly / half-day and up to 21 days for full-day shoots. Reels are colour-graded and delivered vertical-first so they're feed-ready.",
  },
  {
    id: "permits",
    q: "Do we need permits for beach / fort shoots?",
    a: "For personal pre-wedding and couple sessions, permits are usually not required at public beaches. For Chapora Fort, private villas, and any commercial or drone-heavy shoot, we handle permits and clearances on your behalf.",
  },
  {
    id: "rain-plan",
    q: "What if it rains on our shoot day?",
    a: "We build a Plan B into every itinerary — usually a Portuguese villa nearby or a covered heritage location. If weather is unworkable, we reschedule at no extra charge within 6 months.",
  },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      className="relative bg-[hsl(var(--paper))] border-y border-[hsl(var(--ink))]/10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5"
          >
            <p className="chapter-num">Chapter 05 — The fine print</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1] tracking-[-0.02em] font-light">
              Questions,{" "}
              <span className="italic font-editorial text-[hsl(var(--gold-deep))]">
                answered.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[hsl(var(--ink-soft))] leading-relaxed">
              Still stuck? Slide into our inbox — we usually reply within a
              working day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7"
          >
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.id}
                  value={f.id}
                  data-testid={BLOG.faqItem(f.id)}
                  className="border-b border-[hsl(var(--ink))]/15"
                >
                  <AccordionTrigger className="py-6 text-left hover:no-underline group">
                    <span className="flex items-baseline gap-6">
                      <span className="font-mono text-[11px] tracking-[0.22em] text-[hsl(var(--ink-mute))]">
                        0{i + 1}
                      </span>
                      <span className="font-display text-xl md:text-2xl font-light leading-snug tracking-[-0.01em] text-[hsl(var(--ink))] group-hover:text-[hsl(var(--gold-deep))] transition-colors">
                        {f.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-[54px] pr-4 text-[hsl(var(--ink-soft))] leading-relaxed text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
