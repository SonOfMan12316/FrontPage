'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import { CATEGORIES, FEEDS } from '@/lib/mock-data'

export function Sidebar() {
  const pathname             = usePathname()
  const searchParams         = useSearchParams()
  const articles             = useStore(s => s.articles)
  const collapsed            = useStore(s => s.sidebarCollapsed)
  const toggleSidebar        = useStore(s => s.toggleSidebar)
  const mobileOpen           = useStore(s => s.mobileSidebarOpen)
  const setMobileOpen        = useStore(s => s.setMobileSidebarOpen)

  const totalUnread = articles.filter(a => !a.isRead).length
  const savedCount  = articles.filter(a => a.isSaved).length

  const catUnread  = (id: string) => articles.filter(a => a.categoryId === id && !a.isRead).length
  const feedUnread = (id: string) => articles.filter(a => a.feedId === id  && !a.isRead).length

  const activeCat  = searchParams.get('cat')
  const activeFeed = searchParams.get('feed')

  const sidebarClass = [
    'fp-sidebar',
    mobileOpen ? 'fp-mobile-open'       : '',
    collapsed  ? 'fp-desktop-collapsed' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fp-backdrop ${mobileOpen ? 'fp-backdrop-active' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={sidebarClass}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: 'var(--sidebar-width)',
          background: 'var(--color-bg-secondary)',
          borderRight: '1px solid var(--color-border)',
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Sidebar header: logo + toggle ─────────────────────────────── */}
        <div
          className="flex items-center justify-between px-3 h-14 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          {/* Logo — text only */}
          <Link
            href="/feed"
            onClick={() => setMobileOpen(false)}
            className="fp-sidebar-text font-bold text-sm tracking-tight flex-1 min-w-0 truncate"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Frontpage
          </Link>

          {/* Desktop: collapse / expand button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0 transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>

          {/* Mobile: close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0 transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Nav items ─────────────────────────────────────────────────── */}
        <nav className="p-2 flex flex-col gap-0.5 flex-1 overflow-y-auto">

          <SideLink
            href="/feed"
            active={pathname === '/feed' && !activeCat && !activeFeed}
            onClick={() => setMobileOpen(false)}
            icon={<ListIcon />}
            label="All Items"
            badge={totalUnread}
          />

          <SideLink
            href="/saved"
            active={pathname === '/saved'}
            onClick={() => setMobileOpen(false)}
            icon={<BookmarkIcon />}
            label="Saved"
            badge={savedCount}
          />

          <div className="mx-2 my-3" style={{ height: 1, background: 'var(--color-border-subtle)' }}/>

          {CATEGORIES.map(cat => {
            const cu    = catUnread(cat.id)
            const feeds = FEEDS.filter(f => f.categoryId === cat.id)
            const catActive = activeCat === cat.id

            return (
              <div key={cat.id} className="mb-1">
                {/* Category row */}
                <Link
                  href={`/feed?cat=${cat.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors"
                  style={{
                    color:      catActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    fontWeight: catActive ? 600 : 500,
                    background: catActive ? 'var(--color-bg-tertiary)' : 'transparent',
                    letterSpacing: '0.01em',
                  }}
                >
                  <span className="fp-sidebar-text truncate uppercase tracking-wider text-[10px]" style={{ fontWeight: 600, color: 'var(--color-text-tertiary)' }}>{cat.name}</span>
                  {cu > 0 && (
                    <span className="fp-sidebar-text shrink-0 text-[10px]"
                      style={{ color: 'var(--color-text-tertiary)' }}>
                      {cu}
                    </span>
                  )}
                </Link>

                {/* Feed rows — indented with a vertical guide line */}
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
                        }}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="fp-sidebar-text truncate">{feed.name}</span>
                          {feed.status === 'stale' && (
                            <span className="fp-sidebar-text shrink-0 text-[10px]"
                              style={{ color: 'var(--color-warning)' }}>
                              ·stale
                            </span>
                          )}
                        </div>
                        {fu > 0 && (
                          <span className="fp-sidebar-text shrink-0 ml-1 text-[10px]"
                            style={{ color: 'var(--color-text-tertiary)' }}>
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

          {/* Footer */}
          <div className="mt-auto pt-3" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <p className="fp-sidebar-text px-2.5 text-[10px]" style={{ color: 'var(--color-text-tertiary)', letterSpacing: '0.02em' }}>
              19 feeds active
            </p>
          </div>
        </nav>
      </aside>
    </>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function SideLink({
  href, active, onClick, icon, label, badge = 0,
}: {
  href: string
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  badge?: number
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
      }}
    >
      <div className="flex items-center gap-2">
        <span className="fp-sidebar-icon flex-shrink-0">{icon}</span>
        <span className="fp-sidebar-text">{label}</span>
      </div>
      {badge > 0 && (
        <span className="fp-sidebar-text text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  )
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function ListIcon() {
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
