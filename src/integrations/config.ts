/**
 * Integrações externas.
 *
 * CMS temporário: Google Apps Script → JSON da Sheet.
 * Instagram: mock (ou proxy live).
 */

export type DataSourceMode = 'mock' | 'live'

const DEFAULT_SCRIPT_URL =
  'https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnRFDfe0UxYJ6YefzpS4SyxdaiGQzKGxA2daaeyi1Oh7ZkUCymCOxNnpqhXzPERwoy_VLuA6UisRfcz-WebeGU7JTRq79_rpiEzk6LM8H-uORe2nKYPVZr7X_fADTr3TizdvhFzrcAFS6yQExtfV8ptdTNORD2WGIt2A4fz-7rzH8-H5Aa-SLwH3REmSi72wx9D65IAlISqts2ChcxUNvhO0YBr753pr38i6btzHQXJJMpSy_99_7XX7IAtQr2YW3mwXpZE_kCLQ0M5UuFIaEXiFLN9pYA&lib=MUVl34hDlb3QmnAUdMgd-pHfaGwe_jmdc'

function parseTtlMs(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

export const dataConfig = {
  /** mock | live — live usa Apps Script. */
  siteContentMode:
    (import.meta.env.VITE_SITE_CONTENT_MODE as DataSourceMode) || 'live',
  instagramMode: (import.meta.env.VITE_INSTAGRAM_MODE as DataSourceMode) || 'mock',

  googleScriptUrl:
    (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string) || DEFAULT_SCRIPT_URL,

  /** TTL do cache localStorage (ms). Padrão: 1 minuto. */
  cmsCacheTtlMs: parseTtlMs(import.meta.env.VITE_CMS_CACHE_TTL_MS, 60_000),
  cmsCacheKey: 'bodymove:cms:v1',

  /** Legado CSV (opcional). */
  googleSheetCsvUrl: import.meta.env.VITE_GOOGLE_SHEET_CSV_URL as string | undefined,

  instagramFeedUrl: import.meta.env.VITE_INSTAGRAM_FEED_URL as string | undefined,
  instagramProfileUrl:
    (import.meta.env.VITE_INSTAGRAM_PROFILE_URL as string) ||
    'https://www.instagram.com/',
}
