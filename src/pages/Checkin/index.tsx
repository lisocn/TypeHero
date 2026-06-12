import { useState } from 'react'
import { useCheckinStore } from '../../stores/checkinStore'
import Button from '../../components/Button'

export default function Checkin() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const records = useCheckinStore(s => s.getMonthRecords(year, month))
  const currentStreak = useCheckinStore(s => s.currentStreak)
  const totalDays = useCheckinStore(s => s.totalDays)
  const patchCards = useCheckinStore(s => s.monthlyPatchCards)
  const checkin = useCheckinStore(s => s.checkin)

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const today = `${year}-${String(month + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const handleCheckin = (date: string) => {
    checkin(date, { coinEarned: 10, expEarned: 20 })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-[var(--color-accent-gold)]">📅 每日打卡</h1>

      <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }}
            className="text-[var(--color-text-secondary)] hover:text-white cursor-pointer text-xl"
          >◀</button>
          <h2 className="text-xl font-bold">{year}年{month + 1}月</h2>
          <button
            onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }}
            className="text-[var(--color-text-secondary)] hover:text-white cursor-pointer text-xl"
          >▶</button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <div key={d} className="text-center text-xs text-[var(--color-text-secondary)] py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const record = records[dateStr]
            const isToday = dateStr === today
            const isChecked = record?.checked

            return (
              <div
                key={day}
                onClick={() => !isChecked && isToday && handleCheckin(dateStr)}
                className={`h-10 rounded-lg flex items-center justify-center text-sm transition-all ${
                  isChecked
                    ? 'bg-[var(--color-accent-green)] text-white font-bold'
                    : isToday
                      ? 'border-2 border-dashed border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] cursor-pointer hover:bg-slate-700'
                      : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {isChecked ? '✓' : day}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center">
          <div className="text-2xl">🔥</div>
          <div className="text-xl font-bold text-[var(--color-accent-gold)]">{currentStreak}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">连续打卡</div>
        </div>
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center">
          <div className="text-2xl">📊</div>
          <div className="text-xl font-bold text-[var(--color-accent-blue)]">{totalDays}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">总打卡天数</div>
        </div>
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center">
          <div className="text-2xl">🎫</div>
          <div className="text-xl font-bold text-[var(--color-accent-purple)]">{patchCards}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">补签卡</div>
        </div>
      </div>

      <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4">
        <h3 className="font-bold mb-2">连续打卡奖励</h3>
        <div className="space-y-1 text-sm text-[var(--color-text-secondary)]">
          <p>🔥 3天: +30金币</p>
          <p>🔥 7天: +100金币 + "银色周冠"称号</p>
          <p>🔥 14天: +200金币 + 补签卡x1</p>
          <p>🔥 21天: +500金币 + "金色月冠"称号</p>
          <p>🔥 30天: +1000金币 + "传奇全勤王"称号</p>
        </div>
      </div>
    </div>
  )
}
