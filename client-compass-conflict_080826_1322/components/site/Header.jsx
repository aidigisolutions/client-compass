'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, CalendarCheck, MapPin, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet'
import { SocialIcons } from '@/components/site/SocialIcons'
import { NAV_LINKS, COMPANY, WHATSAPP_HREF } from '@/lib/data/site'

function Logo({ className = 'h-11 w-auto md:h-14' }) {
  return (
    <Link href="/" className="flex items-center group" aria-label={COMPANY.name}>
      <img
        src="/brand/arg-logo.png"
        alt={`${COMPANY.name} logo`}
        width={220}
        height={70}
        className={`${className} object-contain transition-transform group-hover:scale-[1.03]`}
      />
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
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Main navigation */}
      <div className={`transition-all duration-300 ${transparent ? 'bg-transparent py-3' : 'bg-white/95 backdrop-blur-md shadow-lg py-2'}`}>
        <div className="container flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  transparent ? 'text-white/90 hover:bg-white/15 hover:text-white' : 'text-ink hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
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
                <button aria-label="Open menu" className={`grid h-11 w-11 place-items-center rounded-xl ${transparent ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-700'}`}>
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex h-full flex-col">
                  <div className="border-b p-5">
                    <Logo className="h-11 w-auto" />
                  </div>
                  <nav className="flex flex-col gap-1 p-4">
                    {NAV_LINKS.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link href={item.href} className="rounded-lg px-4 py-3 text-base font-semibold text-ink hover:bg-brand-50 hover:text-brand-700 transition-colors">
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="mt-auto space-y-4 border-t p-5">
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
                    <div className="pt-1">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Follow Us</p>
                      <SocialIcons variant="onLight" dimension="h-10 w-10" icon="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
