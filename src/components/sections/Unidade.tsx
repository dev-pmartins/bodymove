import type { SiteContact } from '../../data/types'
import { telHref, whatsappUrl } from '../../lib/links'
import { Button } from '../ui/Button'
import './Unidade.css'

type Props = {
  contact: SiteContact
}

export function UnidadeSection({ contact }: Props) {
  const { address } = contact
  const fullAddress = `${address.line} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zip}`

  return (
    <section className="unidade section" id="unidade" aria-labelledby="unidade-title">
      <div className="bm-container unidade__grid">
        <div>
          <p className="bm-label">Visite</p>
          <h2 id="unidade-title" className="bm-display section-title">
            Unidade
          </h2>
          <p className="unidade__address">{fullAddress}</p>
          <ul className="unidade__meta">
            <li>
              <span className="bm-label">Telefone</span>
              <a href={telHref(contact.phone)}>{contact.phone}</a>
            </li>
            <li>
              <span className="bm-label">WhatsApp</span>
              <a
                href={whatsappUrl(
                  contact.whatsappDigits,
                  'Olá! Quero saber mais sobre a Body Move.',
                )}
              >
                {contact.whatsapp}
              </a>
            </li>
          </ul>
          <div className="unidade__actions">
            <Button href={address.mapsUrl} variant="primary">
              Abrir no Google Maps
            </Button>
            <Button
              href={whatsappUrl(
                contact.whatsappDigits,
                'Olá! Quero agendar uma visita na Body Move.',
              )}
              variant="secondary"
            >
              Agendar visita
            </Button>
          </div>
        </div>

        <div className="unidade__map-frame">
          <iframe
            title="Mapa Body Move"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=16&output=embed`}
          />
        </div>
      </div>
    </section>
  )
}
