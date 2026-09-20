import type { InstagramPost } from '../types'

/** Placeholders visuais até a Graph API / proxy. */
export const mockInstagramPosts: InstagramPost[] = [
  {
    id: 'ig-1',
    permalink: 'https://www.instagram.com/',
    mediaUrl: '/images/bg01.png',
    caption: 'Treino do dia — potência e foco.',
    timestamp: '2026-09-18T10:00:00Z',
  },
  {
    id: 'ig-2',
    permalink: 'https://www.instagram.com/',
    mediaUrl: '/images/bg02.png',
    caption: 'Comunidade Body Move.',
    timestamp: '2026-09-16T18:30:00Z',
  },
  {
    id: 'ig-3',
    permalink: 'https://www.instagram.com/',
    mediaUrl: '/images/bg01.png',
    caption: 'Judô · técnica e respeito.',
    timestamp: '2026-09-14T12:00:00Z',
  },
  {
    id: 'ig-4',
    permalink: 'https://www.instagram.com/',
    mediaUrl: '/images/bg02.png',
    caption: 'O movimento que transforma.',
    timestamp: '2026-09-12T09:15:00Z',
  },
  {
    id: 'ig-5',
    permalink: 'https://www.instagram.com/',
    mediaUrl: '/images/bg01.png',
    caption: 'Funcional intenso, seguro e acompanhado.',
    timestamp: '2026-09-10T20:00:00Z',
  },
  {
    id: 'ig-6',
    permalink: 'https://www.instagram.com/',
    mediaUrl: '/images/bg02.png',
    caption: 'Venha conhecer o studio.',
    timestamp: '2026-09-08T15:45:00Z',
  },
]
