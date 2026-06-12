export interface TypingResult {
  totalChars: number
  correctChars: number
  wrongChars: number
  accuracy: number
  wpm: number
  maxCombo: number
  duration: number
  stars: 1 | 2 | 3
  exp: number
  coin: number
}

export function calcWPM(correctChars: number, durationSeconds: number): number {
  if (durationSeconds <= 0) return 0
  return Math.round((correctChars / 5) / (durationSeconds / 60))
}

export function calcAccuracy(correctChars: number, totalInputs: number): number {
  if (totalInputs === 0) return 100
  return Math.round((correctChars / totalInputs) * 100)
}

export function calcStars(
  accuracy: number,
  wpm: number,
  targetWPM: { bronze: number; silver: number; gold: number }
): 1 | 2 | 3 {
  if (accuracy >= 97 && wpm >= targetWPM.gold * 1.4) return 3
  if (accuracy >= 90 && wpm >= targetWPM.silver) return 2
  if (accuracy >= 70) return 1
  return 1
}

export function calcExpReward(stars: 1 | 2 | 3, maxCombo: number): number {
  const base = stars === 3 ? 80 : stars === 2 ? 50 : 30
  const comboExp = Math.floor(maxCombo / 1) * 2
  return base + comboExp
}

export function calcCoinReward(stars: 1 | 2 | 3, maxCombo: number): number {
  const base = stars === 3 ? 50 : stars === 2 ? 20 : 10
  const comboCoin = Math.floor(maxCombo / 5)
  return base + comboCoin
}
