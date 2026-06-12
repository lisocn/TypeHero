export function getExpForLevel(level: number): number {
  return Math.ceil(100 * level * 1.2)
}

export function getLevelFromExp(totalExp: number): { level: number; currentExp: number; nextExp: number } {
  let level = 1
  let accumulated = 0
  while (true) {
    const needed = getExpForLevel(level)
    if (accumulated + needed > totalExp) {
      return { level, currentExp: totalExp - accumulated, nextExp: needed }
    }
    accumulated += needed
    level++
  }
}

export const AVATARS = [
  { id: 'astronaut', name: '宇航员', emoji: '👨‍🚀' },
  { id: 'ninja', name: '忍者', emoji: '🥷' },
  { id: 'princess', name: '公主', emoji: '👸' },
  { id: 'knight', name: '龙骑士', emoji: '🐉' },
] as const

export type AvatarId = typeof AVATARS[number]['id']
