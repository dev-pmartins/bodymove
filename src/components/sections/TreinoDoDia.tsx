import type { TreinoDoDia } from '../../data/types'
import './TreinoDoDia.css'

type Props = {
  treino: TreinoDoDia
}

export function TreinoDoDiaSection({ treino }: Props) {
  return (
    <section className="treino section" id="treino" aria-labelledby="treino-title">
      <div className="bm-container">
        <p className="bm-label">Rotina</p>
        <h2 id="treino-title" className="bm-display section-title">
          Treino do dia
        </h2>

        <div className="treino__panel">
          <header className="treino__meta">
            <div>
              <p className="bm-label">{treino.dateLabel}</p>
              <p className="bm-display treino__focus">{treino.focus}</p>
            </div>
            <p className="treino__duration">{treino.duration}</p>
          </header>
          <ol className="treino__list">
            {treino.exercises.map((ex) => (
              <li key={ex.name}>
                <span className="treino__ex-name">{ex.name}</span>
                {ex.detail ? (
                  <span className="bm-muted treino__ex-detail">{ex.detail}</span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
