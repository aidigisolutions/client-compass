'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CalendarCheck, CheckCircle2, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { PageBanner } from '@/components/site/PageBanner'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PROPERTIES, COMPANY } from '@/lib/data/site'

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '04:30 PM', '06:00 PM']

function BookVisitInner() {
  const params = useSearchParams()
  const preselected = params.get('property') || ''
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '', property: preselected, date: '', time: '', notes: '',
  })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white p-10 md:p-14 shadow-card ring-1 ring-slate-100 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-brand">
          <CheckCircle2 className="h-11 w-11" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-extrabold text-ink">Visit Booked Successfully!</h2>
        <p className="mt-3 text-ink-light max-w-lg mx-auto">
          Thank you, {form.name || 'there'}! Your site visit request has been received. Our property expert will call you on {form.phone || 'your number'} to confirm your appointment{form.date ? ` for ${form.date}` : ''}{form.time ? ` at ${form.time}` : ''}.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          className="mt-8 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold h-12 px-8"
        >
          Book Another Visit
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-8 md:p-10 shadow-card ring-1 ring-slate-100">
      <h2 className="font-display text-2xl font-bold text-ink">Schedule your visit</h2>
      <p className="mt-1 text-ink-light">Fill in the details below and we&apos;ll confirm your appointment.</p>

      <div className="mt-7 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="John Sharma" className="h-12 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" required value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98xxx xxxxx" className="h-12 rounded-xl" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" className="h-12 rounded-xl" />
        </div>

        <div className="space-y-1.5">
          <Label>Select Property</Label>
          <Select value={form.property} onValueChange={(v) => set('property', v)}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Choose a property" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTIES.map((p) => (
                <SelectItem key={p.id} value={p.name}>{p.name} — {p.location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" type="date" required value={form.date} onChange={(e) => set('date', e.target.value)} className="h-12 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label>Preferred Time</Label>
            <Select value={form.time} onValueChange={(v) => set('time', v)}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Select a slot" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Additional Notes (optional)</Label>
          <Textarea id="notes" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Any specific requirements or questions..." className="min-h-[110px] rounded-xl" />
        </div>

        <Button type="submit" className="w-full rounded-full bg-brand hover:bg-brand-600 text-white font-semibold h-13 text-base shadow-glow">
          <CalendarCheck className="mr-2 h-5 w-5" /> Confirm Site Visit
        </Button>
      </div>
    </form>
  )
}

export default function BookVisitPage() {
  const perks = [
    { icon: ShieldCheck, title: 'Free & No Obligation', desc: 'Site visits are completely free with zero commitment required.' },
    { icon: MapPin, title: 'Guided Property Tour', desc: 'Explore sample flats, amenities and the neighbourhood with an expert.' },
    { icon: Clock, title: 'Flexible Timings', desc: 'Choose a slot that suits you, all seven days of the week.' },
    { icon: Phone, title: 'Instant Confirmation', desc: 'Our team calls you within hours to confirm your appointment.' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <PageBanner
        crumb="Book Site Visit"
        title="Book Your Free Site Visit"
        subtitle="See your future home in person. Schedule a guided tour with our property experts at a time that works for you."
      />

      <section className="py-20 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Why book a site visit?</h2>
              <p className="mt-3 text-ink-light">Experience the quality, location and lifestyle first-hand before you decide.</p>
              <div className="mt-8 space-y-4">
                {perks.map((p) => (
                  <div key={p.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-100">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <p.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{p.title}</p>
                      <p className="mt-0.5 text-sm text-ink-light">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-ink p-6 text-white">
                <p className="text-sm text-white/70">Prefer to talk? Call our team directly</p>
                <a href={COMPANY.phoneHref} className="mt-1 block font-display text-2xl font-extrabold text-brand">{COMPANY.phone}</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <Suspense fallback={<div className="rounded-3xl bg-white p-10 text-center text-ink-soft">Loading form...</div>}>
              <BookVisitInner />
            </Suspense>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
