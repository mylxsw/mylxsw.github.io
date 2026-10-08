import { contactEmail } from '../data/site.ts'
import './Closing.css'

export default function Closing() {
  return (
    <section className="block" id="contact">
      <div className="wrap">
        <div className="closing">
          <span className="kicker">Gulu AI</span>
          <h2>
            Spend your time on the <span className="serif">work that matters</span>
          </h2>
          <p>Try our products for free, follow what we're building, or talk to us about working together.</p>
          <div className="cta">
            <a className="btn btn-light" href="#products">Explore products</a>
            <a className="btn" href={`mailto:${contactEmail}`}>Contact us</a>
          </div>
        </div>
      </div>
    </section>
  )
}
