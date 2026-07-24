'use client'

import { Suspense } from 'react'
import { TopNav } from '@/components/layout/TopNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { DetailPanel } from '@/components/layout/DetailPanel'
import { useStore } from '@/lib/store'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const detailPanelHidden = useStore(s => s.detailPanelHidden)

  return (
    <>
      {/* Mobile-only top nav — hidden on desktop via lg:hidden */}
      <TopNav />

      <div className="fp-app-shell">
        <Suspense>
          <Sidebar />
        </Suspense>

        {/* Center panel: feed list, saved, digest, etc. */}
        <main className="fp-list-panel">
          {children}
        </main>

        {/* Right panel: article detail — desktop only */}
        {!detailPanelHidden && (
          <div className="fp-detail-panel">
            <Suspense>
              <DetailPanel />
            </Suspense>
          </div>
        )}
      </div>

      <BottomNav />
    </>
  )
}
