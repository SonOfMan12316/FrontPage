'use client'

import { useStore } from '@/lib/store'
import type { LayoutMode, SortMode } from '@/lib/types'

interface Props {
  title: string
  unreadCount: number
  onMarkAllRead: () => void
}

export function FeedToolbar({ title, unreadCount, onMarkAllRead }: Props) {
  const { layout, setLayout, sort, setSort } = useStore()

  return (
    <div
      className="sticky top-14 z-20 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 md:gap-3"
      style={{
        background: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Title */}
      <div className="flex items-baseline gap-2 flex-1 min-w-0">
        <h1 className="font-semibold text-sm md:text-base truncate" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </h1>
        {unreadCount > 0 && (
          <span className="text-xs font-medium px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
            style={{ background: 'var(--color-accent)' }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>

      {/* Sort — hidden on mobile */}
      <select
        value={sort}
        onChange={e => setSort(e.target.value as SortMode)}
        className="hidden sm:block text-xs px-2 py-1.5 rounded-md appearance-none cursor-pointer"
        style={{
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="unread-first">Unread first</option>
      </select>

      {/* Layout toggles */}
      <div className="flex items-center rounded-md overflow-hidden"
        style={{ border: '1px solid var(--color-border)' }}>
        {(['list', 'card', 'magazine'] as LayoutMode[]).map(mode => (
          <LayoutBtn key={mode} mode={mode} active={layout === mode} onClick={() => setLayout(mode)} />
        ))}
      </div>

      {/* Mark all read — icon on mobile, text on desktop */}
      {unreadCount > 0 && (
        <button
          onClick={onMarkAllRead}
          className="flex items-center gap-1.5 text-xs font-medium px-2 py-1.5 rounded-md transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
          title="Mark all read"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">Mark all read</span>
        </button>
      )}
    </div>
  )
}

function LayoutBtn({
  mode, active, onClick,
}: {
  mode: LayoutMode
  active: boolean
  onClick: () => void
}) {
  const icons: Record<LayoutMode, React.ReactNode> = {
    list: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="2" width="12" height="2" rx="0.75" fill="currentColor"/>
        <rect x="1" y="6" width="12" height="2" rx="0.75" fill="currentColor"/>
        <rect x="1" y="10" width="12" height="2" rx="0.75" fill="currentColor"/>
      </svg>
    ),
    card: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
        <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
        <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
        <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
      </svg>
    ),
    magazine: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="5" height="12" rx="1" stroke="currentColor" strokeWidth="1.25"/>
        <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
        <rect x="8" y="8" width="5" height="2" rx="0.5" fill="currentColor"/>
        <rect x="8" y="11" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  }

  return (
    <button
      onClick={onClick}
      title={`${mode} view`}
      className="p-1.5 transition-colors"
      style={{
        background: active ? 'var(--color-bg-tertiary)' : 'transparent',
        color: active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
      }}
    >
      {icons[mode]}
    </button>
  )
}
