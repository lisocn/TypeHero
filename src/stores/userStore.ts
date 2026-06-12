import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import type { AvatarId } from '../utils/levelConfig'
import { getExpForLevel } from '../utils/levelConfig'

export interface UserSettings {
  soundEnabled: boolean
  musicEnabled: boolean
  difficulty: 'auto' | 'easy' | 'medium' | 'hard'
}

export interface User {
  id: string
  nickname: string
  avatar: AvatarId
  level: number
  exp: number
  totalExp: number
  coin: number
  createdAt: string
  settings: UserSettings
  totalCharsTyped: number
  highestWpm: number
  totalPlayMinutes: number
  achievementsCount: number
  consecutiveCheckinDays: number
}

interface UserState {
  user: User | null
  isLoggedIn: boolean
  createUser: (nickname: string, avatar: AvatarId) => void
  updateSettings: (settings: Partial<UserSettings>) => void
  addExp: (amount: number) => void
  addCoin: (amount: number) => void
  spendCoin: (amount: number) => boolean
  updateStats: (chars: number, wpm: number, minutes: number) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      createUser: (nickname, avatar) => {
        const user: User = {
          id: uuidv4(),
          nickname,
          avatar,
          level: 1,
          exp: 0,
          totalExp: 0,
          coin: 0,
          createdAt: new Date().toISOString(),
          settings: {
            soundEnabled: true,
            musicEnabled: true,
            difficulty: 'auto',
          },
          totalCharsTyped: 0,
          highestWpm: 0,
          totalPlayMinutes: 0,
          achievementsCount: 0,
          consecutiveCheckinDays: 0,
        }
        set({ user, isLoggedIn: true })
      },

      updateSettings: (settings) => {
        const user = get().user
        if (!user) return
        set({
          user: {
            ...user,
            settings: { ...user.settings, ...settings },
          },
        })
      },

      addExp: (amount) => {
        const user = get().user
        if (!user) return
        let newExp = user.exp + amount
        let newTotalExp = user.totalExp + amount
        let newLevel = user.level
        while (newExp >= getExpForLevel(newLevel)) {
          newExp -= getExpForLevel(newLevel)
          newLevel++
        }
        set({
          user: {
            ...user,
            exp: newExp,
            totalExp: newTotalExp,
            level: newLevel,
          },
        })
      },

      addCoin: (amount) => {
        const user = get().user
        if (!user) return
        set({ user: { ...user, coin: user.coin + amount } })
      },

      spendCoin: (amount) => {
        const user = get().user
        if (!user || user.coin < amount) return false
        set({ user: { ...user, coin: user.coin - amount } })
        return true
      },

      updateStats: (chars, wpm, minutes) => {
        const user = get().user
        if (!user) return
        set({
          user: {
            ...user,
            totalCharsTyped: user.totalCharsTyped + chars,
            highestWpm: Math.max(user.highestWpm, wpm),
            totalPlayMinutes: user.totalPlayMinutes + minutes,
          },
        })
      },

      logout: () => {
        set({ user: null, isLoggedIn: false })
      },
    }),
    { name: 'typehero-user' }
  )
)
