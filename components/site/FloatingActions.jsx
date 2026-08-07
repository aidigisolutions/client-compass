'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, ArrowUp } from 'lucide-react'
import { COMPANY, WHATSAPP_HREF } from '@/lib/data/site'

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-4 md:bottom-7 md:right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-lg hover:bg-ink-light transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call */}
      <motion.a
        href={COMPANY.phoneHref}
        aria-label="Call ARG Buildtech"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-glow"
      >
        <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-30" />
        <Phone className="relative h-6 w-6" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hidden md:block">
          Call Us
        </span>
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative grid h-14 w-14 place-items-center rounded-full text-white shadow-lg"
        style={{ backgroundColor: '#25D366' }}
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: '#25D366' }} />
        <MessageCircle className="relative h-7 w-7" fill="currentColor" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hidden md:block">
          WhatsApp Us
        </span>
      </motion.a>
    </div>
  )
}
