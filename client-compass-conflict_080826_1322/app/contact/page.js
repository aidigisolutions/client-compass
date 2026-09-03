'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, Navigation } from 'lucide-react'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { PageBanner } from '@/components/site/PageBanner'
import { SocialIcons } from '@/components/site/SocialIcons'
import { Reveal } from '@/components/site/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { COMPANY, WHATSAPP_HREF } from '@/lib/data/site'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const contacts = [
    { icon: Phone, label: 'Phone', value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: Mail, label: 'Email', value: COMPANY.email, href: COMPANY.emailHref },
    { icon: MapPin, label: 'Office Address', value: COMPANY.address, href: '#map' },
    { icon: Clock, label: 'Working Hours', value: COMPANY.hours, href: null },
  ]

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <PageBanner
        crumb="Contact Us"
        title="Get in Touch"
        subtitle="Have a question about a property or want expert advice? Our team is ready to help you find your perfect space."
      />

      <section className="py-20 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-5">
          {/* Info */}
          <Reveal className="lg:col-span-2">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">Contact Information</h2>
              <p className="mt-1 font-display text-lg font-bold text-brand-700">{COMPANY.name}</p>
              <p className="mt-3 text-ink-light">Reach out through any of the channels below — we typically respond within a few hours.</p>
              <div className="mt-8 space-y-5">
                {contacts.map((c) => {
                  const inner = (
                    <div className="flex items-start gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                        <c.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{c.label}</p>
                        <p className="mt-1 font-medium text-ink">{c.value}</p>
                      </div>
                    </div>
                  )
                  return c.href ? (
                    <a key={c.label} href={c.href} className="block hover:opacity-80 transition-opacity">{inner}</a>
                  ) : (
                    <div key={c.label}>{inner}</div>
                  )
                })}
              </div>

              {/* Actions */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105" style={{ backgroundColor: '#25D366' }}>
                  <MessageCircle className="h-5 w-5" fill="currentColor" /> WhatsApp Us
                </a>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-ink transition-colors hover:bg-surface">
                  <Navigation className="h-4 w-4 text-brand" /> Get Directions
                </a>
              </div>

              {/* Social */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">Follow Us</p>
                <SocialIcons variant="onLight" dimension="h-11 w-11" icon="h-5 w-5" />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="rounded-3xl bg-white p-8 md:p-10 shadow-card ring-1 ring-slate-100">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-ink">Message Sent!</h3>
                  <p className="mt-2 text-ink-light">Thank you, {form.name || 'there'}. Our team will get back to you shortly.</p>
                  <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }} className="mt-6 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <h2 className="font-display text-2xl font-bold text-ink">Send us a message</h2>
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
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" required value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Tell us what you are looking for..." className="min-h-[130px] rounded-xl" />
                  </div>
                  <Button type="submit" className="w-full rounded-full bg-brand hover:bg-brand-600 text-white font-semibold h-12 text-base">
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <div id="map" className="container mt-14">
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-100 h-[400px]">
            <iframe
              title="ARG Buildtech Office"
              src={COMPANY.mapEmbed}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
