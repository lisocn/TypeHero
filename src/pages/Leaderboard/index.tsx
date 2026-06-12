import { useState } from 'react'
import { AVATARS } from '../../utils/levelConfig'

const MOCK_ENTRIES = [
  { rank: 1, nickname: '键盘侠小明', avatar: 'ninja', value: 68, level: 15 },
  { rank: 2, nickname: '打字女王', avatar: 'princess', value: 55, level: 12 },
  { rank: 3, nickname: '极速少年', avatar: 'knight', value: 48, level: 10 },
  { rank: 4, nickname: '闪电手', avatar: 'astronaut', value: 42, level: 8 },
  { rank: 5, nickname: '字母猎手', avatar: 'ninja', value: 38, level: 7 },
  { rank: 6, nickname: '诗词达人', avatar: 'princess', value: 35, level: 6 },
  { rank: 7, nickname: '速度新星', avatar: 'knight', value: 30, level: 5 },
  { rank: 8, nickname: '键盘新手', avatar: 'astronaut', value: 25, level: 4 },
  { rank: 9, typingHero: true, nickname: '我', avatar: 'astronaut', value: 22, level: 3 },
  { rank: 10, nickname: '小打字员', avatar: 'ninja', value: 18, level: 2 },
]

const TABS = [
  { id: 'wpm', label: '⚡ 速度之王', key: 'value' as const },
  { id: 'chars', label: '⌨️ 打字量榜', value: [12000, 9800, 8500, 7200, 6000, 5000, 4000, 3000, 2500, 2000] },
  { id: 'streak', label: '🔥 全勤达人', value: [21, 18, 15, 12, 10, 8, 7, 5, 4, 3] },
  { id: 'medals', label: '🏆 奖章收藏', value: [12, 10, 8, 7, 6, 5, 4, 3, 2, 1] },
  { id: 'level', label: '⭐ 等级排行', key: 'level' as const },
]

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('wpm')
  const currentTab = TABS.find(t => t.id === activeTab)!

  const entries = MOCK_ENTRIES.map((e, i) => {
    let tabValue: number
    if ('value' in currentTab && Array.isArray(currentTab.value)) {
      tabValue = (currentTab.value as number[])[i] ?? 0
    } else if ('key' in currentTab) {
      tabValue = (e as unknown as Record<string, number>)[currentTab.key as string] ?? 0
    } else {
      tabValue = 0
    }
    return { ...e, displayValue: tabValue }
  }).sort((a, b) => b.displayValue - a.displayValue)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-accent-gold)]">🏅 排行榜</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-[var(--color-accent-blue)] text-white'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {entries.map((entry, i) => {
          const avatar = AVATARS.find(a => a.id === entry.avatar)
          const isMe = entry.typingHero
          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                isMe ? 'bg-[var(--color-accent-blue)]/20 border border-[var(--color-accent-blue)]' : 'bg-[var(--color-bg-secondary)]'
              }`}
            >
              <div className={`w-8 text-center font-bold text-lg ${
                entry.rank === 1 ? 'text-yellow-400' : entry.rank === 2 ? 'text-gray-300' : entry.rank === 3 ? 'text-orange-400' : 'text-[var(--color-text-secondary)]'
              }`}>
                {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
              </div>
              <div className="text-2xl">{avatar?.emoji ?? '👤'}</div>
              <div className="flex-1">
                <span className="font-semibold">{entry.nickname}</span>
                <span className="text-xs text-[var(--color-text-secondary)] ml-2">Lv.{entry.level}</span>
              </div>
              <div className="text-[var(--color-accent-gold)] font-bold">{entry.displayValue}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
