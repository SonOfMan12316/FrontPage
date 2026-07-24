'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Article, LayoutMode, SortMode } from './types'
import { ARTICLE_SEEDS } from './mock-data'

interface AppState {
  articles: Article[]
  layout: LayoutMode
  sort: SortMode
  sidebarHidden: boolean
  detailPanelHidden: boolean
  mobileSidebarOpen: boolean
  selectedArticleId: string | null

  setLayout: (l: LayoutMode) => void
  setSort: (s: SortMode) => void
  setSidebarHidden: (v: boolean) => void
  setDetailPanelHidden: (v: boolean) => void
  setMobileSidebarOpen: (v: boolean) => void
  setSelectedArticle: (id: string | null) => void

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
      sidebarHidden: false,
      detailPanelHidden: false,
      mobileSidebarOpen: false,
      selectedArticleId: null,

      setLayout: (layout) => set({ layout }),
      setSort: (sort) => set({ sort }),
      setSidebarHidden: (v) => set({ sidebarHidden: v }),
      setDetailPanelHidden: (v) => set({ detailPanelHidden: v }),
      setMobileSidebarOpen: (v) => set({ mobileSidebarOpen: v }),
      setSelectedArticle: (id) => set({ selectedArticleId: id }),

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
      name: 'frontpage-v2',
      // Don't persist mobile sidebar open state — should reset on page load
      // sidebarHidden intentionally not persisted — sidebar always starts visible
      partialize: (state) => ({
        articles: state.articles,
        layout: state.layout,
        sort: state.sort,
      }),
    }
  )
)
