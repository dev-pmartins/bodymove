import { mockSiteContent } from '../data/mock/siteContent'
import { mockTreinoDoDia } from '../data/mock/treino'
import type { SiteContent, TreinoDoDia } from '../data/types'
import { dataConfig } from './config'
import { getCmsBundle, type CmsBundle } from './googleAppsScript'

async function loadBundle(): Promise<CmsBundle> {
  if (dataConfig.siteContentMode !== 'live') {
    return {
      content: mockSiteContent,
      treino: mockTreinoDoDia,
      rawWeek: {},
    }
  }
  try {
    return await getCmsBundle()
  } catch (err) {
    console.warn('[cms] fallback para mock:', err)
    return {
      content: mockSiteContent,
      treino: mockTreinoDoDia,
      rawWeek: {},
    }
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const bundle = await loadBundle()
  return bundle.content
}

export async function getTreinoDoDia(): Promise<TreinoDoDia> {
  const bundle = await loadBundle()
  return bundle.treino
}

export async function getCms(): Promise<CmsBundle> {
  return loadBundle()
}
