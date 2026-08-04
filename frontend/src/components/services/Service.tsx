"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Btn from "../EncrptButton/BtnMin";
import "@fontsource/montserrat";
import Link from "next/link";
import { useRouter } from "next/navigation";

import service1 from "@live/assets/service1.webp";
import service2 from "@live/assets/service2.webp";
import service3 from "@live/assets/service3.webp";
import service4 from "@live/assets/service4.webp";
import service5 from "@live/assets/service5.webp";
import service6 from "@live/assets/service6.webp";
import service7 from "@live/assets/service7.webp";
import service8 from "@live/assets/service8.webp";
import service9 from "@live/assets/service9.webp";
import service10 from "@live/assets/service10.webp";
import service11 from "@live/assets/service11.webp";
import service12 from "@live/assets/service12.webp";
import service13 from "@live/assets/service13.png";

interface CardProps {
  id: number;
  url: string;
  link: string;
  link2: string;
  title: string;
  subtitle: string;
  isLightBackground?: boolean;
}

const cards: CardProps[] = [
  {
    url: service1.src,
    title: "Portfolio",
    subtitle: "Crafting your visual stories",
    id: 1,
    link: "/services/editorial-portfolio#portfolio",
    link2: "/services/editorial-portfolio"
  },
  {
    url: service2.src,
    title: "Portrait",
    subtitle: "Timeless portraits that reflect you",
    id: 2,
    isLightBackground: true,
    link: "/services/portraits-headshots#portfolio",
    link2: "/services/portraits-headshots",
  },
  {
    url: service3.src,
    title: "Headshots",
    subtitle: "Professional headshots that speak success",
    id: 3,
    link: "/services/portraits-headshots#portfolio",
    link2: "/services/portraits-headshots"
  },
  {
    url: service4.src,
    title: "Editorial",
    subtitle: "Magazine-Worthy Shots for Every Story Headshots",
    id: 4,
    link: "/services/editorial-portfolio#portfolio",
    link2: "/services/editorial-portfolio"
  },
  {
    url: service5.src,
    title: "Celebrity",
    subtitle: "Reflect your stardom with every shot",
    id: 5,
    link: "/services/influencer-celebrity#portfolio",
    link2: "/services/influencer-celebrity"
  },
  {
    url: service6.src,
    title: "Ads",
    subtitle: "Highlights your products with flawless imagery",
    id: 6,
    link: "/services/brand-content#portfolio",
    link2: "/services/brand-content",
  },
  {
    url: service7.src,
    title: "Wedding",
    subtitle: "Your Big Day, perfectly captured",
    id: 7,
    link: "/services/weddings#portfolio",
    link2: "/services/weddings",
  },
  {
    url: service8.src,
    title: "Boudoir",
    subtitle: "Empower your confidence",
    id: 8,
    link: "/services/boudoir-shoots#portfolio",
    link2: "/services/boudoir-shoots",
  },
  {
    url: service9.src,
    title: "Food",
    subtitle: "Mouth watering images for culinary Delights",
    id: 9,
    isLightBackground: true,
    link: "/services/food-photography#portfolio",
    link2: "/services/food-photography",
  },
  {
    url: service10.src,
    title: "E-Commerce",
    subtitle: "Boost your sales: crisp, e-commerce photos",
    id: 10,
    isLightBackground: true,
    link: "/services/product-ecommerce#portfolio",
    link2: "/services/product-ecommerce",
  },
  {
    url: service11.src,
    title: "Real Estate",
    subtitle: "Highlighting the beauty of every property",
    id: 11,
    link: "/services/real-estate-architectural#portfolio",
    link2: "/services/real-estate-architectural",
  },
  {
    url: service12.src,
    title: "Design",
    subtitle: "Your vision, our expertise in design",
    id: 12,
    link: "/services/design-services#portfolio",
    link2: "/services/design-services",
  },
  {
    url: service13.src,
    title: "Live Streaming",
    subtitle: "Experience Live Streaming Like Never Before",
    id: 13,
    link: "/services/live-streaming#portfolio",
    link2: "/services/live-streaming",
  },
];

const Card: React.FC<{ card: CardProps; index: number }> = ({
  card,
  index,
}) => {
  const isLastThree = index >= cards.length - 3;
  const router = useRouter();

  return (
    // Replaced outer Link with div to prevent hydration error (nested <a> tags)
    <div
      key={card.id}
      className="no-underline cursor-pointer"
      aria-label={`View ${card.title} Photography Services`}
      onClick={() => router.push(card.link2)}
    >
      <div
        className={`group relative h-[520px] w-[300px] sm:w-[360px] sm:h-[560px] md:w-[440px] md:h-[620px] overflow-hidden rounded-3xl bg-neutral-200 text-white`}
      >
        {/* Background Image */}
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform [transition-duration:950ms] group-hover:scale-[1.06]"
        />

        {/* Dark gradient — always visible, deepens on hover for legibility */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#161514]/85 via-[#161514]/25 to-transparent transition-opacity duration-500 md:opacity-90 md:group-hover:opacity-100" />

        {/* Corner meta — index number */}
        <div className="absolute top-5 left-5 z-10 text-white/85 text-[10px] tracking-[0.32em] uppercase font-medium">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Category chip on hover only (desktop) */}
        <div className="hidden md:flex absolute top-5 right-5 z-10 items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/90 text-[10px] tracking-[0.28em] uppercase font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B22]" />
          View Gallery
        </div>

        {/* Bottom content — title always, description/button on hover (desktop only) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
          <h3
            className="text-white font-medium leading-[1.05] tracking-[-0.01em] text-[1.75rem] md:text-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {card.title}
          </h3>

          {/* Description + CTA — desktop only, hover reveal */}
          <div className="hidden md:block overflow-hidden">
            <div className="max-h-0 group-hover:max-h-[180px] transition-[max-height] duration-500 ease-out">
              <p className="pt-3 text-white/80 text-sm leading-relaxed max-w-[32ch] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                {card.subtitle}
              </p>
              <div className="mt-5 flex opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <Link
                  href={card.link}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 bg-[#EEEAE1] text-[#161514] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#FF5B22] hover:text-white transition-colors"
                >
                  View Gallery
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const HorizontalScrollCarousel: React.FC<{ cards: CardProps[] }> = ({
  cards,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const [scrollWidth, setScrollWidth] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (scrollContainerRef.current) {
        const totalScrollWidth = scrollContainerRef.current.scrollWidth;
        const visibleWidth = window.innerWidth;
        const diff = totalScrollWidth - visibleWidth + 30;
        setScrollWidth(-diff);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ["0px", `${scrollWidth}px`]);

  return (
    <section ref={targetRef} className="relative h-[500vh] lg:ml-3 ml-3">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={scrollContainerRef}
          style={{ x }}
          className="flex gap-4"
        >
          {cards.map((card, index) => (
            <Card card={card} index={index} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Service: React.FC = () => {
  return (
    <div className="mt-[60px]">
      <HorizontalScrollCarousel cards={cards} />
    </div>
  );
};

export default Service;