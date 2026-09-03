// ============================================================================
//  ARG BUILDTECH  —  SITE CONFIGURATION
//  Everything on the website is editable from this single file.
//  Change text / numbers / image URLs / links below and the whole site updates.
// ============================================================================

// ---------------------------------------------------------------------------
//  1. COMPANY & CONTACT DETAILS  (logo, name, phone, whatsapp, email, address)
// ---------------------------------------------------------------------------
export const COMPANY = {
  name: 'ARG Buildtech',
  // Leave `logo` empty ('') to use the built-in icon logo, OR paste an image URL.
 logo: '/arg-logo.png',
  tagline: 'Building Landmarks. Creating Homes.',

  // Phone (used for Call button + header)
  phone: '+91 9220217202',
  phoneHref: 'tel:+919220217202',

  // WhatsApp (digits only, with country code, for the floating WhatsApp button)
  whatsappNumber: '919220217202',
  whatsappMessage: 'Hi ARG Buildtech! I am interested in your properties and would like more details.',

  // Email
  email: 'argbuildtech@gmail.com',
  emailHref: 'argbuildtech@gmail.com',

  // Office address
  address: 'ARG Buildtech, Metro Pillar No-792, Nawada housing complex C-25 Dwarka Mor, Block C, Vipin Garden, Nawada, New Delhi, Delhi, \u2013 110059, India.',
  addressShort: 'Dwarka Mor, New Delhi \u2013 110059',
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
  founded: 2009,
  rera: 'UPRERAAGT10099',
  copyright: '\u00a9 2026 ARG Buildtech. All Rights Reserved.',
  brochure: '/brochure/arg-buildtech-brochure.pdf',

  // Google Map (paste your own embed query or full embed URL)
  mapQuery: 'Dwarka Mor Metro Station, New Delhi',
  mapEmbed: 'https://www.google.com/maps?q=Dwarka%20Mor%20Metro%20Station%20New%20Delhi&output=embed',

  // Social media links
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61578645151217',
    instagram: 'https://www.instagram.com/argbuildtech/',
    youtube: 'https://www.youtube.com/@ARGBUILDTECH',
    whatsapp: 'https://wa.me/919220217202',
  },
}

export const WHATSAPP_HREF = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`

// ---------------------------------------------------------------------------
//  2. SEO
// ---------------------------------------------------------------------------
export const SEO = {
  siteUrl: 'https://premium-homes-arg.emergent.host',
  title: 'ARG Buildtech | Premium Residential & Commercial Properties',
  description:
    'ARG Buildtech is a trusted real estate developer offering premium residential and commercial properties at the best locations across India. Find your dream home today.',
  keywords: [
    'ARG Buildtech', 'real estate', 'luxury apartments', 'premium properties',
    'buy property in India', 'rent property', 'villas', 'commercial property',
    'Noida', 'Bangalore', 'Mumbai', 'Gurugram', 'Hyderabad', 'Pune', 'book site visit',
  ],
}

// ---------------------------------------------------------------------------
//  3. HOMEPAGE / BANNER IMAGES  (replaceable — paste any image URL)
// ---------------------------------------------------------------------------
export const SITE_IMAGES = {
  // Homepage hero fallback (homepage uses the heroSlider below)
  hero: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnR8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',

  // Hero slider images (homepage banner rotates through these)
heroSlider: [
  "/brand/arg-banner.png",
  "/brand/banner 2.png",
  "/brand/banner 3.png",
],

about: "https://images.unsplash.com/....",
  about: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
  propertiesBanner: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnR8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',

  gallery: [
    'https://images.pexels.com/photos/16110999/pexels-photo-16110999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.unsplash.com/photo-1717167398817-121e3c283dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1767950470198-c9cd97f8ed87?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
  ],
}

// Leadership / team members (editable). Replace image URLs with real photos.
export const TEAM = [
  { name: 'Arun R. Gupta', role: 'Founder & Managing Director', image: 'https://i.pravatar.cc/400?img=12' },
  { name: 'Sneha Kapoor', role: 'Head of Sales', image: 'https://i.pravatar.cc/400?img=45' },
  { name: 'Rajeev Nair', role: 'Chief Architect', image: 'https://i.pravatar.cc/400?img=33' },
  { name: 'Priya Menon', role: 'Customer Relations Head', image: 'https://i.pravatar.cc/400?img=47' },
]

// Kept for backward compatibility
export const HERO_IMAGE = SITE_IMAGES.hero

// ---------------------------------------------------------------------------
//  4. NAVIGATION
// ---------------------------------------------------------------------------
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Buy', href: '/properties?type=Buy' },
  { label: 'Rent', href: '/properties?type=Rent' },
  { label: 'Projects', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// ---------------------------------------------------------------------------
//  5. SEARCH FILTER OPTIONS
// ---------------------------------------------------------------------------
export const LOCATIONS = ['Noida', 'Gurugram', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune']
export const PROPERTY_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Commercial']
export const BUDGETS = ['Under \u20b91 Cr', '\u20b91 Cr - \u20b92 Cr', '\u20b92 Cr - \u20b93 Cr', '\u20b93 Cr+']
export const BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK']

// ---------------------------------------------------------------------------
//  6. PROPERTIES
//  Each property supports: cover image, gallery images, video, price, BHK,
//  area, location, description, amenities, RERA number and status.
// ---------------------------------------------------------------------------
const RAW_PROPERTIES = [
  {
    id: 'arg-skyline-residences',
    name: 'ARG Skyline Residences',
    location: 'Sector 62, Noida',
    city: 'Noida',
    price: '\u20b91.85 Cr',
    priceNote: 'Onwards',
    bhk: '3 BHK',
    bedrooms: 3,
    bathrooms: 3,
    area: '1,850 sq.ft',
    type: 'Buy',
    category: 'Apartment',
    status: 'Ready to Move',
    possession: 'Ready to Move',
    rera: 'UPRERAPRJ409821',
    featured: true,
    tag: 'Premium',
    image:
      'https://images.pexels.com/photos/16110999/pexels-photo-16110999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/16110999/pexels-photo-16110999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1748063578185-3d68121b11ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
    ],
    // Paste a YouTube embed URL or a direct .mp4 URL. Empty ('') hides the video.
    video: 'https://www.youtube.com/embed/YE7VzlLtp-4',
    description:
      'Rising above the skyline of Sector 62, ARG Skyline Residences redefines urban living with expansive 3 BHK homes featuring floor-to-ceiling windows, imported Italian marble flooring and private balconies overlooking landscaped gardens. Every residence is Vastu-compliant and crafted for families that value light, space and connectivity.',
    highlights: ['Corner unit availability', 'Vastu compliant', '3-side open', 'Premium clubhouse'],
    amenities: ['Infinity Pool', 'Fully-equipped Gym', 'Landscaped Gardens', '24x7 Security', 'Kids Play Area', 'Clubhouse', 'Power Backup', 'Covered Parking'],
  },
  {
    id: 'arg-green-valley-villas',
    name: 'ARG Green Valley Villas',
    location: 'Whitefield, Bangalore',
    city: 'Bangalore',
    price: '\u20b93.25 Cr',
    priceNote: 'Onwards',
    bhk: '4 BHK',
    bedrooms: 4,
    bathrooms: 5,
    area: '3,200 sq.ft',
    type: 'Buy',
    category: 'Villa',
    status: 'New Launch',
    possession: 'Dec 2026',
    rera: 'PRM/KA/RERA/1251/446/PR/010224',
    featured: true,
    tag: 'New Launch',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1717167398817-121e3c283dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1767950470198-c9cd97f8ed87?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
    ],
    video: '',
    description:
      'Set within a gated community in Bangalore\u2019s tech corridor, ARG Green Valley Villas offer 4 BHK independent villas with private plunge pools, double-height living rooms and rooftop terraces. Surrounded by two acres of green landscape, these homes bring resort-style living minutes away from Whitefield\u2019s IT parks.',
    highlights: ['Private plunge pool', 'Rooftop terrace', 'Home automation', 'Gated community'],
    amenities: ['Private Pool', 'Home Automation', 'Landscaped Lawn', 'Clubhouse', 'Gym', 'Jogging Track', '24x7 Security', 'EV Charging'],
  },
  {
    id: 'arg-signature-towers',
    name: 'ARG Signature Towers',
    location: 'Powai, Mumbai',
    city: 'Mumbai',
    price: '\u20b985,000',
    priceNote: 'per month',
    bhk: '3 BHK',
    bedrooms: 3,
    bathrooms: 3,
    area: '1,650 sq.ft',
    type: 'Rent',
    category: 'Apartment',
    status: 'Ready to Move',
    possession: 'Immediate',
    rera: 'P51800012345',
    featured: true,
    tag: 'For Rent',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
      'https://images.pexels.com/photos/16110999/pexels-photo-16110999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnR8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
    ],
    video: '',
    description:
      'ARG Signature Towers in Powai offers fully-furnished 3 BHK residences with panoramic lake views, modular kitchens and access to a sky lounge on the 30th floor. Ideal for professionals seeking a premium rental in the heart of Mumbai\u2019s most connected neighbourhood.',
    highlights: ['Fully furnished', 'Lake-facing', 'Sky lounge access', 'Metro connectivity'],
    amenities: ['Sky Lounge', 'Swimming Pool', 'Gym', 'Concierge', 'Covered Parking', 'Power Backup', 'Business Center', '24x7 Security'],
  },
  {
    id: 'arg-corporate-hub',
    name: 'ARG Corporate Hub',
    location: 'Cyber City, Gurugram',
    city: 'Gurugram',
    price: '\u20b94.50 Cr',
    priceNote: 'Onwards',
    bhk: 'Office Space',
    bedrooms: 0,
    bathrooms: 4,
    area: '2,400 sq.ft',
    type: 'Buy',
    category: 'Commercial',
    status: 'Ready to Move',
    possession: 'Ready to Move',
    rera: 'HARERA-GGM-441-2023',
    featured: true,
    tag: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1748063578185-3d68121b11ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1748063578185-3d68121b11ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnR8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
      'https://images.pexels.com/photos/16110999/pexels-photo-16110999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    video: '',
    description:
      'A LEED-certified grade-A commercial address in the heart of Cyber City, ARG Corporate Hub offers plug-and-play office suites with double-glazed facades, high-speed elevators and 100% power backup. Designed for growing enterprises that want a prestigious business presence in Gurugram.',
    highlights: ['LEED certified', 'Grade-A building', 'Plug & play', 'Ample parking'],
    amenities: ['High-speed Elevators', '100% Power Backup', 'Food Court', 'Conference Facilities', 'Ample Parking', 'CCTV Surveillance', 'Central AC', 'Metro Access'],
  },
  {
    id: 'arg-lake-view-apartments',
    name: 'ARG Lake View Apartments',
    location: 'Kondapur, Hyderabad',
    city: 'Hyderabad',
    price: '\u20b932,000',
    priceNote: 'per month',
    bhk: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,240 sq.ft',
    type: 'Rent',
    category: 'Apartment',
    status: 'Ready to Move',
    possession: 'Immediate',
    rera: 'P02400004567',
    featured: true,
    tag: 'For Rent',
    image:
      'https://images.unsplash.com/photo-1767950470198-c9cd97f8ed87?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1767950470198-c9cd97f8ed87?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1717167398817-121e3c283dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
    ],
    video: '',
    description:
      'Overlooking the serene Kondapur lake, ARG Lake View Apartments offer bright, well-ventilated 2 BHK homes with modern interiors, a rooftop deck and a resident-only cafe. A perfect blend of tranquility and tech-city convenience close to HITEC City.',
    highlights: ['Lake-facing', 'Semi-furnished', 'Rooftop deck', 'Pet friendly'],
    amenities: ['Rooftop Deck', 'Cafe', 'Gym', 'Kids Play Area', 'Covered Parking', 'Power Backup', '24x7 Security', 'Rainwater Harvesting'],
  },
  {
    id: 'arg-palm-residency',
    name: 'ARG Palm Residency',
    location: 'Baner, Pune',
    city: 'Pune',
    price: '\u20b91.10 Cr',
    priceNote: 'Onwards',
    bhk: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,180 sq.ft',
    type: 'Buy',
    category: 'Apartment',
    status: 'Under Construction',
    possession: 'Jun 2026',
    rera: 'P52100033210',
    featured: true,
    tag: 'Under Construction',
    image:
      'https://images.unsplash.com/photo-1717167398817-121e3c283dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1717167398817-121e3c283dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1767950470198-c9cd97f8ed87?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwcHJvcGVydHl8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
    ],
    video: '',
    description:
      'ARG Palm Residency brings smart, affordable luxury to Baner with thoughtfully designed 2 BHK homes, a tree-lined central avenue and a full-scale sports arena. RERA-registered and backed by flexible construction-linked payment plans, it is the smart choice for first-time home buyers in Pune.',
    highlights: ['RERA registered', 'Construction-linked plan', 'Sports arena', 'Smart homes'],
    amenities: ['Sports Arena', 'Swimming Pool', 'Gym', 'Amphitheatre', 'Kids Play Area', 'Covered Parking', 'Power Backup', '24x7 Security'],
  },
]

// ---------------------------------------------------------------------------
//  6b. PROPERTY ENRICHMENT  (floor plans, nearby places, price table, etc.)
// ---------------------------------------------------------------------------
export const SPECIFICATIONS = [
  { category: 'Structure', items: ['Earthquake-resistant RCC framed structure', 'Premium quality cement & TMT steel'] },
  { category: 'Flooring', items: ['Imported marble in living & dining', 'Wooden laminate in master bedroom', 'Anti-skid tiles in balconies & baths'] },
  { category: 'Kitchen', items: ['Granite counter with stainless steel sink', 'Designer tile dado up to 2 ft', 'Provision for chimney & water purifier'] },
  { category: 'Doors & Windows', items: ['Engineered veneer main door', 'UPVC windows with mosquito mesh'] },
  { category: 'Walls & Paint', items: ['Acrylic emulsion for interior walls', 'Weatherproof texture paint outside'] },
  { category: 'Electrical', items: ['Concealed fire-resistant copper wiring', 'Modular switches', '100% DG power back-up'] },
]

const ENRICH = {
  'arg-skyline-residences': {
    shortDescription: 'Expansive 3 & 4 BHK sky homes with Italian marble, floor-to-ceiling windows and a premium clubhouse in the heart of Noida.',
    priceValue: 18500000, listedDate: '2025-05-28',
    floorPlans: [
      { name: '3 BHK + 2T', area: '1,850 sq.ft', price: '\u20b91.85 Cr' },
      { name: '3 BHK + 3T', area: '2,050 sq.ft', price: '\u20b92.15 Cr' },
      { name: '4 BHK + 4T', area: '2,600 sq.ft', price: '\u20b92.95 Cr' },
    ],
    nearby: {
      schools: [{ name: 'Delhi Public School, Sector 30', dist: '2.5 km' }, { name: 'Amity International School', dist: '3.1 km' }],
      hospitals: [{ name: 'Kailash Hospital', dist: '1.4 km' }, { name: 'Fortis Hospital', dist: '2.0 km' }],
      metro: [{ name: 'Sector 59 Metro Station', dist: '0.9 km' }, { name: 'Sector 62 Metro Station', dist: '1.6 km' }],
    },
  },
  'arg-green-valley-villas': {
    shortDescription: 'Gated 4 & 5 BHK villas with private plunge pools, rooftop terraces and home automation minutes from Whitefield\u2019s IT hub.',
    priceValue: 32500000, listedDate: '2025-06-05',
    floorPlans: [
      { name: '4 BHK Villa', area: '3,200 sq.ft', price: '\u20b93.25 Cr' },
      { name: '4 BHK Villa +', area: '3,600 sq.ft', price: '\u20b93.75 Cr' },
      { name: '5 BHK Villa', area: '4,200 sq.ft', price: '\u20b94.60 Cr' },
    ],
    nearby: {
      schools: [{ name: 'Vibgyor High, Whitefield', dist: '1.8 km' }, { name: 'Gear Innovative School', dist: '3.4 km' }],
      hospitals: [{ name: 'Manipal Hospital, Whitefield', dist: '2.1 km' }, { name: 'Columbia Asia Hospital', dist: '3.0 km' }],
      metro: [{ name: 'Kadugodi (Whitefield) Metro', dist: '2.6 km' }, { name: 'Hopefarm Channasandra Metro', dist: '2.9 km' }],
    },
  },
  'arg-signature-towers': {
    shortDescription: 'Fully-furnished 3 BHK lake-facing residences with sky lounge access, right in the heart of Powai.',
    priceValue: 85000, listedDate: '2025-04-10',
    floorPlans: [
      { name: '3 BHK Semi-furnished', area: '1,650 sq.ft', price: '\u20b985,000/mo' },
      { name: '3 BHK Fully-furnished', area: '1,800 sq.ft', price: '\u20b91,05,000/mo' },
    ],
    nearby: {
      schools: [{ name: 'Hiranandani Foundation School', dist: '0.7 km' }, { name: 'Bombay Scottish School', dist: '2.4 km' }],
      hospitals: [{ name: 'Hiranandani Hospital', dist: '1.0 km' }, { name: 'Dr. L H Hiranandani Hospital', dist: '1.1 km' }],
      metro: [{ name: 'Powai Metro (Line 6)', dist: '1.2 km' }, { name: 'Saki Vihar Road Metro', dist: '2.0 km' }],
    },
  },
  'arg-corporate-hub': {
    shortDescription: 'LEED-certified grade-A office suites with double-glazed facades and 100% power back-up in Cyber City.',
    priceValue: 45000000, listedDate: '2025-03-22',
    floorPlans: [
      { name: 'Office Suite', area: '1,200 sq.ft', price: '\u20b92.25 Cr' },
      { name: 'Office Floor', area: '2,400 sq.ft', price: '\u20b94.50 Cr' },
      { name: 'Full Floor', area: '4,800 sq.ft', price: '\u20b98.90 Cr' },
    ],
    nearby: {
      schools: [{ name: 'DPS Sector 45', dist: '3.5 km' }, { name: 'The Shri Ram School', dist: '4.0 km' }],
      hospitals: [{ name: 'Medanta - The Medicity', dist: '4.5 km' }, { name: 'Artemis Hospital', dist: '5.0 km' }],
      metro: [{ name: 'Cyber City Rapid Metro', dist: '0.4 km' }, { name: 'Belvedere Towers Metro', dist: '0.8 km' }],
    },
  },
  'arg-lake-view-apartments': {
    shortDescription: 'Bright, semi-furnished 2 & 3 BHK homes overlooking Kondapur lake with a rooftop deck and resident cafe.',
    priceValue: 32000, listedDate: '2025-05-15',
    floorPlans: [
      { name: '2 BHK', area: '1,240 sq.ft', price: '\u20b932,000/mo' },
      { name: '3 BHK', area: '1,480 sq.ft', price: '\u20b942,000/mo' },
    ],
    nearby: {
      schools: [{ name: 'Delhi Public School, Kondapur', dist: '1.5 km' }, { name: 'Chirec International School', dist: '3.2 km' }],
      hospitals: [{ name: 'Care Hospitals', dist: '2.0 km' }, { name: 'KIMS Hospitals', dist: '3.5 km' }],
      metro: [{ name: 'Hi-Tech City Metro', dist: '3.0 km' }, { name: 'Raidurg Metro', dist: '4.2 km' }],
    },
  },
  'arg-palm-residency': {
    shortDescription: 'Smart, affordable 2 & 3 BHK homes with a full-scale sports arena and flexible payment plans in Baner.',
    priceValue: 11000000, listedDate: '2025-06-01',
    floorPlans: [
      { name: '2 BHK', area: '1,180 sq.ft', price: '\u20b91.10 Cr' },
      { name: '3 BHK', area: '1,520 sq.ft', price: '\u20b91.45 Cr' },
    ],
    nearby: {
      schools: [{ name: 'Vibgyor High, Baner', dist: '1.2 km' }, { name: 'The Orchid School', dist: '2.5 km' }],
      hospitals: [{ name: 'Jupiter Hospital', dist: '3.0 km' }, { name: 'Sahyadri Hospital', dist: '3.6 km' }],
      metro: [{ name: 'Balewadi Metro (upcoming)', dist: '2.0 km' }, { name: 'Baner Metro (proposed)', dist: '1.5 km' }],
    },
  },
}

// Per-property extras: offer price, extra videos, construction updates
const EXTRA = {
  'arg-skyline-residences': {
    offerPrice: '\u20b91.72 Cr',
    videos: ['https://www.youtube.com/embed/YE7VzlLtp-4', 'https://www.youtube.com/embed/aqz-KE-bpKQ'],
  },
  'arg-green-valley-villas': {
    constructionUpdates: [
      { date: 'Jun 2025', text: 'Foundation & basement work completed across all villa clusters.', image: null },
      { date: 'Sep 2025', text: 'Superstructure of Phase 1 villas reached roof level.', image: null },
      { date: 'Dec 2025', text: 'Internal plastering and clubhouse structure underway.', image: null },
    ],
  },
  'arg-palm-residency': {
    offerPrice: '\u20b91.02 Cr',
    constructionUpdates: [
      { date: 'Apr 2025', text: 'Excavation and raft foundation completed.', image: null },
      { date: 'Jul 2025', text: 'Tower A cast up to 8th floor slab.', image: null },
      { date: 'Oct 2025', text: 'Sports arena groundwork and landscaping started.', image: null },
    ],
  },
}

// Amenity name -> lucide icon name (used by the details page)
export const AMENITY_ICONS = {
  'Infinity Pool': 'Waves', 'Swimming Pool': 'Waves', 'Private Pool': 'Waves',
  'Fully-equipped Gym': 'Dumbbell', 'Gym': 'Dumbbell',
  'Landscaped Gardens': 'Trees', 'Landscaped Lawn': 'Trees', 'Landscaped Deck': 'Trees',
  '24x7 Security': 'ShieldCheck', 'CCTV Surveillance': 'Cctv',
  'Kids Play Area': 'Baby', 'Clubhouse': 'Building2', 'Power Backup': 'BatteryCharging',
  '100% Power Backup': 'BatteryCharging', 'Covered Parking': 'Car', 'Ample Parking': 'Car',
  'EV Charging': 'PlugZap', 'Jogging Track': 'Footprints', 'Home Automation': 'Cpu',
  'Sky Lounge': 'Martini', 'Concierge': 'ConciergeBell', 'Business Center': 'Briefcase',
  'High-speed Elevators': 'MoveVertical', 'Food Court': 'UtensilsCrossed',
  'Conference Facilities': 'Presentation', 'Central AC': 'Snowflake', 'Metro Access': 'TrainFront',
  'Rooftop Deck': 'Sun', 'Cafe': 'Coffee', 'Rainwater Harvesting': 'CloudRain',
  'Sports Arena': 'Trophy', 'Amphitheatre': 'Drama',
}

export const PROPERTIES = RAW_PROPERTIES.map((p) => {
  const e = ENRICH[p.id] || {}
  const x = EXTRA[p.id] || {}
  const floorPlans = (e.floorPlans || []).map((fp, i) => ({ ...fp, image: p.gallery[i % p.gallery.length] }))
  return {
    ...p,
    builder: COMPANY.name,
    shortDescription: e.shortDescription || `${p.description.split('. ')[0]}.`,
    priceValue: e.priceValue ?? 0,
    offerPrice: x.offerPrice || null,
    listedDate: e.listedDate || '2025-01-01',
    floorPlans,
    priceTable: floorPlans,
    nearby: e.nearby || { schools: [], hospitals: [], metro: [] },
    videos: (x.videos && x.videos.length ? x.videos : [p.video]).filter(Boolean),
    constructionUpdates: x.constructionUpdates || [],
    brochure: COMPANY.brochure,
    masterPlan: p.gallery[p.gallery.length - 1],
    specifications: SPECIFICATIONS,
    faqs: [
      { q: `Is ${p.name} RERA registered?`, a: `Yes. ${p.name} is fully RERA registered under number ${p.rera}. All approvals and legal documentation are verified and available for inspection.` },
      { q: `What is the possession status?`, a: `The current status is "${p.status}"${p.possession && p.possession !== p.status ? `, with expected possession by ${p.possession}` : ''}.` },
      { q: `What is the starting price?`, a: `Prices start from ${p.price} ${p.priceNote}. Detailed unit-wise pricing is listed in the price table above; our team can share a full cost sheet.` },
      { q: `Are home loans available?`, a: `Yes. ${p.name} is approved by 20+ leading banks and we offer complete home-loan assistance at the best interest rates.` },
      { q: `Can I book a site visit?`, a: `Absolutely. Book a free, no-obligation site visit using the enquiry form, the Book Site Visit button, or by calling / WhatsApp-ing our team directly.` },
    ],
  }
})

export function propertyWhatsApp(p) {
  const msg = `Hi ${COMPANY.name}! I'm interested in ${p.name} (${p.bhk}, ${p.location}). Please share more details.`
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(msg)}`
}

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export const STATUS_OPTIONS = ['Ready to Move', 'Under Construction', 'New Launch']

// ---------------------------------------------------------------------------
//  7. WHY CHOOSE US
// ---------------------------------------------------------------------------
export const FEATURES = [
  { icon: 'Award', title: 'Trusted Builder', desc: 'Over 15 years of delivering landmark projects with 5,000+ happy families across India.' },
  { icon: 'ShieldCheck', title: 'Verified Properties', desc: 'Every listing is RERA-registered and legally verified by our in-house legal experts.' },
  { icon: 'MapPin', title: 'Prime Locations', desc: 'Handpicked addresses in the fastest-growing corridors of every major metro city.' },
  { icon: 'Landmark', title: 'Easy Home Loan', desc: 'Pre-approved loans from 20+ leading banks with the lowest interest rates and quick disbursal.' },
  { icon: 'IndianRupee', title: 'Transparent Pricing', desc: 'No hidden charges. Clear, all-inclusive pricing with detailed cost sheets upfront.' },
  { icon: 'HeartHandshake', title: 'Professional Support', desc: 'Dedicated relationship managers to guide you from site visit to final registration.' },
]

// ---------------------------------------------------------------------------
//  8. TESTIMONIALS
// ---------------------------------------------------------------------------
export const TESTIMONIALS = [
  { name: 'Rohan Mehta', role: 'Home Owner, ARG Skyline Residences', city: 'Noida', image: 'https://i.pravatar.cc/200?img=15', quote: 'From the first site visit to getting my keys, ARG Buildtech made the entire journey effortless. The build quality exceeded every expectation \u2014 truly a premium home.', rating: 5 },
  { name: 'Ananya Iyer', role: 'Villa Owner, ARG Green Valley', city: 'Bangalore', image: 'https://i.pravatar.cc/200?img=32', quote: 'Transparent pricing and zero hidden costs. The team explained every document clearly. Our villa is exactly what was promised in the brochure, delivered on time.', rating: 5 },
  { name: 'Vikram Desai', role: 'Investor, ARG Corporate Hub', city: 'Gurugram', image: 'https://i.pravatar.cc/200?img=51', quote: 'As an investor I value trust and returns. ARG Buildtech delivered a grade-A commercial asset with excellent rental demand. Professional and reliable throughout.', rating: 5 },
]

// ---------------------------------------------------------------------------
//  9. STATS
// ---------------------------------------------------------------------------
export const STATS = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '48', label: 'Projects Delivered' },
  { value: '5,000+', label: 'Happy Families' },
  { value: '6', label: 'Cities Present' },
]

export function getProperty(id) {
  return PROPERTIES.find((p) => p.id === id)
}
