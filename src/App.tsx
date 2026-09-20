import { Link, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { StyleGuidePage } from './pages/StyleGuide'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/style-guide" element={<StyleGuidePage />} />
      <Route
        path="*"
        element={
          <main className="bm-container" style={{ padding: '4rem 0' }}>
            <p className="bm-label">404</p>
            <h1 className="bm-display" style={{ fontSize: 'var(--bm-text-h1)' }}>
              Página não encontrada
            </h1>
            <p>
              <Link to="/" style={{ color: 'var(--bm-acid)' }}>
                Voltar ao início
              </Link>
            </p>
          </main>
        }
      />
    </Routes>
  )
}
