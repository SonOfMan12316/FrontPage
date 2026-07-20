'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { ArticleCard } from '@/components/feed/ArticleCard'

export default function SavedPage() {
  const articles    = useStore(s => s.articles)
  const toggleSaved = useStore(s => s.toggleSaved)

  const saved = articles.filter(a => a.isSaved)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return (
    <div className="app-page">
      {/* Header */}
      <div className="sticky z-20 flex items-center gap-3 py-2 md:py-2.5"
        style={{
          top: 56,
          background: 'var(--color-bg-primary)',
          borderBottom: '1px solid var(--color-border)',
        }}>
        <h1 className="font-semibold text-base flex-1" style={{ color: 'var(--color-text-primary)' }}>
          Saved
        </h1>
        {saved.length > 0 && (
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            {saved.length} article{saved.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
            style={{ background: 'var(--color-bg-tertiary)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 3h14v19l-7-4.5L5 22V3z" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
            Nothing saved yet
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
            Bookmark articles from your feed to read them later.
          </p>
          <Link
            href="/feed"
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: 'var(--color-accent)' }}
          >
            Browse your feed
          </Link>
        </div>
      ) : (
        <div>
          {saved.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  )
}
