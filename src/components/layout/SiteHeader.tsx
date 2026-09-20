import { Button } from '../ui/Button'
import './SiteHeader.css'

const links = [
  { href: '#campanhas', label: 'Campanhas' },
  { href: '#modalidades', label: 'Modalidades' },
  { href: '#treino', label: 'Treino' },
  { href: '#casos', label: 'Mudanças' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#unidade', label: 'Unidade' },
]

type Props = {
  whatsappHref: string
}

export function SiteHeader({ whatsappHref }: Props) {
  return (
    <header className="site-header">
      <div className="bm-container site-header__inner">
        <a className="site-header__brand" href="#topo">
          <img
            src="/brand/logo-mark.png"
            alt=""
            width={40}
            height={24}
            className="site-header__mark"
          />
          <span>Body Move</span>
        </a>
        <nav className="site-header__nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <Button href={whatsappHref} variant="primary" className="site-header__cta">
          WhatsApp
        </Button>
      </div>
    </header>
  )
}
