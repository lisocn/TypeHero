import { getWordHint, type WordHint } from '../data/wordHints.ts'
import { buildTypingContent } from './typingContent.ts'

/** Spaces retain the preceding item's hint until the next word actually begins. */
export function getCurrentWordHint(text: string, index: number, items?: readonly string[]): WordHint | null {
  if (index < 0 || index >= text.length) return null
  if (items) {
    let offset = 0
    for (const item of items) {
      const normalized = buildTypingContent([item], 'word', 'en')
      if (!normalized) continue
      if (index < offset + normalized.length + 1) {
        const phrase = getWordHint(normalized)
        if (phrase) return phrase
        break
      }
      offset += normalized.length + 1
    }
  }
  let current = ''
  for (const match of text.matchAll(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)) {
    if (match.index > index) break
    current = match[0]
    if (index < match.index + current.length) break
  }
  return getWordHint(current)
}
