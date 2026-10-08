import { ArrowRight } from './Icons.tsx'
import WorkspaceDemo from './WorkspaceDemo.tsx'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <a className="pill" href="#products">
          <b>New</b> Meet Typeflux, AI voice input for every Mac app →
        </a>
        <h1>
          AI that does the <span className="serif">busywork</span> for you
        </h1>
        <p className="lede">
          Gulu AI builds productivity tools that bring AI into the apps you already use. You spend
          less time switching and copy-pasting, and more time on work that matters.
        </p>
        <div className="cta">
          <a className="btn btn-light" href="#products">
            Explore products <ArrowRight />
          </a>
          <a className="btn" href="#approach">
            How we build
          </a>
        </div>
        <WorkspaceDemo />
      </div>
    </section>
  )
}
