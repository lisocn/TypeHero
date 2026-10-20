interface VirtualKeyboardProps {
  targetKey: string
  lastKey?: { key: string; correct: boolean } | null
}

const ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
]

export default function VirtualKeyboard({ targetKey, lastKey }: VirtualKeyboardProps) {
  const target = targetKey.toUpperCase()

  return (
    <div className="virtual-keyboard" aria-label="键盘指引">
      {ROWS.map((row, ri) => (
        <div key={ri} className="virtual-key-row">
          {row.map(key => {
            const isTarget = key.toUpperCase() === target
            const isLastCorrect = lastKey?.key.toUpperCase() === key.toUpperCase() && lastKey.correct
            const isLastWrong = lastKey?.key.toUpperCase() === key.toUpperCase() && !lastKey.correct

            let bg = 'bg-slate-700'
            let ring = ''
            if (isTarget) {
              bg = 'bg-[var(--color-accent-gold)]'
              ring = 'ring-2 ring-yellow-300 animate-pulse'
            } else if (isLastCorrect) {
              bg = 'bg-green-500'
            } else if (isLastWrong) {
              bg = 'bg-red-500 animate-[shake_0.3s]'
            }

            return (
              <div
                key={key}
                className={`virtual-key rounded-md flex items-center justify-center font-mono font-semibold text-white ${bg} ${ring} transition-colors duration-150`}
              >
                {key}
              </div>
            )
          })}
        </div>
      ))}
      <div className={`virtual-space rounded-md flex items-center justify-center text-sm font-mono font-semibold text-white ${targetKey === ' ' ? 'bg-[var(--color-accent-gold)] ring-2 ring-yellow-300' : 'bg-slate-700'}`}>
        SPACE
      </div>
    </div>
  )
}
