import { useEffect, useState } from 'react'
import type { CampaignSlide } from '../../data/types'
import { Button } from '../ui/Button'
import './CampaignSlider.css'

type Props = {
  slides: CampaignSlide[]
}

export function CampaignSlider({ slides }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [slides.length])

  if (!slides.length) return null

  const current = slides[index]

  return (
    <section className="campaigns section" id="campanhas" aria-labelledby="campanhas-title">
      <div className="bm-container">
        <p className="bm-label">Novidades</p>
        <h2 id="campanhas-title" className="bm-display section-title">
          Campanhas &amp; eventos
        </h2>

        <div className="campaigns__stage">
          {slides.map((slide, i) => (
            <article
              key={slide.id}
              className={`campaigns__slide${i === index ? ' is-active' : ''}`}
              aria-hidden={i !== index}
            >
              <div
                className="campaigns__media"
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              />
              <div className="campaigns__content">
                <h3 className="bm-display campaigns__title">{slide.title}</h3>
                {slide.subtitle ? (
                  <p className="campaigns__sub">{slide.subtitle}</p>
                ) : null}
                <Button href={slide.linkUrl} variant="primary">
                  {slide.ctaLabel || 'Saiba mais'}
                </Button>
              </div>
            </article>
          ))}

          {slides.length > 1 ? (
            <div className="campaigns__dots" role="tablist" aria-label="Slides">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  className={`campaigns__dot${i === index ? ' is-active' : ''}`}
                  onClick={() => setIndex(i)}
                >
                  <span className="visually-hidden">Slide {i + 1}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* referência ao slide atual para leitores de tela em mudança */}
        <p className="visually-hidden" aria-live="polite">
          {current.title}
        </p>
      </div>
    </section>
  )
}
