const DIGITS: Record<number, string> = {
  3: 'M 48 43 C 62 25 112 25 112 56 C 112 78 94 87 77 88 C 98 88 116 99 116 121 C 116 153 64 157 45 136',
  2: 'M 44 56 C 44 23 116 21 116 56 C 116 77 96 92 77 107 L 44 143 L 116 143',
  1: 'M 54 56 L 83 34 L 83 144 M 55 144 L 112 144',
}

/** Explicit path bounds keep every digit intact at any zoom or font setting. */
export default function CountdownNumber({ value }: { value: number }) {
  return (
    <div className="game-countdown-number" role="timer" aria-label={`${value} 秒后开始`}>
      <svg viewBox="0 0 160 180" width="160" height="180" aria-hidden="true" focusable="false">
        <path d={DIGITS[value] ?? DIGITS[1]} fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
