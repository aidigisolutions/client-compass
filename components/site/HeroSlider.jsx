'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SITE_IMAGES } from '@/lib/data/site'

const AUTOPLAY_MS = 4000

export function HeroSlider() {
  const imgs = SITE_IMAGES.heroSlider?.length ? SITE_IMAGES.heroSlider : [SITE_IMAGES.hero]
  const [i, setI] = useState(0)
  const touchX = useRef(null)

  const go = useCallback((n) => setI((v) => (n + imgs.length) % imgs.length), [imgs.length])
  const next = useCallback(() => go(i + 1), [go, i])
  const prev = useCallback(() => go(i - 1), [go, i])

  useEffect(() => {
    if (imgs.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % imgs.length), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [imgs.length, i])

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
    touchX.current = null
  }

  return (
    <div className="absolute inset-0 overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <AnimatePresence>
        <motion.img
          key={i}
          src={imgs[i]}
          alt="ARG Buildtech premium residential and commercial projects"
          fetchPriority={i === 0 ? 'high' : 'auto'}
          loading={i === 0 ? 'eager' : 'lazy'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1 } }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Dark blue overlay (~35%) for text readability */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(9, 20, 48, 0.38)' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06122a]/85 via-[#0a1a3f]/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06122a]/70 via-transparent to-transparent" />

      {/* Arrows (desktop) */}
      {imgs.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full bg-white/10 p-3 text-white backdrop-blur transition-colors hover:bg-brand md:grid"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 place-items-center rounded-full bg-white/10 p-3 text-white backdrop-blur transition-colors hover:bg-brand md:grid"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {imgs.length > 1 && (
        <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:left-auto md:right-10 md:translate-x-0">
          {imgs.map((_, d) => (
            <button
              key={d}
              onClick={() => setI(d)}
              aria-label={`Go to slide ${d + 1}`}
              className={`h-2 rounded-full transition-all ${d === i ? 'w-8 bg-brand' : 'w-2 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
