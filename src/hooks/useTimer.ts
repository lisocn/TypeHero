import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerOptions {
  initialTime: number
  onTimeUp?: () => void
  onTick?: (remaining: number) => void
}

export function useTimer({ initialTime, onTimeUp, onTick }: UseTimerOptions) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback((newTime?: number) => {
    setIsRunning(false)
    setTime(newTime ?? initialTime)
  }, [initialTime])

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = window.setInterval(() => {
        setTime(prev => {
          const next = prev - 1
          onTick?.(next)
          if (next <= 0) {
            setIsRunning(false)
            onTimeUp?.()
            return 0
          }
          return next
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, time, onTimeUp, onTick])

  return { time, isRunning, start, pause, reset }
}
