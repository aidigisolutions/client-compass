'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, BedDouble, Bath, Maximize, ArrowRight, BadgeCheck, CalendarCheck, MessageCircle, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { propertyWhatsApp } from '@/lib/data/site'

function Actions({ p, compact }) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Button asChild className="w-full rounded-full bg-brand text-white font-semibold shadow-glow transition-all hover:bg-brand-600 hover:shadow-lg group/btn">
        <Link href={`/properties/${p.id}`}>
          View Details
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="outline" className="rounded-full border-brand-200 text-brand-700 font-semibold hover:bg-brand-50">
          <Link href={`/book-visit?property=${encodeURIComponent(p.name)}`}>
            <CalendarCheck className="mr-1 h-4 w-4" /> {compact ? 'Visit' : 'Book Visit'}
          </Link>
        </Button>
        <a
          href={propertyWhatsApp(p)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 rounded-full px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle className="h-4 w-4" fill="currentColor" /> WhatsApp
        </a>
      </div>
    </div>
  )
}

function Specs({ p }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-surface p-3 text-center">
      <div className="flex flex-col items-center gap-1">
        <BedDouble className="h-5 w-5 text-brand" />
        <span className="text-xs font-semibold text-ink-light">{p.bhk}</span>
      </div>
      <div className="flex flex-col items-center gap-1 border-x border-slate-200/70">
        <Bath className="h-5 w-5 text-brand" />
        <span className="text-xs font-semibold text-ink-light">{p.bathrooms} Bath</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Maximize className="h-5 w-5 text-brand" />
        <span className="text-xs font-semibold text-ink-light">{p.area}</span>
      </div>
    </div>
  )
}

function Media({ p, priority, className }) {
  return (
    <Link href={`/properties/${p.id}`} className={`relative block overflow-hidden ${className}`}>
      <img
        src={p.image}
        alt={`${p.name} — ${p.bhk} in ${p.location}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.1]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent opacity-85" />
      <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-glow">{p.tag}</span>
      <span className="absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-ink">{p.status}</span>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
        <div>
          <p className="font-display text-2xl font-extrabold drop-shadow-md">{p.price}</p>
          <p className="text-xs text-white/80">{p.priceNote}</p>
        </div>
        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-700">{p.category}</span>
      </div>
    </Link>
  )
}

export function PropertyCard({ property, view = 'grid', priority = false }) {
  const p = property

  if (view === 'list') {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-100 transition-shadow hover:shadow-premium hover:ring-brand-100 md:flex-row"
      >
        <Media p={p} priority={priority} className="h-56 w-full md:h-auto md:w-2/5" />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-brand-600">{p.name}</h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-ink-soft"><Building2 className="h-3.5 w-3.5 text-brand" /> by {p.builder}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-xl font-extrabold text-brand-600">{p.price}</p>
              <p className="text-[11px] text-ink-soft">{p.priceNote}</p>
            </div>
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft"><MapPin className="h-4 w-4 shrink-0 text-brand" /> {p.location}</p>
          <p className="mt-3 text-sm text-ink-light line-clamp-2">{p.shortDescription}</p>
          <Specs p={p} />
          {p.rera && <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-ink-soft"><BadgeCheck className="h-3.5 w-3.5 text-brand" /> RERA: {p.rera}</p>}
          <Actions p={p} />
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-premium hover:ring-brand-100"
    >
      <Media p={p} priority={priority} className="h-52 w-full sm:h-60" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug transition-colors group-hover:text-brand-600">
          <Link href={`/properties/${p.id}`}>{p.name}</Link>
        </h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-ink-soft"><Building2 className="h-3.5 w-3.5 text-brand" /> by {p.builder}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft"><MapPin className="h-4 w-4 shrink-0 text-brand" /> {p.location}</p>
        <p className="mt-3 text-sm text-ink-light line-clamp-2">{p.shortDescription}</p>
        <Specs p={p} />
        {p.rera && <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-ink-soft"><BadgeCheck className="h-3.5 w-3.5 text-brand" /> RERA: {p.rera}</p>}
        <div className="mt-auto"><Actions p={p} /></div>
      </div>
    </motion.article>
  )
}
