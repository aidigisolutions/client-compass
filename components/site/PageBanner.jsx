'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function PageBanner({ title, subtitle, crumb, image }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="absolute inset-0">
        {image ? (
          <>
            <img src={image} alt={title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/50" />
          </>
        ) : (
          <div className="absolute inset-0 bg-ink" />
        )}
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
      </div>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-brand">{crumb || title}</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-balance">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/75 leading-relaxed">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}
