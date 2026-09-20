import { useEffect, useState } from 'react'
import type { SiteContent } from '../data/types'
import { mockSiteContent } from '../data/mock/siteContent'
import { getSiteContent } from '../integrations/siteContent'

type State =
  | { status: 'loading' }
  | { status: 'ready'; data: SiteContent }

export function useSiteContent(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    getSiteContent().then((data) => {
      if (!cancelled) setState({ status: 'ready', data })
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Evita flash vazio: consumidores podem usar mock enquanto loading
  if (state.status === 'loading') {
    return { status: 'loading' }
  }
  return state
}

export function useSiteContentOrMock(): SiteContent {
  const state = useSiteContent()
  return state.status === 'ready' ? state.data : mockSiteContent
}
