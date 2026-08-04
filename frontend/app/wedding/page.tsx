"use client";
import Banner from "@live/components/live-streaming/Banner";
import Services from "@live/components/wedding/Services";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useEffect, useState } from "react";
import OurServices from "@live/components/wedding/OurServices";
import WhyChooseUs from "@live/components/wedding/WhyChooseUs";
import OurProcess from "@live/components/wedding/OurProcess";
const cover = "/wedding/cover.jpg";
const backgroundVideo = "/wedding/wedding.mp4";

const marqueeData = [
  { src: "/wedding/corousal/img1.jpg", width: 350, height: 450 },
  { src: "/wedding/corousal/img2.jpg", width: 700, height: 450 },
  { src: "/wedding/corousal/img3.jpg", width: 350, height: 450 },
  { src: "/wedding/corousal/img4.jpg", width: 700, height: 450 },
  { src: "/wedding/corousal/img5.jpg", width: 350, height: 450 },
  { src: "/wedding/corousal/img6.jpg", width: 350, height: 450 },
  { src: "/wedding/corousal/img7.jpg", width: 350, height: 450 },
  { src: "/wedding/corousal/img8.jpg", width: 350, height: 450 },
  { src: "/wedding/corousal/img9.jpg", width: 350, height: 450 },
  { src: "/wedding/corousal/img10.jpg", width: 700, height: 450 },
  { src: "/wedding/corousal/img11.jpg", width: 350, height: 450 },
  { src: "/wedding/corousal/img12.jpg", width: 350, height: 450 },
];

const WeddingPage = () => {
  const title =
    "Wedding Photographer in Mumbai & Goa";
  const description =
    "Candid, cinematic and luxury editorial wedding photography across Mumbai, North Goa, South Goa and destination celebrations.";
  const [speed, setSpeed] = useState(50); // default speed

  const faqs = [
    {
      q: "How much does wedding photography cost in Mumbai and Goa?",
      a: "Wedding photography packages in Mumbai and Goa depend on the number of days, photographers, cinematographers, drone coverage, albums, travel and delivery timelines. PK Photography confirms a transparent written quote before blocking the date.",
    },
    {
      q: "Do you shoot destination weddings in North Goa and South Goa?",
      a: "Yes. The team covers North Goa, South Goa and destination venues around Fontainhas, Vagator, Palolem, Agonda and Chapora, with travel and stay scoped clearly.",
    },
    {
      q: "Can you cover pre-wedding shoots in Mumbai and Goa too?",
      a: "Yes. Pre-wedding shoots can be planned around Bandra, Juhu, South Mumbai, Fontainhas, Vagator, Palolem, Agonda, Chapora and other meaningful settings.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  useEffect(() => {
    const updateSpeed = () => {
      if (window.innerWidth <= 768) {
        setSpeed(80);
      } else {
        setSpeed(50);
      }
    };

    updateSpeed();
    window.addEventListener("resize", updateSpeed);

    return () => window.removeEventListener("resize", updateSpeed);
  }, []);
  return (
    <div>
      <Banner
        fallbackImage={cover}
        backgroundVideo={backgroundVideo}
        title={title}
        description={description}
      />
      <section className="bg-[#EEEAE1] py-16 md:py-24" data-testid="wedding-seo-intro">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#E24A12] font-semibold mb-4">Mumbai · Goa · Destination weddings</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1] text-[#161514]">Wedding Photographer in Mumbai &amp; Goa</h1>
            <div className="mt-7 space-y-5 text-[#4C4A46] leading-relaxed text-base md:text-lg">
              <p>
                Wedding photographer in Mumbai and Goa searches are usually high-intent: you are comparing style, packages, trust and whether the team understands your venue. PK Photography documents candid wedding moments, cinematic films and luxury editorial portraits across Bandra, Juhu, South Mumbai, North Goa and South Goa.
              </p>
              <p>
                From hotel ballrooms in South Mumbai and family celebrations in Juhu to destination vows near Fontainhas, Vagator, Palolem, Agonda and Chapora, the team plans around light, weather, rituals, movement and family priorities. The result is wedding photography that feels premium without losing the emotional truth of the day.
              </p>
              <p>
                Use the gallery to review real frames, compare pricing for wedding photography packages in Mumbai and Goa, or start booking when your date is ready.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a data-testid="wedding-gallery-link" href="/gallery?category=weddings" className="rounded-full bg-[#161514] px-6 py-3 text-white font-semibold hover:bg-[#FF5B22] transition-colors">View wedding gallery</a>
              <a data-testid="wedding-pricing-link" href="/pricing?category=weddings" className="rounded-full border border-[#DBD4C6] px-6 py-3 text-[#161514] font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">See wedding packages</a>
              <a data-testid="wedding-booking-link" href="/booking" className="rounded-full border border-[#DBD4C6] px-6 py-3 text-[#161514] font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">Book online</a>
            </div>
          </div>
          <div className="rounded-3xl border border-[#DBD4C6] bg-[#E6E1D5] p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-[#8A857D] mb-4">Popular searches we serve</div>
            <div className="flex flex-wrap gap-2">
              {["candid wedding photographer Mumbai", "destination wedding photographer in Goa", "cinematic wedding photography Mumbai", "luxury destination wedding photographer Goa", "wedding photography packages Mumbai", "pre-wedding shoot in Goa"].map((tag) => (
                <span key={tag} className="rounded-full bg-[#EEEAE1] border border-[#DBD4C6] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-[#8A857D]">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Services />
      <OurServices />

      <h2 className="max-w-3xl mx-auto text-center my-[7%] text-4xl md:text-5xl font-bold mb-6">
        Every Culture, Every Wedding
      </h2>
      <p className="text-lg mx-4 md:mx-12 md:text-xl mb-8  text-center  ">
        We are proud to document Hindu, Christian, Muslim, Sikh, Jain, and
        interfaith weddings across Mumbai and beyond. Our team respects and
        understands the beauty of every tradition.
      </p>
      <Marquee speed={speed} gradient={false} className="py-4">
        {marqueeData.map((image, idx) => (
          <div
            key={idx}
            className="relative mx-4 flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-md bg-black"
            style={{
              width: image.width,
              height: image.height,
              maxWidth: image.width,
              maxHeight: image.height,
            }}
          >
            <Image
              src={image.src}
              alt={`Wedding couple and ceremony at Mumbai or Goa venue in candid cinematic style, Mumbai & Goa frame ${idx + 1}`}
              width={image.width}
              height={image.height}
              className="rounded-2xl object-cover w-full h-full"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </Marquee>
      <WhyChooseUs />
      <OurProcess />
      <section className="bg-[#E6E1D5] py-16 md:py-24" data-testid="wedding-faq-section">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="text-xs uppercase tracking-[0.28em] text-[#E24A12] font-semibold mb-4">Wedding FAQs</div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#161514] mb-8">Mumbai &amp; Goa wedding photography questions</h2>
          <div className="divide-y divide-[#DBD4C6]">
            {faqs.map((faq, index) => (
              <div key={faq.q} data-testid={`wedding-faq-${index}`} className="py-6">
                <h3 className="text-xl font-semibold text-[#161514]">{faq.q}</h3>
                <p className="mt-3 text-[#4C4A46] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className=" max-w-3xl mx-auto text-center my-[7%]">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Let’s Begin Your Wedding Story
        </h2>
        <p className="text-lg mx-4 md:mx-0 md:text-xl mb-8 ">
          Planning your big day in Mumbai or elsewhere? Let’s make it
          unforgettable with visuals that last a lifetime.
        </p>
        <a
          href="/booking"
          data-testid="wedding-final-booking-link"
          className="inline-block bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
        >
          Book With Us
        </a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
};

export default WeddingPage;
