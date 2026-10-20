import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTextbooksByGrade } from '../../data/textbooks'
import type { Grade } from '../../data/types'
import { api } from '../../utils/api'
import Button from '../../components/Button'
import { useEnterAction } from '../../hooks/useEnterAction'
import KeyboardHint from '../../components/KeyboardHint'

const GRADES: Grade[] = [3, 4, 5, 6]
const GRADE_LABELS: Record<Grade, string> = { 3: '三年级', 4: '四年级', 5: '五年级', 6: '六年级' }
const LS_KEY = 'typehero_selected_textbooks'

function loadLocal(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}
function saveLocal(ids: string[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids))
}

function getGradeCount(grade: Grade, selected: Set<string>): number {
  return getTextbooksByGrade(grade).filter(tb => selected.has(tb.id)).length
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

  const clearAll = () => {
    setSelectedIds(new Set())
  }

  const handleSave = async () => {
    if (saving || loading) return
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
    } catch { /* Keep the local selection available when the server is offline. */ }
    setSaving(false)
    navigate('/adventure')
  }
  useEnterAction(() => { void handleSave() }, !saving && !loading)

  const gradeTextbooks = getTextbooksByGrade(selectedGrade)

  return (
    <div className="desktop-page textbook-page">
      <div className="page-heading">
        <div><p className="page-eyebrow">准备你的冒险</p><h1>📚 选择教材</h1>
        <p className="page-description">选择你要练习的教材，语文与英语可以一起练习，随时可以修改。</p></div>
        <span className="page-summary">已选择 <strong>{selectedIds.size}</strong> 本教材</span>
      </div>

      <div className="textbook-toolbar">
        {GRADES.map(g => {
          const count = getGradeCount(g, selectedIds)
          return (
            <button
              key={g}
              aria-pressed={selectedGrade === g}
              onClick={() => setSelectedGrade(g)}
              className={`px-5 py-3 rounded-xl text-lg font-bold transition-all cursor-pointer ${
                selectedGrade === g
                  ? 'bg-[var(--color-accent-blue)] text-white scale-105'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-slate-700'
              }`}
            >
              {GRADE_LABELS[g]}
              {count > 0 && (
                <span className={`ml-1.5 text-sm px-1.5 py-0.5 rounded-full ${
                  selectedGrade === g ? 'bg-white/20' : 'bg-slate-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
        {selectedIds.size > 0 && (
          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-900/30 transition-all cursor-pointer ml-2"
          >
            🗑️ 清空
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--color-text-secondary)]">加载中...</div>
      ) : (
        <div className="textbook-grid">
          {gradeTextbooks.map(tb => (
            <button
              type="button"
              aria-pressed={selectedIds.has(tb.id)}
              key={tb.id}
              onClick={() => toggleTextbook(tb.id)}
              className={`textbook-card bg-[var(--color-bg-secondary)] rounded-xl cursor-pointer transition-all border-2 ${
                selectedIds.has(tb.id)
                  ? 'border-[var(--color-accent-green)] bg-green-900/20'
                  : 'border-transparent hover:border-slate-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                  selectedIds.has(tb.id) ? 'bg-[var(--color-accent-green)] border-[var(--color-accent-green)]' : 'border-slate-500'
                }`}>
                  {selectedIds.has(tb.id) && <span className="text-white text-sm">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xl">{tb.subject === 'english' ? '🔤' : '📖'}</span>
                    <h3 className="text-lg font-bold">{tb.subject === 'english' ? '英语' : '语文'} · {tb.title}</h3>
                  </div>
                  <span className="textbook-edition" data-subject={tb.subject}>教材版本：{tb.subtitle}</span>
                  <p className="textbook-meta">{tb.chapters.length} 个章节 · {tb.chapters.reduce((sum, ch) => sum + ch.levels.length, 0)} 个关卡</p>
                  <div className="textbook-chapters">
                    {tb.chapters.map(ch => (
                      <span key={ch.id} className="text-xs bg-slate-700 px-2 py-1 rounded text-[var(--color-text-secondary)]">
                        {ch.icon} {ch.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="textbook-actions">
        <p className="page-description">可以跨年级选择多本教材，按自己的节奏练习。</p>
        <div className="flex flex-wrap gap-4">
        <Button size="lg" onClick={handleSave} disabled={saving || loading}>
          {saving ? '保存中...' : `确认选择 (${selectedIds.size}本教材)`}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/adventure')}>
          跳过
        </Button>
        </div>
      </div>
      <KeyboardHint>确认选择的教材</KeyboardHint>
    </div>
  )
}
