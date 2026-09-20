import type { InstagramPost } from '../data/types'
import { mockInstagramPosts } from '../data/mock/instagram'
import { dataConfig } from './config'

/**
 * Esperado do proxy (JSON):
 * [{ id, permalink, media_url, caption?, timestamp? }]
 */
export async function fetchInstagramFeed(
  feedUrl = dataConfig.instagramFeedUrl,
): Promise<InstagramPost[]> {
  if (!feedUrl) {
    throw new Error('VITE_INSTAGRAM_FEED_URL não configurada')
  }

  const res = await fetch(feedUrl, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Falha ao buscar Instagram (${res.status})`)
  }

  const data: unknown = await res.json()
  if (!Array.isArray(data)) {
    throw new Error('Resposta do feed Instagram inválida')
  }

  return data.map((raw, i) => {
    const item = raw as Record<string, unknown>
    return {
      id: String(item.id ?? `ig-${i}`),
      permalink: String(item.permalink ?? dataConfig.instagramProfileUrl),
      mediaUrl: String(item.media_url ?? item.mediaUrl ?? ''),
      caption: item.caption ? String(item.caption) : undefined,
      timestamp: item.timestamp ? String(item.timestamp) : undefined,
    }
  }).filter((p) => p.mediaUrl)
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  if (dataConfig.instagramMode !== 'live') {
    return mockInstagramPosts
  }
  try {
    return await fetchInstagramFeed()
  } catch (err) {
    console.warn('[instagram] fallback para mock:', err)
    return mockInstagramPosts
  }
}
