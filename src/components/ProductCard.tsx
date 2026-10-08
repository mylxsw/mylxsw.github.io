import type { Product } from '../data/products.ts'
import { ArrowRight } from './Icons.tsx'

interface Props {
  product: Product
  wide?: boolean
}

export default function ProductCard({ product, wide }: Props) {
  const classes = ['card', 'prod', product.featured && 'feature', wide && 'half'].filter(Boolean).join(' ')

  return (
    <a className={classes} href={product.url} target="_blank" rel="noopener noreferrer">
      {product.featured && product.highlights && (
        <ul className="hl">
          {product.highlights.map((h) => (
            <li key={h.label}>
              <b>{h.label}</b>
              <span>{h.text}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="body">
        <div className="top">
          <span className="logo">
            {product.logo ? <img src={product.logo} alt="" /> : product.monogram}
          </span>
          <span className={product.featured ? 'tag live' : 'tag'}>{product.tag}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="chips">
          {product.platforms.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </div>
      <span className="go">
        Learn more <ArrowRight />
      </span>
    </a>
  )
}
