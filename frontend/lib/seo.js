import { SERVICES } from './services'

// Central SEO system for PK Photography — Mumbai · Goa · Pan India.
// Focus: high-intent Mumbai + Goa photography searches without creating city landing pages.

export const SITE = 'https://pkphotography.in'
export const BRAND = 'PK Photography'
export const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/ddamvvrby/image/upload/v1771153677/carousel-images/q9uunwxx92hobej4ogft.jpg'

export const SITE_DETAILS = {
  name: BRAND,
  founder: 'Prabhakar Kumar',
  phone: '+91 88887 66739',
  phoneRaw: '+918888766739',
  email: 'prabhakar@pkphotography.in',
  address: 'Andheri West, Mumbai 400058, Maharashtra',
  streetAddress: 'Andheri West',
  locality: 'Mumbai',
  region: 'Maharashtra',
  postalCode: '400058',
  country: 'IN',
}

const LOCAL_KEYWORDS = [
  'wedding photographer in Mumbai',
  'candid wedding photographer Mumbai',
  'destination wedding photographer in Goa',
  'pre-wedding photographer Mumbai',
  'pre-wedding photographer in Goa',
  'wedding photography packages Mumbai',
  'pre-wedding shoot price in Goa',
  'luxury destination wedding photographer Goa',
]

const SERVICE_INTENT = {
  weddings: {
    serviceTitle: 'Wedding Photographer',
    h1: 'Wedding Photographer in Mumbai & Goa',
    primary: 'wedding photographer in Mumbai',
    secondary: 'destination wedding photographer in Goa',
    style: 'candid, cinematic and luxury editorial',
    description:
      'Candid and cinematic wedding photography across Mumbai and Goa with clear packages, luxury albums, drone films and fast booking. Enquire today.',
    localHook:
      'multi-day weddings, pheras, Catholic vows, beach mandaps, Sangeet nights and reception films',
    priceHook: 'wedding photography packages in Mumbai and Goa depend on crew size, days, albums and drone coverage',
  },
  events: {
    serviceTitle: 'Event Photographer',
    h1: 'Event Photographer in Mumbai & Goa',
    primary: 'event photographer Mumbai',
    secondary: 'corporate event photographer Goa',
    style: 'clean documentary and brand-ready',
    description:
      'Event photographer in Mumbai & Goa for launches, conferences, awards and private celebrations with quick previews and polished delivery.',
    localHook: 'BKC conferences, Juhu celebrations, South Mumbai launches and Goa resort events',
    priceHook: 'event photography cost depends on hours, photographers, video, live edits and delivery speed',
  },
  'portraits-headshots': {
    serviceTitle: 'Portrait & Headshot Photographer',
    h1: 'Portrait & Headshot Photographer in Mumbai & Goa',
    primary: 'headshot photographer Mumbai',
    secondary: 'portrait photographer in Goa',
    style: 'editorial studio and natural-light',
    description:
      'Portrait and headshot photographer in Mumbai & Goa for founders, actors, artists and teams with guided posing and premium retouching.',
    localHook: 'Andheri studio portraits, Bandra editorial frames and Goa lifestyle headshots',
    priceHook: 'headshot and portrait costs vary by looks, styling, makeup, retouching and studio time',
  },
  'editorial-portfolio': {
    serviceTitle: 'Editorial & Portfolio Photographer',
    h1: 'Editorial & Portfolio Photographer in Mumbai & Goa',
    primary: 'portfolio photographer Mumbai',
    secondary: 'editorial photographer Goa',
    style: 'luxury editorial and magazine-led',
    description:
      'Editorial and portfolio photographer in Mumbai & Goa for models, actors and personal brands with styling, art direction and retouching.',
    localHook: 'Bandra streets, South Mumbai heritage rooms, Fontainhas colour and Goa beach light',
    priceHook: 'portfolio shoot pricing changes with looks, styling, makeup, location permits and retouched selects',
  },
  'live-streaming': {
    serviceTitle: 'Live Streaming Service',
    h1: 'Live Streaming Services in Mumbai & Goa',
    primary: 'live streaming Mumbai',
    secondary: 'wedding live streaming Goa',
    style: 'multi-camera broadcast and cinematic',
    description:
      'Live streaming services in Mumbai & Goa for weddings, conferences and events with multi-camera coverage and private broadcast links.',
    localHook: 'Mumbai hotel ballrooms, South Goa beach resorts and hybrid corporate venues',
    priceHook: 'live streaming costs depend on cameras, audio, platform, crew, internet backup and event duration',
  },
  'family-kids': {
    serviceTitle: 'Family, Newborn & Kids Photographer',
    h1: 'Family, Newborn & Kids Photographer in Mumbai & Goa',
    primary: 'newborn photographer in Mumbai',
    secondary: 'family photographer Goa',
    style: 'warm lifestyle and candid',
    description:
      'Family, newborn and kids photographer in Mumbai & Goa for maternity, baby milestones, birthdays and natural family portraits.',
    localHook: 'at-home newborn sessions, Juhu family portraits and relaxed Goa villa shoots',
    priceHook: 'family and newborn shoot cost depends on location, props, retouching and album choices',
    body: [
      'Our family and kids photography is made for new parents wanting safe newborn portraits in their first two weeks, expecting mothers planning maternity shoots, families marking birthdays, annaprashan and first-year milestones, and multi-generation families who want everyone — grandparents included — in one warm, natural frame. Sessions happen wherever your family is most comfortable: at home in Mumbai, in our Andheri studio, or outdoors at Juhu beach, neighbourhood parks or a Goa villa on holiday.',
      'Every session is paced around your child, not a stopwatch — naps, feeds and moods set the rhythm, and newborn posing is always gentle and parent-assisted. Families searching for a newborn photographer in Mumbai or a family photoshoot in Goa usually want the same three things: photos that look like their real family, a photographer who is patient with kids, and prints or albums that survive being passed around. That is exactly what we deliver.',
    ],
  },
  'fashion-shoots': {
    serviceTitle: 'Fashion Photographer',
    h1: 'Fashion Photographer in Mumbai & Goa',
    primary: 'fashion photographer Mumbai',
    secondary: 'fashion campaign photographer Goa',
    style: 'editorial, lookbook and campaign',
    description:
      'Fashion photographer in Mumbai & Goa for lookbooks, campaigns and model shoots with editorial lighting, styling and retouching.',
    localHook: 'Bandra lanes, studio sets, South Mumbai architecture and Goa resort collections',
    priceHook: 'fashion shoot pricing changes with crew, looks, styling, casting, location and post-production depth',
    body: [
      'Our fashion photography serves clothing labels and D2C brands shooting seasonal lookbooks, independent designers preparing collection launches, models and actors building agency-ready portfolios, and stylists or agencies producing campaigns. We plan per look — styling, MUA, casting and set coordinated in one production — so a full collection can be shot efficiently in a day at our Mumbai studio, in Bandra and South Mumbai locations, or across Goa resorts for resortwear and swim collections.',
      'What separates a fashion photographer in Mumbai from a general portrait photographer is fabric: colour-accurate lighting and retouching that keep textures, drape and tones true to the garment, framing consistent enough for e-commerce grids, and editorial frames strong enough for magazine submissions. Whether you need a lookbook photographer for a Lakme-season launch or a campaign shot on a Goa cliff at golden hour, the usage rights, look counts and delivery formats are agreed in writing before the shoot.',
    ],
  },
  'boudoir-shoots': {
    serviceTitle: 'Boudoir Photographer',
    h1: 'Boudoir Photographer in Mumbai & Goa',
    primary: 'boudoir photographer Mumbai',
    secondary: 'private portrait photographer Goa',
    style: 'private, editorial and empowering',
    description:
      'Boudoir photographer in Mumbai & Goa for discreet, empowering sessions with privacy-first planning and refined editorial retouching.',
    localHook: 'private Andheri studio sessions and discreet Goa resort portrait stories',
    priceHook: 'boudoir pricing depends on studio time, makeup, styling, retouching and privacy requirements',
    body: [
      'Boudoir photography with us is for anyone marking a moment for themselves: brides-to-be creating a wedding-day gift, women celebrating a birthday, fitness milestone or new chapter, expecting mothers wanting intimate maternity portraits, and couples marking an anniversary. Sessions run in a private, closed studio in Andheri West with only essential crew, a female makeup artist and stylist available on request, and posing guided gently from start to finish — most of our clients have never been photographed like this before.',
      'Privacy is the reason clients choose a boudoir photographer in Mumbai carefully, and it is the foundation of how we work: files are stored securely, galleries are private and password-protected, and no image is ever shown publicly or used in our portfolio without written consent. For destination sessions, we also photograph discreet private-villa boudoir shoots in Goa, planned with the same confidentiality from enquiry to delivery.',
    ],
  },
  'brand-content': {
    serviceTitle: 'Brand Content Photographer',
    h1: 'Brand Content Photographer in Mumbai & Goa',
    primary: 'brand content photographer Mumbai',
    secondary: 'content production Goa',
    style: 'premium social-first and campaign-ready',
    description:
      'Brand content photographer in Mumbai & Goa for reels, product stories, launch assets and campaign visuals with one in-house team.',
    localHook: 'Mumbai startup offices, Juhu lifestyle sets, Fontainhas colour and Goa hospitality brands',
    priceHook: 'brand content pricing depends on deliverable count, reels, campaign usage, crew and edit volume',
    body: [
      'Brand content shoots are built for D2C and startup brands that need a constant supply of photos and reels, restaurants and retail stores feeding social pages, founders building personal brands on LinkedIn and Instagram, and marketing teams that are tired of stitching together freelancers. Instead of one-off shoots, we run content days: a single planned session in your Mumbai office, store or a styled location that produces a month of posts, vertical reels, website banners and ad creatives in one go.',
      'The difference between brand content photography in Mumbai and generic product shots is planning around your content calendar — launches, offers and campaigns mapped into shot lists before anyone picks up a camera. Reels are edited hook-first for watch time, stills are graded to one consistent brand look, and everything is delivered as an organised library your team can schedule immediately. For hospitality and lifestyle brands, we also shoot content days across Goa resorts and cafés.',
    ],
  },
  'product-ecommerce': {
    serviceTitle: 'Product & E-Commerce Photographer',
    h1: 'Product & E-Commerce Photographer in Mumbai & Goa',
    primary: 'product photographer Mumbai',
    secondary: 'ecommerce photographer Goa',
    style: 'crisp commercial and lifestyle',
    description:
      'Product and e-commerce photographer in Mumbai & Goa for catalogues, Amazon-ready images, lifestyle sets and D2C launch visuals.',
    localHook: 'Mumbai studio catalogues, Bandra lifestyle sets and Goa resort product stories',
    priceHook: 'product photography cost depends on SKU count, styling, backgrounds, lifestyle frames and retouching',
    body: [
      'Our product photography serves Amazon, Flipkart and Myntra sellers who need marketplace-compliant white-background images, D2C brands building website catalogues, jewellery and apparel labels needing colour-critical detail work, and agencies producing catalogue shoots at volume. Every shoot starts from your SKU list: angles, image counts and marketplace specs are locked first, then products are shot in batches under consistent, colour-accurate studio lighting in Mumbai.',
      'E-commerce photography lives or dies on two things — compliance and colour. Files are delivered sized to marketplace requirements, named by SKU code and ready to upload without rework, and colours are matched so buyers receive what they saw. Beyond catalogue shots, we produce styled lifestyle scenes, on-model shots, texture macros and banner creatives that give a D2C product page the depth of a brand, with per-SKU pricing that drops as batch size grows.',
    ],
  },
  'food-photography': {
    serviceTitle: 'Food Photographer',
    h1: 'Food Photographer in Mumbai & Goa',
    primary: 'food photographer Mumbai',
    secondary: 'restaurant photographer Goa',
    style: 'appetising editorial and menu-ready',
    description:
      'Food photographer in Mumbai & Goa for restaurants, cafes, hotels and cloud kitchens with menu images, reels and styled hero shots.',
    localHook: 'Bandra cafes, South Mumbai restaurants, Juhu menus and Goa beach restaurants',
    priceHook: 'food photography pricing depends on dish count, styling, video reels, travel and delivery volume',
    body: [
      'Our food photography is for restaurants and cafés refreshing menus, cloud kitchens whose photos are the entire storefront on Zomato and Swiggy, hotels and resorts shooting F&B marketing, and packaged-food brands needing appetising campaign imagery. We shoot on-site — a studio-style lighting and styling setup built in your own kitchen in Mumbai or Goa — so dishes are photographed within minutes of plating and your service never has to stop for the day.',
      'Delivery-app images decide orders: a food photographer in Mumbai worth booking should know Zomato and Swiggy crop ratios, how to keep plating angles consistent across a 40-dish menu, and how to make steam, pours and melts look real rather than staged. Styling guidance, props and surfaces are included in our packages, and delivery covers menu-print files, app-ready crops, social sets and reels of dishes being made.',
    ],
  },
  'corporate-industrial': {
    serviceTitle: 'Corporate & Industrial Photographer',
    h1: 'Corporate & Industrial Photographer in Mumbai & Goa',
    primary: 'corporate photographer Mumbai',
    secondary: 'industrial photographer Goa',
    style: 'precise, premium and report-ready',
    description:
      'Corporate and industrial photographer in Mumbai & Goa for teams, plants, annual reports, B2B campaigns and executive portraits.',
    localHook: 'BKC offices, MIDC facilities, South Mumbai boardrooms and Goa manufacturing sites',
    priceHook: 'corporate shoot pricing depends on crew, safety requirements, locations, retouching and usage rights',
    body: [
      'Corporate and industrial photography here serves offices and corporates needing executive portraits and team headshots at scale, manufacturing plants and factories documenting facilities and production lines, communications teams building annual reports and investor decks, and HR teams producing employer-branding imagery. We photograph across BKC, Lower Parel, Andheri and South Mumbai offices as well as MIDC industrial belts and Goa manufacturing sites — with a crew that is comfortable being safety-inducted and working around live operations.',
      'The practical difference with B2B photography is consistency and logistics: one clean headshot style whether you have 10 employees or 500, shoots scheduled around shifts so production is never disrupted, and delivery organised by department so comms teams can publish immediately. Day-rate and per-location packages are structured so procurement can approve them easily, with usage rights documented upfront for reports, websites and campaigns.',
    ],
  },
  'real-estate-architectural': {
    serviceTitle: 'Real Estate & Architectural Photographer',
    h1: 'Real Estate & Architectural Photographer in Mumbai & Goa',
    primary: 'real estate photographer Mumbai',
    secondary: 'property photographer Goa',
    style: 'luxury interior, twilight and drone',
    description:
      'Real estate and architectural photographer in Mumbai & Goa for villas, resorts, interiors and listings with drone and walkthrough options.',
    localHook: 'Bandra apartments, South Mumbai heritage homes, North Goa villas and South Goa resorts',
    priceHook: 'real estate shoot cost depends on property size, twilight timing, drone, video and turnaround',
    body: [
      'Our real estate and architectural photography serves brokers and agents who need listings shot and delivered fast, developers and builders marketing show flats and projects, hotels, resorts and villas shooting for booking platforms, and architects and interior designers documenting finished work. Coverage spans Bandra and South Mumbai apartments, heritage homes, commercial spaces, and North and South Goa villas and resorts — with HDR interiors, styled vignettes, twilight exteriors and drone aerials that show the location, not just the building.',
      'Listings are time-sensitive, so portal-ready files are delivered within 48 hours, sized for MLS portals, websites and print, with commercial usage rights included. Twilight shots — photographed at dusk with interiors glowing — consistently earn more clicks on property portals, and drone flights are planned around society, municipal and airport-zone permissions so aerial coverage stays compliant. Per-property pricing means you know the exact cost before the shoot.',
    ],
  },
  'influencer-celebrity': {
    serviceTitle: 'Influencer & Celebrity Photographer',
    h1: 'Influencer & Celebrity Photographer in Mumbai & Goa',
    primary: 'celebrity photographer Mumbai',
    secondary: 'influencer photographer Goa',
    style: 'discreet editorial and social-first',
    description:
      'Influencer and celebrity photographer in Mumbai & Goa for personal-brand shoots, campaigns, reels and discreet image production.',
    localHook: 'private Mumbai studios, Bandra lifestyle routes and Goa resort content days',
    priceHook: 'influencer shoot cost depends on crew size, reels, usage, locations, styling and privacy needs',
    body: [
      'This service is built for content creators who need a month of feed and reel content from one session, public figures and celebrities who require discretion as much as quality, talent agencies coordinating shoots for multiple artists, and founders building serious personal brands. We run batched content days across private Mumbai studios, Bandra lifestyle routes and Goa resorts — multiple outfits, locations and formats captured efficiently in one production.',
      'Working with public faces changes how a shoot is run: NDAs are standard, locations are scouted for privacy, crews stay small, and coordination happens directly with managers or agencies when needed. Selects are delivered within 24–48 hours for deadline-driven brand collaborations, with full colour-graded sets and reel-ready vertical edits following — and every session archived so your team can pull content months later.',
    ],
  },
  'podcast-production': {
    serviceTitle: 'Podcast Production Studio',
    h1: 'Podcast Production Studio in Mumbai & Goa',
    primary: 'podcast studio Mumbai',
    secondary: 'video podcast production Goa',
    style: 'multi-camera cinematic and broadcast-clean',
    description:
      'Podcast production studio in Mumbai & Goa for video podcasts, branded interviews, audio setup, editing and social clips.',
    localHook: 'Mumbai studio recordings, founder interviews and Goa brand podcast sessions',
    priceHook: 'podcast production pricing depends on episode length, cameras, set design, editing and clips',
    body: [
      'Our podcast production serves hosts starting or upgrading their shows, businesses launching branded podcasts, YouTube creators moving to multi-camera interview formats, and coaches and experts turning conversations into content. Every session runs with 2–4 camera angles, broadcast-quality microphones and an engineer monitoring audio live — recorded in a Mumbai studio or on location at your office, with set design and branding planned before the first episode.',
      'Sound is the difference between a podcast people finish and one they abandon, which is why audio is engineered first and mastered per episode. Delivery covers the full edited episode for YouTube, audio versions for Spotify and Apple Podcasts, and short vertical clips cut for reels and shorts so every episode markets itself. Pricing works per episode or as a monthly series package for shows recording on a schedule.',
    ],
  },
  'editing-retouching': {
    serviceTitle: 'Photo Editing & Video Retouching Service',
    h1: 'Photo Editing & Video Retouching in Mumbai & Goa',
    primary: 'photo editing Mumbai',
    secondary: 'wedding video editing Goa',
    style: 'cinematic colour and polished retouching',
    description:
      'Photo editing and video retouching in Mumbai & Goa for weddings, portraits, brands and films with cinematic colour grading.',
    localHook: 'Mumbai wedding edits, Goa pre-wedding films and brand campaign post-production',
    priceHook: 'editing cost depends on image count, video runtime, grading, retouch depth and delivery formats',
    body: [
      'Photo and video editing here is a post-production-only service: you already have the raw files, we make them exceptional. It serves photographers and studios outsourcing culling, colour and retouching at volume, couples holding raw wedding footage that was never edited, brands and agencies needing campaign-grade finishing, and creators who shoot but have no time to edit. Every job starts with a sample edit so you approve the style before the full batch begins.',
      'Tiers are kept honest and clear: basic colour correction, standard retouching, or advanced work like compositing, old-photo restoration and full wedding-film edits with grading and sound design. Batch consistency is the hard part at volume — thousands of event images matched to one colour standard — and it is what studios come to us for. Standard delivery runs 3–7 days with two revision rounds included, never billed as extras.',
    ],
  },
  'album-design': {
    serviceTitle: 'Wedding Album Design Service',
    h1: 'Wedding Album Design & Printing in Mumbai & Goa',
    primary: 'wedding album design Mumbai',
    secondary: 'wedding album printing Goa',
    style: 'fine-art, archival and luxury',
    description:
      'Wedding album design and printing in Mumbai & Goa with handcrafted layouts, fine-art paper, parent albums and premium binding.',
    localHook: 'Mumbai weddings, Goa destination albums and heirloom parent copies',
    priceHook: 'album pricing depends on spread count, paper, cover material, parent copies and print size',
    body: [
      'Album design and printing is mostly chosen by wedding couples who want their photos out of a hard drive and into something their family will actually hold, parents ordering compact copies of the main album, families making baby milestone and anniversary books, and companies producing yearbooks and event albums. Whether the photos are from our own Mumbai and Goa weddings or another photographer entirely, we curate them into story order and design every spread by hand — no auto-generated templates.',
      'Materials decide how an album ages: covers in leather, linen, velvet, acrylic or photo finishes with foil-embossed names, thick lay-flat pages, and archival photographic printing that holds colour for decades. Sizes run from 8x8" mini albums to 15x12" flush-mount wedding albums in 30, 40 or 60-page options, with a digital preview and two revision rounds before anything is printed, bound and delivered in a keepsake box.',
    ],
  },
  'drone-services': {
    serviceTitle: 'Drone Photographer & Videographer',
    h1: 'Drone Photographer & Videographer in Mumbai & Goa',
    primary: 'drone photographer Mumbai',
    secondary: 'drone videography Goa',
    style: 'cinematic aerial and venue-led',
    description:
      'Drone photographer and videographer in Mumbai & Goa for weddings, resorts, real estate and events with cinematic aerial coverage.',
    localHook: 'Mumbai skyline frames, Chapora cliffs, Vagator beaches and South Goa resorts',
    priceHook: 'drone pricing depends on location permissions, flight time, pilot, video edit and deliverables',
  },
  'design-services': {
    serviceTitle: 'Graphic Design & Print Service',
    h1: 'Graphic Design & Print Services in Mumbai & Goa',
    primary: 'graphic design services Mumbai',
    secondary: 'wedding invitation design Goa',
    style: 'premium brand and wedding collateral',
    description:
      'Graphic design and print services in Mumbai & Goa for wedding invitations, brand templates, brochures and social campaign assets.',
    localHook: 'Mumbai brand launches, Goa destination wedding stationery and social templates',
    priceHook: 'design service pricing depends on concepts, revisions, print quantity, materials and content formats',
    body: [
      'Design services exist because most of our photography clients eventually need design too: couples wanting wedding invitations, save-the-dates, itineraries and welcome signage that match their wedding\'s look; brands needing logos, social media templates, packaging and pitch decks; restaurants and retail stores needing menus, posters and standees; and planners and agencies needing event collateral on tight deadlines.',
      'The advantage of designing where you shoot is consistency — the same team that photographs your wedding or products designs the collateral around them, so colours, typography and imagery stay in one visual language. Every package has a fixed scope with two revision rounds included, files are delivered print-ready and digital, and we coordinate directly with printers in Mumbai so what arrives matches what you approved.',
    ],
  },
}

function titleFromService(service) {
  return service.t
    .replace(/\s*&\s*Videography/g, '')
    .replace(/\s*&\s*Video/g, '')
    .replace(/Photography/g, 'Photographer')
}

function makeServiceSeo(service) {
  const intent = SERVICE_INTENT[service.slug] || {}
  const serviceTitle = intent.serviceTitle || titleFromService(service)
  const primary = intent.primary || `${serviceTitle.toLowerCase()} Mumbai`
  const secondary = intent.secondary || `${serviceTitle.toLowerCase()} Goa`
  const style = intent.style || 'premium editorial and cinematic'
  const h1 = intent.h1 || `${serviceTitle} in Mumbai & Goa`
  const description =
    intent.description ||
    `${serviceTitle} in Mumbai & Goa by PK Photography for premium shoots, clear planning, careful direction and fast delivery. Enquire today.`

  const title = `${serviceTitle} in Mumbai & Goa | ${BRAND}`
  const body = intent.body || [
    `${h1} is the way PK Photography helps clients move from an idea to finished, publication-ready visuals without confusion. From Bandra, Juhu and South Mumbai to Fontainhas, Vagator, Palolem, Agonda and Chapora, the team plans each frame around light, location, timing and the emotion or commercial purpose behind the shoot. The visual direction is ${style}: refined enough for luxury brands and wedding albums, but natural enough to keep real people, real rituals and real spaces at the centre of the story.`,
    `For Mumbai clients, we understand the pace of venues around Bandra, Juhu, Andheri, BKC and South Mumbai: traffic windows, indoor hotel light, humid outdoor evenings, monsoon backup plans and the need for efficient crew movement. For Goa, we plan around North Goa and South Goa light differently — Fontainhas colour, Vagator cliffs, Chapora sunsets, Palolem and Agonda beach softness, resort permissions and coastal weather shifts. That local awareness keeps the shoot elegant instead of chaotic.`,
    `Every enquiry is scoped clearly before the date is blocked. You can compare relevant work in the gallery, review pricing ranges, and then book online or message on WhatsApp for a custom quote. We avoid vague packages and keyword-heavy promises; instead, we confirm crew size, hours, deliverables, retouching, albums, films, reels, travel and handover timelines upfront.`,
    `If you are comparing an affordable ${serviceTitle.toLowerCase()} in Mumbai or Goa with a luxury team, the real difference is preparation. PK Photography brings one in-house crew, consistent colour, backup gear, a calm lead photographer and post-production handled under the same roof. That means your images feel cohesive whether the setting is a South Mumbai ballroom, a Bandra lane, a Juhu home, a Fontainhas street, a Vagator cliff or a Palolem beach.`,
  ]

  const faqs = [
    {
      q: `How much does ${serviceTitle.toLowerCase()} cost in Mumbai and Goa?`,
      a: `${intent.priceHook || 'Pricing depends on the shoot scope, crew, hours, locations and delivery requirements'}. Share the date, city and brief for a clear quote before booking.`,
    },
    {
      q: `Do you cover both Mumbai and Goa for ${service.t.toLowerCase()}?`,
      a: `Yes. PK Photography serves Mumbai, North Goa and South Goa, including Bandra, Juhu, South Mumbai, Fontainhas, Vagator, Palolem, Agonda and Chapora, with destination work quoted transparently.`,
    },
    {
      q: `Can I see related ${serviceTitle.toLowerCase()} work before booking?`,
      a: `Yes. Use the gallery and service portfolio sections to review real frames, then move to pricing or booking when you are ready to reserve a date.`,
    },
    {
      q: `How do I book ${serviceTitle.toLowerCase()} online?`,
      a: `Open the booking page, send your preferred date, city, venue or setting, and package interest. The team replies with availability, next steps and a confirmed scope.`,
    },
  ]

  return {
    title,
    description,
    keywords: [primary, secondary, ...LOCAL_KEYWORDS, service.t, BRAND],
    h1,
    h2: `${serviceTitle} across Mumbai, North Goa and South Goa`,
    hero: `${h1} with ${style} storytelling across Bandra, Juhu, South Mumbai, Fontainhas, Vagator, Palolem, Agonda and Chapora.`,
    intro: body.join(' '),
    body,
    faqs,
    serviceTitle,
  }
}

export const SERVICE_SEO = Object.fromEntries(
  SERVICES.map((service) => [service.slug, makeServiceSeo(service)])
)

export const PAGE_SEO = {
  services: {
    title: 'Photography Services in Mumbai & Goa | PK Photography',
    description:
      'Explore premium photography and videography services in Mumbai and Goa, from weddings and pre-weddings to portraits, brands and events.',
    keywords: ['photography services Mumbai', 'photography services Goa', ...LOCAL_KEYWORDS],
  },
  gallery: {
    title: 'Photography Portfolio, Headshots, Weddings & Events | Mumbai & Goa',
    description:
      'Explore PK Photography galleries across portfolio shoots, headshots, weddings and events in Mumbai and Goa, captured with clean, professional style.',
    keywords: [
      'photography portfolio Mumbai',
      'photography portfolio Goa',
      'headshot photographer Mumbai',
      'wedding photography gallery Mumbai',
      'event photography gallery Goa',
      'portfolio photographer Mumbai',
      BRAND,
    ],
  },
  pricing: {
    title: 'Wedding Photography Packages & Prices in Mumbai & Goa',
    description:
      'Transparent wedding, pre-wedding, portrait and event photography packages for Mumbai and Goa with clear inclusions and quick booking.',
    keywords: [
      'wedding photography packages Mumbai',
      'wedding photography prices Goa',
      'pre-wedding shoot price in Goa',
      'affordable wedding photographer Mumbai',
      BRAND,
    ],
  },
  booking: {
    title: 'Book a Wedding Photographer in Mumbai & Goa | PK Photography',
    description:
      'Check availability and book a candid, cinematic wedding photographer for Mumbai, Goa and destination celebrations. Fast enquiry response.',
    keywords: [
      'book wedding photographer online',
      'book wedding photographer Mumbai',
      'book destination wedding photographer Goa',
      BRAND,
    ],
  },
  wedding: {
    title: 'Wedding Photographer in Mumbai & Goa | PK Photography',
    description:
      'Candid and cinematic wedding photography across Mumbai and Goa with packages, albums, drone films and destination coverage. Book today.',
    keywords: [
      'wedding photographer in Mumbai',
      'destination wedding photographer in Goa',
      'candid wedding photographer Mumbai',
      'cinematic wedding photography Mumbai',
      'luxury destination wedding photographer Goa',
      BRAND,
    ],
  },
}

export function buildMetadata(pathname, seo) {
  const url = `${SITE}${pathname}`
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ? seo.keywords.join(', ') : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: BRAND,
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${BRAND} — Mumbai and Goa photography`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: { index: true, follow: true },
  }
}

export function localBusinessJsonLd(pathname = '/') {
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE}/#localbusiness`,
    name: BRAND,
    founder: SITE_DETAILS.founder,
    image: DEFAULT_OG_IMAGE,
    url: `${SITE}${pathname}`,
    telephone: SITE_DETAILS.phone,
    email: SITE_DETAILS.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_DETAILS.streetAddress,
      addressLocality: SITE_DETAILS.locality,
      addressRegion: SITE_DETAILS.region,
      postalCode: SITE_DETAILS.postalCode,
      addressCountry: SITE_DETAILS.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'AdministrativeArea', name: 'Goa' },
      { '@type': 'Place', name: 'North Goa' },
      { '@type': 'Place', name: 'South Goa' },
      { '@type': 'Place', name: 'Bandra' },
      { '@type': 'Place', name: 'Juhu' },
      { '@type': 'Place', name: 'South Mumbai' },
      { '@type': 'Place', name: 'Fontainhas' },
      { '@type': 'Place', name: 'Vagator' },
      { '@type': 'Place', name: 'Palolem' },
      { '@type': 'Place', name: 'Agonda' },
      { '@type': 'Place', name: 'Chapora' },
    ],
  }
}

export function serviceJsonLd(pathname, seo, name) {
  return {
    '@type': 'Service',
    '@id': `${SITE}${pathname}#service`,
    name: name || seo.h1 || seo.title,
    serviceType: name || seo.serviceTitle || 'Photography service',
    description: seo.description,
    url: `${SITE}${pathname}`,
    provider: { '@id': `${SITE}/#localbusiness` },
    areaServed: localBusinessJsonLd(pathname).areaServed,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      url: `${SITE}/booking`,
    },
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  }
}

export function faqJsonLd(faqs = []) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

export function pageJsonLd(pathname, seo, options = {}) {
  const graph = [
    localBusinessJsonLd(pathname),
    serviceJsonLd(pathname, seo, options.serviceName),
    breadcrumbJsonLd(options.breadcrumbs || [
      { name: 'Home', path: '/' },
      { name: options.name || seo.h1 || seo.title, path: pathname },
    ]),
  ]

  if (options.faqs?.length) graph.push(faqJsonLd(options.faqs))

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function imageAlt(subject, setting, style = 'candid editorial', location = 'Mumbai and Goa') {
  return `${subject} at ${setting} in ${style} style, ${location}`
}