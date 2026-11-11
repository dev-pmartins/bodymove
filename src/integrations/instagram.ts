import type { InstagramPost } from '../data/types'
import { mockInstagramPosts } from '../data/mock/instagram'
import { readCache, writeCache } from '../lib/localCache'
import { dataConfig } from './config'

type RawPost = Record<string, unknown>

function pickMediaUrl(item: RawPost): string {
  const type = String(item.media_type ?? item.mediaType ?? 'IMAGE').toUpperCase()
  const thumb = String(item.thumbnail_url ?? item.thumbnailUrl ?? '')
  const media = String(item.media_url ?? item.mediaUrl ?? '')
  if ((type === 'VIDEO' || type === 'REELS') && thumb) return thumb
  return media || thumb
}

function normalizePost(raw: unknown, index: number): InstagramPost | null {
  if (!raw || typeof raw !== 'object') return null
  const item = raw as RawPost
  const mediaUrl = pickMediaUrl(item)
  if (!mediaUrl) return null
  return {
    id: String(item.id ?? `ig-${index}`),
    permalink: String(item.permalink ?? dataConfig.instagramProfileUrl),
    mediaUrl,
    caption: item.caption ? String(item.caption) : undefined,
    timestamp: item.timestamp ? String(item.timestamp) : undefined,
    mediaType: item.media_type || item.mediaType
      ? String(item.media_type ?? item.mediaType)
      : undefined,
  }
}

/**
 * Aceita:
 * - array direto: [{...}]
 * - envelope Graph/proxy: { data: [{...}] }
 */
export function parseInstagramFeedPayload(payload: unknown): InstagramPost[] {
  if (Array.isArray(payload)) {
    return payload.map(normalizePost).filter((p): p is InstagramPost => !!p)
  }
  if (payload && typeof payload === 'object') {
    const obj = payload as { data?: unknown; error?: unknown }
    if (obj.error) {
      throw new Error(
        typeof obj.error === 'string'
          ? obj.error
          : 'Proxy Instagram retornou erro',
      )
    }
    if (Array.isArray(obj.data)) {
      return obj.data.map(normalizePost).filter((p): p is InstagramPost => !!p)
    }
  }
  throw new Error('Resposta do feed Instagram inválida')
}

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
  const posts = parseInstagramFeedPayload(data)
  if (!posts.length) {
    throw new Error('Feed Instagram vazio')
  }
  return posts
}

let inflight: Promise<InstagramPost[]> | null = null

/**
 * Busca posts com cache localStorage (mesmo TTL do CMS por padrão).
 */
export async function getInstagramPosts(options?: {
  forceRefresh?: boolean
}): Promise<InstagramPost[]> {
  if (dataConfig.instagramMode !== 'live') {
    return mockInstagramPosts
  }

  const cacheKey = dataConfig.instagramCacheKey
  const ttlMs = dataConfig.instagramCacheTtlMs

  if (!options?.forceRefresh) {
    const cached = readCache<InstagramPost[]>(cacheKey)
    if (cached?.length) return cached
  }

  if (!inflight) {
    inflight = (async () => {
      try {
        const posts = await fetchInstagramFeed()
        writeCache(cacheKey, posts, ttlMs)
        return posts
      } catch (err) {
        console.warn('[instagram] fallback para mock:', err)
        const stale = readCache<InstagramPost[]>(cacheKey)
        return stale?.length ? stale : mockInstagramPosts
      }
    })().finally(() => {
      inflight = null
    })
  }

  return inflight
}
