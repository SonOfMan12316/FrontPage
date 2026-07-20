import type { Article, Category, Feed } from './types'

const now = Date.now()
const h = (n: number) => new Date(now - n * 60 * 60 * 1000).toISOString()

export const CATEGORIES: Category[] = [
  { id: 'frontend', name: 'Frontend',          color: '#3b82f6', bgHex: '#dbeafe', textHex: '#1d4ed8' },
  { id: 'design',   name: 'Design',             color: '#ec4899', bgHex: '#fce7f3', textHex: '#9d174d' },
  { id: 'backend',  name: 'Backend & DevOps',   color: '#8b5cf6', bgHex: '#ede9fe', textHex: '#5b21b6' },
  { id: 'general',  name: 'General Tech',        color: '#f97316', bgHex: '#ffedd5', textHex: '#c2410c' },
  { id: 'ai',       name: 'AI & ML',             color: '#6366f1', bgHex: '#e0e7ff', textHex: '#3730a3' },
]

export const FEEDS: Feed[] = [
  // Frontend
  { id: 'css-tricks',     name: 'CSS-Tricks',             url: 'https://css-tricks.com/feed/',                         categoryId: 'frontend', letter: 'C', avatarColor: '#264de4', status: 'active' },
  { id: 'smashing',       name: 'Smashing Magazine',      url: 'https://www.smashingmagazine.com/feed/',               categoryId: 'frontend', letter: 'S', avatarColor: '#e74c3c', status: 'active' },
  { id: 'josh-comeau',    name: 'Josh W. Comeau',         url: 'https://www.joshwcomeau.com/rss.xml',                  categoryId: 'frontend', letter: 'J', avatarColor: '#7c3aed', status: 'active' },
  { id: 'kent-dodds',     name: 'Kent C. Dodds',          url: 'https://kentcdodds.com/blog/rss.xml',                  categoryId: 'frontend', letter: 'K', avatarColor: '#059669', status: 'active' },
  { id: 'web-dev',        name: 'web.dev',                url: 'https://web.dev/feed.xml',                             categoryId: 'frontend', letter: 'W', avatarColor: '#0284c7', status: 'active' },
  { id: 'mdn-blog',       name: 'MDN Blog',               url: 'https://developer.mozilla.org/en-US/blog/rss.xml',     categoryId: 'frontend', letter: 'M', avatarColor: '#1f2937', status: 'active' },
  // Design
  { id: 'sidebar',        name: 'Sidebar.io',             url: 'https://sidebar.io/feed.xml',                          categoryId: 'design', letter: 'S', avatarColor: '#f59e0b', status: 'active' },
  { id: 'nngroup',        name: 'Nielsen Norman Group',   url: 'https://feeds.feedburner.com/nngroup',                 categoryId: 'design', letter: 'N', avatarColor: '#dc2626', status: 'active' },
  { id: 'figma-blog',     name: 'Figma Blog',             url: 'https://www.figma.com/blog/feed/',                     categoryId: 'design', letter: 'F', avatarColor: '#a259ff', status: 'active' },
  { id: 'alistapart',     name: 'A List Apart',           url: 'https://alistapart.com/main/feed/',                    categoryId: 'design', letter: 'A', avatarColor: '#16a34a', status: 'stale'  },
  { id: 'ux-collective',  name: 'UX Collective',          url: 'https://uxdesign.cc/feed',                             categoryId: 'design', letter: 'U', avatarColor: '#2563eb', status: 'active' },
  // Backend & DevOps
  { id: 'cloudflare',     name: 'Cloudflare Blog',        url: 'https://blog.cloudflare.com/rss/',                     categoryId: 'backend', letter: 'C', avatarColor: '#f48120', status: 'active' },
  { id: 'vercel',         name: 'Vercel Blog',            url: 'https://vercel.com/atom',                              categoryId: 'backend', letter: 'V', avatarColor: '#1f2937', status: 'active' },
  { id: 'github-blog',    name: 'The GitHub Blog',        url: 'https://github.blog/feed/',                            categoryId: 'backend', letter: 'G', avatarColor: '#24292f', status: 'active' },
  { id: 'netlify',        name: 'Netlify Blog',           url: 'https://www.netlify.com/blog/index.xml',               categoryId: 'backend', letter: 'N', avatarColor: '#00ad9f', status: 'active' },
  // General Tech
  { id: 'pragmatic-eng',  name: 'The Pragmatic Engineer', url: 'https://newsletter.pragmaticengineer.com/feed',        categoryId: 'general', letter: 'P', avatarColor: '#0f172a', status: 'active' },
  { id: 'hn-best',        name: 'Hacker News Best',       url: 'https://hnrss.org/best',                               categoryId: 'general', letter: 'Y', avatarColor: '#ff6600', status: 'active' },
  // AI & ML
  { id: 'simon-willison', name: "Simon Willison's Weblog", url: 'https://simonwillison.net/atom/everything/',           categoryId: 'ai', letter: 'S', avatarColor: '#0369a1', status: 'active' },
  { id: 'hugging-face',   name: 'Hugging Face Blog',      url: 'https://huggingface.co/blog/feed.xml',                 categoryId: 'ai', letter: 'H', avatarColor: '#b45309', status: 'active' },
]

type ArticleSeed = Omit<Article, 'isRead' | 'isSaved'>

export const ARTICLE_SEEDS: ArticleSeed[] = [
  // ── Frontend ────────────────────────────────────────────────────────────────
  {
    id: 'art-001',
    feedId: 'css-tricks', feedName: 'CSS-Tricks', feedLetter: 'C', feedAvatarColor: '#264de4',
    categoryId: 'frontend', categoryName: 'Frontend',
    title: 'A Deep Dive into CSS Anchor Positioning',
    excerpt: 'CSS Anchor Positioning is one of the most exciting CSS features in years, letting you position elements relative to another element without any JavaScript.',
    content: `<p>CSS Anchor Positioning is a game-changing feature that allows you to position elements relative to other elements purely in CSS. No more JavaScript hacks for tooltips, dropdowns, and popovers.</p><p>The feature introduces the <code>anchor()</code> function and the <code>position-anchor</code> property, giving you fine-grained control over how elements relate to each other spatially.</p><pre><code>.tooltip {
  position: fixed;
  bottom: anchor(--button top);
  left: anchor(--button center);
}</code></pre><p>This unlocks a whole new class of UI patterns without touching JavaScript at all.</p>`,
    url: 'https://css-tricks.com/anchor-positioning', publishedAt: h(1), readTimeMin: 7,
  },
  {
    id: 'art-002',
    feedId: 'css-tricks', feedName: 'CSS-Tricks', feedLetter: 'C', feedAvatarColor: '#264de4',
    categoryId: 'frontend', categoryName: 'Frontend',
    title: 'Using the View Transition API for Page-Level Animations',
    excerpt: 'The View Transition API lets you create seamless animated transitions between page states — now available without flags in Chrome and Edge.',
    content: `<p>Animated page transitions used to require heavy JavaScript frameworks or complex CSS choreography. The View Transition API changes that completely.</p><p>With just a single CSS rule and one JavaScript call, you can get polished cross-fade transitions between any two states.</p>`,
    url: 'https://css-tricks.com/view-transitions', publishedAt: h(3), readTimeMin: 5,
  },
  {
    id: 'art-003',
    feedId: 'web-dev', feedName: 'web.dev', feedLetter: 'W', feedAvatarColor: '#0284c7',
    categoryId: 'frontend', categoryName: 'Frontend',
    title: 'Interop 2025: What Browsers Fixed Together',
    excerpt: 'The Interop project brings browser vendors together to squash cross-browser inconsistencies. Here is what shipped this year and why it matters.',
    content: `<p>Every year, browser vendors collaborate on Interop — a focused effort to close the gaps in web standards implementation. 2025 was a banner year.</p><p>Key wins include Scroll-driven Animations, CSS Nesting, the Popover API, and long-awaited fixes to subgrid support across all engines.</p>`,
    url: 'https://web.dev/interop-2025', publishedAt: h(5), readTimeMin: 8,
  },
  {
    id: 'art-004',
    feedId: 'josh-comeau', feedName: 'Josh W. Comeau', feedLetter: 'J', feedAvatarColor: '#7c3aed',
    categoryId: 'frontend', categoryName: 'Frontend',
    title: 'An Interactive Guide to CSS Grid',
    excerpt: 'After years of using CSS Grid, I still find myself consulting the spec. This guide builds an intuitive mental model through hands-on interactive demos.',
    content: `<p>CSS Grid is powerful but notoriously hard to build a mental model for. The challenge is that it introduces two axes of control simultaneously — rows and columns — with properties that apply to both container and children.</p><p>In this guide, I walk through every major property with interactive visualizations that let you see how changes affect layout in real time.</p>`,
    url: 'https://www.joshwcomeau.com/css/interactive-guide-to-grid', publishedAt: h(26), readTimeMin: 15,
  },
  {
    id: 'art-005',
    feedId: 'smashing', feedName: 'Smashing Magazine', feedLetter: 'S', feedAvatarColor: '#e74c3c',
    categoryId: 'frontend', categoryName: 'Frontend',
    title: 'Component Driven Development with Storybook 8',
    excerpt: 'Storybook 8 brings first-class support for React Server Components, improved build performance, and a refreshed addon ecosystem.',
    content: `<p>Storybook has long been the standard tool for isolated component development. Version 8 is its most significant release yet, adding React Server Components support and dramatically improving build performance.</p>`,
    url: 'https://www.smashingmagazine.com/storybook-8', publishedAt: h(28), readTimeMin: 10,
  },
  {
    id: 'art-006',
    feedId: 'mdn-blog', feedName: 'MDN Blog', feedLetter: 'M', feedAvatarColor: '#1f2937',
    categoryId: 'frontend', categoryName: 'Frontend',
    title: 'CSS :has() is More Powerful Than You Think',
    excerpt: 'The :has() pseudo-class is often called the "parent selector" but it unlocks patterns far beyond parent-child relationships.',
    content: `<p>When :has() landed, developers immediately reached for it as a parent selector. But that is just scratching the surface. You can use :has() to detect state, count children, conditionally apply layout changes, and create entirely new patterns impossible in pure CSS before.</p>`,
    url: 'https://developer.mozilla.org/en-US/blog/css-has-selector', publishedAt: h(30), readTimeMin: 6,
  },
  {
    id: 'art-023',
    feedId: 'kent-dodds', feedName: 'Kent C. Dodds', feedLetter: 'K', feedAvatarColor: '#059669',
    categoryId: 'frontend', categoryName: 'Frontend',
    title: 'Why I Stopped Using useEffect for Data Fetching',
    excerpt: 'useEffect data fetching has well-documented problems. But the alternatives each have their own tradeoffs — here is how to think about the decision.',
    content: `<p>The React team has been saying for years that useEffect is not the right tool for data fetching. But understanding why, and knowing what to use instead, still trips up many developers.</p><p>The core issue is that useEffect runs after render, which means you always get at least one render with empty data before your fetch even starts.</p>`,
    url: 'https://kentcdodds.com/blog/stop-using-useeffect-for-fetching', publishedAt: h(48), readTimeMin: 9,
  },
  {
    id: 'art-024',
    feedId: 'smashing', feedName: 'Smashing Magazine', feedLetter: 'S', feedAvatarColor: '#e74c3c',
    categoryId: 'frontend', categoryName: 'Frontend',
    title: 'Accessible Forms in 2025: What Has Changed',
    excerpt: 'Form accessibility has improved with new ARIA attributes and better browser support — but common mistakes still abound. An updated guide.',
    content: `<p>Forms are where accessibility failures are most painful — users cannot complete tasks, cannot recover from errors, cannot understand what is being asked. The good news is browser support for ARIA patterns has never been better.</p>`,
    url: 'https://www.smashingmagazine.com/accessible-forms-2025', publishedAt: h(50), readTimeMin: 11,
  },

  // ── Design ───────────────────────────────────────────────────────────────────
  {
    id: 'art-007',
    feedId: 'figma-blog', feedName: 'Figma Blog', feedLetter: 'F', feedAvatarColor: '#a259ff',
    categoryId: 'design', categoryName: 'Design',
    title: 'Introducing Figma Variables: Design Tokens at Scale',
    excerpt: 'Figma Variables let you define and manage design tokens — colors, spacing, typography — directly in your design files and sync them to code.',
    content: `<p>Design tokens bridge the gap between design tools and code. With Figma Variables, you can now define your token system once, apply it everywhere in your designs, and export it to your codebase in a format engineers can actually use.</p>`,
    url: 'https://www.figma.com/blog/variables', publishedAt: h(2), readTimeMin: 8,
  },
  {
    id: 'art-008',
    feedId: 'nngroup', feedName: 'Nielsen Norman Group', feedLetter: 'N', feedAvatarColor: '#dc2626',
    categoryId: 'design', categoryName: 'Design',
    title: 'The Problem with Dark Patterns in 2025',
    excerpt: 'Dark patterns have evolved. They are harder to spot, more legally scrutinized, and embedded in flows most users never question.',
    content: `<p>In 2010, dark patterns were obvious: confusing unsubscribe buttons, pre-checked newsletter boxes, hidden fees. In 2025, they are far more sophisticated — woven into onboarding flows, consent dialogs, and subscription management in ways that exploit cognitive load rather than pure deception.</p>`,
    url: 'https://www.nngroup.com/articles/dark-patterns-2025', publishedAt: h(4), readTimeMin: 9,
  },
  {
    id: 'art-009',
    feedId: 'ux-collective', feedName: 'UX Collective', feedLetter: 'U', feedAvatarColor: '#2563eb',
    categoryId: 'design', categoryName: 'Design',
    title: 'Why Your Empty States Are Costing You Retention',
    excerpt: 'Empty states are a missed opportunity. The moment a user sees nothing is the moment they are most likely to leave — or most open to guidance.',
    content: `<p>When a user first opens your app, they encounter empty states everywhere: empty inbox, empty project board, empty feed. These moments feel like failures, but they are actually your best opportunity to onboard users into your product's core value.</p>`,
    url: 'https://uxdesign.cc/empty-states-retention', publishedAt: h(27), readTimeMin: 6,
  },
  {
    id: 'art-010',
    feedId: 'sidebar', feedName: 'Sidebar.io', feedLetter: 'S', feedAvatarColor: '#f59e0b',
    categoryId: 'design', categoryName: 'Design',
    title: '5 Design Systems Worth Stealing From',
    excerpt: 'Not all design systems are equal. These five have been open-sourced, battle-tested, and they have something yours probably does not.',
    content: `<p>The best design systems are never finished — they are maintained, evolved, and refined based on real product usage. Here are five that stand out in the open source landscape and why each one is worth studying closely.</p>`,
    url: 'https://sidebar.io/design-systems', publishedAt: h(29), readTimeMin: 5,
  },
  {
    id: 'art-026',
    feedId: 'ux-collective', feedName: 'UX Collective', feedLetter: 'U', feedAvatarColor: '#2563eb',
    categoryId: 'design', categoryName: 'Design',
    title: 'Designing for Trust: What Makes Users Feel Safe',
    excerpt: 'Trust is not a feature you ship — it is a feeling built through dozens of micro-interactions, disclosures, and moments of consistency.',
    content: `<p>Trust is the foundation of every successful product. Users decide within seconds whether to trust your app, and that judgment is rarely based on your privacy policy. It comes from visual cues, copy tone, predictable behavior, and whether the app does what it says it does.</p>`,
    url: 'https://uxdesign.cc/designing-for-trust', publishedAt: h(8), readTimeMin: 7,
  },

  // ── Backend & DevOps ─────────────────────────────────────────────────────────
  {
    id: 'art-011',
    feedId: 'cloudflare', feedName: 'Cloudflare Blog', feedLetter: 'C', feedAvatarColor: '#f48120',
    categoryId: 'backend', categoryName: 'Backend & DevOps',
    title: 'Announcing Workers for Platforms: Wildcard Route Support',
    excerpt: 'Workers for Platforms now supports wildcard routes, making it dramatically easier to build multi-tenant applications at the edge.',
    content: `<p>Multi-tenant applications have always been a challenge at the edge. You need to route requests to different customer environments, isolate workloads, and manage deployment without downtime. Wildcard route support changes this fundamentally.</p>`,
    url: 'https://blog.cloudflare.com/workers-platforms-wildcard', publishedAt: h(1.5), readTimeMin: 7,
  },
  {
    id: 'art-012',
    feedId: 'vercel', feedName: 'Vercel Blog', feedLetter: 'V', feedAvatarColor: '#1f2937',
    categoryId: 'backend', categoryName: 'Backend & DevOps',
    title: 'Fluid Compute: How Vercel Rethought Serverless Scaling',
    excerpt: "Traditional serverless has a cold start problem. Fluid Compute is Vercel's answer: stateful, long-lived workers that still scale like serverless.",
    content: `<p>Serverless compute has a well-known tradeoff: you pay only for what you use, but cold starts add latency spikes that hurt user experience. Fluid Compute bridges the gap — functions that are warm when they need to be, and dormant when they do not.</p>`,
    url: 'https://vercel.com/blog/fluid-compute', publishedAt: h(6), readTimeMin: 9,
  },
  {
    id: 'art-013',
    feedId: 'github-blog', feedName: 'The GitHub Blog', feedLetter: 'G', feedAvatarColor: '#24292f',
    categoryId: 'backend', categoryName: 'Backend & DevOps',
    title: 'GitHub Actions: New M-Series Apple Silicon Runners',
    excerpt: 'GitHub-hosted runners now include M1 and M2 Mac configurations, cutting iOS CI build times by up to 40%.',
    content: `<p>Building and testing iOS apps in CI has always been painful — slow machines, high queue times, inconsistent environments. With GitHub-hosted M-series runners, that changes dramatically. Early customers are seeing 30-40% faster builds on typical iOS projects.</p>`,
    url: 'https://github.blog/actions-m-series-runners', publishedAt: h(25), readTimeMin: 4,
  },
  {
    id: 'art-014',
    feedId: 'github-blog', feedName: 'The GitHub Blog', feedLetter: 'G', feedAvatarColor: '#24292f',
    categoryId: 'backend', categoryName: 'Backend & DevOps',
    title: 'How We Reduced GitHub.com P99 Latency by 60%',
    excerpt: 'A deep-dive into how the GitHub infrastructure team identified and eliminated a cache invalidation bottleneck silently affecting thousands of requests per second.',
    content: `<p>Performance improvements rarely come from dramatic rewrites. More often, they come from patient instrumentation, careful hypothesis testing, and fixing the one thing that is quietly costing you a huge amount. This is the story of one of those investigations.</p>`,
    url: 'https://github.blog/latency-reduction', publishedAt: h(32), readTimeMin: 12,
  },
  {
    id: 'art-015',
    feedId: 'netlify', feedName: 'Netlify Blog', feedLetter: 'N', feedAvatarColor: '#00ad9f',
    categoryId: 'backend', categoryName: 'Backend & DevOps',
    title: 'Deploy Previews Just Got Collaborative: Comments on Branches',
    excerpt: 'Netlify Deploy Previews now support threaded comments, making design reviews and QA faster without leaving the preview URL.',
    content: `<p>Deploy previews have always been great for sharing work-in-progress. Adding threaded comments brings them closer to a full review workflow — no need to context-switch to a separate tool to leave feedback on visual changes.</p>`,
    url: 'https://www.netlify.com/blog/deploy-preview-comments', publishedAt: h(7), readTimeMin: 4,
  },
  {
    id: 'art-025',
    feedId: 'cloudflare', feedName: 'Cloudflare Blog', feedLetter: 'C', feedAvatarColor: '#f48120',
    categoryId: 'backend', categoryName: 'Backend & DevOps',
    title: 'How We Scaled R2 to Store 100 Billion Objects',
    excerpt: "Object storage at extreme scale requires rethinking every assumption. Here is what changed in R2's metadata layer to reach 100 billion objects.",
    content: `<p>Scaling an object storage system from millions to billions of objects sounds like just adding more machines. It turns out the metadata layer — the index of what exists where — becomes the bottleneck well before the storage layer does.</p>`,
    url: 'https://blog.cloudflare.com/r2-100-billion-objects', publishedAt: h(22), readTimeMin: 13,
  },

  // ── General Tech ─────────────────────────────────────────────────────────────
  {
    id: 'art-016',
    feedId: 'pragmatic-eng', feedName: 'The Pragmatic Engineer', feedLetter: 'P', feedAvatarColor: '#0f172a',
    categoryId: 'general', categoryName: 'General Tech',
    title: 'The State of Engineering Hiring in 2025',
    excerpt: 'After two years of layoffs and freeze, engineering hiring is recovering — but the bar has shifted. What companies are actually looking for has changed.',
    content: `<p>The engineering job market in 2025 looks very different from 2022. The era of hiring at all costs is gone, replaced by a more measured approach that values demonstrated impact over credentials. This shift has real implications for both job seekers and engineering leaders.</p>`,
    url: 'https://newsletter.pragmaticengineer.com/hiring-2025', publishedAt: h(23), readTimeMin: 18,
  },
  {
    id: 'art-017',
    feedId: 'hn-best', feedName: 'Hacker News Best', feedLetter: 'Y', feedAvatarColor: '#ff6600',
    categoryId: 'general', categoryName: 'General Tech',
    title: 'I built a personal finance tracker in SQLite and it replaced four paid apps',
    excerpt: 'Sometimes the best tool is one you build yourself — a few hundred lines of SQL and a simple web UI gave me more insight than any app I have paid for.',
    content: `<p>I have tried every personal finance app. They all have the same problems: too many features I do not use, subscription fees, and limited ability to answer the specific questions I have about my spending.</p><p>So I built my own using SQLite and a minimal Python web server, and it has been the most useful financial tool I have ever used.</p>`,
    url: 'https://news.ycombinator.com/item?id=38827149', publishedAt: h(8), readTimeMin: 11,
  },
  {
    id: 'art-018',
    feedId: 'hn-best', feedName: 'Hacker News Best', feedLetter: 'Y', feedAvatarColor: '#ff6600',
    categoryId: 'general', categoryName: 'General Tech',
    title: 'Ask HN: What technical book changed how you think?',
    excerpt: 'A thread of book recommendations from experienced engineers — covering systems design, programming, algorithms, and engineering culture.',
    content: `<p>Every few years this question surfaces on HN and the answers never get old. The books mentioned range from classics like SICP and The Pragmatic Programmer to less obvious picks that have shaped how engineers approach hard problems.</p>`,
    url: 'https://news.ycombinator.com/item?id=38827150', publishedAt: h(36), readTimeMin: 20,
  },

  // ── AI & ML ──────────────────────────────────────────────────────────────────
  {
    id: 'art-019',
    feedId: 'simon-willison', feedName: "Simon Willison's Weblog", feedLetter: 'S', feedAvatarColor: '#0369a1',
    categoryId: 'ai', categoryName: 'AI & ML',
    title: 'LLMs as Tools vs. Agents: Where the Line Actually Is',
    excerpt: 'The distinction between using an LLM as a tool and giving it agency over your system is not academic — it has real security and reliability implications.',
    content: `<p>When you ask an LLM to summarize text, it is a tool. When you let it decide what files to read and what code to run, it is an agent. The difference is not just philosophical — it determines your attack surface, your failure modes, and what you need to monitor.</p>`,
    url: 'https://simonwillison.net/llm-tools-vs-agents', publishedAt: h(2.5), readTimeMin: 8,
  },
  {
    id: 'art-020',
    feedId: 'simon-willison', feedName: "Simon Willison's Weblog", feedLetter: 'S', feedAvatarColor: '#0369a1',
    categoryId: 'ai', categoryName: 'AI & ML',
    title: 'Everything I Know About Prompt Injection',
    excerpt: 'Prompt injection is the SQL injection of the LLM era. Here is a comprehensive rundown of every variant I have seen and how to think about defenses.',
    content: `<p>Prompt injection attacks work by embedding instructions inside content that an LLM will process. When the LLM reads that content, it follows those embedded instructions as if they came from the legitimate user. The attack surface is enormous and defenses are still evolving.</p>`,
    url: 'https://simonwillison.net/prompt-injection', publishedAt: h(31), readTimeMin: 14,
  },
  {
    id: 'art-021',
    feedId: 'hugging-face', feedName: 'Hugging Face Blog', feedLetter: 'H', feedAvatarColor: '#b45309',
    categoryId: 'ai', categoryName: 'AI & ML',
    title: 'Introducing SmolVLM2: Tiny Vision-Language Models for On-Device Use',
    excerpt: 'SmolVLM2 is a family of vision-language models small enough to run on-device, with performance that rivals models 10× their size.',
    content: `<p>Running vision-language models on-device has always required painful tradeoffs between capability and resource usage. SmolVLM2 changes the math by applying aggressive knowledge distillation from larger models, resulting in a model family that punches well above its weight in document parsing, chart understanding, and visual QA.</p>`,
    url: 'https://huggingface.co/blog/smolvlm2', publishedAt: h(4.5), readTimeMin: 10,
  },
  {
    id: 'art-022',
    feedId: 'hugging-face', feedName: 'Hugging Face Blog', feedLetter: 'H', feedAvatarColor: '#b45309',
    categoryId: 'ai', categoryName: 'AI & ML',
    title: 'Fine-tuning LLMs on a Budget: What Actually Works in 2025',
    excerpt: 'QLoRA, full fine-tuning, DPO, RLHF — there are more options than ever. An honest assessment of what works, what is overrated, and what it costs.',
    content: `<p>Fine-tuning has become more accessible but also more confusing. Every few months a new technique arrives claiming to be better, cheaper, and easier than what came before. After running a lot of experiments, here is what we have found actually moves the needle.</p>`,
    url: 'https://huggingface.co/blog/finetuning-budget-2025', publishedAt: h(33), readTimeMin: 16,
  },
]
