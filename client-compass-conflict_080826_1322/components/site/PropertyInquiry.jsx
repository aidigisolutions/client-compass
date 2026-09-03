'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarCheck, MessageCircle, Phone, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { COMPANY, propertyWhatsApp } from '@/lib/data/site'

export function PropertyInquiry({ property }) {
  const p = property
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', mobile: '', email: '', project: p.name })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-100">
      <h3 className="font-display text-xl font-bold text-ink">Enquire about this project</h3>
      <p className="mt-1 text-sm text-ink-light">Get a callback & full details within minutes.</p>

      {sent ? (
        <div className="mt-5 rounded-2xl bg-brand-50 p-5 text-center">
          <CheckCircle2 className="mx-auto h-9 w-9 text-brand" />
          <p className="mt-2 font-semibold text-ink">Thank you, {form.name || 'there'}!</p>
          <p className="mt-1 text-sm text-ink-light">Our expert will call you shortly about {form.project}.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="mt-5 space-y-3">
          <Input required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full Name" className="h-11 rounded-xl" />
          <Input required value={form.mobile} onChange={(e) => set('mobile', e.target.value)} placeholder="Mobile Number" className="h-11 rounded-xl" />
          <Input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="Email Address" className="h-11 rounded-xl" />
          <Input value={form.project} onChange={(e) => set('project', e.target.value)} placeholder="Interested Project" className="h-11 rounded-xl bg-surface" />
          <Button type="submit" className="w-full rounded-full bg-brand hover:bg-brand-600 text-white font-semibold h-11">Get Details</Button>
        </form>
      )}

      <div className="mt-4 space-y-2">
        <Button asChild variant="outline" className="w-full rounded-full border-brand-200 text-brand-700 font-semibold h-11 hover:bg-brand-50">
          <Link href={`/book-visit?property=${encodeURIComponent(p.name)}`}><CalendarCheck className="mr-2 h-4 w-4" /> Book Site Visit</Link>
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <a href={propertyWhatsApp(p)} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#25D366' }}>
            <MessageCircle className="h-4 w-4" fill="currentColor" /> WhatsApp
          </a>
          <a href={COMPANY.phoneHref} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white transition-colors hover:bg-ink-light">
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-surface p-4 text-center">
        <p className="text-xs uppercase tracking-wide text-ink-soft">RERA Registered</p>
        <p className="mt-1 text-sm font-semibold text-ink">{p.rera}</p>
      </div>
    </div>
  )
}
