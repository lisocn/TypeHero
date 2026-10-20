import assert from 'node:assert/strict'
import test from 'node:test'
import { createCountdownVoicePlayer } from '../src/utils/countdownVoice.ts'

function setup(rejectPlayback = false) {
  const clips = []
  const player = createCountdownVoicePlayer(src => {
    const clip = { src, preload: '', volume: 0, currentTime: 0, paused: true, loaded: false,
      load() { this.loaded = true },
      pause() { this.paused = true },
      play() { this.paused = false; return rejectPlayback ? Promise.reject(new Error('Autoplay blocked')) : Promise.resolve() },
    }
    clips.push(clip)
    return clip
  }, '/typehero/')
  return { player, clips }
}

test('preloads countdown and victory clips using the deployed base path', () => {
  const { clips } = setup()
  assert.deepEqual(clips.map(c => c.src), ['three', 'two', 'one', 'start', 'victory', 'ready'].map(name => `/typehero/audio/countdown/${name}.mp3`))
  assert.ok(clips.every(c => c.loaded && c.preload === 'auto' && c.volume > 0 && c.volume <= 1))
})

test('advancing countdown steps stops the previous voice and never overlaps clips', () => {
  const { player, clips } = setup()
  player.play(3)
  clips[0].currentTime = .2
  player.play(2)
  assert.equal(clips[0].paused, true)
  assert.equal(clips[0].currentTime, 0)
  assert.deepEqual(clips.map(c => c.paused), [true, false, true, true, true, true])
})

test('skipping to start cancels a number; cleanup or muting stops and rewinds playback', () => {
  const { player, clips } = setup()
  player.play(3)
  player.play('start')
  assert.deepEqual(clips.map(c => c.paused), [true, true, true, false, true, true])
  player.stop()
  player.stop()
  assert.ok(clips.every(c => c.paused && c.currentTime === 0))
  player.play(3)
  assert.equal(clips[0].paused, false)
})

test('victory encouragement replaces the start voice and is cancelled by replay', () => {
  const { player, clips } = setup()
  player.play('start')
  player.play('victory')
  assert.deepEqual(clips.map(c => c.paused), [true, true, true, true, false, true])
  player.play(3)
  assert.deepEqual(clips.map(c => c.paused), [false, true, true, true, true, true])
})

test('ready announcement can be replaced by either the countdown or immediate start', () => {
  const { player, clips } = setup()
  player.play('ready')
  assert.equal(clips[5].paused, false)
  player.play(3)
  assert.equal(clips[5].paused, true)
  player.play('ready')
  player.play('start')
  assert.deepEqual(clips.map(c => c.paused), [true, true, true, false, true, true])
})

test('autoplay rejection does not interrupt the game or create an unhandled rejection', async () => {
  const { player } = setup(true)
  assert.doesNotThrow(() => player.play(1))
  await new Promise(resolve => setTimeout(resolve, 0))
  player.stop()
})
