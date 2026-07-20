'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import { SourceAvatar } from '@/components/ui/SourceAvatar'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { relativeTime } from '@/components/feed/ArticleCard'
import Link from 'next/link'
import type { Article } from '@/lib/types'

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} style={{ background: 'color-mix(in srgb, var(--color-warning) 30%, transparent)', borderRadius: 2, padding: '0 1px' }}>{part}</mark>
      : part
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [submitted, setSubmitted] = useState(initialQ)
  const inputRef = useRef<HTMLInputElement>(null)

  const articles = useStore(s => s.articles)
  const toggleRead = useStore(s => s.toggleRead)

  useEffect(() => { inputRef.current?.focus() }, [])

  const results: Article[] = submitted.trim().length < 2
    ? []
    : articles.filter(a => {
        const q = submitted.toLowerCase()
        return (
          a.title.toLowerCase().includes(q)  ||
          a.excerpt.toLowerCase().includes(q) ||
          a.feedName.toLowerCase().includes(q)||
          a.categoryName.toLowerCase().includes(q)
        )
      })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(query)
  }

  return (
    <div className="app-page">
      {/* Search bar */}
      <div className="pt-4 pb-4 md:pt-6 md:pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <form onSubmit={handleSubmit} className="relative">
          <svg className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--color-text-tertiary)" strokeWidth="1.5"/>
            <path d="M10 10l3.5 3.5" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search articles, feeds, topics…"
            className="w-full pl-10 md:pl-11 pr-20 py-2.5 md:py-3 rounded-xl text-sm outline-none"
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              fontSize: '0.9375rem',
            }}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
            style={{ background: 'var(--color-accent)' }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="py-4 md:py-6">
        {submitted.trim().length < 2 ? (
          /* Empty / prompt */
          <div className="flex flex-col items-center py-16 text-center">
            <svg className="mb-4" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="17" cy="17" r="12" stroke="var(--color-text-tertiary)" strokeWidth="2"/>
              <path d="M26 26l9 9" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Search your articles
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
              Type at least 2 characters to search.
            </p>
          </div>
        ) : results.length === 0 ? (
          /* No results */
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              No results for &ldquo;{submitted}&rdquo;
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              Try different keywords or check your spelling.
            </p>
          </div>
        ) : (
          /* Results list */
          <div>
            <p className="text-xs mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{submitted}&rdquo;
            </p>
            <div className="flex flex-col gap-0 rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--color-border)' }}>
              {results.map((a, i) => (
                <div
                  key={a.id}
                  className="flex items-start gap-3 p-4"
                  style={{
                    borderBottom: i < results.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                    background: 'var(--color-surface)',
                    opacity: a.isRead ? 0.65 : 1,
                  }}
                >
                  <SourceAvatar letter={a.feedLetter} color={a.feedAvatarColor} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                        {highlight(a.feedName, submitted)}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>·</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        {relativeTime(a.publishedAt)}
                      </span>
                    </div>
                    <Link
                      href={`/article/${a.id}`}
                      onClick={() => !a.isRead && toggleRead(a.id)}
                      className="block text-sm font-semibold leading-snug mb-1 hover:underline underline-offset-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {highlight(a.title, submitted)}
                    </Link>
                    <p className="text-xs line-clamp-2 mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                      {highlight(a.excerpt, submitted)}
                    </p>
                    <CategoryTag categoryId={a.categoryId} categoryName={a.categoryName} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  )
}
