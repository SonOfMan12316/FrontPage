'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useStore } from '@/lib/store'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { relativeTime } from '@/components/feed/ArticleCard'

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const articles    = useStore(s => s.articles)
  const toggleSaved = useStore(s => s.toggleSaved)
  const toggleRead  = useStore(s => s.toggleRead)

  const article = articles.find(a => a.id === id)
  if (!article) notFound()

  const currentIndex = articles.indexOf(article)
  const prev = articles[currentIndex - 1]
  const next = articles[currentIndex + 1]

  // Mark as read on mount
  if (!article.isRead) {
    // Delay to avoid calling setState during render
    setTimeout(() => toggleRead(article.id), 0)
  }

  return (
    <div className="app-page app-page-narrow pb-8">
      {/* Back bar */}
      <div className="sticky top-14 lg:top-0 z-20 flex flex-wrap items-center gap-2 py-2.5 md:gap-3 md:py-3"
        style={{ borderBottom: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-primary)' }}>
        <Link
          href="/feed"
          className="flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to feed
        </Link>

        <div className="flex-1"/>

        {/* Actions */}
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
      <div className="pt-8 pb-6" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
        {/* Category + meta */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <CategoryTag categoryId={article.categoryId} categoryName={article.categoryName} />
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            {article.readTimeMin} min read
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold leading-snug mb-4"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
          {article.title}
        </h1>

        {/* Source row */}
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-lg text-white flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ background: article.feedAvatarColor }}
          >
            {article.feedLetter}
          </span>
          <div>
            <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {article.feedName}
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              Published {relativeTime(article.publishedAt)} ·{' '}
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div
        className="prose-reader py-8"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* CTA to read original */}
      <div className="py-6 flex flex-col items-center gap-3 text-center"
        style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          This is a preview. Read the full article on {article.feedName}.
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: 'var(--color-accent)' }}
        >
          Read on {article.feedName} →
        </a>
      </div>

      {/* Prev / next navigation */}
      <div className="flex flex-col sm:flex-row gap-3 py-6" style={{ borderTop: '1px solid var(--color-border)' }}>
        {prev ? (
          <Link
            href={`/article/${prev.id}`}
            className="flex-1 flex flex-col gap-1 p-3 rounded-xl text-sm transition-colors"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-tertiary)' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
              Previous
            </span>
            <span className="font-medium line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
              {prev.title}
            </span>
          </Link>
        ) : <div className="flex-1"/>}

        {next ? (
          <Link
            href={`/article/${next.id}`}
            className="flex-1 flex flex-col gap-1 p-3 rounded-xl text-sm text-right transition-colors"
            style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <span className="text-xs flex items-center justify-end gap-1" style={{ color: 'var(--color-text-tertiary)' }}>
              Next
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="font-medium line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
              {next.title}
            </span>
          </Link>
        ) : <div className="flex-1"/>}
      </div>
    </div>
  )
}
