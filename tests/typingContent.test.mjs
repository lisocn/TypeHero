import assert from 'node:assert/strict'
import test from 'node:test'
import { buildTypingContent } from '../src/utils/typingContent.ts'

test('separates English words while preserving multiword phrases', () => {
  assert.equal(buildTypingContent(['ruler', 'pencil', 'pencil box'], 'word'), 'ruler pencil pencil box')
})

test('separates sentences and dialogue without changing punctuation', () => {
  for (const mode of ['sentence', 'paragraph']) {
    assert.equal(buildTypingContent(["What's your name?", 'My name is Mike.', 'Me too!'], mode, 'en'), "What's your name? My name is Mike. Me too!")
  }
})

test('separates pinyin groups and keeps syllable spaces', () => {
  assert.equal(buildTypingContent(['tian men', 'zhong duan', 'chu jiang'], 'word', 'zh-pinyin'), 'tian men zhong duan chu jiang')
})

test('does not insert spaces between individual character drills', () => {
  assert.equal(buildTypingContent(['r', 'u', 'l', 'e', 'r'], 'char', 'en'), 'ruler')
  assert.equal(buildTypingContent(['晨', '绒', '球'], 'char'), '晨绒球')
})

test('preserves Chinese text and authored internal spaces without adding boundaries', () => {
  assert.equal(buildTypingContent(['望天门山', '唐 李白', '天门中断楚江开'], 'paragraph', 'zh-hanzi'), '望天门山唐 李白天门中断楚江开')
  assert.equal(buildTypingContent(['早晨', '绒球花'], 'word'), '早晨绒球花')
})

test('avoids duplicate, leading, trailing, or unreachable whitespace', () => {
  assert.equal(buildTypingContent([' ruler ', '', '   ', 'pencil  box', '\thello\nworld '], 'word'), 'ruler pencil box hello world')
  assert.equal(buildTypingContent([], 'word'), '')
  assert.equal(buildTypingContent(['hello world'], 'word'), 'hello world')
})
