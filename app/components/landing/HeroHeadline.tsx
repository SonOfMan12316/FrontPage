'use client'

import { useEffect, useState } from 'react'

const WORDS = ['RSS reader', 'newsletters', 'dev blogs', 'read-it-later'] as const
const INTERVAL_MS = 3200

function AnimatedWord({ index }: { index: number }) {
  return (
    <span className="landing-hero-word-slot" aria-live="polite">
      <span className="landing-hero-word-sizer" aria-hidden>
        read-it-later
      </span>
      <span key={index} className="landing-hero-word">
        {WORDS[index]}
      </span>
    </span>
  )
}

export function HeroHeadline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const intervalId = setInterval(() => {
      setIndex(i => (i + 1) % WORDS.length)
    }, INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <h1
      className="landing-hero-title"
      aria-label={`The first ${WORDS[index]} dashboard for power readers.`}
    >
      <span className="landing-hero-stacked">
        <span className="landing-hero-stacked-line">
          The first <AnimatedWord index={index} />
        </span>
        <span className="landing-hero-stacked-line">dashboard for power readers.</span>
      </span>
    </h1>
  )
}
