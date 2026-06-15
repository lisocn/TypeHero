import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTextbooksByGrade } from '../../data/textbooks'
import type { Grade } from '../../data/types'
import { api } from '../../utils/api'
import Button from '../../components/Button'

const GRADES: Grade[] = [3, 4, 5, 6]
const GRADE_LABELS: Record<Grade, string> = { 3: '三年级', 4: '四年级', 5: '五年级', 6: '六年级' }
const LS_KEY = 'typehero_selected_textbooks'

function loadLocal(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}
function saveLocal(ids: string[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids))
}

export default function TextbookSelect() {
  const navigate = useNavigate()
  const [selectedGrade, setSelectedGrade] = useState<Grade>(3)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.getSelectedTextbooks()
      .then(({ textbookIds }) => {
        if (textbookIds.length > 0) setSelectedIds(new Set(textbookIds))
        else {
          const local = loadLocal()
          if (local.length > 0) setSelectedIds(new Set(local))
        }
      })
      .catch(() => {
        const local = loadLocal()
        if (local.length > 0) setSelectedIds(new Set(local))
      })
      .finally(() => setLoading(false))
  }, [])

  const toggleTextbook = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSave = async () => {
    setSaving(true)
    const ids = Array.from(selectedIds)
    saveLocal(ids)
    try {
      const current = await api.getSelectedTextbooks()
      const currentSet = new Set(current.textbookIds)
      for (const id of ids) {
        if (!currentSet.has(id)) await api.selectTextbook(id)
      }
      for (const id of currentSet) {
        if (!selectedIds.has(id)) await api.unselectTextbook(id)
      }
    } catch {}
    setSaving(false)
    navigate('/adventure')
  }

  const gradeTextbooks = getTextbooksByGrade(selectedGrade)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-2 text-[var(--color-accent-gold)]">📚 选择教材</h1>
      <p className="text-center text-[var(--color-text-secondary)] mb-6">选择你要练习的教材，随时可以修改</p>

      <div className="flex gap-2 mb-6 justify-center">
        {GRADES.map(g => (
          <button
            key={g}
            onClick={() => setSelectedGrade(g)}
            className={`px-6 py-3 rounded-xl text-lg font-bold transition-all cursor-pointer ${
              selectedGrade === g
                ? 'bg-[var(--color-accent-blue)] text-white scale-105'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-slate-700'
            }`}
          >
            {GRADE_LABELS[g]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--color-text-secondary)]">加载中...</div>
      ) : (
        <div className="space-y-4">
          {gradeTextbooks.map(tb => (
            <div
              key={tb.id}
              onClick={() => toggleTextbook(tb.id)}
              className={`bg-[var(--color-bg-secondary)] rounded-xl p-5 cursor-pointer transition-all border-2 ${
                selectedIds.has(tb.id)
                  ? 'border-[var(--color-accent-green)] bg-green-900/20'
                  : 'border-transparent hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                  selectedIds.has(tb.id) ? 'bg-[var(--color-accent-green)] border-[var(--color-accent-green)]' : 'border-slate-500'
                }`}>
                  {selectedIds.has(tb.id) && <span className="text-white text-sm">✓</span>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{tb.subject === 'english' ? '🔤' : '📖'}</span>
                    <h3 className="text-lg font-bold">{tb.title}</h3>
                    <span className="text-sm text-[var(--color-text-secondary)]">{tb.subtitle}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {tb.chapters.map(ch => (
                      <span key={ch.id} className="text-xs bg-slate-700 px-2 py-1 rounded text-[var(--color-text-secondary)]">
                        {ch.icon} {ch.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8 gap-4">
        <Button size="lg" onClick={handleSave} disabled={saving}>
          {saving ? '保存中...' : `确认选择 (${selectedIds.size}本教材)`}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/adventure')}>
          跳过
        </Button>
      </div>
    </div>
  )
}
