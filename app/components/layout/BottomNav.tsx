'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  {
    href: '/feed',
    label: 'Feed',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3"  width="16" height="2.5" rx="1.25" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.5}/>
        <rect x="2" y="9"  width="11" height="2.5" rx="1.25" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.5} opacity={active ? 0.7 : 1}/>
        <rect x="2" y="15" width="13" height="2.5" rx="1.25" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.5} opacity={active ? 0.4 : 1}/>
      </svg>
    ),
  },
  {
    href: '/digest',
    label: 'Digest',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill={active ? 'currentColor' : 'none'} opacity={active ? 0.15 : 1}/>
        {active && <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>}
        <path d="M10 6.5v3.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/discover',
    label: 'Discover',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 7v6M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/saved',
    label: 'Saved',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill={active ? 'currentColor' : 'none'}>
        <path d="M5 3h10v15l-5-3-5 3V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fp-bottom-nav" aria-label="Mobile navigation">
      {TABS.map(({ href, label, icon }) => {
        const active = pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
            style={{ color: active ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
          >
            {icon(active)}
            <span className="text-[10px] font-medium leading-none">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
