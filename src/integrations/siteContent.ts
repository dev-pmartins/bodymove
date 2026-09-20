import { mockSiteContent } from '../data/mock/siteContent'
import type { SiteContent } from '../data/types'
import { dataConfig } from './config'
import { fetchSiteContentFromGoogleSheet } from './googleSheet'

/**
 * Conteúdo de contato + slides.
 * Forms/Sheet em modo live; mock por padrão.
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (dataConfig.siteContentMode !== 'live') {
    return mockSiteContent
  }
  try {
    return await fetchSiteContentFromGoogleSheet()
  } catch (err) {
    console.warn('[siteContent] fallback para mock:', err)
    return mockSiteContent
  }
}
