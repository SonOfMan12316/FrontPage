'use client'

import { useStore } from '@/lib/store'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { relativeTime } from '@/components/feed/ArticleCard'

export function DetailPanel() {
  const articles           = useStore(s => s.articles)
  const selectedId         = useStore(s => s.selectedArticleId)
  const toggleSaved        = useStore(s => s.toggleSaved)
  const toggleRead         = useStore(s => s.toggleRead)
  const setSelectedArticle = useStore(s => s.setSelectedArticle)

  const article = selectedId ? (articles.find(a => a.id === selectedId) ?? null) : null

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 px-8 text-center select-none">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'var(--color-bg-tertiary)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="2" rx="1" fill="var(--color-text-tertiary)"/>
            <rect x="3" y="9" width="13" height="2" rx="1" fill="var(--color-text-tertiary)"/>
            <rect x="3" y="14" width="15" height="2" rx="1" fill="var(--color-text-tertiary)"/>
          </svg>
        </div>
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          Select an article to read
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
          Click any item in the list to open it here.
        </p>
      </div>
    )
  }

  const currentIndex = articles.indexOf(article)
  const prev = articles[currentIndex - 1] ?? null
  const next = articles[currentIndex + 1] ?? null

  return (
    <div style={{ maxWidth: '42rem', margin: '0 auto', paddingInline: '1.75rem', paddingBottom: '3rem' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 flex items-center gap-2 py-3"
        style={{
          borderBottom: '1px solid var(--color-border-subtle)',
          background: 'var(--color-bg-primary)',
        }}
      >
        <button
          onClick={() => setSelectedArticle(null)}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: 'var(--color-text-tertiary)' }}
          title="Close"
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="flex-1"/>

        <button
          onClick={() => toggleSaved(article.id)}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors"
          style={{
            background: article.isSaved ? 'var(--color-accent-subtle)' : 'var(--color-bg-secondary)',
            color: article.isSaved ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill={article.isSaved ? 'currentColor' : 'none'}>
            <path d="M3 2h10v13l-5-3-5 3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          {article.isSaved ? 'Saved' : 'Save'}
        </button>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors"
          style={{
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M6 3H3v10h10v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 7.5L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Open original
        </a>
      </div>

      {/* Article header */}
      <div className="pt-6 pb-5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <CategoryTag categoryId={article.categoryId} categoryName={article.categoryName} />
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            {article.readTimeMin} min read
          </span>
        </div>

        <h1
          className="text-lg font-bold leading-snug mb-4"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}
        >
          {article.title}
        </h1>

        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-md text-white flex items-center justify-center font-bold text-xs flex-shrink-0"
            style={{ background: article.feedAvatarColor }}
          >
            {article.feedLetter}
          </span>
          <div>
            <div className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {article.feedName}
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {relativeTime(article.publishedAt)} ·{' '}
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div
        className="prose-reader py-7"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Read original CTA */}
      <div
        className="py-5 flex flex-col items-center gap-3 text-center"
        style={{ borderTop: '1px solid var(--color-border-subtle)' }}
      >
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Preview only — read the full article on {article.feedName}.
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-xs font-medium text-white"
          style={{ background: 'var(--color-accent)' }}
        >
          Read on {article.feedName} →
        </a>
      </div>

      {/* Prev / Next */}
      <div
        className="flex gap-3 pt-5"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        {prev ? (
          <button
            onClick={() => { setSelectedArticle(prev.id); if (!prev.isRead) toggleRead(prev.id) }}
            className="flex-1 flex flex-col gap-1 p-3 rounded-xl text-left transition-colors"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-secondary)' }}
          >
            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-tertiary)' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
              Previous
            </span>
            <span className="font-medium text-xs line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
              {prev.title}
            </span>
          </button>
        ) : <div className="flex-1"/>}

        {next ? (
          <button
            onClick={() => { setSelectedArticle(next.id); if (!next.isRead) toggleRead(next.id) }}
            className="flex-1 flex flex-col gap-1 p-3 rounded-xl text-right transition-colors"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-secondary)' }}
          >
            <span className="text-xs flex items-center justify-end gap-1" style={{ color: 'var(--color-text-tertiary)' }}>
              Next
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="font-medium text-xs line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
              {next.title}
            </span>
          </button>
        ) : <div className="flex-1"/>}
      </div>
    </div>
  )
}
