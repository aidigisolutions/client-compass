'use client'

import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react'
import { COMPANY } from '@/lib/data/site'

const ITEMS = [
  { key: 'facebook', Icon: Facebook, label: 'Facebook', color: '#1877F2' },
  { key: 'instagram', Icon: Instagram, label: 'Instagram', color: '#E4405F' },
  { key: 'youtube', Icon: Youtube, label: 'YouTube', color: '#FF0000' },
  { key: 'whatsapp', Icon: MessageCircle, label: 'WhatsApp', color: '#25D366' },
]

// variant: 'onDark' (translucent light circle) | 'onLight' (subtle grey circle)
export function SocialIcons({ variant = 'onDark', className = '', dimension = 'h-9 w-9', icon = 'h-4 w-4' }) {
  const base = variant === 'onLight'
    ? 'bg-surface hover:bg-slate-100 ring-1 ring-slate-200'
    : 'bg-white/10 hover:bg-white/20'
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {ITEMS.map(({ key, Icon, label, color }) => {
        const href = COMPANY.social?.[key]
        if (!href) return null
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`grid ${dimension} place-items-center rounded-full ${base} transition-all duration-200 hover:scale-110`}
          >
            <Icon className={icon} style={{ color }} fill={key === 'whatsapp' ? color : 'none'} />
          </a>
        )
      })}
    </div>
  )
}
