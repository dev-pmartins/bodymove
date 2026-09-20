import { Link } from 'react-router-dom'
import './SiteFooter.css'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="bm-container site-footer__inner">
        <p className="bm-display site-footer__brand">Body Move</p>
        <p className="bm-muted">O movimento que transforma</p>
        <p className="site-footer__links">
          <Link to="/style-guide">Style guide</Link>
          <span aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()} Body Move Studio Funcional</span>
        </p>
      </div>
    </footer>
  )
}
