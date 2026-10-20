import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../../stores/gameStore'
import { useUserStore } from '../../stores/userStore'
import { useTypingEngine } from '../../hooks/useTypingEngine'
import { useSound } from '../../hooks/useSound'
import { TEXTBOOKS } from '../../data/textbooks'
import VirtualKeyboard from '../../components/VirtualKeyboard'
import ProgressBar from '../../components/ProgressBar'
import Button from '../../components/Button'
import Toast from '../../components/Toast'
import { useEnterAction } from '../../hooks/useEnterAction'
import KeyboardHint from '../../components/KeyboardHint'
import { useCountdownVoice } from '../../hooks/useCountdownVoice'
import CountdownNumber from '../../components/CountdownNumber'
import WordLearningHint from '../../components/WordLearningHint'

type GamePhase = 'ready' | 'countdown' | 'playing' | 'paused' | 'result'

export default function Game() {
  const { chapterId, levelId } = useParams<{ chapterId: string; levelId: string }>()
  const navigate = useNavigate()
  const updateLevelProgress = useGameStore(s => s.updateLevelProgress)
  const addExp = useUserStore(s => s.addExp)
  const addCoin = useUserStore(s => s.addCoin)
  const updateStats = useUserStore(s => s.updateStats)
  const { play, playCombo, resetCombo } = useSound()
  const { playCountdownVoice, stopCountdownVoice } = useCountdownVoice()

  const chapter = useMemo(() => TEXTBOOKS.flatMap(tb => tb.chapters).find(c => c.id === chapterId), [chapterId])
  const level = useMemo(() => chapter?.levels.find(l => l.id === levelId), [chapter, levelId])

  const content = useMemo(() => {
    if (!level) return []
    return level.content.items.map(item => item.input)
  }, [level])

  const [phase, setPhase] = useState<GamePhase>('ready')
  const [countdown, setCountdown] = useState(3)
  const [toast, setToast] = useState<string | null>(null)
  const prevComboRef = useRef(0)
  const prevIndexRef = useRef(0)
  const textViewportRef = useRef<HTMLDivElement>(null)

  const engine = useTypingEngine({
    mode: (level?.content.mode as 'char' | 'word' | 'sentence' | 'paragraph') || 'char',
    content,
    language: level?.content.language,
    timeLimit: level?.timeLimit ?? 0,
    difficulty: 'medium',
    onComplete: (result) => {
      stopCountdownVoice()
      play('victory')
      playCountdownVoice('victory')
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
    if (phase !== 'ready') return
    const timer = setTimeout(() => setPhase('countdown'), 1400)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'ready') playCountdownVoice('ready')
  }, [phase, playCountdownVoice])

  // Keep the timer separate from audio so unrelated renders cannot repeat a cue.
  useEffect(() => {
    if (phase !== 'countdown') return
    if (countdown <= 0) {
      const timer = setTimeout(() => { play('start'); playCountdownVoice('start'); resetCombo(); setPhase('playing'); engine.start() }, 0)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [phase, countdown, engine, play, resetCombo, playCountdownVoice])

  useEffect(() => {
    if (phase !== 'countdown' || countdown < 1 || countdown > 3) return
    play(`countdown${countdown}`)
    playCountdownVoice(countdown as 1 | 2 | 3)
  }, [phase, countdown, play, playCountdownVoice])

  useEffect(() => {
    if (engine.status === 'paused') stopCountdownVoice()
  }, [engine.status, stopCountdownVoice])

  // Keystroke sound: detect correct/wrong by tracking combo & index changes
  useEffect(() => {
    if (phase !== 'playing') return
    if (engine.currentIndex === prevIndexRef.current) return
    prevIndexRef.current = engine.currentIndex

    if (engine.combo > prevComboRef.current) {
      play('click')
      playCombo(engine.combo)
    } else if (engine.combo === 0 && prevComboRef.current > 0) {
      play('buzz')
    }
    prevComboRef.current = engine.combo
  }, [phase, engine.currentIndex, engine.combo, play, playCombo])

  // Combo toast
  useEffect(() => {
    const message = engine.combo >= 50 ? '🔥 Legendary!' : engine.combo >= 30 ? '⚡ Amazing!' : engine.combo >= 10 ? '✨ Nice!' : null
    if (!message) return
    const timer = setTimeout(() => setToast(message), 0)
    return () => clearTimeout(timer)
  }, [engine.combo])

  useEffect(() => {
    const viewport = textViewportRef.current
    const active = viewport?.querySelector<HTMLElement>('[data-current="true"]')
    if (!viewport || !active) return
    if (active.offsetTop < viewport.scrollTop || active.offsetTop + active.offsetHeight > viewport.scrollTop + viewport.clientHeight) {
      viewport.scrollTo({ top: Math.max(0, active.offsetTop - viewport.clientHeight / 2), behavior: 'smooth' })
    }
  }, [engine.currentIndex])

  // Escape pauses a running round and returns to the map from its result.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat || e.isComposing || e.keyCode === 229 || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return
      if (e.key === 'Escape' && phase === 'result') {
        e.preventDefault()
        navigate('/adventure')
        return
      }
      if (e.key === 'Escape' && phase === 'playing') {
        stopCountdownVoice()
        play('pause')
        engine.pause()
        setPhase('paused')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, engine, play, navigate, stopCountdownVoice])

  const visiblePhase = phase === 'playing' && engine.status === 'paused' ? 'paused' : phase
  const startRound = () => { play('start'); playCountdownVoice('start'); resetCombo(); setPhase('playing'); engine.start() }
  const pauseRound = () => { stopCountdownVoice(); play('pause'); engine.pause(); setPhase('paused') }
  const resumeRound = () => { engine.resume(); setPhase('playing') }
  const resetEngine = engine.reset
  const restartRound = useCallback(() => { stopCountdownVoice(); resetEngine(); setCountdown(3); prevIndexRef.current = 0; prevComboRef.current = 0; setPhase('ready') }, [resetEngine, stopCountdownVoice])
  useEffect(() => {
    if (visiblePhase !== 'result' && visiblePhase !== 'paused') return
    const replay = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'r' || event.defaultPrevented || event.repeat || event.isComposing || event.keyCode === 229 || event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return
      event.preventDefault()
      restartRound()
    }
    window.addEventListener('keydown', replay)
    return () => window.removeEventListener('keydown', replay)
  }, [visiblePhase, restartRound])
  const textbook = TEXTBOOKS.find(tb => tb.chapters.some(ch => ch.id === chapterId))
  const orderedLevels = textbook?.chapters.flatMap(ch => ch.levels.map(lv => ({ chapterId: ch.id, levelId: lv.id, title: lv.title }))) ?? []
  const currentLevelIndex = orderedLevels.findIndex(lv => lv.chapterId === chapterId && lv.levelId === levelId)
  const nextLevel = currentLevelIndex >= 0 ? orderedLevels[currentLevelIndex + 1] : undefined
  const advanceRound = () => navigate(nextLevel ? `/adventure/${nextLevel.chapterId}/${nextLevel.levelId}` : '/adventure')
  useEnterAction(() => {
    if (visiblePhase === 'ready' || visiblePhase === 'countdown') startRound()
    else if (visiblePhase === 'playing') pauseRound()
    else if (visiblePhase === 'paused') resumeRound()
    else advanceRound()
  }, !!chapter && !!level)

  if (!chapter || !level) return <div className="text-center py-20 text-white">关卡不存在<br /><Button onClick={() => navigate('/adventure')}>返回地图</Button></div>
  const fullContent = engine.fullContent

  return (
    <div className="desktop-page game-page">
      {toast && <Toast message={toast} type="success" duration={1500} onClose={() => setToast(null)} />}

      <div className="game-heading">
        <div>
          <button className="game-back" onClick={() => navigate('/adventure')}>← 返回冒险地图</button>
          <h1>{chapter.title} · {level.title}</h1>
          <p className="page-description">专注当下的每一次敲击，准确比速度更重要。</p>
        </div>
        <div className="game-stats">
          <div><span>连续命中</span><strong className="text-[var(--color-accent-green)]">{engine.combo}</strong></div>
          <div><span>速度 / WPM</span><strong className="text-[var(--color-accent-blue)]">{engine.wpm}</strong></div>
          <div><span>准确率</span><strong className="text-[var(--color-accent-gold)]">{engine.accuracy}%</strong></div>
          {level.timeLimit > 0 && <div><span>剩余时间</span><strong className="text-red-400">{engine.remainingTime}s</strong></div>}
        </div>
      </div>

      <div className="game-progress"><span>练习进度</span><ProgressBar value={engine.progress} /><span>{Math.round(engine.progress)}%</span></div>

      {(visiblePhase === 'ready' || visiblePhase === 'countdown') && (
        <div className="game-state flex flex-col items-center justify-center gap-8">
          <h2 className="text-2xl font-bold">准备好，手指放在键盘上</h2>
          {visiblePhase === 'ready' ? <div className="game-ready-label" role="status">准备开始</div> : <CountdownNumber value={countdown} />}
          <Button onClick={startRound}>立即开始</Button><KeyboardHint>立即开始练习</KeyboardHint>
        </div>
      )}

      {visiblePhase === 'playing' && (
        <div className="game-workspace">
          <div className="game-practice">
          <div className="game-text-panel">
            <div className="game-panel-heading"><span>⌨ 跟随光标输入 · ␣ 表示空格键</span><span>{engine.currentIndex} / {fullContent.length} 字符</span></div>
            {textbook?.subject === 'english' && level.content.mode !== 'char' && <WordLearningHint text={fullContent} currentIndex={engine.currentIndex} items={level.content.mode === 'word' ? content : undefined} />}
            <div ref={textViewportRef} className="game-text mono">
              {fullContent.split('').map((char, i) => {
                let color = 'text-gray-500'
                if (i < engine.currentIndex) {
                  const typed = engine.typedChars[i]
                  color = typed?.correct ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-red)] underline'
                } else if (i === engine.currentIndex) {
                  color = 'text-white bg-[var(--color-accent-gold)]/20 border-b-2 border-[var(--color-accent-gold)]'
                }
                return (
                  <span key={i} data-current={i === engine.currentIndex} aria-label={char === ' ' && i === engine.currentIndex ? '空格，请按空格键' : undefined} className={`${color} transition-colors duration-100`}>
                    {char === ' ' && i === engine.currentIndex ? '␣' : char}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="game-keyboard-panel"><VirtualKeyboard targetKey={engine.currentChar} />
          <p className="game-keyboard-note">让手指回到基准键位，保持轻松的练习节奏</p></div>
          <div className="game-mobile-controls"><Button variant="secondary" onClick={pauseRound}>⏸️ 暂停练习</Button><KeyboardHint>暂停 / 继续</KeyboardHint></div>
          </div>
          <aside className="game-guide">
            <p className="page-eyebrow">下一个字符</p>
            <div className="game-next-char">{engine.currentChar === ' ' ? '␣' : engine.currentChar}</div>
            <h2>练习小提示</h2>
            <p>金色按键指引下一个位置。先看清字符，再轻轻敲下按键。</p>
            <div className="game-targets"><span>本关目标</span><p>准确率 ≥ {level.targetAccuracy.bronze}%</p><p>速度 ≥ {level.targetWPM.bronze} WPM</p></div>
            <p><kbd>Esc</kbd> 暂停练习</p>
            <KeyboardHint>暂停 / 继续</KeyboardHint>
            <Button variant="ghost" onClick={pauseRound}>
              ⏸️ 暂停
            </Button>
          </aside>
        </div>
      )}

      {visiblePhase === 'paused' && (
        <div className="game-state flex flex-col items-center justify-center gap-8">
          <h2 className="text-3xl font-bold text-[var(--color-accent-gold)]">⏸️ 暂停</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={resumeRound}>▶️ 继续</Button>
            <Button variant="secondary" aria-keyshortcuts="r" onClick={restartRound}>🔄 重新开始 <kbd className="ml-2 rounded border border-slate-500 px-1.5 py-0.5 text-xs">R</kbd></Button>
            <Button variant="ghost" onClick={() => navigate('/adventure')}>🏠 返回地图</Button>
          </div>
          <KeyboardHint>继续练习 · R 重新开始</KeyboardHint>
        </div>
      )}

      {visiblePhase === 'result' && (
        <div className="game-state flex flex-col items-center justify-center py-12 gap-6">
          <h2 className="text-3xl font-bold text-[var(--color-accent-gold)]">🎉 关卡完成！</h2>
          <div className="flex gap-2 text-4xl">
            {[1, 2, 3].map(i => (
              <span key={i} className={i <= engine.maxCombo ? 'text-yellow-400' : 'text-gray-600'}>★</span>
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
          {nextLevel && <p className="text-slate-400">下一关：{nextLevel.title}</p>}
          <div className="flex flex-wrap justify-center gap-4">
            <Button aria-keyshortcuts={nextLevel ? 'Enter' : 'Enter Escape'} onClick={advanceRound}>
              {nextLevel ? '进入下一关 →' : '返回地图'} <kbd className="ml-2 rounded border border-white/30 px-1.5 py-0.5 text-xs">Enter ↵</kbd>
            </Button>
            <Button variant="secondary" aria-keyshortcuts="r" onClick={restartRound}>🔄 重玩 <kbd className="ml-2 rounded border border-slate-500 px-1.5 py-0.5 text-xs">R</kbd></Button>
            {nextLevel && <Button variant="secondary" aria-keyshortcuts="Escape" onClick={() => navigate('/adventure')}>🗺️ 返回地图 <kbd className="ml-2 rounded border border-slate-500 px-1.5 py-0.5 text-xs">Esc</kbd></Button>}
          </div>
          <KeyboardHint>{nextLevel ? '进入下一关' : '返回地图'} · R 重玩 · Esc 返回地图</KeyboardHint>
        </div>
      )}
    </div>
  )
}
