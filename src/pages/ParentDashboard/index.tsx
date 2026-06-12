import { useState } from 'react'
import { useUserStore } from '../../stores/userStore'
import Button from '../../components/Button'

export default function ParentDashboard() {
  const [verified, setVerified] = useState(false)
  const [answer, setAnswer] = useState('')
  const user = useUserStore(s => s.user)

  const a = 7, b = 3
  const correctAnswer = a + b

  const handleVerify = () => {
    if (parseInt(answer) === correctAnswer) {
      setVerified(true)
    }
  }

  if (!verified) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-6">👨‍👩‍👧 家长验证</h1>
        <p className="text-[var(--color-text-secondary)] mb-4">请回答数学题以进入家长端</p>
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-4">
          <p className="text-2xl font-bold text-[var(--color-accent-gold)]">{a} + {b} = ?</p>
        </div>
        <input
          type="number"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white text-center text-xl mb-4 focus:outline-none focus:border-[var(--color-accent-blue)]"
        />
        <Button onClick={handleVerify} className="w-full">验证进入</Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-accent-gold)]">📊 家长仪表盘</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">📝</div>
          <div className="text-xl font-bold">3次 / 45分</div>
          <div className="text-xs text-[var(--color-text-secondary)]">本周练习</div>
        </div>
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-xl font-bold">WPM {user?.highestWpm ?? 0}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">当前水平</div>
        </div>
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">📅</div>
          <div className="text-xl font-bold">5/7 天</div>
          <div className="text-xs text-[var(--color-text-secondary)]">本周打卡</div>
        </div>
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">📖</div>
          <div className="text-xl font-bold">英语60%</div>
          <div className="text-xs text-[var(--color-text-secondary)]">教材进度</div>
        </div>
      </div>

      <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">📈 成长趋势（近30天）</h2>
        <div className="h-48 flex items-end gap-1 border-b border-slate-600 pb-2">
          {Array.from({ length: 30 }).map((_, i) => {
            const h = 20 + Math.random() * 60
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-[var(--color-accent-blue)] rounded-t"
                  style={{ height: `${h}%` }}
                />
              </div>
            )
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-[var(--color-text-secondary)]">
          <span>30天前</span>
          <span>今天</span>
        </div>
      </div>

      <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">🔍 薄弱环节分析</h2>
        <p className="text-[var(--color-text-secondary)] text-sm mb-3">错误率最高的按键/字母：</p>
        <div className="flex gap-3">
          {['Q', 'P', 'Z', 'X', 'M'].map(key => (
            <div key={key} className="bg-red-900/30 border border-red-600 rounded-lg px-4 py-2 text-center">
              <div className="text-lg font-bold text-red-400">{key}</div>
              <div className="text-xs text-red-300">错误率高</div>
            </div>
          ))}
        </div>
        <p className="text-[var(--color-text-secondary)] text-sm mt-3">
          建议：多做字母雨游戏的针对性练习，特别关注字母 'Q' 和 'Z'。
        </p>
      </div>
    </div>
  )
}
