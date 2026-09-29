import { whatsappUrl } from '../../lib/links'
import './WhatsAppFloat.css'

type Props = {
  digits: string
}

export function WhatsAppFloat({ digits }: Props) {
  return (
    <a
      className="wa-float"
      href={whatsappUrl(digits, 'Olá! Me interessei pela oportunidade de mudança e desejo saber mais sobre a Body Move.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path
          fill="currentColor"
          d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.93 0 1.75.46 3.45 1.34 4.95L2 22l5.3-1.39a9.96 9.96 0 0 0 4.74 1.2h.01c5.5 0 9.96-4.45 9.96-9.93C22.01 6.45 17.55 2 12.04 2zm5.8 14.2c-.24.68-1.4 1.25-1.93 1.33-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .43-.07.67.51.24.6.82 2.07.89 2.22.07.15.12.32.02.52-.1.19-.14.32-.28.49-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.09 1.55.73 1.82.86.27.14.45.2.51.31.07.12.07.68-.17 1.36z"
        />
      </svg>
    </a>
  )
}
