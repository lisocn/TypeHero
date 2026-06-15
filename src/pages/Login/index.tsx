import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/userStore'
import { AVATARS } from '../../utils/levelConfig'
import Button from '../../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const createUser = useUserStore(s => s.createUser)
  const [nickname, setNickname] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState<string>('astronaut')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    const trimmed = nickname.trim()
    if (trimmed.length < 2 || trimmed.length > 12) {
      setError('昵称需要2-12个字符')
      return
    }
    if (/[^\u4e00-\u9fa5a-zA-Z0-9]/.test(trimmed)) {
      setError('昵称不允许特殊字符')
      return
    }
    setLoading(true)
    try {
      await createUser(trimmed, selectedAvatar as never)
      navigate('/textbook-select')
    } catch (e: any) {
      setError(e.message || '注册失败')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-[var(--color-accent-gold)]">创建你的英雄</h1>

        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6">
          <label className="block text-sm text-[var(--color-text-secondary)] mb-2">英雄昵称</label>
          <input
            type="text"
            value={nickname}
            onChange={e => { setNickname(e.target.value); setError('') }}
            placeholder="输入2-12个字符的昵称"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors"
          />
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>

        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6">
          <label className="block text-sm text-[var(--color-text-secondary)] mb-3">选择角色形象</label>
          <div className="grid grid-cols-4 gap-3">
            {AVATARS.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAvatar(a.id)}
                className={`p-4 rounded-xl text-center transition-all cursor-pointer ${
                  selectedAvatar === a.id
                    ? 'bg-[var(--color-accent-blue)] ring-2 ring-[var(--color-accent-gold)] scale-105'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <div className="text-3xl mb-1">{a.emoji}</div>
                <div className="text-xs text-[var(--color-text-secondary)]">{a.name}</div>
              </button>
            ))}
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={handleCreate} disabled={loading}>
          {loading ? '创建中...' : '⚔️ 创建英雄'}
        </Button>
      </div>
    </div>
  )
}
