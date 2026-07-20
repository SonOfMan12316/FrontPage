import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Frontpage — Your personalized tech feed',
  description: 'An RSS and Atom feed aggregator for developers and designers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Inter loaded via Google Fonts — add to <head> in production for best results */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
