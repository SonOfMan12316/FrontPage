'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Article, LayoutMode, SortMode } from './types'
import { ARTICLE_SEEDS } from './mock-data'

interface AppState {
  articles: Article[]
  layout: LayoutMode
  sort: SortMode
  // Desktop: sidebar collapsed to icon-only mode
  sidebarCollapsed: boolean
  // Mobile: sidebar drawer is open
  mobileSidebarOpen: boolean

  setLayout: (l: LayoutMode) => void
  setSort: (s: SortMode) => void
  toggleSidebar: () => void
  setMobileSidebarOpen: (v: boolean) => void

  toggleRead: (id: string) => void
  toggleSaved: (id: string) => void
  markAllRead: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      articles: ARTICLE_SEEDS.map(a => ({ ...a, isRead: false, isSaved: false })),
      layout: 'list' as LayoutMode,
      sort: 'newest' as SortMode,
      sidebarCollapsed: false,
      mobileSidebarOpen: false,

      setLayout: (layout) => set({ layout }),
      setSort: (sort) => set({ sort }),
      toggleSidebar: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setMobileSidebarOpen: (v) => set({ mobileSidebarOpen: v }),

      toggleRead: (id) =>
        set(s => ({
          articles: s.articles.map(a => (a.id === id ? { ...a, isRead: !a.isRead } : a)),
        })),

      toggleSaved: (id) =>
        set(s => ({
          articles: s.articles.map(a => (a.id === id ? { ...a, isSaved: !a.isSaved } : a)),
        })),

      markAllRead: () =>
        set(s => ({ articles: s.articles.map(a => ({ ...a, isRead: true })) })),
    }),
    {
      name: 'frontpage-v1',
      // Don't persist mobile sidebar open state — should reset on page load
      partialize: (state) => ({
        articles: state.articles,
        layout: state.layout,
        sort: state.sort,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)
