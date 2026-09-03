'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Home, Wallet, BedDouble } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LOCATIONS, PROPERTY_TYPES, BUDGETS, BHK_OPTIONS } from '@/lib/data/site'

export function SearchBar() {
  const router = useRouter()
  const [filters, setFilters] = useState({ location: '', type: '', budget: '', bhk: '' })

  const update = (key, val) => setFilters((f) => ({ ...f, [key]: val }))

  const onSearch = () => {
    const params = new URLSearchParams()
    if (filters.location) params.set('location', filters.location)
    if (filters.bhk) params.set('bhk', filters.bhk)
    router.push(`/properties?${params.toString()}`)
  }

  const fields = [
    { key: 'location', label: 'Location', icon: MapPin, options: LOCATIONS, placeholder: 'Select city' },
    { key: 'type', label: 'Property Type', icon: Home, options: PROPERTY_TYPES, placeholder: 'Any type' },
    { key: 'budget', label: 'Budget', icon: Wallet, options: BUDGETS, placeholder: 'Any budget' },
    { key: 'bhk', label: 'BHK', icon: BedDouble, options: BHK_OPTIONS, placeholder: 'Any BHK' },
  ]

  return (
    <div className="rounded-3xl bg-white/95 backdrop-blur-xl p-4 md:p-5 shadow-premium ring-1 ring-white/40">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-1.5 text-left">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft uppercase tracking-wide">
              <f.icon className="h-3.5 w-3.5 text-brand" /> {f.label}
            </label>
            <Select value={filters[f.key]} onValueChange={(v) => update(f.key, v)}>
              <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-surface text-ink font-medium focus:ring-brand">
                <SelectValue placeholder={f.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {f.options.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        <div className="flex flex-col justify-end">
          <Button
            onClick={onSearch}
            className="h-12 w-full rounded-xl bg-brand hover:bg-brand-600 text-white font-semibold text-base shadow-glow"
          >
            <Search className="mr-2 h-5 w-5" /> Search
          </Button>
        </div>
      </div>
    </div>
  )
}
