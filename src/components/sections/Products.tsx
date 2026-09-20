import type { Product } from '../../data/types'
import './Products.css'

type Props = {
  products: Product[]
}

export function ProductsSection({ products }: Props) {
  return (
    <section className="products section" id="modalidades" aria-labelledby="produtos-title">
      <div className="bm-container">
        <p className="bm-label">O que treinamos</p>
        <h2 id="produtos-title" className="bm-display section-title">
          Modalidades
        </h2>
        <div className="products__grid">
          {products.map((p) => (
            <article key={p.id} className="products__card">
              <h3 className="bm-display products__name">{p.name}</h3>
              <p className="bm-muted">{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
