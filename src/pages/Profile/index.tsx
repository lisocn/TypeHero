import { useUserStore } from '../../stores/userStore'
import { getLevelFromExp, AVATARS } from '../../utils/levelConfig'
import ProgressBar from '../../components/ProgressBar'

export default function Profile() {
  const user = useUserStore(s => s.user)
  if (!user) return null

  const { level, currentExp, nextExp } = getLevelFromExp(user.totalExp)
  const avatar = AVATARS.find(a => a.id === user.avatar)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="text-6xl">{avatar?.emoji ?? '👤'}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.nickname}</h1>
            <p className="text-[var(--color-text-secondary)]">Lv.{level} {avatar?.name}</p>
            <div className="mt-2 max-w-xs">
              <ProgressBar value={(currentExp / nextExp) * 100} color="var(--color-accent-gold)" />
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">{currentExp}/{nextExp} EXP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: '总打字量', value: user.totalCharsTyped.toLocaleString(), icon: '⌨️' },
          { label: '最高WPM', value: user.highestWpm, icon: '⚡' },
          { label: '奖章数', value: user.achievementsCount, icon: '🏆' },
          { label: '打卡天数', value: user.consecutiveCheckinDays, icon: '🔥' },
        ].map(s => (
          <div key={s.label} className="bg-[var(--color-bg-secondary)] rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold text-[var(--color-accent-gold)]">{s.value}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">设置</h2>
        <div className="space-y-3">
          <SettingToggle
            label="音效"
            checked={user.settings.soundEnabled}
            onChange={v => useUserStore.getState().updateSettings({ soundEnabled: v })}
          />
          <SettingToggle
            label="背景音乐"
            checked={user.settings.musicEnabled}
            onChange={v => useUserStore.getState().updateSettings({ musicEnabled: v })}
          />
        </div>
      </div>
    </div>
  )
}

function SettingToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[var(--color-text-primary)]">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${checked ? 'bg-[var(--color-accent-green)]' : 'bg-slate-600'}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}
