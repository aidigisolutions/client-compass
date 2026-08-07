'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Award, ShieldCheck, MapPin, Landmark, IndianRupee, HeartHandshake,
  Star, ArrowRight, CalendarCheck, Phone, Mail, Quote, Sparkles,
} from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { PropertyCard } from '@/components/site/PropertyCard'
import { SearchBar } from '@/components/site/SearchBar'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import {
  PROPERTIES, FEATURES, TESTIMONIALS, STATS, HERO_IMAGE, COMPANY,
} from '@/lib/data/site'

const ICONS = { Award, ShieldCheck, MapPin, Landmark, IndianRupee, HeartHandshake }

function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-tight text-ink text-balance">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-ink-light leading-relaxed">{subtitle}</p>}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Luxury apartment building" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
              India&apos;s Trusted Real Estate Developer Since {COMPANY.founded}
            </span>

            <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white text-balance">
              Find Your Dream Home with{' '}
              <span className="text-brand">ARG Buildtech</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
              Discover premium residential and commercial properties at the best locations across India&apos;s fastest-growing cities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-brand hover:bg-brand-600 text-white font-semibold text-base h-13 px-7 shadow-glow">
                <Link href="/properties">
                  Explore Properties <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white hover:text-ink font-semibold text-base h-13 px-7">
                <Link href="/book-visit">
                  <CalendarCheck className="mr-2 h-5 w-5" /> Book Site Visit
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 max-w-5xl"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-20 -mt-10">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl bg-white p-6 md:p-8 shadow-premium ring-1 ring-slate-100">
            {STATS.map((s, i) => (
              <div key={i} className={`text-center ${i < 3 ? 'lg:border-r border-slate-100' : ''}`}>
                <p className="font-display text-3xl md:text-4xl font-extrabold text-brand">{s.value}</p>
                <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Featured Projects"
              title="Handpicked Premium Properties"
              subtitle="Explore our exclusive collection of residences and commercial spaces, each crafted for a distinguished lifestyle."
            />
          </Reveal>

          <StaggerContainer className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PROPERTIES.map((p) => (
              <StaggerItem key={p.id}>
                <PropertyCard property={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.1}>
            <div className="mt-14 text-center">
              <Button asChild size="lg" className="rounded-full bg-ink hover:bg-ink-light text-white font-semibold h-13 px-8">
                <Link href="/properties">
                  View All Properties <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="The ARG Buildtech Advantage"
              subtitle="Fifteen years of trust, transparency and craftsmanship behind every home we deliver."
            />
          </Reveal>

          <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = ICONS[f.icon]
              return (
                <StaggerItem key={f.title}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group h-full rounded-3xl bg-surface p-8 ring-1 ring-slate-100 transition-shadow hover:shadow-card"
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-glow transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold text-ink">{f.title}</h3>
                    <p className="mt-2 text-ink-light leading-relaxed">{f.desc}</p>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Testimonials"
              title="Loved by Homeowners Across India"
              subtitle="Real stories from families and investors who found their perfect space with ARG Buildtech."
            />
          </Reveal>

          <StaggerContainer className="mt-14 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <div className="relative h-full rounded-3xl bg-white p-8 shadow-card ring-1 ring-slate-100">
                  <Quote className="absolute right-6 top-6 h-12 w-12 text-brand-100" />
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-brand text-brand" />
                    ))}
                  </div>
                  <p className="mt-5 text-ink-light leading-relaxed relative z-10">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white font-display font-bold">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-ink-soft">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* BOOK SITE VISIT CTA */}
      <section className="py-16">
        <div className="container">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-16 md:px-16 md:py-20">
              <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl text-center lg:text-left">
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white text-balance">
                    Ready to see your future home in person?
                  </h2>
                  <p className="mt-4 text-white/70 text-lg">
                    Schedule a free, no-obligation site visit with our property experts and experience the ARG difference firsthand.
                  </p>
                </div>
                <Button asChild size="lg" className="rounded-full bg-brand hover:bg-brand-600 text-white font-semibold text-base h-14 px-9 shadow-glow shrink-0">
                  <Link href="/book-visit">
                    <CalendarCheck className="mr-2 h-5 w-5" /> Book Your Site Visit
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Contact Us"
                  title="Let's Find Your Perfect Property"
                  subtitle="Reach out to our team &mdash; we are here to answer every question and guide you home."
                  center={false}
                />
                <div className="mt-10 space-y-5">
                  {[
                    { icon: Phone, label: 'Call Us', value: COMPANY.phone, href: COMPANY.phoneHref },
                    { icon: Mail, label: 'Email Us', value: COMPANY.email, href: COMPANY.emailHref },
                    { icon: MapPin, label: 'Visit Office', value: COMPANY.address, href: '#map' },
                  ].map((c) => (
                    <a key={c.label} href={c.href} className="flex items-start gap-4 group">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand group-hover:text-white">
                        <c.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{c.label}</p>
                        <p className="mt-1 font-medium text-ink">{c.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full bg-brand hover:bg-brand-600 text-white font-semibold">
                    <Link href="/contact">Send a Message</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-slate-200 font-semibold">
                    <Link href="/book-visit">Book Site Visit</Link>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div id="map" className="relative overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-100 h-[420px]">
                <iframe
                  title="ARG Buildtech Office Location"
                  src="https://www.google.com/maps?q=Sector%2062%20Noida&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
