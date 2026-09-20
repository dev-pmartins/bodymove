import { Button } from '../components/ui/Button'
import './StyleGuide.css'

const colors = [
  { name: 'Acid', token: '--bm-acid', value: '#8df148' },
  { name: 'Black', token: '--bm-black', value: '#000000' },
  { name: 'Ink', token: '--bm-ink', value: '#070807' },
  { name: 'Surface', token: '--bm-surface', value: '#0c0e0c' },
  { name: 'Elevated', token: '--bm-elevated', value: '#171b17' },
  { name: 'Text', token: '--bm-text', value: '#f3f6f1' },
  { name: 'Muted', token: '--bm-text-muted', value: '#9aa39a' },
]

export function StyleGuidePage() {
  return (
    <div className="sg">
      <header className="sg-header">
        <div className="bm-container sg-header__inner">
          <div>
            <p className="bm-label">Body Move · Design System</p>
            <h1 className="bm-display sg-title">Style Guide</h1>
            <p className="bm-muted sg-lead">
              Direção visual ativa e provocante: bases escuras, contorno ácido e
              CTAs de alta energia — alinhada às fotos BG01 / BG02.
            </p>
          </div>
          <Button href="/" variant="secondary">
            Voltar à home
          </Button>
        </div>
      </header>

      <main className="bm-container sg-main">
        <section className="sg-section" aria-labelledby="sg-brand">
          <h2 id="sg-brand" className="bm-display sg-section__title">
            Marca
          </h2>
          <div className="sg-brand-card">
            <div className="sg-brand-row">
              <img
                className="sg-brand-mark"
                src="/brand/logo-mark.png"
                alt="Ícone Body Move (PNG transparente)"
                width={320}
                height={180}
              />
              <img
                className="sg-brand-mark"
                src="/brand/logo-mark.svg"
                alt="Ícone Body Move (SVG)"
                width={320}
                height={180}
              />
            </div>
            <p className="bm-display sg-brand-name">Body Move</p>
            <p className="sg-slogan">Studio Funcional · O movimento que transforma</p>
            <p className="bm-muted sg-brand-note">
              Mark tratado: SVG vetorial + PNG transparente em{' '}
              <code>public/brand/logo-mark.*</code>. Fundo removido; verde
              normalizado para <code>#8df148</code>.
            </p>
          </div>
        </section>

        <section className="sg-section" aria-labelledby="sg-colors">
          <h2 id="sg-colors" className="bm-display sg-section__title">
            Cores
          </h2>
          <div className="sg-swatches">
            {colors.map((c) => (
              <article key={c.token} className="sg-swatch">
                <div
                  className="sg-swatch__chip"
                  style={{ background: `var(${c.token})` }}
                />
                <h3>{c.name}</h3>
                <code>{c.value}</code>
                <span className="bm-muted">{c.token}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="sg-section" aria-labelledby="sg-type">
          <h2 id="sg-type" className="bm-display sg-section__title">
            Tipografia
          </h2>
          <div className="sg-type-stack">
            <div>
              <p className="bm-label">Display · Bebas Neue</p>
              <p className="bm-display" style={{ fontSize: 'var(--bm-text-hero)' }}>
                Move hard
              </p>
            </div>
            <div>
              <p className="bm-label">H1</p>
              <p className="bm-display" style={{ fontSize: 'var(--bm-text-h1)' }}>
                Treino que transforma
              </p>
            </div>
            <div>
              <p className="bm-label">H2</p>
              <p className="bm-display" style={{ fontSize: 'var(--bm-text-h2)' }}>
                Casos de mudança
              </p>
            </div>
            <div>
              <p className="bm-label">Body · Sora</p>
              <p>
                Treinos de 1 hora, com o professor sempre junto: corrigindo,
                motivando e respeitando o seu limite — sem deixar de te
                desafiar.
              </p>
            </div>
          </div>
        </section>

        <section className="sg-section" aria-labelledby="sg-buttons">
          <h2 id="sg-buttons" className="bm-display sg-section__title">
            Botões
          </h2>
          <p className="bm-muted sg-section__hint">
            Primário = ação principal (WhatsApp / matricular). Secundário =
            fundo escuro; hover acende neon ácido nas bordas.
          </p>
          <div className="sg-row">
            <Button variant="primary">Falar no WhatsApp</Button>
            <Button variant="secondary">Ver treino do dia</Button>
            <Button variant="ghost">Ver no Instagram</Button>
            <Button variant="primary" size="lg">
              Quero treinar
            </Button>
            <Button variant="secondary" size="lg" disabled>
              Indisponível
            </Button>
          </div>
        </section>

        <section className="sg-section" aria-labelledby="sg-surfaces">
          <h2 id="sg-surfaces" className="bm-display sg-section__title">
            Superfícies &amp; neon
          </h2>
          <div className="sg-surface-grid">
            <article className="sg-panel sg-panel--border">
              <p className="bm-label">Card outline</p>
              <h3 className="bm-display sg-panel__title">Campanha</h3>
              <p className="bm-muted">
                Borda ácida sutil. Usar em slides e cards de produto.
              </p>
            </article>
            <article className="sg-panel sg-panel--neon">
              <p className="bm-label">Neon ativo</p>
              <h3 className="bm-display sg-panel__title">Hover state</h3>
              <p className="bm-muted">
                Mesmo glow dos botões secundários — para foco e destaque.
              </p>
            </article>
            <article className="sg-panel sg-panel--fill">
              <p className="bm-label">Fill ácido</p>
              <h3 className="bm-display sg-panel__title sg-panel__title--on-acid">
                CTA block
              </h3>
              <p className="sg-panel__on-acid-text">
                Blocos de conversão curtos, sem poluir o hero.
              </p>
            </article>
          </div>
        </section>

        <section className="sg-section" aria-labelledby="sg-parallax">
          <h2 id="sg-parallax" className="bm-display sg-section__title">
            Parallax BGs
          </h2>
          <p className="bm-muted sg-section__hint">
            No scroll da home, BG01 e BG02 cruzam com fade out / fade in +
            leve deslocamento parallax. Abaixo, preview estático das duas
            camadas.
          </p>
          <div className="sg-bg-preview">
            <figure className="sg-bg-frame">
              <img src="/images/bg01.png" alt="Background 01 — academia Body Move" />
              <figcaption className="bm-label">BG01</figcaption>
            </figure>
            <figure className="sg-bg-frame">
              <img src="/images/bg02.png" alt="Background 02 — academia Body Move" />
              <figcaption className="bm-label">BG02</figcaption>
            </figure>
          </div>
        </section>

        <section className="sg-section" aria-labelledby="sg-scope">
          <h2 id="sg-scope" className="bm-display sg-section__title">
            Mapa da home
          </h2>
          <ol className="sg-scope-list">
            <li>
              <strong>Hero</strong> — marca + slogan + CTA WhatsApp sobre
              parallax
            </li>
            <li>
              <strong>Campanhas</strong> — slider (Google Sheets)
            </li>
            <li>
              <strong>Produtos</strong> — Funcional · Musculação · Judô
            </li>
            <li>
              <strong>Treino do dia</strong> — grade (Google Sheets)
            </li>
            <li>
              <strong>Casos de mudança</strong> — depoimentos / fotos
            </li>
            <li>
              <strong>Instagram</strong> — últimas publicações
            </li>
            <li>
              <strong>Unidade</strong> — Tiradentes 2150, Guarulhos + Maps
            </li>
          </ol>
          <p className="sg-doc-link">
            Detalhes técnicos em <code>ESCOPO.md</code> na raiz do repositório.
          </p>
        </section>
      </main>
    </div>
  )
}
