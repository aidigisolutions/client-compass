'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Target, Eye, Gem, ShieldCheck, Users, Building2, ArrowRight, CalendarCheck, CheckCircle2,
} from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { PageBanner } from '@/components/site/PageBanner'
import { Reveal, StaggerContainer, StaggerItem } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { COMPANY, STATS } from '@/lib/data/site'

const VALUES = [
  { icon: Gem, title: 'Uncompromising Quality', desc: 'We build with premium materials and precision engineering, ensuring every home stands the test of time.' },
  { icon: ShieldCheck, title: 'Absolute Transparency', desc: 'Clear pricing, honest timelines and RERA-compliant documentation on every single project.' },
  { icon: Users, title: 'Customer First', desc: 'From your first enquiry to handover and beyond, our dedicated team stays by your side.' },
]

const MILESTONES = [
  { year: '2009', text: 'ARG Buildtech founded in Noida with a vision to redefine urban living.' },
  { year: '2014', text: 'Delivered our first landmark residential township, home to 500+ families.' },
  { year: '2019', text: 'Expanded to 4 metro cities with premium residential & commercial launches.' },
  { year: '2025', text: '48 projects delivered, 5,000+ happy families across 6 cities.' },
]

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDB8fHx8MTc4NjA4NjAzNnww&ixlib=rb-4.1.0&q=85'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <PageBanner
        crumb="About Us"
        title="Building Trust, One Home at a Time"
        subtitle="For over 15 years, ARG Buildtech has been crafting premium living and working spaces that families and businesses are proud to call their own."
        image={ABOUT_IMAGE}
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-14 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-premium">
                <img src={ABOUT_IMAGE} alt="ARG Buildtech project" className="h-[460px] w-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -right-4 md:right-8 rounded-3xl bg-brand px-8 py-6 text-white shadow-glow">
                <p className="font-display text-4xl font-extrabold">15+</p>
                <p className="text-sm text-white/90">Years of Excellence</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700">
                Our Story
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-extrabold text-ink text-balance">
                A legacy of landmark developments
              </h2>
              <p className="mt-5 text-ink-light leading-relaxed">
                Founded in {COMPANY.founded}, ARG Buildtech began with a simple belief — that every family deserves a home built with integrity and care. What started as a single residential project in Noida has grown into one of India&apos;s most trusted names in premium real estate.
              </p>
              <p className="mt-4 text-ink-light leading-relaxed">
                Today, we develop residential and commercial spaces across six cities, combining architectural excellence, sustainable design and unwavering transparency. Every ARG address is a promise kept.
              </p>
              <ul className="mt-6 space-y-3">
                {['RERA-registered projects', 'On-time delivery guarantee', 'End-to-end home loan assistance'].map((li) => (
                  <li key={li} className="flex items-center gap-3 text-ink">
                    <CheckCircle2 className="h-5 w-5 text-brand" /> {li}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold">
                <Link href="/properties">Explore Our Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-8">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl bg-ink p-8 md:p-10">
            {STATS.map((s, i) => (
              <div key={i} className={`text-center ${i < 3 ? 'lg:border-r border-white/10' : ''}`}>
                <p className="font-display text-3xl md:text-4xl font-extrabold text-brand">{s.value}</p>
                <p className="mt-1 text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-24">
        <div className="container grid gap-8 md:grid-cols-2">
          {[
            { icon: Target, title: 'Our Mission', text: 'To create thoughtfully designed, high-quality living and working spaces that enrich lives — delivered with honesty, on time, every time.' },
            { icon: Eye, title: 'Our Vision', text: 'To be India’s most trusted real estate developer, setting new benchmarks in design, sustainability and customer delight.' },
          ].map((m) => (
            <Reveal key={m.title}>
              <div className="h-full rounded-3xl bg-white p-10 shadow-card ring-1 ring-slate-100">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-glow">
                  <m.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink">{m.title}</h3>
                <p className="mt-3 text-ink-light leading-relaxed">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700">Our Values</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-extrabold text-ink">What we stand for</h2>
            </div>
          </Reveal>
          <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-3xl bg-surface p-8 ring-1 ring-slate-100">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-ink-light leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-24">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700">Our Journey</span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-extrabold text-ink">Milestones that shaped us</h2>
            </div>
          </Reveal>
          <div className="mt-12 relative border-l-2 border-brand-100 pl-8 space-y-10">
            {MILESTONES.map((m) => (
              <Reveal key={m.year}>
                <div className="relative">
                  <span className="absolute -left-[41px] grid h-6 w-6 place-items-center rounded-full bg-brand ring-4 ring-brand-100">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <p className="font-display text-2xl font-extrabold text-brand">{m.year}</p>
                  <p className="mt-1 text-ink-light">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand px-8 py-14 text-center md:py-16">
            <Building2 className="absolute -right-6 -top-6 h-40 w-40 text-white/10" />
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">Let&apos;s build your future together</h2>
            <p className="mt-3 text-white/90 max-w-xl mx-auto">Book a site visit and discover why thousands of families trust ARG Buildtech.</p>
            <Button asChild size="lg" className="mt-8 rounded-full bg-white text-brand-600 hover:bg-white/90 font-semibold h-13 px-8">
              <Link href="/book-visit"><CalendarCheck className="mr-2 h-5 w-5" /> Book Site Visit</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
