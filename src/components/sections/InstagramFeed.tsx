import type { InstagramPost } from '../../data/types'
import { dataConfig } from '../../integrations/config'
import { Button } from '../ui/Button'
import './InstagramFeed.css'

type Props = {
  posts: InstagramPost[]
  loading?: boolean
}

export function InstagramFeedSection({ posts, loading }: Props) {
  return (
    <section className="ig section" id="instagram" aria-labelledby="ig-title">
      <div className="bm-container">
        <div className="ig__head">
          <div>
            <p className="bm-label">Social</p>
            <h2 id="ig-title" className="bm-display section-title">
              No Instagram
            </h2>
          </div>
          <Button href={dataConfig.instagramProfileUrl} variant="secondary">
            Ver perfil
          </Button>
        </div>

        {loading ? (
          <p className="bm-muted">Carregando publicações…</p>
        ) : (
          <ul className="ig__grid">
            {posts.map((post) => (
              <li key={post.id}>
                <a
                  className="ig__item"
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  title={post.caption || 'Abrir no Instagram'}
                >
                  <img src={post.mediaUrl} alt={post.caption || ''} loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
