import type { CampaignSlide, SiteContact, SiteContent, TreinoDoDia } from '../data/types'
import { mockSiteContent } from '../data/mock/siteContent'
import { mockTreinoDoDia } from '../data/mock/treino'
import { readCache, writeCache } from '../lib/localCache'
import { dataConfig } from './config'

/** Payload bruto do Apps Script (colunas da Sheet → arrays). */
export type GoogleScriptRaw = {
  whatsapp?: string[]
  telefone?: string[]
  endereco?: string[]
  slide?: string[]
  slide_links?: string[]
  slide_titulo?: string[]
  slide_desc?: string[]
  slide_calltoaction?: string[]
  segunda?: string[]
  terça?: string[]
  terca?: string[]
  quarta?: string[]
  quinta?: string[]
  sexta?: string[]
  [key: string]: string[] | undefined
}

export type CmsBundle = {
  content: SiteContent
  treino: TreinoDoDia
  rawWeek: Partial<Record<WeekdayKey, string[]>>
}

export type WeekdayKey =
  | 'segunda'
  | 'terça'
  | 'quarta'
  | 'quinta'
  | 'sexta'

const WEEKDAY_KEYS: WeekdayKey[] = [
  'segunda',
  'terça',
  'quarta',
  'quinta',
  'sexta',
]

const WEEKDAY_LABEL: Record<WeekdayKey, string> = {
  segunda: 'Segunda-feira',
  terça: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
}

function first(arr?: string[]): string {
  return (arr?.[0] || '').trim()
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

/** Garante DDI 55 quando vier só DDD + número BR. */
export function toWhatsappDigits(phone: string): string {
  let d = digitsOnly(phone)
  if (!d) return mockSiteContent.contact.whatsappDigits
  if (d.length <= 11) d = `55${d}`
  return d
}

/**
 * Slide images apontando para localhost do dev → path relativo do site.
 */
export function normalizeAssetUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return trimmed
  try {
    const base =
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    const u = new URL(trimmed, base)
    if (
      u.hostname === 'localhost' ||
      u.hostname === '127.0.0.1' ||
      u.pathname.startsWith('/images/')
    ) {
      return u.pathname + u.search
    }
  } catch {
    if (trimmed.startsWith('/')) return trimmed
  }
  return trimmed
}

export function parseAddress(full: string): SiteContact['address'] {
  const fallback = mockSiteContent.contact.address
  const text = full.trim() || `${fallback.line} - ${fallback.neighborhood}, ${fallback.city} - ${fallback.state}, ${fallback.zip}`

  // Ex.: Av. Tiradentes, 2150 - Jardim Santa Edwirges, Guarulhos - SP, 07113-001
  const zipMatch = text.match(/(\d{5}-?\d{3})\s*$/)
  const zip = zipMatch?.[1] || fallback.zip

  const withoutZip = text.replace(/,?\s*\d{5}-?\d{3}\s*$/, '').trim()
  const ufMatch = withoutZip.match(/[-–]\s*([A-Za-z]{2})\s*$/)
  const state = (ufMatch?.[1] || fallback.state).toUpperCase()

  const beforeUf = withoutZip.replace(/\s*[-–]\s*[A-Za-z]{2}\s*$/, '').trim()
  const parts = beforeUf.split(',').map((p) => p.trim()).filter(Boolean)

  let line = fallback.line
  let neighborhood = fallback.neighborhood
  let city = fallback.city

  if (parts.length >= 3) {
    // "Av. Tiradentes" + "2150 - Jardim..." OR "Av. X, 2150 - Bairro" + city
    const last = parts[parts.length - 1]
    city = last.replace(/\s*[-–].*$/, '').trim() || city

    const mid = parts.slice(0, -1).join(', ')
    const neighMatch = mid.match(/[-–]\s*(.+)$/)
    if (neighMatch) {
      neighborhood = neighMatch[1].trim()
      line = mid.replace(/\s*[-–]\s*.+$/, '').trim()
    } else {
      line = mid
    }
  } else if (parts.length === 2) {
    line = parts[0]
    const rest = parts[1]
    const neighMatch = rest.match(/[-–]\s*(.+)$/)
    if (neighMatch) {
      neighborhood = neighMatch[1].trim()
    }
  } else if (parts.length === 1) {
    line = parts[0]
  }

  return {
    line,
    neighborhood,
    city,
    state,
    zip,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text)}`,
  }
}

function parseExerciseLine(line: string): { name: string; detail?: string } {
  const idx = line.indexOf(':')
  if (idx === -1) return { name: line.trim() }
  const name = line.slice(0, idx).trim()
  const detail = line.slice(idx + 1).trim()
  return { name, detail: detail || undefined }
}

export function getTodayWeekdayKey(
  now = new Date(),
  timeZone = 'America/Sao_Paulo',
): WeekdayKey | null {
  const label = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    timeZone,
  })
    .format(now)
    .toLowerCase()
    .normalize('NFC')

  if (label.includes('segunda')) return 'segunda'
  if (label.includes('ter')) return 'terça'
  if (label.includes('quarta')) return 'quarta'
  if (label.includes('quinta')) return 'quinta'
  if (label.includes('sexta')) return 'sexta'
  return null
}

function pickWeekArray(raw: GoogleScriptRaw, key: WeekdayKey): string[] {
  if (key === 'terça') {
    return (raw['terça'] || raw.terca || []).map((s) => s.trim()).filter(Boolean)
  }
  return (raw[key] || []).map((s) => s.trim()).filter(Boolean)
}

export function mapGoogleScriptToBundle(raw: GoogleScriptRaw): CmsBundle {
  const phone = first(raw.telefone) || first(raw.whatsapp) || mockSiteContent.contact.phone
  const whatsapp = first(raw.whatsapp) || phone
  const addressFull = first(raw.endereco)

  const images = raw.slide || []
  const links = raw.slide_links || []
  const titles = raw.slide_titulo || []
  const descs = raw.slide_desc || []
  const ctas = raw.slide_calltoaction || []
  const count = Math.max(images.length, links.length, titles.length)

  const slides: CampaignSlide[] = []
  for (let i = 0; i < count; i++) {
    const title = (titles[i] || '').trim()
    const imageUrl = normalizeAssetUrl((images[i] || '').trim())
    const linkUrl = (links[i] || '').trim()
    if (!title && !imageUrl) continue
    slides.push({
      id: `slide-${i + 1}`,
      title: title || `Campanha ${i + 1}`,
      subtitle: (descs[i] || '').trim() || undefined,
      imageUrl: imageUrl || '/images/bg01.png',
      linkUrl: linkUrl || '#',
      ctaLabel: (ctas[i] || '').trim() || undefined,
    })
  }

  const content: SiteContent = {
    contact: {
      phone,
      whatsapp,
      whatsappDigits: toWhatsappDigits(whatsapp),
      address: parseAddress(addressFull),
    },
    slides: slides.length ? slides : mockSiteContent.slides,
  }

  const rawWeek: Partial<Record<WeekdayKey, string[]>> = {}
  for (const key of WEEKDAY_KEYS) {
    rawWeek[key] = pickWeekArray(raw, key)
  }

  const todayKey = getTodayWeekdayKey()
  const dayKey = todayKey && rawWeek[todayKey]?.length ? todayKey : null
  const fallbackKey =
    dayKey ||
    WEEKDAY_KEYS.find((k) => (rawWeek[k] || []).length > 0) ||
    null

  let treino: TreinoDoDia
  if (fallbackKey) {
    const lines = rawWeek[fallbackKey] || []
    treino = {
      dateLabel: todayKey === fallbackKey ? 'Hoje' : WEEKDAY_LABEL[fallbackKey],
      focus: WEEKDAY_LABEL[fallbackKey],
      duration: '60 min',
      exercises: lines.map(parseExerciseLine),
    }
  } else {
    treino = mockTreinoDoDia
  }

  return { content, treino, rawWeek }
}

export async function fetchGoogleScriptRaw(
  url = dataConfig.googleScriptUrl,
): Promise<GoogleScriptRaw> {
  if (!url) throw new Error('VITE_GOOGLE_SCRIPT_URL não configurada')
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Apps Script HTTP ${res.status}`)
  const data = (await res.json()) as GoogleScriptRaw
  return data
}

let inflight: Promise<CmsBundle> | null = null

/**
 * Busca o CMS do Apps Script com cache localStorage.
 * Cache hit: devolve imediato; se expirado, busca de novo.
 * Requisições paralelas compartilham o mesmo fetch.
 */
export async function getCmsBundle(options?: {
  forceRefresh?: boolean
}): Promise<CmsBundle> {
  const cacheKey = dataConfig.cmsCacheKey
  const ttlMs = dataConfig.cmsCacheTtlMs

  if (!options?.forceRefresh) {
    const cached = readCache<CmsBundle>(cacheKey)
    if (cached) return cached
  }

  if (!inflight) {
    inflight = (async () => {
      const raw = await fetchGoogleScriptRaw()
      const bundle = mapGoogleScriptToBundle(raw)
      writeCache(cacheKey, bundle, ttlMs)
      return bundle
    })().finally(() => {
      inflight = null
    })
  }

  return inflight
}
