import { useEffect, useState } from 'react'
import { Sparkle } from './Icons.tsx'
import './WorkspaceDemo.css'

interface Step {
  title: string
  detail: string
  tool: string
}

const steps: Step[] = [
  { title: "Summarize this week's customer feedback", detail: '42 messages across 3 channels', tool: 'Inbox' },
  { title: 'Collect open issues for release 2.4', detail: '7 issues, 2 marked blocking', tool: 'GitHub' },
  { title: 'Draft the review agenda', detail: "Following your team's template", tool: 'Docs' },
  { title: 'Send the agenda to attendees', detail: 'Waits for your approval', tool: 'Mail' },
]

const sidebar = { main: ['Ask Gulu', 'Inbox', 'Docs', 'Tasks'], connected: ['Mail', 'Calendar', 'GitHub'] }

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Illustrative product window: an AI plan stepping through tasks across apps. */
export default function WorkspaceDemo() {
  // Index of the step currently running; steps before it are done.
  const [active, setActive] = useState(2)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => setActive((n) => (n + 1) % (steps.length + 2)), 1600)
    return () => window.clearInterval(id)
  }, [])

  const current = Math.min(active, steps.length)

  return (
    <div className="stage">
      <div className="window" role="img" aria-label="Example: Gulu running a task across your apps">
        <div className="win-bar">
          <span className="dots"><i /><i /><i /></span>
          <span className="title">gulu — workspace</span>
          <span className="spacer" />
        </div>
        <div className="win-body">
          <nav className="side" aria-hidden="true">
            {sidebar.main.map((item, i) => (
              <span key={item} className={i === 0 ? 'on' : undefined}><i />{item}</span>
            ))}
            <span className="sub">Connected</span>
            {sidebar.connected.map((item) => (
              <span key={item}><i />{item}</span>
            ))}
          </nav>
          <div className="main">
            <div className="ask">
              <span className="spark"><Sparkle /></span>
              <p>Get me ready for tomorrow's product review</p>
              <kbd>⌘ K</kbd>
            </div>
            <div className="steps">
              {steps.map((step, i) => {
                const state = i < current ? 'done' : i === current ? 'run' : ''
                return (
                  <div key={step.title} className={`st ${state}`}>
                    <span className="ic" />
                    <span>
                      {step.title}
                      <small>{step.detail}</small>
                    </span>
                    <em>{step.tool}</em>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
