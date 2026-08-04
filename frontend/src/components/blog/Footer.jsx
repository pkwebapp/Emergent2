import { BLOG } from "@/constants/testIds/blog";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid={BLOG.footer}
      className="bg-[hsl(var(--cream))] border-t border-[hsl(var(--ink))]/10"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div>
          <p className="font-display text-2xl tracking-tight">
            PK<span className="italic font-light">·</span>Photography
          </p>
          <p className="mt-3 text-sm text-[hsl(var(--ink-mute))] max-w-xs leading-relaxed">
            Editorial pre-wedding, couple &amp; portrait photography.
            Mumbai · Goa · Delhi.
          </p>
        </div>

        <div className="text-sm text-[hsl(var(--ink-soft))] space-y-2">
          <p className="chapter-num mb-3">Services</p>
          <a href="/services/weddings" className="block link-underline w-fit">Weddings &amp; pre-wedding</a>
          <a href="/services/portraits" className="block link-underline w-fit">Portraits &amp; portfolio</a>
          <a href="/services/maternity-baby" className="block link-underline w-fit">Maternity &amp; baby</a>
          <a href="/booking" className="block link-underline w-fit">Book a shoot</a>
        </div>

        <div className="text-sm text-[hsl(var(--ink-soft))] space-y-2">
          <p className="chapter-num mb-3">Studio</p>
          <a href="mailto:hello@pkphotography.in" className="block link-underline w-fit">
            hello@pkphotography.in
          </a>
          <a href="tel:+919999999999" className="block link-underline w-fit">
            +91 99999 99999
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 link-underline w-fit"
          >
            <Instagram className="w-4 h-4" /> @pkphotography
          </a>
        </div>
      </div>
      <div className="border-t border-[hsl(var(--ink))]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--ink-mute))]">
          <span>© {new Date().getFullYear()} PK Photography — All rights reserved.</span>
          <span>Made slowly, on the sand.</span>
        </div>
      </div>
    </footer>
  );
}
