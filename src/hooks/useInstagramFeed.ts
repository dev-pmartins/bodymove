import { useEffect, useState } from 'react'
import type { InstagramPost } from '../data/types'
import { mockInstagramPosts } from '../data/mock/instagram'
import { getInstagramPosts } from '../integrations/instagram'

type State =
  | { status: 'loading' }
  | { status: 'ready'; data: InstagramPost[] }

export function useInstagramFeed(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    getInstagramPosts().then((data) => {
      if (!cancelled) setState({ status: 'ready', data })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}

export function useInstagramFeedOrMock(): InstagramPost[] {
  const state = useInstagramFeed()
  return state.status === 'ready' ? state.data : mockInstagramPosts
}
