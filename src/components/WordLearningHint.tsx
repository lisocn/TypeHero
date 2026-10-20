import { getCurrentWordHint } from '../utils/wordLearning'

interface WordLearningHintProps {
  text: string
  currentIndex: number
  items?: readonly string[]
}

export default function WordLearningHint({ text, currentIndex, items }: WordLearningHintProps) {
  const hint = getCurrentWordHint(text, currentIndex, items)
  if (!hint) return null
  return (
    <div className="word-learning-hint" aria-label="单词学习提示">
      <div><span>当前单词 / 短语</span><strong className="word-learning-word">{hint.word}</strong></div>
      <div><span>中文含义</span><strong className="word-learning-meaning">{hint.meaning}</strong></div>
      <div><span>拼读音节 · 试着分段读</span><strong className="word-learning-syllables">{hint.syllables}</strong></div>
    </div>
  )
}
