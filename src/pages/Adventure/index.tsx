import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../stores/gameStore'
import { useUserStore } from '../../stores/userStore'
import { CHAPTERS } from '../../data/levelData'
import StarRating from '../../components/StarRating'

export default function Adventure() {
  const navigate = useNavigate()
  const user = useUserStore(s => s.user)
  const getLevelStars = useGameStore(s => s.getLevelStars)
  const isLevelCompleted = useGameStore(s => s.isLevelCompleted)

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-[var(--color-accent-gold)]">🌍 世界冒险地图</h1>

      <div className="space-y-8">
        {CHAPTERS.map((chapter, ci) => (
          <div key={chapter.id} className="bg-[var(--color-bg-secondary)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{chapter.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{chapter.title}</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">{chapter.subtitle}</p>
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
    </div>
  )
}
