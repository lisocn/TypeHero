import assert from 'node:assert/strict'
import test from 'node:test'
import { getWordHint } from '../src/data/wordHints.ts'
import { getCurrentWordHint } from '../src/utils/wordLearning.ts'
import { TEXTBOOKS } from '../src/data/textbooks.ts'

test('every English word/phrase in the textbooks has a meaning and reading hint', () => {
  for (const textbook of TEXTBOOKS.filter(tb => tb.subject === 'english')) {
    for (const chapter of textbook.chapters) {
      for (const level of chapter.levels.filter(lv => lv.content.mode === 'word')) {
        for (const item of level.content.items) {
          const hint = getWordHint(item.input)
          assert.ok(hint?.meaning && hint?.syllables, `${level.id}: missing ${item.input}`)
        }
      }
    }
  }
})

test('word hints follow typing across spaces without changing the scored text', () => {
  const text = 'ruler pencil eraser'
  assert.deepEqual(getCurrentWordHint(text, 0), { word: 'ruler', meaning: '尺子', syllables: 'ru·ler' })
  assert.equal(getCurrentWordHint(text, 5).word, 'ruler')
  assert.equal(getCurrentWordHint(text, 6).syllables, 'pen·cil')
  assert.equal(getCurrentWordHint(text, 13).meaning, '橡皮')
  assert.equal(getCurrentWordHint(text, text.length), null)
  assert.equal(getCurrentWordHint(text, -1), null)
})

test('multiword phrases retain their whole meaning while the cursor moves inside', () => {
  const items = ['pencil box', 'ice cream']
  const text = items.join(' ')
  assert.equal(getCurrentWordHint(text, 8, items).meaning, '铅笔盒')
  assert.equal(getCurrentWordHint(text, 10, items).meaning, '铅笔盒')
  assert.deepEqual(getCurrentWordHint(text, 11, items), { word: 'ice cream', meaning: '冰淇淋', syllables: 'ice / cream' })
})

test('handles case, normalized whitespace and pronunciation exceptions', () => {
  assert.equal(getWordHint('  Pencil   box ').syllables, 'pen·cil / box')
  assert.equal(getWordHint('UK').meaning, '英国')
  assert.equal(getWordHint('vegetable').syllables, '/ˈvedʒ.tə.bəl/')
  assert.equal(getWordHint('unknown-word'), null)
  assert.equal(getCurrentWordHint('早晨绒球花', 0), null)
})
