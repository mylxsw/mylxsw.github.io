import { navLinks } from '../data/site.ts'
import { LogoMark } from './Icons.tsx'
import './Nav.css'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="Gulu AI home">
          <LogoMark />
          Gulu AI
        </a>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a className="btn btn-light" href="#products">
          Get started
        </a>
      </div>
    </header>
  )
}
