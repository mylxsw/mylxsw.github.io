export interface ProductHighlight {
  label: string
  text: string
}

export interface Product {
  slug: string
  name: string
  /** Two-letter mark shown when no logo image is set. */
  monogram: string
  /** Optional logo path under /public, e.g. "/logos/typeflux.png". */
  logo?: string
  tag: string
  description: string
  url: string
  platforms: string[]
  featured?: boolean
  highlights?: ProductHighlight[]
}

// Order matters: the first product is the large featured card.
export const products: Product[] = [
  {
    slug: 'typeflux',
    name: 'Typeflux',
    monogram: 'Tf',
    logo: '/logos/typeflux.png',
    tag: 'Flagship',
    featured: true,
    description:
      'Lightning-fast, accurate voice-to-text directly into any app on your Mac, plus an AI assistant one keypress away. Free, open source, and supports local models.',
    url: 'https://typeflux.app',
    platforms: ['macOS', 'Open source', 'Local models'],
    highlights: [
      { label: 'Hold fn', text: 'Dictate into any app, right at your cursor' },
      { label: 'Press fn twice', text: 'Ask AI to answer, rewrite or translate' },
      { label: 'On-device', text: 'Run fully local models, your voice stays on your Mac' },
    ],
  },
  {
    slug: 'squirrel',
    name: 'Squirrel',
    monogram: 'Sq',
    logo: '/logos/squirrel.png',
    tag: 'LLM gateway',
    description:
      'A high-performance, production-ready LLM gateway. OpenAI and Anthropic compatible, with protocol conversion, rule-based routing, failover and cost analytics.',
    url: 'https://squirrel.gulu.ai',
    platforms: ['Server', 'Admin dashboard'],
  },
  {
    slug: 'aidea',
    name: 'AIdea',
    monogram: 'Ai',
    logo: '/logos/aidea.png',
    tag: 'AI app',
    description:
      'One app for mainstream large language models and image generation models. Built with Flutter and fully open source.',
    url: 'https://ai.aicode.cc',
    platforms: ['Cross-platform', 'Open source'],
  },
  {
    slug: 'nowcoiner',
    name: 'NowCoiner',
    monogram: 'Nc',
    logo: '/logos/now-coiner.png',
    tag: 'Menu bar',
    description:
      'A macOS menu bar crypto tracker with a configurable multi-coin ticker, pin and drag-to-reorder, and a rich market detail view.',
    url: 'https://now-coiner.gulu.ai',
    platforms: ['macOS'],
  },
  {
    slug: 'ploys3',
    name: 'PloyS3',
    monogram: 'S3',
    logo: '/logos/ploys3.png',
    tag: 'File manager',
    description:
      'A cross-platform, S3-compatible file manager. Browse, upload and manage files across your storage services in one interface.',
    url: 'https://ploys3.gulu.ai',
    platforms: ['Desktop', 'S3-compatible'],
  },
]
