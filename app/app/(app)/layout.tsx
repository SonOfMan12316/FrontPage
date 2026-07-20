'use client'

import { Suspense } from 'react'
import { TopNav } from '@/components/layout/TopNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { useStore } from '@/lib/store'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useStore(s => s.sidebarCollapsed)

  return (
    <>
      <TopNav />

      <Suspense>
        <Sidebar />
      </Suspense>

      {/* Main — padding-left managed by #main-content CSS + fp-sidebar-collapsed class */}
      <main
        id="main-content"
        className={`pt-14 min-h-screen${collapsed ? ' fp-sidebar-collapsed' : ''}`}
        style={{ background: 'var(--color-bg-primary)' }}
      >
        {children}
      </main>

      <BottomNav />
    </>
  )
}
