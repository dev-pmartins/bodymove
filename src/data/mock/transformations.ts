import type { Transformation } from '../types'

export const mockTransformations: Transformation[] = [
  {
    id: 't1',
    name: 'Bohuslava',
    quote:
      'Ganhei disposição que eu não sentia há anos. A body move mudou meu corpo e minha saúde.',
    imageUrl: '/images/case1.png',
    result: 'Mais energia · consistência',
  },
  {
    id: 't2',
    name: 'Abkeilla',
    quote:
      'Passei de sedentária a treinar 5x na semana. O ambiente puxa pra cima e nos motiva a continuar.',
    imageUrl: '/images/case2.png',
    result: 'Força · hábito',
  },
  {
    id: 't3',
    name: 'Daniela Resende',
    quote:
      'Fora da academia também sinto a diferença na postura e na confiança.',
    imageUrl: '/images/case3.png',
    result: 'Disciplina · confiança',
  },
]
