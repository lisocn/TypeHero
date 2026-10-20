import { useId, useRef } from 'react'

export default function ChineseTypingInput({ onTextInput }: { onTextInput: (text: string) => void }) {
  const id = useId()
  const composing = useRef(false)

  return (
    <div className="chinese-typing-input">
      <label htmlFor={id}>中文输入区</label>
      <input
        id={id}
        lang="zh-CN"
        autoFocus
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder="切换中文输入法，在这里输入汉字"
        aria-describedby={`${id}-help`}
        onCompositionStart={() => { composing.current = true }}
        onCompositionEnd={event => {
          composing.current = false
          // An empty composition is a cancellation, not a scored keystroke.
          if (event.data) onTextInput(event.data)
          event.currentTarget.value = ''
        }}
        onInput={event => {
          if (composing.current || (event.nativeEvent as InputEvent).isComposing) return
          const input = event.currentTarget
          if (input.value) onTextInput(input.value)
          input.value = ''
        }}
        onKeyDown={event => {
          if (composing.current || event.nativeEvent.isComposing || event.keyCode === 229) {
            // Enter/Space choose a candidate; Escape cancels composition.
            event.stopPropagation()
          } else if (event.key === 'Enter') {
            event.preventDefault()
          }
        }}
        onPaste={event => event.preventDefault()}
        onDrop={event => event.preventDefault()}
      />
      <p id={`${id}-help`}>选字确认后计分，支持一次输入多个汉字。回车 / 空格用于选字，Esc 暂停练习。</p>
    </div>
  )
}
