import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../stores/gameStore'
import { useUserStore } from '../../stores/userStore'
import { TEXTBOOKS } from '../../data/textbooks'
import type { Textbook } from '../../data/types'
import StarRating from '../../components/StarRating'
import { api } from '../../utils/api'
import { useEnterAction } from '../../hooks/useEnterAction'
import KeyboardHint from '../../components/KeyboardHint'
import Button from '../../components/Button'

const LS_KEY = 'typehero_selected_textbooks'
function loadLocal(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}

export default function Adventure() {
  const navigate = useNavigate()
  const user = useUserStore(s => s.user)
  const getLevelStars = useGameStore(s => s.getLevelStars)
  const isLevelCompleted = useGameStore(s => s.isLevelCompleted)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    api.getSelectedTextbooks()
      .then(({ textbookIds }) => {
        setSelectedIds(textbookIds.length > 0 ? textbookIds : loadLocal())
      })
      .catch(() => setSelectedIds(loadLocal()))
      .finally(() => setLoading(false))
  }, [user, navigate])

  const selectedTextbooks: Textbook[] = selectedIds.length > 0
    ? TEXTBOOKS.filter(t => selectedIds.includes(t.id))
    : []
  const availableLevels = selectedTextbooks.flatMap(tb => tb.chapters.flatMap(ch => ch.levels
    .filter((_, i) => i === 0 || isLevelCompleted(ch.id, ch.levels[i - 1].id))
    .map(level => ({ chapterId: ch.id, level }))))
  const next = availableLevels.find(item => !isLevelCompleted(item.chapterId, item.level.id)) ?? availableLevels[0]
  const continueAdventure = () => navigate(next ? `/adventure/${next.chapterId}/${next.level.id}` : '/textbook-select')
  useEnterAction(continueAdventure, !!user && !loading)

  if (!user) return null

  return (
    <div className="desktop-page adventure-page">
      <div className="page-heading">
        <div><p className="page-eyebrow">你的学习旅程</p><h1>🌍 世界冒险地图</h1>
        <p className="page-description">从第一关出发，完成练习，逐步解锁新的挑战。</p></div>
        <div className="text-right"><Button onClick={continueAdventure} disabled={loading}>{next ? `▶ ${next.level.title}` : '📚 选择教材'}</Button><KeyboardHint>{next ? '开始下一次练习' : '选择教材'}</KeyboardHint>
        <button
          onClick={() => navigate('/textbook-select')}
          className="text-sm text-[var(--color-accent-blue)] hover:text-blue-400 cursor-pointer"
        >
          📚 更换教材
        </button>
        </div>
      </div>

      {loading ? <p className="py-12 text-center text-slate-400">加载教材中...</p> : selectedTextbooks.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[var(--color-text-secondary)] mb-4">还没有选择教材</p>
          <button
            onClick={() => navigate('/textbook-select')}
            className="text-[var(--color-accent-blue)] hover:underline cursor-pointer"
          >
            去选择教材 →
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <nav className="adventure-textbooks" aria-label="已选教材">
            {selectedTextbooks.map(tb => <a key={tb.id} href={`#textbook-${tb.id}`}>{tb.subject === 'english' ? '🔤 英语' : '📖 语文'} · {tb.title} · {tb.subtitle}</a>)}
          </nav>
          {selectedTextbooks.map(textbook => (
            <section key={textbook.id} id={`textbook-${textbook.id}`} className="adventure-book">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xl">{textbook.subject === 'english' ? '🔤' : '📖'}</span>
                <h2 className="text-xl font-bold">{textbook.subject === 'english' ? '英语' : '语文'} · {textbook.title}</h2>
                <span className="textbook-edition !mt-0" data-subject={textbook.subject}>{textbook.subtitle}</span>
                <span className="adventure-completion">已完成 {textbook.chapters.flatMap(ch => ch.levels.filter(l => isLevelCompleted(ch.id, l.id))).length} / {textbook.chapters.reduce((sum, ch) => sum + ch.levels.length, 0)} 关</span>
              </div>
              <div className="adventure-chapters">
              {textbook.chapters.map(chapter => (
                <div key={chapter.id} className="adventure-chapter bg-[var(--color-bg-secondary)] rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl">{chapter.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{chapter.title}</h3>
                      <p className="text-sm mt-1 text-[var(--color-text-secondary)]">{chapter.subtitle}</p>
                    </div>
                  </div>

                  <div className="adventure-levels">
                    {chapter.levels.map((level, li) => {
                      const stars = getLevelStars(chapter.id, level.id)
                      const completed = isLevelCompleted(chapter.id, level.id)
                      const unlocked = li === 0 || isLevelCompleted(chapter.id, chapter.levels[li - 1].id)

                      return (
                        <button
                          key={level.id}
                          aria-label={`${chapter.title} · ${level.title}${!unlocked ? '，未解锁' : completed ? '，已完成' : ''}`}
                          onClick={() => unlocked && navigate(`/adventure/${chapter.id}/${level.id}`)}
                          disabled={!unlocked}
                          className={`adventure-level relative rounded-xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            !unlocked
                              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                              : completed
                                ? 'bg-slate-800 hover:bg-slate-700 border-2 border-[var(--color-accent-gold)]'
                                : 'bg-slate-800 hover:bg-slate-700 border-2 border-[var(--color-accent-blue)] animate-pulse'
                          }`}
                        >
                            <>
                              <span className="text-sm text-[var(--color-text-secondary)]">{!unlocked ? '🔒' : level.type === 'boss' ? '👑' : `L${li + 1}`}</span>
                              <span className="text-sm font-semibold">{level.title}</span>
                              {stars > 0 && <StarRating stars={stars} size="sm" />}
                            </>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
