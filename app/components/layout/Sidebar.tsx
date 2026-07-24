'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import { CATEGORIES, FEEDS } from '@/lib/mock-data'

export function Sidebar() {
  const pathname        = usePathname()
  const searchParams    = useSearchParams()
  const articles        = useStore(s => s.articles)
  const sidebarHidden   = useStore(s => s.sidebarHidden)
  const setSidebarHidden = useStore(s => s.setSidebarHidden)
  const mobileOpen      = useStore(s => s.mobileSidebarOpen)
  const setMobileOpen   = useStore(s => s.setMobileSidebarOpen)

  // JS-managed peek state (hover preview without pinning)
  const [peeking, setPeeking] = useState(false)
  // Suppress transitions on initial mount to prevent hydration flicker
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const totalUnread = articles.filter(a => !a.isRead).length
  const savedCount  = articles.filter(a => a.isSaved).length

  const catUnread  = (id: string) => articles.filter(a => a.categoryId === id && !a.isRead).length
  const feedUnread = (id: string) => articles.filter(a => a.feedId === id  && !a.isRead).length

  const activeCat  = searchParams.get('cat')
  const activeFeed = searchParams.get('feed')

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fp-backdrop ${mobileOpen ? 'fp-backdrop-active' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/*
        Wrapper: flex child on desktop (reserves sidebar space),
        or a thin fixed hover-strip when hidden.
      */}
      {/* Floating toggle — desktop only, shown when sidebar is hidden and not peeking */}
      {sidebarHidden && !peeking && (
        <button
          className="hidden lg:flex fixed items-center justify-center w-7 h-7 rounded-md z-[56] transition-colors"
          style={{
            left: '8px',
            top: '14px',
            color: 'var(--color-text-tertiary)',
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
          }}
          onClick={() => { setSidebarHidden(false); setPeeking(false) }}
          title="Show sidebar"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-secondary)' }}
        >
          <PanelLeftIcon />
        </button>
      )}

      <div
        className={`fp-sidebar-wrap${sidebarHidden ? ' fp-wrap-hidden' : ''}`}
        onMouseEnter={sidebarHidden ? () => setPeeking(true) : undefined}
        onClick={sidebarHidden ? () => { setSidebarHidden(false); setPeeking(false) } : undefined}
      >
        <aside
          className={[
            'fp-sidebar',
            mounted ? 'fp-sidebar-transitions' : '',
            mobileOpen ? 'fp-mobile-open' : '',
            sidebarHidden && peeking ? 'fp-sidebar-peeking' : '',
          ].filter(Boolean).join(' ')}
          onMouseLeave={() => { if (sidebarHidden) setPeeking(false) }}
        >

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div
            className="flex items-center justify-between px-3 h-14 shrink-0"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <Link
              href="/feed"
              onClick={() => setMobileOpen(false)}
              className="font-bold text-sm tracking-tight flex-1 min-w-0 truncate"
              style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
            >
              Frontpage
            </Link>

            {/* Desktop: hide button */}
            <button
              onClick={() => { setSidebarHidden(true); setPeeking(false) }}
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md shrink-0 transition-colors"
              style={{ color: 'var(--color-text-tertiary)' }}
              title="Hide sidebar"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <PanelLeftIcon />
            </button>

            {/* Mobile: close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md shrink-0 transition-colors"
              style={{ color: 'var(--color-text-tertiary)' }}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* ── Nav ────────────────────────────────────────────────────── */}
          <nav className="p-2 flex flex-col gap-0.5 flex-1 overflow-y-auto overflow-x-hidden">

            <SideLink href="/feed" active={pathname === '/feed' && !activeCat && !activeFeed}
              onClick={() => setMobileOpen(false)} icon={<InboxIcon />} label="All Items" badge={totalUnread} />

            <SideLink href="/saved" active={pathname === '/saved'}
              onClick={() => setMobileOpen(false)} icon={<BookmarkIcon />} label="Saved" badge={savedCount} />

            <SideLink href="/digest" active={pathname === '/digest'}
              onClick={() => setMobileOpen(false)} icon={<DigestIcon />} label="Digest" />

            <div className="mx-2 my-2" style={{ height: 1, background: 'var(--color-border-subtle)' }}/>

            {/* ── Feeds by category ───────────────────────────────────── */}
            {CATEGORIES.map(cat => {
              const cu      = catUnread(cat.id)
              const feeds   = FEEDS.filter(f => f.categoryId === cat.id)
              const catActive = activeCat === cat.id

              return (
                <div key={cat.id} className="mb-1">
                  <Link
                    href={`/feed?cat=${cat.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-2.5 py-1 rounded-md transition-colors"
                    style={{
                      color: 'var(--color-text-tertiary)',
                      background: catActive ? 'var(--color-bg-tertiary)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    <span className="truncate uppercase tracking-wider text-[10px] font-semibold">
                      {cat.name}
                    </span>
                    {cu > 0 && <span className="shrink-0 text-[10px]">{cu}</span>}
                  </Link>

                  <div className="relative ml-3 pl-3 flex flex-col gap-px"
                    style={{ borderLeft: '1px solid var(--color-border-subtle)' }}>
                    {feeds.map(feed => {
                      const fu       = feedUnread(feed.id)
                      const isActive = activeFeed === feed.id
                      return (
                        <Link
                          key={feed.id}
                          href={`/feed?feed=${feed.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between px-2 py-1 rounded-md text-xs transition-colors"
                          style={{
                            background: isActive ? 'var(--color-bg-tertiary)' : 'transparent',
                            color:      isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                            fontWeight: isActive ? 500 : 400,
                            textDecoration: 'none',
                          }}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="truncate">{feed.name}</span>
                            {feed.status === 'stale' && (
                              <span className="shrink-0 text-[10px]" style={{ color: 'var(--color-warning)' }}>
                                stale
                              </span>
                            )}
                          </div>
                          {fu > 0 && (
                            <span className="shrink-0 ml-1 text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                              {fu}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* ── Bottom: search + discover ────────────────────────────── */}
            <div className="mt-auto pt-2" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
              <SideLink href="/search" active={pathname === '/search'}
                onClick={() => setMobileOpen(false)} icon={<SearchIcon />} label="Search" />
              <SideLink href="/discover" active={pathname === '/discover'}
                onClick={() => setMobileOpen(false)} icon={<PlusIcon />} label="Add feeds" />
            </div>
          </nav>

        </aside>
      </div>
    </>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SideLink({
  href, active, onClick, icon, label, badge = 0,
}: {
  href: string; active: boolean; onClick: () => void
  icon: React.ReactNode; label: string; badge?: number
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-sm transition-colors"
      style={{
        background: active ? 'var(--color-accent-subtle)' : 'transparent',
        color:      active ? 'var(--color-accent)'        : 'var(--color-text-secondary)',
        fontWeight: active ? 600 : 400,
        textDecoration: 'none',
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
    >
      <div className="flex items-center gap-2">
        <span className="shrink-0">{icon}</span>
        <span>{label}</span>
      </div>
      {badge > 0 && (
        <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function PanelLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.25"/>
      <line x1="5.5" y1="1.5" x2="5.5" y2="14.5" stroke="currentColor" strokeWidth="1.25"/>
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function InboxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2"  width="14" height="2" rx="1" fill="currentColor"/>
      <rect x="1" y="7"  width="10" height="2" rx="1" fill="currentColor"/>
      <rect x="1" y="12" width="12" height="2" rx="1" fill="currentColor"/>
    </svg>
  )
}
function BookmarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 2h10v13l-5-3-5 3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}
function DigestIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 11v2M5 13h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 6h6M5 8.5h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
