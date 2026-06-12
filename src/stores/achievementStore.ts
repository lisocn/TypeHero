import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Achievement {
  id: string
  name: string
  description: string
  category: 'speed' | 'accuracy' | 'persistence' | 'textbook' | 'hidden'
  tier: 'bronze' | 'silver' | 'gold' | 'legendary'
  icon: string
  reward: { exp: number; coin: number; title?: string }
  hidden: boolean
}

export interface UserAchievement {
  achievementId: string
  unlockedAt: string
  notified: boolean
}

interface AchievementState {
  achievements: Achievement[]
  userAchievements: UserAchievement[]
  checkAndUnlock: (userStats: Record<string, number>) => UserAchievement[]
  getUnlockedCount: () => number
  getTotalCount: () => number
  isUnlocked: (id: string) => boolean
  markNotified: (id: string) => void
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'spd-bronze', name: '手速新星', description: '最高WPM达到20', category: 'speed', tier: 'bronze', icon: '🏅', reward: { exp: 20, coin: 50 }, hidden: false },
  { id: 'spd-silver', name: '手速达人', description: '最高WPM达到35', category: 'speed', tier: 'silver', icon: '🏅', reward: { exp: 50, coin: 100 }, hidden: false },
  { id: 'spd-gold', name: '手速之王', description: '最高WPM达到50', category: 'speed', tier: 'gold', icon: '🏅', reward: { exp: 100, coin: 200 }, hidden: false },
  { id: 'spd-flash-bronze', name: '快手入门', description: '30秒内完成1关', category: 'speed', tier: 'bronze', icon: '⚡', reward: { exp: 15, coin: 30 }, hidden: false },
  { id: 'spd-flash-silver', name: '疾风快手', description: '20秒内完成1关', category: 'speed', tier: 'silver', icon: '⚡', reward: { exp: 40, coin: 80 }, hidden: false },
  { id: 'spd-flash-gold', name: '极速闪电', description: '15秒内完成1关', category: 'speed', tier: 'gold', icon: '⚡', reward: { exp: 80, coin: 150 }, hidden: false },
  { id: 'combo-bronze', name: '连击新手', description: '最大连击达到20', category: 'speed', tier: 'bronze', icon: '🔥', reward: { exp: 20, coin: 40 }, hidden: false },
  { id: 'combo-silver', name: '连击达人', description: '最大连击达到50', category: 'speed', tier: 'silver', icon: '🔥', reward: { exp: 50, coin: 100 }, hidden: false },
  { id: 'combo-gold', name: '连击大师', description: '最大连击达到100', category: 'speed', tier: 'gold', icon: '🔥', reward: { exp: 100, coin: 200 }, hidden: false },
  { id: 'acc-bronze', name: '稳健射手', description: '关卡准确率>=90%', category: 'accuracy', tier: 'bronze', icon: '🎯', reward: { exp: 20, coin: 40 }, hidden: false },
  { id: 'acc-silver', name: '精准射手', description: '关卡准确率>=95%', category: 'accuracy', tier: 'silver', icon: '🎯', reward: { exp: 40, coin: 80 }, hidden: false },
  { id: 'acc-gold', name: '完美射手', description: '关卡准确率>=99%', category: 'accuracy', tier: 'gold', icon: '🎯', reward: { exp: 100, coin: 200 }, hidden: false },
  { id: 'perfect-bronze', name: '初次完美', description: '1关零错误完成', category: 'accuracy', tier: 'bronze', icon: '💎', reward: { exp: 25, coin: 50 }, hidden: false },
  { id: 'perfect-silver', name: '完美主义', description: '5关零错误完成', category: 'accuracy', tier: 'silver', icon: '💎', reward: { exp: 80, coin: 150 }, hidden: false },
  { id: 'perfect-gold', name: '绝对完美', description: '20关零错误完成', category: 'accuracy', tier: 'gold', icon: '💎', reward: { exp: 150, coin: 300 }, hidden: false },
  { id: 'streak-bronze', name: '坚持三天', description: '连续打卡3天', category: 'persistence', tier: 'bronze', icon: '📅', reward: { exp: 15, coin: 30 }, hidden: false },
  { id: 'streak-silver', name: '每日之星', description: '连续打卡14天', category: 'persistence', tier: 'silver', icon: '📅', reward: { exp: 80, coin: 150 }, hidden: false },
  { id: 'streak-gold', name: '毅力英雄', description: '连续打卡30天', category: 'persistence', tier: 'gold', icon: '📅', reward: { exp: 200, coin: 500 }, hidden: false },
  { id: 'time-bronze', name: '初学者', description: '累计练习5小时', category: 'persistence', tier: 'bronze', icon: '⏰', reward: { exp: 25, coin: 50 }, hidden: false },
  { id: 'time-silver', name: '时间旅人', description: '累计练习20小时', category: 'persistence', tier: 'silver', icon: '⏰', reward: { exp: 80, coin: 150 }, hidden: false },
  { id: 'time-gold', name: '键盘大师', description: '累计练习50小时', category: 'persistence', tier: 'gold', icon: '⏰', reward: { exp: 200, coin: 400 }, hidden: false },
  { id: 'abc-guardian', name: '字母守护者', description: '完成26个字母关卡全金星', category: 'textbook', tier: 'silver', icon: '🔤', reward: { exp: 100, coin: 200 }, hidden: false },
  { id: 'word-hunter', name: '单词猎人', description: '正确输入500个课本单词', category: 'textbook', tier: 'silver', icon: '📖', reward: { exp: 80, coin: 150 }, hidden: false },
  { id: 'poem-master', name: '诗词达人', description: '默写通过10首古诗', category: 'textbook', tier: 'gold', icon: '📜', reward: { exp: 150, coin: 300 }, hidden: false },
  { id: 'all-clear', name: '全科通关', description: '英语+语文所有章节全金星', category: 'textbook', tier: 'legendary', icon: '👑', reward: { exp: 500, coin: 1000, title: '传奇全科王' }, hidden: false },
  { id: 'hidden-night', name: '夜猫子', description: '晚上10点后仍在练习', category: 'hidden', tier: 'silver', icon: '🌙', reward: { exp: 40, coin: 80 }, hidden: true },
  { id: 'hidden-breakthrough', name: '速度突破', description: '单次WPM超过个人记录50%', category: 'hidden', tier: 'silver', icon: '💥', reward: { exp: 50, coin: 100 }, hidden: true },
  { id: 'hidden-persist', name: '不放弃', description: '同一关卡失败5次后通关', category: 'hidden', tier: 'silver', icon: '💪', reward: { exp: 60, coin: 120 }, hidden: true },
  { id: 'hidden-firsttry', name: '一击必杀', description: 'BOSS关一次通关', category: 'hidden', tier: 'gold', icon: '⚡', reward: { exp: 100, coin: 200 }, hidden: true },
  { id: 'hidden-summer', name: '假期战士', description: '暑假期间累计打卡40天', category: 'hidden', tier: 'legendary', icon: '☀️', reward: { exp: 250, coin: 500 }, hidden: true },
]

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: ACHIEVEMENTS,
      userAchievements: [],

      checkAndUnlock: (userStats) => {
        const state = get()
        const newlyUnlocked: UserAchievement[] = []

        for (const ach of state.achievements) {
          if (state.userAchievements.some(ua => ua.achievementId === ach.id)) continue
          if (isConditionMet(ach.id, userStats)) {
            const ua: UserAchievement = {
              achievementId: ach.id,
              unlockedAt: new Date().toISOString(),
              notified: false,
            }
            newlyUnlocked.push(ua)
          }
        }

        if (newlyUnlocked.length > 0) {
          set({
            userAchievements: [...state.userAchievements, ...newlyUnlocked],
          })
        }

        return newlyUnlocked
      },

      getUnlockedCount: () => get().userAchievements.length,
      getTotalCount: () => get().achievements.length,

      isUnlocked: (id) => get().userAchievements.some(ua => ua.achievementId === id),

      markNotified: (id) => {
        const state = get()
        set({
          userAchievements: state.userAchievements.map(ua =>
            ua.achievementId === id ? { ...ua, notified: true } : ua
          ),
        })
      },
    }),
    { name: 'typehero-achievements' }
  )
)

function isConditionMet(achievementId: string, stats: Record<string, number>): boolean {
  switch (achievementId) {
    case 'spd-bronze': return (stats.highestWpm ?? 0) >= 20
    case 'spd-silver': return (stats.highestWpm ?? 0) >= 35
    case 'spd-gold': return (stats.highestWpm ?? 0) >= 50
    case 'spd-flash-bronze': return (stats.fastestLevel ?? Infinity) <= 30
    case 'spd-flash-silver': return (stats.fastestLevel ?? Infinity) <= 20
    case 'spd-flash-gold': return (stats.fastestLevel ?? Infinity) <= 15
    case 'combo-bronze': return (stats.maxCombo ?? 0) >= 20
    case 'combo-silver': return (stats.maxCombo ?? 0) >= 50
    case 'combo-gold': return (stats.maxCombo ?? 0) >= 100
    case 'acc-bronze': return (stats.levelAccuracy ?? 0) >= 90
    case 'acc-silver': return (stats.levelAccuracy ?? 0) >= 95
    case 'acc-gold': return (stats.levelAccuracy ?? 0) >= 99
    case 'perfect-bronze': return (stats.perfectLevels ?? 0) >= 1
    case 'perfect-silver': return (stats.perfectLevels ?? 0) >= 5
    case 'perfect-gold': return (stats.perfectLevels ?? 0) >= 20
    case 'streak-bronze': return (stats.streakDays ?? 0) >= 3
    case 'streak-silver': return (stats.streakDays ?? 0) >= 14
    case 'streak-gold': return (stats.streakDays ?? 0) >= 30
    case 'time-bronze': return (stats.totalMinutes ?? 0) >= 300
    case 'time-silver': return (stats.totalMinutes ?? 0) >= 1200
    case 'time-gold': return (stats.totalMinutes ?? 0) >= 3000
    default: return false
  }
}
