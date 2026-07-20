'use client'

import { useState } from 'react'
import { CATEGORIES, FEEDS } from '@/lib/mock-data'

const SUGGESTED: { name: string; url: string; categoryId: string; letter: string; avatarColor: string; description: string }[] = [
  { name: 'Overreacted',      url: 'https://overreacted.io/rss.xml',                    categoryId: 'frontend', letter: 'O', avatarColor: '#ec4899', description: "Dan Abramov's personal blog — deep dives on React and mental models." },
  { name: 'The Changelog',    url: 'https://changelog.com/feed',                         categoryId: 'general',  letter: 'C', avatarColor: '#22c55e', description: 'News and podcasts for developers covering open source and software.' },
  { name: 'Bytes',            url: 'https://bytes.dev/rss.xml',                          categoryId: 'frontend', letter: 'B', avatarColor: '#6366f1', description: 'Entertaining weekly JavaScript newsletter for working developers.' },
  { name: 'increment',        url: 'https://increment.com/feed.xml',                     categoryId: 'general',  letter: 'I', avatarColor: '#0f172a', description: 'In-depth articles on software engineering practices and culture.' },
  { name: 'Google AI Blog',   url: 'https://ai.googleblog.com/feeds/posts/default',      categoryId: 'ai',       letter: 'G', avatarColor: '#4285f4', description: 'Research and announcements from Google AI.' },
  { name: 'Addy Osmani',      url: 'https://addyosmani.com/feed.xml',                    categoryId: 'frontend', letter: 'A', avatarColor: '#f97316', description: 'Performance, patterns, and engineering leadership from a Chrome engineering lead.' },
]

export default function DiscoverPage() {
  const [query, setQuery]       = useState('')
  const [followed, setFollowed] = useState<Set<string>>(new Set())
  const [byUrl, setByUrl]       = useState('')

  const existingIds = new Set(FEEDS.map(f => f.id))

  const suggestions = query
    ? SUGGESTED.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase())
      )
    : SUGGESTED

  const toggle = (name: string) =>
    setFollowed(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  return (
    <div className="app-page">
      {/* Header */}
      <div className="py-5 md:py-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="text-lg md:text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
          Discover Feeds
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Search for feeds or add one directly by URL.
        </p>
      </div>

      <div className="py-4 md:py-6 flex flex-col gap-6 md:gap-8">

        {/* Search + URL add */}
        <div className="flex flex-col gap-3">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--color-text-tertiary)" strokeWidth="1.5"/>
              <path d="M10 10l3.5 3.5" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name or topic…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>

          {/* Add by URL */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 min-w-0">
              <input
                type="url"
                placeholder="Paste a feed URL (RSS or Atom)…"
                value={byUrl}
                onChange={e => setByUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
            <button
              onClick={() => { alert(`Would fetch: ${byUrl}`); setByUrl('') }}
              disabled={!byUrl}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity flex-shrink-0"
              style={{
                background: 'var(--color-accent)',
                opacity: byUrl ? 1 : 0.5,
                cursor: byUrl ? 'pointer' : 'not-allowed',
              }}
            >
              Add Feed
            </button>
          </div>
        </div>

        {/* Currently following */}
        <section>
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Your feeds ({FEEDS.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => {
              const catFeeds = FEEDS.filter(f => f.categoryId === cat.id)
              return catFeeds.map(feed => (
                <div key={feed.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs"
                  style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}>
                  <span className="w-3.5 h-3.5 rounded text-white flex items-center justify-center font-bold flex-shrink-0"
                    style={{ fontSize: 8, background: feed.avatarColor }}>
                    {feed.letter}
                  </span>
                  {feed.name}
                  {feed.status === 'stale' && (
                    <span className="text-[9px] ml-0.5" style={{ color: 'var(--color-warning)' }}>•</span>
                  )}
                </div>
              ))
            })}
          </div>
        </section>

        {/* Suggested */}
        <section>
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            {query ? `Results for "${query}"` : 'Suggested feeds'}
          </h2>
          {suggestions.length === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: 'var(--color-text-tertiary)' }}>
              No feeds found for that search.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {suggestions.map(feed => {
                const cat = CATEGORIES.find(c => c.id === feed.categoryId)
                const isFollowed = followed.has(feed.name)
                return (
                  <div key={feed.name}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
                    <span className="w-9 h-9 rounded-lg text-white flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: feed.avatarColor }}>
                      {feed.letter}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                          {feed.name}
                        </span>
                        {cat && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{ background: cat.bgHex, color: cat.textHex }}>
                            {cat.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs line-clamp-2 sm:line-clamp-1" style={{ color: 'var(--color-text-secondary)' }}>
                        {feed.description}
                      </p>
                    </div>
                    </div>
                    <button
                      onClick={() => toggle(feed.name)}
                      className="w-full sm:w-auto px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-colors text-center"
                      style={{
                        background: isFollowed ? 'var(--color-bg-tertiary)' : 'var(--color-accent)',
                        color: isFollowed ? 'var(--color-text-secondary)' : 'white',
                        border: `1px solid ${isFollowed ? 'var(--color-border)' : 'transparent'}`,
                      }}
                    >
                      {isFollowed ? '✓ Following' : '+ Follow'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
