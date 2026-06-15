import { useCallback, useRef } from 'react'
import { useUserStore } from '../stores/userStore'

let audioCtx: AudioContext | null = null
function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {}
}

function playNoise(duration: number, volume = 0.15) {
  try {
    const ctx = getCtx()
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
    const src = ctx.createBufferSource()
    src.buffer = buffer
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    src.connect(gain).connect(ctx.destination)
    src.start()
  } catch {}
}

const SOUNDS: Record<string, () => void> = {
  click:     () => playTone(800, 0.06, 'sine', 0.2),
  buzz:      () => { playTone(150, 0.15, 'sawtooth', 0.15); playNoise(0.1, 0.1) },
  combo10:   () => { playTone(523, 0.1); setTimeout(() => playTone(659, 0.1), 80); setTimeout(() => playTone(784, 0.15), 160) },
  combo30:   () => { playTone(440, 0.08); setTimeout(() => playTone(554, 0.08), 60); setTimeout(() => playTone(659, 0.08), 120); setTimeout(() => playTone(880, 0.2), 180) },
  combo50:   () => { [523,659,784,1047].forEach((f,i) => setTimeout(() => playTone(f, 0.15, 'sine', 0.25), i*80)); playNoise(0.3, 0.08) },
  victory:   () => { [523,659,784,1047,784,1047].forEach((f,i) => setTimeout(() => playTone(f, 0.2, 'triangle', 0.2), i*120)) },
  levelup:   () => { [440,554,659,880].forEach((f,i) => setTimeout(() => playTone(f, 0.15), i*100)) },
  achievement: () => { playTone(880, 0.15, 'sine', 0.25); setTimeout(() => playTone(1109, 0.15), 100); setTimeout(() => playTone(1319, 0.3), 200) },
  countdown: () => playTone(440, 0.1, 'square', 0.15),
  start:     () => { playTone(523, 0.1); setTimeout(() => playTone(784, 0.15), 100) },
  pause:     () => playTone(330, 0.2, 'triangle', 0.15),
}

export function useSound() {
  const soundEnabled = useUserStore(s => s.user?.settings.soundEnabled ?? true)
  const lastComboRef = useRef(0)

  const play = useCallback((key: string) => {
    if (!soundEnabled) return
    SOUNDS[key]?.()
  }, [soundEnabled])

  const playCombo = useCallback((combo: number) => {
    if (!soundEnabled) return
    if (combo >= 50 && lastComboRef.current < 50) SOUNDS.combo50()
    else if (combo >= 30 && lastComboRef.current < 30) SOUNDS.combo30()
    else if (combo >= 10 && lastComboRef.current < 10) SOUNDS.combo10()
    lastComboRef.current = combo
  }, [soundEnabled])

  const resetCombo = useCallback(() => { lastComboRef.current = 0 }, [])

  return { play, playCombo, resetCombo }
}
