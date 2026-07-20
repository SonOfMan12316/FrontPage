export type CategoryId = 'frontend' | 'design' | 'backend' | 'general' | 'ai'

export interface Category {
  id: CategoryId
  name: string
  color: string      // hex
  bgHex: string      // light bg hex
  textHex: string    // text hex
}

export interface Feed {
  id: string
  name: string
  url: string
  categoryId: CategoryId
  letter: string
  avatarColor: string
  status: 'active' | 'stale' | 'error'
}

export interface Article {
  id: string
  feedId: string
  feedName: string
  feedLetter: string
  feedAvatarColor: string
  categoryId: CategoryId
  categoryName: string
  title: string
  excerpt: string
  content: string
  url: string
  publishedAt: string  // ISO string
  readTimeMin: number
  isRead: boolean
  isSaved: boolean
}

export type LayoutMode = 'list' | 'card' | 'magazine'
export type SortMode = 'newest' | 'oldest' | 'unread-first'
