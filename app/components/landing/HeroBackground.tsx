import type { CSSProperties } from 'react'

export function HeroBackground() {
  return (
    <div className="landing-hero-bg" aria-hidden>
      <div className="landing-hero-bg-base" />
      <div className="landing-hero-bg-glow landing-hero-bg-glow--blue" />
      <div className="landing-hero-bg-glow landing-hero-bg-glow--violet" />
      <div className="landing-hero-bg-glow landing-hero-bg-glow--indigo" />
      <div className="landing-hero-bg-rings">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="landing-hero-bg-ring"
            style={{ '--ring-i': i } as CSSProperties}
          />
        ))}
      </div>
      <div className="landing-hero-bg-grid" />
    </div>
  )
}
