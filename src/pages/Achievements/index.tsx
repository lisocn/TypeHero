import { useState } from 'react'
import { useAchievementStore } from '../../stores/achievementStore'
import Modal from '../../components/Modal'

const CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'speed', label: '速度' },
  { id: 'accuracy', label: '准确率' },
  { id: 'persistence', label: '坚持' },
  { id: 'textbook', label: '教材' },
  { id: 'hidden', label: '隐藏' },
]

export default function Achievements() {
  const [category, setCategory] = useState('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const achievements = useAchievementStore(s => s.achievements)
  const userAchievements = useAchievementStore(s => s.userAchievements)
  const isUnlocked = useAchievementStore(s => s.isUnlocked)

  const filtered = category === 'all' ? achievements : achievements.filter(a => a.category === category)
  const selected = achievements.find(a => a.id === selectedId)

  const tierColors = {
    bronze: 'border-orange-400',
    silver: 'border-gray-300',
    gold: 'border-yellow-400',
    legendary: 'border-purple-500',
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-accent-gold)]">🏆 奖章殿堂</h1>

      <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 mb-6 text-center">
        <span className="text-[var(--color-text-secondary)]">已获得 </span>
        <span className="text-xl font-bold text-[var(--color-accent-gold)]">{userAchievements.length}</span>
        <span className="text-[var(--color-text-secondary)]"> / {achievements.length}</span>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
              category === c.id
                ? 'bg-[var(--color-accent-blue)] text-white'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {filtered.map(ach => {
          const unlocked = isUnlocked(ach.id)
          const isHiddenLocked = ach.hidden && !unlocked

          return (
            <button
              key={ach.id}
              onClick={() => setSelectedId(ach.id)}
              className={`bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center border-2 transition-all cursor-pointer hover:scale-105 ${
                unlocked ? tierColors[ach.tier] : 'border-transparent opacity-60'
              }`}
            >
              <div className="text-3xl mb-2">{isHiddenLocked ? '❓' : ach.icon}</div>
              <div className="text-sm font-bold">{isHiddenLocked ? '???' : ach.name}</div>
              {!unlocked && !isHiddenLocked && (
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">{ach.description}</div>
              )}
            </button>
          )
        })}
      </div>

      <Modal open={!!selected} onClose={() => setSelectedId(null)} title={selected?.name ?? ''}>
        {selected && (
          <div className="text-center">
            <div className="text-5xl mb-3">{isUnlocked(selected.id) ? selected.icon : '❓'}</div>
            <p className="text-[var(--color-text-secondary)] mb-2">{selected.description}</p>
            <div className="text-sm text-[var(--color-text-secondary)]">
              奖励: {selected.reward.coin} 金币 + {selected.reward.exp} 经验
              {selected.reward.title && ` + "${selected.reward.title}"称号`}
            </div>
            {isUnlocked(selected.id) && (
              <p className="text-[var(--color-accent-green)] mt-2">✅ 已解锁</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
