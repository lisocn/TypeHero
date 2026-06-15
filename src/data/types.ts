export interface ContentItem {
  display: string
  input: string
  hint?: string
}

export interface LevelContent {
  mode: 'char' | 'word' | 'sentence' | 'paragraph'
  items: ContentItem[]
  language?: 'en' | 'zh-pinyin' | 'zh-hanzi'
}

export interface Level {
  id: string
  title: string
  type: 'warmup' | 'basic' | 'advanced' | 'boss'
  order: number
  content: LevelContent
  targetWPM: { bronze: number; silver: number; gold: number }
  targetAccuracy: { bronze: number; silver: number; gold: number }
  timeLimit: number
  reward: { exp: number; coin: number }
}

export interface Chapter {
  id: string
  title: string
  subtitle: string
  order: number
  icon: string
  levels: Level[]
}

export interface Textbook {
  id: string
  title: string
  subtitle: string
  subject: 'english' | 'chinese'
  grade: number
  semester: 'a' | 'b'
  chapters: Chapter[]
}

export type Grade = 3 | 4 | 5 | 6
export type Subject = 'english' | 'chinese'
