'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, BedDouble, Bath, Maximize, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PropertyCard({ property }) {
  const p = property
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-100"
    >
      <Link href={`/properties/${p.id}`} className="block relative overflow-hidden">
        <div className="relative h-60 w-full overflow-hidden">
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-glow">
          {p.tag}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-ink">
          {p.status}
        </span>
      </Link>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold text-ink leading-snug">{p.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
              <MapPin className="h-4 w-4 text-brand" /> {p.location}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-display text-2xl font-extrabold text-brand-600">{p.price}</p>
            <p className="text-xs text-ink-soft">{p.priceNote}</p>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{p.category}</span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <BedDouble className="h-5 w-5 text-brand" />
            <span className="text-xs font-medium text-ink-light">{p.bhk}</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-slate-100">
            <Bath className="h-5 w-5 text-brand" />
            <span className="text-xs font-medium text-ink-light">{p.bathrooms} Baths</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Maximize className="h-5 w-5 text-brand" />
            <span className="text-xs font-medium text-ink-light">{p.area}</span>
          </div>
        </div>

        <Button asChild variant="outline" className="mt-5 w-full rounded-full border-brand-200 text-brand-700 hover:bg-brand hover:text-white hover:border-brand font-semibold group/btn">
          <Link href={`/properties/${p.id}`}>
            View Details
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.article>
  )
}
