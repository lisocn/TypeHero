import { useState, useCallback, useRef, useEffect } from 'react'
import { calcWPM, calcAccuracy } from '../utils/stats'

export interface TypedChar {
  expected: string
  typed: string
  correct: boolean
  timestamp: number
}

export interface TypingEngineConfig {
  mode: 'char' | 'word' | 'sentence' | 'paragraph'
  content: string[]
  timeLimit: number
  difficulty: 'easy' | 'medium' | 'hard'
  onComplete: (result: TypingResult) => void
  onTick?: (remaining: number) => void
}

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

interface TypingEngineState {
  status: 'idle' | 'playing' | 'paused' | 'finished'
  currentIndex: number
  currentChar: string
  typedChars: TypedChar[]
  wpm: number
  accuracy: number
  combo: number
  maxCombo: number
  remainingTime: number
  progress: number
  start: () => void
  pause: () => void
  resume: () => void
  reset: () => void
  handleKeyDown: (key: string) => void
}

export function useTypingEngine(config: TypingEngineConfig): TypingEngineState {
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused' | 'finished'>('idle')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [typedChars, setTypedChars] = useState<TypedChar[]>([])
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [remainingTime, setRemainingTime] = useState(config.timeLimit)

  const startTimeRef = useRef<number>(0)
  const totalInputsRef = useRef(0)
  const correctInputsRef = useRef(0)
  const comboRef = useRef(0)
  const maxComboRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  const fullContent = config.content.join('')
  const progress = fullContent.length > 0 ? Math.min(100, (currentIndex / fullContent.length) * 100) : 0

  const calculateResult = useCallback((): TypingResult => {
    const duration = (Date.now() - startTimeRef.current) / 1000
    const acc = calcAccuracy(correctInputsRef.current, totalInputsRef.current)
    const currentWpm = calcWPM(correctInputsRef.current, duration)
    const stars = acc >= 97 && currentWpm >= 35 ? 3 : acc >= 90 && currentWpm >= 25 ? 2 : acc >= 70 ? 1 : 1
    const exp = (stars === 3 ? 80 : stars === 2 ? 50 : 30) + maxComboRef.current * 2
    const coin = (stars === 3 ? 50 : stars === 2 ? 20 : 10) + Math.floor(maxComboRef.current / 5)

    return {
      totalChars: totalInputsRef.current,
      correctChars: correctInputsRef.current,
      wrongChars: totalInputsRef.current - correctInputsRef.current,
      accuracy: acc,
      wpm: currentWpm,
      maxCombo: maxComboRef.current,
      duration,
      stars: stars as 1 | 2 | 3,
      exp,
      coin,
    }
  }, [])

  const finishGame = useCallback(() => {
    setStatus('finished')
    if (timerRef.current) clearInterval(timerRef.current)
    config.onComplete(calculateResult())
  }, [config, calculateResult])

  const start = useCallback(() => {
    setStatus('playing')
    startTimeRef.current = Date.now()
    totalInputsRef.current = 0
    correctInputsRef.current = 0
    comboRef.current = 0
    maxComboRef.current = 0

    if (config.timeLimit > 0) {
      setRemainingTime(config.timeLimit)
      timerRef.current = window.setInterval(() => {
        setRemainingTime(prev => {
          const next = prev - 1
          config.onTick?.(next)
          if (next <= 0) {
            if (timerRef.current) clearInterval(timerRef.current)
            setTimeout(() => finishGame(), 0)
            return 0
          }
          return next
        })
      }, 1000)
    }
  }, [config, finishGame])

  const pause = useCallback(() => {
    setStatus('paused')
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  const resume = useCallback(() => {
    setStatus('playing')
    if (config.timeLimit > 0) {
      timerRef.current = window.setInterval(() => {
        setRemainingTime(prev => {
          const next = prev - 1
          config.onTick?.(next)
          if (next <= 0) {
            if (timerRef.current) clearInterval(timerRef.current)
            setTimeout(() => finishGame(), 0)
            return 0
          }
          return next
        })
      }, 1000)
    }
  }, [config, finishGame])

  const reset = useCallback(() => {
    setStatus('idle')
    setCurrentIndex(0)
    setTypedChars([])
    setWpm(0)
    setAccuracy(100)
    setCombo(0)
    setMaxCombo(0)
    setRemainingTime(config.timeLimit)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [config.timeLimit])

  const handleKeyDown = useCallback((key: string) => {
    if (status !== 'playing') return
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(key)) return

    const expected = fullContent[currentIndex]
    if (!expected) return

    totalInputsRef.current++

    if (key === expected) {
      correctInputsRef.current++
      comboRef.current++
      if (comboRef.current > maxComboRef.current) {
        maxComboRef.current = comboRef.current
      }
      setCombo(comboRef.current)
      setMaxCombo(maxComboRef.current)
    } else {
      comboRef.current = 0
      setCombo(0)
    }

    setTypedChars(prev => [...prev, { expected, typed: key, correct: key === expected, timestamp: Date.now() }])

    const newIndex = currentIndex + 1
    setCurrentIndex(newIndex)

    const duration = (Date.now() - startTimeRef.current) / 1000
    setWpm(calcWPM(correctInputsRef.current, duration))
    setAccuracy(calcAccuracy(correctInputsRef.current, totalInputsRef.current))

    if (newIndex >= fullContent.length) {
      finishGame()
    }
  }, [status, currentIndex, fullContent, finishGame])

  useEffect(() => {
    if (status !== 'playing') return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault()
        return
      }
      if (e.key === 'Escape') {
        pause()
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        return
      }
      if (e.key.length === 1) {
        handleKeyDown(e.key)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [status, handleKeyDown, pause])

  useEffect(() => {
    const handleBlur = () => {
      if (status === 'playing') pause()
    }
    window.addEventListener('blur', handleBlur)
    return () => window.removeEventListener('blur', handleBlur)
  }, [status, pause])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const currentChar = fullContent[currentIndex] || ''

  return {
    status,
    currentIndex,
    currentChar,
    typedChars,
    wpm,
    accuracy,
    combo,
    maxCombo,
    remainingTime,
    progress,
    start,
    pause,
    resume,
    reset,
    handleKeyDown,
  }
}
