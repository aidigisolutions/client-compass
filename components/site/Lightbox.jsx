'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export function Lightbox({ images = [], index, onChange, onClose }) {
  const open = index !== null && index !== undefined

  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange])
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, prev, next, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4"
          onClick={onClose}
        >
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/70">{index + 1} / {images.length}</span>

          {images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous" className="absolute left-3 md:left-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-brand">
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={images[index]}
            alt={`Image ${index + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          />

          {images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next" className="absolute right-3 md:right-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-brand">
              <ChevronRight className="h-7 w-7" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
