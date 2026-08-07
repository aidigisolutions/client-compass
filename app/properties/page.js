'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, LayoutGrid, List, X, RotateCcw } from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { PageBanner } from '@/components/site/PageBanner'
import { PropertyCard } from '@/components/site/PropertyCard'
import { StaggerContainer, StaggerItem } from '@/components/site/Reveal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  PROPERTIES, HERO_IMAGE, LOCATIONS, PROPERTY_TYPES, BUDGETS, BHK_OPTIONS,
  STATUS_OPTIONS, SORT_OPTIONS,
} from '@/lib/data/site'

const ANY = 'any'

function budgetMatch(pv, budget) {
  if (budget === 'Under \u20b91 Cr') return pv < 10000000
  if (budget === '\u20b91 Cr - \u20b92 Cr') return pv >= 10000000 && pv < 20000000
  if (budget === '\u20b92 Cr - \u20b93 Cr') return pv >= 20000000 && pv < 30000000
  if (budget === '\u20b93 Cr+') return pv >= 30000000
  return true
}

function FilterPanel({ f, set, reset }) {
  const Chip = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? 'border-brand bg-brand text-white shadow-glow' : 'border-slate-200 text-ink-light hover:border-brand-200'
      }`}
    >
      {children}
    </button>
  )

  const Field = ({ label, value, onChange, options, placeholder }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-surface font-medium">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ANY}>{placeholder}</SelectItem>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Looking to</label>
        <div className="flex flex-wrap gap-2">
          {['All', 'Buy', 'Rent'].map((t) => (
            <Chip key={t} active={f.type === t} onClick={() => set('type', t)}>{t === 'Buy' ? 'Buy' : t === 'Rent' ? 'Rent' : 'All'}</Chip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Category</label>
        <div className="flex flex-wrap gap-2">
          {['All', 'Residential', 'Commercial'].map((s) => (
            <Chip key={s} active={f.segment === s} onClick={() => set('segment', s)}>{s}</Chip>
          ))}
        </div>
      </div>

      <Field label="City" value={f.city} onChange={(v) => set('city', v)} options={LOCATIONS} placeholder="All Cities" />
      <Field label="Property Type" value={f.category} onChange={(v) => set('category', v)} options={PROPERTY_TYPES} placeholder="All Types" />
      <Field label="BHK" value={f.bhk} onChange={(v) => set('bhk', v)} options={BHK_OPTIONS} placeholder="Any BHK" />
      <Field label="Budget Range" value={f.budget} onChange={(v) => set('budget', v)} options={BUDGETS} placeholder="Any Budget" />

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Possession Status</label>
        <div className="flex flex-wrap gap-2">
          <Chip active={f.status === 'All'} onClick={() => set('status', 'All')}>All</Chip>
          {STATUS_OPTIONS.map((s) => (
            <Chip key={s} active={f.status === s} onClick={() => set('status', s)}>{s}</Chip>
          ))}
        </div>
      </div>

      <Button onClick={reset} variant="outline" className="w-full rounded-full border-slate-200 font-semibold">
        <RotateCcw className="mr-2 h-4 w-4" /> Reset Filters
      </Button>
    </div>
  )
}

function PropertiesInner() {
  const params = useSearchParams()
  const initialType = params.get('type')
  const initialLocation = params.get('location') || ''

  const [f, setF] = useState({
    type: ['Buy', 'Rent'].includes(initialType) ? initialType : 'All',
    segment: 'All',
    city: initialLocation && LOCATIONS.includes(initialLocation) ? initialLocation : ANY,
    category: ANY,
    bhk: params.get('bhk') && BHK_OPTIONS.includes(params.get('bhk')) ? params.get('bhk') : ANY,
    budget: ANY,
    status: 'All',
  })
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [view, setView] = useState('grid')

  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }))
  const reset = () => { setF({ type: 'All', segment: 'All', city: ANY, category: ANY, bhk: ANY, budget: ANY, status: 'All' }); setQuery('') }

  const results = useMemo(() => {
    let list = PROPERTIES.filter((p) => {
      if (f.type !== 'All' && p.type !== f.type) return false
      if (f.segment === 'Commercial' && p.category !== 'Commercial') return false
      if (f.segment === 'Residential' && p.category === 'Commercial') return false
      if (f.city !== ANY && p.city !== f.city) return false
      if (f.category !== ANY && p.category !== f.category) return false
      if (f.bhk !== ANY && p.bhk !== f.bhk) return false
      if (f.budget !== ANY && !budgetMatch(p.priceValue, f.budget)) return false
      if (f.status !== 'All' && p.status !== f.status) return false
      const q = query.trim().toLowerCase()
      if (q && !(p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.city.toLowerCase().includes(q))) return false
      return true
    })
    list = [...list]
    if (sort === 'newest') list.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate))
    else if (sort === 'price-asc') list.sort((a, b) => a.priceValue - b.priceValue)
    else if (sort === 'price-desc') list.sort((a, b) => b.priceValue - a.priceValue)
    else list.sort((a, b) => (b.featured === true) - (a.featured === true))
    return list
  }, [f, query, sort])

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        {/* Top bar */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-card ring-1 ring-slate-100 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-surface px-4">
            <Search className="h-4 w-4 text-ink-soft" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by project, city or location..." className="border-0 bg-transparent px-1 shadow-none focus-visible:ring-0" />
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-full border-slate-200 font-semibold lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] overflow-y-auto p-6">
                <SheetTitle className="mb-4 font-display text-xl font-bold">Filters</SheetTitle>
                <FilterPanel f={f} set={set} reset={reset} />
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-11 w-[180px] rounded-full border-slate-200 font-medium">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>

            <div className="hidden items-center gap-1 rounded-full bg-surface p-1 sm:flex">
              <button onClick={() => setView('grid')} aria-label="Grid view" className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${view === 'grid' ? 'bg-brand text-white' : 'text-ink-soft hover:text-brand'}`}><LayoutGrid className="h-4.5 w-4.5" /></button>
              <button onClick={() => setView('list')} aria-label="List view" className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${view === 'list' ? 'bg-brand text-white' : 'text-ink-soft hover:text-brand'}`}><List className="h-4.5 w-4.5" /></button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-100">
              <div className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink">
                <SlidersHorizontal className="h-5 w-5 text-brand" /> Filters
              </div>
              <FilterPanel f={f} set={set} reset={reset} />
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <p className="mb-6 text-ink-soft">
              Showing <span className="font-semibold text-ink">{results.length}</span> propert{results.length === 1 ? 'y' : 'ies'}
            </p>

            {results.length > 0 ? (
              <StaggerContainer className={view === 'grid' ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3' : 'flex flex-col gap-6'}>
                {results.map((p, i) => (
                  <StaggerItem key={p.id}>
                    <PropertyCard property={p} view={view} priority={i < 3} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="rounded-3xl bg-white p-16 text-center shadow-card">
                <p className="font-display text-xl font-bold text-ink">No properties match your filters</p>
                <p className="mt-2 text-ink-light">Try adjusting your search or reset all filters.</p>
                <Button onClick={reset} className="mt-6 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold">Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <PageBanner
        crumb="Properties"
        title="Explore Our Properties"
        subtitle="Browse premium residential and commercial projects with advanced filters, sorting and grid or list views."
        image={HERO_IMAGE}
      />
      <Suspense fallback={<div className="container py-20 text-center text-ink-soft">Loading properties...</div>}>
        <PropertiesInner />
      </Suspense>
      <Footer />
    </div>
  )
}
