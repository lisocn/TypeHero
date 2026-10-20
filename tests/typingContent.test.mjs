import assert from 'node:assert/strict'
import test from 'node:test'
import { buildTypingContent, getChineseTypingSegments } from '../src/utils/typingContent.ts'

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

test('Chinese display segments retain exact scored offsets and do not add spaces', () => {
  const content = [' 望天门山 ', '唐  李白', '', '天门中断楚江开', '碧水东流至此回']
  const text = buildTypingContent(content, 'paragraph', 'zh-hanzi')
  const segments = getChineseTypingSegments(content, 'paragraph')
  assert.equal(segments.map(segment => segment.text).join(''), text)
  for (const segment of segments) assert.equal(text.slice(segment.start, segment.start + segment.text.length), segment.text)
  assert.deepEqual(getChineseTypingSegments(['晨', '绒', '球'], 'char'), [
    { text: '晨', start: 0 }, { text: '绒', start: 1 }, { text: '球', start: 2 },
  ])
})
