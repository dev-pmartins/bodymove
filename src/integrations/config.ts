/**
 * Integrações externas.
 *
 * Fluxo Google (sem backend):
 * 1. Formulário Google Forms (ou edição direta) grava em uma Google Sheet.
 * 2. Aba publicada como CSV (Arquivo → Compartilhar → Publicar na web).
 * 3. URL do CSV em VITE_GOOGLE_SHEET_CSV_URL.
 *
 * Instagram:
 * Graph API exige token — não colocar no front. Fase atual = mock.
 * Depois: Cloudflare Worker / função edge com VITE_INSTAGRAM_FEED_URL.
 */

export type DataSourceMode = 'mock' | 'live'

export const dataConfig = {
  /** Troque para 'live' quando as URLs estiverem configuradas. */
  siteContentMode: (import.meta.env.VITE_SITE_CONTENT_MODE as DataSourceMode) || 'mock',
  instagramMode: (import.meta.env.VITE_INSTAGRAM_MODE as DataSourceMode) || 'mock',
  googleSheetCsvUrl: import.meta.env.VITE_GOOGLE_SHEET_CSV_URL as string | undefined,
  /** Endpoint proxy que devolve JSON de posts do Instagram. */
  instagramFeedUrl: import.meta.env.VITE_INSTAGRAM_FEED_URL as string | undefined,
  instagramProfileUrl:
    (import.meta.env.VITE_INSTAGRAM_PROFILE_URL as string) ||
    'https://www.instagram.com/',
}
