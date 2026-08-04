import { useEffect } from "react";
import Navbar from "@/components/blog/Navbar";
import TOC from "@/components/blog/TOC";
import Hero from "@/components/blog/Hero";
import Intro from "@/components/blog/Intro";
import Marquee from "@/components/blog/Marquee";
import Services from "@/components/blog/Services";
import Locations from "@/components/blog/Locations";
import Packages from "@/components/blog/Packages";
import FAQ from "@/components/blog/FAQ";
import CTA from "@/components/blog/CTA";
import Footer from "@/components/blog/Footer";
import { BLOG } from "@/constants/testIds/blog";

export default function BlogGoa() {
  useEffect(() => {
    document.title =
      "Pre-Wedding & Couple Shoot Locations in Goa: Complete Guide + Packages | PK Photography";
  }, []);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Pre-Wedding, Couple & Portrait Shoots in Goa — A Complete Guide",
    author: { "@type": "Organization", name: "PK Photography" },
    publisher: {
      "@type": "Organization",
      name: "PK Photography",
    },
    mainEntityOfPage:
      "/blog/pre-wedding-couple-portrait-shoot-locations-goa",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    datePublished: "2025-12-01",
    dateModified: "2025-12-01",
    keywords:
      "pre-wedding shoot locations in Goa, couple shoot Goa, portrait shoot Goa, maternity Goa, baby shoot Goa, iPhone reel Goa",
  };

  return (
    <main data-testid={BLOG.page} className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <Navbar />
      <Hero />
      <TOC />
      <Intro />
      <Marquee />
      <Services />
      <Locations />
      <Packages />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
