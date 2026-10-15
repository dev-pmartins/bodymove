import { Button } from '../ui/Button'
import type { EspacoPhoto } from '../../data/mock/espaco'
import './Espaco.css'

type Props = {
  photos: EspacoPhoto[]
  whatsappHref: string
}

export function EspacoSection({ photos, whatsappHref }: Props) {
  if (!photos.length) return null

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

        <ul className="espaco__gallery" aria-label="Fotos do studio">
          {photos.map((photo) => (
            <li key={photo.id}>
              <figure className="espaco__shot">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={400}
                  height={500}
                />
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
