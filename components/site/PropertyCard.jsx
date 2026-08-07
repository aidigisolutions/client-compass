'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, BedDouble, Bath, Maximize, ArrowRight, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PropertyCard({ property, priority = false }) {
  const p = property
  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-premium hover:ring-brand-100"
    >
      <Link href={`/properties/${p.id}`} className="block relative overflow-hidden">
        <div className="relative h-52 sm:h-60 w-full overflow-hidden">
          <img
            src={p.image}
            alt={`${p.name} — ${p.bhk} in ${p.location}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-glow">
          {p.tag}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-ink">
          {p.status}
        </span>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <p className="font-display text-2xl font-extrabold drop-shadow-md">{p.price}</p>
            <p className="text-xs text-white/80">{p.priceNote}</p>
          </div>
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-700">{p.category}</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug transition-colors group-hover:text-brand-600">
          {p.name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft">
          <MapPin className="h-4 w-4 shrink-0 text-brand" /> {p.location}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-surface p-3 text-center">
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

        {p.rera && (
          <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-ink-soft">
            <BadgeCheck className="h-3.5 w-3.5 text-brand" /> RERA: {p.rera}
          </p>
        )}

        <Button
          asChild
          className="mt-5 w-full rounded-full bg-brand text-white font-semibold shadow-glow transition-all hover:bg-brand-600 hover:shadow-lg group/btn"
        >
          <Link href={`/properties/${p.id}`}>
            View Details
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.article>
  )
}
