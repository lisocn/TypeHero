import { Outlet, useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/userStore'

export default function MainLayout() {
  const isLoggedIn = useUserStore(s => s.isLoggedIn)
  const user = useUserStore(s => s.user)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {isLoggedIn && user && (
        <header className="bg-[var(--color-bg-secondary)] border-b border-slate-700 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl">⚔️</span>
            <h1 className="text-lg font-bold text-[var(--color-accent-gold)]">TypeHero</h1>
          </div>
          <nav className="flex items-center gap-4">
            <button onClick={() => navigate('/adventure')} className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm cursor-pointer">🗺️ 冒险</button>
            <button onClick={() => navigate('/speed')} className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm cursor-pointer">⚡ 疾风</button>
            <button onClick={() => navigate('/checkin')} className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm cursor-pointer">📅 打卡</button>
            <button onClick={() => navigate('/achievements')} className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm cursor-pointer">🏆 奖章</button>
            <button onClick={() => navigate('/shop')} className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm cursor-pointer">🛒 商店</button>
            <button onClick={() => navigate('/profile')} className="text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm cursor-pointer">👤 {user.nickname}</button>
          </nav>
        </header>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
