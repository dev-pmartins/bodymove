import type { TreinoDoDia } from '../types'

export const mockTreinoDoDia: TreinoDoDia = {
  dateLabel: 'Hoje',
  focus: 'Full body · potência',
  duration: '60 min',
  exercises: [
    { name: 'Aquecimento dinâmico', detail: '8 min · mobilidade + ativação' },
    { name: 'Swing com kettlebell', detail: '4x12' },
    { name: 'Agachamento goblet', detail: '4x10' },
    { name: 'Remada unilateral', detail: '3x12 (cada lado)' },
    { name: 'Battle ropes', detail: '5x30s' },
    { name: 'Prancha + respiração', detail: '3x40s · volta à calma' },
  ],
}
