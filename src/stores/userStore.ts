import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AvatarId } from '../utils/levelConfig'
import { getExpForLevel } from '../utils/levelConfig'
import { api } from '../utils/api'

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
  initFromServer: () => Promise<void>
  createUser: (nickname: string, avatar: AvatarId) => Promise<void>
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

      initFromServer: async () => {
        try {
          const token = localStorage.getItem('typehero_token')
          if (!token) return
          const { user } = await api.getMe()
          set({ user, isLoggedIn: true })
        } catch {
          localStorage.removeItem('typehero_token')
          set({ user: null, isLoggedIn: false })
        }
      },

      createUser: async (nickname, avatar) => {
        const { token, user } = await api.register(nickname, avatar)
        localStorage.setItem('typehero_token', token)
        set({ user, isLoggedIn: true })
      },

      updateSettings: (settings) => {
        const user = get().user
        if (!user) return
        const updated = { ...user, settings: { ...user.settings, ...settings } }
        set({ user: updated })
        api.updateSettings(updated.settings).catch(() => {})
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
        set({ user: { ...user, exp: newExp, totalExp: newTotalExp, level: newLevel } })
        api.addExp(amount).catch(() => {})
      },

      addCoin: (amount) => {
        const user = get().user
        if (!user) return
        set({ user: { ...user, coin: user.coin + amount } })
        api.addCoin(amount).catch(() => {})
      },

      spendCoin: (amount) => {
        const user = get().user
        if (!user || user.coin < amount) return false
        set({ user: { ...user, coin: user.coin - amount } })
        api.spendCoin(amount).catch(() => {})
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
        api.updateStats(chars, wpm, minutes).catch(() => {})
      },

      logout: () => {
        localStorage.removeItem('typehero_token')
        set({ user: null, isLoggedIn: false })
      },
    }),
    { name: 'typehero-user' }
  )
)
