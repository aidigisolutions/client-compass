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
  logo: '',
  tagline: 'Building Landmarks. Creating Homes.',

  // Phone (used for Call button + header)
  phone: '+91 98100 12345',
  phoneHref: 'tel:+919810012345',

  // WhatsApp (digits only, with country code, for the floating WhatsApp button)
  whatsappNumber: '919810012345',
  whatsappMessage: 'Hi ARG Buildtech! I am interested in your properties and would like more details.',

  // Email
  email: 'hello@argbuildtech.com',
  emailHref: 'mailto:hello@argbuildtech.com',

  // Office address
  address: 'ARG Buildtech Tower, Sector 62, Noida, Uttar Pradesh 201309',
  hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
  founded: 2009,

  // Google Map (paste your own embed query or full embed URL)
  mapQuery: 'Sector 62 Noida',
  mapEmbed: 'https://www.google.com/maps?q=Sector%2062%20Noida&output=embed',

  // Social media links
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/',
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
  hero: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnR8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
  about: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85',
  propertiesBanner: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnR8ZW58MHx8fHwxNzg2MDg2MDM2fDA&ixlib=rb-4.1.0&q=85',
}

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
export const PROPERTIES = [
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
  { name: 'Rohan Mehta', role: 'Home Owner, ARG Skyline Residences', city: 'Noida', quote: 'From the first site visit to getting my keys, ARG Buildtech made the entire journey effortless. The build quality exceeded every expectation \u2014 truly a premium home.', rating: 5 },
  { name: 'Ananya Iyer', role: 'Villa Owner, ARG Green Valley', city: 'Bangalore', quote: 'Transparent pricing and zero hidden costs. The team explained every document clearly. Our villa is exactly what was promised in the brochure, delivered on time.', rating: 5 },
  { name: 'Vikram Desai', role: 'Investor, ARG Corporate Hub', city: 'Gurugram', quote: 'As an investor I value trust and returns. ARG Buildtech delivered a grade-A commercial asset with excellent rental demand. Professional and reliable throughout.', rating: 5 },
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
