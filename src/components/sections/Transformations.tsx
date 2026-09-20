import type { Transformation } from '../../data/types'
import './Transformations.css'

type Props = {
  items: Transformation[]
}

export function TransformationsSection({ items }: Props) {
  return (
    <section
      className="transform section"
      id="casos"
      aria-labelledby="casos-title"
    >
      <div className="bm-container">
        <p className="bm-label">Prova social</p>
        <h2 id="casos-title" className="bm-display section-title">
          Casos de mudança
        </h2>
        <div className="transform__grid">
          {items.map((item) => (
            <article key={item.id} className="transform__card">
              <div
                className="transform__photo"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
                role="img"
                aria-label={item.name}
              />
              <div className="transform__body">
                {item.result ? (
                  <p className="bm-label">{item.result}</p>
                ) : null}
                <blockquote className="transform__quote">“{item.quote}”</blockquote>
                <p className="transform__name">{item.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
