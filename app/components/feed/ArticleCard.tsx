'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { SourceAvatar } from '@/components/ui/SourceAvatar'
import { CategoryTag } from '@/components/ui/CategoryTag'
import type { Article } from '@/lib/types'

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  if (d < 7)  return `${d}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

interface Props {
  article: Article
  compact?: boolean
}

export function ArticleCard({ article, compact = false }: Props) {
  const toggleRead  = useStore(s => s.toggleRead)
  const toggleSaved = useStore(s => s.toggleSaved)

  return (
    <article
      className="group relative flex gap-3 px-4 py-3.5 transition-colors"
      style={{
        borderBottom: '1px solid var(--color-border-subtle)',
        background: 'transparent',
        opacity: article.isRead ? 0.65 : 1,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-secondary)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
    >
      {/* Unread dot */}
      <div className="absolute left-1.5 top-1/2 -translate-y-1/2 flex-shrink-0">
        {!article.isRead && (
          <span className="block w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--color-unread-indicator)' }}/>
        )}
      </div>

      {/* Avatar */}
      <div className="pt-0.5">
        <SourceAvatar letter={article.feedLetter} color={article.feedAvatarColor} />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            {article.feedName}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            {relativeTime(article.publishedAt)}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            {article.readTimeMin} min
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/article/${article.id}`}
          onClick={() => !article.isRead && toggleRead(article.id)}
          className="block mb-1.5 transition-colors"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <h3
            className="text-sm leading-snug line-clamp-2"
            style={{
              color: 'var(--color-text-primary)',
              fontWeight: article.isRead ? 400 : 600,
            }}
          >
            {article.title}
          </h3>
        </Link>

        {/* Excerpt (hidden in compact mode) */}
        {!compact && (
          <p className="text-xs leading-relaxed line-clamp-2 mb-2"
            style={{ color: 'var(--color-text-secondary)' }}>
            {article.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <CategoryTag categoryId={article.categoryId} categoryName={article.categoryName} />

          {/* Hover actions */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <ActionBtn
              title={article.isRead ? 'Mark unread' : 'Mark read'}
              onClick={() => toggleRead(article.id)}
            >
              {article.isRead ? (
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" fill="currentColor" opacity="0.15"/>
                  <path d="M5.5 8l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </ActionBtn>

            <ActionBtn
              title={article.isSaved ? 'Remove bookmark' : 'Bookmark'}
              onClick={() => toggleSaved(article.id)}
            >
              <svg width="13" height="13" viewBox="0 0 16 16"
                fill={article.isSaved ? 'currentColor' : 'none'}>
                <path d="M3 2h10v13l-5-3-5 3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </ActionBtn>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open original"
              className="p-1.5 rounded transition-colors"
              style={{ color: 'var(--color-text-tertiary)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)'; (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-tertiary)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M6 3H3v10h10v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 7.5L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

function ActionBtn({ title, onClick, children }: {
  title: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-1.5 rounded transition-colors"
      style={{ color: 'var(--color-text-tertiary)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)'; (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-tertiary)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
    >
      {children}
    </button>
  )
}
