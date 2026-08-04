// Server-safe SERVICES data (used by both server components and client components).
// Do NOT add 'use client' here — server components (generateMetadata / generateStaticParams)
// need to consume this synchronously at build time.

const CLD = 'https://res.cloudinary.com/ddamvvrby/image/upload'

export const SERVICES = [
  { t: 'Wedding Photography & Videography', d: 'Natural wedding photography and cinematic films that preserve every celebration, emotion and detail—from intimate ceremonies to destination weddings.', img: `${CLD}/v1771153677/carousel-images/q9uunwxx92hobej4ogft.jpg`, slug: 'weddings', featured: true },
  { t: 'Event Photography & Videography', d: 'Professional photography and videography for corporate events, conferences, award nights, product launches and private celebrations.', img: `${CLD}/v1771153887/carousel-images/fcbq8mauttaj2tdowdpd.jpg`, slug: 'events', featured: true },
  { t: 'Portraits & Headshots', d: 'Modern portraits and professional headshots for entrepreneurs, executives, artists, models and personal brands.', img: `${CLD}/v1765199683/carousel-images/dlkon31dr7dhouimtnoh.jpg`, slug: 'portraits-headshots', featured: true },
  { t: 'Editorial & Portfolio', d: 'Creative editorial photography and portfolio shoots for models, designers, publications and creative professionals.', img: `${CLD}/v1764435296/carousel-images/bndwzw9knvrtfglgsfuv.jpg`, slug: 'editorial-portfolio', featured: true },
  { t: 'Live Streaming', d: 'Reliable live streaming for weddings, conferences and events, with multi-camera coverage, clear audio and private viewing links.', img: `${CLD}/v1771154401/carousel-images/fdgbinlwnq6bviqxkrom.jpg`, slug: 'live-streaming' },
  { t: 'Family & Kids', d: 'Warm family, maternity, newborn and kids photography that captures real expressions, milestones and everyday moments beautifully.', img: `${CLD}/v1771154163/carousel-images/wea3dcnfcqwfpkgdhsr6.jpg`, slug: 'family-kids' },
  { t: 'Fashion Shoots & Lookbooks', d: 'Fashion photography for designers, labels and models who need sharp campaign images, lookbooks and portfolio-ready visuals.', img: `${CLD}/v1771154450/carousel-images/kctdnndw38e7scaopkb1.jpg`, slug: 'fashion-shoots' },
  { t: 'Boudoir Shoots', d: 'Private, tasteful boudoir photography with guided posing, comfortable direction and polished retouching in a secure setting.', img: `${CLD}/v1771154718/carousel-images/toypkr9r3zwbkw2p5w9c.jpg`, slug: 'boudoir-shoots' },
  { t: 'Brand & Content', d: 'Photography and short-form video content that helps brands connect with their audience across websites, social media and advertising.', img: `${CLD}/v1771155083/carousel-images/dh56owvqrdvfa9ocqfh9.jpg`, slug: 'brand-content' },
  { t: 'Product & E-Commerce', d: 'Clean, high-quality product photography designed for eCommerce, marketplaces, catalogues and marketing campaigns.', img: `${CLD}/v1771154978/carousel-images/dbwbmth1qieqholbtjc9.jpg`, slug: 'product-ecommerce' },
  { t: 'Food Photography', d: 'Appetite-worthy food photography for restaurants, cafés, cloud kitchens and hospitality brands.', img: `${CLD}/v1771155215/carousel-images/wijqbdmgr7xm1nmneltg.jpg`, slug: 'food-photography' },
  { t: 'Corporate & Industrial', d: 'Professional coverage for businesses, manufacturing facilities, offices and industrial projects.', img: `${CLD}/v1771155341/carousel-images/v1y8plbup15avvgljrmh.jpg`, slug: 'corporate-industrial' },
  { t: 'Real Estate & Architectural', d: 'Photography, video and drone coverage for homes, commercial spaces, hotels and luxury properties.', img: `${CLD}/v1771155516/carousel-images/j1zlqu9rbmeuydhtuzno.jpg`, slug: 'real-estate-architectural' },
  { t: 'Influencer & Celebrity Content', d: 'Lifestyle photography and social-first video content created for creators, public figures and talent management teams.', img: `${CLD}/v1771155641/carousel-images/zwzh6nwnncy15k2dfesa.jpg`, slug: 'influencer-celebrity' },
  { t: 'Podcast Production', d: 'Multi-camera podcast production with professional lighting, audio and post-production editing.', img: `${CLD}/v1771155810/carousel-images/sbczmukaerzgvwrmzmon.jpg`, slug: 'podcast-production' },
  { t: 'Photo & Video Editing', d: 'Professional photo retouching and video editing for weddings, brands, reels, teasers and polished campaign delivery.', img: `${CLD}/v1771157253/carousel-images/mneazokgcbmmjqtzbmiy.jpg`, slug: 'editing-retouching' },
  { t: 'Album Design & Printing', d: 'Premium handcrafted albums designed to preserve your memories for generations.', img: `${CLD}/v1771155940/carousel-images/kplquwcnlcdcchc4fgbd.png`, slug: 'album-design' },
  { t: 'Drone Photography & Videography', d: 'High-quality aerial photography and cinematic drone footage for weddings, events, real estate and commercial projects.', img: `${CLD}/v1771156827/carousel-images/rvroy30spxfwb9usqcgn.jpg`, slug: 'drone-services' },
  { t: 'Design Services', d: 'Creative design solutions for print, digital marketing, branding and promotional materials.', img: `${CLD}/v1771156073/carousel-images/irvv8zq6z5um0gpdakae.jpg`, slug: 'design-services' },
]