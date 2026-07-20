'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'
import { CATEGORIES } from '@/lib/mock-data'
import { SourceAvatar } from '@/components/ui/SourceAvatar'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { relativeTime } from '@/components/feed/ArticleCard'

export default function DigestPage() {
  const articles = useStore(s => s.articles)
  const toggleSaved = useStore(s => s.toggleSaved)
  const toggleRead  = useStore(s => s.toggleRead)

  const unread    = articles.filter(a => !a.isRead)
  const saved     = articles.filter(a => a.isSaved)
  const todayNew  = articles.filter(a => Date.now() - new Date(a.publishedAt).getTime() < 24 * 3600000)

  // Top picks: longest unread articles (as a proxy for "most substantial")
  const topPicks = [...unread]
    .sort((a, b) => b.readTimeMin - a.readTimeMin)
    .slice(0, 3)

  // Per-category breakdown
  const catBreakdown = CATEGORIES.map(cat => ({
    ...cat,
    unread: articles.filter(a => a.categoryId === cat.id && !a.isRead),
    total:  articles.filter(a => a.categoryId === cat.id),
  })).filter(c => c.total.length > 0)

  return (
    <div className="app-page">
      {/* Header */}
      <div className="py-5 md:py-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="text-lg md:text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
          Your Daily Digest
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-0" style={{ borderBottom: '1px solid var(--color-border)' }}>
        {[
          { label: 'New today', value: todayNew.length, accent: false },
          { label: 'Unread',    value: unread.length,   accent: true  },
          { label: 'Saved',     value: saved.length,    accent: false },
        ].map(({ label, value, accent }) => (
          <div key={label} className="py-4 md:py-5 text-center"
            style={{ borderRight: '1px solid var(--color-border)' }}>
            <div className="text-xl md:text-2xl font-bold"
              style={{ color: accent ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
              {value}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="py-4 md:py-6 flex flex-col gap-6 md:gap-8">

        {/* Top picks */}
        {topPicks.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ color: 'var(--color-text-primary)' }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2l1.5 4H14l-3.5 2.5 1.5 4L8 10l-4 2.5 1.5-4L2 6h4.5z"
                  fill="var(--color-warning)" stroke="var(--color-warning)" strokeWidth="0.5"/>
              </svg>
              Top picks for you
            </h2>
            <div className="flex flex-col gap-0 rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              {topPicks.map((a, i) => (
                <div key={a.id} className="flex items-start gap-3 p-4"
                  style={{ borderBottom: i < topPicks.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
                  <span className="text-sm font-bold w-5 text-center flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--color-text-tertiary)' }}>
                    {i + 1}
                  </span>
                  <SourceAvatar letter={a.feedLetter} color={a.feedAvatarColor} />
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/article/${a.id}`}
                      onClick={() => !a.isRead && toggleRead(a.id)}
                      className="block text-sm font-semibold leading-snug mb-1 hover:underline underline-offset-2"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {a.title}
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{a.feedName}</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>·</span>
                      <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{a.readTimeMin} min read</span>
                      <CategoryTag categoryId={a.categoryId} categoryName={a.categoryName} />
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaved(a.id)}
                    className="flex-shrink-0 p-1.5"
                    style={{ color: a.isSaved ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill={a.isSaved ? 'currentColor' : 'none'}>
                      <path d="M3 2h10v13l-5-3-5 3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category breakdown */}
        <section>
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            By category
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {catBreakdown.map(cat => (
              <Link
                key={cat.id}
                href={`/feed?cat=${cat.id}`}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 rounded-lg transition-colors"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: cat.color }}/>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {cat.name}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="flex items-center gap-2 w-full sm:w-36 sm:flex-shrink-0">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'var(--color-bg-tertiary)' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.round((1 - cat.unread.length / cat.total.length) * 100)}%`,
                        background: cat.color,
                      }}/>
                  </div>
                  <span className="text-xs w-16 sm:w-10 text-left sm:text-right flex-shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                    {cat.unread.length > 0 ? `${cat.unread.length} unread` : 'all read'}
                  </span>
                </div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="hidden sm:block flex-shrink-0">
                  <path d="M4 2l4 4-4 4" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent saved */}
        {saved.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold mb-3 flex items-center justify-between"
              style={{ color: 'var(--color-text-primary)' }}>
              Recently saved
              <Link href="/saved" className="text-xs font-normal"
                style={{ color: 'var(--color-accent)' }}>
                View all
              </Link>
            </h2>
            <div className="flex flex-col gap-2">
              {saved.slice(0, 3).map(a => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <SourceAvatar letter={a.feedLetter} color={a.feedAvatarColor} size="xs" />
                  <Link
                    href={`/article/${a.id}`}
                    className="flex-1 min-w-0 text-sm leading-snug line-clamp-1 hover:underline"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {a.title}
                  </Link>
                  <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                    {relativeTime(a.publishedAt)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
