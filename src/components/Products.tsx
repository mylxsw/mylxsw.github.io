import { products } from '../data/products.ts'
import ProductCard from './ProductCard.tsx'
import './Products.css'

export default function Products() {
  return (
    <section className="block" id="products">
      <div className="wrap">
        <div className="head center">
          <span className="kicker">Products</span>
          <h2>
            Built for the way you <span className="serif">actually</span> work
          </h2>
          <p>Each Gulu product does one job well, and fits into the tools you already have open.</p>
        </div>
        <div className="products">
          {products.map((product, i) => (
            // After the featured card and the two beside it, remaining cards share a row.
            <ProductCard key={product.slug} product={product} wide={!product.featured && i >= 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
