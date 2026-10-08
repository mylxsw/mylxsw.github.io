import type { ReactNode } from 'react'
import { Lock, Monitor, Nodes, Pulse } from './Icons.tsx'
import './Platform.css'

interface Capability {
  icon: ReactNode
  title: string
  text: string
  wide?: boolean
  extra?: ReactNode
}

const capabilities: Capability[] = [
  {
    icon: <Monitor />,
    title: 'Lives where you work',
    text: 'In your menu bar, at your cursor, on your phone or in your stack. Gulu tools show up where the work already happens, with nothing to copy back and forth.',
    wide: true,
    extra: (
      <div className="flowline">
        {['macOS', 'iOS & Android', 'Desktop', 'Server'].map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
    ),
  },
  {
    icon: <Lock />,
    title: 'Private by design',
    text: 'Run models on your own device when you want, and keep your data there.',
  },
  {
    icon: <Nodes />,
    title: 'Any model',
    text: 'Use cloud or local models, bring your own keys, or route them all through Squirrel.',
  },
  {
    icon: <Pulse />,
    title: 'Agents that check in with you',
    text: 'Hand off multi-step work. Gulu plans it, runs it across your tools, and asks before anything leaves your hands.',
    wide: true,
    extra: (
      <div className="meter">
        {[
          ['Plan', 100],
          ['Run', 72],
          ['Your approval', 30],
        ].map(([label, pct]) => (
          <div key={label}>
            {label}
            <b style={{ ['--w' as string]: `${pct}%` }} />
          </div>
        ))}
      </div>
    ),
  },
]

export default function Platform() {
  return (
    <section className="block flush-top" id="platform">
      <div className="wrap">
        <div className="head">
          <span className="kicker">Platform</span>
          <h2>One approach behind every product</h2>
          <p>
            From a Mac menu bar app to a production LLM gateway, every Gulu product follows the same
            rules: fast, private and easy to pick up.
          </p>
        </div>
        <div className="caps">
          {capabilities.map((c) => (
            <article key={c.title} className={c.wide ? 'card cap wide' : 'card cap'}>
              <span className="icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              {c.extra}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
