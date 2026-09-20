import type { CampaignSlide, SiteContact, SiteContent } from '../data/types'
import { mockSiteContent } from '../data/mock/siteContent'
import { dataConfig } from './config'

/**
 * CSV esperado (cabeçalho na 1ª linha). Duas “seções” lógicas na mesma planilha
 * ou abas publicadas — aqui usamos um CSV único com coluna `tipo`:
 *
 * tipo,chave,valor,titulo,subtitulo,imagem_url,link_url,cta
 * config,telefone,+55 11 ...
 * config,whatsapp,+55 11 ...
 * config,whatsapp_digits,5511...
 * config,endereco_linha,Av. Tiradentes, 2150
 * config,endereco_bairro,Jardim Santa Edwirges
 * config,endereco_cidade,Guarulhos
 * config,endereco_uf,SP
 * config,endereco_cep,07113-001
 * slide,, ,Título,Sub,https://...,https://wa.me/...,CTA
 */

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
      continue
    }

    if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(cell)
      cell = ''
    } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
      if (ch === '\r') i++
    } else if (ch !== '\r') {
      cell += ch
    }
  }

  if (cell.length || row.length) {
    row.push(cell)
    rows.push(row)
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ''))
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

function buildMapsUrl(contact: Omit<SiteContact['address'], 'mapsUrl'>): string {
  const full = `${contact.line} - ${contact.neighborhood}, ${contact.city} - ${contact.state}, ${contact.zip}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(full)}`
}

export function parseSiteContentCsv(csv: string): SiteContent {
  const rows = parseCsv(csv.trim())
  if (rows.length < 2) {
    throw new Error('CSV do Google Sheet vazio ou inválido')
  }

  const header = rows[0].map((h) => h.trim().toLowerCase())
  const idx = (name: string) => header.indexOf(name)

  const tipoI = idx('tipo')
  const chaveI = idx('chave')
  const valorI = idx('valor')
  const tituloI = idx('titulo')
  const subI = idx('subtitulo')
  const imgI = idx('imagem_url')
  const linkI = idx('link_url')
  const ctaI = idx('cta')

  const config: Record<string, string> = {}
  const slides: CampaignSlide[] = []

  for (const r of rows.slice(1)) {
    const tipo = (r[tipoI] || '').trim().toLowerCase()
    if (tipo === 'config') {
      const key = (r[chaveI] || '').trim().toLowerCase()
      const val = (r[valorI] || '').trim()
      if (key) config[key] = val
    } else if (tipo === 'slide') {
      const title = (r[tituloI] || '').trim()
      const imageUrl = (r[imgI] || '').trim()
      const linkUrl = (r[linkI] || '').trim()
      if (!title || !imageUrl || !linkUrl) continue
      slides.push({
        id: `slide-${slides.length + 1}`,
        title,
        subtitle: (r[subI] || '').trim() || undefined,
        imageUrl,
        linkUrl,
        ctaLabel: (r[ctaI] || '').trim() || undefined,
      })
    }
  }

  const addressBase = {
    line: config.endereco_linha || mockSiteContent.contact.address.line,
    neighborhood:
      config.endereco_bairro || mockSiteContent.contact.address.neighborhood,
    city: config.endereco_cidade || mockSiteContent.contact.address.city,
    state: config.endereco_uf || mockSiteContent.contact.address.state,
    zip: config.endereco_cep || mockSiteContent.contact.address.zip,
  }

  const whatsapp =
    config.whatsapp || config.telefone || mockSiteContent.contact.whatsapp
  const phone = config.telefone || whatsapp
  const whatsappDigits =
    config.whatsapp_digits ||
    digitsOnly(whatsapp) ||
    mockSiteContent.contact.whatsappDigits

  return {
    contact: {
      phone,
      whatsapp,
      whatsappDigits,
      address: {
        ...addressBase,
        mapsUrl: buildMapsUrl(addressBase),
      },
    },
    slides: slides.length ? slides : mockSiteContent.slides,
  }
}

export async function fetchSiteContentFromGoogleSheet(
  csvUrl = dataConfig.googleSheetCsvUrl,
): Promise<SiteContent> {
  if (!csvUrl) {
    throw new Error('VITE_GOOGLE_SHEET_CSV_URL não configurada')
  }
  const res = await fetch(csvUrl, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Falha ao buscar Sheet (${res.status})`)
  }
  const text = await res.text()
  return parseSiteContentCsv(text)
}
