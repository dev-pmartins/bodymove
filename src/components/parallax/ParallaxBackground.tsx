import { useEffect, useState } from 'react'
import './ParallaxBackground.css'

type Props = {
  images?: [string, string]
}

/**
 * Camadas fixas com parallax leve + crossfade conforme o scroll.
 */
export function ParallaxBackground({
  images = ['/images/bg01.png', '/images/bg02.png'],
}: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        )
        setProgress(Math.min(1, Math.max(0, window.scrollY / max)))
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const fade = progress
  const shift1 = progress * 8
  const shift2 = (1 - progress) * -6

  return (
    <div className="parallax-bg" aria-hidden="true">
      <div
        className="parallax-bg__layer"
        style={{
          backgroundImage: `url(${images[0]})`,
          opacity: 1 - fade,
          transform: `translate3d(0, ${shift1}vh, 0) scale(1.08)`,
        }}
      />
      <div
        className="parallax-bg__layer"
        style={{
          backgroundImage: `url(${images[1]})`,
          opacity: fade,
          transform: `translate3d(0, ${shift2}vh, 0) scale(1.08)`,
        }}
      />
      <div className="parallax-bg__veil" />
    </div>
  )
}
