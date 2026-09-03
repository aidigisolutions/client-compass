'use client'

import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react'
import { SocialIcons } from '@/components/site/SocialIcons'
import { COMPANY, NAV_LINKS, PROPERTIES, WHATSAPP_HREF } from '@/lib/data/site'

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
                <Building2 className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <span className="font-display text-xl font-extrabold">
                ARG <span className="text-brand">Buildtech</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {COMPANY.tagline} Delivering premium residential and commercial spaces at India&apos;s finest addresses since {COMPANY.founded}.
            </p>
            <SocialIcons variant="onDark" dimension="h-10 w-10" icon="h-5 w-5" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/60 hover:text-brand transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="h-3.5 w-3.5 text-brand opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-5">Our Projects</h4>
            <ul className="space-y-3">
              {PROPERTIES.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link href={`/properties/${p.id}`} className="text-white/60 hover:text-brand transition-colors text-sm">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span className="text-white/60">{COMPANY.address}</span>
              </li>
              <li>
                <a href={COMPANY.phoneHref} className="flex items-center gap-3 text-white/60 hover:text-brand transition-colors">
                  <Phone className="h-5 w-5 text-brand shrink-0" /> {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 transition-colors hover:text-brand">
                  <MessageCircle className="h-5 w-5 shrink-0" style={{ color: '#25D366' }} /> WhatsApp: {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={COMPANY.emailHref} className="flex items-center gap-3 text-white/60 hover:text-brand transition-colors">
                  <Mail className="h-5 w-5 text-brand shrink-0" /> {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>{COMPANY.copyright}</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
