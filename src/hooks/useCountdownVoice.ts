import { useCallback, useEffect, useRef } from 'react'
import { useUserStore } from '../stores/userStore'
import { createCountdownVoicePlayer, type CountdownCue } from '../utils/countdownVoice'

export function useCountdownVoice() {
  const soundEnabled = useUserStore(s => s.user?.settings.soundEnabled ?? true)
  const playerRef = useRef<ReturnType<typeof createCountdownVoicePlayer> | null>(null)

  useEffect(() => {
    const player = createCountdownVoicePlayer(src => new Audio(src), import.meta.env.BASE_URL)
    playerRef.current = player
    return () => { player.stop(); playerRef.current = null }
  }, [])

  useEffect(() => {
    if (!soundEnabled) playerRef.current?.stop()
  }, [soundEnabled])

  const playCountdownVoice = useCallback((cue: CountdownCue) => {
    if (soundEnabled) playerRef.current?.play(cue)
  }, [soundEnabled])
  const stopCountdownVoice = useCallback(() => playerRef.current?.stop(), [])

  return { playCountdownVoice, stopCountdownVoice }
}
