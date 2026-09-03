'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin, BedDouble, Bath, Maximize, CheckCircle2, Building2, Clock, Tag,
  ArrowLeft, ArrowRight, Expand, Images, GraduationCap, Stethoscope, TrainFront,
  BadgeCheck, IndianRupee, LayoutPanelTop,
} from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { PropertyCard } from '@/components/site/PropertyCard'
import { PropertyInquiry } from '@/components/site/PropertyInquiry'
import { Lightbox } from '@/components/site/Lightbox'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getProperty, PROPERTIES, COMPANY } from '@/lib/data/site'

function Section({ title, children, id }) {
  return (
    <div id={id} className="mt-10 scroll-mt-28">
      <h2 className="font-display text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const p = getProperty(id)
  const [active, setActive] = useState(0)
  const [lbImages, setLbImages] = useState([])
  const [lbIndex, setLbIndex] = useState(null)

  const similar = useMemo(() => PROPERTIES.filter((x) => x.id !== id).slice(0, 3), [id])

  const openLightbox = (images, i) => { setLbImages(images); setLbIndex(i) }

  if (!p) {
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

  const floorPlanImages = p.floorPlans.map((fp) => fp.image)
  const specs = [
    { icon: BedDouble, label: 'Configuration', value: p.bhk },
    { icon: Bath, label: 'Bathrooms', value: `${p.bathrooms}` },
    { icon: Maximize, label: 'Area', value: p.area },
    { icon: Building2, label: 'Type', value: p.category },
    { icon: Clock, label: 'Possession', value: p.possession },
    { icon: Tag, label: 'Status', value: p.status },
  ]
  const nearbyTabs = [
    { key: 'schools', label: 'Schools', icon: GraduationCap, list: p.nearby.schools },
    { key: 'hospitals', label: 'Hospitals', icon: Stethoscope, list: p.nearby.hospitals },
    { key: 'metro', label: 'Metro', icon: TrainFront, list: p.nearby.metro },
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
            <motion.button
              onClick={() => openLightbox(p.gallery, active)}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl h-[300px] md:h-[480px] lg:col-span-2"
            >
              <img src={p.gallery[active]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-5 top-5 rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white shadow-glow">{p.tag}</span>
              <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Expand className="h-4 w-4" /> View Fullscreen
              </span>
            </motion.button>
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
              {p.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden rounded-2xl h-24 lg:h-[149px] ring-2 transition-all ${active === i ? 'ring-brand' : 'ring-transparent hover:ring-brand-200'}`}
                >
                  <img src={img} alt={`${p.name} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                  {i === p.gallery.length - 1 && p.gallery.length > 3 && (
                    <span className="absolute inset-0 grid place-items-center bg-black/50 text-sm font-semibold text-white">+ More</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => openLightbox(p.gallery, 0)}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            <Images className="h-4 w-4" /> View all {p.gallery.length} photos
          </button>

          {/* Body */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Title */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-extrabold text-ink">{p.name}</h1>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-ink-soft"><Building2 className="h-4 w-4 text-brand" /> by {p.builder}</p>
                  <p className="mt-2 flex items-center gap-2 text-ink-light"><MapPin className="h-5 w-5 text-brand" /> {p.location}</p>
                  {p.rera && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      <BadgeCheck className="h-4 w-4" /> RERA {p.rera}
                    </p>
                  )}
                </div>
                <div className="rounded-2xl bg-brand-50 px-6 py-3 text-right">
                  <p className="font-display text-3xl font-extrabold text-brand-600">{p.price}</p>
                  <p className="text-xs text-ink-soft">{p.priceNote}</p>
                </div>
              </div>

              {/* Quick specs */}
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
              <Section title="Project Overview">
                <p className="text-ink-light leading-relaxed">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {p.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
                      <CheckCircle2 className="h-4 w-4" /> {h}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Price Table */}
              <Section title="Price Table">
                <div className="overflow-hidden rounded-2xl ring-1 ring-slate-100">
                  <div className="grid grid-cols-3 bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white/80">
                    <span>Configuration</span><span>Area</span><span className="text-right">Price</span>
                  </div>
                  {p.priceTable.map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 px-5 py-4 text-sm ${i % 2 ? 'bg-surface' : 'bg-white'}`}>
                      <span className="font-semibold text-ink">{row.name}</span>
                      <span className="text-ink-light">{row.area}</span>
                      <span className="text-right font-bold text-brand-600">{row.price}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-ink-soft">*Prices are indicative and exclusive of applicable taxes & charges.</p>
              </Section>

              {/* Floor Plans */}
              <Section title="Floor Plans">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {p.floorPlans.map((fp, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
                      <button onClick={() => openLightbox(floorPlanImages, i)} className="group relative block h-40 w-full overflow-hidden">
                        <img src={fp.image} alt={`${fp.name} floor plan`} loading="lazy" className="h-full w-full object-cover blur-[1px] brightness-95 transition-transform group-hover:scale-105" />
                        <span className="absolute inset-0 grid place-items-center bg-ink/40 text-sm font-semibold text-white">
                          <span className="inline-flex items-center gap-1.5"><LayoutPanelTop className="h-4 w-4" /> View Plan</span>
                        </span>
                      </button>
                      <div className="p-4">
                        <p className="font-display font-bold text-ink">{fp.name}</p>
                        <p className="text-sm text-ink-soft">{fp.area}</p>
                        <p className="mt-1 font-semibold text-brand-600">{fp.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Amenities */}
              <Section title="Amenities">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {p.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-slate-100">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                      <span className="text-sm font-medium text-ink-light">{a}</span>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Specifications */}
              <Section title="Project Specifications">
                <div className="grid gap-4 md:grid-cols-2">
                  {p.specifications.map((s) => (
                    <div key={s.category} className="rounded-2xl bg-white p-5 ring-1 ring-slate-100">
                      <p className="font-display font-bold text-ink">{s.category}</p>
                      <ul className="mt-2 space-y-1.5">
                        {s.items.map((it) => (
                          <li key={it} className="flex items-start gap-2 text-sm text-ink-light">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Video */}
              {p.videos.length > 0 && (
                <Section title="Video Walkthrough">
                  <div className="aspect-video overflow-hidden rounded-3xl bg-ink ring-1 ring-slate-100">
                    {p.videos[0].includes('youtube.com') || p.videos[0].includes('youtu.be') ? (
                      <iframe title={`${p.name} video`} src={p.videos[0]} className="h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
                    ) : (
                      <video src={p.videos[0]} controls playsInline className="h-full w-full object-cover" />
                    )}
                  </div>
                </Section>
              )}

              {/* Master Plan */}
              <Section title="Master Plan">
                <button onClick={() => openLightbox([p.masterPlan], 0)} className="group relative block w-full overflow-hidden rounded-3xl ring-1 ring-slate-100">
                  <img src={p.masterPlan} alt={`${p.name} master plan`} loading="lazy" className="h-72 w-full object-cover transition-transform group-hover:scale-105" />
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur"><Expand className="h-4 w-4" /> Enlarge</span>
                </button>
              </Section>

              {/* Location & Nearby */}
              <Section title="Location & Connectivity">
                <div className="overflow-hidden rounded-3xl h-[320px] ring-1 ring-slate-100">
                  <iframe
                    title={`${p.name} location`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(p.location)}&output=embed`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-6">
                  <Tabs defaultValue="schools">
                    <TabsList className="rounded-full bg-surface p-1">
                      {nearbyTabs.map((t) => (
                        <TabsTrigger key={t.key} value={t.key} className="rounded-full data-[state=active]:bg-brand data-[state=active]:text-white">
                          <t.icon className="mr-1.5 h-4 w-4" /> {t.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {nearbyTabs.map((t) => (
                      <TabsContent key={t.key} value={t.key} className="mt-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {t.list.map((n) => (
                            <div key={n.name} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-slate-100">
                              <span className="flex items-center gap-2 text-sm font-medium text-ink"><t.icon className="h-4 w-4 text-brand" /> {n.name}</span>
                              <span className="text-sm font-semibold text-brand-600">{n.dist}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </Section>

              {/* RERA Details */}
              <Section title="RERA Details">
                <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600"><BadgeCheck className="h-7 w-7" /></span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-ink-soft">RERA Registration Number</p>
                      <p className="font-display text-lg font-bold text-ink">{p.rera}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                    <CheckCircle2 className="h-4 w-4" /> Verified & Registered
                  </span>
                </div>
              </Section>

              {/* FAQs */}
              <Section title="Frequently Asked Questions">
                <Accordion type="single" collapsible className="rounded-2xl bg-white px-5 ring-1 ring-slate-100">
                  {p.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left font-semibold text-ink hover:no-underline">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-ink-light leading-relaxed">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Section>
            </div>

            {/* Sticky Inquiry Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PropertyInquiry property={p} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
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
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((sp) => <PropertyCard key={sp.id} property={sp} />)}
          </div>
        </div>
      </section>

      <Lightbox images={lbImages} index={lbIndex} onChange={setLbIndex} onClose={() => setLbIndex(null)} />

      <Footer />
    </div>
  )
}
