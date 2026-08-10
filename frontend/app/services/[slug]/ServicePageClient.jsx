'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ArrowLeft, Check, Award, Zap, Users, Star, MessageCircle, Play, Camera, Video, Sparkles, Calendar, Clock, ChevronDown, X } from 'lucide-react'
import { CONTACT } from '@/components/site/Chrome'
import { ReadingProgress } from '@/components/services/ServiceExtras'
import HeroMedia from '@/components/media/HeroMedia'
import { SERVICES } from '@/lib/services'
import { SERVICE_SEO, imageAlt } from '@/lib/seo'

/* ---------- Mixkit backing videos per service category ---------- */
const V = {
  wedding: 'https://assets.mixkit.co/videos/42933/42933-720.mp4',
  event: 'https://assets.mixkit.co/videos/4111/4111-720.mp4',
  portrait: 'https://assets.mixkit.co/videos/4067/4067-720.mp4',
  editorial: 'https://assets.mixkit.co/videos/5060/5060-720.mp4',
  fashion: 'https://assets.mixkit.co/videos/34486/34486-720.mp4',
  general: 'https://assets.mixkit.co/videos/26014/26014-720.mp4',
}

const CLD = 'https://res.cloudinary.com/ddamvvrby/image/upload'

/* ---------- Rich content per service ---------- */
const SERVICE_EXTRA = {
  'weddings': {
    video: V.wedding,
    hero: 'Documenting your once-in-a-lifetime love story with timeless wedding photography and cinematic videography in Mumbai.',
    about: 'Your wedding day is a symphony of emotions, traditions and unforgettable moments. As one of Mumbai\'s premier wedding teams, we blend photojournalistic candids with cinematic portraits — capturing everything from the grandest ceremonies to the quietest, most intimate glances. Experienced with Hindu, Christian, Marathi, Gujarati and South Indian weddings, every tradition is honoured.',
    covers: [
      { t: 'Pre-Wedding Functions', l: ['Roka & Engagement', 'Pre-Wedding Shoot', 'Haldi & Mehendi', 'Sangeet Night'] },
      { t: 'Wedding Day Coverage', l: ['Bride & Groom Portraits', 'Getting Ready', 'Baraat & Grand Entry', 'Sacred Vows & Rituals'] },
      { t: 'Family & Emotional Moments', l: ['Candid Family Moments', 'Group Photographs', 'Guest Interactions', 'Heartfelt Goodbyes'] },
      { t: 'Post-Wedding Celebrations', l: ['Gala Reception', 'Post-Wedding Shoot', 'Bidai (Farewell)', 'Anniversary Shoots'] },
      { t: 'Creative Add-Ons', l: ['Highlight Film', 'Drone Videography', 'Behind-the-Scenes', 'Instagram Reels'] },
      { t: 'Post Deliveries', l: ['Custom Photo Albums', 'Mini Albums for Parents', 'Online Gallery & Print Store', 'Personalized Slideshows'] },
    ],
    audience: ['Cultural Ceremonies', 'Destination Weddings', 'Engaged Couples', 'Event Planners'],
    why: ['Experienced with multi-day, diverse cultural weddings', 'High-end cinematic results using top-of-the-line equipment', 'Dedicated two-person team ensures no moment is missed', 'Friendly and unobtrusive, letting you enjoy your day'],
    pricing: [
      { name: 'Intimate Affair', price: '₹75,000', original: '₹95,000', f: ['6 Hours Coverage (Single Day)', '1 Photographer, 1 Videographer', '500+ Edited Photos', 'All Raw / Unedited Photos & Footage', '3-5 Minute Highlight Film'] },
      { name: 'Grand Celebration', price: '₹1,50,000', original: '₹1,90,000', popular: true, f: ['2-Day Coverage (Sangeet + Wedding)', '2 Photographers, 2 Videographers', 'All Edited Photographs', 'All Raw / Unedited Media', '10-15 Minute Feature Film + Teaser'] },
      { name: 'The Royal Wedding', price: '₹2,50,000', original: '₹3,25,000', f: ['Up to 3 Days Coverage', 'Full Photo & Video Team + Drone', 'All Edited Photographs', 'All Raw / Unedited Media', '20-25 Minute Cinematic Film + Reels', 'Luxury Wedding Album Included'] },
    ],
    portfolio: [
      `${CLD}/v1764433882/carousel-images/x8dfyruht0f52mzy8z9j.jpg`,
      `${CLD}/v1764433947/carousel-images/fgbuoicipe3uxxx6bjmp.jpg`,
      `${CLD}/v1764433993/carousel-images/bsdbxtu9tbgxsppl2mug.jpg`,
      `${CLD}/v1764434019/carousel-images/kzw0scmrr3tidz4viw79.jpg`,
      `${CLD}/v1764434035/carousel-images/dl8tpfoygwvsg9hwlcbr.jpg`,
      `${CLD}/v1764434059/carousel-images/chjn5dwyaioqwtiznous.jpg`,
      `${CLD}/v1764434086/carousel-images/hqaoj7xtlallr22dhx44.jpg`,
      `${CLD}/v1764434110/carousel-images/gfvzdsk4r3npfm9kiqsl.jpg`,
    ],
    faqs: [
      { q: 'How far in advance should we book?', a: 'For weddings, we recommend booking 3–6 months in advance to lock our team and equipment for your date. Short-notice weddings are welcome if we have availability.' },
      { q: 'What is your photography style?', a: 'A blend of photojournalistic candids and directed cinematic portraits. We capture what happens, and we craft what deserves to be composed.' },
      { q: 'Are you experienced with different cultural weddings?', a: 'Yes — we have shot Marathi, Gujarati, South Indian, North Indian, Christian and inter-faith weddings across India.' },
      { q: 'When will I get my photos and film?', a: 'Highlight teaser within 48 hours. Edited photos in 3–4 weeks. Full feature film in 6–8 weeks.' },
      { q: 'Do you travel for destination weddings?', a: 'Yes. Travel & stay is billed at actuals; we quote a flat destination charge for weddings outside Mumbai.' },
    ],
  },
  'events': {
    video: V.event,
    hero: 'Professional coverage for corporate functions, product launches, award nights, parties and social gatherings across Mumbai.',
    about: 'Events are our signature discipline. From product launches and conferences to birthdays, anniversaries and cultural galas, our team documents every award, every laugh and every hand-shake — and delivers a highlight teaser within 48 hours so your marketing team can post while the excitement is still fresh.',
    covers: [
      { t: 'Corporate Events', l: ['Product Launches', 'Conferences & Summits', 'Award Nights', 'AGMs & Town Halls'] },
      { t: 'Social & Private', l: ['Birthdays & Anniversaries', 'House Parties', 'Family Reunions', 'Bachelor & Bachelorette'] },
      { t: 'Cultural & Community', l: ['Festivals & Concerts', 'Religious Gatherings', 'Sports Meets', 'Community Galas'] },
      { t: 'Add-Ons', l: ['Live Streaming', 'Multi-Camera Video', 'Same-Day Edits', 'Photo-Booth Setup'] },
    ],
    audience: ['Brands & Startups', 'PR Agencies', 'Event Planners', 'Individuals & Families'],
    why: ['Same-day teaser delivery for marketing teams', 'Two-camera photo + multi-cam video coverage', 'Discreet team that blends into your event', 'Detailed shot list agreed upfront'],
    pricing: [
      { name: 'Half-Day', price: '₹25,000', f: ['Up to 4 Hours Coverage', '1 Photographer', '150+ Edited Photos', 'All Raw Photos via Drive', 'Same-Day Sneak Peek'] },
      { name: 'Full-Day', price: '₹45,000', popular: true, f: ['Up to 8 Hours Coverage', '1 Photographer + 1 Videographer', '300+ Edited Photos', '2-3 Minute Highlight Reel', 'All Raw Media'] },
      { name: 'Multi-Day', price: 'On Request', f: ['2+ Days Coverage', 'Full Team + Drone if needed', 'All Edited Photos + Feature Video', 'Live Streaming Optional', 'Priority Turnaround'] },
    ],
    faqs: [
      { q: 'How soon do you deliver event photos?', a: 'Sneak-peek within 24 hours, full edited set in 5–7 working days.' },
      { q: 'Can you do live streaming?', a: 'Yes — we bundle multi-camera live streaming to YouTube, Zoom or a private platform as an add-on.' },
      { q: 'Do you cover destination or outdoor events?', a: 'Yes, with travel & stay billed at actuals.' },
    ],
  },
  'portraits-headshots': {
    video: V.portrait,
    hero: 'Personalised portrait & headshot sessions at our Andheri West studio — for professionals, actors, artists and anyone who wants a photo they actually love.',
    about: 'A great headshot opens doors. Our studio sessions are relaxed, guided and honest — we direct posture, expression and lighting so every frame feels like the best version of you. Whether you need a LinkedIn photo, an actor portfolio, or a considered editorial portrait, you leave with images you actually want to use.',
    covers: [
      { t: 'Corporate Headshots', l: ['LinkedIn Profile', 'Company Website', 'Speaker Bio', 'Team Group Shots'] },
      { t: 'Actor Portfolio', l: ['Casting Look Book', 'Character Portraits', 'Full-Length Shots', 'Expression Reels'] },
      { t: 'Personal Portraits', l: ['Editorial Portraits', 'Milestone Shoots', 'Author / Artist Bios', 'Anniversary / Family'] },
      { t: 'Included', l: ['Studio & Lighting', 'Multiple Backdrops', 'Basic Retouching', 'Digital Delivery'] },
    ],
    audience: ['Professionals', 'Actors & Models', 'Founders & Speakers', 'Artists & Authors'],
    why: ['In-studio lighting for a consistent, flattering look', 'Direction on posture, expression and wardrobe', 'Same-week delivery of retouched selects', 'Comfortable, unhurried session pace'],
    pricing: [
      { name: 'Solo Headshot', price: '₹5,000', f: ['1 Hour Studio Time', '1 Backdrop, 2 Looks', '5 Retouched Photos', 'All Raw Images'] },
      { name: 'Portfolio Session', price: '₹15,000', popular: true, f: ['3-4 Hour Session', '3 Different Looks', 'Hair & Makeup Included', '15 Retouched Photos', 'All Raw Images'] },
      { name: 'Full Portfolio', price: '₹20,000', f: ['5-6 Hour Session', '5 Different Looks', 'Hair & Makeup Included', '20 Retouched Photos', 'All Raw Images'] },
    ],
    faqs: [
      { q: 'How long is a typical session?', a: '1 hour for a solo headshot, 3–6 hours for a full portfolio depending on the number of looks.' },
      { q: 'Do you provide hair & makeup?', a: 'Yes — bundled into our Portfolio and Full Portfolio packages. Optional add-on for solo headshots.' },
      { q: 'When will I get my photos?', a: 'Selects within 48 hours, retouched images within 5–7 working days.' },
    ],
  },
  'editorial-portfolio': {
    video: V.editorial,
    hero: 'Story-driven editorial visuals for publications and stunning portfolios that showcase your talent as an artist.',
    about: 'Editorial photography that could sit on the cover of any Indian fashion or lifestyle magazine. Our team plans concept, location, styling direction and hair & makeup — then delivers a fully-retouched portfolio ready for casting agents, publications or personal branding.',
    covers: [
      { t: 'Concept & Direction', l: ['Mood Board Creation', 'Location Scouting', 'Wardrobe Direction', 'Hair & Makeup Brief'] },
      { t: 'On-Shoot', l: ['Studio + Location Options', 'Multiple Looks & Setups', 'Behind-the-Scenes Footage', 'Client Playback on Set'] },
      { t: 'Post-Production', l: ['Editorial Colour Grading', 'Skin & Detail Retouching', 'Print-Ready Deliverables', 'Portfolio-Grade Files'] },
      { t: 'Deliverables', l: ['20-30 Retouched Images', 'All Raw / RAW files', 'BTS Reel', 'Portfolio PDF'] },
    ],
    audience: ['Aspiring Models', 'Fashion Magazines', 'Personal Brands', 'Creative Agencies'],
    why: ['Full pre-production planning — no shoot-day surprises', 'On-set art direction, not just clicking', 'Editorial-grade retouching in-house', 'Content ready for print, web and social'],
    pricing: [
      { name: 'Portfolio Starter', price: '₹25,000', f: ['4-Hour Session', '2 Looks + Basic Direction', '10 Retouched Images', 'All Raw Files'] },
      { name: 'Editorial Story', price: '₹55,000', popular: true, f: ['Full-Day Production', '3-4 Looks + Concept Direction', 'Hair & Makeup Included', '20 Retouched Images', 'BTS Reel + Portfolio PDF'] },
      { name: 'Publication-Ready', price: 'On Request', f: ['Multi-Day Production', 'Location Scout + Wardrobe', 'Full Creative Team', '30+ Retouched Images', 'Print-Ready Deliverables'] },
    ],
    faqs: [
      { q: 'Do you help with concept & styling?', a: 'Yes — our art-direction team plans mood board, wardrobe direction, and location scout as part of Editorial Story and above.' },
      { q: 'Can we shoot on location?', a: 'Absolutely. We\'ve shot editorials at heritage properties, cafes, rooftops and rural locations. Location logistics billed at actuals.' },
    ],
  },
  'boudoir-shoots': {
    video: null,
    about: 'A boudoir session with us is private, unhurried and completely on your terms. We shoot in a closed studio with only essential crew, a female makeup artist and stylist available on request, and gentle, guided posing — no experience needed, no forced poses, ever. Every image stays confidential: you approve everything, and nothing is shared or published without your written consent.',
    covers: [
      { t: 'Session Styles', l: ['Bridal boudoir (pre-wedding gift)', 'Milestone & self-celebration shoots', 'Maternity boudoir', 'Couples sessions'] },
      { t: 'Comfort & Privacy', l: ['Closed private studio, essential crew only', 'Female MUA & stylist on request', 'Guided posing — no experience needed', 'Bring a friend along if you wish'] },
      { t: 'Styling & Preparation', l: ['Pre-shoot wardrobe consultation', 'Hair & makeup included in packages', 'Mood board agreed before the day', 'Multiple outfit changes & sets'] },
      { t: 'Confidential Delivery', l: ['Private, password-protected gallery', 'Fine-art retouching you approve', 'Optional printed keepsake box', 'Never used in our portfolio without consent'] },
    ],
    audience: ['Brides-to-be', 'Personal Milestones', 'Anniversary Gifts', 'Maternity'],
    process: [
      ['Consultation', 'A private call to plan looks, sets and comfort levels — everything is agreed before the day.'],
      ['Prep & Styling', 'Wardrobe finalised, then hair and makeup done in-studio so you walk in ready.'],
      ['Guided Session', 'Unhurried shooting with step-by-step posing. We only shoot what you are comfortable with.'],
      ['Private Reveal', 'You select your favourites, we retouch them, and everything is delivered confidentially.'],
    ],
    portfolio: [
      `${CLD}/v1771154718/carousel-images/toypkr9r3zwbkw2p5w9c.jpg`,
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
      `${CLD}/v1771154718/carousel-images/toypkr9r3zwbkw2p5w9c.jpg`,
    ],
    why: [
      'Privacy-first: closed studio, minimal crew, confidential files',
      'Female makeup artist and stylist available on request',
      'Gentle direction and guided posing for first-timers',
      'You approve every image — nothing published without written consent',
    ],
    pricing: [
      { name: 'Essential', price: '₹18,000', original: '₹24,000', f: ['2-hour private studio session', '2 looks / outfit changes', 'Hair & makeup included', '15 fine-art retouched images', 'Private online gallery'] },
      { name: 'Signature', price: '₹32,000', original: '₹40,000', popular: true, f: ['3-hour session, 3–4 looks', 'Wardrobe & styling consultation', 'Hair & makeup artist on set', '30 fine-art retouched images', 'Keepsake print box option'] },
      { name: 'Luxe', price: '₹55,000', original: '₹70,000', f: ['Half-day session, unlimited looks', 'Styled sets & premium lighting', 'MUA + stylist throughout', '50+ retouched images', 'Luxury printed album included'] },
    ],
    faqs: [
      { q: 'Is the session completely private?', a: 'Yes. We shoot in a closed studio with only essential crew present, and a female makeup artist and stylist are available on request. You can also bring a friend or partner along for comfort.' },
      { q: 'I have never modelled — will you guide me?', a: 'Absolutely. Most of our clients are first-timers. We guide every pose step by step, keep the session unhurried, and only shoot what you are comfortable with.' },
      { q: 'Who sees my photos?', a: 'Only you and the retoucher working on your selects. Files are stored securely, delivered through a private password-protected gallery, and never used in our portfolio or marketing without your written consent.' },
      { q: 'What should I wear?', a: 'Whatever makes you feel confident — from elegant outfits and sarees to lingerie or a simple shirt. We do a wardrobe consultation before the shoot and plan looks together.' },
      { q: 'How much retouching is done?', a: 'Fine-art retouching that keeps you looking like yourself — skin is refined, not reshaped. You review the selects and approve the final edit.' },
    ],
  },
  'real-estate-architectural': {
    video: null,
    about: 'We photograph spaces the way buyers and guests want to see them — bright HDR interiors, styled compositions, twilight exteriors and drone aerials that show the location, not just the building. Developers, brokers, hotels and architects use our images for listings, brochures, booking platforms and award submissions, with portal-ready files delivered in 48 hours for time-sensitive listings.',
    covers: [
      { t: 'Residential Listings', l: ['HDR interior photography', 'Twilight exterior shots', 'Detail & lifestyle vignettes', 'Portal-ready listing sets'] },
      { t: 'Commercial & Hospitality', l: ['Hotels, resorts & villas', 'Offices, retail & showrooms', 'Restaurants & cafés', 'Architectural detail studies'] },
      { t: 'Aerial & Video', l: ['Drone exteriors & location context', 'Cinematic walkthrough films', 'Vertical reels for listings', 'Site-progress documentation'] },
      { t: 'Delivery & Usage', l: ['MLS / portal-ready image sizes', 'Web + print resolutions', '48-hour listing turnaround', 'Commercial usage rights included'] },
    ],
    audience: ['Real Estate Agents', 'Developers & Builders', 'Hotels & Resorts', 'Architects & Interior Designers'],
    process: [
      ['Scope & Schedule', 'Property size, shot list and the best light windows planned — including drone clearances.'],
      ['Prep & Styling', 'Light staging on the day: decluttered surfaces, straightened furniture, styled vignettes.'],
      ['The Shoot', 'HDR interiors, exteriors, detail vignettes, then twilight and drone aerials as booked.'],
      ['48-Hour Delivery', 'Portal-ready, web and print files delivered in an organised gallery within 48 hours.'],
    ],
    portfolio: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
      `${CLD}/v1771155516/carousel-images/j1zlqu9rbmeuydhtuzno.jpg`,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85',
    ],
    why: [
      'HDR interiors and true-to-eye colour that make spaces feel bright, not fake',
      'Twilight exteriors and drone aerials that lift a listing above the competition',
      '48-hour portal-ready delivery for time-sensitive listings',
      'Compliant, insured drone operation planned around location rules',
    ],
    pricing: [
      { name: 'Listing Essentials', price: '₹12,000', original: '₹15,000', f: ['Homes up to 2–3 BHK', '20–25 HDR edited photos', 'Portal & web-ready sizes', '48-hour delivery'] },
      { name: 'Premium Property', price: '₹25,000', original: '₹32,000', popular: true, f: ['Villas, showflats & commercial spaces', '35–45 HDR edited photos', 'Twilight exterior set', 'Drone aerials included', 'Print + web resolutions'] },
      { name: 'Showcase Film', price: '₹50,000', original: '₹65,000', f: ['Full photo set + cinematic walkthrough', '60–90 second listing film + reels', 'Drone photo + video coverage', 'Agent intro shots optional', 'Priority turnaround'] },
    ],
    faqs: [
      { q: 'How quickly can you deliver for a live listing?', a: 'Standard delivery is 48 hours from the shoot. Same-day rush delivery for selected images can be arranged when booked in advance.' },
      { q: 'Do you shoot drone aerials legally?', a: 'Yes. We plan every flight around current drone regulations and location permissions — including society, municipal and airport-zone clearances where required.' },
      { q: 'What are twilight shots and are they worth it?', a: 'Twilight exteriors are shot at dusk with interior lights glowing — they consistently get more clicks on listings and are included in our Premium and Showcase packages.' },
      { q: 'Do you help style or stage the space?', a: 'We do light styling on the day — straightening furniture, decluttering surfaces and setting key vignettes. Full staging can be arranged through partner services.' },
      { q: 'Is pricing per property or per hour?', a: 'Per property, based on size and scope, so you know the exact cost upfront. Multi-property and retainer pricing is available for developers and brokerages.' },
      { q: 'What file formats do we receive?', a: 'High-resolution JPEGs sized for MLS portals, websites and print, delivered through an organised online gallery with commercial usage rights included.' },
    ],
  },
  'family-kids': {
    about: 'Family photography should feel like a good afternoon, not an appointment. We photograph newborns with safe, parent-assisted posing, chase toddlers through parks at their own pace, and gather three generations into frames that feel like your family actually is — at home, in our studio, or outdoors at the beach. The result is a warm, natural record of a stage that passes faster than anyone admits.',
    audience: ['New Parents & Newborns', 'Maternity', 'Birthdays & Milestones', 'Multi-Generation Families'],
    covers: [
      { t: 'Newborn & Maternity', l: ['At-home newborn sessions (5–14 days)', 'Safe, gentle, unforced posing only', 'Maternity portraits at home or outdoors', 'Parent & sibling frames'] },
      { t: 'Kids & Milestones', l: ['Birthday shoots & cake smash', 'Annaprashan & naming ceremonies', 'First steps & first-year milestones', 'School-age personality portraits'] },
      { t: 'Family Portraits', l: ['Relaxed at-home lifestyle sessions', 'Outdoor park & beach shoots', 'Grandparents & extended family', 'Annual family portrait tradition'] },
      { t: 'Keepsakes & Delivery', l: ['Edited private online gallery', 'Framed prints & canvases', 'Baby milestone albums', 'Gift prints for grandparents'] },
    ],
    why: [
      'Newborn-safe handling — gentle posing with a parent always beside the baby',
      'Sessions paced around naps, feeds and moods — never rushed',
      'Home, studio or outdoor formats to suit each age group',
      'Prints, frames and albums your family will actually hold, not just files',
    ],
    process: [
      ['Plan the Session', 'We match the format to your child\'s age — home, studio or outdoors — and time it around naps and feeds.'],
      ['Relaxed Shoot Day', 'Play, games and gentle direction. Real laughs over stiff poses, with breaks whenever the kids need them.'],
      ['Warm Editing', 'Handpicked frames with natural, warm retouching that keeps skin tones and expressions true.'],
      ['Gallery & Keepsakes', 'Private gallery delivered, with prints, frames and milestone albums available to order.'],
    ],
  },
  'fashion-shoots': {
    about: 'Fashion photography is a production discipline: looks planned before lights, styling and MUA coordinated on set, and fabrics rendered colour-true from camera to final retouch. We shoot lookbooks that keep e-commerce grids consistent, campaigns with a clear concept, and editorials strong enough for magazine submissions — in studio, on Mumbai streets, or across Goa resorts for resortwear collections.',
    audience: ['Clothing Labels & D2C Brands', 'Fashion Designers', 'Models & Portfolios', 'Stylists & Agencies'],
    covers: [
      { t: 'Lookbooks & Catalogues', l: ['Per-look styled coverage', 'On-model and flat-lay options', 'Consistent framing for e-commerce', 'Seasonal collection shoots'] },
      { t: 'Campaigns & Editorials', l: ['Concept & mood board development', 'Studio or location production', 'Editorial storytelling', 'Magazine submission-ready sets'] },
      { t: 'On-Set Team', l: ['Stylist & MUA coordination', 'Model casting support', 'Art direction on set', 'Client monitor & live approvals'] },
      { t: 'Post & Usage', l: ['High-end retouching per look', 'Colour-accurate fabric rendering', 'Web + print master files', 'Clear usage rights in writing'] },
    ],
    why: [
      'Look-list planning so full collections shoot efficiently in a day',
      'Colour-accurate retouching that keeps fabrics and skin tones true',
      'Stylist, MUA and casting coordinated for you — one production, one invoice',
      'An editorial eye sharpened on Mumbai fashion weeks and designer lookbooks',
    ],
    process: [
      ['Concept & Look Plan', 'Mood board, look list and usage needs agreed — lookbook, campaign or editorial.'],
      ['Pre-Production', 'Casting, styling, MUA and set or location locked before the shoot day.'],
      ['Shoot Per Look', 'Efficient look-by-look coverage with art direction and live client approvals on set.'],
      ['Retouch & Delivery', 'Per-look high-end retouching, colour-true files delivered for web and print.'],
    ],
  },
  'brand-content': {
    about: 'Brands don\'t need one great photo — they need a steady stream of good ones. Our content days turn a single planned shoot into a month of posts: product and lifestyle stills, founder videos, vertical reels edited hook-first, and ad creatives, all graded to one consistent brand look. Shot lists come from your content calendar, so nothing is shot that can\'t be used.',
    audience: ['D2C & Startup Brands', 'Restaurants & Retail', 'Founders & Personal Brands', 'Marketing & Social Teams'],
    covers: [
      { t: 'Content Days', l: ['Monthly or quarterly shoot days', 'Photo + reels in one session', 'Shot lists from your content calendar', 'Batch efficiency — a month of posts per day'] },
      { t: 'Short-Form Video', l: ['Vertical reels & stories', 'Product demos & behind-the-scenes', 'Founder-led talking videos', 'Hook-first edits built for reach'] },
      { t: 'Brand Photography', l: ['Product & lifestyle imagery', 'Team & workspace coverage', 'Website hero banners', 'Ad-ready creatives'] },
      { t: 'Delivery & Usage', l: ['Reel-ready vertical cuts', 'Organised content library', 'Social, web & ad usage included', 'Fast monthly turnaround'] },
    ],
    why: [
      'One shoot day turns into a month of posts, reels and ads',
      'Reels edited hook-first — built for watch time, not just polish',
      'A consistent brand look across every photo and video we deliver',
      'Retainer pricing that costs less than booking one-off shoots',
    ],
    process: [
      ['Content Calendar', 'We map your month — launches, offers, themes — into a single efficient shot list.'],
      ['Batched Shoot Day', 'Photos and vertical video captured together across products, people and spaces.'],
      ['Edit & Cutdowns', 'Reels, crops and colour-graded stills prepared for every placement you use.'],
      ['Content Library', 'Everything delivered organised by campaign, ready to schedule and post.'],
    ],
  },
  'product-ecommerce': {
    about: 'Product photography is measured in conversions, not compliments. We shoot white-background catalogue images that pass Amazon and Flipkart checks first time, lifestyle scenes that give D2C pages depth, and colour-true detail work for jewellery and apparel — batched by SKU under consistent studio lighting, then delivered named, sized and ready to upload without rework.',
    audience: ['Amazon & Flipkart Sellers', 'D2C Websites', 'Jewellery & Apparel Brands', 'Catalogues & Agencies'],
    covers: [
      { t: 'Catalogue Shots', l: ['White-background per-SKU images', 'Marketplace-spec dimensions', 'Consistent angles per category', 'Ghost mannequin for apparel'] },
      { t: 'Lifestyle & Creative', l: ['Styled lifestyle scenes', 'On-model usage shots', 'Ingredient & texture macros', 'Banner and ad creatives'] },
      { t: 'Studio Standards', l: ['Colour-accurate lighting', '360° spins on request', 'Scale & detail shots', 'Batch SKU efficiency'] },
      { t: 'Delivery', l: ['Amazon/Flipkart-compliant files', 'Web-optimised + print masters', 'Files named by SKU code', '3–5 day standard turnaround'] },
    ],
    why: [
      'Marketplace-compliant images that pass Amazon and Flipkart checks first time',
      'Per-SKU pricing that drops as your batch size grows',
      'Colour-true rendering so products match what buyers receive',
      'Files named, sized and organised — ready to upload without rework',
    ],
    process: [
      ['SKU List & Specs', 'Share your product list and target marketplaces; we lock angles, counts and specs.'],
      ['Batch Studio Shoot', 'Products shot category by category under consistent, colour-accurate lighting.'],
      ['Retouch & Cleanup', 'Background removal, dust cleanup and colour matching on every frame.'],
      ['Upload-Ready Files', 'Delivered named by SKU in marketplace, web and print sizes.'],
    ],
  },
  'food-photography': {
    about: 'Food has about four good minutes in front of a camera — so we build the studio inside your kitchen and shoot dish by dish while everything is fresh. Menus get consistent plating angles across forty dishes, delivery apps get crops that convert on Zomato and Swiggy, and your social pages get steam, pours and hero shots that make people order. Styling, props and surfaces come with us.',
    audience: ['Restaurants & Cafés', 'Cloud Kitchens', 'Hotels & Resorts', 'FMCG & Packaged Foods'],
    covers: [
      { t: 'Menu & Delivery Apps', l: ['Per-dish menu coverage', 'Zomato & Swiggy-ready crops', 'Consistent plating angles', 'Combo, platter & thali spreads'] },
      { t: 'Social & Campaigns', l: ['Styled hero shots', 'Pour, steam & action shots', 'Seasonal campaign creatives', 'Reels of dishes being made'] },
      { t: 'On-Site Shooting', l: ['Studio-style setup in your kitchen', 'Natural + styled lighting', 'Chef & team portraits', 'Ambience & interior frames'] },
      { t: 'Styling & Delivery', l: ['Food styling guidance included', 'Props & surfaces brought along', 'Web + print resolution files', 'Menu-design-ready images'] },
    ],
    why: [
      'Dishes shot within minutes of plating — food looks fresh, never tired',
      'Delivery-app-ready crops that measurably lift order conversions',
      'We bring the studio to your kitchen — no closing for the day',
      'Styling, props and surfaces included, not billed as surprises',
    ],
    process: [
      ['Menu Planning', 'Dish list, hero items and app requirements agreed with your chef or team.'],
      ['On-Site Setup', 'Lighting and styling station set up in your kitchen or a corner of the floor.'],
      ['Dish-by-Dish Shoot', 'Each dish styled and shot fresh, in a rhythm your kitchen can keep up with.'],
      ['Menu-Ready Files', 'Edited images cropped for delivery apps, menus, social and print.'],
    ],
  },
  'corporate-industrial': {
    about: 'Corporate photography is a logistics job as much as a creative one: 500 headshots in one consistent style, factory floors shot around live shifts with a safety-inducted crew, and annual-report imagery that makes an industrial plant look like the serious operation it is. We deliver files organised by department with usage rights documented — so comms teams publish the day after the shoot.',
    audience: ['Corporates & Offices', 'Manufacturing Plants', 'Annual Reports & Comms', 'HR & Employer Branding'],
    covers: [
      { t: 'People', l: ['Executive & board portraits', 'Team headshots at scale', 'LinkedIn-consistent style', 'Candid culture & work moments'] },
      { t: 'Facilities', l: ['Office & campus coverage', 'Plant & production lines', 'Machinery & process detail', 'Safety-compliant shooting'] },
      { t: 'Reports & Comms', l: ['Annual report imagery', 'Website & brochure sets', 'CSR & event documentation', 'Investor deck visuals'] },
      { t: 'Video Options', l: ['Corporate films', 'Facility walkthroughs', 'Leadership interviews', 'Recruitment videos'] },
    ],
    why: [
      'Headshots for 10 or 500 employees with one consistent look',
      'Safety-inducted crew comfortable on factory floors and live production lines',
      'Day-rate and per-location packaging that procurement teams can approve easily',
      'Delivery organised by department so comms teams can use files immediately',
    ],
    process: [
      ['Scope & Access', 'Locations, headcount, safety requirements and shot lists planned with your team.'],
      ['Shoot Days', 'People and facility coverage scheduled around shifts and operations — minimal disruption.'],
      ['Consistent Grading', 'Every portrait and facility frame edited to one clean corporate standard.'],
      ['Organised Handover', 'Files structured by department and use case, with usage rights documented.'],
    ],
  },
  'influencer-celebrity': {
    about: 'Content for public faces runs on two currencies: volume and discretion. We shoot batched content days — multiple outfits, locations and formats in one session — that give creators a month of feed and reels, while NDAs, private sets and small crews keep celebrities and public figures comfortable. Selects land in 24–48 hours for deadline-driven brand collaborations.',
    audience: ['Content Creators', 'Public Figures & Celebrities', 'Talent Agencies', 'Founders & Personal Brands'],
    covers: [
      { t: 'Content Days', l: ['Batch photo + reels per session', 'Multiple outfit & location changes', 'Trend-aligned formats', 'Monthly content retainers'] },
      { t: 'Lifestyle & Editorial', l: ['Magazine-style portraits', 'Street & travel lifestyle', 'Event & appearance coverage', 'Brand-collab deliverables'] },
      { t: 'Discretion & Logistics', l: ['NDA-friendly workflow', 'Private locations scouted', 'Tight, low-crew setups', 'Manager & agency coordination'] },
      { t: 'Delivery', l: ['Selects within 24–48 hours', 'Reel-ready vertical edits', 'Colour-graded social sets', 'Archived library of every session'] },
    ],
    why: [
      'Batch shooting — a month of feed and reel content in one session',
      'Discretion by default: NDAs, private sets and minimal crew',
      'We track platform formats and trends so content lands, not just looks good',
      'Fast selects for time-sensitive brand collaborations',
    ],
    process: [
      ['Plan & Scout', 'Content goals, looks and private locations planned with you or your manager.'],
      ['Batched Shoot', 'Multiple outfits, setups and formats captured efficiently in one session.'],
      ['Fast Selects', 'First selects within 24–48 hours for anything deadline-driven.'],
      ['Full Delivery', 'Colour-graded photo sets and reel-ready edits, archived for reuse.'],
    ],
  },
  'podcast-production': {
    about: 'A podcast that looks like a real show and sounds broadcast-clean keeps listeners past the first minute. We record with 2–4 camera angles, professional microphones and an engineer monitoring audio live, then deliver the full episode for YouTube, audio for Spotify and Apple, and short vertical clips so every episode promotes itself. Studio or your office — set design and branding included.',
    audience: ['Podcast Hosts', 'Businesses & Branded Shows', 'YouTube Creators', 'Coaches & Experts'],
    covers: [
      { t: 'Studio & Setup', l: ['Multi-camera setup (2–4 angles)', 'Broadcast-quality microphones', 'Lit, branded set design', 'Studio or on-location recording'] },
      { t: 'Recording', l: ['Engineer on every session', 'Live audio monitoring', 'Multi-guest & remote guests', 'Teleprompter on request'] },
      { t: 'Post-Production', l: ['Per-episode video + audio edit', 'Colour & sound mastering', 'Intro, outro & name graphics', 'Filler-word & noise cleanup'] },
      { t: 'Distribution Cuts', l: ['Full episode for YouTube', 'Audio for Spotify & Apple', 'Short clips for reels & shorts', 'Thumbnail & title support'] },
    ],
    why: [
      'Multi-camera coverage that cuts like a real show, not a video call',
      'Audio engineered first — podcasts live or die on sound quality',
      'Per-episode pricing or monthly series packages for consistent shows',
      'Social clip cutdowns included so every episode markets itself',
    ],
    process: [
      ['Format & Set Plan', 'Show format, camera angles, set design and branding decided upfront.'],
      ['Record With Engineer', 'Cameras and audio monitored live so retakes happen on the spot, not in regret.'],
      ['Episode Edit', 'Video and audio edited, mastered and cleaned per episode with graphics.'],
      ['Publish-Ready Files', 'YouTube episode, podcast audio and social clips delivered together.'],
    ],
  },
  'editing-retouching': {
    about: 'This is post-production as a standalone service: you bring raw photos or footage from any shoot — yours, another photographer\'s, last year\'s wedding — and we handle culling, colour, retouching or full film edits. Every job starts with a sample edit so you approve the style first, and batches stay colour-consistent whether it\'s fifty portraits or five thousand event frames.',
    audience: ['Photographers & Studios', 'Couples With Raw Footage', 'Brands & Agencies', 'Creators & Vloggers'],
    covers: [
      { t: 'Photo Editing', l: ['Culling & selection from raws', 'Colour correction at volume', 'High-end skin retouching', 'Background cleanup & replacement'] },
      { t: 'Video Editing', l: ['Wedding film edits', 'Reels & short-form cuts', 'Corporate & YouTube edits', 'Colour grading & sound design'] },
      { t: 'Advanced Work', l: ['Composites & manipulation', 'Old photo restoration', 'Album layout design', 'Batch consistency for full events'] },
      { t: 'Turnaround & Revisions', l: ['Basic / standard / advanced tiers', 'Per-image & per-minute pricing', '2 revision rounds included', '3–7 day standard delivery'] },
    ],
    why: [
      'Post-production only — send raw files from any shoot, any photographer',
      'Clear tiers: colour correction, full retouch or advanced compositing',
      'Batch-consistent colour across thousands of event images',
      'Revision rounds built into every job, not billed as extras',
    ],
    process: [
      ['Share Raws & Brief', 'Upload your files with reference images or the look you want to match.'],
      ['Sample Edit', 'We edit a small sample first so you approve the style before the full batch.'],
      ['Full Batch Edit', 'Photos or footage edited to the approved style with consistent colour.'],
      ['Delivery & Revisions', 'Organised delivery with revision rounds included until it feels right.'],
    ],
  },
  'album-design': {
    about: 'An album is the only deliverable your grandchildren will ever hold, so we treat it like an heirloom: photos curated into story order, every spread designed by hand rather than auto-templates, and archival printing on lay-flat pages with covers in leather, linen, velvet or acrylic. You approve a digital preview — with two revision rounds — before anything goes to print.',
    audience: ['Wedding Couples', 'Parents & Anniversaries', 'Baby & Family Albums', 'Corporate Yearbooks'],
    covers: [
      { t: 'Album Types', l: ['Flush-mount wedding albums', 'Compact parent albums', 'Baby milestone books', 'Anniversary & travel albums'] },
      { t: 'Materials & Covers', l: ['Leather, linen & velvet covers', 'Acrylic & photo covers', 'Foil-embossed names & dates', 'Thick lay-flat archival pages'] },
      { t: 'Design', l: ['Story-order photo curation', 'Custom layout for every spread', '2 design revision rounds', 'Digital preview before print'] },
      { t: 'Print & Delivery', l: ['Archival photographic printing', '30 / 40 / 60-page options', 'Sizes from 8x8" to 15x12"', 'Gift boxes & USB sets'] },
    ],
    why: [
      'Every spread designed by hand — no auto-generated templates',
      'Archival printing that holds colour for decades, not years',
      'A material library of covers you can see and touch before choosing',
      'Parent album copies cloned from the main design at a saving',
    ],
    process: [
      ['Select & Sequence', 'We curate your photos into story order — or design around your own selection.'],
      ['Layout Design', 'Every spread composed by hand, then shared as a digital preview.'],
      ['Revisions & Approval', 'Two revision rounds to swap photos and refine layouts before print.'],
      ['Print & Bind', 'Archival printing, handcrafted binding and delivery in a keepsake box.'],
    ],
  },
  'design-services': {
    about: 'The same team that shoots your photos designs everything around them — wedding invitations that match your wedding\'s palette, brand kits and social templates built from your product shoots, and menus, brochures and standees that stay in one visual language. Fixed scopes, two revision rounds, print-ready files, and printer coordination handled in Mumbai.',
    audience: ['Wedding Couples & Families', 'D2C & Startup Brands', 'Restaurants & Retail', 'Agencies & Planners'],
    covers: [
      { t: 'Wedding & Event Design', l: ['Invites — print & e-invites', 'Save-the-dates & itineraries', 'Welcome signage & menus', 'Thank-you cards'] },
      { t: 'Brand Design', l: ['Logos & brand kits', 'Social media templates', 'Packaging & labels', 'Pitch decks'] },
      { t: 'Marketing Collateral', l: ['Brochures & flyers', 'Posters & standees', 'Menu & catalogue design', 'Ad creatives'] },
      { t: 'Delivery', l: ['Print-ready + digital files', 'Editable sources on request', '2 revision rounds included', 'Printer coordination'] },
    ],
    why: [
      'Designed by the same team that shoots your photos — visuals stay consistent',
      'Print-ready files with printer coordination handled for you',
      'Fixed per-package scopes so design costs never surprise you',
      'Fast turnarounds built around wedding and campaign deadlines',
    ],
    process: [
      ['Brief & References', 'Scope, references and brand or wedding theme collected in one short call.'],
      ['Concepts & Draft', 'First design directions shared for you to react to.'],
      ['Revisions', 'Two included rounds to refine copy, colour and layout.'],
      ['Final Files & Print', 'Print-ready and digital files delivered, with printing coordinated if needed.'],
    ],
  },
}

/* Service-specific "About This Service" headline: [lead, accent-in-italic] */
const SERVICE_HEAD = {
  'weddings': ['The whole day,', 'candid to cinematic.'],
  'events': ['Every award, laugh', 'and handshake.'],
  'portraits-headshots': ['The best version', 'of you.'],
  'editorial-portfolio': ['Magazine-cover', 'storytelling.'],
  'live-streaming': ['Live, everywhere,', 'in real time.'],
  'family-kids': ['An afternoon,', 'not an appointment.'],
  'fashion-shoots': ['Concept, styling,', 'colour-true craft.'],
  'boudoir-shoots': ['Private, unhurried,', 'entirely yours.'],
  'brand-content': ['One shoot,', 'a month of posts.'],
  'product-ecommerce': ['Measured in', 'conversions.'],
  'food-photography': ['Shot fresh,', 'plated to sell.'],
  'corporate-industrial': ['Logistics', 'as much as craft.'],
  'real-estate-architectural': ['Spaces, the way', 'buyers dream them.'],
  'influencer-celebrity': ['Volume', 'and discretion.'],
  'podcast-production': ['Looks like a show.', 'Sounds broadcast-clean.'],
  'editing-retouching': ['Your raw files,', 'our finishing touch.'],
  'album-design': ['An heirloom', 'made by hand.'],
  'drone-services': ['Your story,', 'from the sky.'],
  'design-services': ['One team,', 'one visual language.'],
}

/* About copy for services that would otherwise use the generic fallback */
const SERVICE_ABOUT = {
  'live-streaming': "When your guests can't be in the room, we bring the room to them. Our live-streaming crew runs a professional multi-camera feed for weddings, conferences, and cultural or religious events — with a dedicated engineer monitoring the stream throughout, a stable high-quality output to YouTube, Zoom or a private link, and a recorded backup of everything. So family abroad and colleagues in another city never miss a moment, in real time.",
  'drone-services': "Some moments only make sense from a hundred feet up. Our licensed drone pilots add scale and cinematic grandeur to weddings, events, real estate and destination shoots across Mumbai and Goa — aerial establishing shots, sky-view coverage of processions and large group formations, and colour-graded footage that drops straight into your film or marketing decks. Flown safely, and always within local permissions.",
}


/* Generic fallback for services without hyper-specific data */
function fallbackExtra(service) {
  const cat = /video|film|streaming|reel|podcast|drone|edit/i.test(service.t) ? 'video' : 'photo'
  return {
    video: null,
    hero: service.d + ' Delivered end-to-end by PK Photography\'s in-house team.',
    about: `Every ${service.t.toLowerCase()} commission is handled by PK Photography's full team — briefing, planning, shooting and post-production, all under one roof. You get one contact, one invoice, and one consistent visual standard from the first call to final delivery.`,
    covers: [
      { t: 'Planning & Pre-Production', l: ['Discovery call & brief', 'Location / studio decision', 'Shot list / storyboard', 'Wardrobe / prop direction'] },
      { t: 'On the Day', l: ['Full team on set', 'Multi-camera coverage', 'Client playback on request', 'Behind-the-scenes reel'] },
      { t: 'Post-Production', l: ['In-house retouching / editing', 'Cinematic colour grading', 'Music & sound design (video)', 'Multiple deliverable formats'] },
      { t: 'Delivery', l: ['Private online gallery', 'Raw + edited media', 'Social-ready crops', 'Print / broadcast files'] },
    ],
    audience: ['Individuals & Professionals', 'Brands & Startups', 'Agencies', 'Event Planners'],
    why: [
      'Handled personally by our lead team from brief to delivery',
      'Cinematic results using top-of-the-line professional equipment',
      'Consistent turnaround with sneak-peeks in 48 hours',
      'One point of contact, one invoice, one team — end-to-end',
    ],
    pricing: [
      { name: 'Starter', price: 'From ₹15,000', f: ['Half-day session', 'Core team', 'Digital delivery', 'Basic retouching'] },
      { name: 'Signature', price: 'On Request', popular: true, f: ['Full-day production', 'Full creative team', 'Advanced retouching', 'Priority delivery'] },
      { name: 'Bespoke', price: 'On Request', f: ['Multi-day scope', 'Custom deliverables', 'On-location logistics', 'Concierge planning'] },
    ],
    faqs: [
      { q: 'How do I book this service?', a: 'Use the Booking form or WhatsApp us. We reply within a few working hours.' },
      { q: 'What is the turnaround time?', a: '5–7 working days for standard delivery; sneak-peek within 48 hours.' },
      { q: 'Can I get a custom package?', a: 'Absolutely — every commission is scoped to your brief and budget.' },
    ],
  }
}

/* ---------- FAQ item ---------- */
function FAQItem({ q, a, i }) {
  return (
    <details className="group border-b border-[#DBD4C6] py-5">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="text-base md:text-lg font-semibold pr-6">{q}</span>
        <span className="w-8 h-8 rounded-full grid place-content-center bg-[#EEEAE1] border border-[#DBD4C6] group-open:bg-[#FF5B22] group-open:text-white group-open:rotate-45 transition-all shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </span>
      </summary>
      <p className="mt-4 text-[#8A857D] leading-relaxed max-w-3xl">{a}</p>
    </details>
  )
}

export default function ServicePageClient({ slug }) {
  const service = SERVICES.find(s => s.slug === slug)
  const extra = service ? { ...fallbackExtra(service), ...(SERVICE_ABOUT[slug] ? { about: SERVICE_ABOUT[slug] } : {}), ...(SERVICE_EXTRA[slug] || {}) } : {}
  const defaultPortfolio = service ? (extra.portfolio || [service.img, ...SERVICES.filter(s => s.slug !== slug).slice(0, 7).map(s => s.img)]) : []

  // Hooks must be called on every render (before any conditional return) to satisfy Rules of Hooks.
  const [activeCover, setActiveCover] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [portfolio, setPortfolio] = useState(defaultPortfolio)
  const heroRef = useRef(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '20%'])
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.12])

  // Load admin-uploaded gallery images for this service slug. Overrides defaults if any uploads exist.
  useEffect(() => {
    if (!service) return
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
    fetch(`${backend}/api/media?slot=${encodeURIComponent(slug)}-gallery`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const urls = (data?.items || []).filter((i) => i.secure_url).map((i) => i.secure_url)
        if (urls.length) setPortfolio(urls)
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  useEffect(() => {
    const onScroll = () => setShowStickyCTA(window.scrollY > 900)
    onScroll(); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); if (e.key === 'ArrowRight' && lightbox !== null) setLightbox(l => (l + 1) % portfolio.length); if (e.key === 'ArrowLeft' && lightbox !== null) setLightbox(l => (l - 1 + portfolio.length) % portfolio.length) }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, portfolio.length])

  if (!service) return notFound()
  const aboutHead = SERVICE_HEAD[slug] || ['The craft of', `${service.t.toLowerCase()}.`]
  const seo = SERVICE_SEO[slug] || {}
  const visibleFaqs = [
    ...(seo.faqs || []),
    ...(extra.faqs || []).filter((faq) => !(seo.faqs || []).some((s) => s.q === faq.q)),
  ]

  const shortTitle = service.t.replace(/ Photography.*| & Videography/g, '')
  const localAlt = (subject, setting = 'Mumbai and Goa', style = 'premium editorial') =>
    imageAlt(subject, setting, style, 'Mumbai & Goa')

  return (
    <main className="bg-[#EEEAE1]">
      <ReadingProgress />
      {/* ---------- Video Hero with parallax ---------- */}
      <section ref={heroRef} className="relative min-h-[92svh] overflow-hidden bg-[#161514]">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <HeroMedia slot={`${slug}-banner`} fallbackImage={service.img} fallbackVideo={extra.video} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#161514]/40 via-transparent to-[#161514]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161514]/70 via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 min-h-[92svh] flex flex-col justify-end px-6 md:px-14 pt-32 pb-16 container mx-auto max-w-[1400px]">
          <nav className="text-[10px] tracking-[0.25em] uppercase text-white/60 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-[#FF5B22]">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#FF5B22]">Services</Link>
            <span>/</span>
            <span className="text-white">{shortTitle}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/60 mb-5" data-testid="service-page-eyebrow">{(seo.serviceTitle || service.t)} · Mumbai &amp; Goa</div>
            <h1 className="display text-white text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-medium tracking-[-0.015em] max-w-[22ch]" data-testid="service-page-h1">{seo.h1 || service.t}</h1>
            <span className="mt-7 block w-11 h-px bg-[#EEEAE1]/55" aria-hidden="true" />
            <p className="mt-6 text-white/80 text-[15px] md:text-base max-w-[52ch] leading-relaxed font-light" data-testid="service-page-hero-copy">{seo.hero || seo.description || extra.hero}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/booking" data-testid="service-hero-booking-link" className="group inline-flex items-center gap-3 bg-[#EEEAE1] text-[#161514] px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#FF5B22] hover:text-white transition-colors">
                Book this service <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" data-testid="service-hero-whatsapp-link" className="inline-flex items-center gap-3 text-white/90 hover:text-white text-sm font-semibold">
                <MessageCircle size={15} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <svg className="absolute bottom-0 left-0 right-0 w-full z-10" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: '100px' }}>
          <path d="M0,120 C240,20 720,100 1440,10 L1440,120 Z" fill="#EEEAE1" />
        </svg>
      </section>

      {/* ---------- About ---------- */}
      <section className="py-20 md:py-28 bg-[#EEEAE1]">
        <div className="container mx-auto max-w-[1100px] px-6 md:px-10 text-center">
          <div className="eyebrow mb-4">About This Service</div>
          <h2 className="display text-4xl md:text-6xl leading-[1.05]">{aboutHead[0]} <span className="text-[#FF5B22] italic font-medium">{aboutHead[1]}</span></h2>
          <p className="mt-8 text-[#8A857D] text-lg leading-relaxed">{extra.about}</p>
        </div>
      </section>

      {/* ---------- SEO body block (Mumbai / Goa keyword-natural intro) ---------- */}
      {(seo.body || seo.intro) && (
        <section className="py-16 md:py-20 bg-[#EEEAE1] border-t border-[#DBD4C6]/50">
          <div className="container mx-auto max-w-[980px] px-6 md:px-10" data-testid="service-local-seo-copy">
            {seo.h2 && (
              <h2 className="display text-2xl md:text-3xl text-[#161514] leading-[1.25] max-w-3xl">
                {seo.h2}
              </h2>
            )}
            <div className="mt-6 space-y-5 text-[#4C4A46] text-[15px] leading-[1.85] font-light">
              {(seo.body || [seo.intro]).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/gallery" data-testid="service-internal-gallery-link" className="rounded-2xl border border-[#DBD4C6] bg-[#E6E1D5] p-4 text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
                View Mumbai & Goa gallery →
              </Link>
              <Link href="/pricing" data-testid="service-internal-pricing-link" className="rounded-2xl border border-[#DBD4C6] bg-[#E6E1D5] p-4 text-sm font-semibold hover:border-[#FF5B22] hover:text-[#FF5B22] transition-colors">
                Compare packages & prices →
              </Link>
              <Link href="/booking" data-testid="service-internal-booking-link" className="rounded-2xl border border-[#DBD4C6] bg-[#161514] text-white p-4 text-sm font-semibold hover:bg-[#FF5B22] transition-colors">
                Book this service online →
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2" data-testid="service-keyword-tags">
              {(seo.keywords || []).slice(0, 6).map((k) => (
                <span key={k} className="text-[10px] tracking-[0.12em] uppercase text-[#8A857D] border border-[#DBD4C6] rounded-full px-3 py-1.5">{k}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Stats strip (visual hook) ---------- */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-[#EEEAE1] to-[#E6E1D5]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#DBD4C6] rounded-3xl overflow-hidden border border-[#DBD4C6]">
            {[
              { k: '12+', l: 'Years of craft' },
              { k: '2000+', l: 'Shoots delivered' },
              { k: '48hr', l: 'Sneak-peek promise' },
              { k: '4.9', l: 'Google rating' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-[#EEEAE1] p-8 text-center group hover:bg-[#EFE9DE] transition-colors">
                <div className="display text-4xl md:text-5xl text-[#161514] group-hover:text-[#FF5B22] transition-colors">{s.k}</div>
                <div className="mt-2 text-[10px] uppercase tracking-widest text-[#8A857D]">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What We Cover: Interactive Tabs ---------- */}
      <section className="py-20 md:py-28 bg-[#E6E1D5]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center mb-14">
            <div className="eyebrow mb-3">What We Cover</div>
            <h2 className="display text-4xl md:text-6xl">End-to-end, <span className="text-[#FF5B22] italic font-medium">every detail.</span></h2>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Tab pills */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <div className="flex flex-col gap-2">
                {extra.covers.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCover(i)}
                    onMouseEnter={() => setActiveCover(i)}
                    className={`group relative w-full text-left rounded-2xl px-5 py-4 flex items-center gap-4 transition-all overflow-hidden ${activeCover === i ? 'bg-[#161514] text-white shadow-2xl' : 'bg-[#EEEAE1] border border-[#DBD4C6] text-[#161514] hover:border-[#FF5B22]'}`}
                  >
                    <span className={`display text-3xl tabular ${activeCover === i ? 'text-[#FF5B22]' : 'text-[#FF5B22]/60'}`}>{String(i+1).padStart(2,'0')}</span>
                    <span className="flex-1">
                      <span className="block font-semibold text-base">{c.t}</span>
                      <span className={`block text-[11px] mt-0.5 ${activeCover === i ? 'text-white/60' : 'text-[#8A857D]'}`}>{c.l.length} items included</span>
                    </span>
                    <ArrowRight size={16} className={`shrink-0 transition-transform ${activeCover === i ? 'translate-x-0 text-[#FF5B22]' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-[#FF5B22]'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Active tab detail */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCover}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.7,0,0.2,1] }}
                  className="rounded-3xl overflow-hidden bg-[#EEEAE1] border border-[#DBD4C6] shadow-xl"
                >
                  <div className="relative aspect-[16/9]">
                    <Image src={portfolio[activeCover % portfolio.length] || service.img} alt={localAlt(extra.covers[activeCover].t, 'Mumbai and Goa venue or studio', 'candid cinematic')} fill sizes="800px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="text-[10px] tracking-widest uppercase text-[#67E8F9] mb-1">Section {String(activeCover+1).padStart(2,'0')} / {String(extra.covers.length).padStart(2,'0')}</div>
                      <h3 className="display text-3xl md:text-4xl">{extra.covers[activeCover].t}</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {extra.covers[activeCover].l.map((li, j) => (
                        <motion.li key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.05 }} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#EFE9DE] transition-colors">
                          <span className="w-6 h-6 rounded-full bg-[#F3E4DC] text-[#FF5B22] grid place-content-center shrink-0"><Check size={12} /></span>
                          <span className="text-sm text-[#161514]">{li}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Who Is This For (hover reveals image) ---------- */}
      <section className="py-20 md:py-28 bg-[#EEEAE1]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">Who Is This For?</div>
            <h2 className="display text-4xl md:text-6xl">Perfect for <span className="text-[#FF5B22] italic font-medium">your story.</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {extra.audience.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-[#DBD4C6] hover:border-[#FF5B22] transition-colors">
                <Image src={portfolio[i % portfolio.length]} alt={localAlt(a, 'Bandra, Juhu, Fontainhas or Goa setting', 'premium lifestyle')} fill sizes="300px" className="object-cover transition-transform [transition-duration:1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/95 via-[#161514]/60 to-transparent group-hover:from-[#161514]/95 group-hover:via-[#161514]/40" />
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#EEEAE1]/10 backdrop-blur text-white grid place-content-center border border-white/20 group-hover:bg-[#FF5B22] group-hover:border-[#FF5B22] transition-all">
                    {[<Users key={0} size={18} />, <Sparkles key={1} size={18} />, <Camera key={2} size={18} />, <Video key={3} size={18} />][i % 4]}
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-[#67E8F9] mb-1">Perfect for</div>
                    <div className="text-white text-lg font-bold leading-tight">{a}</div>
                    <div className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-white/80 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all">
                      Learn more <ArrowUpRight size={11} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why Choose Us ---------- */}
      <section className="py-20 md:py-28 bg-[#E6E1D5]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="col-span-12 md:col-span-5">
              <div className="eyebrow mb-3">Why Choose Us</div>
              <h2 className="display text-4xl md:text-6xl leading-[1.05]">Craft that <span className="text-[#FF5B22] italic font-medium">shows.</span></h2>
              <p className="mt-6 text-[#8A857D] leading-relaxed">Twelve years, 2000+ shoots, 25+ awards — but what really matters is the four things on the right.</p>
              <div className="mt-6 inline-flex items-center gap-4 rounded-full bg-[#EEEAE1] border border-[#DBD4C6] px-5 py-3">
                <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-[#FF5B22] text-[#FF5B22]" />)}</div>
                <span className="text-xs font-semibold">4.9 · 380+ Reviews</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              {extra.why.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-6 rounded-2xl bg-[#EEEAE1] border border-[#DBD4C6] hover:border-[#FF5B22] hover:shadow-lg transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#FF5B22] text-white grid place-content-center mb-4">{[<Award key={0} size={18} />, <Zap key={1} size={18} />, <Users key={2} size={18} />, <Star key={3} size={18} />][i % 4]}</div>
                  <p className="text-sm text-[#161514] leading-relaxed">{w}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Our Process (with connecting line) ---------- */}
      <section className="py-20 md:py-28 bg-[#EEEAE1]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center mb-14">
            <div className="eyebrow mb-3">Our Seamless Process</div>
            <h2 className="display text-4xl md:text-6xl">From brief to <span className="text-[#FF5B22] italic font-medium">delivery.</span></h2>
          </div>
          <div className="relative">
            {/* Connecting dashed line */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px" style={{ background: 'repeating-linear-gradient(90deg, #FF5B22 0 6px, transparent 6px 14px)' }} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
              {(extra.process || [
                ['Meet & Plan', 'We meet you in person or on a call to hear your story and lock the plan.'],
                ['The Big Day', 'Our full team provides coverage of every moment that matters, on the day.'],
                ['Creative Post', 'Retouching, cinematic edits and colour grading, done in-house.'],
                ['Delivered', 'A private online gallery, plus prints and albums for premium packages.'],
              ]).map(([t, d], i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative rounded-3xl bg-[#EEEAE1] border border-[#DBD4C6] p-7 hover:border-[#FF5B22] hover:-translate-y-1 transition-all shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#161514] text-white grid place-content-center mx-auto -mt-14 ring-4 ring-white shadow-lg mb-4">{[<Calendar key={0} size={18} />, <Camera key={1} size={18} />, <Sparkles key={2} size={18} />, <Check key={3} size={18} />][i % 4]}</div>
                  <div className="text-center">
                    <div className="text-[10px] tracking-widest uppercase text-[#FF5B22] font-bold">Step {String(i+1).padStart(2,'0')}</div>
                    <h3 className="display text-xl mt-2">{t}</h3>
                    <p className="mt-2 text-sm text-[#8A857D] leading-relaxed">{d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="py-20 md:py-28 bg-[#E6E1D5]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center mb-14">
            <div className="eyebrow mb-3">Packages & Pricing</div>
            <h2 className="display text-4xl md:text-6xl">Transparent <span className="text-[#FF5B22] italic font-medium">investment.</span></h2>
            <p className="mt-4 text-[#8A857D] max-w-xl mx-auto">All packages include studio, direction and in-house post-production. Custom scopes available on request.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extra.pricing.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`relative rounded-3xl border p-8 transition-all hover:-translate-y-1 ${p.popular ? 'border-[#FF5B22] bg-gradient-to-b from-[#EFE9DE] to-[#EEEAE1] shadow-xl md:-mt-4' : 'border-[#DBD4C6] bg-[#EEEAE1] hover:shadow-lg'}`}>
                {p.popular && <div className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase bg-[#FF5B22] text-white px-3 py-1.5 rounded-full">Most Popular</div>}
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#FF5B22]">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="display text-4xl md:text-5xl">{p.price}</span>
                  {p.original && <span className="text-sm text-[#8A857D] line-through">{p.original}</span>}
                </div>
                <ul className="mt-6 space-y-3 min-h-[200px]">
                  {p.f.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#F3E4DC] text-[#FF5B22] grid place-content-center shrink-0 mt-0.5"><Check size={11} /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/booking" className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-sm transition-colors ${p.popular ? 'bg-[#FF5B22] text-white hover:bg-[#E24A12]' : 'bg-[#161514] text-white hover:bg-[#FF5B22]'}`}>Book Now <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Portfolio Showcase (with lightbox) ---------- */}
      <section className="py-20 md:py-28 bg-[#EEEAE1]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="eyebrow mb-3">Portfolio Showcase</div>
              <h2 className="display text-4xl md:text-6xl">Recent <span className="text-[#FF5B22] italic font-medium">frames.</span></h2>
              <p className="mt-3 text-[#8A857D] text-sm">Tap any image to open. Use ← → to navigate.</p>
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22]">View full gallery <ArrowRight size={14} /></Link>
          </div>
          <div className="columns-2 md:columns-4 gap-3 md:gap-4">
            {portfolio.slice(0, 8).map((src, i) => {
              return (
                <motion.button
                  key={i}
                  onClick={() => setLightbox(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (i % 4) * 0.05 }}
                  className="relative block w-full mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-2xl group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={localAlt(`${service.t} portfolio frame ${i + 1}`, 'Mumbai or Goa shoot location', 'luxury editorial')} loading="lazy" className="w-full h-auto block transition-transform [transition-duration:1200ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="w-14 h-14 rounded-full bg-[#EEEAE1]/95 backdrop-blur text-[#161514] grid place-content-center scale-75 group-hover:scale-100 transition-transform">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="text-[10px] tracking-widest uppercase text-white/70">PK Photography</div>
                    <div className="text-sm font-semibold">{shortTitle} · {2024 + (i % 2)}</div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- FAQs ---------- */}
      <section className="py-20 md:py-28 bg-[#E6E1D5]">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            <div className="col-span-12 md:col-span-4">
              <div className="eyebrow mb-3">FAQs</div>
              <h2 className="display text-3xl md:text-5xl">Common <span className="text-[#FF5B22] italic font-medium">questions.</span></h2>
              <p className="mt-4 text-[#8A857D]">Something else on your mind? Message us on WhatsApp and we'll reply within the hour.</p>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22]"><MessageCircle size={16} /> Chat on WhatsApp</a>
            </div>
            <div className="col-span-12 md:col-span-8">
              {visibleFaqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} i={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-20 md:py-28 bg-[#EEEAE1]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="relative rounded-[36px] overflow-hidden bg-[#161514] text-white p-10 md:p-16">
            <div className="absolute -top-32 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,91,34,0.4), transparent 60%)' }} />
            <div className="relative grid grid-cols-12 gap-8 items-center">
              <div className="col-span-12 md:col-span-8">
                <div className="eyebrow text-[#67E8F9] mb-4">Ready when you are</div>
                <h2 className="display text-4xl md:text-6xl">Let's create your <span className="text-[#FF5B22] italic font-medium">{shortTitle.toLowerCase()}.</span></h2>
                <p className="mt-4 text-white/70 max-w-xl">Tell us your dates and vision — we'll confirm within a few hours.</p>
              </div>
              <div className="col-span-12 md:col-span-4 flex md:justify-end">
                <Link href="/booking" className="inline-flex items-center gap-2 bg-[#FF5B22] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#E24A12] transition-colors">Inquire Now <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Explore other services ---------- */}
      <section className="py-20 md:py-28 bg-[#E6E1D5]">
        <div className="container mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow mb-3">Explore more</div>
              <h2 className="display text-3xl md:text-5xl">Other <span className="text-[#FF5B22] italic font-medium">disciplines.</span></h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5B22]">View all 19 <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.filter(s => s.slug !== slug).slice(0, 4).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} data-testid={`service-related-${s.slug}`} className="group relative aspect-[4/5] rounded-2xl overflow-hidden block">
                <Image src={s.img} alt={localAlt(s.t, 'Mumbai and Goa service preview', 'premium editorial')} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/85 via-[#161514]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-sm font-bold leading-tight">{s.t}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#67E8F9]">View details <ArrowUpRight size={11} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ---------- Sticky Book CTA (appears after scroll) ---------- */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.5, ease: [0.7,0,0.2,1] }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] hidden md:flex">
            <div className="flex items-center gap-3 bg-[#161514] text-white rounded-full pl-5 pr-2 py-2 shadow-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF5B22] grid place-content-center"><Clock size={14} /></div>
                <div className="text-xs leading-tight">
                  <div className="text-white/60 text-[9px] uppercase tracking-widest">Interested in</div>
                  <div className="font-semibold">{service.t}?</div>
                </div>
              </div>
              <Link href="/booking" className="inline-flex items-center gap-2 bg-[#FF5B22] hover:bg-[#E24A12] text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-colors">Book Now <ArrowRight size={12} /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Lightbox modal ---------- */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-sm grid place-content-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-[min(92vw,1100px)] aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={portfolio[lightbox]} alt={localAlt(`${service.t} enlarged portfolio frame ${lightbox + 1}`, 'Mumbai or Goa venue', 'candid cinematic')} fill sizes="1100px" className="object-cover" priority />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-[10px] tracking-widest uppercase text-[#67E8F9]">PK Photography · {shortTitle}</div>
                <div className="text-white text-xl font-semibold mt-1">Frame {String(lightbox + 1).padStart(2, '0')} / {String(portfolio.length).padStart(2, '0')}</div>
              </div>
            </motion.div>
            <button onClick={() => setLightbox((lightbox - 1 + portfolio.length) % portfolio.length)} aria-label="Previous" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur border border-white/20 text-white grid place-content-center hover:bg-[#EEEAE1]/20"><ArrowLeft size={18} /></button>
            <button onClick={() => setLightbox((lightbox + 1) % portfolio.length)} aria-label="Next" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur border border-white/20 text-white grid place-content-center hover:bg-[#EEEAE1]/20"><ArrowRight size={18} /></button>
            <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#EEEAE1]/10 backdrop-blur text-white grid place-content-center hover:bg-[#EEEAE1]/20"><X size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
