export type CountdownCue = 1 | 2 | 3 | 'ready' | 'start' | 'victory'

const CLIPS: Record<CountdownCue, string> = {
  3: 'three.mp3',
  2: 'two.mp3',
  1: 'one.mp3',
  start: 'start.mp3',
  victory: 'victory.mp3',
  ready: 'ready.mp3',
}

/** Short bundled clips keep pronunciation consistent across browsers and devices. */
export function createCountdownVoicePlayer(createAudio: (src: string) => HTMLAudioElement, baseUrl = '/') {
  const clips = new Map<CountdownCue, HTMLAudioElement>()
  for (const cue of [3, 2, 1, 'start', 'victory', 'ready'] as const) {
    const audio = createAudio(`${baseUrl}audio/countdown/${CLIPS[cue]}`)
    audio.preload = 'auto'
    audio.volume = 0.9
    audio.load()
    clips.set(cue, audio)
  }

  let current: HTMLAudioElement | null = null
  const stop = () => {
    if (!current) return
    current.pause()
    current.currentTime = 0
    current = null
  }

  return {
    stop,
    play(cue: CountdownCue) {
      stop()
      const audio = clips.get(cue)
      if (!audio) return
      current = audio
      // Autoplay restrictions and interrupted play requests must not block a round.
      void audio.play().catch(() => {})
    },
  }
}
