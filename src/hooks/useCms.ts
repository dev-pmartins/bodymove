import { useEffect, useState } from 'react'
import type { SiteContent, TreinoDoDia } from '../data/types'
import { mockSiteContent } from '../data/mock/siteContent'
import { mockTreinoDoDia } from '../data/mock/treino'
import { getCms } from '../integrations/siteContent'

type CmsState =
  | { status: 'loading' }
  | { status: 'ready'; content: SiteContent; treino: TreinoDoDia }

export function useCms(): CmsState {
  const [state, setState] = useState<CmsState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    getCms().then((bundle) => {
      if (!cancelled) {
        setState({
          status: 'ready',
          content: bundle.content,
          treino: bundle.treino,
        })
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

export function useSiteContent():
  | { status: 'loading' }
  | { status: 'ready'; data: SiteContent } {
  const cms = useCms()
  if (cms.status === 'loading') return { status: 'loading' }
  return { status: 'ready', data: cms.content }
}

export function useTreinoDoDia():
  | { status: 'loading' }
  | { status: 'ready'; data: TreinoDoDia } {
  const cms = useCms()
  if (cms.status === 'loading') return { status: 'loading' }
  return { status: 'ready', data: cms.treino }
}

export function useSiteContentOrMock(): SiteContent {
  const state = useSiteContent()
  return state.status === 'ready' ? state.data : mockSiteContent
}

export function useTreinoDoDiaOrMock(): TreinoDoDia {
  const state = useTreinoDoDia()
  return state.status === 'ready' ? state.data : mockTreinoDoDia
}
