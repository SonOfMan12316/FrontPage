'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import { CATEGORIES, FEEDS } from '@/lib/mock-data'
import { ArticleCard } from '@/components/feed/ArticleCard'
import { FeedToolbar } from '@/components/feed/FeedToolbar'
import type { Article } from '@/lib/types'

function groupByDay(articles: Article[]) {
  const todayMs = new Date().setHours(0, 0, 0, 0)
  const yesterdayMs = todayMs - 86400000

  const today:     Article[] = []
  const yesterday: Article[] = []
  const earlier:   Article[] = []

  for (const a of articles) {
    const d = new Date(a.publishedAt).setHours(0, 0, 0, 0)
    if      (d === todayMs)     today.push(a)
    else if (d === yesterdayMs) yesterday.push(a)
    else                         earlier.push(a)
  }

  const groups: { label: string; articles: Article[] }[] = []
  if (today.length)     groups.push({ label: 'Today',     articles: today })
  if (yesterday.length) groups.push({ label: 'Yesterday', articles: yesterday })
  if (earlier.length)   groups.push({ label: 'Earlier',   articles: earlier })
  return groups
}

function FeedContent() {
  const searchParams = useSearchParams()
  const catFilter    = searchParams.get('cat')
  const feedFilter   = searchParams.get('feed')

  const { articles, sort, markAllRead, layout } = useStore()

  let filtered = articles
  if (catFilter)  filtered = filtered.filter(a => a.categoryId === catFilter)
  if (feedFilter) filtered = filtered.filter(a => a.feedId     === feedFilter)

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'newest')       return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    if (sort === 'oldest')       return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    // unread-first
    if (!a.isRead && b.isRead)   return -1
    if (a.isRead  && !b.isRead)  return  1
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  const unreadCount = filtered.filter(a => !a.isRead).length
  const recentNew   = filtered.filter(
    a => !a.isRead && Date.now() - new Date(a.publishedAt).getTime() < 3 * 3600000
  ).length

  const title = catFilter
    ? CATEGORIES.find(c => c.id === catFilter)?.name ?? 'Category'
    : feedFilter
    ? FEEDS.find(f => f.id === feedFilter)?.name ?? 'Feed'
    : 'All Items'

  const groups = groupByDay(sorted)

  return (
    <div style={{ maxWidth: 'var(--container-feed)', margin: '0 auto' }}>
      <FeedToolbar title={title} unreadCount={unreadCount} onMarkAllRead={markAllRead} />

      {/* New items banner */}
      {recentNew > 0 && (
        <div className="mx-4 mt-3 mb-1 px-3 py-2 rounded-lg flex items-center justify-between text-sm"
          style={{
            background: 'var(--color-accent-subtle)',
            border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
            color: 'var(--color-accent)',
          }}>
          <span className="font-medium">
            {recentNew} new item{recentNew > 1 ? 's' : ''} in the last 3 hours
          </span>
          <button className="text-xs underline underline-offset-2 opacity-70 hover:opacity-100">Refresh</button>
        </div>
      )}

      {/* Card grid — 1 col mobile, 2 col tablet+ */}
      {layout === 'card' && (
        <div className="p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sorted.map(a => <CardItem key={a.id} article={a} />)}
        </div>
      )}

      {/* Magazine layout */}
      {layout === 'magazine' && sorted.length > 0 && (
        <div className="p-4">
          <MagazineLayout articles={sorted} />
        </div>
      )}

      {/* List layout (default) */}
      {layout === 'list' && (
        groups.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {groups.map(group => (
              <div key={group.label}>
                <div
                  className="px-4 py-2 flex items-center gap-2 sticky z-10"
                  style={{
                    top: 97,
                    background: 'color-mix(in srgb, var(--color-bg-primary) 95%, transparent)',
                    backdropFilter: 'blur(4px)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-text-tertiary)' }}>
                    {group.label}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    — {group.articles.length} item{group.articles.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {group.articles.map(a => <ArticleCard key={a.id} article={a} />)}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default function FeedPage() {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <FeedContent />
    </Suspense>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function CardItem({ article }: { article: Article }) {
  const toggleSaved = useStore(s => s.toggleSaved)
  const toggleRead  = useStore(s => s.toggleRead)
  const { CATEGORIES } = require('@/lib/mock-data')
  const cat = CATEGORIES.find((c: { id: string }) => c.id === article.categoryId)

  return (
    <div className="rounded-xl p-4 flex flex-col gap-2"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        opacity: article.isRead ? 0.65 : 1,
      }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded text-white flex items-center justify-center font-bold text-xs flex-shrink-0"
            style={{ background: article.feedAvatarColor }}>{article.feedLetter}</span>
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{article.feedName}</span>
        </div>
        <button onClick={() => toggleSaved(article.id)} className="p-1" style={{ color: article.isSaved ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill={article.isSaved ? 'currentColor' : 'none'}>
            <path d="M3 2h10v13l-5-3-5 3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <a href={`/article/${article.id}`} onClick={() => !article.isRead && toggleRead(article.id)}>
        <h3 className="text-sm leading-snug line-clamp-3" style={{ color: 'var(--color-text-primary)', fontWeight: article.isRead ? 400 : 600 }}>
          {article.title}
        </h3>
      </a>
      <p className="text-xs line-clamp-2 flex-1" style={{ color: 'var(--color-text-secondary)' }}>{article.excerpt}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
          style={{ background: cat?.bgHex, color: cat?.textHex }}>
          {article.categoryName}
        </span>
        <span className="text-xs ml-auto" style={{ color: 'var(--color-text-tertiary)' }}>{article.readTimeMin} min</span>
      </div>
    </div>
  )
}

function MagazineLayout({ articles }: { articles: Article[] }) {
  const [hero, ...rest] = articles
  return (
    <div className="flex flex-col gap-3">
      {/* Hero */}
      <ArticleCard article={hero} />
      {/* Rest compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-xl overflow-hidden"
        style={{ border: '1px solid var(--color-border)' }}>
        {rest.slice(0, 6).map(a => (
          <ArticleCard key={a.id} article={a} compact />
        ))}
      </div>
      {rest.slice(6).map(a => <ArticleCard key={a.id} article={a} />)}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'var(--color-bg-tertiary)' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M9 12l2 2 4-4" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="9" stroke="var(--color-text-tertiary)" strokeWidth="1.5"/>
        </svg>
      </div>
      <p className="font-semibold text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        You're all caught up!
      </p>
      <p className="text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
        No unread articles in this view.
      </p>
    </div>
  )
}

function FeedSkeleton() {
  return (
    <div style={{ maxWidth: 'var(--container-feed)', margin: '0 auto' }}>
      <div className="h-12" style={{ background: 'var(--color-bg-primary)', borderBottom: '1px solid var(--color-border)' }}/>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex gap-3 px-4 py-4 animate-pulse"
          style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div className="w-6 h-6 rounded flex-shrink-0" style={{ background: 'var(--color-bg-tertiary)' }}/>
          <div className="flex-1 space-y-2">
            <div className="h-3 rounded w-32" style={{ background: 'var(--color-bg-tertiary)' }}/>
            <div className="h-4 rounded w-3/4" style={{ background: 'var(--color-bg-tertiary)' }}/>
            <div className="h-3 rounded" style={{ background: 'var(--color-bg-tertiary)' }}/>
          </div>
        </div>
      ))}
    </div>
  )
}
