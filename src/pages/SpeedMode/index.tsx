import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypingEngine } from '../../hooks/useTypingEngine'
import { useUserStore } from '../../stores/userStore'
import VirtualKeyboard from '../../components/VirtualKeyboard'
import Button from '../../components/Button'

const SPEED_WORDS = [
  'ruler', 'pencil', 'eraser', 'crayon', 'bag', 'pen', 'book', 'hello',
  'colour', 'green', 'yellow', 'orange', 'brown', 'white', 'black', 'blue',
  'head', 'face', 'nose', 'mouth', 'hand', 'foot', 'body', 'arm', 'leg',
  'good', 'great', 'nice', 'cool', 'fine', 'well', 'like', 'love',
  'cat', 'dog', 'pig', 'cow', 'hen', 'duck', 'bird', 'fish',
]

export default function SpeedMode() {
  const navigate = useNavigate()
  const addExp = useUserStore(s => s.addExp)
  const addCoin = useUserStore(s => s.addCoin)
  const [bestWpm, setBestWpm] = useState(() => {
    return parseInt(localStorage.getItem('typehero-speed-best') || '0')
  })
  const [isStarted, setIsStarted] = useState(false)

  const content = useMemo(() => {
    const shuffled = [...SPEED_WORDS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 30).join(' ')
  }, [isStarted])

  const engine = useTypingEngine({
    mode: 'word',
    content: [content],
    timeLimit: 60,
    difficulty: 'medium',
    onComplete: (result) => {
      if (result.wpm > bestWpm) {
        setBestWpm(result.wpm)
        localStorage.setItem('typehero-speed-best', String(result.wpm))
      }
      addExp(result.exp)
      addCoin(result.coin)
    },
  })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && engine.status === 'playing') {
        engine.pause()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [engine])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-accent-gold)]">⚡ 疾风打字</h1>

      {!isStarted && engine.status === 'idle' && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-secondary)] mb-4">60秒内输入尽可能多的单词</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">历史最高: {bestWpm} WPM</p>
          <Button size="lg" onClick={() => { setIsStarted(true); engine.start() }}>🚀 开始挑战</Button>
        </div>
      )}

      {(engine.status === 'playing' || engine.status === 'paused') && (
        <div>
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-4xl font-bold text-red-400">⏱️ {engine.remainingTime}s</div>
            <div className="text-2xl font-bold text-[var(--color-accent-blue)]">⚡ {engine.wpm} WPM</div>
            <div className="text-xl text-[var(--color-accent-green)]">🔥 {engine.combo}</div>
          </div>

          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6">
            <div className="mono text-2xl text-center leading-relaxed">
              {content.split('').map((char, i) => {
                let color = 'text-gray-500'
                if (i < engine.currentIndex) {
                  const typed = engine.typedChars[i]
                  color = typed?.correct ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-red)]'
                } else if (i === engine.currentIndex) {
                  color = 'text-white bg-[var(--color-accent-gold)]/20 border-b-2 border-[var(--color-accent-gold)]'
                }
                return <span key={i} className={`${color} transition-colors`}>{char}</span>
              })}
            </div>
          </div>

          <VirtualKeyboard targetKey={engine.currentChar} />

          <div className="flex justify-center mt-4 gap-4">
            {engine.status === 'playing' ? (
              <Button variant="ghost" onClick={() => engine.pause()}>⏸️ 暂停</Button>
            ) : (
              <Button onClick={() => engine.resume()}>▶️ 继续</Button>
            )}
          </div>
        </div>
      )}

      {engine.status === 'finished' && (
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-[var(--color-accent-gold)] mb-4">🎉 时间到！</h2>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
              <div className="text-3xl font-bold text-[var(--color-accent-blue)]">{engine.wpm}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">WPM</div>
            </div>
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
              <div className="text-3xl font-bold text-[var(--color-accent-green)]">{engine.accuracy}%</div>
              <div className="text-sm text-[var(--color-text-secondary)]">准确率</div>
            </div>
          </div>
          {engine.wpm > bestWpm && (
            <p className="text-[var(--color-accent-gold)] font-bold mb-4">🏆 新纪录！</p>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={() => { engine.reset(); setIsStarted(false) }}>🔄 再来一局</Button>
            <Button variant="secondary" onClick={() => navigate('/')}>🏠 返回</Button>
          </div>
        </div>
      )}
    </div>
  )
}
