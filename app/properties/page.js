'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { PageBanner } from '@/components/site/PageBanner'
import { PropertyCard } from '@/components/site/PropertyCard'
import { StaggerContainer, StaggerItem } from '@/components/site/Reveal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PROPERTIES, HERO_IMAGE } from '@/lib/data/site'

const TYPE_TABS = ['All', 'Buy', 'Rent']
const CATEGORIES = ['All', 'Apartment', 'Villa', 'Commercial']

function PropertiesInner() {
  const params = useSearchParams()
  const initialType = params.get('type') || 'All'
  const locationParam = params.get('location') || ''

  const [type, setType] = useState(TYPE_TABS.includes(initialType) ? initialType : 'All')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState(locationParam)

  const results = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const matchType = type === 'All' || p.type === type
      const matchCat = category === 'All' || p.category === category
      const q = query.trim().toLowerCase()
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      return matchType && matchCat && matchQuery
    })
  }, [type, category, query])

  return (
    <>
      {/* Filter bar */}
      <section className="sticky top-[68px] z-30 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="container py-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 rounded-full bg-surface p-1">
            {TYPE_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  type === t ? 'bg-brand text-white shadow-glow' : 'text-ink-light hover:text-brand-600'
                }`}
              >
                {t === 'Buy' ? 'For Sale' : t === 'Rent' ? 'For Rent' : 'All'}
              </button>
            ))}
          </div>

          <div className="flex flex-1 lg:max-w-md items-center gap-2 rounded-full border border-slate-200 bg-surface px-4">
            <Search className="h-4 w-4 text-ink-soft" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, city or location..."
              className="border-0 bg-transparent focus-visible:ring-0 shadow-none px-1"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <SlidersHorizontal className="h-4 w-4 text-ink-soft shrink-0" />
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === c
                    ? 'border-brand bg-brand-50 text-brand-700'
                    : 'border-slate-200 text-ink-light hover:border-brand-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container">
          <p className="mb-8 text-ink-soft">
            Showing <span className="font-semibold text-ink">{results.length}</span> propert{results.length === 1 ? 'y' : 'ies'}
          </p>

          {results.length > 0 ? (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <StaggerItem key={p.id}>
                  <PropertyCard property={p} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="rounded-3xl bg-white p-16 text-center shadow-card">
              <p className="font-display text-xl font-bold text-ink">No properties match your filters</p>
              <p className="mt-2 text-ink-light">Try adjusting your search or explore all available listings.</p>
              <Button
                onClick={() => { setType('All'); setCategory('All'); setQuery('') }}
                className="mt-6 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <PageBanner
        crumb="Properties"
        title="Explore Our Properties"
        subtitle="Browse premium residential and commercial spaces curated for every lifestyle and investment goal."
        image={HERO_IMAGE}
      />
      <Suspense fallback={<div className="container py-20 text-center text-ink-soft">Loading properties...</div>}>
        <PropertiesInner />
      </Suspense>
      <Footer />
    </div>
  )
}
