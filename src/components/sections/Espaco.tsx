import { Button } from '../ui/Button'
import type { EspacoPhoto } from '../../data/mock/espaco'
import './Espaco.css'

type Props = {
  photos: EspacoPhoto[]
  whatsappHref: string
}

export function EspacoSection({ photos, whatsappHref }: Props) {
  if (!photos.length) return null

  const [featured, ...rest] = photos

  return (
    <section className="espaco section" id="espaco" aria-labelledby="espaco-title">
      <div className="bm-container">
        <p className="bm-label">Espaço</p>
        <h2 id="espaco-title" className="bm-display section-title">
          Conheça nosso espaço
        </h2>
        <p className="espaco__lead bm-muted">
          Ambiente intenso, organizado e feito para você treinar com
          acompanhamento de perto — do funcional ao judô.
        </p>

        <div className="espaco__mosaic">
          <figure className="espaco__shot espaco__shot--featured">
            <img src={featured.src} alt={featured.alt} loading="lazy" />
          </figure>
          {rest.map((photo) => (
            <figure key={photo.id} className="espaco__shot">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </figure>
          ))}
        </div>

        {/* Mobile: carrossel horizontal */}
        <ul className="espaco__rail" aria-label="Fotos do studio">
          {photos.map((photo) => (
            <li key={photo.id}>
              <figure className="espaco__shot">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </figure>
            </li>
          ))}
        </ul>

        <div className="espaco__cta">
          <Button href={whatsappHref} variant="secondary" size="lg">
            Agendar visita
          </Button>
        </div>
      </div>
    </section>
  )
}
