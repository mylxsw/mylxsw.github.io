import { products } from '../data/products.ts'
import './Stats.css'

const stats = [
  { value: 'Local-first', label: 'Your data stays on your machine by default' },
  { value: 'Open source', label: 'Core tools anyone can read and audit' },
  { value: `${products.length} products`, label: 'Shipping across Mac, mobile, desktop and server' },
]

export default function Stats() {
  return (
    <section className="wrap" id="approach">
      <div className="nums">
        {stats.map((s) => (
          <div key={s.value}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
