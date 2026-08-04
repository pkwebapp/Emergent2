import { motion, useScroll, useTransform } from "framer-motion";
import { BLOG } from "@/constants/testIds/blog";

export default function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(245,238,225,0)", "rgba(245,238,225,0.85)"]
  );
  const border = useTransform(
    scrollY,
    [0, 200],
    ["rgba(26,25,22,0)", "rgba(26,25,22,0.12)"]
  );
  const color = useTransform(
    scrollY,
    [0, 220],
    ["rgba(245,238,225,1)", "rgba(26,25,22,1)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: border, color }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <motion.a
          href="/"
          data-testid={BLOG.navBrand}
          className="font-display text-xl tracking-tight"
          whileHover={{ letterSpacing: "0.02em" }}
          transition={{ duration: 0.4 }}
        >
          PK<span className="italic font-light">·</span>Photography
        </motion.a>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium">
          <a href="#services" className="link-underline">Services</a>
          <a href="#locations" className="link-underline">Locations</a>
          <a href="#packages" className="link-underline">Packages</a>
          <a href="#faq" className="link-underline">FAQ</a>
        </nav>

        <a
          href="/booking"
          data-testid={BLOG.navBookBtn}
          className="pill border border-current px-4 py-2 text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-current hover:text-[hsl(var(--cream))] transition-colors"
        >
          Book a shoot
        </a>
      </div>
    </motion.header>
  );
}
