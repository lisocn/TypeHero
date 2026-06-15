import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../../stores/gameStore'
import { useUserStore } from '../../stores/userStore'
import { useTypingEngine } from '../../hooks/useTypingEngine'
import { TEXTBOOKS } from '../../data/textbooks'
import VirtualKeyboard from '../../components/VirtualKeyboard'
import ProgressBar from '../../components/ProgressBar'
import Button from '../../components/Button'
import Toast from '../../components/Toast'

type GamePhase = 'countdown' | 'playing' | 'paused' | 'result'

export default function Game() {
  const { chapterId, levelId } = useParams<{ chapterId: string; levelId: string }>()
  const navigate = useNavigate()
  const updateLevelProgress = useGameStore(s => s.updateLevelProgress)
  const addExp = useUserStore(s => s.addExp)
  const addCoin = useUserStore(s => s.addCoin)
  const updateStats = useUserStore(s => s.updateStats)

  const chapter = useMemo(() => TEXTBOOKS.flatMap(tb => tb.chapters).find(c => c.id === chapterId), [chapterId])
  const level = useMemo(() => chapter?.levels.find(l => l.id === levelId), [chapter, levelId])

  const content = useMemo(() => {
    if (!level) return []
    return level.content.items.map(item => item.input)
  }, [level])

  const [phase, setPhase] = useState<GamePhase>('countdown')
  const [countdown, setCountdown] = useState(3)
  const [toast, setToast] = useState<string | null>(null)

  const engine = useTypingEngine({
    mode: (level?.content.mode as 'char' | 'word' | 'sentence' | 'paragraph') || 'char',
    content,
    timeLimit: level?.timeLimit ?? 0,
    difficulty: 'medium',
    onComplete: (result) => {
      updateLevelProgress(chapterId!, levelId!, {
        bestStars: result.stars,
        bestWpm: result.wpm,
        bestAccuracy: result.accuracy,
        completed: true,
      })
      addExp(result.exp)
      addCoin(result.coin)
      updateStats(result.correctChars, result.wpm, Math.ceil(result.duration / 60))
      setPhase('result')
    },
  })

  useEffect(() => {
    if (phase !== 'countdown') return
    if (countdown <= 0) {
      setPhase('playing')
      engine.start()
      return
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [phase, countdown, engine])

  useEffect(() => {
    if (engine.combo >= 50) setToast('🔥 Legendary!')
    else if (engine.combo >= 30) setToast('⚡ Amazing!')
    else if (engine.combo >= 10) setToast('✨ Nice!')
  }, [engine.combo])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && phase === 'playing') {
        engine.pause()
        setPhase('paused')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, engine])

  if (!chapter || !level) return <div className="text-center py-20 text-white">关卡不存在</div>

  const fullContent = content.join('')

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {toast && <Toast message={toast} type="success" duration={1500} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold">{chapter.title} - {level.title}</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">{level.type}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-[var(--color-accent-green)]">🔥 {engine.combo}</span>
          <span className="text-[var(--color-accent-blue)]">⚡ {engine.wpm} WPM</span>
          <span className="text-[var(--color-accent-gold)]">🎯 {engine.accuracy}%</span>
          {level.timeLimit > 0 && <span className="text-red-400">⏱️ {engine.remainingTime}s</span>}
        </div>
      </div>

      <ProgressBar value={engine.progress} />

      {phase === 'countdown' && (
        <div className="flex items-center justify-center h-64">
          <span className="text-8xl font-bold text-[var(--color-accent-gold)] animate-bounce">{countdown}</span>
        </div>
      )}

      {phase === 'playing' && (
        <div className="mt-6">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6">
            <div className="mono text-2xl leading-relaxed tracking-wider">
              {fullContent.split('').map((char, i) => {
                let color = 'text-gray-500'
                if (i < engine.currentIndex) {
                  const typed = engine.typedChars[i]
                  color = typed?.correct ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-red)] underline'
                } else if (i === engine.currentIndex) {
                  color = 'text-white bg-[var(--color-accent-gold)]/20 border-b-2 border-[var(--color-accent-gold)]'
                }
                return (
                  <span key={i} className={`${color} transition-colors duration-100`}>
                    {char}
                  </span>
                )
              })}
            </div>
          </div>

          <VirtualKeyboard targetKey={engine.currentChar} />

          <div className="flex justify-center mt-4">
            <Button variant="ghost" onClick={() => { engine.pause(); setPhase('paused') }}>
              ⏸️ 暂停
            </Button>
          </div>
        </div>
      )}

      {phase === 'paused' && (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <h2 className="text-3xl font-bold text-[var(--color-accent-gold)]">⏸️ 暂停</h2>
          <div className="flex gap-4">
            <Button onClick={() => { engine.resume(); setPhase('playing') }}>▶️ 继续</Button>
            <Button variant="secondary" onClick={() => { engine.reset(); setCountdown(3); setPhase('countdown') }}>🔄 重新开始</Button>
            <Button variant="ghost" onClick={() => navigate('/adventure')}>🏠 返回地图</Button>
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className="flex flex-col items-center justify-center py-12 gap-6">
          <h2 className="text-3xl font-bold text-[var(--color-accent-gold)]">🎉 关卡完成！</h2>
          <div className="flex gap-2 text-4xl">
            {[1, 2, 3].map(i => (
              <span key={i} className={i <= (engine as any)._lastResult?.stars ? 'text-yellow-400' : 'text-gray-600'}>★</span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--color-accent-blue)]">{engine.wpm}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">WPM</div>
            </div>
            <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
              <div className="text-2xl font-bold text-[var(--color-accent-green)]">{engine.accuracy}%</div>
              <div className="text-xs text-[var(--color-text-secondary)]">准确率</div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => { engine.reset(); setCountdown(3); setPhase('countdown') }}>🔄 重玩</Button>
            <Button variant="secondary" onClick={() => navigate('/adventure')}>🗺️ 返回地图</Button>
          </div>
        </div>
      )}
    </div>
  )
}
