import { ParallaxBackground } from '../components/parallax/ParallaxBackground'
import { SiteHeader } from '../components/layout/SiteHeader'
import { SiteFooter } from '../components/layout/SiteFooter'
import { WhatsAppFloat } from '../components/layout/WhatsAppFloat'
import { CampaignSlider } from '../components/sections/CampaignSlider'
import { ProductsSection } from '../components/sections/Products'
import { TreinoDoDiaSection } from '../components/sections/TreinoDoDia'
import { TransformationsSection } from '../components/sections/Transformations'
import { InstagramFeedSection } from '../components/sections/InstagramFeed'
import { UnidadeSection } from '../components/sections/Unidade'
import { Button } from '../components/ui/Button'
import { mockProducts } from '../data/mock/products'
import { mockTreinoDoDia } from '../data/mock/treino'
import { mockTransformations } from '../data/mock/transformations'
import { mockSiteContent } from '../data/mock/siteContent'
import { useInstagramFeed } from '../hooks/useInstagramFeed'
import { useSiteContent } from '../hooks/useSiteContent'
import { whatsappUrl } from '../lib/links'
import './Home.css'

export function HomePage() {
  const site = useSiteContent()
  const ig = useInstagramFeed()

  const content =
    site.status === 'loading' ? mockSiteContent : site.data
  const igPosts = ig.status === 'loading' ? [] : ig.data
  const igLoading = ig.status === 'loading'
  const waHref = whatsappUrl(
    content.contact.whatsappDigits,
    'Olá! Quero saber mais sobre a Body Move.',
  )

  return (
    <div className="home">
      <ParallaxBackground />
      <SiteHeader whatsappHref={waHref} />

      <main>
        <section className="hero" id="topo">
          <div className="bm-container hero__inner">
            <p className="bm-label">
              {content.contact.address.city} · {content.contact.address.state}
            </p>
            <h1 className="hero__brand">
              <img
                className="hero__logo"
                src="/brand/logo-mark.png"
                alt=""
                width={480}
                height={272}
              />
              <span className="hero__wordmark">
                <span className="bm-display hero__name">Body Move</span>
                <span className="hero__tag">Studio Funcional</span>
              </span>
              <span className="visually-hidden">Body Move Studio Funcional</span>
            </h1>
            <p className="hero__slogan">O movimento que transforma</p>
            <p className="hero__support bm-muted">
              Professor sempre junto: corrige, motiva e respeita o seu limite —
              desafiando você a ser um pouco melhor a cada dia. Treinos de 1
              hora.
            </p>
            <div className="hero__actions">
              <Button href={waHref} variant="primary" size="lg">
                Falar no WhatsApp
              </Button>
              <Button href="#campanhas" variant="secondary" size="lg">
                Ver campanhas
              </Button>
            </div>
          </div>
        </section>

        <CampaignSlider slides={content.slides} />
        <ProductsSection products={mockProducts} />
        <TreinoDoDiaSection treino={mockTreinoDoDia} />
        <TransformationsSection items={mockTransformations} />
        <InstagramFeedSection posts={igPosts} loading={igLoading} />
        <UnidadeSection contact={content.contact} />
      </main>

      <SiteFooter />
      <WhatsAppFloat digits={content.contact.whatsappDigits} />
    </div>
  )
}
