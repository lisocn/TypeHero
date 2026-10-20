import assert from 'node:assert/strict'
import test from 'node:test'
import { isPlainEnter } from '../src/utils/keyboard.ts'

const enter = { key: 'Enter', isComposing: false, keyCode: 13, ctrlKey: false, altKey: false, metaKey: false, shiftKey: false }

test('accepts ordinary Enter, including the numeric keypad Enter key', () => {
  assert.equal(isPlainEnter(enter), true)
  assert.equal(isPlainEnter({ ...enter, code: 'NumpadEnter' }), true)
})

test('does not treat IME confirmation as a page action', () => {
  assert.equal(isPlainEnter({ ...enter, isComposing: true }), false)
  assert.equal(isPlainEnter({ ...enter, keyCode: 229 }), false)
})

test('leaves modifier shortcuts and other keys alone', () => {
  for (const modifier of ['ctrlKey', 'altKey', 'metaKey', 'shiftKey']) {
    assert.equal(isPlainEnter({ ...enter, [modifier]: true }), false)
  }
  for (const key of [' ', 'Escape', 'a', 'Tab']) assert.equal(isPlainEnter({ ...enter, key }), false)
})
