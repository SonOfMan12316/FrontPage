import Link from 'next/link'
import { HeroHeadline } from '@/components/landing/HeroHeadline'
import { HeroBackground } from '@/components/landing/HeroBackground'

/* ─── Linear-inspired landing page for Frontpage ─────────────────────────── */

function FrontpageLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="11" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.55" />
      <rect x="1" y="11" width="16" height="2" rx="1" fill="currentColor" />
      <rect x="1" y="15" width="10" height="2" rx="1" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

function StackedFeedsIllustration() {
  // Layered card stack viewed from slight angle — suggests curated feeds
  const layers = [0, 1, 2, 3, 4]
  return (
    <svg viewBox="0 0 200 180" fill="none" width="200" aria-hidden>
      {layers.map(i => {
        const y = 130 - i * 20
        const op = 0.18 + i * 0.16
        return (
          <g key={i}>
            <rect x={20 + i * 4} y={y} width="160" height="38" rx="4"
              stroke="white" strokeWidth="0.8" strokeOpacity={op}
              fill="white" fillOpacity={0.02 + i * 0.01} />
            {i === layers.length - 1 && (
              <>
                <circle cx="36" cy={y + 14} r="6" stroke="white" strokeWidth="0.8" strokeOpacity="0.6" />
                <rect x="48" y={y + 10} width="60" height="3" rx="1.5" fill="white" fillOpacity="0.45" />
                <rect x="48" y={y + 16} width="40" height="2.5" rx="1.25" fill="white" fillOpacity="0.25" />
                <rect x="142" y={y + 11} width="22" height="6" rx="3" stroke="white" strokeWidth="0.7" strokeOpacity="0.4" />
              </>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function CategoryBlocksIllustration() {
  // Grouped block cluster — suggests categorisation & speed
  return (
    <svg viewBox="0 0 200 180" fill="none" width="200" aria-hidden>
      {/* top block */}
      <rect x="70" y="20" width="60" height="48" rx="5" stroke="white" strokeWidth="0.8" strokeOpacity="0.35" fill="white" fillOpacity="0.03" />
      <rect x="84" y="34" width="32" height="3" rx="1.5" fill="white" fillOpacity="0.3" />
      <rect x="84" y="40" width="22" height="2.5" rx="1.25" fill="white" fillOpacity="0.18" />
      {/* bottom left */}
      <rect x="18" y="82" width="72" height="58" rx="5" stroke="white" strokeWidth="0.8" strokeOpacity="0.45" fill="white" fillOpacity="0.04" />
      <rect x="30" y="96" width="48" height="3" rx="1.5" fill="white" fillOpacity="0.35" />
      <rect x="30" y="102" width="36" height="2.5" rx="1.25" fill="white" fillOpacity="0.2" />
      <rect x="30" y="108" width="28" height="2.5" rx="1.25" fill="white" fillOpacity="0.12" />
      {/* bottom right */}
      <rect x="110" y="82" width="72" height="58" rx="5" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" fill="white" fillOpacity="0.02" />
      <rect x="122" y="96" width="48" height="3" rx="1.5" fill="white" fillOpacity="0.25" />
      <rect x="122" y="102" width="32" height="2.5" rx="1.25" fill="white" fillOpacity="0.15" />
      {/* connector dots */}
      <circle cx="100" cy="74" r="2" fill="white" fillOpacity="0.25" />
      <line x1="100" y1="68" x2="100" y2="82" stroke="white" strokeWidth="0.6" strokeOpacity="0.2" />
    </svg>
  )
}

function FannedPanelsIllustration() {
  // Cards fanning out to the right — suggests save & queue
  const cards = [0, 1, 2, 3, 4, 5, 6]
  return (
    <svg viewBox="0 0 200 180" fill="none" width="200" aria-hidden>
      {cards.map(i => {
        const x = 20 + i * 22
        const op = 0.12 + i * 0.1
        const h = 120 - i * 6
        const y = (140 - h) / 2
        return (
          <rect key={i} x={x} y={y} width="30" height={h} rx="4"
            stroke="white" strokeWidth="0.8" strokeOpacity={Math.min(op, 0.7)}
            fill="white" fillOpacity={0.01 + i * 0.015} />
        )
      })}
    </svg>
  )
}

const FEATURES = [
  {
    fig: 'FIG 0.1',
    title: 'Curated by default',
    desc: '19 hand-picked feeds across frontend, design, backend, and AI — ready the moment you arrive.',
    Illustration: StackedFeedsIllustration,
  },
  {
    fig: 'FIG 0.2',
    title: 'Built for speed',
    desc: 'Read time estimates, day grouping, and a Digest view help you process more in less time.',
    Illustration: CategoryBlocksIllustration,
  },
  {
    fig: 'FIG 0.3',
    title: 'Save for later',
    desc: 'Bookmark any article and pick up where you left off — no accounts required in guest mode.',
    Illustration: FannedPanelsIllustration,
  },
]

const WORKFLOW = [
  {
    version: '1.0',
    label: 'Discover',
    title: 'Follow the sources that matter',
    desc: 'Browse 19 curated feeds across five categories. Add your own RSS and Atom sources when you are ready.',
    link: 'Sources →',
  },
  {
    version: '2.0',
    label: 'Read',
    title: 'One calm reading dashboard',
    desc: 'No algorithm, no ads. Group by day, filter by category, and mark articles read as you go.',
    link: 'Feed →',
  },
  {
    version: '3.0',
    label: 'Digest',
    title: 'Catch up in minutes',
    desc: 'The Digest view summarizes what you missed — perfect for a quick morning scan before standup.',
    link: 'Digest →',
  },
]

const FEED_ITEMS = [
  { letter: 'C', color: '#264de4', feed: 'CSS-Tricks', time: '1h ago', title: 'A Deep Dive into CSS Anchor Positioning', tag: 'Frontend', unread: true },
  { letter: 'F', color: '#a259ff', feed: 'Figma Blog', time: '2h ago', title: 'Introducing Figma Variables: Design Tokens at Scale', tag: 'Design', unread: true },
  { letter: 'S', color: '#0369a1', feed: "Simon Willison's Weblog", time: '3h ago', title: 'LLMs as Tools vs. Agents: Where the Line Actually Is', tag: 'AI & ML', unread: false },
  { letter: 'V', color: '#646cff', feed: 'Vercel Blog', time: '5h ago', title: 'How We Cut Cold Start Times by 40%', tag: 'Backend', unread: false },
]

const SIDEBAR_ITEMS = [
  { label: 'All feeds', count: 12, active: true },
  { label: 'Frontend', count: 4 },
  { label: 'Design', count: 3 },
  { label: 'AI & ML', count: 2 },
  { label: 'Saved', count: 5 },
]

export default function LandingPage() {
  return (
    <div className="landing">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header className="landing-nav">
        <div className="landing-container landing-nav-inner">
          <Link href="/" className="landing-logo">
            <FrontpageLogo />
            <span>Frontpage</span>
          </Link>

          <nav className="landing-nav-links" aria-label="Main">
            <a href="#features">Features</a>
            <a href="#workflow">Workflow</a>
            <a href="#sources">Sources</a>
          </nav>

          <div className="landing-nav-actions">
            <Link href="/feed" className="landing-link-muted">Log in</Link>
            <Link href="/feed" className="landing-btn-primary">Sign up</Link>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="landing-hero">
          <HeroBackground />

          <div className="landing-container landing-hero-content">
            <HeroHeadline />

            <p className="landing-hero-desc">
              Your tech feeds, one place. No algorithm.
            </p>


          </div>

          {/* Product mockup */}
          <div className="landing-container landing-mockup-wrap">
            <div className="landing-mockup">
              {/* Sidebar */}
              <aside className="landing-mockup-sidebar">
                <div className="landing-mockup-sidebar-header">
                  <FrontpageLogo />
                  <span>Frontpage</span>
                </div>
                <div className="landing-mockup-sidebar-section">
                  <p className="landing-mockup-label">Feeds</p>
                  {SIDEBAR_ITEMS.map(item => (
                    <div
                      key={item.label}
                      className={`landing-mockup-nav-item${item.active ? ' active' : ''}`}
                    >
                      <span>{item.label}</span>
                      {item.count > 0 && <span className="landing-mockup-count">{item.count}</span>}
                    </div>
                  ))}
                </div>
                <div className="landing-mockup-sidebar-section">
                  <p className="landing-mockup-label">Sources</p>
                  {['CSS-Tricks', 'Figma Blog', 'Smashing Mag'].map(name => (
                    <div key={name} className="landing-mockup-nav-item muted">
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Main feed */}
              <div className="landing-mockup-main">
                <div className="landing-mockup-toolbar">
                  <span className="landing-mockup-toolbar-title">All feeds</span>
                  <span className="landing-mockup-toolbar-meta">12 unread · Today</span>
                </div>
                <div className="landing-mockup-feed">
                  {FEED_ITEMS.map((item, i) => (
                    <div key={i} className="landing-mockup-article">
                      {item.unread && <span className="landing-mockup-unread" />}
                      <span
                        className="landing-mockup-avatar"
                        style={{ background: item.color }}
                      >
                        {item.letter}
                      </span>
                      <div className="landing-mockup-article-body">
                        <div className="landing-mockup-article-meta">
                          <span>{item.feed}</span>
                          <span>· {item.time}</span>
                        </div>
                        <p className="landing-mockup-article-title">{item.title}</p>
                        <span className="landing-mockup-tag">{item.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating digest card — Linear-style overlay */}
              <div className="landing-mockup-float">
                <div className="landing-mockup-float-header">
                  <span className="landing-mockup-float-dot" />
                  Daily Digest
                </div>
                <p className="landing-mockup-float-title">4 articles · 12 min read</p>
                <ul className="landing-mockup-float-list">
                  <li>CSS Anchor Positioning deep dive</li>
                  <li>Figma Variables at scale</li>
                  <li>LLMs as tools vs agents</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature cards ───────────────────────────────────────────────── */}
        <section id="features" className="landing-dark-features">
          <HeroBackground />
          <div className="landing-container" style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="landing-dark-statement">
              <span className="landing-dark-statement-line bright">A new way to stay current.</span>
              <span className="landing-dark-statement-line dim">Purpose-built for developers and designers who read for a living.</span>
            </h2>
            <div className="landing-feat-cols">
              {FEATURES.map(f => (
                <div key={f.fig} className="landing-feat-col">
                  <span className="landing-feat-fig">{f.fig}</span>
                  <div className="landing-feat-col-visual">
                    <f.Illustration />
                  </div>
                  <h3 className="landing-feat-card-title">{f.title}</h3>
                  <p className="landing-feat-card-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Workflow sections ─────────────────────────────────────────── */}
        <section id="workflow" className="landing-workflow">
          {WORKFLOW.map((step, i) => (
            <div key={step.version} className={`landing-workflow-row${i % 2 === 1 ? ' reverse' : ''}`}>
              <div className="landing-container landing-workflow-inner">
                <div className="landing-workflow-copy">
                  <Link href="/feed" className="landing-version-link">
                    {step.version}{step.label} →
                  </Link>
                  <h3 className="landing-workflow-title">{step.title}</h3>
                  <p className="landing-workflow-desc">{step.desc}</p>
                </div>
                <div className="landing-workflow-visual">
                  {i === 0 && (
                    <div className="landing-mini-card">
                      {['CSS-Tricks', 'Figma Blog', 'Smashing Mag', 'Vercel Blog', 'Hacker News'].map((s, j) => (
                        <div key={s} className="landing-mini-row">
                          <span className="landing-mini-dot" style={{ opacity: 1 - j * 0.15 }} />
                          <span>{s}</span>
                          <span className="landing-mini-count">{19 - j * 3}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 1 && (
                    <div className="landing-mini-card">
                      {FEED_ITEMS.slice(0, 3).map(item => (
                        <div key={item.title} className="landing-mini-article">
                          <span className="landing-mockup-avatar sm" style={{ background: item.color }}>{item.letter}</span>
                          <div>
                            <p className="landing-mini-article-title">{item.title}</p>
                            <span className="landing-mockup-tag">{item.tag}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 2 && (
                    <div className="landing-mini-card digest">
                      <p className="landing-digest-date">Monday, Jul 20</p>
                      <p className="landing-digest-summary">You have 12 unread articles across 4 categories.</p>
                      <div className="landing-digest-stats">
                        <div><strong>4</strong><span>Frontend</span></div>
                        <div><strong>3</strong><span>Design</span></div>
                        <div><strong>2</strong><span>AI & ML</span></div>
                        <div><strong>3</strong><span>Other</span></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Sources strip ───────────────────────────────────────────────── */}
        <section id="sources" className="landing-sources">
          <div className="landing-container landing-sources-inner">
            <p className="landing-sources-label">19 curated sources across 5 categories</p>
            <div className="landing-sources-list">
              {['Frontend', 'Design', 'Backend & DevOps', 'General Tech', 'AI & ML'].map((cat, i, arr) => (
                <span key={cat}>
                  <Link href="/feed">{cat}</Link>
                  {i < arr.length - 1 && <span className="landing-sources-sep" aria-hidden>·</span>}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="landing-cta">
          <div className="landing-container landing-cta-inner">
            <h2 className="landing-cta-title">Built for readers. Available today.</h2>
            <div className="landing-cta-actions">
              <Link href="/feed" className="landing-btn-primary lg">Get started</Link>
              <Link href="/feed" className="landing-btn-ghost lg">Try as guest</Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <div className="landing-footer-brand">
            <Link href="/" className="landing-logo sm">
              <FrontpageLogo />
              <span>Frontpage</span>
            </Link>
            <p>Your personalized front page for tech content.</p>
          </div>
          <div className="landing-footer-links">
            <div>
              <p className="landing-footer-heading">Product</p>
              <Link href="/feed">Feed</Link>
              <Link href="/digest">Digest</Link>
              <Link href="/saved">Saved</Link>
              <Link href="/discover">Discover</Link>
            </div>
            <div>
              <p className="landing-footer-heading">Resources</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="#features">Features</a>
            </div>
          </div>
        </div>
        <div className="landing-container landing-footer-bottom">
          <span>Built with Next.js 15 + Tailwind v4</span>
        </div>
      </footer>
    </div>
  )
}
