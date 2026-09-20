export type CacheEntry<T> = {
  savedAt: number
  ttlMs: number
  data: T
}

/**
 * Cache em localStorage com TTL configurável.
 * Falhas de storage (SSR/private mode) são silenciosas.
 */
export function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CacheEntry<T>
    if (!parsed || typeof parsed.savedAt !== 'number' || parsed.ttlMs == null) {
      return null
    }
    if (Date.now() - parsed.savedAt > parsed.ttlMs) {
      localStorage.removeItem(key)
      return null
    }
    return parsed.data
  } catch {
    return null
  }
}

export function writeCache<T>(key: string, data: T, ttlMs: number): void {
  try {
    const entry: CacheEntry<T> = {
      savedAt: Date.now(),
      ttlMs,
      data,
    }
    localStorage.setItem(key, JSON.stringify(entry))
  } catch {
    // quota / private mode
  }
}

export function clearCache(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
