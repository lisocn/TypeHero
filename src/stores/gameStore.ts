import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../utils/api'

export interface LevelProgress {
  levelId: string
  bestStars: 0 | 1 | 2 | 3
  bestWpm: number
  bestAccuracy: number
  completed: boolean
  attempts: number
}

export interface ChapterProgress {
  chapterId: string
  levels: Record<string, LevelProgress>
  bossUnlocked: boolean
  bossCompleted: boolean
}

interface GameState {
  chapterProgress: Record<string, ChapterProgress>
  currentChapterId: string | null
  currentLevelId: string | null
  initFromServer: () => Promise<void>
  setCurrentLevel: (chapterId: string, levelId: string) => void
  updateLevelProgress: (chapterId: string, levelId: string, progress: Partial<LevelProgress>) => void
  isLevelUnlocked: (chapterId: string, levelId: string, allLevels: string[]) => boolean
  isLevelCompleted: (chapterId: string, levelId: string) => boolean
  getLevelStars: (chapterId: string, levelId: string) => 0 | 1 | 2 | 3
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      chapterProgress: {},
      currentChapterId: null,
      currentLevelId: null,

      initFromServer: async () => {
        try {
          const { progress } = await api.getProgress()
          const chapterProgress: Record<string, ChapterProgress> = {}
          Object.entries(progress).forEach(([chapterId, levels]) => {
          const completedLevels = Object.values(levels).filter(l => l.completed).length
            chapterProgress[chapterId] = {
              chapterId,
              levels,
              bossUnlocked: completedLevels >= 6,
              bossCompleted: false,
            }
          })
          set({ chapterProgress })
        } catch {}
      },

      setCurrentLevel: (chapterId, levelId) => {
        set({ currentChapterId: chapterId, currentLevelId: levelId })
      },

      updateLevelProgress: (chapterId, levelId, progress) => {
        const state = get()
        const chapter = state.chapterProgress[chapterId] || {
          chapterId,
          levels: {},
          bossUnlocked: false,
          bossCompleted: false,
        }
        const existing = chapter.levels[levelId] || {
          levelId,
          bestStars: 0 as const,
          bestWpm: 0,
          bestAccuracy: 0,
          completed: false,
          attempts: 0,
        }
        const updated = {
          ...existing,
          ...progress,
          bestStars: Math.max(existing.bestStars, progress.bestStars ?? 0) as 0 | 1 | 2 | 3,
          bestWpm: Math.max(existing.bestWpm, progress.bestWpm ?? 0),
          bestAccuracy: Math.max(existing.bestAccuracy, progress.bestAccuracy ?? 0),
          completed: existing.completed || progress.completed || false,
          attempts: existing.attempts + (progress.completed ? 0 : 1),
        }
        chapter.levels[levelId] = updated

        const completedLevels = Object.values(chapter.levels).filter(l => l.completed).length
        if (completedLevels >= 6) {
          chapter.bossUnlocked = true
        }

        set({
          chapterProgress: {
            ...state.chapterProgress,
            [chapterId]: chapter,
          },
        })

        api.saveProgress(chapterId, levelId, {
          bestStars: updated.bestStars,
          bestWpm: updated.bestWpm,
          bestAccuracy: updated.bestAccuracy,
          completed: updated.completed,
        }).catch(() => {})
      },

      isLevelUnlocked: (chapterId, levelId, allLevels) => {
        const chapter = get().chapterProgress[chapterId]
        if (!chapter) return levelId === allLevels[0]
        const idx = allLevels.indexOf(levelId)
        if (idx === 0) return true
        const prev = allLevels[idx - 1]
        return chapter.levels[prev]?.completed ?? false
      },

      isLevelCompleted: (chapterId, levelId) => {
        const chapter = get().chapterProgress[chapterId]
        return chapter?.levels[levelId]?.completed ?? false
      },

      getLevelStars: (chapterId, levelId) => {
        const chapter = get().chapterProgress[chapterId]
        return chapter?.levels[levelId]?.bestStars ?? 0
      },
    }),
    { name: 'typehero-game' }
  )
)
