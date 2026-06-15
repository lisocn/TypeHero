import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../stores/gameStore'
import { useUserStore } from '../../stores/userStore'
import { TEXTBOOKS } from '../../data/textbooks'
import type { Textbook } from '../../data/types'
import StarRating from '../../components/StarRating'
import { api } from '../../utils/api'

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

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    api.getSelectedTextbooks()
      .then(({ textbookIds }) => {
        setSelectedIds(textbookIds.length > 0 ? textbookIds : loadLocal())
      })
      .catch(() => setSelectedIds(loadLocal()))
  }, [user, navigate])

  const selectedTextbooks: Textbook[] = selectedIds.length > 0
    ? TEXTBOOKS.filter(t => selectedIds.includes(t.id))
    : []

  if (!user) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-accent-gold)]">🌍 世界冒险地图</h1>
        <button
          onClick={() => navigate('/textbook-select')}
          className="text-sm text-[var(--color-accent-blue)] hover:text-blue-400 cursor-pointer"
        >
          📚 更换教材
        </button>
      </div>

      {selectedTextbooks.length === 0 ? (
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
          {selectedTextbooks.map(textbook => (
            <div key={textbook.id}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{textbook.subject === 'english' ? '🔤' : '📖'}</span>
                <h2 className="text-xl font-bold">{textbook.title}</h2>
                <span className="text-sm text-[var(--color-text-secondary)]">{textbook.subtitle}</span>
              </div>

              {textbook.chapters.map(chapter => (
                <div key={chapter.id} className="bg-[var(--color-bg-secondary)] rounded-xl p-5 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{chapter.icon}</span>
                    <div>
                      <h3 className="font-bold">{chapter.title}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)]">{chapter.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {chapter.levels.map((level, li) => {
                      const stars = getLevelStars(chapter.id, level.id)
                      const completed = isLevelCompleted(chapter.id, level.id)
                      const unlocked = li === 0 || isLevelCompleted(chapter.id, chapter.levels[li - 1].id)

                      return (
                        <button
                          key={level.id}
                          onClick={() => unlocked && navigate(`/adventure/${chapter.id}/${level.id}`)}
                          disabled={!unlocked}
                          className={`relative w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            !unlocked
                              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                              : completed
                                ? 'bg-slate-800 hover:bg-slate-700 border-2 border-[var(--color-accent-gold)]'
                                : 'bg-slate-800 hover:bg-slate-700 border-2 border-[var(--color-accent-blue)] animate-pulse'
                          }`}
                        >
                          {!unlocked ? (
                            <span className="text-2xl">🔒</span>
                          ) : (
                            <>
                              <span className="text-xs text-[var(--color-text-secondary)]">{level.type === 'boss' ? '👑' : `L${li + 1}`}</span>
                              <span className="text-sm font-semibold truncate max-w-[80px]">{level.title}</span>
                              {stars > 0 && <StarRating stars={stars} size="sm" />}
                            </>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
