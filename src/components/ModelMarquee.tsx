import { modelProviders } from '../data/site.ts'
import './ModelMarquee.css'

export default function ModelMarquee() {
  return (
    <div className="models wrap">
      <span className="kicker">Works with the models you trust</span>
      <div className="marquee" aria-label={`Supported models: ${modelProviders.join(', ')}`}>
        <div className="track">
          {[...modelProviders, ...modelProviders].map((name, i) => (
            <span key={i} aria-hidden={i >= modelProviders.length || undefined}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
