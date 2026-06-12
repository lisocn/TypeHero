import { useCallback, useRef } from 'react'

interface UseComboReturn {
  combo: number
  maxCombo: number
  addHit: () => void
  resetCombo: () => void
  getComboMessage: () => string | null
}

export function useCombo(): UseComboReturn {
  const comboRef = useRef(0)
  const maxComboRef = useRef(0)

  const addHit = useCallback(() => {
    comboRef.current++
    if (comboRef.current > maxComboRef.current) {
      maxComboRef.current = comboRef.current
    }
  }, [])

  const resetCombo = useCallback(() => {
    comboRef.current = 0
  }, [])

  const getComboMessage = useCallback((): string | null => {
    const c = comboRef.current
    if (c >= 50) return 'Legendary!'
    if (c >= 30) return 'Amazing!'
    if (c >= 10) return 'Nice!'
    return null
  }, [])

  return {
    get combo() { return comboRef.current },
    get maxCombo() { return maxComboRef.current },
    addHit,
    resetCombo,
    getComboMessage,
  }
}
