'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Building2, Phone, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet'
import { NAV_LINKS, COMPANY } from '@/lib/data/site'

function Logo({ dark }) {
  const parts = COMPANY.name.split(' ')
  const first = parts.slice(0, -1).join(' ') || parts[0]
  const last = parts.length > 1 ? parts[parts.length - 1] : ''
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {COMPANY.logo ? (
        <img src={COMPANY.logo} alt={COMPANY.name} className="h-11 w-auto object-contain" />
      ) : (
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white shadow-glow transition-transform group-hover:scale-105">
          <Building2 className="h-6 w-6" strokeWidth={2.2} />
        </span>
      )}
      {!COMPANY.logo && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
            {first} <span className="text-brand">{last}</span>
          </span>
          <span className={`text-[10px] font-medium tracking-[0.25em] uppercase ${dark ? 'text-white/70' : 'text-ink-soft'}`}>
            Real Estate
          </span>
        </span>
      )}
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent py-4'
          : 'bg-white/90 backdrop-blur-md shadow-[0_4px_30px_-15px_rgba(15,23,42,0.35)] py-3'
      }`}
    >
      <div className="container flex items-center justify-between gap-4">
        <Logo dark={transparent} />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                transparent
                  ? 'text-white/90 hover:bg-white/15 hover:text-white'
                  : 'text-ink-light hover:bg-brand-50 hover:text-brand-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={COMPANY.phoneHref}
            className={`flex items-center gap-2 text-sm font-semibold ${
              transparent ? 'text-white' : 'text-ink'
            }`}
          >
            <Phone className="h-4 w-4 text-brand" />
            {COMPANY.phone}
          </a>
          <Button asChild className="rounded-full bg-brand hover:bg-brand-600 text-white font-semibold shadow-glow">
            <Link href="/book-visit">
              <CalendarCheck className="mr-1.5 h-4 w-4" /> Book Site Visit
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={`grid h-11 w-11 place-items-center rounded-xl ${
                  transparent ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-600'
                }`}
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <Logo />
                </div>
                <nav className="flex flex-col p-4 gap-1">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.href}
                        className="rounded-lg px-4 py-3 text-base font-medium text-ink-light hover:bg-brand-50 hover:text-brand-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto p-6 border-t space-y-3">
                  <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Phone className="h-4 w-4 text-brand" /> {COMPANY.phone}
                  </a>
                  <SheetClose asChild>
                    <Button asChild className="w-full rounded-full bg-brand hover:bg-brand-600 text-white font-semibold">
                      <Link href="/book-visit">
                        <CalendarCheck className="mr-1.5 h-4 w-4" /> Book Site Visit
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
