import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../utils/api'

export interface CheckinRecord {
  date: string
  checked: boolean
  levelsCompleted: number
  practiceMinutes: number
  wpmAvg: number
  accuracyAvg: number
  coinEarned: number
  expEarned: number
}

interface CheckinState {
  records: Record<string, CheckinRecord>
  currentStreak: number
  longestStreak: number
  totalDays: number
  monthlyPatchCards: number
  initFromServer: () => Promise<void>
  checkin: (date: string, data?: Partial<CheckinRecord>) => void
  usePatchCard: (date: string) => boolean
  getMonthRecords: (year: number, month: number) => Record<string, CheckinRecord>
  canCheckin: (date: string) => boolean
}

export const useCheckinStore = create<CheckinState>()(
  persist(
    (set, get) => ({
      records: {},
      currentStreak: 0,
      longestStreak: 0,
      totalDays: 0,
      monthlyPatchCards: 2,

      initFromServer: async () => {
        try {
          const { records, currentStreak, totalDays } = await api.getCheckin()
          set({ records, currentStreak, totalDays, longestStreak: currentStreak })
        } catch {}
      },

      checkin: (date, data) => {
        const state = get()
        if (state.records[date]?.checked) return

        const newRecord: CheckinRecord = {
          date,
          checked: true,
          levelsCompleted: 0,
          practiceMinutes: 0,
          wpmAvg: 0,
          accuracyAvg: 0,
          coinEarned: 10,
          expEarned: 20,
          ...data,
        }

        let newStreak = state.currentStreak + 1
        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        if (!state.records[yesterdayStr]?.checked) {
          newStreak = 1
        }

        set({
          records: { ...state.records, [date]: newRecord },
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          totalDays: state.totalDays + 1,
        })

        api.checkin(date, {
          coinEarned: newRecord.coinEarned,
          expEarned: newRecord.expEarned,
        }).catch(() => {})
      },

      usePatchCard: (date) => {
        const state = get()
        if (state.monthlyPatchCards <= 0) return false
        if (state.records[date]?.checked) return false

        set({
          monthlyPatchCards: state.monthlyPatchCards - 1,
          records: {
            ...state.records,
            [date]: {
              date,
              checked: true,
              levelsCompleted: 0,
              practiceMinutes: 0,
              wpmAvg: 0,
              accuracyAvg: 0,
              coinEarned: 0,
              expEarned: 0,
            },
          },
        })
        return true
      },

      getMonthRecords: (year, month) => {
        const records = get().records
        const result: Record<string, CheckinRecord> = {}
        Object.entries(records).forEach(([date, record]) => {
          const d = new Date(date)
          if (d.getFullYear() === year && d.getMonth() === month) {
            result[date] = record
          }
        })
        return result
      },

      canCheckin: (date) => {
        const state = get()
        return !state.records[date]?.checked
      },
    }),
    { name: 'typehero-checkin' }
  )
)
