'use client'

import { useMemo, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin, BedDouble, Bath, Maximize, CheckCircle2, CalendarCheck,
  Phone, ArrowLeft, Building2, Clock, Tag, ArrowRight,
} from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { PropertyCard } from '@/components/site/PropertyCard'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { getProperty, PROPERTIES, COMPANY } from '@/lib/data/site'

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const property = getProperty(id)
  const [active, setActive] = useState(0)

  const similar = useMemo(
    () => PROPERTIES.filter((p) => p.id !== id).slice(0, 3),
    [id]
  )

  if (!property) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="container pt-40 pb-24 text-center">
          <h1 className="font-display text-3xl font-extrabold text-ink">Property not found</h1>
          <p className="mt-3 text-ink-light">The listing you are looking for may have been sold or moved.</p>
          <Button asChild className="mt-6 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold">
            <Link href="/properties">Back to Properties</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const p = property
  const specs = [
    { icon: BedDouble, label: 'Configuration', value: p.bhk },
    { icon: Bath, label: 'Bathrooms', value: `${p.bathrooms}` },
    { icon: Maximize, label: 'Area', value: p.area },
    { icon: Building2, label: 'Type', value: p.category },
    { icon: Clock, label: 'Possession', value: p.possession },
    { icon: Tag, label: 'Status', value: p.status },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <div className="pt-28 pb-16">
        <div className="container">
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-ink-light hover:text-brand transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Properties
          </Link>

          {/* Gallery */}
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 relative overflow-hidden rounded-3xl h-[300px] md:h-[460px]"
            >
              <img src={p.gallery[active]} alt={p.name} className="h-full w-full object-cover" />
              <span className="absolute left-5 top-5 rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white shadow-glow">
                {p.tag}
              </span>
            </motion.div>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {p.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden rounded-2xl h-24 lg:h-[142px] ring-2 transition-all ${
                    active === i ? 'ring-brand' : 'ring-transparent hover:ring-brand-200'
                  }`}
                >
                  <img src={img} alt={`${p.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Header row */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold text-ink">{p.name}</h1>
                  <p className="mt-2 flex items-center gap-2 text-ink-light">
                    <MapPin className="h-5 w-5 text-brand" /> {p.location}
                  </p>
                </div>
                <div className="rounded-2xl bg-brand-50 px-6 py-3 text-right">
                  <p className="font-display text-3xl font-extrabold text-brand-600">{p.price}</p>
                  <p className="text-xs text-ink-soft">{p.priceNote}</p>
                </div>
              </div>

              {/* Specs */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {specs.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white p-5 ring-1 ring-slate-100">
                    <s.icon className="h-6 w-6 text-brand" />
                    <p className="mt-3 text-xs uppercase tracking-wide text-ink-soft">{s.label}</p>
                    <p className="mt-0.5 font-semibold text-ink">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-ink">Overview</h2>
                <p className="mt-3 text-ink-light leading-relaxed">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {p.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
                      <CheckCircle2 className="h-4 w-4" /> {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-ink">Amenities</h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {p.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-100">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span className="text-sm font-medium text-ink-light">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location map */}
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-ink">Location</h2>
                <div className="mt-4 overflow-hidden rounded-3xl h-[320px] ring-1 ring-slate-100">
                  <iframe
                    title={`${p.name} location`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(p.location)}&output=embed`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-3xl bg-white p-7 shadow-card ring-1 ring-slate-100">
                <h3 className="font-display text-xl font-bold text-ink">Interested in this property?</h3>
                <p className="mt-2 text-sm text-ink-light">
                  Book a free site visit or talk to our property expert today.
                </p>
                <Button asChild className="mt-6 w-full rounded-full bg-brand hover:bg-brand-600 text-white font-semibold h-12">
                  <Link href="/book-visit">
                    <CalendarCheck className="mr-2 h-5 w-5" /> Book Site Visit
                  </Link>
                </Button>
                <Button asChild variant="outline" className="mt-3 w-full rounded-full border-slate-200 font-semibold h-12">
                  <a href={COMPANY.phoneHref}>
                    <Phone className="mr-2 h-5 w-5 text-brand" /> Call {COMPANY.phone}
                  </a>
                </Button>
                <div className="mt-6 rounded-2xl bg-surface p-4 text-center">
                  <p className="text-xs uppercase tracking-wide text-ink-soft">RERA Registered</p>
                  <p className="mt-1 text-sm font-semibold text-ink">100% Verified Listing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar */}
      <section className="py-16 bg-white">
        <div className="container">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Similar Properties</h2>
              <Link href="/properties" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {similar.map((sp) => (
              <PropertyCard key={sp.id} property={sp} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
