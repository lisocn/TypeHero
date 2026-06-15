import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../stores/userStore'
import Button from '../../components/Button'

export default function Home() {
  const navigate = useNavigate()
  const isLoggedIn = useUserStore(s => s.isLoggedIn)

  useEffect(() => {
    if (isLoggedIn) navigate('/textbook-select')
  }, [isLoggedIn, navigate])

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-[var(--color-accent-gold)] via-[var(--color-accent-blue)] to-[var(--color-accent-purple)] bg-clip-text text-transparent">
          TypeHero
        </h1>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">打字小英雄</h2>
        <p className="text-[var(--color-text-secondary)] text-lg mb-8">成为键盘英雄，征服文字世界！</p>

        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/login')}>
            🚀 开始冒险
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
          <div className="p-4">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-sm text-[var(--color-text-secondary)]">教材同步</div>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🎮</div>
            <div className="text-sm text-[var(--color-text-secondary)]">趣味闯关</div>
          </div>
          <div className="p-4">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-sm text-[var(--color-text-secondary)]">英雄成长</div>
          </div>
        </div>
      </div>
    </div>
  )
}
