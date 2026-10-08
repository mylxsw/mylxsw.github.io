import { products } from '../data/products.ts'
import { contactEmail } from '../data/site.ts'
import { LogoMark } from './Icons.tsx'
import './Footer.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="about">
          <a className="brand" href="#top"><LogoMark />Gulu AI</a>
          <p>AI productivity tools that work inside the apps you already use.</p>
        </div>
        <div>
          <h4>Products</h4>
          <ul>
            {products.map((p) => (
              <li key={p.slug}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#approach">About</a></li>
            <li><a href={`mailto:${contactEmail}`}>Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="legal">
        <div className="wrap">
          <span>© {year} Gulu AI. All rights reserved.</span>
          <span>gulu.ai</span>
        </div>
      </div>
    </footer>
  )
}
