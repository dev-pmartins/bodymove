import type { SiteContent } from '../types'

const ADDRESS_LINE = 'Av. Tiradentes, 2150'
const NEIGHBORHOOD = 'Jardim Santa Edwirges'
const CITY = 'Guarulhos'
const STATE = 'SP'
const ZIP = '07113-001'
const FULL =
  `${ADDRESS_LINE} - ${NEIGHBORHOOD}, ${CITY} - ${STATE}, ${ZIP}`

export const mockSiteContent: SiteContent = {
  contact: {
    phone: '+55 11 98506-2758',
    whatsapp: '+55 11 98506-2758',
    whatsappDigits: '5511985062758',
    address: {
      line: ADDRESS_LINE,
      neighborhood: NEIGHBORHOOD,
      city: CITY,
      state: STATE,
      zip: ZIP,
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FULL)}`,
    },
  },
  slides: [
    {
      id: 'slide-1',
      title: 'Primeira semana com condição especial',
      subtitle: 'Venha conhecer o studio e treinar com acompanhamento de perto.',
      imageUrl: '/images/bg01.png',
      linkUrl:
        'https://wa.me/5511985062758?text=Ol%C3%A1!%20Quero%20saber%20da%20primeira%20semana.',
      ctaLabel: 'Quero essa oferta',
    },
    {
      id: 'slide-2',
      title: 'Aulas de Judô',
      subtitle: 'Técnica, disciplina e movimento — turmas abertas.',
      imageUrl: '/images/bg02.png',
      linkUrl:
        'https://wa.me/5511985062758?text=Ol%C3%A1!%20Quero%20saber%20sobre%20Jud%C3%B4.',
      ctaLabel: 'Falar no WhatsApp',
    },
    {
      id: 'slide-3',
      title: 'Funcional todos os dias',
      subtitle: 'Treinos de 1h, intensos e adaptados ao seu limite.',
      imageUrl: '/images/bg01.png',
      linkUrl:
        'https://wa.me/5511985062758?text=Ol%C3%A1!%20Quero%20treinar%20funcional.',
      ctaLabel: 'Começar agora',
    },
  ],
}
