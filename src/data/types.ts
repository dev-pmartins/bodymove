/** Conteúdo dinâmico do site (Forms → Sheet → front). */

export type SiteContact = {
  phone: string
  whatsapp: string
  /** Número só dígitos com DDI, ex: 5511985062758 */
  whatsappDigits: string
  address: {
    line: string
    neighborhood: string
    city: string
    state: string
    zip: string
    mapsUrl: string
  }
}

export type CampaignSlide = {
  id: string
  title: string
  subtitle?: string
  imageUrl: string
  /** Link do CTA (WhatsApp, landing externa, etc.) */
  linkUrl: string
  ctaLabel?: string
}

export type SiteContent = {
  contact: SiteContact
  slides: CampaignSlide[]
}

export type TreinoExercise = {
  name: string
  detail?: string
}

export type TreinoDoDia = {
  dateLabel: string
  focus: string
  duration: string
  exercises: TreinoExercise[]
}

export type Product = {
  id: string
  name: string
  description: string
}

export type Transformation = {
  id: string
  name: string
  quote: string
  imageUrl: string
  result?: string
}

export type InstagramPost = {
  id: string
  permalink: string
  mediaUrl: string
  caption?: string
  timestamp?: string
}
