import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4">
      <div className="text-6xl mb-4">🗺️</div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-[var(--color-text-secondary)] mb-6">页面不存在</p>
      <Button onClick={() => navigate('/')}>返回首页</Button>
    </div>
  )
}
