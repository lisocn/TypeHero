import type { LevelContent } from '../data/types'

/** Build the text used by both the renderer and the typing engine. */
export function buildTypingContent(
  content: readonly string[],
  mode: LevelContent['mode'],
  language?: LevelContent['language'],
): string {
  // Character drills are individual keystrokes, not separate words.
  if (mode === 'char') return content.join('')

  const items = content.map(item => item.trim().replace(/\s+/g, ' ')).filter(Boolean)
  // Older textbook entries omit language; infer Chinese from their actual text.
  const needsSpaces = language ? language !== 'zh-hanzi' : !items.some(item => /\p{Script=Han}/u.test(item))
  return items.join(needsSpaces ? ' ' : '')
}
