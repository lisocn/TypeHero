import { useCallback, useRef } from 'react'
import { useUserStore } from '../stores/userStore'

const SOUND_URLS: Record<string, string> = {
  click: '/sounds/click.mp3',
  buzz: '/sounds/buzz.mp3',
  combo10: '/sounds/combo10.mp3',
  combo30: '/sounds/combo30.mp3',
  combo50: '/sounds/combo50.mp3',
  victory: '/sounds/victory.mp3',
  levelup: '/sounds/levelup.mp3',
  achievement: '/sounds/achievement.mp3',
}

export function useSound() {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})
  const soundEnabled = useUserStore(s => s.user?.settings.soundEnabled ?? true)

  const preload = useCallback((key: string) => {
    if (audioRefs.current[key]) return
    const audio = new Audio(SOUND_URLS[key])
    audio.preload = 'auto'
    audioRefs.current[key] = audio
  }, [])

  const play = useCallback((key: string) => {
    if (!soundEnabled) return
    const audio = audioRefs.current[key]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(() => {})
    }
  }, [soundEnabled])

  const stop = useCallback((key: string) => {
    const audio = audioRefs.current[key]
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return { preload, play, stop }
}
