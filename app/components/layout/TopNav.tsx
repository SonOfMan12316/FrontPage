'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'

const NAV_TABS = [
  { href: '/feed',     label: 'Feed' },
  { href: '/digest',   label: 'Digest' },
  { href: '/discover', label: 'Discover' },
]

export function TopNav() {
  const pathname             = usePathname()
  const setMobileSidebarOpen = useStore(s => s.setMobileSidebarOpen)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center px-3 gap-2 md:px-4 md:gap-3"
      style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
    >
      {/* Hamburger — mobile only (opens the drawer); desktop toggle is inside the sidebar */}
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="p-1.5 rounded-md transition-colors flex-shrink-0 lg:hidden"
        style={{ color: 'var(--color-text-tertiary)' }}
        aria-label="Open menu"
      >
        <HamburgerIcon />
      </button>

      {/* Logo — mobile only (desktop logo lives in the sidebar) */}
      <Link
        href="/feed"
        className="lg:hidden font-bold text-sm flex-shrink-0"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Frontpage
      </Link>

      {/* Nav tabs — hidden on mobile (use bottom nav instead) */}
      <nav className="hidden lg:flex items-center gap-0.5 ml-1">
        {NAV_TABS.map(({ href, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              style={{
                background: active ? 'var(--color-bg-tertiary)' : 'transparent',
                color:      active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="flex-1" />

      {/* Search — full bar on desktop, icon button on mobile */}
      <Link
        href="/search"
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
        style={{
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-tertiary)',
          width: '13rem',
        }}
      >
        <SearchIcon />
        <span className="flex-1">Search…</span>
        <span className="text-xs px-1.5 py-0.5 rounded font-mono"
          style={{ background: 'var(--color-bg-tertiary)' }}>
          ⌘K
        </span>
      </Link>

      {/* Search icon — mobile only */}
      <Link
        href="/search"
        className="md:hidden p-2 rounded-md transition-colors flex-shrink-0"
        style={{ color: 'var(--color-text-secondary)' }}
        aria-label="Search"
      >
        <SearchIcon />
      </Link>

      {/* Add feed — full button on desktop, icon on mobile */}
      <Link
        href="/discover"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white flex-shrink-0"
        style={{ background: 'var(--color-accent)' }}
      >
        <PlusIcon />
        <span className="hidden lg:inline">Add Feed</span>
      </Link>

      {/* Add feed icon — mobile only */}
      <Link
        href="/discover"
        className="sm:hidden p-2 rounded-md transition-colors flex-shrink-0 text-white"
        style={{ background: 'var(--color-accent)', borderRadius: '0.5rem' }}
        aria-label="Add feed"
      >
        <PlusIcon />
      </Link>
    </header>
  )
}

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3"   width="14" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="1" y="7.25" width="10" height="1.5" rx="0.75" fill="currentColor"/>
      <rect x="1" y="11.5" width="12" height="1.5" rx="0.75" fill="currentColor"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
